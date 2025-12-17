import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifSuccess } from "src/modules/utils";

export const useKeuanganMasterSistemBayarStore = defineStore('keuangan-master-sistembayar', {
  state: () => ({
    items: [],
    loading: false,
    loadingSave: false,
    loadingDelete: false,
    form: {
      kode: '',
      nama: '',
      group: '',
    },
    params: {
      q: '',
    },
  }),
  actions: {
    async simpanMaster() {
      this.loadingSave = true
      try {
        const resp = await api.post('/v1/simrs/master/keuangan/sistembayar/simpansistembayar', this.form)
        if (resp.status === 200) {
          //this.items.push(resp?.data?.result)
          // const data = resp?.data?.result
          this.items = resp?.data?.original
          notifSuccess(resp)
          this.loadingSave = false
          // this.form.id = ''
          this.form.kode = ''
          this.form.nama = ''
          this.form.group = ''
        }
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        this.loadingSave = false
      }
    },
    async getSistemBayar() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/simrs/master/keuangan/sistembayar/listsistembayar', params)
      if (resp.status === 200) {
        this.items = resp.data
        this.loading = false
      }
      this.loading = false
    },
    editForm(val) {
      this.form.kode = val?.rs1
      this.form.nama = val?.rs2
      // this.form.group = val?.groups?.toString()
      if (val?.groups === '1')
        this.form.group = 'BPJS'
      else if (val?.groups === '2')
        this.form.group = 'UMUM'
      else if (val?.groups === '3')
        this.form.group = 'TAGIHAN'
    },
    async deleteData(id) {
      this.loadingDelete = true
      const payload = { id }
      try {
        const resp = await api.post('/v1/simrs/master/keuangan/sistembayar/delete', payload)
        if (resp.status === 200) {
          this.items = resp?.data?.result
          notifSuccess(resp)
          this.loadingDelete = false
        }
        this.loadingDelete = false
      }
      catch (error) {
        notifErr(error)
        this.loadingDelete = false
      }
    },
    search(val) {
      this.params.q = val
      this.getSistemBayar()
    },
  }
})
