import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungIgdStore } from './pengunjung'
import { notifErr, notifErrVue, notifSuccess } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const useRencanaTerapiDokterStore = defineStore('rencana-terapi-dokter', {
  state: () => ({
    loadingsimpan: false,
    loadingaja: false,
    form: {
      id: '',
      ruangan: 'POL014'
    },

  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    async saveData(pasien) {
      this.loadingsimpan = true
      console.log('pasien', pasien)
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''
      try {
        const resp = await api.post('v1/simrs/igd/assesment/simpanrencanaterapidokter', this.form)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp?.data?.data
          // console.log('isi', isi)
          storePasien.injectDataPasien(pasien, isi, 'rencanaterapidokter')
          notifSuccess(resp?.data?.message)
          this.initReset()
          this.loadingsimpan = false
        }

        this.loadingsimpan = false
      }
      catch (error) {
        // console.log('anamnesis err', error)
        this.loadingsimpan = false
        notifErr(error)
      }
    },
    initReset() {
      this.form.id = ''
      this.form.rencanaterapi = ''
      this.form.monitoringpasien = ''
      this.form.targetdokter = ''
    },
    async deleteData(pasien, id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/igd/assesment/hapusrencanaterapidokter', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataRencanaTerapiDokter(pasien, id)
          notifSuccess(resp)
        }
      }
      catch (error) {
        notifErr(error)
      }
    },
    editForm(val) {
      // console.log('val', val)
      const appstore = useAplikasiStore()
      if (appstore.user?.pegawai?.kdpegsimrs !== val?.user_id) {
        notifErrVue('Anda Tidak Berhak Merubah Data ini, karena Bukan Anda Yang Menginput...!!!')
      } else {
        this.form = {
          id: val?.id,
          noreg: val?.noreg,
          norm: val?.norm,
          monitoringpasien: val?.monitoringpasien,
          rencanaterapi: val?.rencanaterapi,
          targetdokter: val?.targetdokter,
          ruangan: val?.ruangan,
          user_id: val?.user_id
        }
      }
    }
  }
})
