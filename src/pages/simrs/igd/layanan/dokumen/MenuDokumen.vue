<template>
  <div class=" full-height full-width bg-red">
    <div class="col-auto bg-red">
      <q-tabs v-model="store.tab" inline-label outside-arrows mobile-arrows align="left" active-color="yellow"
        class="bg-grey-4 text-white shadow-2 text-grey-8" active-bg-color="primary">
        <q-tab v-for="(item, i) in store.tabs" :key="i" :name="item.page" :label="item.name" style="width: 100%;" />
      </q-tabs>
    </div>
    <div class="col full-height" style="overflow: hidden;">
      <q-tab-panels v-model="store.tab" animated class="full-height">
        <q-tab-panel name="Billing" class="full-height q-pa-none">
          <BillingPage :judul="billing" :pasien="props?.pasien" />
        </q-tab-panel>
        <q-tab-panel name="Resume" class="full-height q-pa-none">
          <ResumePage judul="Resume Medis" :pasien="props?.pasien" />
        </q-tab-panel>
        <q-tab-panel name="Triase" class="full-height q-pa-none">
          <TriasePage :judul="triase" :pasien="props?.pasien" />
        </q-tab-panel>
        <q-tab-panel name="Surat Kematian" class="full-height q-pa-none">
          <SuratKematianPage :judul="suratkematian" :pasien="props?.pasien" />
        </q-tab-panel>
        <q-tab-panel name="Indikasi Masuk Rawat Inap" class="full-height q-pa-none">
          <Indikasimasuknicudaninter :judul="indikasinicu" :pasien="props?.pasien" :isi="isi" :kelas="kelas"
            :loading="storex?.loading" :keterangan="keterangan" />
        </q-tab-panel>
        <q-tab-panel name="Sep" class="full-height q-pa-none">
          <SepPage :judul="sep" :pasien="props?.pasien" />
        </q-tab-panel>
        <q-tab-panel name="Billing Detail" class="full-height q-pa-none">
          <BillingDetailPage judul="Billing Detail" :pasien="props?.pasien" />
        </q-tab-panel>
        <q-tab-panel name="Farmasi" class="full-height q-pa-none">
          <FarmasiPage judul="Farmasi" :pasien="props?.pasien" />
        </q-tab-panel>
        <q-tab-panel name="Laborat" class="full-height q-pa-none">
          <LaboratPage judul="Laborat" :pasien="props?.pasien" />
        </q-tab-panel>
        <q-tab-panel name="Radiologi" class="full-height q-pa-none">
          <RadiologiPage judul="Radiologi" :pasien="props?.pasien" />
        </q-tab-panel>
        <q-tab-panel name="Konsul" class="full-height q-pa-none">
          <KonsulDokterPage judul="Konsul Dokter" :pasien="props?.pasien" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<script setup>
import { useDokumenIgdStore } from 'src/stores/simrs/igd/dokumen'
import { ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

import BillingPage from './dokumenisi/Billing/BillingPage.vue';
import TriasePage from './dokumenisi/triage/TriasePage.vue';
import SuratKematianPage from './dokumenisi/suratkematian/SuratKematianPage.vue';
import Indikasimasuknicudaninter from './dokumenisi/inidakasimasuknicudaninter/indikasimasuknicudaninter.vue';
import SepPage from './dokumenisi/Sep/SepPage.vue';
import ResumePage from './dokumenisi/Resume/ResumePage.vue';
import BillingDetailPage from './dokumenisi/Billdetail/BillingDetailPage.vue';
import FarmasiPage from './dokumenisi/Farmasi/FarmasiPage.vue';
import LaboratPage from './dokumenisi/Laborat/LaboratPage.vue';
import RadiologiPage from './dokumenisi/Radiologi/RadiologiPage.vue';
import KonsulDokterPage from './dokumenisi/konsulDokter/KonsulDokterPage.vue';
import { usePlannStore } from 'src/stores/simrs/igd/plann';

const billing = ref('BILLING')
const triase = ref('TRIASE')
const suratkematian = ref('Surat Kematian')
const indikasinicu = ref('Indikasi Pasien Masuk Ruang')
const sep = ref('Sep')
const store = useDokumenIgdStore()
// const storex = usePlannStore()
// const isi = storex?.isiindikasimasuknicu?.planranap?.dokumentransfer?.isi ? JSON.parse(storex?.isiindikasimasuknicu?.planranap?.dokumentransfer?.isi) : '-'
// const kelas = storex?.isiindikasimasuknicu?.planranap?.dokumentransfer?.kelas
// const keterangan = storex?.isiindikasimasuknicu?.planranap?.keterangan

const isi = props.pasien?.planheder[0]?.planranap?.dokumentransfer?.isi ? JSON.parse(props.pasien?.planheder[0]?.planranap?.dokumentransfer?.isi) : '-'
const kelas = props.pasien?.planheder[0]?.planranap?.dokumentransfer?.kelas
const keterangan = props.pasien?.planheder[0]?.planranap?.keterangan

// console.log('sassa', props.pasien?.planheder[0]?.planranap)

// storex.indikasimasuknicuinter(props.pasien)
</script>
