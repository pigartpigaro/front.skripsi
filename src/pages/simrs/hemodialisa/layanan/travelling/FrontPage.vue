<template>
  <div class="row ">
    <div :class="full ? 'col-12' : 'col-8'" class="full-height">
      <div class="column full-height">
        <div class="col-auto">
          <BarComp title="Form Pengkajian Hemodialisa" bg-color="bg-primary" text-color="text-white"
            @full="full = !full" />
        </div>
        <div class="col full-height scroll bg-white" style="max-height: calc(100vh - 95px);">
          <FormPage :pasien="pasien" />
        </div>
      </div>
    </div>

    <div v-if="!full" :class="full ? 'col-0' : 'col-4'" style="max-height: calc(100vh - 95px);">
      <q-card flat bordered class="column fit">
        <div class="col-auto">
          <BarComp title="Informasi Pengkajian Hemodialisa" bg-color="bg-dark" text-color="text-white"
            :btn-full="false" />
        </div>
        <div class="col scroll" style="overflow: auto">
          <ListPage />
        </div>
      </q-card>
    </div>

  </div>
  <CompDialog :pasien="pasien" />
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const BarComp = defineAsyncComponent(() => import('src/pages/simrs/hemodialisa/layanan/components/BarComp.vue'))
const FormPage = defineAsyncComponent(() => import('./comp/CompForm.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/CompList.vue'))
const CompDialog = defineAsyncComponent(() => import('./comp/compDialog.vue'))

const full = ref(false)
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
