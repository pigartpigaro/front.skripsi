import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungRanapStore } from './pengunjung'
import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'

export const useMppRanapStore = defineStore('mpp-ranap-store', {
  state: () => ({

    forma: {
      skrining: {
        usia: [
          { name: anak }
        ],
      }
    }


  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    initForm(data, dx) {
      // console.log('initForm');



    },

    getNakes() {
      const pengunjung = usePengunjungRanapStore()
      const nakes = pengunjung?.nakes ?? []
      const nonNakes = pengunjung?.nonNakes ?? []

      this.petugas = [...nakes, ...nonNakes]

    },

    simpanData(pasien, update, balance) {

    },


    async getData(pasien) {

    },

    async deleteData(pasien, id) {

    }

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMppRanapStore, import.meta.hot))
}
