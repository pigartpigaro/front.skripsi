import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const formKontrakPekerjaan = defineStore('form_KontrakPekerjaan', {
  state: () => ({
    loading: false,
    disabled: false,
    isEdit: false,
    params: {
      q: '',
      tahun: date.formatDate(Date.now(), 'YYYY'),
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      bidang: '',
      kegiatan: '',
      nip: null,
      kodebidang: null
    },
    form: {
      nokontrak: null,
      tgltrans: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglmulaikontrak: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglakhirkontrak: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // Perusahaan
      kodeperusahaan: null,
      namaperusahaan: null,
      kodemapingrs: null,
      namasuplier: null,
      // PPTK
      kodepptk: null,
      namapptk: null,
      kodeBagian: null,
      // Kegiatan
      kodekegiatanblud: null,
      kegiatanblud: null,

      nilaikontrak: 0,
      nokontrakx: null,
      termin: 1
    },
    bidangdanptk: [],
    pihaktigas: [],
    kegiatans: [],
    ptks: []
  }),
  actions: {

    setEditData(data) {
      this.isEdit = true
      this.form = {
        ...this.form, // Pertahankan default untuk field yang tidak ada di data
        ...data,
        kodekegiatanblud: data.kodekegiatanblud || data.kodekegiatan, // Pastikan kodekegiatanblud diambil
        kegiatanblud: data.kegiatanblud || data.kegiatan // Pastikan kegiatanblud diambil
      }
      this.params.tgl = data.tgltrans
      this.params.nip = data.kodepptk
      this.params.kodebidang = data.kodeBagian
    },
    resetForm() {
      // const currentDate = date.formatDate(Date.now(), 'YYYY-MM-DD')
      // this.form = {
      //   nokontrak: null,
      //   nokontrakx: null,
      //   tgltrans: currentDate,
      //   tglmulaikontrak: currentDate,
      //   tglakhirkontrak: currentDate,
      //   kodeperusahaan: null,
      //   namaperusahaan: null,
      //   kodemapingrs: null,
      //   namasuplier: null,
      //   kodepptk: null,
      //   namapptk: null,
      //   kodeBagian: null,
      //   kodekegiatanblud: null,
      //   kegiatanblud: null,
      //   nilaikontrak: 0,
      //   termin: 1
      // }
      // this.params = {
      //   q: '',
      //   tahun: date.formatDate(Date.now(), 'YYYY'),
      //   tgl: currentDate,
      //   bidang: '',
      //   kegiatan: '',
      //   nip: null,
      //   kodebidang: null
      // }
      // this.isEdit = false

      const forms = Object.keys(this.form)
      for (let i = 0; i < forms?.length; i++) {
        const el = forms[i]
        this.setForm(el, null)
      }
      const keys = Object.keys(this.params)
      for (let i = 0; i < keys?.length; i++) {
        const el = keys[i]
        this.setParams(el, null)
      }
    },

    setForm(key, value) {
      this.form[key] = value
    },

    setParams(key, value) {
      this.params[key] = value
    },
    getDataBidang() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve) => {
        api.get('v1/laporan/lra/bidang', params).then((resp) => {
          // console.log('bidang RSUD', resp)
          if (resp.status === 200) {
            this.bidangdanptk = resp.data
            // this.kegiatans = resp.data
            // this.ptks = resp.data
            this.loading = false
            // this.filterBidang(resp.data)
            this.filterKegiatan()
            this.filterPtk()
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    filterPtk() {
      const data = this.bidangdanptk?.length
        ? this.bidangdanptk?.map((x) => {
          return {
            nip: x.kodepptk,
            nama: x.namapptk,
            kodeBagian: x.kodebidang,
            bagian: x.bidang
          }
        })
        : []
      const ptk = data.reduce((acc, curr) => {
        const kodesama = acc.find(x => x.nip === curr.nip)
        if (!kodesama) {
          acc.push(curr)
        }
        return acc
      }, [])
      this.ptks = ptk
    },
    filterKegiatan() {
      const data = this.bidangdanptk?.length
        ? this.bidangdanptk?.filter(x =>
          x.kodepptk === this.params.nip
        )
        : []
      this.kegiatans = data
    },
    getPihaktiga() {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/transaksi/belanja_ls/perusahaan').then((resp) => {
          if (resp.status === 200) {
            this.loading = false
            this.pihaktigas = resp.data
            resolve(resp)
          }
        })
          .catch(() => {
            this.loading = false
          })
      })
    },
    simpanKontrak() {
      // console.log('fooorm', this.form)
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('/v1/transaksi/kontrak/simpankontrak', this.form)
          .then((resp) => {
            // console.log('isian', resp.data)
            this.form.nokontrak = resp.data?.result?.nokontrak
            this.loading = false
            notifSuccess(resp)
            this.isEdit = false
            resolve(resp.data)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
