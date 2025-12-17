<template>

  <div class="q-pa-md" style="max-width: 100%">
    <AdminitrasiPage :pasien="props?.pasien" ref="adminRef" />
    <LaboratPage :pasien="props?.pasien" ref="laboratRef" />
    <RadiologiPage :pasien="props?.pasien" ref="radioRef" />
    <Tindakan :pasien="props?.pasien" ref="tindakanRef" />
    <BankDarahPage :pasien="props?.pasien" ref="bankdarahRef" />
    <OperasiPage :pasien="props?.pasien" ref="operasiRef" />
    <KamarJenazahPage :pasien="props?.pasien" ref="kamarjenazahRef" />
    <AmbulanPage :pasien="props?.pasien" ref="ambulanRef" />
    <ObatPage :pasien="props?.pasien" ref="obatRef" />

    <div>
      <q-separator class="q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
      <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">

        <div class="col-10 text-right text-bold">
          Total
        </div>
        <div class="col-2 garis-bawah-dablue text-right text-bold">
          {{ formatRp(totalall) }}
        </div>
      </div>
    </div>
    <ReturObatPage :pasien="props?.pasien" ref="returobatRef" />
    <q-separator class="q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">

      <div class="col-10 text-right text-bold">
        Total Akhir
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(totalakhir) }}
      </div>
    </div>
  </div>
</template>
<script setup>
import AdminitrasiPage from './comp/AdminitrasiPage.vue';
import LaboratPage from './comp/LaboratPage.vue';
import RadiologiPage from './comp/RadiologiPage.vue';
import Tindakan from './comp/TindakanPage.vue';
import BankDarahPage from './comp/BankDarahPage.vue';
import OperasiPage from './comp/OperasiPage.vue';
import KamarJenazahPage from './comp/KamarJenazahPage.vue';
import AmbulanPage from './comp/AmbulanPage.vue';
import ObatPage from './comp/ObatPage.vue';
import ReturObatPage from './comp/ReturObatPage.vue';

import { computed, ref } from 'vue';
import { formatRp } from 'src/modules/formatter';
import { useSepBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/sep';


const laboratRef = ref(0);
const adminRef = ref(0);
const radioRef = ref(0);
const tindakanRef = ref(0);
const bankdarahRef = ref(0);
const operasiRef = ref(0);
const kamarjenazahRef = ref(0);
const ambulanRef = ref(0);
const obatRef = ref(0);
const returobatRef = ref(0);

const totalall = computed(() => {
  const administrasi = adminRef.value.administrasi?.subtotal ?? 0;
  const laborat = laboratRef.value.rincianlaborat?.total ?? 0;
  const radiologi = radioRef.value.rincianradiologi?.total ?? 0;
  const bankdarah = bankdarahRef.value.rincianbankdarah?.total ?? 0;
  const tindakan = tindakanRef.value.rinciantindakan?.total ?? 0;
  const oktrans = operasiRef.value.rincianoktrans?.total ?? 0;
  const kamarjenazah = kamarjenazahRef.value.rinciankamarjenazah?.total ?? 0;
  const ambulan = ambulanRef.value.rincianambulan?.subtotal ?? 0;
  const obat = obatRef.value.rincianobat?.total ?? 0;
  const total = parseInt(laborat) + parseInt(administrasi) + parseInt(radiologi) + parseInt(tindakan) + parseInt(bankdarah) + parseInt(oktrans) +
    parseInt(kamarjenazah) + parseInt(ambulan) + parseFloat(obat)
  return total
})

const totalakhir = computed(() => {
  const returobat = returobatRef.value.returobat?.total ?? 0;
  const total = parseInt(totalall.value) - parseInt(returobat);
  return total
})

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const store = useSepBpjsStore()
</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
