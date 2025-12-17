import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungRanapStore } from './pengunjung'
import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'

export const useNurseNoteRanapStore = defineStore('nursenote-ranap-store', {
  state: () => ({
    items: [],
    form: {
      // tindakan
      tindakan: [],
      ket: null,

      // implementasi
      dx: null,
      implementasi: null,
      reseps: [],

      //ttv
      bb: 0,
      tb: 0,
      nadi: 0,
      suhu: 0,
      sis: 0,
      dia: 0,
      rr: 0,
      spo2: 0,
      nyeri: 0,
      skor: 0,
      // tambahan observasi
      cvp: 0,
      icp: 0,
      gcs: 0,
      kejang: 0,

      // ventilator menu
      mode: null,
      fraksio2: 0,
      frek: 0,
      peep: 0,
      pins: 0,
      ratio: 0,
      flow: 0,

      // intake
      infus: 0,
      pump: 0,
      // injeksi: 0,
      // oral: 0,
      // tetes: 0,
      obat: 0,
      albumin: 0,
      mamin: 0,
      zonde: 0,
      water: 0,

      // output
      urine: 0,
      drain: 0,
      muntah: 0,
      feces: 0,
      iwl: 0,
      pendarahan: 0,
      ufg: 0,
      produksigc: 0,
      flag: [],

    },
    flagings: [
      {
        label: 'Catatan Pemakaian Obat',
        value: '1'
      },
      {
        label: 'Grafik TTV ( khusus NICU,ICU,ICCU )',
        value: '2'
      },
      {
        label: 'Balance Cairan',
        value: '3'
      },
      {
        label: 'EWS / PEWS / MEOWS',
        value: '4'
      },
      {
        label: 'Catatan Pemberian Infus',
        value: '5'
      },
      {
        label: 'Ventilator Menu',
        value: '6'
      },
    ],
    tindakans: [],
    petugas: [],
    isForm: false,
    dialogPreview: false,
    typePemakaianObat: 'resep',
    loadingSave: false,
    loading: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    initForm(data, dx) {
      // console.log('initForm');

      const tindakanStore = useTindakanRanapStore()
      this.tindakans = tindakanStore.listTindakan
      // console.log('tindakanStore', tindakanStore.listTindakan);

      for (const key in this.form) {
        this.form[key] = 0
      }

      this.form.tindakan = []
      this.form.flag = []
      this.form.ket = null
      this.form.dx = null
      this.form.reseps = []
      this.form.mode = null


      this.form.implementasi = dx

    },

    getNakes() {
      const pengunjung = usePengunjungRanapStore()
      const nakes = pengunjung?.nakes ?? []
      const nonNakes = pengunjung?.nonNakes ?? []

      this.petugas = [...nakes, ...nonNakes]

    },

    simpanData(pasien, update, balance) {
      this.loadingSave = true
      this.form.noreg = pasien?.noreg || null
      this.form.norm = pasien?.norm || null
      this.form.kdruang = pasien?.kdruangan || null
      let form = this.form
      if (update) {
        form = update
      }

      // console.log('this.form', this.form);

      return new Promise((resolve, reject) => {
        api.post('/v1/simrs/ranap/layanan/nursenote/simpan', form)
          .then((res) => {
            // console.log('res', res);

            this.loadingSave = false

            if (!update) { this.items.unshift(res?.data?.result) }

            this.initForm()
            if (!balance) { notifSuccess('Simpan Data Berhasil') }
            resolve(res)
          })
          .catch((err) => {
            this.loadingSave = false
            reject(err) || console.log(err)
          })
      })
    },


    async getData(pasien) {
      this.loading = true
      const params = {
        params: {
          noreg: pasien?.noreg
        }
      }
      try {
        const resp = await api.get('v1/simrs/ranap/layanan/nursenote/list', params)
        if (resp.status === 200) {
          const data = resp?.data
          this.items = data?.map(x => {
            return {
              ...x,
              flag: x?.flag || [],  // Properti biasa
              reseps: !Array.isArray(x?.reseps) ? [] : x?.reseps // Properti biasa
            };
          }) ?? []
        }
        console.log('resp nursenote list', this.items)
        this.loading = false
      } catch (error) {
        console.log('error', error);

        this.loading = false

      }

    },

    async deleteData(pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('/v1/simrs/ranap/layanan/nursenote/hapus', payload)
          .then((resp) => {
            // const storeRanap = usePengunjungRanapStore()
            // storeRanap.hapusDataInjectan(pasien, id, 'cppt')
            let objekYangInginDihapus = this.items.find(obj => obj.id === id);
            this.items = this.items.filter(item => item !== objekYangInginDihapus);
            notifSuccess(resp)
            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNurseNoteRanapStore, import.meta.hot))
}
