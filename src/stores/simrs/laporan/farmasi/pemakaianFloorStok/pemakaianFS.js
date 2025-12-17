import { acceptHMRUpdate, defineStore } from "pinia"
import { date } from "quasar"
import { api } from "src/boot/axios"
import { useAplikasiStore } from "src/stores/app/aplikasi"

export const useLaporanPemakaianFloorStokStore = defineStore('laporan_pemakaian_floor_stok', {
  state: () => ({
    loading: false,
    loadingNext: false,
    scrolling: false,
    loadingDownload: false,
    items: [],
    obats: [],
    rawItems: [],
    meta: {},
    ketProses: null,
    params: {
      q: '',
      per_page: 100,
      page: 1,
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      kode_ruang: 'all',
    },
    ruangs: [{ kode: 'all', uraian: 'Semua' }],
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
    fields: {},
  }),
  actions: {

    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      // console.log(this.params.q)
      // this.setParams('q', payload)
      this.items = []
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (payload) {
      this.setParams('page', payload)
      this.getDataTable()
    },
    setPerPage (payload) {
      this.setParams('per_page', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    refreshTable () {
      this.setParams('page', 1)
      this.getDataTable()
    },
    getInitialData (val) {
      this.ketProses = null
      this.setParams('page', val)
      this.setParams('action', '')
      // this.getDataTable()
      this.getRuangans()
      this.meta = {}
      this.items = []
    },
    async getRuangans () {
      const { data } = await api.get('v1/simrs/laporan/farmasi/pemakaian-ruangan/get-ruangan')
      const ruang = data?.data
      const app = useAplikasiStore()
      const kdruangs = app?.user?.pegawai?.kdruangansim?.split('|')
      // console.log('kd', kdruangs)
      const depo = kdruangs?.filter(item => item?.toLowerCase()?.includes('gd-'))
      const adaRuangan = kdruangs?.filter(item => item?.toLowerCase()?.includes('r-'))
      if (adaRuangan?.length && !depo?.length) this.ruangs = ruang.filter(item => adaRuangan?.includes(item?.kode))
      else this.ruangs = ruang
      // this.ruangs = ruang.filter(item => adaRuangan?.includes(item?.kode)) // percobaan

      if (this.ruangs?.length > 1) this.ruangs.unshift({ kode: 'all', uraian: 'Semua' })
      else this.params.kode_ruang = this.ruangs[0]?.kode
      console.log('data', this.ruangs)
    },
    getAllData () { },
    async getDataTable () {
      this.items = []
      this.obats = []
      this.rawItems = []
      this.loading = true
      try {

        const worker = new Worker('/js/ruanganProcessor.js')

        worker.onmessage = (e) => {
          // console.log('e', e?.data)

          // const { type, processedData, progress, uprocessedData } = e.data
          if (e.data?.type === 'progress') {
            this.ketProses = `Memproses data `
            // this.progress = progress
          } else if (e.data?.type === 'complete') {
            this.rawItems.push(...e.data?.processedData)
            this.obats.push(...e.data?.obatsaja)
            // console.log('rawItems', this.obats, this.rawItems)
            this.dataProcessing()
            worker.terminate()
          }
        }

        this.setParams('page', 1)
        this.meta = {
          current_page: 0,
          last_page: 5
        }

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
            const resp = await api.get('v1/simrs/laporan/farmasi/pemakaian-ruangan/get-data', param)

            if (!resp?.data?.data?.length) {
              if (currentPage === 1) {
                this.ketProses = null
                return notifErrVue('Data tidak ditemukan')
              }
              break
            }
            totalPages = Math.min(resp.data?.meta?.last_page || totalPages)
            // totalPages = 10
            this.meta = resp.data?.meta
            // console.log('meta', this.meta, totalPages)

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


        this.ketProses = null

      } catch (error) {
        console.error('Error in getDataTable:', error)
        notifErrVue('Terjadi kesalahan saat mengambil data')
      } finally {
        this.loading = false
        this.ketProses = null
      }
    },
    chunkArray (array, size) {
      const chunked = []
      for (let i = 0; i < array?.length; i += size) {
        chunked.push(array.slice(i, i + size))
      }
      return chunked
    },
    dataProcessing () {
      console.log('data processing', this.obats, this.rawItems)
      this.obats.forEach(obat => {
        const mut = this.rawItems.filter(item => item.kd_obat === obat.kd_obat)

        const jum = mut.reduce((total, item) => total + item.jumlah, 0)
        obat.jumlah = jum

        const sub = mut.reduce((total, item) => total + item.subtotal, 0)
        obat.subtotal = sub

        const jum_pe = mut.reduce((total, item) => total + item.jumlah_pemakaian, 0)
        obat.jumlah_pemakaian = jum_pe

        const sub_pe = mut.reduce((total, item) => total + item.subtotal_pemakaian, 0)
        obat.subtotal_pemakaian = sub_pe

        obat.harga = mut[0]?.harga
      })
      this.items = [...this.obats]
    },
    setField () {
      if (this.params.jenis === 'rekap') {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Satuan: 'satuan_k',
          'Kode Belanja': 'uraian50',
          Keterangan: 'ket',
          'Jumlah Saldo Awal': 'jumlSalAwal',
          'Nilai Saldo Awal': 'nilaiSalAwal',
          'Jumlah Masuk': 'jumlMasuk',
          'Nilai Masuk': 'nilaiMasuk',
          'Jumlah Keluar': 'jumlKeluar',
          'Nilai Keluar': 'nilaiKeluar',
          'Jumlah Saldo Akhir': 'jumlSalAkhir',
          'Nilai Saldo Akhir': 'nilaiSalAkhir'
        }
      }
      else {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          'Jenis Perbekalan': 'jenis_perbekalan',
          'Bentuk Sediaan': 'bentuk_sediaan',
          Satuan: 'satuan_k',
          Harga: 'harga',
          'Jumlah Mutasi': 'jumlah',
          'Subtotal Mutasi': 'subtotal',
          'Jumlah Pemakaian': 'jumlah_pemakaian',
          'Subtotal Pemakaian': 'subtotal_pemakaian',
        }
      }
    },
    cekNan (val) {
      return isNaN(parseFloat(val)) ? '' : val
    },
    async fetch () {
      if (!this.items?.length) {
        this.getDataTable()
      }
      this.setField()
      let data = []
      let loop = true

      const subtotal = this.items.reduce((total, item) => total + item.subtotal, 0)
      const subtotalPem = this.items.reduce((total, item) => total + item.subtotal_pemakaian, 0)
      const tot = {
        subtotal: subtotal,
        subtotal_pemakaian: subtotalPem
      }
      data = [...this.items]
      data.push(tot)


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
  import.meta.hot.accept(acceptHMRUpdate(useLaporanPemakaianFloorStokStore, import.meta.hot))
}
