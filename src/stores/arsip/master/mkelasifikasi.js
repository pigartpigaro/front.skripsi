import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifSuccess } from "src/modules/utils";

export const useArsipMasterKelasifikasiStore = defineStore('arsip-master-kelasifikasi', {
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
        const resp = await api.post('v1/arsip/master/simpankelasifikasi', this.form)
        if (resp.status === 200) {
          //this.items.push(resp?.data?.result)
          // const data = resp?.data?.result
          this.items = resp?.data?.result
          notifSuccess(resp)
          this.loadingSave = false
          this.form.id = ''
          this.form.kode = ''
          this.form.kelasifikasi = ''
          this.form.retensi = ''
        }
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        this.loadingSave = false
      }
    },
    async getMkelasifikasi() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/arsip/master/getmasterarsip', params)
      if (resp.status === 200) {
        this.items = resp.data
        this.loading = false
      }
      this.loading = false
    },
    editForm(val) {
      this.form.id = val?.id
      this.form.kode = val?.kode
      this.form.kelasifikasi = val?.nama
      this.form.retensi = val?.retensi
    },
    async deleteData(id) {
      const payload = { id }
      try {
        const resp = await api.post('/v1/arsip/master/deletekelasifikasi', payload)
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
      this.getMkelasifikasi()
    },
  }
})
