<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card flat bordered square class="col-6 full-height">
        <FormPenilaian :key="props.pasien" :pasien="props.pasien" tooltip="History Pasien (Shift + H)"
          @open-history="seamless = !seamless" />
      </q-card>
      <q-card flat bordered square class="col-6 full-height">
        <ListPenilaian :key="props.pasien" :pasien="props.pasien" :loadingaja="loadingaja" />
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import FormPenilaian from './comanamnesis/FormPenilaian.vue'
import ListPenilaian from './comanamnesis/ListPenilaian.vue'
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

const seamless = ref(false)

onMounted(() => {
  // console.log(text.value)
  document.addEventListener('keypress', handleKeypress, false)
})

onUnmounted(() => {
  document.removeEventListener('keypress', handleKeypress, true)
})

const handleKeypress = (evt) => {
  if (evt.key === 'H' && evt.shiftKey) {
    seamless.value = !seamless.value
  }
}

</script>
