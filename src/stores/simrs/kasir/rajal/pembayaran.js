import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifErr, notifSuccess } from "src/modules/utils";
import { useKasirRajalListKunjunganStore } from "./kunjungan";

export const usePembayaranKasirRajalStore = defineStore('pembayaran-kasir-rajal-store', {
  state: () => ({
    loading: false,
    loadingQris: false,
    items: [],
    kwitansi: {},
    form: {
      noreg: '',
      norm: '',
      tglkunjungan: '',
      nama: '',
      sapaan: '',
      kelamin: '',
      kodepoli: '',
      poli: '',
      sistembayar: '',
      total: '',
      rinci: '',
      tglx: '',
      users: '',
      carabayar: '',
      jenislayanan: ''
    },
    formqris: {}
  }),
  actions: {
    savePembayaran(pasien, billing, jenislayanan, val) {
      this.loading = true
      this.form.noreg = pasien.noreg
      this.form.norm = pasien.norm
      this.form.tglkunjungan = pasien.tgl_kunjungan
      this.form.nama = pasien.nama
      this.form.sapaan = pasien.sapaan
      this.form.kelamin = pasien.kelamin
      this.form.kodepoli = pasien.kodepoli
      this.form.poli = pasien.poli
      this.form.sistembayar = pasien.sistembayar
      this.form.total = billing.totalall
      this.form.rinci = billing.rincian
      this.form.carabayar = val
      this.form.jenislayanan = jenislayanan
      return new Promise(resolve => {
        api.post('/v1/simrs/kasir/rajal/pembayaran', this.form)
          .then((resp) => {
            this.loading = false
            const thiskwitansi = resp.data?.result?.heder
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
            const storekunjungan = useKasirRajalListKunjunganStore()
            storekunjungan.kwitansi = hasilglobal
            notifSuccess(resp.data?.message)
            //this.qris = resp.data.result.qrValue
            resolve(resp.data)
          })
          .catch((err) => {
            console.log('err', err)
            this.loading = false
          })
      })
    },
    createQris(pasien, billing, jenislayanan, val) {
      this.loadingQris = true
      this.formqris.noreg = pasien.noreg
      this.formqris.norm = pasien.norm
      this.forformqrism.tglkunjungan = pasien.tgl_kunjungan
      this.formqris.nama = pasien.nama
      this.formqris.sapaan = pasien.sapaan
      this.formqris.kelamin = pasien.kelamin
      this.formqris.kodepoli = pasien.kodepoli
      this.formqris.poli = pasien.poli
      this.formqris.sistembayar = pasien.sistembayar
      this.formqris.total = billing.totalall
      this.formqris.rinci = billing.rincian
      this.formqris.carabayar = val
      this.formqris.jenislayanan = jenislayanan
      return new Promise(resolve => {
        api.post('/v1/simrs/kasir/rajal/pembayaran', this.form)
          .then((resp) => {
            this.loadingQris = false
            const thiskwitansi = resp.data?.result?.heder
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
            const storekunjungan = useKasirRajalListKunjunganStore()
            storekunjungan.kwitansi = hasilglobal
            notifSuccess(resp.data?.message)
            //this.qris = resp.data.result.qrValue
            resolve(resp.data)
          })
          .catch((err) => {
            console.log('err', err)
            this.loading = false
          })
      })
    }
  }
})
