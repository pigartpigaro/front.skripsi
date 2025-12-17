import { acceptHMRUpdate, defineStore } from "pinia"
import { date } from "quasar"
import { api } from "src/boot/axios"
import { notifErrVue, notifSuccess } from "src/modules/utils"

export const useRestriksiFornasStore = defineStore('restriksi-fornas-store', {
  state: () => ({
    loading: false,
    isOpen: false,
    loadingSimpan: false,
    loadingHapus: false,
    items: [],
    meta: {},
    params: {
      page: 1,
      q: '',
      per_page: 10,
    },
    form: {

    },
    fornas: true,
    depo: 'Gd-04010102',
    columns: [
      'obat',
      'jumlah',
      'tgl',
      'kecuali',
      'act'
    ],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
      { nama: 'Depo IGD', value: 'Gd-04010104' }
    ],
    ruangs: []
  }),
  actions: {
    setParams (payload, value) {
      this.params[payload] = value
    },
    setPage (payload) {
      this.setParams('page', payload)
      this.getData()
    },
    setPerPage (payload) {
      this.setParams('per_page', payload)
      this.setParams('page', 1)
      this.getData()
    },
    refreshTable () {
      this.getData()
    },
    setSearch (payload) {
      this.setParams('page', 1)
      this.setParams('q', payload)
      this.getData()
    },

    getData () {
      this.loading = true
      this.params.fornas = this.fornas
      this.params.depo = this.depo
      return new Promise((resolve, reject) => {
        api.get('/v1/simrs/penunjang/farmasinew/restriksi/obat', { params: this.params })
          .then(resp => {
            this.loading = false
            console.log('resp', resp?.data)
            this.items = resp?.data?.data
            this.meta = resp?.data?.meta

            resolve(resp)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    getRuangan () {
      return new Promise((resolve, reject) => {
        api.get('/v1/simrs/penunjang/farmasinew/restriksi/ruangan',)
          .then(resp => {
            // console.log('resp', resp?.data)
            this.ruangs = resp?.data?.data
            resolve(resp)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    setEdit (row) {
      this.isOpen = true
      console.log('edit', row)
      this.form = row
      if (row.restriksiobat?.jumlah) this.form.jumlah = row.restriksiobat.jumlah
      if (row.restriksiobat?.tgl_mulai_berlaku) {
        this.form.dispTgl = date.formatDate(row.restriksiobat.tgl_mulai_berlaku, 'DD MMMM YYYY')
        this.form.tgl_mulai_berlaku = row.restriksiobat.tgl_mulai_berlaku
      }
    },

    save () {
      const form = {}
      form.depo = this.depo
      form.kd_obat = this.form.kd_obat
      form.jumlah = this.form.jumlah
      form.tgl_mulai_berlaku = this.form.tgl_mulai_berlaku
      // console.log('save this.form', form, this.form)
      if (!form.jumlah || !form.tgl_mulai_berlaku || parseFloat(form.jumlah) <= 0) return notifErrVue('Jumlah dan Tanggal tidak boleh kosong')
      this.form.loading = true
      return new Promise(resolve => {
        api.post('/v1/simrs/penunjang/farmasinew/restriksi/save-restriksi', form)
          .then(resp => {
            delete this.form.loading
            const data = resp?.data?.data
            const index = this.items.findIndex(item => item.id === data.id)
            if (index >= 0) {
              this.items[index] = data
            } else {
              this.items.push(data)
            }
            this.setEdit(data)
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            delete this.form.loading
          })
      })

    },
    addRuangan () {
      const form = {}
      form.depo = this.depo
      form.kd_obat = this.form.kd_obat
      form.kd_ruang = this.form.ruangan?.kode
      // console.log('this.form', form, this.form)
      this.form.loading = true
      return new Promise(resolve => {
        api.post('/v1/simrs/penunjang/farmasinew/restriksi/add-ruangan', form)
          .then(resp => {
            delete this.form.loading
            const data = resp?.data?.data
            const index = this.items.findIndex(item => item.id === data.id)
            if (index >= 0) {
              this.items[index] = data
            } else {
              this.items.push(data)
            }
            this.setEdit(data)

            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            delete this.form.loading
          })
      })


    },
    hapusRuangan (item) {
      const form = {
        id: item.id,
        depo: item.depo,
        kd_obat: item.kd_obat
      }
      item.loading = true
      console.log(form)
      return new Promise(resolve => {
        api.post('/v1/simrs/penunjang/farmasinew/restriksi/remove-ruangan', form)
          .then(resp => {

            delete item.loading
            const data = resp?.data?.data
            const index = this.items.findIndex(item => item.id === data.id)
            if (index >= 0) {
              this.items[index] = data
            } else {
              this.items.push(data)
            }
            this.setEdit(data)
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            delete item.loading
          })
      })

    },
    delete () {
      console.log(this.form)
      if (!this.form?.restriksiobat?.id) return notifErrVue('Restriksi Obat Tidak Ditemukan')
      const form = {
        id: this.form.restriksiobat.id,
        depo: this.depo,
        kd_obat: this.form.kd_obat
      }
      this.form.loading = true

      return new Promise(resolve => {
        api.post('/v1/simrs/penunjang/farmasinew/restriksi/delete-restriksi', form)
          .then(resp => {

            delete this.form.loading
            const data = resp?.data?.data
            const index = this.items.findIndex(item => item.id === data.id)
            if (index >= 0) {
              this.items[index] = data
            } else {
              this.items.push(data)
            }
            this.setEdit(data)
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            delete this.form.loading
          })
      })

    }

  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRestriksiFornasStore, import.meta.hot))
}
