import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'
import { date } from 'quasar'

export const usePlannStore = defineStore('plann-store', {
  state: () => ({
    panel: 'Rawat Inap',
    loading: false,
    loadingOrder: false,
    loadingForm: false,
    loadingHistory: false,
    loadingSavePlann: false,
    notas: [],
    nosurat: '',
    isisuratkematian: [],
    isiindikasimasuknicu: [],
    tab: 'SkalaTransfer',
    tabs: [
      { name: 'Skala Transfer', page: 'SkalaTransfer' },
      { name: 'Plann', page: 'Plann' }
    ],
    form: {
      panel: 'Rawat Inap',
      kelas: '',
      isi: ([])
    },
    fixednicu: false,
    fixediccu: false,
    fixedhcu: false,
    selection: [],
    pilihatasx: ['Bayi yang memerlukan O2 < 60%', 'NKB 32-34 mg, kondisi stabil', 'BBL > 1500 gr', 'NKB 34-36 mg', 'kondisi stabil', 'reflek hisap lemah', 'Bayi yang dipuasakan / EKN',
      'Bayi yang memerlukan tranfusi tukar', 'Bayi yang sering muntah', 'Bayi dengan kelainan kronik (CLD)', 'Bayi yang memerlukan foto terapi dengan masalah lain : dehidrasi, minum personde',
      'Bayi dengan kelainan congenital ringan, missal celah bibir', 'Bayi dengan ibu DM', 'Bayi dengan asfiksia sesdang, nilai APGAR pada 5 menit < 7'
    ],
    selectionx: [],
  }),
  actions: {
    async savePlan(pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      this.loadingSavePlann = true
      const formamb = this.form
      formamb.noreg = pasien?.noreg
      formamb.norm = pasien?.norm
      formamb.kodedokter = pasien?.kodedokter
      formamb.kodesistembayar = pasien?.kodesistembayar
      formamb.koderuang = pasien?.kodepoli
      formamb.isi = this.form.isi
      try {
        const resp = await api.post('v1/simrs/planing/igd/simpanranap', formamb)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.result[0]
          storePasien.injectDataPasien(pasien, isi, 'planheder')
          notifSuccess(resp)
          this.initReset()
          this.resetdialog()
          this.loadingSavePlann = false
        }
      }
      catch (error) {
        // console.log(error)
        this.loadingSavePlann = false
      }
    },
    // async hapusPermintaan(pasien, id) {
    //   const payload = { noreg: pasien?.noreg, id }
    //   try {
    //     const resp = await api.post('v1/simrs/penunjang/bankdarah/hapusdataIgd', payload)
    //     if (resp.status === 200) {
    //       const storePasien = usePengunjungIgdStore()
    //       storePasien.hapusDataBankdarah(pasien, id)
    //       this.setNotas(resp?.data?.nota)
    //       notifSuccess(resp)
    //     }
    //   }
    //   catch (error) {
    //     // console.log('hpus rad', error)
    //   }
    // },
    formattanggal() {
      if (this.form.operasi === 0) {
        this.form.tgloperasi = ''
      }
      else {
        const sekarang = Date.now()
        this.form.tgloperasi = date.formatDate(sekarang, 'YYYY-MM-DD')
        this.form.tglrujukan = date.formatDate(sekarang, 'YYYY-MM-DD')
        this.form.tglrencanakunjungan = date.formatDate(sekarang, 'YYYY-MM-DD')
        this.form.tglmeninggal = date.formatDate(sekarang, 'YYYY-MM-DD')
        this.form.jammeninggal = date.formatDate(sekarang, 'H:m')
      }
    },
    initReset() {
      this.form.panel = 'Rawat Inap'
      this.form.operasi = ''
      this.form.jenisoperasi = ''
      this.form.tgloperasi = ''
      this.form.ruangtujuan = ''
      this.form.keterangan = ''
      this.form.kelas = ''
    },
    resetdialog() {
      this.form.isi = []
    },
    async suratkematian(pasien) {
      const payload = { params: { noreg: pasien?.noreg } }
      return new Promise(resolve => {
        api.get('v1/simrs/planing/igd/suratkematian', payload).then(resp => {
          if (resp.status === 200) {
            // console.log('bill', resp.data)
            this.isisuratkematian = resp.data.data[0]
            this.nosurat = this.isisuratkematian?.planheder[0]?.planpulang?.nosurat
          }
          resolve(resp)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      })
    },
    async indikasimasuknicuinter(val) {
      // console.log('valaaaaaaaaaaaa', val)
      const payload = { params: { noreg: val?.noreg } }
      return new Promise(resolve => {
        api.get('v1/simrs/planing/igd/indikasimasuknicuinter', payload).then(resp => {
          if (resp.status === 200) {
            // console.log('wew', resp?.data?.data)
            //const arr = JSON.parse(resp?.data?.data[0]?.isi)
            this.isiindikasimasuknicu = resp?.data?.data[0]
            // console.log('valaaaaaaaaaaaa', arr)
          }
          resolve(resp)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      })
    },

    setForm(key, val) {
      this.form[key] = val
    },
    async deleteData(pasien, id, jenis) {
      const payload = { id, jenis }
      try {
        const resp = await api.post('v1/simrs/planing/igd/hapusplann', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataplanheder(pasien, id)
          notifSuccess(resp)
        }
      }
      catch (error) {
        notifErr(error)
      }
    }

  }
})
