<template>
  <div class="fit column">

    <div class="col-auto ">
      <div class="q-pa-md flex justify-between bg-teal text-white items-center">
        <div>{{ menu?.label }}</div>
        <q-btn icon="icon-mat-print" flat dense size="md" v-print="printObj" />
      </div>
    </div>
    <div class="col full-height q-pa-md scroll">
      <DokPage id="assessmentawalkeperawatan" ref="refResume" :pasien="pasien" :menu="menu" :kasus="kasus"
        :data-header="dataHeader" />

    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'


const DokPage = defineAsyncComponent(() => import('./DokumenPage.vue'))
const printObj = {
  id: 'assessmentawalkeperawatan',
  popTitle: 'Asessment Awal Keperawatan'

}
defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  dataHeader: {
    type: Array,
    default: null
  }
})
</script>
