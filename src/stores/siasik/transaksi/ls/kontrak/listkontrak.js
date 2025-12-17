import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const uselistKontrakPekerjaan = defineStore('list_kontra_kPekerjaan', {
  state: () => ({
    loading: false,
    reqs: {
      q: '',
      page: 1,
      tahun: date.formatDate(Date.now(), 'YYYY'),
      nokontrak: ''
      // rowsPerPage: 20,
      // rowsNumber: 0
    },
    kontraks: [],
    exportExcel: false
  }),
  actions: {
    setParams(key, val) {
      this.reqs[key] = val
    },
    getInitialData() {
      this.getlistKontrak()
    },
    refreshTable() {
      this.reqs.page = 1
      this.getInitialData()
    },
    onRequest(props) {
      // console.log('props', props)
      this.reqs.page = props?.pagination?.page ?? 1
      this.reqs.rowsPerPage = props?.pagination?.rowsPerPage ?? 20
      this.getInitialData()
    },
    setTahun(val) {
      this.reqs.tahun = val
    },

    goToPage(val) {
      this.reqs.page = val
      this.getlistKontrak()
    },

    getlistKontrak() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/transaksi/kontrak/listkontrak', params).then((resp) => {
          // console.log('kontrak', resp)
          if (resp.status === 200) {

            this.kontraks = resp.data
            // this.reqs.rowsNumber = resp.data.total
            this.loading = false
            resolve(resp)
          }
          else {
            this.loading = false
          }
        })
          .catch(() => {
            this.loading = false
          })
      })
    },
    deleteData(row) {
      this.loading = true
      return new Promise(resolve => {
        api.post('/v1/transaksi/kontrak/deletekontrak', row)
          .then(resp => {
            // console.log('resp delete', resp)
            this.loading = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    kunciData(row) {
      // console.log('KUNCI', row)
      this.loading = true;
      return new Promise((resolve) => {
        api.post('/v1/transaksi/kontrak/kuncidata', row)
          .then((resp) => {
            // console.log('resp', resp)
            this.loading = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch((err) => {
            console.error(err)
            this.loading = false
          });
      });
    }
  }
})
