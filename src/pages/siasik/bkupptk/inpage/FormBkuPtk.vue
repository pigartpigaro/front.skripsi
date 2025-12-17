<template>
  <div class="row full-width justify-center">
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete v-model="store.params.bulan" label="Pilih Bulan" autocomplete="nama" option-label="nama"
        option-value="value" outlined :source="store.bulans" @update:model-value="store.hasilArray = []" />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-input v-model="store.params.tahun" label="Tahun" outlined @update:model-value="(val) => {
        console.log('Tahun berapa?', val)
        store.params.ptk = ''
        store.getPtks()
        store.loading = false
        store.hasilArray = []
      }" />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete v-model="store.params.ptk" :loading="store.loadingptk" label="Pilih PTK" autocomplete="nama"
        option-label="nama" option-value="nip" outlined :source="store.ptks" @selected="(val) => {
          const pilihptk = store.ptks?.filter((x) => x.nip === val)
          store.pilihptk = pilihptk
        }" />
    </div>
    <div class="q-pa-sm">
      <app-btn label="Ambil Data" :loading="store.loading" @click="ambilData()" />
    </div>
    <div class="q-pa-sm">
      <q-btn icon="icon-mat-print" color="orange" round size="sm" :loading="store.loading" @click="cetakData()">
        <q-tooltip class="bg-orange" :offset="[10, 10]">
          Cetak
        </q-tooltip>
      </q-btn>
    </div>
  </div>
  <cetak-bkuppk v-model="store.dialogCetak" :printpdf="printpdf" />
</template>
<script setup>
import { useLaporanBkuPtkStore } from 'src/stores/siasik/laporan/bku/bkuptk';
import { defineAsyncComponent } from 'vue';
import { ref } from 'vue';
const CetakBkuppk = defineAsyncComponent(() => import('./PrintPdf.vue'))

const store = useLaporanBkuPtkStore()

const printpdf = ref(null)
function ambilData() {
  // store.hitungharidalamBulan();
  store.getDataTable()
}

function cetakData() {
  store.dialogCetak = true
}
</script>
