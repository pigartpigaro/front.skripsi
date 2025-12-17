import { defineStore } from "pinia"
import { date } from "quasar"
import { api } from "src/boot/axios"
import { notifErr, notifSuccess } from "src/modules/utils"

export const listdataSerahterimaStore = defineStore('list_data_serahterima', {
  state: () => ({
    loading: false,
    disabled: false,
    dialogCetak: false,
    openDialogRinci: false,
    params: {
      q: '',
      tahun: date.formatDate(Date.now(), 'YYYY'),
      page: 1,
    },
    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    listdata: [],
    dataserahterima: [],

    npddatasave: [],
    editnpd: [],
    listrinci: []
  }),
  actions: {
    goToPage(val) {
      this.params.page = val
      this.listdataserahterima()
    },
    listdataserahterima() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('/v1/transaksi/serahterima/listdata', params)
          .then((resp) => {
            if (resp.status === 200) {
              // console.log('data Serahterima', resp)

              this.listdata = resp.data
              this.rincianSerahterima()

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
    rincianSerahterima() {
      if (this.listdata?.length) {
        const sas = []
        for (let i = 0; i < this.listdata?.length; i++) {
          const arr = this.listdata[i]
          // console.log('rincianqqq', arr)
          const head = {
            id: arr.id,
            noserahterimapekerjaan: arr.noserahterimapekerjaan,
            nokontrak: arr.nokontrak,
            kodepihakketiga: arr.kodepihakketiga,
            namaperusahaan: arr.namaperusahaan,
            kodemapingrs: arr.kodemapingrs,
            namasuplier: arr.namasuplier,
            tglmulaikontrak: arr.tglmulaikontrak,
            tglakhirkontrak: arr.tglakhirkontrak,
            tgltrans: arr.tgltrans,
            kodepptk: arr.kodepptk,
            namapptk: arr.namapptk,
            program: arr.program,
            kegiatan: arr.kegiatan,
            kodekegiatanblud: arr.kodekegiatanblud,
            kegiatanblud: arr.kegiatanblud,
            kode50: arr.kode50,
            uraianpekerjaan: arr.uraianpekerjaan,
            nilaikegiatan: arr.nilaikegiatan,
            totalpermintaanls: arr.rinci?.map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0),
            tglentry: arr.tglentry,
            userentry: arr.userentry,
            nonpdls: arr.nonpdls,
            nonpkls: arr.nonpkls,
            nopencairan: arr.nopencairan,
            kunci: arr.kunci,
            flag: arr.flag,
            rinci: arr.rinci,
          }

          sas.push(head)
        }
        this.dataserahterima = sas

      }
    },
    kunciData(row) {
      // console.log('KUNCI', row)
      this.loading = true;
      return new Promise((resolve) => {
        api.post('/v1/transaksi/serahterima/kuncidata', row)
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
    }

  }
})
