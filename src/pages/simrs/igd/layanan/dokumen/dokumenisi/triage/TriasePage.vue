<template>
  <div class="full-height full-height q-pa-sm">

    <!-- <q-btn ref="refPrint" v-print="printObj" unelevated color="dark" round size="sm" icon="icon-mat-print">
      <q-tooltip class="primary" :offset="[10, 10]">
        Print
      </q-tooltip>
    </q-btn> -->
    <div id="printMe" style="width: 21cm;" class="q-pa-xs full-width full-height">
      <KopSurat :judul="props?.judul ?? 'TRIASE'" :pasien="props?.pasien" :jangantampil=false />

      <IsitriagePage :pasien="props?.pasien" />
    </div>
  </div>
</template>
<script setup>
import KopSurat from '../../KopSurat.vue';
import IsitriagePage from './IsitriagePage.vue';

const printObj = {
  id: 'printMe',
  popTitle: ' '
}

const props = defineProps({
  judul: {
    type: String,
    default: null
  },
  pasien: {
    type: Object,
    default: null
  }
})
</script>
