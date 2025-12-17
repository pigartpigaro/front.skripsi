<script setup>
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const ImplementasiPage = defineAsyncComponent(() => import('./comp/ImplementasiPage.vue'))
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  }
})

// const store = useEdukasiPoliStore()

onMounted(() => {
  Promise.all([
  ])
})

</script>

<template>
  <BaseLayout :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="100"
    title-before="IMPLEMENTASI & EVALUASI" title-after="">
    <template #form>
      <!-- <FormPage :pasien="props.pasien" /> -->
      <!-- <div class="fit column flex-center">
        MASIH TAHAP PENGEMBANGAN
      </div> -->
      <ImplementasiPage :pasien="props.pasien" :nakes="props.nakes" :kasus="props.kasus" />
    </template>
    <!-- <template #list>
      <div class="fit">
      </div>
    </template> -->

    <!-- <template #nota>
    </template> -->
  </BaseLayout>
</template>
