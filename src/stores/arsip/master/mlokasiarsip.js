import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useArsipMasterlokasiArsipStore = defineStore('arsip-master-lokasiarsip-store', {
  state: () => ({
    items: []
  }),
  actions: {
    async getMlokasiArsip() {
      const resp = await api.get('/v1/arsip/master/getmasterlokasiarsip')
      if (resp.status === 200) {
        this.items = resp.data
      }
    },
  }
})
