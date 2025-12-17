<template>
  <div class="container">
    <q-card class="items-center q-pa-sm full-width full-height">
      <div class="row" style="height: 100%">
        <ListData />
      </div>
    </q-card>
  </div>
  <!-- <div class="container q-px-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <listRegjurnal />
      </div>
    </q-card>
  </div> -->
</template>
<script setup>
import ListData from './inpage/ListData.vue'
import { onBeforeMount } from 'vue';
import { listdataSerahterimaStore } from 'src/stores/siasik/transaksi/ls/serahterimapekerjaan/listdataserahterima';

// import listRegjurnal from './inpage/ListRegjurnal.vue'

const store = listdataSerahterimaStore()
onBeforeMount(() => {
  store.listdataserahterima()
})
</script>
