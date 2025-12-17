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
import { listDataNpdlsStore } from 'src/stores/siasik/transaksi/ls/newnpdls/listdatanpdls';
import ListData from './inpage/ListDataNpdls.vue'
import { onBeforeMount } from 'vue';
// import listRegjurnal from './inpage/ListRegjurnal.vue'

const store = listDataNpdlsStore()

onBeforeMount(() => {
  store.listdatanpd()
})
</script>
