import { acceptHMRUpdate, defineStore } from 'pinia'
import { api } from 'boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { date } from 'quasar'
import { notifErrVue } from 'src/modules/utils'

export const useListPasienHemodialisaStore = defineStore('list-pasien-hemodialisa', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    loadingcesmix: false,
    header: {
      periode: 'Hari ini'
    },
    params: {
      page: 1,
      per_page: 50,
      q: '',
      status: 'Semua',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      sort: 'terbaru'
    },
    periods: ['Hari ini', 'Minggu ini', 'Bulan ini', 'Custom'],
    sorting: ['terbaru', 'terlama'],
    statuses: ['Semua', 'Terlayani', 'Belum terlayani'],
    isViewList: false,
    pasien: null,
    pageTindakan: false,
    loadingTerima: false,
    jeniskasus: [],
    jnsKasusPasien: null,
    dokters: [],
    nakes: [],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    getDataTable () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('/v1/simrs/hemodialisa/hemodialisa/pasienhemodialisa', {
          params: this.params
        }).then(res => {
          // console.log('res list tggu ranap', res)
          if (res.status === 200) {
            const total = res.data?.total
            const obj = res.data?.data
            const clone = (({ data, ...o }) => o)(obj)
            this.meta = clone
            this.meta.total = total
            this.items = obj?.data ?? []

            // console.log('this.meta', this.meta)
            // console.log('this.items', this.items)
            // this.togglePageTindakan()
            this.pageTindakan = true
          }
          this.loading = false
          resolve(res)
        }).catch(err => {
          // console.log('err list tggu ranap', err)
          this.loading = false
          reject(err)
        })
      })
    },

    setPeriode (val) {
      this.header.periode = val
      if (val === 'Hari ini') {
        this.hariIni()
      }
      else if (val === 'Minggu ini') {
        this.mingguIni()
      }
      else if (val === 'Bulan ini') {
        this.bulanIni()
      }
    },

    setUrutan (val) {
      this.params.sort = val
      this.getDataTable()
    },

    setPage (val) {
      this.params.page = val
      this.getDataTable()
    },

    setStatus (val) {
      this.params.page = 1
      this.params.status = val
      this.getDataTable()
    },

    hariIni () {
      const cDate = new Date()
      this.params.to = dateDbFormat(cDate)
      this.params.from = dateDbFormat(cDate)
    },
    bulanIni () {
      const curr = new Date(), y = curr.getFullYear(), m = curr.getMonth()
      // const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
      // const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'
      const firstday = curr.setFullYear(y, m, 1)
      const lastday = curr.setFullYear(y, m + 1, 0)
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },
    mingguIni () {
      const curr = new Date()
      const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
      const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },
    tahunIni () {
      const curr = new Date()
      const firstday = date.formatDate(curr, 'YYYY') + '-01' + '-01'
      const lastday = date.formatDate(curr, 'YYYY') + '-12' + '-31'
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },
    togglePageTindakan () {
      this.pageTindakan = !this.pageTindakan
    },
    async getJenisKasus () {
      const resp = await api.get('v1/simrs/ranap/ruangan/listjeniskasus')
      // console.log('jns kasus', resp.data)
      if (resp.status === 200) {
        this.jeniskasus = resp.data
      }
    },
    injectDataPasien (noreg, val, kode, arr) {
      const findPasien = this.items?.find(x => x.noreg === noreg)
      // console.log('inject pasien', findPasien)
      if (findPasien) {
        const data = findPasien
        // data[kode] = val
        if (kode === 'kd_jeniskasus' ||
          kode === 'status' || kode === 'carakeluar' || kode === 'prognosis' ||
          kode === 'tindaklanjut' || kode === 'diagakhir' || kode === 'sebabkematian') {
          data[kode] = val
        }
        else {
          const target = data[kode]?.find(x => x.id === val?.id) ?? null
          // console.log('inject target pasien', target, kode, val, data)
          // console.log('inject kode pasien', kode)
          // console.log('inject isi pasien', val)

          if (target) {
            Object.assign(target, val)
          }
          else {
            data[kode]?.splice(0, 0, val)
            // data[kode].push(val)
          }
        }
      }
    },
    injectDataArray (noreg, arr, kode) {
      const findPasien = this.items.find(x => x?.noreg === noreg)
      // console.log('inject pasien', findPasien)
      if (findPasien) {
        const data = findPasien
        data[kode] = arr
      }
    },

    injectUpdatean (noreg, id, val, kode) {
      const findPasien = this.items.find(x => x?.noreg === noreg)
      if (findPasien) {
        const data = findPasien
        const target = data[kode]?.find(x => x?.id === id)
        if (target) {
          Object.assign(target, val)
        }
      }
    },
    deleteInjectanNull (noreg, kode) {
      const findPasien = this.items.find(x => x.noreg === noreg)
      if (findPasien) {
        const data = findPasien
        const target = data[kode]?.find(x => x?.id === null || x?.id === '' || x?.id === undefined || !('id' in x)) ?? null
        if (target) {
          data[kode]?.splice(data[kode]?.findIndex(x => x?.id === null), 1)
        }
      }
    },
    deleteInjectanNull2 (noreg, kode) {
      const findPasien = this.items.filter(x => x.noreg === noreg)
      if (findPasien) {
        const data = findPasien
        const target = data[kode]?.find(x => !('id' in x))
        if (target) {
          data[kode]?.splice(target, 1)
        }
      }
    },

    hapusDataInjectan (pasien, id, key) {
      // console.log('hapusDataInjectan', key, id, pasien)

      const findPasien = this.items.find(x => x?.noreg === pasien?.noreg)
      // console.log('find pasien', findPasien)

      if (findPasien) {
        const data = findPasien[key]
        // console.log('data', data)

        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    async gantiDpjp (form, pasien) {
      // console.log(form)
      this.loadingSaveGantiDpjp = true
      try {
        const resp = await api.post('/v1/simrs/pelayanan/gantidpjp', form)
        if (resp.status === 200) {
          const findPasien = this.items.find(x => x === pasien)
          if (findPasien) {
            const data = findPasien
            data.datasimpeg = resp?.data?.result?.datasimpeg
            data.dokter = resp?.data?.result?.datasimpeg?.nama
            data.kodedokter = resp?.data?.result?.datasimpeg?.kdpegsimrs
            this.loadingSaveGantiDpjp = false
          }

          this.loadingSaveGantiDpjp = false
        }
        this.loadingSaveGantiDpjp = false
      }
      catch (error) {
        // console.log(error)
        this.loadingSaveGantiDpjp = false
      }
    },

    async setLayananSelesai (pasien) {
      return notifErrVue('Fitur ini belum diaktifkan. Belum ada Arahan Mengenan Layanan Selesai di Hemodialisa')
      this.loadingTerima = true
      // '' : 'Belum Terlayanani'
      // '1': 'Terlayani'
      // '2': 'Sudah diterima'
      // '3': Batal
      if (!pasien?.anamnesis?.length) {
        this.loadingTerima = false
        return this.notifikasiError('Maaf, Anamnesis Harap Diisi Dahulu...')
      }
      const form = {
        noreg: pasien?.noreg
      }
      try {
        const resp = await api.post('v1/simrs/rajal/poli/flagfinish', form)
        // console.log('rsp ', form, resp)
        if (resp.status === 200) {
          const findPasien = this.items.find(x => x === pasien)
          if (findPasien) {
            findPasien.status = '1'
          }
          this.loadingTerima = false
        }
      }
      catch (error) {
        // console.log(error)
        notifErrVue('Maaf.. Harap ulangi, Ada Kesalahan ')
        this.loadingTerima = false
        // this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },
    async getNakes () {
      const resp = await api.get('/v1/simrs/master/pegawai/listnakes')
      // console.log('nakes', resp)

      if (resp.status === 200) {
        this.nakes = resp.data
      }
    },
    async getNonNakes () {
      const resp = await api.get('/v1/simrs/master/pegawai/listnonnakes')
      // console.log('non nakes', resp)

      if (resp.status === 200) {
        this.nonNakes = resp.data
      }
    },
    gantiMemo (form, pasien) {
      // console.log(form)
      return new Promise((resolve, reject) => {
        api.post('/v1/simrs/pelayanan/gantimemo', form)
          .then(resp => {
            // console.log(resp)
            if (resp.status === 200) {
              const findPasien = this.items.find(x => x.noreg === pasien?.noreg)
              if (findPasien) {
                const data = findPasien
                data.memodiagnosa = resp?.data?.result?.diagnosa
              }
            }
            resolve(resp)
          }).catch(err => {
            // console.log(err)
          })
      })
    },
    terimapasien (pas) {
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/hemodialisa/hemodialisa/terima-pasien', pas)
          .then((resp) => {
            // console.log('resp', resp)
            const findPasien = this.items.find(x => x?.noreg === pas?.noreg)
            if (findPasien) {
              const datanya = resp?.data?.data
              const objectName = Object.keys(datanya)
              objectName?.forEach((key) => {
                findPasien[key] = datanya[key]
              })
              this.pasien = findPasien
            }
            const jnsKasus = resp?.data?.kd_jeniskasus
            if (this.jeniskasus?.length && jnsKasus) {
              this.jnsKasusPasien = this.jeniskasus.find(x => x.kode === jnsKasus) ?? null
            }
            // console.log('resp pas', this.jnsKasusPasien, jnsKasus)
            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async kirimpenjaminan (val) {
      // this.noreg = val?.noreg
      val.loadingcesmix = true

      const params = {
        noreg: val?.noreg,
        norm: val?.norm,
        noka: val?.noka,
        nosep: val?.sep,
        kodepoli: val?.kodepoli,
        flaging: 1,
        kdsistembayar: val?.kodesistembayar,
        kddpjp: val?.kodedokter
      }
      await api.post('v1/simrs/pelayanan/kirimpenjaminan', params)
        .then((resp) => {
          if (resp.status === 200) {
            val.loadingcesmix = false
            // val.flagpelayanan = '1'
            val.kesmik = '1'
          }
        }).catch((err) => {
          // console.log('call', err)
          val.loadingcasmix = false
        })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useListPasienHemodialisaStore, import.meta.hot))
}
