import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanBkuPpkStore = defineStore('laporan_bkuppk', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },

    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
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
    nilaisaldoawal: 0,
    npkls: [],
    hasilArray: [],
    arrayTanggal: [],
    pegawais: [],
    saldoakhir: 0,

    sebelumsaldo: [],
    sebelumsilpa: [],
    sebelumsetor: [],
    sebelumkaskecil: [],
    sebelumspm: [],
    sebelumspmgu: [],
    sebelumnihil: [],
    sebelumnpkls: [],

    dialogCetak: false
  }),

  actions: {
    setParams(key, val) {
      this.params[key] = val
    },

    getInitialData() {
      this.getDataTable()
    },

    async getDataTable() {
      this.loading = true
      const params = { params: this.params }
      await api
        .get('v1/laporan/laporan_bku/bkuppk', params)
        .then((resp) => {
          // console.log('dataBKUPPK', resp)
          if (resp.status === 200) {
            this.hasilArray = []
            this.items = []
            this.items = resp.data
            this.npkls = resp.data.npkls
            this.pegawais = resp.data?.pegawai

            // Perbaikan untuk memastikan semua array diinisialisasi dengan benar
            this.sebelumsaldo = Array.isArray(resp.data?.saldosebelum) ? resp.data.saldosebelum : []
            this.sebelumsilpa = Array.isArray(resp.data?.silpasebelum) ? resp.data.silpasebelum : []
            this.sebelumsetor = Array.isArray(resp.data?.setorsebelum) ? resp.data.setorsebelum : []
            this.sebelumspm = Array.isArray(resp.data?.spmsebelum) ? resp.data.spmsebelum : []
            this.sebelumspmgu = Array.isArray(resp.data?.spmgusebelum) ? resp.data.spmgusebelum : []
            this.sebelumnihil = Array.isArray(resp.data?.nihilsebelum) ? resp.data.nihilsebelum : []
            this.sebelumnpkls = Array.isArray(resp.data?.npklssebelum) ? resp.data.npklssebelum : []
            this.sebelumkaskecil = Array.isArray(resp.data?.kaskecilsebelum) ? resp.data.kaskecilsebelum : []

            this.hitungharidalamBulan()
            this.loading = false
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          this.loading = false
        })
    },

    hitungharidalamBulan() {
      const cariBulan = new Date(
        this.params.tahun,
        this.params.bulan,
        0
      ).getDate()

      const tempTanggal = []
      for (let i = 0; i < cariBulan; i++) {
        const tgl = this.buatTanggal(i + 1)
        tempTanggal.push(tgl)
      }
      this.mapingData(tempTanggal)
      this.loading = false
    },

    buatTanggal(n) {
      const tgl = n > 9 ? n : '0' + n
      const thn = this.params.tahun
      const bln = this.params.bulan
      return thn + '-' + bln + '-' + tgl
    },

    mapingData(tgl) {
      // ===================================================Saldo
      const saldo = []

      // Cek apakah bulan Januari dan ada data saldo di database
      if (this.params.bulan === '01' && this.items.saldo && this.items.saldo?.length) {
        // Untuk Januari, gunakan nilai saldo dari database jika tersedia
        for (let i = 0; i < this.items.saldo?.length; i++) {
          const el = this.items.saldo
          const obj = {
            tgl: el[i].tanggal,
            notrans: el[i].rekening,
            nonpd: null,
            category: 'Saldo Awal',
            uraian: 'Saldo Awal',
            uraianNPD: null,
            urutan: 1,
            penerimaan: parseFloat(el[i].nilaisaldo),
            pengeluaran: 0,
          }
          saldo.push(obj)
        }
      } else {
        // Untuk bulan selain Januari
        let saldoAwal = 0

        // Cek jika backend memberikan saldo akhir bulan sebelumnya
        if (this.items.saldoAkhirBulanSebelumnya !== undefined) {
          // Gunakan nilai saldo akhir dari backend
          saldoAwal = parseFloat(this.items.saldoAkhirBulanSebelumnya)
          // console.log('Menggunakan saldo akhir bulan sebelumnya dari backend:', saldoAwal)
        } else {
          // Jika backend tidak menyediakan saldo akhir bulan sebelumnya,
          // hitung dari data transaksi bulan sebelumnya
          const nilaisaldoDebit = []
          const nilaisaldoKredit = []

          // Gabungkan semua transaksi debit dan kredit dari bulan sebelumnya
          const gabungsebelumdebit = this.sebelumsetor.concat(this.sebelumnihil, this.sebelumsilpa, this.sebelumsaldo)
          const gabungsebelumkredit = this.sebelumspm.concat(this.sebelumspmgu, this.sebelumnpkls, this.sebelumkaskecil)

          nilaisaldoDebit.push(...gabungsebelumdebit)
          nilaisaldoKredit.push(...gabungsebelumkredit)

          // Hitung total debit dan kredit
          const totaldebitsebelum = nilaisaldoDebit?.length ? nilaisaldoDebit.map(x => parseFloat(x.nilai || 0)).reduce((x, y) => x + y, 0) : 0
          const totalkreditsebelum = nilaisaldoKredit?.length ? nilaisaldoKredit.map(x => parseFloat(x.nilai || 0)).reduce((x, y) => x + y, 0) : 0
          saldoAwal = totaldebitsebelum - totalkreditsebelum

          // console.log('totaldebitsebelum (dihitung):', totaldebitsebelum)
          // console.log('totalkreditsebelum (dihitung):', totalkreditsebelum)
          // console.log('saldoawal (dihitung):', saldoAwal)
        }

        // Buat objek saldo awal untuk bulan ini
        const sal = {
          tgl: this.buatTanggal(1), // Tanggal 1 bulan berjalan
          notrans: '',
          nonpd: '',
          category: 'Saldo Awal',
          uraian: 'Saldo Awal',
          uraianNPD: '',
          urutan: 1,
          penerimaan: saldoAwal,
          pengeluaran: 0
        }
        saldo.push(sal)
      }

      // Hitung total saldo awal dengan memperhitungkan penerimaan dan pengeluaran
      this.nilaisaldoawal = saldo.map((x) => x.penerimaan).reduce((a, b) => a + b, 0) -
        saldo.map((x) => x.pengeluaran).reduce((a, b) => a + b, 0)

      // ===================================================Silpa
      const silpa = []
      if (this.items.silpa && this.items.silpa?.length) {
        for (let i = 0; i < this.items.silpa?.length; i++) {
          const el = this.items.silpa
          const obj = {
            tgl: el[i].tanggal,
            notrans: el[i].notrans,
            nonpd: null,
            category: 'silpa',
            uraian: 'Silpa',
            uraianNPD: null,
            urutan: 1,
            penerimaan: parseFloat(el[i].nominal),
            pengeluaran: 0
          }
          silpa.push(obj)
        }
      }

      // ===================================================Setor
      const setor = []
      if (this.items.setor && this.items.setor?.length) {
        for (let i = 0; i < this.items.setor?.length; i++) {
          const el = this.items.setor
          const obj = {
            tgl: el[i].tgltrans,
            notrans: el[i].idtrans,
            nonpd: null,
            category: 'setoranpendapatan',
            uraian: el[i].ket,
            uraianNPD: null,
            urutan: 2,
            penerimaan: parseFloat(el[i].nilai),
            pengeluaran: 0
          }
          setor.push(obj)
        }
      }

      // ===================================================SPM
      const spm = []
      if (this.items.spm && this.items.spm?.length) {
        for (let i = 0; i < this.items.spm?.length; i++) {
          const el = this.items.spm
          const obj = {
            tgl: el[i].tglSpm,
            notrans: el[i].noSpm,
            nonpd: null,
            category: 'spm',
            uraian: el[i].uraian,
            uraianNPD: null,
            urutan: 3,
            penerimaan: 0,
            pengeluaran: parseFloat(el[i].jumlahspp)
          }
          spm.push(obj)
        }
      }

      // ===================================================SPMGU
      const spmgu = []
      if (this.items.spmgu && this.items.spmgu?.length) {
        for (let i = 0; i < this.items.spmgu?.length; i++) {
          const el = this.items.spmgu
          const obj = {
            tgl: el[i].tglSpm,
            notrans: el[i].noSpm,
            nonpd: null,
            category: 'spmgu',
            uraian: el[i].uraian,
            uraianNPD: null,
            urutan: 4,
            penerimaan: 0,
            pengeluaran: parseFloat(el[i].jumlahspp)
          }
          spmgu.push(obj)
        }
      }

      // ===================================================NPKls
      const npkls = []
      if (this.npkls && this.npkls?.length) {
        for (let i = 0; i < this.npkls?.length; i++) {
          const el = this.npkls[i]
          const rinci = el.npklsrinci || []

          const obj = {
            tgl: el.tglpindahbuku,
            notrans: el.nonpk,
            nonpd: rinci.map((x) => x.nonpdls),
            category: 'npkls',
            uraian: 'Pengeluaran Kegiatan Pelayanan dan Penunjang BLUD',
            uraianNPD: rinci.map((x) => x.kegiatanblud),
            urutan: 4,
            penerimaan: 0,
            pengeluaran: rinci?.length ? rinci.map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0) : 0
          }
          npkls.push(obj)
        }
      }

      // ===================================================Nihil
      const nihil = []
      if (this.items.nihil && this.items.nihil?.length) {
        for (let i = 0; i < this.items.nihil?.length; i++) {
          const el = this.items.nihil
          const obj = {
            tgl: el[i].tgltrans,
            notrans: el[i].nopengembalian,
            nonpd: null,
            category: 'nihil',
            uraian: 'Pengembalian Nihil',
            uraianNPD: null,
            urutan: 5,
            penerimaan: parseFloat(el[i].jmlpengembalianreal),
            pengeluaran: 0
          }
          nihil.push(obj)
        }
      }

      // ===================================================Kaskecil
      const kurangikaskecil = []
      if (this.items.kaskecil && this.items.kaskecil?.length) {
        for (let i = 0; i < this.items.kaskecil?.length; i++) {
          const el = this.items.kaskecil
          const obj = {
            tgl: date.formatDate(el[i].tanggalpengeluaran, 'YYYY-MM-DD'),
            notrans: el[i].nomorpengeluaran,
            nonpd: null,
            category: 'kaskecil',
            uraian: 'Pengembalian Kepada Pasien',
            uraianNPD: null,
            urutan: 6,
            penerimaan: 0,
            pengeluaran: parseFloat(el[i].nominal)
          }
          kurangikaskecil.push(obj)
        }
      }

      // Menggabungkan array
      const gabungArray = saldo.concat(silpa, setor, spm, spmgu, npkls, nihil, kurangikaskecil)

      // Urutan by tanggal
      const sortByDate = (arr) =>
        arr.sort(({ tgl: a }, { tgl: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )

      const hslSmntara = sortByDate(gabungArray)

      // Cari Total Zigzag
      this.hasilArray = this.cariHasilAkhirArray(hslSmntara)

      // Simpan saldo akhir untuk kebutuhan reporting
      if (this.hasilArray?.length > 0) {
        this.saldoakhir = this.hasilArray[this.hasilArray?.length - 1].total
      }

      // console.log('hasil gabung', this.hasilArray)
      this.debugSaldoPerbulan()
    },

    cariHasilAkhirArray(arr) {
      if (!arr?.length) return []

      let total = 0
      for (let i = 0; i < arr?.length; i++) {
        if (i === 0) {
          total = arr[0].penerimaan - arr[0].pengeluaran
          arr[0].total = total
        } else {
          const penerimaan = parseFloat(arr[i].penerimaan || 0)
          const pengeluaran = parseFloat(arr[i].pengeluaran || 0)
          total += (penerimaan - pengeluaran)
          arr[i].total = total
        }
      }
      return arr
    },

    ambilDataUnik(x, f) {
      // eslint-disable-next-line no-sequences
      return Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}))
    },

    hitungTotalNpd(arr) {
      if (!arr || !arr?.length) return 0
      return arr
        .map((x) => parseFloat(x.nominalpembayaran || 0))
        .reduce((x, y) => x + y, 0)
    },

    hitungTBP(arr) {
      if (!arr || !arr?.length) return 0
      return arr
        .map((x) => parseFloat(x.nilai || 0))
        .reduce((x, y) => x + y, 0)
    },

    hitungPlain(arr) {
      if (!arr || !arr?.length) return 0
      return arr
        .map((x) => parseFloat(x.plainlain?.rs4 || 0))
        .reduce((x, y) => x + y, 0)
    },

    debugSaldoPerbulan() {
      const bulan = this.params.bulan
      const tahun = this.params.tahun
      const saldoAwal = this.nilaisaldoawal
      const saldoAkhir = this.hasilArray?.length > 0 ? this.hasilArray[this.hasilArray?.length - 1].total : 0

      // Hitung total debit dan kredit dari bulan sebelumnya untuk validasi
      const totalDebitSebelum = [
        ...this.sebelumsaldo,
        ...this.sebelumsetor,
        ...this.sebelumnihil,
        ...this.sebelumsilpa
      ].reduce((sum, item) => sum + parseFloat(item.nilai || 0), 0)

      const totalKreditSebelum = [
        ...this.sebelumspm,
        ...this.sebelumspmgu,
        ...this.sebelumnpkls,
        ...this.sebelumkaskecil
      ].reduce((sum, item) => sum + parseFloat(item.nilai || 0), 0)

      const saldoSeharusnya = totalDebitSebelum - totalKreditSebelum

      // Cek saldo dari backend jika tersedia
      const saldoBackend = this.items.saldoAkhirBulanSebelumnya !== undefined
        ? parseFloat(this.items.saldoAkhirBulanSebelumnya)
        : 'Tidak tersedia'

      // console.log(`===== DEBUG SALDO BULAN ${bulan}/${tahun} =====`)
      // console.log('Saldo Awal Aktual:', saldoAwal)
      // console.log('Saldo dari Backend:', saldoBackend)
      // console.log('Saldo Seharusnya (dihitung):', saldoSeharusnya)

      if (saldoBackend !== 'Tidak tersedia') {
        console.log('Selisih dengan Backend:', saldoAwal - saldoBackend)
      }

      // console.log('Selisih dengan Perhitungan:', saldoAwal - saldoSeharusnya)
      // console.log('Saldo Akhir:', saldoAkhir)
      // console.log('Total Debit Sebelum:', totalDebitSebelum)
      // console.log('Total Kredit Sebelum:', totalKreditSebelum)
      // console.log('Data Sebelum Debit:', this.sebelumsaldo, this.sebelumsetor, this.sebelumnihil, this.sebelumsilpa)
      // console.log('Data Sebelum Kredit:', this.sebelumspm, this.sebelumspmgu, this.sebelumnpkls, this.sebelumkaskecil)

      return {
        bulan,
        tahun,
        saldoAwal,
        saldoAkhir,
        saldoBackend,
        saldoSeharusnya,
        totalDebitSebelum,
        totalKreditSebelum,
        dataSebelumDebit: {
          saldo: this.sebelumsaldo,
          setor: this.sebelumsetor,
          nihil: this.sebelumnihil,
          silpa: this.sebelumsilpa
        },
        dataSebelumKredit: {
          spm: this.sebelumspm,
          spmgu: this.sebelumspmgu,
          npkls: this.sebelumnpkls,
          kaskecil: this.sebelumkaskecil
        }
      }
    }
  }
})
