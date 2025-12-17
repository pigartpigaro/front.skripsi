import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungIgdStore } from './pengunjung'
import { notifErr, notifErrVue, notifSuccess } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const usePemeriksaanfisikStore = defineStore('pemeriksaan-fisik-store', {
  state: () => ({
    tab: 'PemeriksaanFisik',
    loadingForm: false,
    tabs: [
      { name: 'Pemriksaan Fisik', page: 'PemeriksaanFisik' },
      { name: 'Anatomi', page: 'Anatomi' }
    ],
    form: {
      id: '',
      anatomikepala: 'a/i/c/d = -/-/-/-pKGB (-)',
      anatomileher: 'thiroid = normal faring = normal Vena jugularis = normalTrachea : normal ',
      anatomidada: 'S1 S2 Single, N, M (-), g(-)SN v/v Rh (-) Wh (-)simetris (-) ',
      anatomipunggung: '',
      anatomiperut: 'SoeflBU (+) N Nyeri Tekan (-) ',
      anatomitangan: 'Akral hangat (+) CRT < 2 dtk',
      anatomikaki: 'Akral hangat (+) CRT < 2 dtk',
      anatomineurologis: 'Meningeal sign (-) kaku kuduk (-) reflek patologis (-/-) refek fisiologis : (+2/+2) MMT 55/55',
      anatomigenital: 'normal, hernia (-)'
    }
  }),
  actions: {
    async saveData(pasien) {
      this.loadingForm = true
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      try {
        const resp = await api.post('v1/simrs/igd/pemeriksaanfisik/simpanpemeriksaanfisik', this.form)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.result[0]
          storePasien.injectDataPasien(pasien, isi, 'pemeriksaanfisikpsikologidll')
          notifSuccess(resp)
          this.initReset()
          this.loadingForm = false
        }

        this.loadingForm = false
      }
      catch (error) {
        // console.log('anamnesis err', error)
        this.loadingForm = false
        notifErr(error)
      }
    },
    initReset() {
      this.form.id = ''
      this.form.statuspsikologi = ''
      this.form.sebutkanstatuspsikologis = ''
      this.form.sosial = ''
      this.form.ekonomi = ''
      this.form.spiritual = ''
      this.form.kepercayaan = ''
      this.form.sebutkankepercayaan = ''
      this.form.keadaanpupil = ''
      this.form.reflekmatakirikecahaya = ''
      this.form.reflekmatakanankecahaya = ''
      this.form.diamterkiri = ''
      this.form.diamterkanan = ''
      //this.form.keadaanpupil = ''
      this.form.anatomikepala = 'a/i/c/d = -/-/-/-pKGB (-)'
      this.form.anatomileher = 'thiroid = normal faring = normal Vena jugularis = normalTrachea = normal '
      this.form.anatomidada = 'S1 S2 Single, N, M (-), g(-)SN v/v Rh (-) Wh (-)simetris (-) '
      this.form.anatomipunggung = ''
      this.form.anatomiperut = 'SoeflBU (+) N Nyeri Tekan (-) '
      this.form.anatomitangan = 'Akral hangat (+) CRT < 2 dtk'
      this.form.anatomikaki = 'Akral hangat (+) CRT < 2 dtk'
      this.form.anatomineurologis = 'Meningeal sign (-) kaku kuduk (-) reflek patologis (-/-) refek fisiologis = (+2/+2) MMT 55/55'
      this.form.anatomigenital = 'normal, hernia (-)'
    },
    async deleteData(pasien, id, noreg, kdpegsimrs) {
      this.loadingForm = true
      const payload = { id, noreg, kdpegsimrs }
      try {
        const resp = await api.post('v1/simrs/igd/pemeriksaanfisik/hapuspemeriksaanfisik', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataPemeriksaanFisik(pasien, id)
          notifSuccess(resp)
          this.loadingForm = false
        }
      }
      catch (error) {
        notifErr(error)
        this.loadingForm = false
      }
    },
    editForm(val) {
      // console.log('val', val)
      const appstore = useAplikasiStore()
      if (appstore.user?.pegawai?.kdpegsimrs !== val?.user) {
        notifErrVue('Anda Tidak Berhak Merubah Data ini, karena Bukan Anda Yang Menginput...!!!')
      } else {
        this.form = {
          id: val?.id,
          statuspsikologi: val?.pemerisaanpsikologidll?.status_psikologis,
          sebutkanstatuspsikologis: val?.pemerisaanpsikologidll?.status_psikologis_lain,
          sosial: val?.pemerisaanpsikologidll?.sosial,
          ekonomi: val?.pemerisaanpsikologidll?.ekonomi,
          spiritual: val?.pemerisaanpsikologidll?.spiritual,
          kepercayaan: val?.pemerisaanpsikologidll?.nilai_kepercayaan,
          sebutkankepercayaan: val?.pemerisaanpsikologidll?.ket_nilaikepercayaan,
          keadaanpupil: val?.pemerisaanpsikologidll?.keadaan_pupil,
          reflekmatakirikecahaya: val?.pemerisaanpsikologidll?.reflek_cahaya_kiri,
          reflekmatakanankecahaya: val?.pemerisaanpsikologidll?.reflek_cahaya_kanan,
          diamterkiri: val?.pemerisaanpsikologidll?.diameter_kiri,
          diamterkanan: val?.pemerisaanpsikologidll?.diameter_kanan,
          anatomikepala: val?.rs5,
          anatomileher: val?.rs6,
          anatomidada: val?.rs7,
          anatomipunggung: val?.rs8,
          anatomiperut: val?.rs9,
          anatomitangan: val?.rs10,
          anatomikaki: val?.rs11,
          anatomineurologis: val?.rs12,
          anatomigenital: val?.rs13,
        }
      }
    }
  }
})
