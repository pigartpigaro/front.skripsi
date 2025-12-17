import { acceptHMRUpdate, defineStore } from "pinia"
import { date } from "quasar"
import { api } from "src/boot/axios"
import { notifErrVue } from "src/modules/utils"

export const useLaporanSpmFarmasiStore = defineStore('laporan_spm_farmasi', {
  state: () => ({
    loadingDownload: false,
    loading: false,
    reseps: [],
    rawItems: [],
    items: [],
    meta: {},
    ketProses: null,
    params: {
      q: '',
      per_page: 10,
      page: 1,
      // bulan: '03', // buat percobaan
      bulan: date.formatDate(Date.now(), 'MM'), // aslinya
      tahun: date.formatDate(Date.now(), 'YYYY'),
      kelompok: null,
      depo: ['Gd-04010102', 'Gd-05010101', 'Gd-04010104'],
      sistem_bayar: [],
      generik: 'Semua',
      formularium: 'Semua',
      response_time: 'Obat'
    },

    groupSistembayar: [],
    tipe: 'Rinci',
    optionTipes: ['Rinci', 'Rekap'],
    bulans: [
      { nama: 'January', value: '01' },
      { nama: 'February', value: '02' },
      { nama: 'Maret', value: '03' },
      { nama: 'April', value: '04' },
      { nama: 'Mei', value: '05' },
      { nama: 'Juni', value: '06' },
      { nama: 'Juli', value: '07' },
      { nama: 'Agustus', value: '08' },
      { nama: 'September', value: '09' },
      { nama: 'Oktober', value: '10' },
      { nama: 'November', value: '11' },
      { nama: 'Desember', value: '12' }
    ],
    optionJenisLaporans: ['Generik', 'Response Time', 'Kesesuaian Obat'],
    jenisLaporan: 'Generik',
    optionGeneriks: [
      'Semua',
      'Generik',
      'Non Generik'
    ],
    optionFormulariums: [
      'Semua',
      'Fornas',
      'Forkit'
    ],
    depos: [
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
      { nama: 'Depo IGD', value: 'Gd-04010104' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
    ],
    optionKelompoks: [],   // ini kelompok penyimpanan di master obat
    optionSistemBayars: [],   // ini kelompok penyimpanan di master sistem bayar
    urls: [
      { nama: 'Generik', url: 'v1/simrs/laporan/farmasi/spm/laporan-generik' },
      { nama: 'Response Time', url: 'v1/simrs/laporan/farmasi/spm/laporan-response-time' },
      { nama: 'Kesesuaian Obat', url: 'v1/simrs/laporan/farmasi/spm/laporan-kesesuaian-obat' },
    ],
    url: 'v1/simrs/laporan/farmasi/spm/laporan-generik',
    progress: 0,
    fields: {},
    tipeObat: 'Obat Jadi',
    optionTipeObats: ['Racikan', 'Obat Jadi'],
    // option untuk response time floor stok dan obat
    optionResTipeObats: ['Floor Stok', 'Obat'],
    optionTujuanMinta: ['Gudang', 'Depo'],
    tujuanMinta: 'Gudang',
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      this.setParams('q', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setParamsResponseTime (val) {
      this.items = []
      if (val == 'Floor Stok') {
        this.depos.push({ nama: 'Floor Stok', value: 'Gd-03010101' })
        this.setParams('depo', ['Gd-04010102', 'Gd-05010101', 'Gd-04010104', 'Gd-04010103', 'Gd-03010101'])
      } else {
        const index = this.depos.findIndex((item) => item.nama == 'Floor Stok')
        if (index > -1) {
          this.depos.splice(index, 1)
        }
        this.setParams('depo', ['Gd-04010102', 'Gd-05010101', 'Gd-04010104'])
      }
      this.filterAndSetItemRespons()
    },
    async getDataTable () {
      this.items = []
      this.rawItems = []
      this.reseps = []
      this.loading = true

      try {
        const worker = new Worker('/js/dataProcessor.js')

        worker.onmessage = (e) => {
          // console.log('e', e?.data)

          // const { type, processedData, progress, uprocessedData } = e.data
          if (e.data?.type === 'progress') {
            this.ketProses = `Memproses data `
            // this.progress = progress
          } else if (e.data?.type === 'complete') {
            this.rawItems.push(...e.data?.processedData)
            this.reseps.push(...e.data?.unProcessedData)
            if (this.jenisLaporan === 'Generik') this.filterAndSetItems()
            else if (this.jenisLaporan === 'Response Time') this.filterAndSetItemRespons()
            else this.filterAndSetItemKesesuaian()
            worker.terminate()
          }
        }

        this.setParams('page', 1)
        this.meta = {
          current_page: 0,
          last_page: 5
        }
        const paramGenerik = this.params.generik
        const paramFormula = this.params.formularium
        this.setParams('generik', 'Non Generik')
        this.setParams('formularium', 'Forkit')

        // const MAX_PAGES = 10 // Batasi maksimal 10 halaman
        const DELAY = 300 // Delay 300ms antar request

        const param = { params: this.params }
        let currentPage = 1
        let totalPages = 5

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        do {
          this.ketProses = `Mengambil data halaman `
          this.progress = currentPage
          param.params.page = currentPage

          try {
            const resp = await api.get(this.url, param)

            if (!resp?.data?.data?.length) {
              if (currentPage === 1) {
                this.ketProses = null
                return notifErrVue('Data tidak ditemukan')
              }
              break
            }

            // Simpan data mentah ke reseps
            // this.reseps.push(...resp.data.data)

            totalPages = Math.min(resp.data?.meta?.last_page || totalPages)
            // totalPages = 10
            this.meta = resp.data?.meta

            const chunks = this.chunkArray(resp.data?.data, 100)
            worker.postMessage({
              chunks,
              jenisLaporan: this.jenisLaporan,
              isLastChunk: currentPage === totalPages // Tambahkan flag ini
            })

            await delay(50)

            currentPage++
            if (currentPage <= totalPages) {
              await delay(DELAY)
            }

          } catch (error) {
            console.error('Error fetching page:', currentPage, error)
            break
          }

        } while (currentPage <= totalPages)

        this.setParams('generik', paramGenerik)
        this.setParams('formularium', paramFormula)

        this.ketProses = null
        if (this.tipe === 'Rekap') {
          if (this.jenisLaporan === 'Generik') this.setRekapGenerik()
        }

      } catch (error) {
        console.error('Error in getDataTable:', error)
        notifErrVue('Terjadi kesalahan saat mengambil data')
      } finally {
        this.loading = false
        this.ketProses = null
      }
    },

    filterAndSetItemKesesuaian () {
      this.items = []
      const itemnya = []
      if (this.tipe == 'Rinci') {
        const allReseps = this.reseps.map(it => it.noresep)
        const uniqueReseps = [...new Set(allReseps)]
        // console.log('uniqueReseps', uniqueReseps)
        // console.log('rawItems', this.rawItems)

        uniqueReseps.forEach(item => {
          const resepnya = this.rawItems.filter(x => x.nomor == item)
          const satuRes = this.rawItems.find(x => x.nomor == item)
          const nonFor = resepnya.filter(i => i.fornas != '1').map(m => m.nama_obat)
          // console.log('satuRes', satuRes)

          if (satuRes) itemnya.push({
            tgl: satuRes?.tgl,
            nomor: satuRes?.nomor,
            ruang: satuRes?.ruang,
            dokter: satuRes?.dokter,
            fornas: resepnya?.filter(a => a.fornas == '1')?.length ?? 0,
            total: resepnya?.length ?? 0,
            ket: nonFor?.join(', ')
          })
        })
      }
      else this.setRekapKesesuaian(itemnya)
      this.items = [...itemnya]
    },
    setRekapKesesuaian (items) {
      const rawDates = this.rawItems.map(item => date.formatDate(item.tgl, 'YYYY-MM-DD'))
      const uniqueDates = [...new Set(rawDates)]
      uniqueDates.forEach(tangg => {
        const datanya = this.rawItems.filter(item => tangg === date.formatDate(item.tgl, 'YYYY-MM-DD'))
        const rajal = datanya.filter(x => x.poli != null)
        const ranap = datanya.filter(x => x.ranap != null)
        items.push({
          tgl: tangg,
          rajal: {
            fornas: rajal.filter(x => x.fornas == '1')?.length,
            total: rajal?.length
          },
          ranap: {
            fornas: ranap.filter(x => x.fornas == '1')?.length,
            total: ranap?.length
          },
          total: {
            fornas: datanya.filter(x => x.fornas == '1')?.length,
            total: datanya?.length
          },
        })
      })
    },
    filterAndSetItemRespons () {
      this.items = []
      if (this.params.response_time === 'Obat') {
        if (this.tipe === 'Rinci') {
          this.items = [...this.rawItems].filter(item => item.jenis === this.tipeObat)
        } else this.setRekapResponseTime()
      } else {
        if (this.tipe === 'Rinci') {
          if (this.tujuanMinta == 'Gudang') this.items = [...this.rawItems.filter(item => this.params.depo.includes(item.dari))]
          else this.items = [...this.rawItems.filter(item => item.dari.includes('R-'))]
        } else this.setRekapResponseTime()
      }

      // console.log('items', this.rawItems, this.items)

    },
    setRekapResponseTime () {
      const rawDates = this.params.response_time === 'Obat' ?
        this.rawItems?.filter(item => item.jenis === this.tipeObat)?.map(item => date.formatDate(item.tgl, 'YYYY-MM-DD')) :
        this.rawItems.map(item => date.formatDate(item.tgl, 'YYYY-MM-DD'))
      const uniqueDates = [...new Set(rawDates)]

      uniqueDates.forEach(tangg => {
        const allReseps = this.params.response_time === 'Obat' ?
          this.rawItems.filter(item => tangg === date.formatDate(item.tgl, 'YYYY-MM-DD') && item.jenis === this.tipeObat) :
          (
            this.tujuanMinta == 'Gudang' ? this.rawItems.filter(item => tangg === date.formatDate(item.tgl, 'YYYY-MM-DD') && this.params.depo.includes(item.dari)) :
              this.rawItems.filter(item => tangg === date.formatDate(item.tgl, 'YYYY-MM-DD') && item.dari.includes('R-'))
          )
        const resepnya = this.params.response_time === 'Obat' ?
          allReseps.map(item => item.noresep) :
          allReseps.map(item => item.no_permintaan)
        const uniqueNoreseps = [...new Set(resepnya)]
        const TotalMenit = allReseps.reduce((acc, item) => acc + parseFloat((item.menit ?? 0)), 0)
        const less30 = allReseps.filter(item => parseFloat(item.menit) <= 30)?.length
        const more30 = allReseps.filter(item => parseFloat(item.menit) > 30)?.length
        const less60 = allReseps.filter(item => parseFloat(item.menit) <= 60)?.length
        const more60 = allReseps.filter(item => parseFloat(item.menit) > 60)?.length
        this.items.push({
          tgl: tangg,
          jml_lembar_resep: uniqueNoreseps?.length,
          total_menit: TotalMenit,
          less30: this.tipeObat == 'Obat Jadi' && this.params.response_time === 'Obat' ? less30 : less60,
          more30: this.tipeObat == 'Obat Jadi' && this.params.response_time === 'Obat' ? more30 : more60,
          // jenis: this.params.response_time === 'Obat' ? this.tipeObat : item?.unit,
        })
      })
    },
    filterAndSetItems () {
      if (this.tipe === 'Rinci') {
        if (this.params.generik === 'Semua' && this.params.formularium === 'Semua') {
          this.items = [...this.rawItems]
        } else {
          const items = [...this.rawItems]
          this.items = items.filter(item => {
            if (this.params.generik === 'Generik') {
              return item.status_generik == '1'
            } else if (this.params.generik === 'Non Generik') {
              return item.status_generik != '1'
            } else {
              return item
            }
          }).filter(item => {
            if (this.params.formularium === 'Fornas') {
              return item.status_fornas == '1'
            } else if (this.params.formularium === 'Forkit') {
              return item.status_forkit == '1' && item.status_fornas != '1'
            } else {
              return item
            }
          }).filter(item => {
            if (this.params.kelompok == '') return item
            else return item.perbekalan == this.params.kelompok
          })
        }
      }
      else this.setRekapGenerik()

    },

    // Helper function untuk memproses data dalam chunks
    chunkArray (array, size) {
      const chunked = []
      for (let i = 0; i < array?.length; i += size) {
        chunked.push(array.slice(i, i + size))
      }
      return chunked
    },
    setRekapGenerik () {
      this.items = []
      const rawDates = this.reseps.map(item => date.formatDate(item.tgl_permintaan, 'YYYY-MM-DD'))
      const uniqueDates = [...new Set(rawDates)]

      uniqueDates.forEach(tangg => {
        const noreseps = this.reseps.filter(item => tangg === date.formatDate(item.tgl_permintaan, 'YYYY-MM-DD'))
        const resepnya = noreseps.map(item => item.noresep)
        const uniqueNoreseps = [...new Set(resepnya)]
        let permintaan = this.rawItems.filter(item => (tangg === date.formatDate(item.tgl, 'YYYY-MM-DD') && item.jumlah_resep > 0))
        let dilayani = this.rawItems.filter(item => (tangg === date.formatDate(item.tgl, 'YYYY-MM-DD') && item.jumlah_dilayani > 0))
        if (!!this.params.kelompok) {
          const tempPer = permintaan.filter(item => item.perbekalan == this.params.kelompok)
          const tempLay = dilayani.filter(item => item.perbekalan == this.params.kelompok)
          permintaan = tempPer
          dilayani = tempLay
        }
        // console.log('permintaan', this.params.kelompok, !!this.params.kelompok)

        const item = {
          tgl: tangg,
          jml_lembar_resep: uniqueNoreseps?.length,
          ditulis: {
            jml_fornas_generik: permintaan.filter(item => item.status_fornas == '1' && (item.status_generik == '1'))?.length,
            jml_fornas_non_generik: permintaan.filter(item => item.status_fornas == '1' && item.status_generik != '1')?.length,
            jml_forkit_generik: permintaan.filter(item => item.status_fornas != '1' && item.status_forkit == '1' && (item.status_generik == '1'))?.length,
            jml_forkit_non_generik: permintaan.filter(item => item.status_fornas != '1' && item.status_forkit == '1' && item.status_generik != '1')?.length,
            non_formulaium: permintaan.filter(item => item.status_fornas != '1' && item.status_forkit != '1' && item.status_generik != '1')?.length,
          },
          dilayani: {
            jml_fornas_generik: dilayani.filter(item => item.status_fornas == '1' && (item.status_generik == '1'))?.length,
            jml_fornas_non_generik: dilayani.filter(item => item.status_fornas == '1' && item.status_generik != '1')?.length,
            jml_forkit_generik: dilayani.filter(item => item.status_fornas != '1' && item.status_forkit == '1' && (item.status_generik == '1'))?.length,
            jml_forkit_non_generik: dilayani.filter(item => item.status_fornas != '1' && item.status_forkit == '1' && item.status_generik != '1')?.length,
            non_formulaium: permintaan.filter(item => item.status_fornas != '1' && item.status_forkit != '1' && item.status_generik != '1')?.length,
          },
        }
        this.items.push(item)
      })
      // console.log('items', this.items)
      // console.log('rawDates', rawDates, uniqueDates, this.reseps)

    },
    async getOptionKelompok () {
      try {
        const response = await api.get('v1/simrs/laporan/farmasi/spm/get-option-kelompok')
        this.optionKelompoks = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async getOptionSistemBayar () {
      try {
        const response = await api.get('v1/simrs/laporan/farmasi/spm/get-option-sistem-bayar', { params: this.params })
        this.optionSistemBayars = response.data
      } catch (error) {
        console.error(error)
      }
    },
    setField () {
      if (this.jenisLaporan === 'Generik') {
        if (this.tipe === 'Rekap') {
          this.fields = {
            No: 'no',
            'Tanggal': 'tgl',
            'Lembar Resep': 'jml_lembar_resep',
            'Ditulis Fornas Generik': 'ditulis.jml_fornas_generik',
            'Ditulis Fornas Non Generik': 'ditulis.jml_fornas_non_generik',
            'Ditulis Forkit Generik': 'ditulis.jml_forkit_generik',
            'Ditulis Forkit Non Generik': 'ditulis.jml_forkit_non_generik',
            'Ditulis Non Formulaium': 'ditulis.non_formulaium',

            'Dilayani Fornas Generik': 'dilayani.jml_fornas_generik',
            'Dilayani Fornas Non Generik': 'dilayani.jml_fornas_non_generik',
            'Dilayani Forkit Generik': 'dilayani.jml_forkit_generik',
            'Dilayani Forkit Non Generik': 'dilayani.jml_forkit_non_generik',
            'Dilayani Non Formulaium': 'dilayani.non_formulaium',
          }
        }
        else {
          this.fields = {
            No: 'no',
            'Kode Obat': 'kdobat',
            'Nama Obat': 'nama_obat',
            'Nomor Resep': 'noresep',
            'Tanggal': 'tgl',
            'Jumah Resep': 'jumlah_resep',
            'Jumlah Dilayani': 'jumlah_dilayani',
            'Kelompok Obat': 'kelompok',
            'Jenis Perbekalan': 'perbekalan',
            'Generik ?': 'generik',
            'Status Generik': 'status_generik',
            'Fornas ?': 'fornas',
            'Status Fornas': 'status_fornas',
            'Forkit ?': 'forkit',
            'Status Forkit': 'status_forkit',
            'Status Obat Program': 'obat_program',
            'Depo': 'depo',
            'Nama Dokter': 'nama_dokter',
            'Kode Sistem Bayar': 'kode_sistembayar',
            'Nama Sistem Bayar': 'nama_sistembayar'
          }
        }

      } else if (this.jenisLaporan === 'Response Time') {
        if (this.tipe === 'Rekap') {
          if (this.params.response_time === 'Obat') {
            this.fields = {
              No: 'no',
              'Tanggal': 'tgl',
              'Lembar Resep': 'jml_lembar_resep',
              'Total Menit': 'total_menit',
              'Response Time > 30 menit': 'more30',
              'Response Time <= 30 menit': 'less30',
              'Jenis Obat': 'jenis',
            }
          } else {
            this.fields = {
              No: 'no',
              'Tanggal': 'tgl',
              'Jumlah Permintaan': 'jml_lembar_resep',
              'Total Menit': 'total_menit',
              // 'Response Time > 30 menit': 'more30',
              // 'Response Time <= 30 menit': 'less30',
            }
            if (this.tipeObat == 'Obat Jadi' && this.params.response_time == 'Obat') this.fields['Response Time > 30 menit'] = 'more30'
            else this.fields['Response Time > 60 menit'] = 'more30'
            if (this.tipeObat == 'Obat Jadi' && this.params.response_time == 'Obat') this.fields['Response Time =< 60 menit'] = 'less30'
            else this.fields['Response Time <= 60 menit'] = 'less30'
          }
        }
        else {
          if (this.params.response_time === 'Obat') {
            this.fields = {
              No: 'no',
              'Tanggal': 'tgl',
              'Nomor Resep': 'noresep',
              'Jam Masuk Resep': 'jam_masuk',
              'Jam Selesai Obat': 'jam_selesai',
              'Total Menit': 'menit',
              'Jenis Obat': 'jenis',
              'Sistem Bayar': 'sistembayar',
            }
          } else {
            this.fields = {
              No: 'no',
              'Tanggal': 'tgl',
              'Nomor Permintaan': 'noresep',
              'Tgl & Jam Pengajuan Permintaan': 'jam_masuk',
              'Tgl & Jam Diterima ': 'jam_selesai',
              'Total Menit': 'menit',
              'Unit yang mengajukan': 'jenis',
            }
          }
        }
      } else {
        if (this.tipe === 'Rekap') {
          this.fields = {
            'No': 'no',
            'Tanggal': 'tgl',
            'Rawat Jalan (Fornas)': 'rajal.fornas',
            'Rawat Jalan (Total)': 'rajal.total',
            'Rawat Inap (Fornas)': 'ranap.fornas',
            'Rawat Inap (Total)': 'ranap.total',
            'Total (Fornas)': 'total.fornas',
            'Total (Total)': 'total.total',

          }
        } else {
          this.fields = {
            'No': 'no',
            'Tanggal': 'tgl',
            'Nomor Resep': 'nomor',
            'Ruang': 'ruang',
            'Dokter': 'dokter',
            'Fornas': 'fornas',
            'Total': 'total',
            'Keterangan': 'ket',
          }
        }
      }
    },
    fetch () {
      if (!this.items?.length) {
        this.getDataTable()
      }
      this.setField()
      let data = []
      let loop = true
      if (this.jenisLaporan === 'Response Time') {
        if (this.tipe === 'Rekap') data = [...this.items]
        else {
          loop = false
          this.items.forEach((item, i) => {
            data.push({
              no: i + 1,
              tgl: item.tgl,
              noresep: this.params.response_time == 'Obat' ? item?.noresep : item?.no_permintaan,
              menit: item.menit,
              jenis: this.params.response_time == 'Obat' ? item?.jenis : item?.unit,
              sistembayar: item.sistembayar,
              jam_masuk: this.params.response_time === 'Obat' ? date.formatDate(item?.tgl_kirim, 'HH:mm:ss') : date.formatDate(item?.tgl_kirim, 'DD MMMM / HH:mm:ss'),
              jam_selesai: this.params.response_time === 'Obat' ? date.formatDate(item?.tgl_selesai, 'HH:mm:ss') : date.formatDate(item?.tgl_selesai, 'DD MMMM / HH:mm:ss'),
            })
          })
        }
      }
      else data = [...this.items]



      if (loop) data.forEach((item, i) => {
        item.no = i + 1
      })
      // console.log('data', data)

      return data
    },

    startDownload () { this.loadingDownload = true },
    finishDownload () { this.loadingDownload = false },
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLaporanSpmFarmasiStore, import.meta.hot))
}
