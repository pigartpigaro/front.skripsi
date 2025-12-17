import { defineStore } from 'pinia';
import { notifErrVue, notifSuccess } from 'src/modules/utils';
import { api } from 'src/boot/axios';
import { date } from 'quasar';

export const useFormNotadinasStore = defineStore('formNotadinas', {
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
      kodepptk: null,
      kodekegiatan: null,
    },
    paramsrinci: {
      nonotadinas: '',
      nopenerimaan: []
    },
    formheader: {
      nonotadinas: '',
      nosptjm: '',
      noverifikasi: '',
      tglnotadinas: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      kodepptk: '',
      namapptk: '',
      kodebidang: '',
      bidang: '',
      kunci: '',
      kodekegiatan: '',
      kegiatan: '',
      rincians: [],
    },
    // State untuk item rincian sementara (saat menambah/edit rincian)
    rinci: {
      nonotadinas: '',
      nonpdls: '',
      tglnpd: '',
      kegiatan: '',
      kodekegiatanblud: '',
      kegiatanblud: '',
      nokontrak: '',
      noserahterima: '',
      total: 0,

      //KODE JENIS BELANJA
      kodebelanja: ''
    },
    // Data Bidang dan PTK
    bidangdanptk: [],
    ptks: [],
    kegiatans: [],
    // Data NPD LS
    datanpd: [],

    // Data Anggaran
    anggarans: [],
    itembelanja: [],
    rekening50: [],

    transrinci: []

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
          this.formheader.nonotadinas = data?.nonotadinas
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
      this.transrinci = []
      this.disabled = false;
      this.disableplus = false;
    },

    onRequest(props) {
      // console.log('props', props)
      this.params.page = props?.pagination?.page ?? 1
      this.params.rowsPerPage = props?.pagination?.rowsPerPage ?? 10
      this.getDataNpdls()
    },
    goToPage(val) {
      this.params.page = val
      this.getDataNpdls()
    },
    setFormInput(key, val) {
      // console.log('setFormInput', key, val)
      this.rinci[key] = val
      this.formheader[key] = val
    },
    resetformrinci() {
      this.formheader.rincians = []
    },

    setParams(key, val) {
      this.params[key] = val
    },

    refreshTable() {
      this.loadingHapus = false
    },

    initForm() {
      this.formheader.nonotadinas = ''
      this.formheader.tglnotadinas = date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.formheader.tglakhirkontrak = date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.formheader.tgltrans = date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.formheader.kodepptk = ''
      this.formheader.namapptk = ''
      this.formheader.kodebidang = ''
      this.formheader.bidang = ''
      this.formheader.kodekegiatan = ''
      this.formheader.kegiatan = ''
      this.formheader.rincians = []

      this.transrinci = []
      this.loading = true
      this.disabled = false
      this.loading = false
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
            kodepptk: x.kodepptk,
            namapptk: x.namapptk,
            kodebidang: x.kodebidang,
            bagian: x.bidang
          }
        })
        : []
      const ptk = data.reduce((acc, curr) => {
        const kodesama = acc.find(x => x.kodepptk === curr.kodepptk)
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
          x.kodepptk === this.params.kodepptk
        )
        : []
      this.kegiatans = data
    },

    // Simpan data ke backend
    async saveData(add) {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('/v1/transaksi/notadinas/savedata', this.formheader)
          .then((resp) => {
            console.log('Resp Api NOTA DINAS', resp?.data)

            this.formheader.nonotadinas = resp.data?.result?.nonotadinas
            this.rinci.nonotadinas = resp.data?.result?.nonotadinas
            this.paramsrinci.nonotadinas = resp.data?.result?.nonotadinas
            this.formheader.nosptjm = resp.data?.result?.nosptjm
            this.formheader.noverifikasi = resp.data?.result?.noverifikasi


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
            this.formheader.rincians = []
          })
      })
    },

    // Muat data untuk edit
    async loadData(nonotadinas) {
      this.loading = true;
      try {
        const response = await api.get(`/v1/transaksi/notadinas/${nonotadinas}`);
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
        api.post('/v1/transaksi/notadinas/deleterinci', row)
          .then(resp => {
            this.transrinci = resp?.data?.data
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
    getDataNpdls() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/notadinas/selectnpd', params)
          .then((resp) => {
            if (resp.status === 200) {
              console.log('DataNPD', resp.data)
              this.loading = false
              this.datanpd = resp.data
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



    //list di form SERAHTERIMA
    async listrincians() {
      this.loading = true
      const params = { params: this.paramsrinci }
      return new Promise((resolve, reject) => {
        api.get('/v1/transaksi/notadinas/getrincian', params).then((resp) => {
          if (resp.status === 200) {
            this.transrinci = resp.data
            console.log('hasilall', this.transrinci)
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
  },
});
