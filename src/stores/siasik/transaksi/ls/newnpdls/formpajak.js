import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifErr, notifSuccess } from "src/modules/utils";


export const formInputPajakStore = defineStore('form_input_pajak', {
  state: () => ({
    loading: false,
    disabled: false,
    fixed: false,
    reqs: {
      q: '',
      nonpdls: null
    },
    form: {
      nonpdls: null,
      koderekening: null,
      uraian: null,
      nilai: 0,
      // pph21: '',
      // pph22: '',
      // pph23: '',
      // pph25: '',
      // ppnpusat: '',
      // pasal4: '',
      // pajakdaerah: '',
    },
    getpajak: [],
    listpajak: []
  }),
  actions: {
    refreshTable() {
      this.getListpajak()
    },
    resetForm() {
      this.form.koderekening = ''
      this.form.uraian = ''
      this.form.nilai = 0
    },
    getSelectpajak() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/belanja_ls/selectpajak', params).then((resp) => {
          if (resp.status === 200) {
            this.getpajak = resp.data
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    async savePajak() {
      this.loading = true
      return new Promise((resolve) => {
        api.post('/v1/transaksi/belanja_ls/savepajakls', this.form)
          .then((resp) => {
            this.loading = false
            notifSuccess(resp)
            // console.log('form', this.form)
            resolve(resp.data)
          })
          .catch(() => {
            this.loading = false
            this.form = []
          })
      })
    },
    getListpajak() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/belanja_ls/listpajak', params).then((resp) => {
          if (resp.status === 200) {
            this.listpajak = resp.data
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    deletePajak(row) {
      this.loading = true
      return new Promise((resolve) => {
        api.post('v1/transaksi/belanja_ls/deletepajak', row).then((resp) => {
          if (resp.status === 200) {
            this.loading = false
            // console.log('delete', resp)
            notifSuccess(resp)
            this.refreshTable()
            resolve(resp)
          }
        }).catch(() => {
          this.loading = false
        })
      })
    }
  }
})
