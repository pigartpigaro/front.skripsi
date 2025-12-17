import { defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";
import { notifSuccess } from "src/modules/utils";

export const useSp3bStore = defineStore('laporan_sp3b', {
  state: () => ({
    loading: false,
    loadingsave: false,
    disabled: false,
    dialogCetak: false,
    reqs: {
      q: '',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      nosp3b: '000',
      page: 1,
    },
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    bulan: date.formatDate(Date.now(), 'MMMM'),
    tahun: date.formatDate(Date.now(), 'YYYY'),
    bulans: [
      { nama: 'Januari', value: '01' },
      { nama: 'Februari', value: '02' },
      { nama: 'Maret', value: '03' },
      { nama: 'April', value: '04' },
      { nama: 'Mei', value: '05' },
      { nama: 'Juni', value: '06' },
      { nama: 'Juli', value: '07' },
      { nama: 'Agustus', value: '08' },
      { nama: 'September', value: '09' },
      { nama: 'Oktober', value: '10' },
      { nama: 'November', value: '11' },
      { nama: 'Desember', value: '12' }
    ],
    form: {
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      nosp3b: null,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      bulan_realisasi: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      pendapatan: 0,
      realisasi: 0,
      pembiayaan: 0,
      saldoawal: 0,
      rincians: []
    },
    allitems: [],
    pendapatans: [],
    belanjas: [],
    pembiayaans: [],

    saldoawal: 0,

    listdataSp3b: [],

    viewData: [],
    //Untuk simpan Data Gabungan
    saveall: []
  }),
  actions: {
    setParams(key, val) {
      this.reqs[key] = val
    },
    goToPage(val) {
      this.reqs.page = val
      this.getData()
    },
    refreshTable() {
      this.reqs.page = 1
      this.getList()
    },
    create() {
      this.form.nosp3b = this.reqs.nosp3b
      this.form.bulan = this.reqs.bulan
      this.form.tahun = this.reqs.tahun
      this.form.saldoawal = this.saldoawal
      this.form.rincians = this.saveall

      this.saveData()
      // console.log('HASIIIL', this.form)
    },
    getList() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/sp3b/listdata', params).then((resp) => {
          // console.log('LIST SP3B', resp.data)
          if (resp.status === 200) {
            this.listdataSp3b = []

            this.listdataSp3b = resp.data
            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    saveData() {
      this.loading = true
      // console.log('params', this.form)
      return new Promise((resolve) => {
        api.post('v1/akuntansi/sp3b/savedata', this.form).then((resp) => {
          // console.log('Create SP3B', resp)
          if (resp.status === 200) {
            notifSuccess(resp)
            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => {
          this.loading = false
        })
      })
    },

    deleteData(row) {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/akuntansi/sp3b/delete', row)
          .then(resp => {
            // console.log('resp delete', resp)
            this.loading = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getData() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/sp3b/getdata', params).then((resp) => {
          // console.log('data SP3B', resp.data)
          if (resp.status === 200) {
            this.pendapatans = []
            this.belanjas = []
            this.pembiayaans = []
            this.saldoawal = 0

            this.allitems = resp.data

            this.dataSp3b()
            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    dataSp3b() {
      const pagupendapatan = this.allitems?.pagupendapatan

      //SALDO AWAL
      const pendx = this.allitems?.sebelumpendapatan
      const bljx = this.allitems?.sebelumbelanja
      const biayax = this.allitems?.sebelumpembiayaan
      const penyesuaianx = this.allitems?.sebelumpenyesuaian

      const koderekpend = pagupendapatan.map((x) => x.kode)
      const koderekblja = bljx.map(x => x.kode)

      //Filter pendapatan berdasarkan data pagu pendapatan
      const filterpendpatan = pendx.filter(x => koderekpend.includes(x.kode))
      const filterpenyesuaian = penyesuaianx && penyesuaianx?.length > 0 ?
        penyesuaianx.filter(x => koderekpend.includes(x.kode)) : []
      const salawalpendapatan = filterpendpatan.concat(filterpenyesuaian)
      const pendapatanx = salawalpendapatan?.length > 0 ?
        salawalpendapatan.reduce((a, b) => parseFloat(a) + parseFloat(b.subtotal), 0) : 0

      //filter penyesuaian berdasarkan belanja
      const filterpnye = penyesuaianx && penyesuaianx?.length ?
        penyesuaianx.filter(x => koderekblja.includes(x.kode)) : []
      const saldoawalbelanja = bljx.concat(filterpnye)
      const totalbelanjax = saldoawalbelanja?.length > 0 ?
        saldoawalbelanja.reduce((a, b) => parseFloat(a) + parseFloat(b.subtotal), 0) : 0
      const totalbiayax = biayax?.length > 0 ?
        biayax.map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) : 0
      const saldoawalx = ((pendapatanx - totalbelanjax) + totalbiayax).toFixed(2)
      this.saldoawal = saldoawalx

      // DATA PENDAPATAN
      const pendapatanall = this.allitems?.pendapatan || []
      const pend = pendapatanall.filter(x => koderekpend.includes(x.kode))
      const penye = this.allitems?.penyesuaian && this.allitems?.penyesuaian?.length > 0 ?
        this.allitems.penyesuaian.filter(x => koderekpend.includes(x.kode)) : []
      const datapendapatan = pend.concat(penye)

      const unikpend = pagupendapatan.map((x) => x.kode)
      const newsetpend = unikpend?.length ? [...new Set(unikpend)] : []
      const pendapatan = []
      for (let i = 0; i < newsetpend?.length; i++) {
        const el = newsetpend[i];
        // console.log('el', el)
        // Ambil kode dan uraian dari pagupendapatan
        const paguData = pagupendapatan.find((x) => x.kode === el)

        if (paguData) {
          // Filter data pendapatan untuk menghitung total
          const filteredData = datapendapatan.filter((x) => x.kode === el)
          const total = filteredData?.length > 0 ?
            filteredData.map((x) => parseFloat(x.subtotal)).reduce((a, b) => a + b, 0) : 0

          const obj = {
            kode: paguData.kode,
            uraian: paguData.uraian,
            total: total,
            keterangan: 'PENDAPATAN'
          }
          pendapatan.push(obj)
        }
      }

      this.pendapatans.push(...pendapatan)
      // const peny = penyesuaian.map((x) => parseFloat(x.totalpenyesuaian))
      // console.log('this.pendapatans', this.pendapatans)

      // DATA BELANJA
      const blj = this.allitems?.belanja
      const uniks = blj.map((x) => x.kode)
      const penyesbelanja = this.allitems?.penyesuaian.filter(x => uniks.includes(x.kode))

      const databelanja = blj.concat(penyesbelanja)

      const hslunik = uniks?.length ? [...new Set(uniks)] : []

      const belanja = []
      for (let i = 0; i < hslunik?.length; i++) {
        const el = hslunik[i];
        const obj = {
          kode: databelanja.filter((x) => x.kode === el)[0].kode,
          uraian: databelanja.filter((x) => x.kode === el)[0].uraian,
          total: databelanja.filter((x) => x.kode === el).map((x) => parseFloat(x.subtotal)).reduce((a, b) => a + b, 0),
          keterangan: 'REALISASI'
        }
        belanja.push(obj)
      }
      this.belanjas = belanja
      // console.log('this.belanjas', this.belanjas)
      //DATA PEMBIAYAAN
      const pmbiaya = this.allitems?.pembiayaan || []
      const pembiayaan = []
      for (let i = 0; i < pmbiaya?.length; i++) {
        const el = pmbiaya[i];
        const obj = {
          kode: el.kode,
          uraian: el.uraian,
          total: parseFloat(el.total).toFixed(2),
          keterangan: 'PEMBIAYAAN'
        }
        pembiayaan.push(obj)
      }

      this.pembiayaans.push(...pembiayaan)

      this.saveall = pendapatan.concat(belanja)
      if (pembiayaan?.length > 0) {
        this.saveall = this.saveall.concat(pembiayaan)
      }
      // console.log('this.pembiayaans', this.pembiayaans)
      // console.log('this.saveall', this.saveall)


    }

  }
})
