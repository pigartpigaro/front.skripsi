<template>
  <div class="q-pa-sm row flex justify-between bg-teal text-white items-center">
    <div class="col-6">{{ props?.judul }}</div>
    <div class="col-6 text-right">
      <q-btn flat dense size="md" icon="icon-mat-download" @click="exportPdf()">
        <q-tooltip class="primary" :offset="[10, 10]">
          Download
        </q-tooltip>
      </q-btn>
      <q-btn icon="icon-mat-print" flat dense size="md" v-print="printObj"> <q-tooltip class="primary"
          :offset="[10, 10]">
          Print
        </q-tooltip>
      </q-btn>
    </div>
  </div>

  <div class="full-height full-height q-pa-sm ">
    <div id="printMe" style="width: 21cm;" class="q-pa-xs full-width full-height">
      <KopSurat :judul="props?.judul" :pasien="props?.pasien" :jangantampil=false />
      <IsiBillingPage :pasien="props?.pasien" />
    </div>
  </div>
</template>
<script setup>
import KopSurat from '../../KopSurat.vue';
import IsiBillingPage from './IsiBillingPage.vue';
import html2pdf from 'html2pdf.js';

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

function exportPdf() {
  const concern = document.getElementById('printMe')
  const nama = props?.pasien?.nama ?? props?.pasien?.pasien
  const pdfConfig = {
    margin: 0,
    filename: 'billing-' + props?.pasien?.noreg + '_' + nama + '_' + props?.pasien?.norm + '.pdf',
    image: {
      type: 'jpeg',
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      logging: true,
      dpi: 192,
      letterRendering: true
    },
    jsPDF: {
      unit: 'mm', // mm | pt | in
      format: 'a4', // a4 | letter
      orientation: 'portrait' // landscape | portrait
    }
  }

  html2pdf().set(pdfConfig).from(concern).save()
}
</script>
