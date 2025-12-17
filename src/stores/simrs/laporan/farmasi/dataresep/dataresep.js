import { acceptHMRUpdate, defineStore } from "pinia"
import { date } from "quasar"
import { api } from "src/boot/axios"

export const useLaporanDataResepStore = defineStore('laporan_data_resep', {
  state: () => ({
    loading: false,
    loadingNext: false,
    scrolling: false,
    loadingDownload: false,
    ketProses: null,
    items: [],
    meta: {},
    disp: {
      from: date.formatDate(Date.now(), '01 MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    },
    params: {
      q: '',
      per_page: 100,
      page: 1,
      from: date.formatDate(Date.now(), 'YYYY-MM-01'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenis: 'detail',
      tipe: 'iter',
      kode_ruang: 'Gd-05010101',
    },
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
    gudangs: [
      { nama: 'Semua', value: 'all' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
      { nama: 'Depo IGD', value: 'Gd-04010104' }
    ],
    types: [
      { nama: 'Semua', value: 'all' },
      { nama: 'Normal', value: 'normal' },
      { nama: 'Iter', value: 'iter' },
      { nama: 'PRB', value: 'prb' },
    ],
    optionJenis: [
      { nama: 'Detail', value: 'detail' },
      { nama: 'Rekap', value: 'rekap' }
    ],
  }),
  actions: {

    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      console.log(this.params.q)
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
      this.getDataTable()
      this.meta = {}
      this.items = []
    },

    async getDataTable (val) {
      this.ketProses = null
      // this.setParams('per_page', 50)
      if (this.params.page === 1) this.loading = true
      else this.loadingNext = true
      this.scrolling = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/resep/get-data-resep', param)
        .then(resp => {
          if (this.params.action === 'download') delete this.params.action
          setTimeout(() => {
            this.scrolling = false
          }, 1000)
          this.loading = false
          this.loadingNext = false
          this.meta = resp.data?.meta
          // this.items = resp?.data?.data
          this.mapingItem(resp?.data?.data, this.items)
          console.log('data tabel', this.items)
        })
        .catch(() => {
          this.loading = false
          this.loadingNext = false
        })
    },
    async getAllData () {

      const param = { params: this.params }
      const items = []

      if (this.meta?.current_page >= 1 && this.meta?.current_page === this.meta?.last_page) {
        Dialog.create({
          title: 'Konfirmasi',
          message: 'Apakah Akan Mengambil ulang data?',
          ok: {
            label: 'Ya',
            color: 'primary',
            push: true
          },
          cancel: {
            label: 'Tidak',
            color: 'negative',
            push: true
          },
          persistent: true,

        })
          .onOk(async () => {
            this.setParams('page', 1)
            this.meta = {
              current_page: 0,
              last_page: 5
            }
            this.ketProses = 'Mengambil data halaman '

            let currentPage = 1
            let totalPages = 5
            do {
              param.params.page = currentPage // Tambahkan parameter halaman
              const resp = await api.get('v1/simrs/laporan/farmasi/resep/get-data-resep', param)
              if (!resp?.data?.data?.length) {
                if (currentPage === 1) {
                  this.ketProses = null
                  return notifErrVue('Data tidak ditemukan')
                }
                break
              }
              this.ketProses = 'Mengambil data halaman '
              totalPages = resp.data?.meta?.last_page || totalPages // Total halaman dari API
              this.meta = resp.data?.meta
              this.mapingItem(resp?.data?.data, items)

              currentPage++
            } while (currentPage <= totalPages)

            this.ketProses = null
            this.items = items
          })
      } else {
        this.ketProses = 'Mengambil data halaman '

        this.meta = {
          current_page: 0,
          last_page: 5
        }
        let currentPage = this.meta?.current_page + 1 ?? 1
        let totalPages = this.meta?.last_page ?? 5
        do {
          param.params.page = currentPage // Tambahkan parameter halaman
          const resp = await api.get('v1/simrs/laporan/farmasi/resep/get-data-resep', param)
          if (!resp?.data?.data?.length) {
            if (currentPage === 1) {
              this.ketProses = null
              return notifErrVue('Data tidak ditemukan')
            }
            break
          }
          this.ketProses = 'Mengambil data halaman '
          totalPages = resp.data?.meta?.last_page || totalPages // Total halaman dari API
          this.meta = resp.data?.meta
          this.mapingItem(resp?.data?.data, items,)

          currentPage++
        } while (currentPage <= totalPages)
        this.ketProses = null
        this.items = items

      }
    },

    setField () {
      if (this.params.jenis === 'rekap') {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Fornas: 'fornas',
          Forkit: 'forkit',
          Generik: 'generik',
          Jumlah: 'jumlah',
        }
      }
      else {
        this.fields = {
          No: 'no',
          'Tanggal Resep': 'tgl_selesai',
          'No Resep': 'noresep',
          'No Rm': 'norm',
          'Jenis Resep': 'tiperesep',
          'Nama Dokter': 'dokter',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Jumlah: 'jumlah',
          Fornas: 'fornas',
          Forkit: 'forkit',
          Generik: 'generik',
          total: 'total',
        }
      }
    },
    cekNan (val) {
      return isNaN(parseFloat(val)) ? '' : val
    },
    async fetch () {
      // laravel throttle 180 ms
      this.setField()
      const param = { params: this.params }
      // param.params.action = 'download'
      this.ketProses = 'Mengambil data halaman '

      const data = []
      let items = []

      // this.items = []
      // this.setParams('page', 1)
      if (this.meta?.current_page >= 1 && this?.meta.current_page === this?.meta.last_page) {
        items = [...this.items]
      } else {
        items = [...this.items]
        this.meta = {
          current_page: 0,
          last_page: 5
        }
        let currentPage = this.meta?.current_page + 1 ?? 1
        let totalPages = this.meta?.last_page ?? 5
        do {
          param.params.page = currentPage // Tambahkan parameter halaman
          const resp = await api.get('v1/simrs/laporan/farmasi/resep/get-data-resep', param)
          if (!resp?.data?.data?.length) {
            if (currentPage === 1) {
              this.ketProses = null
              return notifErrVue('Data tidak ditemukan')
            }
            break
          }
          this.ketProses = 'Mengambil data halaman '
          totalPages = resp.data?.meta?.last_page || totalPages // Total halaman dari API
          this.meta = resp.data?.meta
          this.mapingItem(resp?.data?.data, items, 'download')

          currentPage++
        } while (currentPage <= totalPages)
      }

      items.forEach((item, i) => {
        if (item?.data?.length) {
          item?.data.forEach((dat, d) => {
            const ada = {}
            if (d === 0) {
              ada.no = i + 1
              ada.kd_obat = item?.kd_obat
              ada.nama_obat = item?.nama_obat
              ada.fornas = item?.fornas == '1' ? 'Ya' : 'Tidak'
              ada.forkit = item?.forkit == '1' ? 'Ya' : 'Tidak'
              ada.generik = item?.generik == '1' ? 'Ya' : 'Tidak'
              ada.total = item?.jumlah
              ada.tgl_selesai = dat?.tgl_selesai
              ada.noresep = dat?.noresep
              ada.norm = dat?.norm
              ada.tiperesep = dat?.tiperesep
              ada.dokter = dat?.dokter
              ada.jumlah = dat?.jumlah
              // console.log('d', ada, item)

            } else {
              ada.tgl_selesai = dat?.tgl_selesai
              ada.noresep = dat?.noresep
              ada.norm = dat?.norm
              ada.tiperesep = dat?.tiperesep
              ada.dokter = dat?.dokter
              ada.jumlah = dat?.jumlah
            }


            // const indexData = data.findIndex(f => f.kd_obat === item?.kd_obat)
            // if (indexData >= 0) data[indexData] = ada
            // else data.push(ada)
            data.push(ada)

          })
        }
        else {
          console.log('ada tidak')
          const temp = {}
          temp.no = i + 1
          temp.kd_obat = item?.kd_obat
          temp.nama_obat = item?.nama_obat
          temp.fornas = item?.fornas == '1' ? 'Ya' : 'Tidak'
          temp.forkit = item?.forkit == '1' ? 'Ya' : 'Tidak'
          temp.generik = item?.generik == '1' ? 'Ya' : 'Tidak'
          temp.jumlah = item?.jumlah

          // const indexAda = data.findIndex(f => f.kd_obat === item?.kd_obat)
          // if (indexAda >= 0) data[indexAda] = temp
          // else data.push(temp)
          data.push(temp)

        }
      })

      console.log('items', data)
      this.ketProses = null
      this.items = [...items]
      return data
    },
    startDownload () { this.loadingDownload = true },
    finishDownload () { this.loadingDownload = false },
    mapingItem (data, array) {
      data.forEach(it => {
        it.jumlah = it?.resepkeluar?.reduce((a, b) => a + b.jumlah, 0) + it?.resepkeluarracikan?.reduce((a, b) => a + b.jumlah, 0)
        it.data = []
        if (this.params.jenis === 'detail') {
          if (it?.resepkeluar?.length) {
            it?.resepkeluar.forEach(item => {
              const data = {
                jumlah: item.jumlah,
                tgl_selesai: item.tgl_selesai,
                noresep: item.noresep,
                norm: item.norm,
                tiperesep: item.tiperesep,
                dokter: item.dokter?.nama,
              }
              const indexData = it.data.findIndex(a => a.noresep === item.noresep)
              if (indexData >= 0) {
                it.data[indexData].jumlah += item.jumlah
                // it.data[indexData] = data
              }
              else it.data.push(data)
            })
          }
          if (it?.resepkeluarracikan?.length) {
            it?.resepkeluarracikan.forEach(item => {
              const data = {
                jumlah: item.jumlah,
                tgl_selesai: item.tgl_selesai,
                noresep: item.noresep,
                norm: item.norm,
                tiperesep: item.tiperesep,
                dokter: item.dokter?.nama,
              }
              const indexData = it.data.findIndex(a => a.noresep === item.noresep)
              if (indexData >= 0) {
                it.data[indexData].jumlah += item.jumlah
                // it.data[indexData] = data
              }
              else it.data.push(data)
            })
          }
          if (!it.data?.length) it.data = [{ jumlah: 0, tgl_selesai: '-', noresep: '-', norm: '-', tiperesep: '-', dokter: '-' }]
        }

        const index = array.findIndex(a => a.kd_obat === it.kd_obat)
        if (index >= 0) array[index] = it
        else array.push(it)
      })



    }
  }

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLaporanDataResepStore, import.meta.hot))
}
