import { acceptHMRUpdate, defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'
import { useListPasienHemodialisaStore } from './hemodialisa'
// import { notifSuccess } from 'src/modules/utils'

export const useDiagnosaKeperawatanHD = defineStore('diagnosa-keperawatan-hd', {
  state: () => ({
    diagnosas: [],
    selectDiagnosa: [],
    selectIntervensis: [],
    diagnosa: '',
    loadingSave: false
    // form: {
    //   norm: '',
    //   noreg: '',
    //   kddiagnosa: '',
    //   namadiagnosa: ''
    // }
  }),
  modalOpen: false,
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData () {
      const resp = await api.get('v1/simrs/pelayanan/diagnosakeperawatan')
      // console.log('diagnosa keperawatan', resp)
      if (resp.status === 200) {
        this.diagnosas = resp.data
      }
    },

    async getDiagnosaByNoreg (pasien) {
      const resp = await api.get(`v1/simrs/pelayanan/listdiagnosakeperawatan?noreg=${pasien?.noreg}`)
      console.log('get diagnosa', resp)
      if (resp.status === 200) {
        // this.selectDiagnosa = resp.data
        this.injectToKunjunganPasien(pasien, resp.data, 'ranap')
      }
    },

    setDiagnosa (val) {
      this.diagnosa = val
    },

    async simpanDiagnosadanIntervensi (pasien, cat) {
      this.loadingSave = true

      // console.log('diagnosa saved ', form)
      const form = this.tataForm(pasien, cat)

      try {
        const resp = await api.post('v1/simrs/pelayanan/simpandiagnosakeperawatan', form)
        // console.log('simpan', resp)
        if (resp.status === 200) {
          const noreg = pasien?.nota_permintaan ?? pasien?.noreg
          this.injectToKunjunganPasien(noreg, resp.data.result, cat)
          notifSuccess(resp)
          this.initReset()
          this.loadingSave = false
        }
        this.loadingSave = false
      }
      catch (error) {
        // console.log(error)
        notifErr(error)
      }
    },

    tataForm (pasien, cat) {
      let intv = []
      if (this.selectIntervensis?.length) {
        intv = this.selectIntervensis.map(x => {
          return {
            intervensi_id: x?.split('||')[0],
            diagnosakeperawatan_kode: x?.split('||')[1]
          }
        })
      }
      const thumb = []
      if (this.selectDiagnosa?.length) {
        for (let i = 0; i < this.selectDiagnosa?.length; i++) {
          const el = this.selectDiagnosa[i]
          const frm = {
            norm: pasien?.norm,
            kdruang: 'PEN005',
            noreg: cat == 'awal' ? pasien?.noreg : (pasien?.nota_permintaan ?? (pasien?.noreg ?? null)),
            kode: el?.kode,
            nama: el?.nama,
            details: intv.filter(x => x.diagnosakeperawatan_kode === el?.kode) ?? []
          }

          thumb.push(frm)
        }
      }

      const form = {
        diagnosa: thumb
      }
      return form
    },

    injectToKunjunganPasien (pasien, data, cat) {

      const storePasien = useListPasienHemodialisaStore()
      const arr = data

      for (let i = 0; i < arr?.length; i++) {
        const isi = arr[i]
        if (cat == 'awal') storePasien.injectDataPasien(pasien, isi, 'diagnosakeperawatan_awal_hd')
        else storePasien.injectDataPasien(pasien, isi, 'diagnosakeperawatan')
      }

    },

    async deleteDiagnosa (pasien, id, cat) {
      const payload = { id }
      const resp = await api.post('v1/simrs/pelayanan/deletediagnosakeperawatan', payload)
      // console.log('delete', resp)
      if (resp.status === 200) {

        this.deleteInjectan(pasien, id, cat)
        notifSuccess(resp)
      }
    },

    deleteInjectan (pasien, id, cat) {
      console.log('cat', cat, id, pasien)

      const storePasien = useListPasienHemodialisaStore()
      if (cat == 'awal') storePasien.hapusDataInjectan(pasien, id, 'diagnosakeperawatan_awal_hd')
      else storePasien.hapusDataInjectan(pasien, id, 'diagnosakeperawatan')
    },

    initReset () {
      this.diagnosa = ''
      this.selectDiagnosa = []
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDiagnosaKeperawatanHD, import.meta.hot))
}
