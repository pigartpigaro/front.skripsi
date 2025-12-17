import { defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";
import { notifSuccess } from "src/modules/utils";
import { dataBastFarmasiStore } from "./bastfarmasi";


export const formInputNpdlsStore = defineStore('forminput_NPD_LS', {
  state: () => ({
    loading: false,
    loadingHapus: false,
    disabled: false,
    disabledx: false,
    hidden: false,
    fixed: false,
    params: {
      q: '',
      tahun: date.formatDate(Date.now(), 'YYYY'),
      tahunx: date.formatDate(Date.now(), 'YYYY'),
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      bidang: '',
      kegiatan: ''
    },
    reqs: {
      q: '',
      page: 1,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      kodebidang: null,
      kodekegiatan: null,
      bast: null,
      rekening50: null,
      nip: null,
      volumels: null,
      rincianmanual: null,
      subtotal: 0,
      jmlperkoderek108: [],
      nonpdls: null
    },
    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    paramsrinci: {
      nonpdls: '',
      nopenerimaan: []
    },
    form: {
      nonpdls: null,
      tglnpdls: date.formatDate(Date.now(), 'YYYY-MM-DD'),

      // PPTK
      kodepptk: null,
      pptk: null,
      kodebidang: null,
      bidang: null,

      bast: null,
      // Data Kontrak
      serahterimapekerjaan: null,
      noserahterima: null,
      nokontrak: null,

      triwulan: null,

      // kegiatan
      kodekegiatanblud: null,
      kegiatanblud: null,

      // pihak ketiga
      kodepenerima: null,
      penerima: null,
      bank: null,
      rekening: null,
      npwp: null,

      keterangan: null,
      biayatransfer: 0,
      rincians: []
      // rincimanual: []
    },
    rinci: {
      nonpdls: null,

      // Rekening 50
      koderek50: null,
      rincianbelanja: null,
      // Rekening 108
      koderek108: null,
      uraian108: null,
      itembelanja: null,

      // Nomer Usulan
      bast_r_id: null,
      nopenerimaan: null,

      // id serahterima
      idserahterima_rinci: null,
      tglentry: null,
      userentry: null,

      // PAGU
      volume: null,
      satuan: null,
      harga: null,
      total: null,
      sisapagu: null,

      // Belanja
      volumels: null,
      hargals: null,
      totalls: null,
      nominalpembayaran: null,
    },
    dariserahterima: [
      { nama: '-' },
      { nama: 'Sigarang' },
      { nama: 'Farmasi' },
      { nama: 'Siasik' }
    ],

    serahterimas: [
      { ket: 'Ya', value: '3' },
      { ket: 'Tidak', value: '2' }
    ],
    // NOMER PENERIMAAN
    selectbast: [],
    // CARI BIDANG, PTK, KEGIATAN
    bidangdanptk: [],
    bidangs: [],
    ptks: [],
    kegiatans: [],

    // CARI ANGGARAN
    anggarans: [],
    rekening50: [],
    itembelanja: [],
    // GET DATA RINCIAN BAST
    transall: [],

    transallserahterima: [],

    //UNTUK VALIDASI JIKA JUMLAH MELEBIHI PAGU
    jumlahitem: 0,
    sisapagurinci: 0,


    dialogEditNpd: false,
    // datafarmasi: [],
    // bastfarmasis: [],
    dialogPrintPencairan: false,
    dialogCetakNpd: false,
    openDialogFarmasi: false,
    openDialogSiasik: false,
    openDialogRinci: false,
    openDialogPajak: false,
  }),
  actions: {
    resetFORM() {
      const forms = Object.keys(this.form)
      for (let i = 0; i < forms?.length; i++) {
        const el = forms[i]
        this.setForm(el, null)
      }
      const keys = Object.keys(this.rinci)
      for (let i = 0; i < keys?.length; i++) {
        const el = keys[i]
        this.setForm(el, null)
      }
      const bast = Object.keys(this.reqs)
      for (let i = 0; i < bast?.length; i++) {
        const el = bast[i]
        this.setForm(el, null)
      }
      const transall = Object.keys(this.transall)
      for (let i = 0; i < transall?.length; i++) {
        const el = transall[i]
        this.setForm(el, null)
      }
    },
    setForm(key, val) {
      this.form[key] = val
      this.rinci[key] = val
      this.reqs[key] = val
      this.transall[key] = val
    },
    setFormInput(key, val) {

      this.rinci = {
        koderek50: '',
        rincianbelanja: '',
        itembelanja: '',
        idserahterima_rinci: '',
        volume: 0,
        satuan: '',
        harga: 0,
        total: 0,
        sisapagu: 0,
        volumels: 0,
        hargals: 0,
        totalls: 0,
        nominalpembayaran: 0
      };
      // this.rinci[key] = val
      this.form[key] = val
    },
    setParams(key, val) {
      this.reqs[key] = val
      this.params[key] = val
    },
    refreshTable() {

      // this.listrincians()
      this.loadingHapus = false
      // const bst = dataBastFarmasiStore()
      // bst.getDataBast()
    },
    initForm() {
      this.form.nonpdls = ''
      this.form.kodepptk = ''
      this.form.pptk = ''
      this.form.kodebidang = ''
      this.form.bidang = ''
      this.form.bast = ''
      this.form.serahterimapekerjaan = ''
      this.form.noserahterima = ''
      this.form.nokontrak = ''
      this.form.kodepenerima = ''
      this.form.kegiatanblud = ''
      this.form.kodekegiatanblud = ''
      this.form.keterangan = ''
      this.form.biayatransfer = 0
      this.form.rincians = []

      this.transall = []
      this.transallserahterima = []
      this.disabled = false
      this.disabledx = false
      this.loading = false
    },
    resetformrinci() {
      this.form.rincians = []
    },
    getDataBidang() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/belanja_ls/bidang', params).then((resp) => {
          if (resp.status === 200) {
            this.bidangdanptk = resp.data
            this.loading = false
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
          x.kodepptk === this.reqs.nip
        )
        : []
      this.kegiatans = data
    },
    getRincianBelanja() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/belanja_ls/anggaran', params)
          .then((resp) => {
            if (resp.status === 200) {
              // console.log('anggaran', resp.data)
              this.loading = false
              this.anggarans = resp.data
              this.filterRekening50(resp.data)
              this.filterItemBelanja(resp.data)
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
      const data = this.anggarans?.length
        ? this.anggarans?.map((x) => {
          return {
            itembelanja: x.usulan,
            rincianbelanja: x.uraian50,
            rek50: x.koderek50,
            realisasi: x.realisasi.map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0) +
              x.realisasi_spjpanjar.map((x) => parseFloat(x.jumlahbelanjapanjar)).reduce((a, b) => a + b, 0) -
              x.contrapost.map((x) => parseFloat(x.nominalcontrapost)).reduce((a, b) => a + b, 0)
          }
        })
        : []
      const rek = data.reduce((a, b) => {
        const yangsama = a.find(x => x.rek50 === b.rek50)
        if (!yangsama) {
          a.push(b)
        }
        return a
      }, [])
      this.rekening50 = rek
    },
    filterItemBelanja() {
      const data = this.anggarans?.length
        ? this.anggarans?.filter(x => x.koderek50 === this.reqs.rekening50).map((x) => {
          return {
            idpp: x.idpp,
            koderek108: x.koderek108,
            uraian108: x.uraian108,
            koderek50: x.koderek50,
            uraian50: x.uraian50,
            itembelanja: x.usulan,
            harga: parseFloat(x.harga),
            satuan: x.satuan,
            volume: parseFloat(x.volume),
            pagu: parseFloat(x.pagu),
            realisasi: x.realisasi.map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0) +
              x.realisasi_spjpanjar.map((x) => parseFloat(x.jumlahbelanjapanjar)).reduce((a, b) => a + b, 0) -
              x.contrapost.map((x) => parseFloat(x.nominalcontrapost)).reduce((a, b) => a + b, 0),
            sisapagu: parseFloat(x.pagu) - (x.realisasi.map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0) +
              x.realisasi_spjpanjar.map((x) => parseFloat(x.jumlahbelanjapanjar)).reduce((a, b) => a + b, 0) -
              x.contrapost.map((x) => parseFloat(x.nominalcontrapost)).reduce((a, b) => a + b, 0)),
          }
        })
        : []
      this.itembelanja = data
      // console.log('item belanja', data)
    },
    async simpanNpdls(add) {
      // console.log('fooorm', this.form)
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('/v1/transaksi/belanja_ls/simpannpd', this.form)
          .then((resp) => {
            this.reqs.subtotal = ''
            const bst = dataBastFarmasiStore()
            bst.itembelanja = []
            this.form.nonpdls = resp.data?.result?.nonpdls
            this.rinci.nonpdls = resp.data?.result?.nonpdls
            this.paramsrinci.nonpdls = resp.data?.result?.nonpdls
            this.loading = false
            notifSuccess(resp)
            this.resetformrinci()
            this.listrincians()
            bst.filterRekening50()

            resolve(resp.data)
            // this.form.rincians = {}
          })
          .catch((err) => {
            this.loading = false
            reject(err)
            this.form.rincians = []
          })
      })
    },
    async listrincians() {
      this.loading = true
      const params = { params: this.paramsrinci }
      return new Promise((resolve, reject) => {
        api.get('/v1/transaksi/belanja_ls/getrincian', params).then((resp) => {
          if (resp.status === 200) {
            this.transall = resp.data
            // console.log('hasilall', this.transall)
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    hapusRinci(row) {
      // console.log('hapus rinci', row)
      this.loadingHapus = true
      return new Promise(resolve => {
        api.post('/v1/transaksi/belanja_ls/deleterinci', row)
          .then(resp => {

            this.transall = resp?.data?.data
            // console.log('HAPUS', this.transall)
            // if (this.transall?.length < 0) {
            //   this.initForm()
            //   this.listrincians()
            // }
            // const index = row.rincian.findIndex(x => x.id === val.id)
            // if (index >= 0) {
            //   row.rincian.splice(index, 1)
            // }
            // if (!row.rincian?.length) this.cariRencanaBeli()
            this.loadingHapus = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingHapus = false
            row.loading = false
          })
      })
    }
  }

})
