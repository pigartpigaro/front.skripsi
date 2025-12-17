<script setup>
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))

const FormPage = defineAsyncComponent(() => import('./comp/FormPage.vue'))
const ListPerencanaan = defineAsyncComponent(() => import('./comp/ListPerencanaan.vue'))

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
  <BaseLayout :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="60" nota
    title-before="PERENCANAAN" title-after="List Perencanaan Edukasi Tersimpan">
    <template #form>
      <FormPage :pasien="props.pasien" />
    </template>
    <template #list>
      <div class="fit">
        <ListPerencanaan :pasien="props.pasien" />
      </div>
    </template>

    <template #nota>
      <!-- <q-select
        v-model="store.notaTindakan"
        outlined
        standout="bg-yellow-3"
        bg-color="white"
        dense
        :options="store.notaTindakans"
        :display-value="`NOTA: ${store.notaTindakan==='' || store.notaTindakan === 'BARU'? 'BARU': store.notaTindakan}`"
        style="min-width: 200px;"
      /> -->
    </template>
  </BaseLayout>
</template>
