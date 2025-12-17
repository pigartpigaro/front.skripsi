<template>
  <!-- <div class="q-pa-sm">
    <app-input v-model="store.reqs.nosp3b" label="Nomor SP3B" outlined />
  </div> -->
  <div class="q-pa-sm">
    <app-autocomplete v-model="store.reqs.bulan" label="Pilih Bulan" autocomplete="nama" option-label="nama"
      option-value="value" outlined :source="store.bulans" />
  </div>
  <div class="q-pa-sm">
    <app-input v-model="store.reqs.tahun" label="Tahun" outlined />
  </div>
  <div class="q-pa-sm">
    <app-input-date-human :model="store.tanggal" label="Tanggal Cetak" outlined :disable="store.loading"
      :loading="store.loading" @db-model="tanggal" @set-display="setTanggal" />
  </div>
  <div class="q-pa-sm">
    <app-btn label="Cek Data" :disable="store.loading" :loading="store.loading" @click="ambilData()" />
  </div>
  <div class="q-pa-sm">
    <app-btn label="Simpan SP3B" color="warning" class="text-teal-9 text-weight-bold" :disable="store.loadingsave"
      :loading="store.loadingsave" @click="store.create()" />
  </div>
</template>
<script setup>
import { useSp3bStore } from 'src/stores/siasik/akuntansi/sp3b/sp3b';

const store = useSp3bStore()

function ambilData() {
  store.getData()
}
function tanggal(val) {
  store.form.tanggal = val
  console.log('tgl', val)
}
function setTanggal(val) {
  store.tanggal = val
}

// function setBulan(val) {
//   store.bulan = val
// }
// function setTahun(val) {
//   store.tahun = val
// }

</script>
