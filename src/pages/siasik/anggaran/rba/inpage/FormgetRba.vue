<template>
  <div class="row full-width justify-center">
    <div class="q-pa-sm" style="width:30%">
      <app-autocomplete v-model="store.reqs.jenis" label="Pilih Jenis RBA" autocomplete="jenis" option-label="jenis"
        option-value="value" outlined :source="store.jenis" @selected="() => { store.items = [] }" />
    </div>
    <div class=" q-pa-sm" style="width:25%">
      <app-input v-model="store.reqs.tahun" label="Tahun" outlined />
    </div>
    <div class="q-pa-sm" style="width:30%">
      <app-input-date-human :model="store.tglcetak" label="Tanggal Cetak" outlined @set-display="setTglcetak"
        :disable="store.loading" />
    </div>
    <div class="q-pa-sm">
      <app-btn label="Ambil Data" :disable="store.loading" :loading="store.loading" @click="ambilData()" />
    </div>
    <div class="q-pa-sm">
      <q-btn icon="icon-mat-print" color="orange" round size="sm" :disable="store.loading" :loading="store.loading"
        @click="cetakData()">
        <q-tooltip class="bg-orange" :offset="[10, 10]">
          Cetak
        </q-tooltip>
      </q-btn>
    </div>
  </div>
  <cetak-rba v-model="store.dialogCetak" :printrba="printrba" />
</template>
<script setup>
import { useRbaStore } from 'src/stores/siasik/anggaran/storerba';
import { defineAsyncComponent, ref } from 'vue';
const CetakRba = defineAsyncComponent(() => import('./CetakRba.vue'))

const store = useRbaStore()
function setTglcetak(val) {
  store.tglcetak = val
}

function ambilData() {
  // console.log('ambil Data')
  store.getData()
}
const printrba = ref(null)
function cetakData() {
  store.dialogCetak = true
}
</script>
