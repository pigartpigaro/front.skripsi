import { acceptHMRUpdate, defineStore } from 'pinia'
import { date, Dialog } from 'quasar'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { formatDoubleKoma } from 'src/modules/formatter'
import { filterDuplicateArrays, notifErrVue } from 'src/modules/utils'
// eslint-disable-next-line no-unused-vars
import { watch } from 'vue'

export const useLaporanMutasiFiFoFarmasiStore = defineStore('laporan_mutasi_fifo_farmasi', {
  state: () => ({
    loading: false,
    loadingNext: false,
    scrolling: false,
    loadingDownload: false,
    ketProses: null,
    items: [],
    meta: {},
    params: {
      // q: '0000799-FAR',
      q: '',
      per_page: 100,
      page: 1,
      // bulan: '06',
      // tahun: '2024',
      // jenis: 'detail',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      jenis: 'rekap',
      kode_ruang: 'all',
    },
    bulans: [
      { nama: 'January', value: '01' },
      { nama: 'February', value: '02' },
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
    gudangs: [
      { nama: 'Semua', value: 'all' },
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    optionJenis: [
      { nama: 'Detail', value: 'detail' },
      { nama: 'Rekap', value: 'rekap' }
    ],
    total: 0,
    tTotal: 0,
    htotal: 0,
    htTotal: 0,
    fields: {}
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      console.log(this.params.q)
      // this.setParams('q', payload)
      this.items = []
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (payload) {
      this.setParams('page', payload)
      this.getDataTable()
    },
    setPerPage (payload) {
      this.setParams('per_page', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    refreshTable () {
      this.setParams('page', 1)
      this.getDataTable()
    },
    mapingItem (val, array, type) {
      val.forEach(it => {
        it.data = []
        // --- harga dan sub dg bawa penerimaan rinci start ---
        it?.distribusipersiapan?.forEach(per => {
          const harga = it?.daftarharga.find(f => f.nopenerimaan === per.nopenerimaan)?.harga ?? 0
          per.harga = harga
          per.sub = per?.jumlah * harga
        })
        it?.persiapanretur?.forEach(per => {
          const harga = it?.daftarharga.find(f => f.nopenerimaan === per.nopenerimaan)?.harga ?? 0
          per.harga = harga
          per.sub = per?.jumlah * harga
        })
        const masuk = []
        const masukx = []
        const keluar = []
        const keluarx = []
        const resep = it?.resepkeluar ?? []
        const racikan = it?.resepkeluarracikan ?? []
        const pak = it?.mutasikeluar ?? []
        const masNgam = it?.mutasimasukngambang ?? []
        const kelNgam = it?.mutasikeluarngambang ?? []
        if (this.params.jenis === 'detail') {
          if (it?.saldoawal?.length) {
            it?.saldoawal.forEach(s => {
              s.tgl = this.params.tahun + '-' + this.params.bulan + '-01 00:00:00'
              const temp = {
                tgl: s.tgl,
                saldoawal: s,
                ket: 'Saldo Awal ( ' + s?.nopenerimaan + ' )'
              }
              it.data.push(temp)
            })

          }
          it?.terima?.forEach(per => {
            masuk.push(per)
          })

          it?.penerimaanrinci.forEach(s => {
            const temp = {
              tgl: s.tgl,
              masuk: s,
              ket: s?.pbf?.nama + ' ( ' + s?.jenissurat + ' : ' + s?.nomorsurat + ' ) '
            }
            it.data.push(temp)
          })
          it?.retur?.forEach(per => {
            masuk.push(per)
          })

          it?.returpenjualan?.forEach(res => {
            const temp = {
              tgl: res.tgl,
              masuk: res,
              ket: 'retur dari ' + res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '')
            }
            it.data.push(temp)
          })
          masNgam?.forEach(res => {
            const temp = {
              tgl: res.tgl,
              masuk: res,
              ket: 'Mutasi masuk ' + ((res?.ruangan?.uraian ?? res?.depo?.nama ?? ' ') + ' ' + res?.no_permintaan ?? '')
            }
            it.data.push(temp)
          })
          it?.persiapanretur?.forEach(res => {
            const temp = {
              tgl: res.tgl,
              masuk: res,
              ket: 'retur dari ' + res?.norm + ' ' + (res?.pasien?.rs2 ?? '')
            }
            it.data.push(temp)


            masuk.push(res)
          })
          if (it?.penyesuaian?.length) {
            it?.penyesuaian.forEach(p => {

              if (p?.jumlah > 0) {
                const temp = {
                  tgl: p?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
                  masuk: p,
                  ket: 'Pengembalian sisa pasien'
                }
                it.data.push(temp)
                masuk.push(p)
              }
              else {
                const dat = {
                  harga: p?.harga,
                  jumlah: -p?.jumlah,
                  kdobat: p?.kdobat,
                  nopenerimaan: p?.nopenerimaan,
                  sub: -p?.sub,
                  tgl: p?.tgl
                }
                const temp = {
                  tgl: p?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
                  keluar: dat,
                  ket: 'Salah hitung stok opname'
                }
                it.data.push(temp)
                keluar.push(dat)
              }
            })
            // console.log('masuk', masuk)
            // console.log('penyesuaian', it?.penyesuaian, akhir)
          }
          // console.log('masuk', masuk)

          it?.resepkeluarok?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '')
            }

            it.data.push(temp)
            keluar.push(res)

          })
          resep?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '')
            }

            it.data.push(temp)
            keluar.push(res)

          })
          racikan?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '')
            }

            it.data.push(temp)
            keluar.push(res)

          })
          it?.distribusipersiapan?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: res?.norm + ' ' + (res?.pasien?.rs2 ?? '')
            }

            it.data.push(temp)
            keluar.push(res)

          })
          pak?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: ((res?.ruangan?.uraian ?? res?.depo?.nama ?? ' ') + ' ' + res?.no_permintaan ?? '')
            }

            it.data.push(temp)
            keluar.push(res)

          })
          kelNgam?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: 'Mutasi masuk ' + ((res?.ruangan?.uraian ?? res?.depo?.nama ?? ' ') + ' ' + res?.no_permintaan ?? '')
            }

            it.data.push(temp)
            keluar.push(res)

          })
          it?.barangrusak?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: res?.ket ?? ''
            }

            it.data.push(temp)
            keluar.push(res)

          })
          it?.returpbf?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: 'Retur Ke ' + res?.header?.penyedia?.nama ?? ''
            }

            it.data.push(temp)
            keluar.push(res)

          })
          it?.pengembalianrincififo?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: 'Retur Ke ' + res?.header?.penyedia?.nama ?? ''
            }

            it.data.push(temp)
            keluar.push(res)

          })
        }
        else {
          const temp = {
            kd_obat: it?.kd_obat,
            tgl: this.params.tahun + '-' + this.params.bulan + '-01 00:00:00',
            ket: ''
          }
          it.data.push(temp)

          if (it?.saldoawal?.length) {
            const sala = {
              kd_obat: it?.kd_obat,
              jumlah: it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }

            it.data[0].saldoawal = sala
          }
          if (it?.penerimaanrinci?.length) {
            // if (it?.penerimaanrinci?.length) {
            const jumlah = it?.penerimaanrinci?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subt = it?.penerimaanrinci?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const ms = {
              tgl: it?.penerimaanrinci[0]?.tgl,
              kd_obat: it?.kd_obat,
              kdobat: it?.kd_obat,
              jumlah,
              sub: subt,
              ket: 'Penerimaan'
            }


            masuk.push(ms)

            // console.log('terima ', masukx)
          }
          if (it?.persiapanretur?.length) {
            const jumlah = it?.persiapanretur?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subt = it?.persiapanretur?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const ms = {
              tgl: it?.persiapanretur[0]?.tgl,
              kd_obat: it?.kd_obat,
              kdobat: it?.kd_obat,
              jumlah,
              sub: subt,
              ket: 'Retur Persiapan'
            }


            masuk.push(ms)

            // console.log('terima ', masukx)
          }
          if (it?.returpenjualan?.length) {
            const raw = {
              tgl: it?.returpenjualan[0]?.tgl,
              harga: 0,
              jumlah: it?.returpenjualan?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.returpenjualan?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Retur Penjualan'

            }


            masuk.push(raw)
          }

          if (it?.penyesuaian?.length) {
            const raw = {
              tgl: it?.penyesuaian[0]?.tgl,
              harga: 0,
              kdobat: it?.penyesuaian[0]?.kdobat,
              kd_obat: it?.penyesuaian[0]?.kd_obat,
              jumlah: it?.penyesuaian?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.penyesuaian?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Penngembalian sisa pasien'
            }
            if (raw?.jumlah > 0) {

              masuk.push(raw)
            }
            else if (raw?.jumlah < 0) {
              const jumlah = -raw.jumlah
              const sub = -raw.sub

              raw.jumlah = jumlah
              raw.sub = sub


              keluarx.push(raw)
            }
            // console.log('Ada penyesuanag', masukx, masuk)
            // console.log('penyesuaian', it?.penyesuaian, akhir)
          }

          if (it?.resepkeluarok?.length) {
            const raw = {
              tgl: it?.resepkeluarok[0]?.tgl,
              harga: 0,
              jumlah: it?.resepkeluarok?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.resepkeluarok?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Resep Keluar OK'
            }


            keluarx.push(raw)
          }
          if (it?.distribusipersiapan?.length) {
            const raw = {
              tgl: it?.distribusipersiapan[0]?.tgl,
              harga: 0,
              jumlah: it?.distribusipersiapan?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.distribusipersiapan?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Distribusi Persiapan'
            }


            keluarx.push(raw)
          }
          if (it?.resepkeluar?.length) {
            const raw = {
              tgl: it?.resepkeluar[0]?.tgl,
              harga: 0,
              jumlah: it?.resepkeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.resepkeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Resep Keluar'
            }


            keluarx.push(raw)
          }
          if (it?.resepkeluarracikan?.length) {
            const raw = {
              tgl: it?.resepkeluarracikan[0]?.tgl,
              harga: 0,
              jumlah: it?.resepkeluarracikan?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.resepkeluarracikan?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Resep Keluar Racikan'
            }


            keluarx.push(raw)
          }
          if (it?.returpbf?.length) {
            const raw = {
              tgl: it?.returpbf[0]?.tgl,
              harga: 0,
              jumlah: it?.returpbf?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.returpbf?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Retur PBF'
            }


            keluarx.push(raw)
          }
          if (it?.pengembalianrincififo?.length) {
            const raw = {
              tgl: it?.pengembalianrincififo[0]?.tgl,
              harga: 0,
              jumlah: it?.pengembalianrincififo?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.pengembalianrincififo?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Pengembalian Pinjaman'
            }


            keluarx.push(raw)
          }
          if (it?.barangrusak?.length) {
            const raw = {
              tgl: it?.barangrusak[0]?.tgl,
              harga: 0,
              jumlah: it?.barangrusak?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.barangrusak?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Barang Rusak'
            }


            keluarx.push(raw)
          }
          if (it?.mutasikeluar?.length) {
            const raw = {
              tgl: it?.mutasikeluar[0]?.tgl,
              harga: 0,
              jumlah: it?.mutasikeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.mutasikeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Mutasi Keluar'
            }


            keluarx.push(raw)
          }
          if (it?.mutasikeluarngambang?.length) {
            const raw = {
              tgl: it?.mutasikeluarngambang[0]?.tgl,
              harga: 0,
              jumlah: it?.mutasikeluarngambang?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.mutasikeluarngambang?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Mutasi Keluar Beklum diteriman'
            }


            keluarx.push(raw)
          }
          if (it?.mutasimasukngambang?.length) {
            const raw = {
              tgl: it?.mutasimasukngambang[0]?.tgl,
              harga: 0,
              jumlah: it?.mutasimasukngambang?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.mutasimasukngambang?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Mutasi masuk depo'
            }


            masuk.push(raw)
          }
        }
        if (this.params.jenis === 'rekap') {

          if (masuk?.length) {
            const mas = {
              kd_obat: it?.kd_obat,
              jumlah: masuk?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: masuk?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }
            it.data[0].masuk = mas
          }
          if (keluarx?.length) {
            const kel = {
              kd_obat: it?.kd_obat,
              jumlah: keluarx?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: keluarx?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }
            it.data[0].keluar = kel
          }
          const jAw = it.data[0]?.saldoawal?.jumlah ?? 0
          const sAw = it.data[0]?.saldoawal?.sub ?? 0

          const jMa = it.data[0]?.masuk?.jumlah ?? 0
          const sMa = it.data[0]?.masuk?.sub ?? 0

          const jKe = it.data[0]?.keluar?.jumlah ?? 0
          const sKe = it.data[0]?.keluar?.sub ?? 0
          const akh = {
            kd_obat: it?.kd_obat,
            jumlah: jAw + jMa - jKe,
            sub: sAw + sMa - sKe
          }
          if (it.data?.length > 0) it.data[0].akhir = akh

          it.masuk = masuk
          it.keluar = keluarx
          // const newMasuk = masuk?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          // const newKeluar = keluarx?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          // const newAw = it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          // const newAkhir = newAw + newMasuk - newKeluar
          // console.log('masukAll', masuk)
          // console.log('keluarAll', keluarx)
          // console.log('masuk', newMasuk)
          // console.log('keluar', newKeluar)
          // console.log('akhir', newAkhir)

        }
        else {
          const aw = it?.saldo?.map(m => m.nopenerimaan)
          const npms = masuk.map(m => m.nopenerimaan)
          const nkms = keluar.map(m => m.nopenerimaan)
          const noper = filterDuplicateArrays([...new Set([...npms, ...nkms, ...aw])])
          console.log('masuk', masuk)
          console.log('keluar', keluar)
          console.log('noper', noper)

          // const akhir = masuk.filter(f => f.jumlah !== 0)
          const akhir = []
          noper.forEach(nop => {
            const jumAw = it?.saldo.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subAw = it?.saldo.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const jumMas = masuk.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subMas = masuk.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const jumKel = keluar.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subKel = keluar.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const temp = {
              nopenerimaan: nop,
              jumlah: jumAw + jumMas - jumKel,
              sub: subAw + subMas - subKel
            }
            akhir.push(temp)
          })
          console.log('akhir', akhir)

          it.akhir = akhir.filter(f => f.jumlah !== 0)
          it.akhir.forEach(s => {
            s.tgl = this.params.tahun + '-' + this.params.bulan + '-31 23:59:50'
            const temp = {
              tgl: s.tgl,
              ket: 'Saldo Akhir (' + s.nopenerimaan + ')'
            }
            if (this.params.jenis === 'rekap' && it.data.filter(f => f.masuk)?.map(m => m.masuk)?.length > 1) {
              // temp.akhir = s
              // temp.masuk = {
              //   jumlah: it.data.filter(f => f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              //   sub: it.data.filter(f => f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
              // }
            }
            else {
              temp.akhir = s
            }
            // console.log('temp akhir', temp)

            if (type !== 'download') it.data.push(temp)
          })
        }
        const jumAk = it?.akhir?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subAk = it?.akhir?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const jumAw = it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subAw = it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const jumMs = it?.data?.filter(f => !!f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subMs = it?.data?.filter(f => !!f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const jumKel = it?.data?.filter(f => !!f.keluar)?.map(m => m.keluar)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subKel = it?.data?.filter(f => !!f.keluar)?.map(m => m.keluar)?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const subt = {
          tgl: this.params.tahun + '-' + this.params.bulan + '-31 23:59:59',
          subtotal: {
            jumlah: jumAk,
            sub: subAk
          },
          subAw: {
            jumlah: jumAw,
            sub: subAw
          },
          subMs: {
            jumlah: jumMs,
            sub: subMs
          },
          subKel: {
            jumlah: jumKel,
            sub: subKel
          },
          ket: type === 'download' ? '' : 'Subtotal Saldo Akhir'
        }
        if (this.params.jenis === 'detail' && (jumAk > 0 || jumAw > 0 || jumMs > 0 || jumKel > 0)) it?.data.push(subt)
        // if (this.params.jenis === 'rekap' && type === 'download') it?.data.push(subt)

        it?.data?.sort(function (a, b) {
          const dateA = new Date(a.tgl)
          const dateB = new Date(b.tgl)

          // Subtract the dates to get a value that is either negative, positive, or zero
          return dateA - dateB
        })
        const index = array.findIndex(a => a.kd_obat === it.kd_obat)
        if (index >= 0) array[index] = it
        else array.push(it)
      })

      // array = val
      console.log('metani items', array)
    },
    getInitialData (val) {
      this.ketProses = null
      this.setParams('page', val)
      this.setParams('action', '')
      this.getDataTable()
      this.meta = {}
      this.items = []
    },
    async getAllData () {

      const param = { params: this.params }
      const items = []

      if (this.meta?.current_page >= 1 && this.meta?.current_page === this.meta?.last_page) {
        Dialog.create({
          title: 'Konfirmasi',
          message: 'Apakah Akan Mengambil ulang data?',
          ok: {
            label: 'Ya',
            color: 'primary',
            push: true
          },
          cancel: {
            label: 'Tidak',
            color: 'negative',
            push: true
          },
          persistent: true,

        })
          .onOk(async () => {
            this.setParams('page', 1)
            this.meta = {
              current_page: 0,
              last_page: 5
            }
            this.ketProses = 'Mengambil data halaman '

            let currentPage = 1
            let totalPages = 5
            do {
              param.params.page = currentPage // Tambahkan parameter halaman
              const resp = await api.get('v1/simrs/laporan/farmasi/persediaan/get-mutasi', param)
              if (!resp?.data?.data?.length) {
                if (currentPage === 1) {
                  this.ketProses = null
                  return notifErrVue('Data tidak ditemukan')
                }
                break
              }
              this.ketProses = 'Mengambil data halaman '
              totalPages = resp.data?.meta?.last_page || totalPages // Total halaman dari API
              this.meta = resp.data?.meta
              this.mapingItem(resp?.data?.data, items, 'download')

              currentPage++
            } while (currentPage <= totalPages)

            this.ketProses = null
            this.items = items
          })
      } else {
        this.ketProses = 'Mengambil data halaman '

        this.meta = {
          current_page: 0,
          last_page: 5
        }
        let currentPage = this.meta?.current_page + 1 ?? 1
        let totalPages = this.meta?.last_page ?? 5
        do {
          param.params.page = currentPage // Tambahkan parameter halaman
          const resp = await api.get('v1/simrs/laporan/farmasi/persediaan/get-mutasi', param)
          if (!resp?.data?.data?.length) {
            if (currentPage === 1) {
              this.ketProses = null
              return notifErrVue('Data tidak ditemukan')
            }
            break
          }
          this.ketProses = 'Mengambil data halaman '
          totalPages = resp.data?.meta?.last_page || totalPages // Total halaman dari API
          this.meta = resp.data?.meta
          this.mapingItem(resp?.data?.data, items, 'download')

          currentPage++
        } while (currentPage <= totalPages)
        this.ketProses = null
        this.items = items

      }
      // this.setParams('per_page', 5)
      // this.getDatanya()
      // console.log('this.meta?.current_page', this.meta?.current_page, !(this.ketProses))
      // watch(() => this.meta?.current_page, (obj) => {
      //   console.log('obj', obj, !this.scrolling, this.meta?.current_page < this.meta?.last_page, !(this.ketProses), this.meta?.current_page < this.meta?.last_page && !this.scrolling && !(this.ketProses))
      //   if (this.meta?.current_page < this.meta?.last_page && !this.scrolling && !(this.ketProses)) {
      //     this.setParams('page', obj + 1)
      //     // this.ketProses = 'Mengambil data halaman ' + this.meta?.current_page + ' dari ' + this.meta?.last_page + ' halaman'
      //     this.ketProses = 'Mengambil data halaman '
      //   }
      //   else {
      //     this.ketProses = ''
      //   }
      //   this.getDatanya()
      // })
    },
    getDatanya (items) {
      this.loadingNext = true
      // this.setParams('action', 'download')
      const param = { params: this.params }

      return new Promise(resolve => {
        api.get('v1/simrs/laporan/farmasi/persediaan/get-mutasi', param)
          .then(resp => {
            this.loadingNext = false
            this.meta = resp.data?.meta
            this.mapingItem(resp?.data?.data, items)
            this.ketProses = ''
            resolve(resp)
          })
          .catch(() => {
            this.loadingNext = false
            this.ketProses = ''
            this.loading = false
          })
      })
    },
    setField () {
      if (this.params.jenis === 'rekap') {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Satuan: 'satuan_k',
          'Kode Belanja': 'uraian50',
          Keterangan: 'ket',
          'Jumlah Saldo Awal': 'jumlSalAwal',
          'Nilai Saldo Awal': 'nilaiSalAwal',
          'Jumlah Masuk': 'jumlMasuk',
          'Nilai Masuk': 'nilaiMasuk',
          'Jumlah Keluar': 'jumlKeluar',
          'Nilai Keluar': 'nilaiKeluar',
          'Jumlah Saldo Akhir': 'jumlSalAkhir',
          'Nilai Saldo Akhir': 'nilaiSalAkhir'
        }
      }
      else {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Satuan: 'satuan_k',
          Keterangan: 'ket',
          'Jumlah Saldo Awal': 'jumlSalAwal',
          'Harga Saldo Awal': 'harSalAwal',
          'Nilai Saldo Awal': 'nilaiSalAwal',
          'Tanggal Masuk': 'tglMasuk',
          'Jumlah Masuk': 'jumlMasuk',
          'Harga Masuk': 'harMasuk',
          'Nilai Masuk': 'nilaiMasuk',
          'Tanggal Keluar': 'tglKeluar',
          'Jumlah Keluar': 'jumlKeluar',
          'Harga Keluar': 'harKeluar',
          'Nilai Keluar': 'nilaiKeluar',
          'Jumlah Saldo Akhir': 'jumlSalAkhir',
          'Harga Saldo Akhir': 'harSalAkhir',
          'Nilai Saldo Akhir': 'nilaiSalAkhir'
        }
      }
    },
    cekNan (val) {
      return isNaN(parseFloat(val)) ? '' : val
    },
    async fetch () {
      // laravel throttle 180 ms
      this.setField()
      const param = { params: this.params }
      // param.params.action = 'download'
      this.ketProses = 'Mengambil data halaman '

      const data = []
      const dataForTotal = []
      let items = []

      // this.items = []
      // this.setParams('page', 1)
      if (this.meta?.current_page >= 1 && this?.meta.current_page === this?.meta.last_page) {
        items = [...this.items]
      } else {
        items = [...this.items]
        this.meta = {
          current_page: 0,
          last_page: 5
        }
        let currentPage = this.meta?.current_page + 1 ?? 1
        let totalPages = this.meta?.last_page ?? 5
        do {
          param.params.page = currentPage // Tambahkan parameter halaman
          const resp = await api.get('v1/simrs/laporan/farmasi/persediaan/get-mutasi', param)
          if (!resp?.data?.data?.length) {
            if (currentPage === 1) {
              this.ketProses = null
              return notifErrVue('Data tidak ditemukan')
            }
            break
          }
          this.ketProses = 'Mengambil data halaman '
          totalPages = resp.data?.meta?.last_page || totalPages // Total halaman dari API
          this.meta = resp.data?.meta
          this.mapingItem(resp?.data?.data, items, 'download')

          currentPage++
        } while (currentPage <= totalPages)
      }

      items.forEach((item, i) => {
        if (item?.data?.length) {
          item?.data.forEach((dat, d) => {
            const ada = {}
            const tmpForTot = {}
            if (d === 0) {
              ada.no = i + 1
              ada.kd_obat = item?.kd_obat
              ada.nama_obat = item?.nama_obat
              ada.satuan_k = item?.satuan_k
              if (this.params.jenis === 'rekap') ada.uraian50 = item?.uraian50
            }
            // ini untuk menjmlah total
            tmpForTot.jumlSalAwal = this.cekNan(parseFloat(dat?.saldoawal?.jumlah), 2)
            tmpForTot.nilaiSalAwal = this.cekNan(parseFloat(dat?.saldoawal?.sub), 2)
            tmpForTot.jumlMasuk = this.cekNan(parseFloat(dat?.masuk?.jumlah), 2)
            tmpForTot.nilaiMasuk = this.cekNan(parseFloat(dat?.masuk?.sub), 2)
            tmpForTot.jumlKeluar = this.cekNan(parseFloat(dat?.keluar?.jumlah), 2)
            tmpForTot.nilaiKeluar = this.cekNan(parseFloat(dat?.keluar?.sub), 2)
            tmpForTot.jumlSalAkhir = this.cekNan(parseFloat(dat?.akhir?.jumlah), 2)
            tmpForTot.nilaiSalAkhir = this.cekNan(parseFloat(dat?.akhir?.sub), 2)

            if (this.params.jenis === 'rekap') {
              ada.ket = dat?.ket
              ada.jumlSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.jumlah), 2))
              ada.nilaiSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.sub), 2))
              ada.jumlMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.jumlah), 2))
              ada.nilaiMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.sub), 2))
              ada.jumlKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.jumlah), 2))
              ada.nilaiKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.sub), 2))
              ada.jumlSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.jumlah), 2))
              ada.nilaiSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.sub), 2))
            }
            else {
              ada.ket = dat?.ket
              ada.jumlSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.jumlah ?? dat?.subAw?.jumlah), 2))
              ada.harSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.harga), 2))
              ada.nilaiSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.sub ?? dat?.subAw?.sub), 2))
              ada.tglMasuk = dat?.masuk?.tgl ?? ''
              ada.jumlMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.jumlah ?? dat?.subMs?.jumlah), 2))
              ada.harMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.harga), 2))
              ada.nilaiMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.sub ?? dat?.subMs?.sub), 2))
              ada.tglKeluar = dat?.keluar?.tgl ?? ''
              ada.jumlKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.jumlah ?? dat?.subKel?.jumlah), 2))
              ada.harKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.harga), 2))
              ada.nilaiKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.sub ?? dat?.subKel?.sub), 2))
              ada.jumlSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.jumlah ?? dat?.subtotal?.jumlah), 2))
              ada.harSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.harga), 2))
              ada.nilaiSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.sub ?? dat?.subtotal?.sub), 2))
            }

            const indexData = data.findIndex(f => f.kd_obat === item?.kd_obat)
            if (indexData >= 0) data[indexData] = ada
            else data.push(ada)
            const indexAdaForTot = dataForTotal.findIndex(f => f.kd_obat === item?.kd_obat)
            if (indexAdaForTot >= 0) dataForTotal[indexAdaForTot] = tmpForTot
            else dataForTotal.push(tmpForTot)
          })
        }
        else {
          console.log('ada tidak')
          const temp = {}
          temp.no = i + 1
          temp.kd_obat = item?.kd_obat
          temp.nama_obat = item?.nama_obat
          temp.satuan_k = item?.satuan_k
          if (this.params.jenis === 'rekap') temp.uraian50 = item?.uraian50

          const indexAda = temp.findIndex(f => f.kd_obat === item?.kd_obat)
          if (indexAda >= 0) data[indexAda] = temp
          else data.push(temp)

        }
      })
      // total
      const tot = {
        ket: 'Total',
        jumlSalAwal: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.jumlSalAwal) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlSalAwal), 0), 2)),
        nilaiSalAwal: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.nilaiSalAwal) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.nilaiSalAwal), 0), 2)),
        jumlMasuk: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.jumlMasuk) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlMasuk), 0), 2)),
        nilaiMasuk: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.nilaiMasuk) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.nilaiMasuk), 0), 2)),
        jumlKeluar: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.jumlKeluar) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlKeluar), 0), 2)),
        nilaiKeluar: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.nilaiKeluar) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.nilaiKeluar), 0), 2)),
        jumlSalAkhir: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.jumlSalAkhir) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlSalAkhir), 0), 2)),
        nilaiSalAkhir: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.nilaiSalAkhir) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.nilaiSalAkhir), 0), 2))
      }
      data.push(tot)
      console.log('items', data)
      this.ketProses = null
      this.items = [...items]
      return data
    },
    startDownload () { this.loadingDownload = true },
    finishDownload () { this.loadingDownload = false },
    async getDataTable (val) {
      this.ketProses = null
      // this.setParams('per_page', 50)
      if (this.params.page === 1) this.loading = true
      else this.loadingNext = true
      this.scrolling = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/persediaan/get-mutasi', param)
        .then(resp => {
          if (this.params.action === 'download') delete this.params.action
          setTimeout(() => {
            this.scrolling = false
          }, 1000)
          this.loading = false
          this.loadingNext = false
          // console.log('data tabel', resp.data)
          this.meta = resp.data?.meta
          // this.items = resp?.data?.data
          this.mapingItem(resp?.data?.data, this.items)
        })
        .catch(() => {
          this.loading = false
          this.loadingNext = false
        })
    }
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLaporanMutasiFiFoFarmasiStore, import.meta.hot))
}

