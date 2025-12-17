import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListBastObatKonsinyasiStore = defineStore('list_bast_obat_konsinyasi', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 100,
      bast: 'belum',
      bayar: 'belum'
    },
    filterSudah: [
      { nama: 'Sudah', value: 'sudah' },
      { nama: 'Belum', value: 'belum' },
    ],
    total: {
      trans: 0,
      bast: 0,
      bayar: 0
    },
    columns: [
      'penyedia',
      'nomor',
      'tanggal',
      'total',
      'oleh',
      'act',
    ],
    columnHide: []
  }),
  actions: {

    setParams (key, val) {
      this.params[key] = val
    },
    refreshTable () {
      this.setParams('page', 1)
      this.getData()
    },
    setPage (val) {
      this.setParams('page', val)
      this.getData()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getData()
    },
    setSearch (val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getData()
    },
    getInitialData () {
      this.getData()
    },
    async getData () {
      this.items = []
      this.total.bast = 0
      this.total.trans = 0
      this.total.bayar = 0
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/bast-konsi/list-konsi', param)
        .then(resp => {
          this.loading = false
          // console.log('list kon', resp?.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.meta ?? resp?.data

          if (this.items?.length) {
            this.total.bast = this.items.reduce((a, b) => a + b.jumlah_bast, 0)
            this.total.trans = this.items.reduce((a, b) => a + b.jumlah_konsi, 0)
            this.total.bayar = this.items.reduce((a, b) => a + b.total_pembayaran, 0)
          }
          console.log('items', this.items)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
