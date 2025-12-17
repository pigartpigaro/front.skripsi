<template>
  <div class="fit column">
    <div class="col-auto ">
      <div class="q-pa-md flex justify-between bg-teal text-white items-center">
        <div>{{ menu?.label }}</div>
        <q-btn icon="icon-mat-print" flat dense size="md" v-print="printObj" />
      </div>
    </div>
    <div class="col full-height q-pa-md scroll">
      <EdukasiPage id="kiemedis" ref="refResume" :pasien="pasien" :menu="menu" />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const EdukasiPage = defineAsyncComponent(() => import('./EdukasiPage.vue'))

const refResume = ref()

const printObj = {
  id: 'kiemedis',
  popTitle: 'Edukasi KIE Medis'

}

defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

</script>
