<template>
  <q-page class="" :class="style.componentfull ? 'container-no-header' : 'container--q-header q-pa-xs'">
    <div class="header bg-primary text-white">
      <header-page @fullscreen="style.setComponentFull" @set-tanggal="(val) => store.setDate(val)"
        @set-periode="(val) => store.setPeriodik(val)" @set-search="store.setQ" @set-row="store.setPerPage"
        @refresh="store.getData" @filter="store.setFilters" />
    </div>

    <q-card flat no-shadow square class="my-flex-1" style="overflow: hidden;">
      <q-scroll-area style="height: calc(100% - 1px);">
        <ListPengajuanKlaim v-if="store.meta !== null" :keloading-cesmixy="store.items" :items="store.items"
          :loading="store.loading" :loading-terima="store.loadingTerima" @bukalayanan="bukaTindakan" />
      </q-scroll-area>
      <div class=" absolute-bottom bg-primary text-white z-top">
        <footer-page :meta="store.meta" @go-to="store.goToPage" />
      </div>
    </q-card>
    <page-grouping-klaim :key="pasien" v-model="store.pageLayanan" :pasien="pasien" :loadingbuka="store.loadingbuka" />
  </q-page>
</template>
<script setup>

import ListPengajuanKlaim from './ListPengajuanKlaim.vue'
import HeaderPage from './HeaderPage.vue'
import FooterPage from './FooterPage.vue'

import PageGroupingKlaim from '../grouping/PageGroupingKlaim.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { onMounted, ref, watch } from 'vue'
import { useKlaimPenjaminanStore } from 'src/stores/simrs/penjaminan/klaim'


const store = useKlaimPenjaminanStore()

const style = useStyledStore()
const pasien = ref(null)

function bukaTindakan(val) {
  pasien.value = val
  if (val?.kodepoli === 'POL014') {
    store.bukaLayanan(val)
  } else {
    store.bukaLayananrajal(val)
  }

}

onMounted(() => {
  store.getData()
})
</script>
