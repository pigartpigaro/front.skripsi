<template>
  <q-page class="" :class="style.componentfull ? 'container-no-header' : 'container--q-header q-pa-xs'">
    <div class="header bg-primary text-white">
      <header-page @fullscreen="style.setComponentFull" @set-search="store.setQ" @set-row="store.setPerPage"
        @refresh="store.getData" @filter="store.setFilters" />
    </div>

    <q-card flat no-shadow square class="my-flex-1" style="overflow: hidden;">
      <q-scroll-area style="height: calc(100% - 1px);">
        <list-pengunjung v-if="store.meta !== null" :keloading-cesmixy="store.items" :items="store.items"
          :loading="store.loading" :loadingbayar="store.loadingbayar" @flaging="flagingmanual" />
      </q-scroll-area>
      <div class=" absolute-bottom bg-primary text-white z-top">
        <footer-page :meta="store.meta" @go-to="store.goToPage" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import ListPengunjung from './ListPengunjung.vue'
import HeaderPage from './HeaderPage.vue'
import FooterPage from './FooterPage.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { onMounted, ref } from 'vue'

import { useFlagingVaStore } from 'src/stores/simrs/kasir/va/flagingva'
const store = useFlagingVaStore()
const style = useStyledStore()
const pasien = ref(null)

function flagingmanual(val) {
  // console.log('terimapasien', val)
  store.simpanflaging(val)
}

onMounted(() => {
  store.getDataVa()
})
</script>
