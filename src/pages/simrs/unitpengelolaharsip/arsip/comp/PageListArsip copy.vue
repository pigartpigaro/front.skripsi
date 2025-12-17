<template>
  <q-page class="" :class="style.componentfull ? 'container-no-header' : 'container--q-header q-pa-xs'">
    <div class="header bg-primary text-white">
      <header-page @fullscreen="style.setComponentFull" />
    </div>

    <q-card flat no-shadow square class="my-flex-1" style="overflow: hidden;">
      <q-scroll-area style="height: calc(100% - 1px);">
        <list-pengunjung />
      </q-scroll-area>
      <div class=" absolute-bottom bg-primary text-white z-top">
        <footer-page />
      </div>
    </q-card>
    <!-- <page-layanan-igd :key="pasien" v-model="store.pageLayanan" :pasien="pasien" :loadingaja="store.loadingTerima" /> -->
  </q-page>
</template>
<script setup>
import { useStyledStore } from 'src/stores/app/styled';

const style = useStyledStore()
</script>
