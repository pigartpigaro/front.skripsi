<template>
  <div ref="main" class="column flex-center full-height  bg-white">
    <div class="container full-height">
      <div class="column full-height ">
        <div class="col-grow">
          <KumpulanSurat :key="doc" :items="pasien?.kodepoli === 'POL014' ? documents : documentsrajal"
            @go-to="(item) => goTo(item)" />
        </div>
      </div>
    </div>
  </div>
  <app-fullscreen-blue v-model="open">
    <template #default>
      <component :is="cekPanel(pasien?.kodepoli)" :key="props.pasien" :pasien="props.pasien" />
    </template>
  </app-fullscreen-blue>
</template>
<script setup>
import KumpulanSurat from './KumpulanSurat.vue'
import { findWithAttr } from 'src/modules/utils'
import { ref, defineAsyncComponent } from 'vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  },
  ruangranap: {
    type: Object,
    default: null
  },
  depo: {
    type: String,
    default: ''
  },
})

const open = ref(false)
const doc = ref('')
const documents = ref([
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'SEP',
    label: 'Sep',
    value: 'Sep'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Res',
    label: 'Resume',
    value: 'Resume'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Bill',
    label: 'Billing',
    value: 'Billing',
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'DetBill',
    label: 'Detail Billing',
    value: 'Detail Billing'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Trg',
    label: 'Triage IGD',
    value: 'Triage_IGD'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Sutian',
    label: 'Surat Kematian',
    value: 'Surat_Kematian'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Farmasi',
    label: 'Farmasi',
    value: 'Farmasi'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Laborat',
    label: 'Laborat',
    value: 'Laborat'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Radiologi',
    label: 'Radiologi',
    value: 'Radiologi'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'KonsulDokt',
    label: 'Konsultasi Dokter',
    value: 'Konsul_Dokter'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'UploadBerk',
    label: 'Berkas Upload',
    value: 'Berkas_Upload'
  },
])

const documentsrajal = ref([
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'SEP',
    label: 'Sep',
    value: 'Sep'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Res',
    label: 'Resume',
    value: 'Resume'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Bill',
    label: 'Billing',
    value: 'Billing'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Laborat',
    label: 'Laborat',
    value: 'Laborat'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Radiologi',
    label: 'Radiologi',
    value: 'Radiologi'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'Farmasi',
    label: 'Farmasi',
    value: 'Farmasi'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'LapOperasi',
    label: 'Laporan Operasi',
    value: 'LapOperasi'
  },
  // {
  //   icon: 'icon-mat-email',
  //   color: 'primary',
  //   jenis: 'SrtKntrl',
  //   label: 'Surat-Kontrol',
  //   value: 'SuratKontrol'
  // },
  // {
  //   icon: 'icon-mat-email',
  //   color: 'primary',
  //   jenis: 'SrtKnslAnPol',
  //   label: 'Surat-Konsul-Antar-Poli',
  //   value: 'SrtKnslAnPol'
  // },
  // {
  //   icon: 'icon-mat-email',
  //   color: 'primary',
  //   jenis: 'SrtKnslinternal',
  //   label: 'Surat-Konsul-Internal',
  //   value: 'SrtKnslinternal'
  // },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'R P',
    label: 'Rencana Pasien',
    value: 'Rencana'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'UploadBerk',
    label: 'Berkas Upload',
    value: 'Berkas_Upload'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'INTR',
    label: 'Pemantauan Itradialitik',
    value: 'Intradialitik'
  },
])
// eslint-disable-next-line no-unused-vars
function getLabel(val) {
  const anu = documents.value.filter(a => a.value === val)
  // console.log('anu ', anu)
  return anu?.length ? anu[0].label : '-'
}
const comp = [
  { nama: 'Sep', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Sep/SepPage.vue')) },
  { nama: 'Resume', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Resume/ResumePage.vue')) },
  { nama: 'Billing', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Billing/BillingPage.vue')) },
  { nama: 'DetailBilling', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Billdetail/BillingDetailPage.vue')) },
  { nama: 'Triage_IGD', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/triage/TriasePage.vue')) },
  { nama: 'Surat_Kematian', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/suratkematian/SuratKematianPage.vue')) },
  { nama: 'Farmasi', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Farmasi/FarmasiPage.vue')) },
  { nama: 'Laborat', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Laborat/LaboratPage.vue')) },
  { nama: 'Radiologi', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Radiologi/RadiologiPage.vue')) },
  { nama: 'Konsul_Dokter', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/konsulDokter/KonsulDokterPage.vue')) },
  { nama: 'Berkas_Upload', page: defineAsyncComponent(() => import('./compdokumen/comIgdupload/DokumenUploadPage.vue')) },
]

const comprajal = [
  { nama: 'Sep', page: defineAsyncComponent(() => import('../../../../poli/dokumen/Sep/SepPage.vue')) },
  { nama: 'Resume', page: defineAsyncComponent(() => import('../../../../dokumen/resume/ResumePage.vue')) },
  { nama: 'Billing', page: defineAsyncComponent(() => import('../../../../dokumen/comppoli/BillingPage.vue')) },
  { nama: 'Laborat', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Laborat/LaboratPage.vue')) },
  { nama: 'Radiologi', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Radiologi/RadiologiPage.vue')) },
  { nama: 'Farmasi', page: defineAsyncComponent(() => import('../../../../igd/layanan/dokumen/dokumenisi/Farmasi/FarmasiPage.vue')) },
  { nama: 'LapOperasi', page: defineAsyncComponent(() => import('../../../../../simrs/poli/dokumen/lapoperasi/LapOperasiPage.vue')) },
  // { nama: 'SuratKontrol', page: defineAsyncComponent(() => import('../../../../../simrs/poli/dokumen/SuratKontrol/SuratKontrolPage.vue')) },
  // { nama: 'SrtKnslAnPol', page: defineAsyncComponent(() => import('../../../../../simrs/poli/dokumen/SuratKonsulAntarPoli/SuratKonsulAntarPoli.vue')) },
  // { nama: 'SrtKnslinternal', page: defineAsyncComponent(() => import('../../../../../simrs/poli/dokumen/KonsulInternal/SuratKonsulInternalPage.vue')) },
  { nama: 'Rencana', page: defineAsyncComponent(() => import('../../../../dokumen/surat/compsurat/SuratRencanaPage.vue')) },
  { nama: 'Berkas_Upload', page: defineAsyncComponent(() => import('./compdokumen/comIgdupload/DokumenUploadPage.vue')) },
  { nama: 'Intradialitik', page: defineAsyncComponent(() => import('../../../../hemodialisa/layanan/dokumen/compdokumen/IntradialitikPage.vue')) },

]
// eslint-disable-next-line no-unused-vars
const cekPanel = (kodepoli) => {
  const val = doc.value
  // console.log('val', kodepoli)
  const ganti = val.replace(/ /g, '')

  if (kodepoli === 'POL014') {
    const arr = findWithAttr(comp, 'nama', ganti)
    return arr >= 0 ? comp[arr].page : ''
  } else {
    const arr = findWithAttr(comprajal, 'nama', ganti)
    return arr >= 0 ? comprajal[arr].page : ''
  }

}
function goTo(val) {
  // console.log('got', val)
  doc.value = val.value
  open.value = true
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width: calc(100vw - 250px);
  min-height: 90vh;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  font-size: 10px;
  // backdrop-filter: sepia(.5);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-right: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
}
</style>
