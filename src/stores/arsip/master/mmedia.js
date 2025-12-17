import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifSuccess } from "src/modules/utils";

export const useArsipMasterMediaStore = defineStore('arsip-master-media', {
  state: () => ({
    items: [],
    loading: false,
    form: {
      id: ''
    },
    params: {
      q: '',
    },
  }),
  actions: {
    async simpanMaster() {
      try {
        const resp = await api.post('v1/arsip/master/simpanmedia', this.form)
        if (resp.status === 200) {
          //this.items.push(resp?.data?.result)
          // const data = resp?.data?.result
          this.items = resp?.data?.result
          notifSuccess(resp)
          this.loadingSave = false
          this.form.id = ''
          this.form.media = ''
        }
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        this.loadingSave = false
      }
    },
    async getMastermedia() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/arsip/master/getmastermedia', params)
      if (resp.status === 200) {
        this.items = resp.data
        this.loading = false
      }
      this.loading = false
    },
    editForm(val) {
      this.form.id = val?.id
      this.form.media = val?.nama_media
    },
    async deleteData(id) {
      const payload = { id }
      try {
        const resp = await api.post('/v1/arsip/master/deletemastermedia', payload)
        if (resp.status === 200) {
          this.items = resp?.data?.result
          notifSuccess(resp)
        }
      }
      catch (error) {
        notifErr(error)
      }
    },
    search(val) {
      this.params.q = val
      this.getMastermedia()
    },
  }
})
