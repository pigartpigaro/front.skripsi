<template>
  <!-- <q-page class="" :class="style.componentfull ? 'container-no-header' : 'container--q-header q-pa-xs'">
    <div class="header bg-primary text-white">
      <HeaderComp :tanggal="store.params.tgl" :search="store.params.q" :per-page="store.params.per_page"
        @fullscreen="style.setComponentFull" @set-tanggal="(val) => store.setDate(val)" @set-search="store.setQ"
        @set-row="store.setPerPage" />
    </div>

    <q-card flat no-shadow square class="my-flex-1" style="overflow: hidden;">
      <q-scroll-area style="height: calc(100% - 1px);">
        <ListKunjungan :key="store.items" :items="store.items" :loading="store.loading" />
      </q-scroll-area>
      <div class=" absolute-bottom bg-primary text-white z-top">
        <BottomComp :meta="store.meta" @go-to="store.goToPage" />
      </div>
    </q-card>
  </q-page> -->
  <q-page class="" :class="style.componentfull ? 'container-no-header' : 'container--q-header q-pa-xs'">
    <div class="header bg-primary text-white">
      <HeaderComp :tanggal="store.params.tgl" :search="store.params.q" :per-page="store.params.per_page"
        @fullscreen="style.setComponentFull" @set-tanggal="(val) => store.setDate(val)" @set-search="store.setQ"
        @set-row="store.setPerPage" />
    </div>

    <q-card flat no-shadow square class="my-flex-1" style="overflow: hidden;">
      <q-scroll-area style="height: calc(100% - 1px);">
        <ListKunjungan :key="store.items" :items="store.items" :loading="store.loading" />
      </q-scroll-area>
      <div class=" absolute-bottom bg-primary text-white z-top">
        <BottomComp :meta="store?.meta" @go-to="store.goToPage" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import HeaderComp from './comp/HeaderComp.vue'
import ListKunjungan from './comp/ListKunjungan.vue'
import BottomComp from './comp/BottomComp.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { onMounted, onUnmounted } from 'vue'
import { useKasirRajalListKunjunganStore } from 'src/stores/simrs/kasir/rajal/kunjungan'

const style = useStyledStore()
const store = useKasirRajalListKunjunganStore()

onMounted(() => {
  store.getLists()
})

onUnmounted(() => {
  store.setTglAwal()
})
</script>
