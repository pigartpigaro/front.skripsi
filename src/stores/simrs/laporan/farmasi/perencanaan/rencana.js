import { defineStore } from "pinia"
import { date, Dialog } from "quasar"
import { api } from "src/boot/axios"
import { formatDoubleKoma } from "src/modules/formatter"

export const useLaporanPerencanaanStore = defineStore('laporan_perencanaan', {
  state: () => ({
    loading: false,
    loadingNext: false,
    scrolling: false,
    loadingDownload: false,
    ketProses: null,
    items: [],
    unfilteredItems: [],
    meta: {},
    params: {
      q: '',
      per_page: 100,
      page: 1,
      from: date.formatDate(Date.now(), 'YYYY-MM-01'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      reference: 'rencana',
      jenis: 'detail'
    },
    optionReferences: [
      { label: 'Tanggal Penerimaan', value: 'penerimaan' },
      { label: 'Tanggal Perencanaan', value: 'rencana' },
    ],
    tanggal: {
      from: date.formatDate(Date.now(), '01 MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    optionJenis: [
      { nama: 'Detail', value: 'detail' },
      { nama: 'Rekap', value: 'rekap' }
    ],
    url: 'v1/simrs/laporan/farmasi/persediaan/get-perencanaan'
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      // console.log(this.params.q)
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
    getInitialData (val) {
      this.setParams('page', val)
      this.meta = {}
      this.items = []
      this.getDataTable()
    },
    mapingItem (val, array) {
      // console.log('val', val)
      val.forEach(item => {
        item.rencana = []
        item.pesan = []
        item.terima = []
        item.belumTerima = []
        // item?.hargapenerimaanrinci.sort(function (a, b) {
        //   const dateA = new Date(a.tanggal)
        //   const dateB = new Date(b.tanggal)

        //   // Subtract the dates to get a value that is either negative, positive, or zero
        //   return dateB - dateA
        // })
        item?.perencanaanrinci.forEach(rinci => {
          const hargaPenerimaan = item?.penerimaanrinci?.find(f => new Date(f.tanggal) < new Date(rinci.tanggal))
          // const hargaPenerimaan2 = item?.hargapenerimaanrinci?.find(f => new Date(f.tanggal) < new Date(rinci.tanggal))
          rinci.harga = (hargaPenerimaan?.harga ?? item?.hargapenerimaan) ?? 0
          rinci.subtotal = rinci.harga * rinci.jumlah
          item.rencana.push(rinci)
        })
        item?.penerimaanrinci.forEach(rinci => {
          rinci.subtotal = rinci.harga * rinci.jumlah
          item.terima.push(rinci)
        })
        item?.pemesananrinci.forEach(rinci => {
          rinci.subtotal = rinci.harga * rinci.jumlah
          item.pesan.push(rinci)
          // const penerimaanRinci = item?.penerimaanrinci?.filter(f => f.nopemesanan === rinci.nopemesanan)
          // if (penerimaanRinci?.length) {
          //   const terima = penerimaanRinci.reduce((a, b) => a + b.jumlah, 0)
          //   item.belumTerima.push({
          //     tanggal: rinci?.tanggal,
          //     harga: 0,
          //     jumlah: rinci?.jumlah - terima,
          //     subtotal: 0

          //   })
          // } else {
          //   item.belumTerima.push({
          //     tanggal: rinci?.tanggal,
          //     harga: 0,
          //     jumlah: 0,
          //     subtotal: 0

          //   })
          // }
        })

        const max = Math.max(item.rencana?.length, item.pesan?.length, item.terima?.length)


        if (item.rencana?.length < max && max > 0) {
          for (let index = item.rencana?.length; index < max; index++) {
            item.rencana.push({ jumlah: 's', harga: 's', tanggal: null, subtotal: 's' })
          }
        }
        if (item.pesan?.length < max && max > 0) {
          for (let index = item.pesan?.length; index < max; index++) {
            item.pesan.push({ jumlah: 's', harga: 's', tanggal: null, subtotal: 's' })
          }
        }
        if (item.terima?.length < max && max > 0) {
          for (let index = item.terima?.length; index < max; index++) {
            item.terima.push({ jumlah: 's', harga: 's', tanggal: null, subtotal: 's' })
          }
        }
        if (item.belumTerima?.length < max && max > 0) {
          for (let index = item.belumTerima?.length; index < max; index++) {
            item.belumTerima.push({ jumlah: 's', harga: 's', tanggal: null, subtotal: 's' })
          }
        }

        const subRencana = {
          tanggal: null,
          jumlah: item?.perencanaanrinci.reduce((a, b) => a + b.jumlah, 0),
          subtotal: item?.perencanaanrinci.reduce((a, b) => a + b.subtotal, 0),
        }
        item.rencana.push(subRencana)
        const subPesan = {
          tanggal: null,
          jumlah: item?.pemesananrinci.reduce((a, b) => a + b.jumlah, 0),
          subtotal: item?.pemesananrinci.reduce((a, b) => a + b.subtotal, 0),
        }
        item.pesan.push(subPesan)
        const subTerima = {
          tanggal: null,
          jumlah: item?.penerimaanrinci.reduce((a, b) => a + b.jumlah, 0),
          subtotal: item?.penerimaanrinci.reduce((a, b) => a + b.subtotal, 0),
        }
        item.terima.push(subTerima)
        const subBelumTerima = {
          tanggal: null,
          jumlah: item?.pemesananrinci.reduce((a, b) => a + b.jumlah, 0) - item?.penerimaanrinci.reduce((a, b) => a + b.jumlah, 0),
          subtotal: 0,
        }
        item.belumTerima.push(subBelumTerima)


        const maxAll = Math.max(item.rencana?.length, item.pesan?.length, item.terima?.length)
        // console.log('maxAll', maxAll, item?.kd_obat)

        item.data = []
        for (let index = 0; index < maxAll; index++) {
          item.data[index] = {
            terima: item.terima[index],
            rencana: item.rencana[index],
            pesan: item.pesan[index],
            belumTerima: item.belumTerima[index],
          }
        }

        if (maxAll > 1) {
          const indexItems = array.findIndex(f => f.kd_obat === item.kd_obat)
          if (indexItems >= 0) array[indexItems] = item
          else array.push(item)
        }
      })
      // console.log('array', array)

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
              const resp = await api.get(this.url, param)
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
              this.mapingItem(resp?.data?.data, items)

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
          const resp = await api.get(this.url, param)
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
    },
    setField () {
      if (this.params.jenis === 'rekap') {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Satuan: 'satuan_k',
          Belanja: 'uraian50',
          'Jumlah Perencanann': 'jumlRenc',
          'Nilai Perencanaan': 'nilaiRenc',
          'Jumlah Pemesanan': 'jumlPesan',
          'Nilai Pemesanan': 'nilaiPesan',
          'Jumlah Penerimaan': 'jumlTerima',
          'Nilai Penerimaan': 'nilaiTerima',
          'Belum Diterima': 'belumTerima'
        }
      }
      else {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Satuan: 'satuan_k',
          Belanja: 'uraian50',
          'Tanggal Perencanaan': 'tglRenc',
          'Jumlah Perencanaan': 'jumlRenc',
          'Harga Perencanaan': 'harRenc',
          'Nilai Perencanaan': 'nilaiRenc',
          'Tanggal Pemesanan': 'tglPesan',
          'Jumlah Pemesanan': 'jumlPesan',
          'Harga Pemesanan': 'harPesan',
          'Nilai Pemesanan': 'nilaiPesan',
          'Tanggal Penerimaan': 'tglTerima',
          'Jumlah Penerimaan': 'jumlTerima',
          'Harga Penerimaan': 'harTerima',
          'Nilai Penerimaan': 'nilaiTerima',
          'Belum Diterima': 'belumTerima'
        }
      }
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
      // console.log(this.meta)

      if (this.meta?.current_page >= 1 && this?.meta.current_page >= this?.meta.last_page) {
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
          const resp = await api.get(this.url, param)
          if (!resp?.data?.data?.length) {
            if (currentPage === 1) {
              this.ketProses = null
              return notifErrVue('Data tidak ditemukan')
            }
            break
          }
          this.ketProses = 'Mengambil data halaman '
          // totalPages = 7 // sementara
          totalPages = resp.data?.meta?.last_page ?? totalPages // Total halaman dari API
          this.meta = resp.data?.meta
          this.mapingItem(resp?.data?.data, items)
          // console.log('meta', resp.data?.meta)


          currentPage++
        } while (currentPage <= totalPages)
      }
      console.log('items', items)

      items.forEach((item, i) => {
        if (item?.data?.length) {
          item?.data.forEach((dat, d) => {
            // console.log('dat', dat)

            let ada = {}
            let tmpForTot = {}

            if (dat?.rencana?.tanggal === null && dat?.pesan?.tanggal === null && dat?.terima?.tanggal === null) {
              tmpForTot.jumlRenc = this.cekNan(parseFloat(dat?.rencana?.jumlah), 2)
              tmpForTot.nilaiRenc = this.cekNan(parseFloat(dat?.rencana?.subtotal), 2)
              tmpForTot.jumlPesan = this.cekNan(parseFloat(dat?.pesan?.jumlah), 2)
              tmpForTot.nilaiPesan = this.cekNan(parseFloat(dat?.pesan?.subtotal), 2)
              tmpForTot.jumlTerima = this.cekNan(parseFloat(dat?.terima?.jumlah), 2)
              tmpForTot.nilaiTerima = this.cekNan(parseFloat(dat?.terima?.subtotal), 2)
              tmpForTot.belumTerima = this.cekNan(parseFloat(dat?.belumTerima?.jumlah), 2)
              // console.log('temfrot', tmpForTot)
            } else tmpForTot = null
            if (this.params.jenis === 'rekap') {
              // const max = Math.max(dat?.rencana?.length, dat?.pesan?.length, dat?.terima?.length)
              if (dat?.rencana?.tanggal === null && dat?.pesan?.tanggal === null && dat?.terima?.tanggal === null) {
                ada.no = i + 1
                ada.kd_obat = item?.kd_obat
                ada.nama_obat = item?.nama_obat
                ada.satuan_k = item?.satuan_k
                ada.uraian50 = item?.uraian50

                ada.jumlRenc = this.cekNan(formatDoubleKoma(parseFloat(dat?.rencana?.jumlah), 2))
                ada.nilaiRenc = this.cekNan(formatDoubleKoma(parseFloat(dat?.rencana?.subtotal), 2))
                ada.jumlPesan = this.cekNan(formatDoubleKoma(parseFloat(dat?.pesan?.jumlah), 2))
                ada.nilaiPesan = this.cekNan(formatDoubleKoma(parseFloat(dat?.pesan?.subtotal), 2))
                ada.jumlTerima = this.cekNan(formatDoubleKoma(parseFloat(dat?.terima?.jumlah), 2))
                ada.nilaiTerima = this.cekNan(formatDoubleKoma(parseFloat(dat?.terima?.subtotal), 2))
                ada.belumTerima = this.cekNan(formatDoubleKoma(parseFloat(dat?.belumTerima?.jumlah), 2))
                // console.log('dat rekap', dat, ada)
              } else ada = null
            }
            else {
              if (d === 0) {
                ada.no = i + 1
                ada.kd_obat = item?.kd_obat
                ada.nama_obat = item?.nama_obat
                ada.satuan_k = item?.satuan_k
                ada.uraian50 = item?.uraian50

              }
              if (dat?.rencana?.tanggal === null && dat?.pesan?.tanggal === null && dat?.terima?.tanggal === null && d !== 0) ada.nama_obat = 'Subtotal'
              ada.tglRenc = dat?.rencana?.tanggal ?? ''
              ada.jumlRenc = this.cekNan(formatDoubleKoma(parseFloat(dat?.rencana?.jumlah), 2))
              ada.harRenc = this.cekNan(formatDoubleKoma(parseFloat(dat?.rencana?.harga), 2))
              ada.nilaiRenc = this.cekNan(formatDoubleKoma(parseFloat(dat?.rencana?.subtotal), 2))
              ada.tglPesan = dat?.pesan?.tanggal ?? ''
              ada.jumlPesan = this.cekNan(formatDoubleKoma(parseFloat(dat?.pesan?.jumlah), 2))
              ada.harPesan = this.cekNan(formatDoubleKoma(parseFloat(dat?.pesan?.harga), 2))
              ada.nilaiPesan = this.cekNan(formatDoubleKoma(parseFloat(dat?.pesan?.subtotal), 2))
              ada.tglTerima = dat?.terima?.tanggal ?? ''
              ada.jumlTerima = this.cekNan(formatDoubleKoma(parseFloat(dat?.terima?.jumlah), 2))
              ada.harTerima = this.cekNan(formatDoubleKoma(parseFloat(dat?.terima?.harga), 2))
              ada.nilaiTerima = this.cekNan(formatDoubleKoma(parseFloat(dat?.terima?.subtotal), 2))
              ada.belumTerima = this.cekNan(formatDoubleKoma(parseFloat(dat?.belumTerima?.jumlah), 2))
            }
            // console.log('d', ada)
            // const indexData = data.findIndex(f => f.kd_obat === ada?.kd_obat)
            // if (indexData >= 0) data[indexData] = ada
            // else data.push(ada)
            if (ada) data.push(ada)
            // const indexAdaForTot = dataForTotal.findIndex(f => f.kd_obat === tmpForTot?.kd_obat)
            // if (indexAdaForTot >= 0) dataForTotal[indexAdaForTot] = tmpForTot
            // else dataForTotal.push(tmpForTot)
            if (tmpForTot) dataForTotal.push(tmpForTot)
          })
        }
        else {
          const temp = {}
          temp.no = i + 1
          temp.kd_obat = item?.kd_obat
          temp.nama_obat = item?.nama_obat
          temp.satuan_k = item?.satuan_k
          temp.uraian50 = item?.uraian50

          const indexAda = temp.findIndex(f => f.kd_obat === temp?.kd_obat)
          if (indexAda >= 0) data[indexAda] = temp
          else data.push(temp)

        }
      })
      // total
      if (dataForTotal) {
        const tot = {
          nama_obat: 'Total',
          jumlRenc: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f?.jumlRenc) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlRenc), 0), 2)),
          nilaiRenc: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f?.nilaiRenc) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b?.nilaiRenc), 0), 2)),
          jumlPesan: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f?.jumlPesan) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlPesan), 0), 2)),
          nilaiPesan: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f?.nilaiPesan) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b?.nilaiPesan), 0), 2)),
          jumlTerima: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f?.jumlTerima) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlTerima), 0), 2)),
          nilaiTerima: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f?.nilaiTerima) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b?.nilaiTerima), 0), 2))
        }
        data.push(tot)
      }
      console.log('items', data)
      this.ketProses = null
      this.items = [...items]
      return data
    },
    startDownload () { this.loadingDownload = true },
    finishDownload () { this.loadingDownload = false },
    cekNan (val) {
      return isNaN(parseFloat(val)) ? '' : val
    },
    async getDataTable () {
      this.loading = true
      const param = { params: this.params }
      await api.get(this.url, param)
        .then(resp => {
          // console.log('rencana', resp?.data)

          this.loading = false
          this.meta = resp.data?.meta
          this.mapingItem(resp?.data?.data, this.items)
        })
        .catch(() => {
          this.loading = false
        })
    },
  }
})
