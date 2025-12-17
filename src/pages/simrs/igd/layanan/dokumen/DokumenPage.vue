<template>
  <div class="full-height full-width">
    <div class="row full-height ">
      <q-card
        flat
        bordered
        square
        class="col-12 full-height"
      >
        <MenuDokumen
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        />
      </q-card>
    </div>
  </div>
</template>

<script setup>

import MenuDokumen from './MenuDokumen.vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

</script>
