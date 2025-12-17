<!-- <template>
  <div class="container q-pl-sm q-pr-sm">
    <div class="q-card q-mt-sm q-mt-ms">
      <q-card class="q-pa-xs">
        <div class="row bg-black text-white q-pa-sm q-mb-xs q-mt-xs">
          <div class="f-14 text-weight-bold">
            Nota Permintaan Dana Langsung | SIASIK
          </div>
        </div>
      </q-card>
    </div>

    <div class="q-card q-mt-sm q-mt-ms">
      <q-tabs v-model="tabdata" dense active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab name="forminput" label="Form NPD-LS" @click="reset()" />
        <q-tab name="data" label="Data NPD-LS" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tabdata" animated>
        <q-tab-panel name="forminput">
          <FormInputnpdLS />
        </q-tab-panel>

        <q-tab-panel name="data">
          <ListdataNpsLS />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'
import FormInputnpdLS from './inpage/FormInputnpdLS.vue'
import ListdataNpsLS from './inpage/ListdataNpdLS.vue'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
// import { dataBastFarmasi } from 'src/stores/siasik/transaksi/ls/npdls/databast'

// const carisrt = dataBastFarmasi()
const store = formNotaPermintaanDanaLS()
const tabdata = ref('forminput')
onBeforeUnmount(() => {
  reset()
})
function reset() {
  store.resetFORM(tabdata)
  // carisrt.resetFORM(tabdata)
}
// onMounted(() => {
//   store.emptyForm()
// })
</script>

<style lang="scss" scoped></style> -->


<template>
  <q-page ref="pageRef" class="column full-height full-width" :class="!style.componentfull ? 'q-pa-md' : 'q-pa-xs'">
    <div class="col-auto">
      <PageHead v-if="!style.componentfull" :title="title" :subtitle="subtitle" :path="page.path"
        @togle-draw="togleDraw()" />
    </div>
    <q-card flat class="col full-width full-height bg-grey-3" :style="`max-height: 100%; overflow:hidden`">
      <q-scroll-area :style="`height: ${!style.componentfull ? h - 0 : h + 20}px; max-width: 100%;`"
        :thumb-style="thumbStyle" :bar-style="barStyle">
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'">
            <component :is="Component" transition />
          </transition>
        </router-view>
      </q-scroll-area>
    </q-card>
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import PageHead from './PageHeadNpdls.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const style = useStyledStore()
const pageRef = ref()
const h = ref(0)
const thumbStyle = ref({
  right: '0px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '2px',
  opacity: 0.75
})
const barStyle = ref({
  right: '0px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.2
})

const page = useRoute()
const title = computed(() => {
  if (page.path === '/siasik/ls/npdls/newlistnpd') {
    return 'LIST NPD-LS'
  }

  // else if (page.path === '/akuntansi/jurnal/postingjurnal') {
  //   return 'POSTING JURNAL'
  // }
  // else if (page.path === '/pendaftaran/umum/listmjkn') {
  // //   return 'LIST MOBILE JKN'
  // }
  else {
    return 'NEW FORM NPD-LS'
  }
})

const subtitle = computed(() => {
  if (page.path === '/siasik/ls/npdls/newlistnpd') {
    return 'List Data NPD-LS'
  }

  // else if (page.path === '/akuntansi/jurnal/postingjurnal') {
  //   return 'List Jurnal yang Terposting'
  // }
  // // } else if (page.path === '/pendaftaran/umum/listmjkn') {
  // //   return 'List Kunjungan dari m-JKN'
  // }
  else {
    return 'Form Input Pengajuan NPD-LS'
  }
})

onMounted(() => {
  h.value = pageRef.value.$el.clientHeight
})
</script>
