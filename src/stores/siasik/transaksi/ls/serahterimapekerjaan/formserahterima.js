import { defineStore } from 'pinia';
import { notifErrVue, notifSuccess } from 'src/modules/utils';
import { api } from 'src/boot/axios';
import { date } from 'quasar';

export const useFormSerahterimaStore = defineStore('formSerahterima', {
  state: () => ({
    loading: false,
    loadingHapus: false,
    loadingrinci: false,
    error: null,
    fixed: false,
    disabled: false,
    disableplus: false,
    openDialog: false,
    params: {
      q: '',
      page: 1,
      rowsPerPage: 50,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      kodekegiatan: null,
      rekening50: null,
    },

    paramsrinci: {
      noserahterimapekerjaan: '',
      nopenerimaan: []
    },
    // State untuk header
    formheader: {
      noserahterimapekerjaan: '',
      nokontrak: '',
      kodepihakketiga: '',
      namaperusahaan: '',
      kodemapingrs: '',
      namasuplier: '',
      tglmulaikontrak: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglakhirkontrak: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tgltrans: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      kodepptk: '',
      namapptk: '',
      program: '',
      kegiatan: '',
      kodekegiatanblud: '',
      kegiatanblud: '',
      rinci: [],
    },


    // State untuk item rincian sementara (saat menambah/edit rincian)
    rinci: {
      noserahterimapekerjaan: '',
      nokontrak: '',
      koderek50: '',
      uraianrek50: '',
      koderek108: '',
      uraian108: '',
      itembelanja: '',
      itembelanjax: '',
      idserahterima_rinci: '',
      volume: 0,
      satuan: '',
      harga: 0,
      total: 0,
      sisapagu: 0,
      volumels: 0,
      hargals: 0,
      totalls: 0,
      nominalpembayaran: 0,
    },
    // Data Kontrak
    kontrakpekerjaan: [],

    // Data Anggaran
    anggarans: [],
    itembelanja: [],
    rekening50: [],

    transall: []

  }),

  actions: {
    initReset(data) {

      if (data) {
        return new Promise((resolve) => {
          for (const key in this.formheader) {
            // console.log(`${key}: ${this.form[key]}`);
            // console.log(`${key}`);
            this.formheader[key] = data[key]
          }
          this.formheader.noserahterimapekerjaan = data?.noserahterimapekerjaan
          // console.log(this.form);


          resolve()
        })
      } else {

        for (const key in this.formheader) {
          // console.log(`${key}: ${this.form[key]}`);
          this.formheader[key] = null
        }

      }
    },

    setForm(key, value) {
      // Pastikan rincian tetap array jika key adalah 'rincian'
      if (key === 'rinci') {
        this.formheader[key] = value ?? [];
      } else {
        this.formheader[key] = value;
        if (this.rinci.hasOwnProperty(key)) {
          this.rinci[key] = value;
        }
      }
    },

    resetFORM() {
      const forms = Object.keys(this.formheader);
      for (let i = 0; i < forms.length; i++) {
        const el = forms[i];
        // Pastikan rincian direset ke array kosong, bukan null
        if (el === 'rinci') {
          this.formheader[el] = [];
        } else {
          this.setForm(el, null);
        }
      }
      const keys = Object.keys(this.rinci);
      for (let i = 0; i < keys.length; i++) {
        const el = keys[i];
        this.rinci[el] = null;
      }
      this.kontrakpekerjaan = []
      this.transall = []
      this.disabled = false;
      this.disableplus = false;
    },

    onRequest(props) {
      // console.log('props', props)
      this.params.page = props?.pagination?.page ?? 1
      this.params.rowsPerPage = props?.pagination?.rowsPerPage ?? 10
      this.getKontrakPekerjaan()
    },
    goToPage(val) {
      this.params.page = val
      this.getKontrakPekerjaan()
    },
    setFormInput(key, val) {

      // console.log('setFormInput', key, val)
      this.rinci = {
        koderek50: '',
        uraianrek50: '',
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
      this.formheader[key] = val
    },
    resetformrinci() {
      this.formheader.rinci = []
    },

    refreshTable() {
      this.loadingHapus = false
    },

    initForm() {
      this.formheader.noserahterimapekerjaan = ''
      this.formheader.nokontrak = ''
      this.formheader.kodepihakketiga = ''
      this.formheader.namaperusahaan = ''
      this.formheader.kodemapingrs = ''
      this.formheader.namasuplier = ''
      this.formheader.tglmulaikontrak = date.formatDate(Date.now(), 'YYYY-MM-DD'),
        this.formheader.tglakhirkontrak = date.formatDate(Date.now(), 'YYYY-MM-DD'),
        this.formheader.tgltrans = date.formatDate(Date.now(), 'YYYY-MM-DD'),
        this.formheader.kodepptk = ''
      this.formheader.namapptk = ''
      this.formheader.program = ''
      this.formheader.kegiatan = ''
      this.formheader.kodekegiatanblud = ''
      this.formheader.kegiatanblud = ''
      this.formheader.rinci = []

      this.transall = []
      this.loading = true
      this.disabled = false
      this.loading = false
    },

    // Simpan data ke backend
    async saveData(add) {
      // console.log('fooorm', this.formheader)
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('/v1/transaksi/serahterima/savedata', this.formheader)
          .then((resp) => {
            // console.log('Resp Api', resp?.data)

            this.formheader.noserahterimapekerjaan = resp.data?.result?.noserahterimapekerjaan
            this.rinci.noserahterimapekerjaan = resp.data?.result?.noserahterimapekerjaan
            this.paramsrinci.noserahterimapekerjaan = resp.data?.result?.noserahterimapekerjaan

            this.loading = false
            notifSuccess(resp)
            this.resetformrinci()
            this.listrincians()

            resolve(resp.data)
            // this.form.rincians = {}
          })
          .catch((err) => {
            this.loading = false
            reject(err)
            this.formheader.rinci = []
          })
      })
    },

    // Muat data untuk edit
    async loadData(noserahterimapekerjaan) {
      this.loading = true;
      try {
        const response = await api.get(`/v1/transaksi/serahterima/${noserahterimapekerjaan}`);
        this.formheader = response.data.header;
        // console.log('editxxx', this.formheader)
        this.rinci = response.data.rinci;
        notifErrVue.create({
          type: 'positive',
          message: 'Data berhasil dimuat.',
        });
      } catch (error) {
        this.error = error.response?.data?.message || 'Gagal memuat data';
        notifErrVue.create({
          type: 'negative',
          message: this.error,
        });
      } finally {
        this.loading = false;
      }
    },

    // Hapus data
    hapusRinci(row) {
      // console.log('hapus rinci', row)
      this.loadingHapus = true
      return new Promise(resolve => {
        api.post('/v1/transaksi/serahterima/deleterinci', row)
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
    },

    // Ambil data kontrak pekerjaan
    getKontrakPekerjaan() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/serahterima/getkontrak', params)
          .then((resp) => {
            this.kontrakpekerjaan = []
            if (resp.status === 200) {

              // console.log('Data Kontrak', resp.data)

              this.kontrakpekerjaan = resp.data
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
    getRincianBelanja() {
      this.loadingrinci = true
      const params = { params: this.params }
      // console.log('anggaran params', params)
      return new Promise((resolve) => {
        api.get('/v1/transaksi/belanja_ls/anggaran', params)
          .then((resp) => {
            if (resp.status === 200) {
              // console.log('anggaran', resp.data)
              this.loadingrinci = false
              this.anggarans = resp.data
              this.filterRekening50(resp.data)
              this.filterItemBelanja(resp.data)
              resolve(resp.data)
            }
            else {
              this.loadingrinci = false
            }
          })
          .catch(() => {
            this.loadingrinci = false
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
        ? this.anggarans?.filter(x => x.koderek50 === this.params.rekening50).map((x) => {
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


    //list di form SERAHTERIMA
    async listrincians() {
      this.loading = true
      const params = { params: this.paramsrinci }
      return new Promise((resolve, reject) => {
        api.get('/v1/transaksi/serahterima/getrincian', params).then((resp) => {
          if (resp.status === 200) {
            this.transall = resp.data
            // console.log('hasilall', this.transall)
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
  },
});
