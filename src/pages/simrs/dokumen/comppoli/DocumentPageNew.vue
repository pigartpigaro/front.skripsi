<template>
  <div ref="main" class="column flex-center full-height  bg-white">
    <div class="container full-height">
      <div class="column full-height ">
        <div class="col-grow">
          <KumpulanSurat :key="doc" :items="documents" @go-to="(item) => goTo(item)" />
        </div>
      </div>
    </div>
  </div>
  <app-fullscreen-blue v-model="open">
    <template #default>
      <component :is="cekPanel()" :key="props.pasien" :pasien="props.pasien" />
    </template>
  </app-fullscreen-blue>
  <!-- <q-card
    flat
    bordered
    square
    class="full-height"
  >
    <div class="full-height column">
      <div class="col-auto bg-primary text-white">
        <q-bar>
          <div>Dokumen Pasien</div>
        </q-bar>
        <div class="q-pa-sm row items-center q-gutter-sm ">
          <q-option-group
            v-model="doc"
            :options="documents"
            color="white"
            inline
            dark
          />
        </div>
      </div>
      <div class="col">
        <div
          v-if="doc !== ''"
          class="q-pa-md"
        >
          Dokumen {{ getLabel(doc) }}
          <q-separator class="q-my-sm" />
          <div>
            <component
              :is="cekPanel()"
              :key="props.pasien"
              :pasien="props.pasien"
            />
          </div>
        </div>
        <div
          v-else
          class="column full-height flex-center q-pa-md"
          style="min-height: 400px;"
        >
          Belum Ada Pemilihan Surat
        </div>
      </div>
    </div>
  </q-card> -->
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
  }
})

const open = ref(false)
const doc = ref('')
const documents = ref([
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
    jenis: 'SKS',
    label: 'Surat Ket. Sakit',
    value: 'Sakit'
  },
  {
    icon: 'icon-fa-file-regular',
    color: 'primary',
    jenis: 'SKD',
    label: 'Surat Ket. Dokter',
    value: 'Sehat'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'PRB',
    label: 'Pengantar Rujuk Balik',
    value: 'prb'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'PR RS L',
    label: 'Pengantar Rujuk RS Lain',
    value: 'rslain'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'R P',
    label: 'Rencana Pasien',
    value: 'Rencana'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'RM RJ-1a',
    label: 'Asesmen Awal Keperawatan Rawat Jalan',
    value: 'AsesmenAwalKeperawatan'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'RM RJ-1c',
    label: 'Asesmen Awal Medis Rawat Jalan',
    value: 'AsesmenAwalMedis'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'RM IRJA-2',
    label: 'Catatan Rawat Jalan',
    value: 'Catatan'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'PRA-ANES',
    label: 'Asesmen Pra Anestesia',
    value: 'AsesmenPraAnestesia'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'SEP',
    label: 'Surat Elegibilitas Peserta',
    value: 'SEP'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'E-Resep',
    label: 'E-Resep',
    value: 'ERESEP'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'Laborat',
    label: 'Laborat',
    value: 'Laborat'
  },
  {
    icon: 'icon-mat-email',
    color: 'primary',
    jenis: 'Radiologi',
    label: 'Radiologi',
    value: 'Radiologi'
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
  // }
])
// eslint-disable-next-line no-unused-vars
function getLabel(val) {
  const anu = documents.value.filter(a => a.value === val)
  // console.log('anu ', anu)
  return anu?.length ? anu[0].label : '-'
}
const comp = [
  { nama: 'Resume', page: defineAsyncComponent(() => import('../resume/ResumePage.vue')) },
  { nama: 'Billing', page: defineAsyncComponent(() => import('./BillingPage.vue')) },
  { nama: 'Sakit', page: defineAsyncComponent(() => import('../surat/compsurat/SuratSakitPage.vue')) },
  { nama: 'Sehat', page: defineAsyncComponent(() => import('../surat/compsurat/SuratSehatPage.vue')) },
  { nama: 'Rencana', page: defineAsyncComponent(() => import('../surat/compsurat/SuratRencanaPage.vue')) },
  { nama: 'prb', page: defineAsyncComponent(() => import('../pengantar/comppengantar/PengantarRujukBalik.vue')) },
  { nama: 'rslain', page: defineAsyncComponent(() => import('../pengantar/comppengantar/PengantarRsLain.vue')) },
  { nama: 'AsesmenAwalMedis', page: defineAsyncComponent(() => import('../erm/poli/PengkajianAwalMedisRJPage.vue')) },
  { nama: 'Catatan', page: defineAsyncComponent(() => import('../erm/poli/CatatanRawatJalanPage.vue')) },
  { nama: 'AsesmenAwalKeperawatan', page: defineAsyncComponent(() => import('../erm/poli/AsesmenAwalMedisRj.vue')) },
  { nama: 'AsesmenPraAnestesia', page: defineAsyncComponent(() => import('../erm/poli/AsesmenPraAnestesia.vue')) },
  { nama: 'SEP', page: defineAsyncComponent(() => import('../../../simrs/poli/dokumen/Sep/SepPage.vue')) },
  { nama: 'ERESEP', page: defineAsyncComponent(() => import('../../../simrs/igd/layanan/dokumen/dokumenisi/Farmasi/FarmasiPage.vue')) },
  { nama: 'Laborat', page: defineAsyncComponent(() => import('../../../simrs/igd/layanan/dokumen/dokumenisi/Laborat/LaboratPage.vue')) },
  { nama: 'Radiologi', page: defineAsyncComponent(() => import('../../../simrs/igd/layanan/dokumen/dokumenisi/Radiologi/RadiologiPage.vue')) },
  // { nama: 'SuratKontrol', page: defineAsyncComponent(() => import('../../../simrs/poli/dokumen/SuratKontrol/SuratKontrolPage.vue')) },
  { nama: 'LapOperasi', page: defineAsyncComponent(() => import('../../../simrs/poli/dokumen/lapoperasi/LapOperasiPage.vue')) },
  // { nama: 'SrtKnslAnPol', page: defineAsyncComponent(() => import('../../../simrs/poli/dokumen/SuratKonsulAntarPoli/SuratKonsulAntarPoli.vue')) },
  // { nama: 'SrtKnslinternal', page: defineAsyncComponent(() => import('../../../simrs/poli/dokumen/KonsulInternal/SuratKonsulInternalPage.vue')) },
]
// eslint-disable-next-line no-unused-vars
const cekPanel = () => {
  const val = doc.value
  const ganti = val.replace(/ /g, '')
  const arr = findWithAttr(comp, 'nama', ganti)

  return arr >= 0 ? comp[arr].page : ''
}
function goTo(val) {
  console.log('got', val)
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
