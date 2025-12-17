import { acceptHMRUpdate, defineStore } from "pinia"
import { useEResepDepoFarmasiStore } from "./eresep"
import { notifErrVue, notifSuccess } from "src/modules/utils"
import { api } from "src/boot/axios"

export const useHistoryLaboratoriumPasienStore = defineStore('history_laboratorium_pasien_store', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingSimpan: false,
    items: [],
    form: {},

  }),
  getters: {
    resep () {
      return useEResepDepoFarmasiStore()
    }
  },
  actions: {

    checkItems () {
      // console.log('resep', this.resep?.resep)
      this.getData()
    },
    async getData () {
      this.loading = true
      try {
        const param = {
          params: {
            norm: this.resep?.resep?.norm
          }
        }
        const response = await api.get('/v1/simrs/farmasinew/depo/history-lab-pasien', param)
        if (response.status === 200) {
          console.log('response', response)
          this.items = response?.data?.data
        }

      } catch {
        notifErrVue('terjadi kesalahan')
      } finally {
        this.loading = false
      }
    },
    async simpan () {
      this.loadingSimpan = true
      this.form.noresep = this.resep?.resep?.noresep
      this.form.id = this.resep?.resep?.id
      try {
        const response = await api.post('/v1/simrs/farmasinew/depo/simpan-persyaratan-lab', this.form)
        if (response.status === 200) {
          const data = response?.data?.data
          // this.items = response?.data?.data
          const listItems = useEResepDepoFarmasiStore()?.items
          const index = listItems.findIndex(x => x.id === this.form.id)
          console.log('response simpan ', index, data, response)
          if (index >= 0) {
            listItems[index].persyarantan_lab = data?.persyarantan_lab
            console.log('items', data, listItems[index])

          }
          this.isOpen = false
          notifSuccess(response)
        }
      } catch {
        notifErrVue('terjadi kesalahan')
      } finally {
        this.loadingSimpan = false
      }
    }
  }

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHistoryLaboratoriumPasienStore, import.meta.hot))
}
