<template>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormLapOperasional />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <template v-if="store.hasilpendapatan?.length || store.hasilbelanja?.length || store.hasilsilpa?.length">
          <listData />
        </template>
        <!-- <template v-else-if="store.reqs.jenislra === 2">
          <listDataPsap />
        </template> -->
        <template v-else>
          <div class="row q-pa-md full-width text-subtitle1 flex-center">
            <q-icon class="q-pr-sm" size="sm" name="icon-mat-warning" />
            Silahkan Pilih Parameter Dulu
          </div>
        </template>
      </div>
    </q-card>
  </div>
</template>
<script setup>
import { useLRAjurnalStore } from 'src/stores/siasik/laporan/lra/lrajurnal.'
import FormLapOperasional from './inpage/FormGetdata.vue'
import listData from './inpage/ListdataLrajurnal.vue'
import listDataPsap from './inpage/ListdataLraPsap.vue'
import { onBeforeMount } from 'vue'

const store = useLRAjurnalStore()

onBeforeMount(() => {
  store.hasilpendapatan = []
  store.hasilbelanja = []
  store.hasilsilpa = []
})
</script>
