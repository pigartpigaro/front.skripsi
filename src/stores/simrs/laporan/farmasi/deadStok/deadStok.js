import { acceptHMRUpdate, defineStore } from "pinia"
import { date } from "quasar"
import { api } from "src/boot/axios"

export const useDeadStokReportStore = defineStore('laporan_dead_stok', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      dari_bulan: date.formatDate(Date.now(), 'MM'),
      dari_tahun: date.formatDate(Date.now(), 'YYYY'),
      sampai_bulan: date.formatDate(Date.now(), 'MM'),
      sampai_tahun: date.formatDate(Date.now(), 'YYYY'),
      kode_ruang: ''
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
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ]
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setPage (val) {
      this.setParams('page', val)
      this.getData()
    },
    setSearch (val) {
      this.setParams('q', val)
      this.getData()
    },
    async getData () {
      this.loading = true
      const param = {
        params: this.params
      }
      await api.get('v1/simrs/laporan/farmasi/persediaan/get-dead-stok', param)
        .then(resp => {
          this.loading = false
          console.log(resp?.data)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDeadStokReportStore, import.meta.hot))
}
