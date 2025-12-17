<template>
  <div class="fit column">
    <div class="col-auto ">
      <div class="q-pa-md flex justify-between bg-teal text-white items-center">
        <div>{{ menu?.label }}</div>
        <q-btn icon="icon-mat-print" flat dense size="md" v-print="printObj" />
      </div>
    </div>
    <div class="col full-height q-pa-md scroll">
      <NeonatalPage v-if="kasus?.medis === '5.3'" id="assessmentawalmedis" ref="refResume" :pasien="pasien" :menu="menu"
        :kasus="kasus" :data-header="dataHeader" />
      <DokPage v-else id="assessmentawalmedis" ref="refResume" :pasien="pasien" :menu="menu" :kasus="kasus"
        :data-header="dataHeader" />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const DokPage = defineAsyncComponent(() => import('./DokPage.vue'))
const NeonatalPage = defineAsyncComponent(() => import('./NeonatalPage.vue'))

const refResume = ref()


const printObj = {
  id: 'assessmentawalmedis',
  popTitle: 'Asessment Awal Medis'

}

const props = defineProps({
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



// console.log('props', props?.kasus);

</script>
