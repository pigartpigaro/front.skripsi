<template>
  <div v-if="store?.loadingTerima">
    <app-loading />
  </div>
  <div v-else-if="kamaroperasi?.length < 1 && !store.loadingTerima">
    <app-no-data />
  </div>
  <div v-else class="q-pa-md" style="max-width: 100%">
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
    <div class="full-height full-height q-pa-sm bg-indigo-1">
      <div id="printMe" style="width: 21cm;" class="q-pa-xs full-width full-height bg-white">
        <KopSurat judul="Laporan Operasi" :pasien="props?.pasien" :jangantampil=false />
        <IsiLaporanOperasi :pasien="props?.pasien" :pegawai="pegawai" />
      </div>
    </div>
  </div>
</template>
<script setup>

import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung';
import { useMasterCutiPegawaiStore } from '../../../../../stores/simrs/pegawai/master/cuti/mastercuti';
import KopSurat from '../../../igd/layanan/dokumen/KopSurat.vue';
import IsiLaporanOperasi from './IsiLaporanOperasi.vue';
import html2pdf from 'html2pdf.js';
import { usePengunjungIgdStore } from 'src/stores/simrs/igd/pengunjung';
import { computed } from 'vue';
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung';

const storepegawai = usePengunjungRanapStore()
// const store = usePengunjungIgdStore()

storepegawai.getNakes()

const pegawai = storepegawai.nakes

const printObj = {
  id: 'printMe',
  popTitle: ' '
}

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = computed(() =>
  props?.pasien?.kdpoli === 'POL014'
    ? usePengunjungIgdStore()
    : usePengunjungPoliStore()
)

const kamaroperasi = computed(() =>
  props?.pasien?.kdpoli === 'POL014'
    ? props?.pasien?.kamaroperasi
    : props?.pasien?.ok
)


function exportPdf() {
  const concern = document.getElementById('printMe')
  const nama = props?.pasien?.nama ?? props?.pasien?.pasien
  const pdfConfig = {
    margin: 0,
    filename: 'LAPORAN_OPERASI_' + props?.pasien?.noreg + '_' + nama + '_' + props?.pasien?.norm + '.pdf',
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
