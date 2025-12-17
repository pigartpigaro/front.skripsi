import { acceptHMRUpdate, defineStore } from "pinia"
import { usePengunjungPoliStore } from "./pengunjung"
import { api } from "src/boot/axios"
import { notifSuccess } from "src/modules/utils"

export const useJawabanKonsulStore = defineStore('jawaban-konsul', {
  state: () => ({
    storePasien: usePengunjungPoliStore(),
    loading: false,
    konsulText: {
      header: 'Dengan Hormat,\n Mohon bantuan',

      diagnosa: '',
      openingText: ' untuk konsultasi masalah medik saat ini, Atas pasien ini dengan kondisi',
      closingText: 'Terima Kasih Atas Kejasamanya'
    },
    jawabanText: {
      header: 'Dengan Hormat,\n Sesuai Permintaan konsultasi pada Pemeriksaan pasien, kami dapati saat ini\n\n Saran Tindakan medik / Pengobatan : ',

      jawaban: '',
    },
  }),
  actions: {
    simpanJawaban (pasien, item) {
      item.jawaban = this.jawabanText.jawaban
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/pelayanan/update-jawaban-konsul', item)
          .then(resp => {
            this.loading = false
            const isi = resp?.data?.data ?? false
            console.log('simpan ', resp, isi)
            if (isi) {
              this.storePasien.injectDataPasien(pasien, isi, 'jawabankonsul')
              notifSuccess(resp)
            }
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })

      })

    },
    async updateDibaca (pasien, item) {
      console.log('set dibaca', item)
      await api.post('v1/simrs/pelayanan/update-dibaca', item)
        .then(resp => {
          const isi = resp?.data?.data ?? false
          console.log('simpan ', resp, isi)
          if (isi) {
            this.storePasien.injectDataPasien(pasien, isi, 'jawabankonsul')
            // notifSuccess(resp)
          }
        })
    },
    async updateNoreg (pasien, item) {
      const form = { noreg: pasien.noreg, id: item.id }
      item.loading = true
      console.log('set noreg', form)
      await api.post('v1/simrs/pelayanan/update-noreg', form)
        .then(resp => {
          const isi = resp?.data?.data ?? false
          console.log('simpan ', resp, isi)
          if (isi) {
            this.storePasien.injectDataPasien(pasien, isi, 'jawabankonsul')
            // notifSuccess(resp)
          }
          delete item.loading
        }).catch(() => {
          delete item.loading
        })
    },
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useJawabanKonsulStore, import.meta.hot))
// }
