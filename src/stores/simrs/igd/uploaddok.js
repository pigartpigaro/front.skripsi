import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { usePengunjungIgdStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { usePengunjungRanapStore } from '../../ranap/pengunjung'

export const useUploadDokStoreIgd = defineStore('upload-dok-igd', {
  state: () => ({
    masters: [],
    form: {},
    loadingSave: false
  }),
  actions: {

    initForm() {
      // anamnesis tambahan
      this.form.nama = null
      this.form.dokumen = []
    },

    getMaster() {
      //const params = { params: { ruangan: 'POL014' } }
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/dokumenupload/igd/master')
          .then((resp) => {
            // console.log(resp)
            if (resp.status === 200) {
              this.masters = resp.data
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    selectFiles(files) {
      for (let i = 0; i < files?.length; i++) {
        const images = files[i]
        this.form.dokumen.push(images)
      }
      // console.log('masukkan ke form', this.form)
    },

    saveData(pasien) {
      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm
      this.form.ruangan = 'POL014'

      const data = new FormData()
      for (let i = 0; i < this.form.dokumen; i++) {
        const images = this.form.dokumen[i]
        data.append(`dokumen[${i}]`, images)
      }
      data.append('noreg', pasien?.noreg)
      data.append('norm', pasien?.norm)
      data.append('nama', this.form.nama)
      this.loadingSave = true
      // console.log(data)
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/dokumenupload/igd/store', this.form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((resp) => {
            if (resp.status === 200) {
              const storePasien = usePengunjungIgdStore()
              //const storeRananp = usePengunjungRanapStore()
              // for (let i = 0; i < resp?.data?.result?.length; i++) {
              const isi = resp.data.result
              storePasien.injectDataPasien(pasien, isi, 'dokumenluar')
              // console.log('psien', pasien)
              //storeRananp.injectDataPasien(pasien?.noreg, isi, 'dokumenluar')
              //}
              notifSuccess(resp)
              this.initForm()
              this.loadingSave = false
            }
            this.loadingSave = false
          })
          .catch((err) => {
            console.log(err)
            this.loadingSave = false
            reject(err)
          })
      })
    },

    deleteData(pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/dokumenupload/igd/deletedata', payload)
          .then((resp) => {
            // console.log('del', resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungIgdStore()
              //const storeRananp = usePengunjungRanapStore()
              storePasien.hapusDataInjectan(pasien, id, 'dokumenluar')
              //storeRananp.hapusDataInjectan(pasien, id, 'dokumenluar')
              notifSuccess(resp)
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    }

    // previewData(item) {
    //   this.preview = true
    //   this.form = item
    // }

  }
})
