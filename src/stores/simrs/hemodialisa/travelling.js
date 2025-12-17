
import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useTravellingHDStore = defineStore('store-travelling-hd', {
  state: () => ({
    loading: false,
    params: { norm: '' },
    items: [],
    item: {},
    isOpen: false,
    form: {
      norm: '',
      name: '',
      age: '',
      address: '',
      diagnosa: '',
      start_date: null,
      last_date: null,
      lab_hasil: '',
      lab_hbsag: '',
      lab_hcv: '',
      lab_hiv: '',
      pengobatan: '',
      blood_pressure: '',
      vaskuler: '',
      frequency: '',
      qb: '',
      qd: '',
      tmp: '',
      heparinisasi: '',
      dialisat: '',
      dialyzer: '',
      komplikasi: '',
      gol_darah: '',
      transfusi: '',
      alergi: '',
      bb_kering: '',
      diet: '',
      ket: '',
    },
    dateDisp: {
      start_date: null,
      last_date: null
    }
  }),
  actions: {
    resetForm (data) {
      const diagnosa = data?.diagnosamedis?.map(item => item?.masterdiagnosa?.rs4).join(', ')
      this.form = {
        norm: data?.norm,
        name: data?.nama,
        age: data?.usia,
        address: data?.alamat,
        diagnosa: diagnosa,
        start_date: null,
        last_date: null,
        lab_hasil: '',
        lab_hbsag: '',
        lab_hcv: '',
        lab_hiv: '',
        pengobatan: '',
        blood_pressure: '',
        vaskuler: '',
        frequency: '',
        qb: '',
        qd: '',
        tmp: '',
        heparinisasi: '',
        dialisat: '',
        dialyzer: '',
        komplikasi: '',
        gol_darah: '',
        transfusi: '',
        alergi: '',
        bb_kering: '',
        diet: '',
        ket: '',
      }
    },
    initForm (data) {
      console.log('pasien', this.pasien)

      this.resetForm(data)
    },
    selectItem (data) {
      this.isOpen = true
      this.item = data
    },
    saveForm () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/simrs/hemodialisa/layanan/travelling/simpan', this.form)
          .then((resp) => {
            notifSuccess(resp)
            const data = resp?.data?.data
            const index = this.items.findIndex(item => item.id === data?.id)
            if (index >= 0) {
              this.items[index] = data
            } else {
              this.items.unshift(data)
            }
            this.loading = false
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    async getList (data) {
      await api.get('v1/simrs/hemodialisa/layanan/travelling/list', { params: { norm: data } })
        .then((resp) => {
          this.items = resp?.data?.data ?? resp?.data
        })
    },
    deleteData (data) {
      const form = {
        id: data.id
      }
      data.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/hemodialisa/layanan/travelling/hapus', form)
          .then(resp => {
            delete data.loading
            notifSuccess(resp)
            const index = this.items.findIndex(item => item.id === data.id)
            if (index >= 0) this.items.splice(index, 1)
            this.isOpen = false
            this.item = {}
            resolve(resp)
          })
          .catch(() => {
            delete data.loading
          })
      })
    }

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTravellingHDStore, import.meta.hot))
}
