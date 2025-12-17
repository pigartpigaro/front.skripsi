<template>
  <div class="full-height full-height q-pa-sm">
    <q-btn ref="refPrint" v-print="printObj" unelevated color="dark" round size="sm" icon="icon-mat-print">
      <q-tooltip class="primary" :offset="[10, 10]">
        Print
      </q-tooltip>
    </q-btn>
    <div id="printMe" style="width: 21cm;" class="q-pa-xs full-width full-height">
      <KopSurat :judul="props?.judul ?? 'Indikasi Masuk Ranap'" :pasien="props?.pasien" :jangantampil=false
        :kelas="props.kelas" />

      <Isiindikasimasuknicudaninter :pasien="props?.pasien" :isi="props.isi" :kelas="props.kelas"
        :keterangan="props.keterangan" :loading="props.loading" />
    </div>
  </div>
</template>
<script setup>
import { usePlannStore } from 'src/stores/simrs/igd/plann';
import KopSurat from '../../KopSurat.vue';
import Isiindikasimasuknicudaninter from './Isiindikasimasuknicudaninter.vue';
const store = usePlannStore()

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
  },
  isi: {
    type: Array,
    default: () => []
  },
  kelas: {
    type: Object,
    default: null
  },
  keterangan: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
})


</script>
