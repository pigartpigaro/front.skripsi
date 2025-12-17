import { defineStore } from "pinia"
import { date } from "quasar"
import { api } from "src/boot/axios"
import { notifErr, notifSuccess } from "src/modules/utils"
import { parse } from "vue/compiler-sfc"

export const listdataNotadinasStore = defineStore('list_data_notadinas', {
  state: () => ({
    loading: false,
    disabled: false,
    dialogCetak: false,
    dialogCetakSptj: false,
    dialogCetakPernyataan: false,
    dialogLembarverif: false,
    dialogLaporan: false,
    openDialogRinci: false,
    params: {
      q: '',
      tahun: date.formatDate(Date.now(), 'YYYY'),
      page: 1,

      // parameters Realsisasi
      kodekegiatan: null,
      tgl: date.formatDate(Date.now(), 'YYYY'),
    },
    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      skg: date.formatDate(Date.now(), ' YYYY')
    },
    listdata: [],
    datanotadinas: [],
    cetaknotadinas: [],

    editdata: [],
    listrinci: [],

    datattd: [],

    anggarans: [],
    realisasi: [],
    nilaitotal: []
  }),
  actions: {
    goToPage(val) {
      this.params.page = val
      this.listData()
    },
    listData() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('/v1/transaksi/notadinas/listdata', params)
          .then((resp) => {
            if (resp.status === 200) {
              console.log('data Nota Dinas', resp.data)
              this.listdata = resp.data
              this.rincianNotadinas()

              this.loading = false
              resolve(resp.data)

            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    rincianNotadinas() {
      if (this.listdata?.length) {
        const sas = []
        for (let i = 0; i < this.listdata?.length; i++) {
          const arr = this.listdata[i]
          // console.log('rincianqqq', arr)
          const head = {
            id: arr.id,
            nonotadinas: arr.nonotadinas,
            nosptjm: arr.nosptjm,
            noverifikasi: arr.noverifikasi,
            tglnotadinas: arr.tglnotadinas,
            kodepptk: arr.kodepptk,
            namapptk: arr.namapptk,
            kodebidang: arr.kodebidang,
            bidang: arr.bidang,
            kegiatan: arr.kegiatan,
            kodekegiatan: arr.kodekegiatan,
            nonpk: arr.nonpk,
            total: arr.rincians?.map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
            tglentry: arr.tglentry,
            userentry: arr.userentry,
            kunci: arr.kunci,
            terima: arr.terima,
            rincians: arr.rincians,
            rinci_npd: arr.rincians.map((x) => x.npdlsrinci).reduce((a, b) => a.concat(b), []),
          }

          sas.push(head)
        }
        this.datanotadinas = sas

      }
    },
    kunciData(row) {
      // console.log('KUNCI', row)
      this.loading = true;
      return new Promise((resolve) => {
        api.post('/v1/transaksi/notadinas/kuncidata', row)
          .then((resp) => {
            // console.log('resp', resp)
            this.loading = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch((err) => {
            console.error(err)
            this.loading = false
          });
      });
    },

    ttd() {
      this.loading = true
      // const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('/v1/siasik/ttd/ttdpengesahan')
          .then((resp) => {
            if (resp.status === 200) {
              console.log('TTD', resp.data)
              this.datattd = resp.data
              this.loading = false

              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },

    lapRealisasi() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/notadinas/laprealisasi', params)
          .then((resp) => {
            if (resp.status === 200) {
              this.anggarans = resp.data
              // console.log('this.anggarans', this.anggarans)
              // this.filterRekening50(resp.data)
              this.loading = false
              resolve(resp.data)
            }
            else {
              this.loading = false
            }
          })
          .catch(() => {
            this.loading = false
          })
      })
    },

    filterRekening50() {
      const hasilx = this.anggarans.map((x) => x.koderek50)
      const uniksx = hasilx?.length ? [...new Set(hasilx)] : []
      for (let i = 0; i < uniksx?.length; i++) {
        const rek = uniksx[i]
        const arrls = this.anggarans.filter(x => x.koderek50 === rek).map((x) => x.realisasi)
        const ls = arrls.map((x) => x.map((y) => parseFloat(y.realisasi)).reduce((a, b) => a + b, 0))

        const arrpanjar = this.anggarans.filter(x => x.koderek50 === rek).map((x) => x.realisasi_spjpanjar)
        const panjar = arrpanjar.map((x) => x.map((y) => parseFloat(y.realisasi)).reduce((a, b) => a + b, 0))

        const arrcp = this.anggarans.filter(x => x.koderek50 === rek).map((x) => x.contrapost)
        const cp = arrcp.map((x) => x.map((y) => parseFloat(y.nilaicp)).reduce((a, b) => a + b, 0))

        const rincian = {
          rekeningbelanja: this.anggarans.filter(x => x.koderek50 === rek)[0]?.uraian50,
          koderekening: this.anggarans.filter(x => x.koderek50 === rek)[0]?.koderek50,
          pagu: this.anggarans.filter(x => x.koderek50 === rek)?.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          realisasi: ls.reduce((a, b) => a + b, 0) + panjar.reduce((a, b) => a + b, 0) - cp.reduce((a, b) => a + b, 0),
          pengajuan: 0
        }

        this.realisasi.push(rincian)
      }

      // this.realisasi = rek
      // console.log('resp realisasi', this.realisasi)
    },

  }
})
