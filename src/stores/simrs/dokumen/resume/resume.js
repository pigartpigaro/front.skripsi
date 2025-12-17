import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
export const useDokumenResumeStore = defineStore('dokumen_resume', {
  state: () => ({
    loading: false,
    items: [],
    item: {},
    meta: {},
    params: {
      noreg: ''
    }
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    getData () {
      this.item = {}
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/dokumen/rajal/resume', param)
          .then(resp => {
            this.loading = false
            this.item = resp.data?.data ?? {}
            this.items = resp.data
            console.log('resp resume', resp, this.item)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
