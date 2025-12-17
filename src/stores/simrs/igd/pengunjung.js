import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const usePengunjungIgdStore = defineStore('pengunjung-igd', {
  state: () => ({
    tab: 'Diagnosa Medik',
    tabs: ['Diagnosa Medik', 'Rencana Terapi Dokter', 'Tindakan Medik', 'Diagnosa Keperawatan', 'Diagnosa Kebidanan', 'Pra Anastesi'],
    items: [],
    ruangranaps: [],
    loadingfinish: false,
    loading: false,
    loadingSaveGantiDpjp: false,
    loadingSaveSistembayar: false,
    loadingGantiMemo: false,
    listkhasusdiagnosa: [],
    pasiens: [],
    meta: null,
    loadingIcare: false,
    loadingTerima: false,
    loadingTidakhadir: false,
    loadingCall: false,
    loadingcesmix: false,
    noreg: null,
    flagpelayanan: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      status: ''
    },
    notaTindakans: [],
    notaTindakan: 'BARU',
    periods: ['Hari Ini', 'Minggu Ini', 'Bulan Ini', 'Tahun Ini'],
    periode: 'Hari Ini',
    pageLayanan: false,
    nakes: null,
    sistembayar: [],
    sistembayarrinci: [],
    sistembayarhasil: [],
    form: {
      noreg: '',
      kodesistembayar: '',
      namasistembayar: ''
    }
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    goToPage (val) {
      this.params.page = val
      this.getData()
    },
    search (val) {
      this.params.q = val
      this.params.page = 1
      this.getData()
    },
    refresh (val) {
      this.params.page = 1
      this.getData()
    },
    async getData () {
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/simrs/pendaftaran/igd/kunjunganpasienigd', params)
        .then(resp => {
          // console.log('kunjungan igd', resp?.data?.data)
          this.loading = false
          this.pasiens = resp?.data?.data
          this.items = resp?.data?.data
          this.meta = resp?.data
        })
        .catch(() => { this.loading = false })
    },
    async gantiDpjp (form, pasien) {
      // console.log(form)
      this.loadingSaveGantiDpjp = true
      try {
        const resp = await api.post('/v1/simrs/pelayanan/gantidpjp', form)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x === pasien)
          if (findPasien?.length) {
            const data = findPasien[0]
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
        console.log(error)
        this.loadingSaveGantiDpjp = false
      }
    },
    setPeriodik (val) {
      // console.log('wew', val)
      this.params.page = 1
      const { to, from, status } = val
      this.params.to = to
      this.params.from = from
      this.params.status = status
      // console.log('periodik', to)
      this.getData()
    },
    setDate (val) {
      this.params.tgl = val
    },
    setQ (payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setPerPage (payload) {
      // console.log('sasa', payload)
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    setFilters () {
      this.filters = !this.filters
    },
    gantiMemo (form, pasien) {
      // console.log(form)
      this.loadingGantiMemo = true
      return new Promise((resolve, reject) => {
        api.post('/v1/simrs/pelayanan/gantimemo', form)
          .then(resp => {
            this.loadingGantiMemo = false
            // console.log(resp)
            if (resp.status === 200) {
              const findPasien = this.items.find(x => x.noreg === pasien?.noreg)
              if (findPasien) {
                const data = findPasien
                data.memodiagnosa = resp?.data?.result?.diagnosa
              }
            }
            resolve(resp)
          }).catch(() => {
            this.loadingGantiMemo = false

          })
      })
    },
    async setTerima (pasien) {
      this.loadingTerima = true
      const form = { noreg: pasien?.noreg }
      this.noreg = pasien?.noreg
      try {
        const resp = await api.post('v1/simrs/pelayanan/igd/terimapasien', form)
        console.log('terima', resp)
        if (resp.status === 200) {
          const wew = this.items.filter(x => x === pasien)
          // console.log('wew', wew)
          if (wew?.length) {
            wew[0].flagpelayanan = '2'
          }
          this.loadingTerima = false
          this.noreg = null
        }
      }
      catch (error) {
        console.log(error)
        this.loadingTerima = false
        this.noreg = null
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },
    notifikasiError (msg) {
      notifErrVue(msg)
    },
    async bukaLayanan (pasien) {
      this.loadingTerima = true

      const form = { noreg: pasien?.noreg }
      this.noreg = pasien?.noreg
      this.togglePageTindakan()
      try {
        const resp = await api.post('v1/simrs/pelayanan/igd/terimapasien', form)
        console.log('terima', resp)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x?.rs1 === pasien?.noreg)
          if (findPasien?.length) {
            // findPasien[0].status = findPasien[0].status === '' ? '2' : findPasien[0].status

            // BARU
            findPasien[0].triage = resp?.data?.triage
            findPasien[0].anamnesis = resp?.data?.anamnesis
            findPasien[0].penilaiananamnesis = resp?.data?.penilaiananamnesis
            findPasien[0].datasimpeg = resp?.data?.datasimpeg
            findPasien[0].diagnosa = resp?.data?.diagnosa
            findPasien[0].permintaanperawatanjenazah = resp?.data?.permintaanperawatanjenazah
            findPasien[0].historyperkawinan = resp?.data?.historyperkawinan
            findPasien[0].historykehamilan = resp?.data?.historykehamilan
            findPasien[0].anamnesekebidanan = resp?.data?.anamnesekebidanan
            findPasien[0].fisio = resp?.data?.fisio
            findPasien[0].diagnosakeperawatan = resp?.data?.diagnosakeperawatan
            findPasien[0].laborats = resp?.data?.laborats
            findPasien[0].newapotekrajal = resp?.data?.newapotekrajal
            findPasien[0].newapotekrajalretur = resp?.data?.newapotekrajalretur
            findPasien[0].ok = resp?.data?.ok
            findPasien[0].diagnosakebidanan = resp?.data?.diagnosakebidanan
            findPasien[0].penunjanglain = resp?.data?.penunjanglain
            findPasien[0].ambulan = resp?.data?.ambulan
            findPasien[0].radiologi = resp?.data?.radiologi
            findPasien[0].bankdarah = resp?.data?.bankdarah
            findPasien[0].planheder = resp?.data?.planheder
            findPasien[0].tindakan = resp?.data?.tindakan
            findPasien[0].laboratold = resp?.data?.laboratold
            findPasien[0].pemeriksaanfisikpsikologidll = resp?.data?.pemeriksaanfisikpsikologidll
            findPasien[0].konsultasi = resp?.data?.konsuldokterspesialis
            findPasien[0].tinjauanulang = resp?.data?.tinjauanulang
            findPasien[0].skalatransfer = resp?.data?.skalatransfer
            findPasien[0].pemberianobat = resp?.data?.pemberianobat
            findPasien[0].rencanaterapidokter = resp?.data?.rencanaterapidokter
            findPasien[0].dokumenluar = resp?.data?.dokumenluar
            findPasien[0].hasilradiologi = resp?.data?.hasilradiologi
            findPasien[0].rs35x = resp?.data?.rs35x
            findPasien[0].transradiologi = resp?.data?.transradiologi
            findPasien[0].bankdarahtrans = resp?.data?.bankdarahtrans
            findPasien[0].oktrans = resp?.data?.oktrans
            findPasien[0].kamarjenazah = resp?.data?.kamarjenazah
            findPasien[0].ambulantrans = resp?.data?.ambulantrans
            findPasien[0].memodiagnosa = resp?.data?.memodiagnosa
            // BARU
            // findPasien[0].laporantindakan = resp?.data?.laporantindakan
            // findPasien[0].psikiatri = resp?.data?.psikiatri
            // findPasien[0].neonatusmedis = resp?.data?.neonatusmedis
            // findPasien[0].neonatuskeperawatan = resp?.data?.neonatuskeperawatan
            // findPasien[0].pediatri = resp?.data?.pediatri
            // findPasien[0].kandungan = resp?.data?.kandungan
            // findPasien[0].dokumenluar = resp?.data?.dokumenluar
            const memodia = resp?.data?.manymemo
            if (memodia?.length) {
              const memIgd = memodia.find(f => f.kdruang == 'POL014')
              if (memIgd) findPasien[0].memodiagnosa = memIgd?.diagnosa
              // else findPasien[0].memodiagnosa = memodia[0].diagnosa
            }
          }
          this.loadingTerima = false
          // console.log('load2', this.loadingTerima)
          this.noreg = null
        }
      }
      catch (error) {
        console.log(error)
        this.loadingTerima = false
        this.noreg = null
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },
    togglePageTindakan () {
      this.pageLayanan = !this.pageLayanan
    },
    injectDataPasien (pasien, val, kode, arr) {
      // console.log('a', pasien)
      // console.log('b', val.id)
      // console.log('kode', kode)
      const findPasien = this.items.filter(x => x === pasien)
      // console.log('findPasien', findPasien)
      if (findPasien?.length) {
        const data = findPasien[0]
        // console.log('data', data[kode])
        const target = data[kode]?.find(x => x.id === val.id)
        // console.log('itarget', target)
        // console.log('inject kode pasien', kode)
        // console.log('inject isi pasien', val)

        if (target) {
          Object.assign(target, val)
        }
        else {
          if (kode === 'diagnosa') {
            data[kode]?.push(val)
          }
          else if (kode === 'dokumenluar') {
            const trg = data[kode]

            if (trg) {
              data[kode] = []
              data[kode] = val
            }
          }
          else {
            data[kode]?.splice(0, 0, val)
          }
        }
      }
    },
    deleteInjectanNull2 (noreg, kode) {
      const findPasien = this.pasiens.filter(x => x.noreg === noreg)
      if (findPasien?.length) {
        const data = findPasien[0]
        const target = data[kode]?.find(x => !('id' in x))
        if (target) {
          data[kode]?.splice(target, 1)
        }
      }
    },
    injectUpdatean (noreg, id, val, kode) {
      const findPasien = this.pasiens.filter(x => x?.noreg === noreg)
      if (findPasien?.length) {
        const data = findPasien[0]
        const target = data[kode]?.find(x => x?.id === id)
        if (target) {
          Object.assign(target, val)
        }
      }
    },
    hapusDataAnamnesis (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].anamnesis
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataAnamnesiskebidanan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].anamnesekebidanan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataRencanaTerapiDokter (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].rencanaterapidokter
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataSkalaTransfer (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].skalatransfer
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataplanheder (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].planheder
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataHistoryPerkawinan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].historyperkawinan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataHistoryKehamilan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].historykehamilan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataTriage (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].triage
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataPenilaian (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].penilaiananamnesis
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    async getNota (pasien) {
      const params = {
        params: {
          noreg: pasien?.noreg
        }
      }

      const resp = await api.get('v1/simrs/pelayanan/notatindakan', params)
      if (resp.status === 200) {
        const arr = resp.data.map(x => x.nota)
        this.notaTindakans = arr?.length ? arr : []
        this.notaTindakans.push('BARU')
        this.notaTindakan = this.notaTindakans[0]
      }
    },
    hapusDataTindakan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].tindakan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataLaboratBaru (pasien, id, databaru) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        findPasien[0].laborats = databaru
      }
    },
    hapusDataRadiologi (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0]?.radiologi
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataAmbulan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0]?.ambulan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataOk (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0]?.ok
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataFisio (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0]?.fisio
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataPenunjangLain (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0]?.penunjanglain
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapustinjauanulang (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0]?.tinjauanulang
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusPemakaianObat (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0]?.pemberianobat
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataPemeriksaanFisik (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].pemeriksaanfisikpsikologidll
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    getDataIcare (pasien) {
      this.loadingIcare = true
      // console.log('get data icare', pasien)
      const param = {
        params: {
          noka: pasien.noka,
          dpjp: pasien.datasimpeg?.kddpjp
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/pelayanan/icare', param)
          .then(resp => {
            this.loadingIcare = false
            // console.log('resp icare', resp)
            if (resp?.data?.metadata?.code === '200' || resp?.data?.metadata?.code === 200) {
              resolve(resp.data)
            }
            else {
              notifErrVue(resp?.data?.metadata?.message)
              resolve(false)
            }
          })
          .catch(() => { this.loadingIcare = false })
      })
    },
    hapusDataInjectan (pasien, id, key) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0][key]
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataDiagnosaKebidanan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].diagnosakebidanan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataBankdarah (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0]?.bankdarah
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataDiagnosa (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const data = findPasien[0].diagnosa
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    async getruangranap () {
      const resp = await api.get('v1/simrs/master/kamar')
      if (resp.status === 200) {
        this.ruangranaps = resp?.data
        // console.log('kanmar', this.ruangranaps)
      }
    },
    async getsistembayar () {
      const resp = await api.get('v1/simrs/master/sistembayar')
      if (resp.status === 200) {
        this.sistembayar = resp?.data
        // console.log('kanmar', this.ruangranaps)
      }
    },
    async getsistembayarrinci () {
      const resp = await api.get('v1/simrs/master/allsistembayar')
      if (resp.status === 200) {
        this.sistembayarrinci = resp?.data
        // console.log('kanmar', this.ruangranaps)
      }
    },
    async setLayananSelesai (pasien) {
      this.loading = true
      if (!pasien?.memodiagnosa) {
        this.loading = false
        return this.notifikasiError('Maaf, Memo Diagnosa Harap Diisi Dahulu...')
      }
      // if (!pasien?.diagnosa?.length) {
      //   this.loading = false
      //   return this.notifikasiError('Maaf, Diagnosa Harap Diisi Dahulu...')
      // }

      const triage = pasien?.triage ? pasien?.triage[0] : null
      const meninggaldiluarrs = triage?.meninggaldiluarrs || null
      const barulahirmeninggal = triage?.barulahirmeninggal || null

      const form = {
        noreg: pasien?.noreg,
        norm: pasien?.norm,
        meninggaldiluarrs,
        barulahirmeninggal
      }
      // console.log('form', form)
      // console.log('pasien', pasien)
      try {
        const resp = await api.post('v1/simrs/pelayanan/igd/flagfinish', form)
        // console.log('rsp ', form, resp)
        if (resp.status === 200) {
          pasien.flagpelayanan = 1
          const findPasien = this.items.filter(x => x === pasien)
          if (findPasien?.length) {
            findPasien[0].status = '1'
          }
          this.loading = false
        }
      }
      catch (error) {
        console.log(error)
        this.loading = false
        // this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },
    async getTipeDiagnosa () {
      const resp = await api.get('v1/simrs/master/listtipekhasus')
      if (resp.status === 200) {
        this.listkhasusdiagnosa = resp.data
      }
    },
    async getNakes () {
      const resp = await api.get('/v1/simrs/master/pegawai/listnakes')
      // console.log('nakes', resp)

      if (resp.status === 200) {
        this.nakes = resp.data
      }
    },
    async gantiSistemBayar (pasien) {
      this.loadingSaveSistembayar = true
      this.form.noreg = pasien?.noreg
      try {
        const resp = await api.post('v1/simrs/pelayanan/igd/updatesistembayar', this.form)
        // console.log('rsp ', form, resp)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x === pasien)
          if (findPasien?.length) {
            findPasien[0].sistembayar = resp.data.result

            notifSuccess(resp)
          }
          this.loadingSaveSistembayar = false
        }
        this.loadingSaveSistembayar = false
      }
      catch (error) {
        console.log(error)
        this.loadingSaveSistembayar = false
        // this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
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
            val.flagpelayanan = '1'
            val.kunjungancesmix = '1'
          }
        }).catch((err) => {
          console.log('call', err)
          val.loadingcasmix = false
        })
    }
  }
})

// make sure to pass the right store definition, useAuth in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePengunjungIgdStore, import.meta.hot))
}
