import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const useKasirRajalListKunjunganStore = defineStore('kasir_rajal_list_kunjungan_umum', {
  state: () => ({
    items: [],
    kwitansi: [],
    meta: null,
    params: {
      q: '',
      per_page: 10,
      sort: 'DESC',
      page: 1,
      order_by: 'id',
      tgl: dateDbFormat(new Date())
    },
    getparams: {
      noreg: ''
    },
    golongan: '',
    loading: false,
    rekapBill: {},
    notas: {},
    qris: 'asd',
    jenispembayaran: ''
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    setDate(payload) {
      this.params.page = 1
      this.params.tgl = payload
      this.getLists()
    },
    setQ(payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setTglAwal() {
      this.params.tgl = dateDbFormat(new Date())
    },
    setPage(payload) {
      this.params.page = payload
      this.getLists()
    },
    setPerPage(payload) {
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    goToPage(val) {
      this.params.page = val
      this.getLists()
    },
    async getLists() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/simrs/kasir/rajal/kunjunganpoli', params)
      if (resp.status === 200) {
        this.items = resp.data.data
        this.meta = resp.data
        this.loading = false
      }
      this.loading = false
    },
    async getBill(par) {
      this.loading = true
      const params = { params: par ?? this.getparams }
      const resp = await api.get('/v1/simrs/kasir/rajal/billbynoreg', params)
      if (resp.status === 200) {
        this.rekapBill = resp.data
        const thiskwitansi = resp.data?.heder
        const hasilglobal = []
        thiskwitansi?.forEach(x => {
          const kwitansilog = x?.kwitansilog
          kwitansilog?.forEach(k => {
            const hasil = {
              noreg: k?.noreg,
              norm: k?.norm,
              nota: k?.nota,
              tgl_pembayaran: k?.tglx,
              batal: k?.batal,
              total: k?.total,
              nama: k?.nama,
              nokwitansi: k?.nokwitansi,
              i: ''
            }
            hasilglobal.push(hasil)
          })
          const karcislog = x?.karcislog
          karcislog?.forEach(k => {
            const hasilx = {
              noreg: k?.noreg,
              norm: k?.norm,
              nota: null,
              tgl_pembayaran: k?.tglx,
              batal: k?.batal,
              total: k?.total,
              nama: k?.nama,
              nokwitansi: k?.nokarcis,
              i: 'KARCIS'
            }
            hasilglobal.push(hasilx)
          })
        })
        this.kwitansi = hasilglobal
        console.log('kwitansi', this.kwitansi)
      }
      this.loading = false
    },
    async getNotas(val) {
      this.notas = {}
      this.loading = true
      const params = { params: val }
      // const resp = await api.get('/v1/simrs/pendaftaran/umum/kunjunganpasienumum', params)
      const resp = await api.get('/v1/simrs/kasir/rajal/tagihanpergolongan', params)
      if (resp.status === 200) {
        console.log('resp notas ', resp.data)
        this.notas = resp.data
        this.loading = false
      }
      this.loading = false
    },
    savePembayaran(payload) {
      this.loading = true
      return new Promise(resolve => {
        api.post('/v1/simrs/kasir/rajal/pembayaran', payload)
          .then(resp => {
            this.loading = false
            // console.log('resp', resp.data)
            this.qris = resp.data.result.qrValue
            resolve(resp.data)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
