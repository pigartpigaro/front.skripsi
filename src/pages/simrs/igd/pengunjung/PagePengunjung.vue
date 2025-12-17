<template>
  <q-page class="" :class="style.componentfull ? 'container-no-header' : 'container--q-header q-pa-xs'">
    <div class="header bg-primary text-white">
      <header-page @fullscreen="style.setComponentFull" @set-tanggal="(val) => store.setDate(val)"
        @set-periode="(val) => store.setPeriodik(val)" @set-search="store.setQ" @set-row="store.setPerPage"
        @refresh="store.getData" @filter="store.setFilters" />
    </div>

    <q-card flat no-shadow square class="my-flex-1" style="overflow: hidden;">
      <q-scroll-area style="height: calc(100% - 1px);">
        <list-pengunjung v-if="store.meta !== null" :keloading-cesmixy="store.items" :items="store.items"
          :loading="store.loading" :loading-terima="store.loadingTerima" :loadingcesmix="store.loadingcesmix"
          @terimapasien="terimapasien" @bukalayanan="bukaTindakan" @kirimcasmix="kirimcasmix" />
      </q-scroll-area>
      <div class=" absolute-bottom bg-primary text-white z-top">
        <footer-page :meta="store.meta" @go-to="store.goToPage" />
      </div>
    </q-card>
    <page-layanan-igd :key="pasien" v-model="store.pageLayanan" :pasien="pasien" :loadingaja="store.loadingTerima" />
  </q-page>
</template>

<script setup>
// import ListLoading from './ListLoading.vue'
import ListPengunjung from './ListPengunjung.vue'
import HeaderPage from './HeaderPage.vue'
import FooterPage from './FooterPage.vue'
import PageLayananIgd from '../layanan/PageLayananIgd.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { usePengunjungIgdStore } from 'src/stores/simrs/igd/pengunjung'
import { onMounted, ref } from 'vue'
import { useDiagnosaDokter } from 'src/stores/simrs/igd/diagnosadokter'
const store = usePengunjungIgdStore()
const style = useStyledStore()
const pasien = ref(null)
const diagnosa = useDiagnosaDokter()

function terimapasien(val) {
  // console.log('terimapasien', val)
  store.setTerima(val)
  store.items.flagpelayanan = '1'
}

function bukaTindakan(val) {
  // console.log('bukaTindakan', val)
  pasien.value = val
  store.bukaLayanan(val)
}

function kirimcasmix(val) {

  if (val?.flagpelayanan === 1) {
    $q.notify({
      type: 'negative',
      title: 'Peringatan',
      message: 'INFO WARNING <b/> MAAF,<em><b>Pasien Ini Masih Belum Selese Palayanan</b></em>',
      html: true,
      timeout: 1000
    })
  } else {
    store.kirimpenjaminan(val)
  }
}

onMounted(() => {
  diagnosa.getDiagnosaDropdown()
  diagnosa.getTindakanDropdown()
  store.getData()
  store.getNakes()
})
</script>
