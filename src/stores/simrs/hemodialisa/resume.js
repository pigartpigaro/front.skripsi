import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
export const useDokumenResumeHDStore = defineStore('dokumen_resume-hd', {
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
    setParams(key, val) {
      this.params[key] = val
    },
    getData() {
      this.item = {}
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/dokumen/hemodialisa/resume', param)
          .then(resp => {
            this.loading = false
            console.log('resp resume', resp.data)
            this.item = resp.data?.length ? resp.data[0] : {}
            this.items = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
