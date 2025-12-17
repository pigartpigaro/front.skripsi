import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useRkaStore = defineStore('store_rka_siasik', {
  state: () => ({
    loading: false,
    reqs: {
      q: '',
      bidang: '',
      kegiatan: '',
      tahun: date.formatDate(Date.now(), 'YYYY'),
      kodebidang: null,
      jenisrka: ''
    },
    jenisrka: [
      { label: 'RKA Sekarang', value: '1' },
      { label: 'RKA Pergeseran', value: '2' },
      { label: 'RKA Perubahan', value: '3' },
    ],
    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tahunsekarang: date.formatDate(Date.now(), 'YYYY')
    },
    dialogCetak: false,
    tglcetak: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    mapbidangptk: [],
    bidangs: [],
    kegiatans: [],
    ptks: [],

    kegiatanblud: '',
    namapptk: '',
    kodepptk: '',

    totalPagukegiatan: [],
    dataanggaran: [],
    datarka: [],

    pergeseran: [],
    rincianpergeseran: [],
    datarkapergeseran: [],

    rincianperubahan: [],
    datarkaperubahan: [],

    capaiankegiatan: '',
    targetcapaian: '',
    masukan: '',
    targetmasukan: '',
    keluaran: '',
    targetkeluaran: '',
    hasil: '',
    targethasil: ''
  }),
  actions: {
    setParameter(key, val) {
      this.reqs[key] = val
    },
    setForm(key, val) {
      this.reqs[key] = val
    },
    emptyForm() {
      this.reqs.bidang = ''
      this.reqs.kegiatan = ''
      this.reqs.tahun = date.formatDate(Date.now(), 'YYYY')
      this.reqs.kodebidang = null
      this.reqs.jenisrka = null
      this.datarka = []
      this.datarkapergeseran = []
    },
    getDataBidang() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/siasik/anggaran/getbidangkegiatan', params).then((resp) => {
          // console.log('bidang', resp)
          if (resp.status === 200) {
            this.mapbidangptk = resp.data
            // this.bidangs = resp.data
            // this.kegiatans = resp.data
            // this.ptks = resp.data
            this.loading = false
            this.filterBidang()
            this.filterKegiatan()
            this.filterPtk()
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    filterBidang() {
      const data = this.mapbidangptk?.length
        ? this.mapbidangptk?.map((x) => {
          return {
            kodebidang: x.kodebidang,
            bidang: x.bidang
          }
        })
        : []
      const bid = data.reduce((acc, curr) => {
        const kodesama = acc.find(x => x.kodebidang === curr.kodebidang)
        if (!kodesama) {
          acc.push(curr)
        }
        return acc
      }, [])
      this.bidangs = bid
      // console.log('bidangfilt', this.params.bidang)
    },
    filterPtk() {
      const data = this.mapbidangptk?.length
        ? this.mapbidangptk?.map((x) => {
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
      // console.log('pptk', this.ptks)
    },
    filterKegiatan() {
      const data = this.mapbidangptk?.length
        ? this.mapbidangptk?.filter(x =>
          x.kodebidang === this.reqs.kodebidang
        )
        : []
      this.kegiatans = data
      // console.log('kegiatans', this.kegiatans)
    },
    getAnggaran() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/siasik/anggaran/getanggaran', params).then((resp) => {
          // console.log('Data Anggaran', resp)
          this.dataanggaran = []
          if (resp.status === 200) {
            this.dataanggaran = resp.data

            // console.log('dataaaaaaaxz', this.dataanggaran)
            // this.bidangs = resp.data
            // this.kegiatans = resp.data
            // this.ptks = resp.data
            this.mapingData()
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    mapingData() {
      const rka = []
      const totalrka = []
      const uniq1 = this.dataanggaran.map((x) => x.kode1)
      const fils1 = uniq1?.length ? [...new Set(uniq1)] : []
      for (let i = 0; i < fils1?.length; i++) {
        const el = fils1[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode1 === el)[0].kode1,
          uraian: this.dataanggaran.filter((x) => x.kode1 === el).map((x) => x.lvl1)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode1 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
        totalrka.push(obj)
      }
      // console.log('totalpagukegiatan', totalrka)
      const uniq2 = this.dataanggaran.map((x) => x.kode2)
      const fils2 = uniq2?.length ? [...new Set(uniq2)] : []
      for (let i = 0; i < fils2?.length; i++) {
        const el = fils2[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode2 === el)[0].kode2,
          uraian: this.dataanggaran.filter((x) => x.kode2 === el).map((x) => x.lvl2)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode2 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const uniq3 = this.dataanggaran.map((x) => x.kode3)
      const fils3 = uniq3?.length ? [...new Set(uniq3)] : []
      for (let i = 0; i < fils3?.length; i++) {
        const el = fils3[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode3 === el)[0].kode3,
          uraian: this.dataanggaran.filter((x) => x.kode3 === el).map((x) => x.lvl3)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode3 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const uniq4 = this.dataanggaran.map((x) => x.kode4)
      const fils4 = uniq4?.length ? [...new Set(uniq4)] : []
      for (let i = 0; i < fils4?.length; i++) {
        const el = fils4[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode4 === el)[0].kode4,
          uraian: this.dataanggaran.filter((x) => x.kode4 === el).map((x) => x.lvl4)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode4 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const uniq5 = this.dataanggaran.map((x) => x.kode5)
      const fils5 = uniq5?.length ? [...new Set(uniq5)] : []
      for (let i = 0; i < fils5?.length; i++) {
        const el = fils5[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode5 === el)[0].kode5,
          uraian: this.dataanggaran.filter((x) => x.kode5 === el).map((x) => x.lvl5)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode5 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const uniq6 = this.dataanggaran.map((x) => x.kode)
      const fils6 = uniq6?.length ? [...new Set(uniq6)] : []
      for (let i = 0; i < fils6?.length; i++) {
        const el = fils6[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode === el)[0].kode,
          uraian: this.dataanggaran.filter((x) => x.kode === el)[0].uraian,
          pagu: this.dataanggaran.filter((x) => x.kode === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: this.dataanggaran.filter((x) => x.kode === el).map((x) => {
            return {
              kode108: x.koderek108,
              usulan: x.usulan,
              volume: x.volume,
              harga: x.harga,
              satuan: x.satuan,
              pagu: x.pagu
            }
          })
        }
        rka.push(obj)
      }

      const sortAnggaran = (rka) =>
        rka.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const dataRKA = sortAnggaran(rka)
      this.datarka = dataRKA
      // console.log('DATA RKAxxxx', this.datarka)

      this.totalPagukegiatan = totalrka
      // console.log('DATA total', this.totalPagukegiatan)

    },
    getAnggaranPergeseran() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/siasik/anggaran/getrkapergeseran', params).then((resp) => {
          // console.log('Data Anggaran', resp)
          this.pergeseran = []
          this.rincianpergeseran = []
          this.rincianperubahan = []
          if (resp.status === 200) {
            this.pergeseran = resp.data
            console.log('this.pergeseran', this.pergeseran)
            // this.rincianpergeseran = []
            this.rincianpergeseran = resp.data.flatMap((x) => x.hasilpergeseran)
            this.rincianperubahan = resp.data.flatMap((x) => x.perubahanpak)

            // console.log('pergeseran', this.pergeseran)
            // console.log('rincianpergeseran', this.rincianpergeseran)
            if (this.reqs.jenisrka === '2') {
              this.mapingDatapergeseran()
            } else {
              this.mapingDataperubahan()
            }

            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    mapingDatapergeseran() {
      const rka = []
      // const totalrka = []
      const unik1 = this.rincianpergeseran.map((x) => x.kode1)
      const ar1 = unik1.length ? [...new Set(unik1)] : []
      for (let i = 0; i < ar1.length; i++) {
        const el = ar1[i];
        const obj = {
          kode: this.rincianpergeseran.filter((x) => x.kode1 === el)[0].kode1,
          uraian: this.rincianpergeseran.filter((x) => x.kode1 === el)[0].uraian1,
          pagu: this.rincianpergeseran.filter((x) => x.kode1 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianpergeseran.filter((x) => x.kode1 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianpergeseran.filter((x) => x.kode1 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianpergeseran.filter((x) => x.kode1 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }

      const unik2 = this.rincianpergeseran.map((x) => x.kode2)
      const ar2 = unik2.length ? [...new Set(unik2)] : []
      for (let i = 0; i < ar2.length; i++) {
        const el = ar2[i];
        const obj = {
          kode: this.rincianpergeseran.filter((x) => x.kode2 === el)[0].kode2,
          uraian: this.rincianpergeseran.filter((x) => x.kode2 === el)[0].uraian2,
          pagu: this.rincianpergeseran.filter((x) => x.kode2 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianpergeseran.filter((x) => x.kode2 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianpergeseran.filter((x) => x.kode2 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianpergeseran.filter((x) => x.kode2 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }

      const unik3 = this.rincianpergeseran.map((x) => x.kode3)
      const ar3 = unik3.length ? [...new Set(unik3)] : []
      for (let i = 0; i < ar3.length; i++) {
        const el = ar3[i];
        const obj = {
          kode: this.rincianpergeseran.filter((x) => x.kode3 === el)[0].kode3,
          uraian: this.rincianpergeseran.filter((x) => x.kode3 === el)[0].uraian3,
          pagu: this.rincianpergeseran.filter((x) => x.kode3 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianpergeseran.filter((x) => x.kode3 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianpergeseran.filter((x) => x.kode3 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianpergeseran.filter((x) => x.kode3 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }

      const unik4 = this.rincianpergeseran.map((x) => x.kode4)
      const ar4 = unik4.length ? [...new Set(unik4)] : []
      for (let i = 0; i < ar4.length; i++) {
        const el = ar4[i];
        const obj = {
          kode: this.rincianpergeseran.filter((x) => x.kode4 === el)[0].kode4,
          uraian: this.rincianpergeseran.filter((x) => x.kode4 === el)[0].uraian4,
          pagu: this.rincianpergeseran.filter((x) => x.kode4 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianpergeseran.filter((x) => x.kode4 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianpergeseran.filter((x) => x.kode4 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianpergeseran.filter((x) => x.kode4 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const unik5 = this.rincianpergeseran.map((x) => x.kode5)
      const ar5 = unik5.length ? [...new Set(unik5)] : []
      for (let i = 0; i < ar5.length; i++) {
        const el = ar5[i];
        const obj = {
          kode: this.rincianpergeseran.filter((x) => x.kode5 === el)[0].kode5,
          uraian: this.rincianpergeseran.filter((x) => x.kode5 === el)[0].uraian5,
          pagu: this.rincianpergeseran.filter((x) => x.kode5 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianpergeseran.filter((x) => x.kode5 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianpergeseran.filter((x) => x.kode5 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianpergeseran.filter((x) => x.kode5 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }

      const unik6 = this.rincianpergeseran.map((x) => x.kode6)
      const ar6 = unik6.length ? [...new Set(unik6)] : []
      for (let i = 0; i < ar6.length; i++) {
        const el = ar6[i];
        const obj = {
          kode: this.rincianpergeseran.filter((x) => x.kode6 === el)[0].kode6,
          uraian: this.rincianpergeseran.filter((x) => x.kode6 === el)[0].uraian6,
          pagu: this.rincianpergeseran.filter((x) => x.kode6 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianpergeseran.filter((x) => x.kode6 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianpergeseran.filter((x) => x.kode6 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianpergeseran.filter((x) => x.kode6 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: this.rincianpergeseran.filter((x) => x.kode6 === el).map((x) => {
            return {
              kode108: x.koderek108,
              usulan: x.usulan,
              satuan: x.satuan,
              volume: x.volume,
              harga: x.harga,
              pagu: x.total,

              volumebaru: x.volumebaru,
              hargabaru: x.hargabaru,
              pagubaru: x.totalbaru,
              selisih: parseFloat(x.total) - parseFloat(x.totalbaru)
            }
          })
        }
        rka.push(obj)
      }

      const sortAnggaran = (rka) =>
        rka.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const dataRKApergeseran = sortAnggaran(rka)
      this.datarkapergeseran = dataRKApergeseran
      console.log('rka', this.datarkapergeseran)
    },


    mapingDataperubahan() {
      const rka = []
      // const totalrka = []
      const unik1 = this.rincianperubahan.map((x) => x.kode1)
      const ar1 = unik1.length ? [...new Set(unik1)] : []
      for (let i = 0; i < ar1.length; i++) {
        const el = ar1[i];
        const obj = {
          kode: this.rincianperubahan.filter((x) => x.kode1 === el)[0].kode1,
          uraian: this.rincianperubahan.filter((x) => x.kode1 === el)[0].uraian1,
          pagu: this.rincianperubahan.filter((x) => x.kode1 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianperubahan.filter((x) => x.kode1 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianperubahan.filter((x) => x.kode1 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianperubahan.filter((x) => x.kode1 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }

      const unik2 = this.rincianperubahan.map((x) => x.kode2)
      const ar2 = unik2.length ? [...new Set(unik2)] : []
      for (let i = 0; i < ar2.length; i++) {
        const el = ar2[i];
        const obj = {
          kode: this.rincianperubahan.filter((x) => x.kode2 === el)[0].kode2,
          uraian: this.rincianperubahan.filter((x) => x.kode2 === el)[0].uraian2,
          pagu: this.rincianperubahan.filter((x) => x.kode2 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianperubahan.filter((x) => x.kode2 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianperubahan.filter((x) => x.kode2 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianperubahan.filter((x) => x.kode2 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }

      const unik3 = this.rincianperubahan.map((x) => x.kode3)
      const ar3 = unik3.length ? [...new Set(unik3)] : []
      for (let i = 0; i < ar3.length; i++) {
        const el = ar3[i];
        const obj = {
          kode: this.rincianperubahan.filter((x) => x.kode3 === el)[0].kode3,
          uraian: this.rincianperubahan.filter((x) => x.kode3 === el)[0].uraian3,
          pagu: this.rincianperubahan.filter((x) => x.kode3 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianperubahan.filter((x) => x.kode3 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianperubahan.filter((x) => x.kode3 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianperubahan.filter((x) => x.kode3 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }

      const unik4 = this.rincianperubahan.map((x) => x.kode4)
      const ar4 = unik4.length ? [...new Set(unik4)] : []
      for (let i = 0; i < ar4.length; i++) {
        const el = ar4[i];
        const obj = {
          kode: this.rincianperubahan.filter((x) => x.kode4 === el)[0].kode4,
          uraian: this.rincianperubahan.filter((x) => x.kode4 === el)[0].uraian4,
          pagu: this.rincianperubahan.filter((x) => x.kode4 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianperubahan.filter((x) => x.kode4 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianperubahan.filter((x) => x.kode4 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianperubahan.filter((x) => x.kode4 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const unik5 = this.rincianperubahan.map((x) => x.kode5)
      const ar5 = unik5.length ? [...new Set(unik5)] : []
      for (let i = 0; i < ar5.length; i++) {
        const el = ar5[i];
        const obj = {
          kode: this.rincianperubahan.filter((x) => x.kode5 === el)[0].kode5,
          uraian: this.rincianperubahan.filter((x) => x.kode5 === el)[0].uraian5,
          pagu: this.rincianperubahan.filter((x) => x.kode5 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianperubahan.filter((x) => x.kode5 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianperubahan.filter((x) => x.kode5 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianperubahan.filter((x) => x.kode5 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }

      const unik6 = this.rincianperubahan.map((x) => x.kode6)
      const ar6 = unik6.length ? [...new Set(unik6)] : []
      for (let i = 0; i < ar6.length; i++) {
        const el = ar6[i];
        const obj = {
          kode: this.rincianperubahan.filter((x) => x.kode6 === el)[0].kode6,
          uraian: this.rincianperubahan.filter((x) => x.kode6 === el)[0].uraian6,
          pagu: this.rincianperubahan.filter((x) => x.kode6 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0),
          pagubaru: this.rincianperubahan.filter((x) => x.kode6 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          selisih: this.rincianperubahan.filter((x) => x.kode6 === el).map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) -
            this.rincianperubahan.filter((x) => x.kode6 === el).map((x) => parseFloat(x.totalbaru)).reduce((a, b) => a + b, 0),
          rincian: this.rincianperubahan.filter((x) => x.kode6 === el).map((x) => {
            return {
              kode108: x.koderek108,
              usulan: x.usulan,
              satuan: x.satuan,
              volume: x.volume,
              harga: x.harga,
              pagu: x.total,

              volumebaru: x.volumebaru,
              hargabaru: x.hargabaru,
              pagubaru: x.totalbaru,
              selisih: parseFloat(x.total) - parseFloat(x.totalbaru)
            }
          })
        }
        rka.push(obj)
      }

      const sortAnggaran = (rka) =>
        rka.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const dataRKAperubahan = sortAnggaran(rka)
      this.datarkaperubahan = dataRKAperubahan
      console.log('rka PAK', this.datarkaperubahan)
    }
  }
})
