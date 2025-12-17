import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useListKunjunganBpjsStore } from './lists'
import { notifSuccess } from 'src/modules/utils'

export const useSepBpjsStore = defineStore('sep_bpjs', {
  state: () => ({
    loading: false,
    loadingsep: false,
    isOpen: false,
    items: [],
    itemsx: []
  }),
  actions: {
    setOpen() {
      this.isOpen = !this.isOpen
    },
    async getSep(val) {
      this.loading = true
      console.log('form', val)
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/re-createsep', val)
        .then(resp => {
          const list = useListKunjunganBpjsStore()
          list.getLists()
          this.loading = false
          console.log('sep', resp.data.data)
          val.sep = resp.data?.data?.ins?.rs8
          notifSuccess(resp)
          Promise(resolve => { resolve(resp) })
        })
        .catch(() => {
          this.loading = false
        })
    },
    async carisep(val) {
      console.log('form', val)
      this.items = []
      this.itemsx = []
      this.loadingsep = true
      const sep = val?.sep ?? val?.nosep
      const payload = { nosep: sep, noka: val?.noka }
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/carisep', payload)
        .then(resp => {
          this.loadingsep = false
          console.log('sep', resp.data.data)
          this.items = resp.data?.data?.result
          this.itemsx = resp.data?.datax?.result
          Promise(resolve => { resolve(resp) })
        })
        .catch(() => {
          this.loadingsep = false
        })
    }
  }
})
