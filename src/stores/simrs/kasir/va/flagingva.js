import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifErr, notifSuccess } from "src/modules/utils";

export const useFlagingVaStore = defineStore('flaging-va', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    loadingbayar: false,
    pasiens: [],
    noreg: '',
    params: {
      q: '',
      page: 1,
      per_page: 10,
      status: ''
    },
  }),
  actions: {
    async getDataVa() {
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/simrs/kasir/va/listva', params)
        .then(resp => {
          // console.log('kunjungan igd', resp?.data?.data)
          this.loading = false
          this.pasiens = resp?.data?.data
          this.items = resp?.data?.data
          this.meta = resp?.data
        })
        .catch(() => { this.loading = false })
    },
    async simpanflaging(val) {
      val.loadingbayar = true

      const payload = {
        nova: val?.nova,
        total: val?.nominal,
      }
      try {
        const resp = await api.post('v1/simrs/kasir/va/flagingmanualva', payload)
        if (resp.status === 200) {
          const xxx = resp?.data?.result[0]
          const cariVa = this.items.findIndex((q) => q.id === xxx?.id)
          this.items[cariVa] = xxx
          notifSuccess(resp)
          this.loadingbayar = false
        }
        val.loadingbayar = false
      }
      catch (error) {
        val.loadingbayar = false
        notifErr(error)
      }
    },
    setQ(payload) {
      this.params.page = 1
      this.params.q = payload
      this.getDataVa()
    },
    refresh(val) {
      this.params.page = 1
      this.getDataVa()
    },
    search(val) {
      this.params.q = val
      this.params.page = 1
      this.getDataVa()
    },
    setParams(key, val) {
      this.params[key] = val
    },
    goToPage(val) {
      this.params.page = val
      this.getDataVa()
    },
    setPerPage(payload) {
      // console.log('sasa', payload)
      this.params.page = 1
      this.params.per_page = payload
    },
    setFilters() {
      this.filters = !this.filters
    },
  }
})
