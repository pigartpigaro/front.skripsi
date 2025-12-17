import { defineStore } from "pinia"
import { api } from "src/boot/axios"

export const useUnitPengelolahArsip = defineStore('unit-pengelolah-arsip', {
  state: () => ({
    items: []
  }),
  actions: {
    async getMunitpengelolah() {
      const resp = await api.get('/v1/arsip/master/getMunitpengelolah')
      if (resp.status === 200) {
        this.items = resp.data
      }
    },
  }
})
