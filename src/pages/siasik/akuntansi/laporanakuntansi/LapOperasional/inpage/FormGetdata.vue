<template>
  <div class="row full-width justify-center">
    <!-- <div class="q-pa-sm" style="width:25%">
      <app-autocomplete v-model="refJenis" label="Pilih Jenis LO" autocomplete="nama" option-value="value"
        option-label="nama" outlined :disable="store.loading" :loading="store.loading" :source="store.jenis"
        @update:model-value="(val) => {
          const valx = parseInt(val)
          store.reqs.jenislo = valx
          refData = ''
          store.reqs.levelberapa = ''
        }" />
    </div> -->
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete v-model="refData" label="Pilih Jenis Rekening" autocomplete="nama" option-value="value"
        option-label="nama" outlined :disable="store.loading || store.reqs.jenislo === 2" :loading="store.loading"
        :source="store.level" @update:model-value="(val) => {
          const aa = parseInt(val)
          store.reqs.levelberapa = aa
          store.hasilpendapatan = []
          store.hasilbeban = []
          console.log('lvl', store.reqs.levelberapa)
        }" />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-input-date-human :model="store.reqs.tgl" label="dari tangal" outlined :disable="store.loading"
        :loading="store.loading" @db-model="tglDari" @set-display="setDari" />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-input-date-human :model="store.reqs.tglx" label="sampai tangal" outlined :disable="store.loading"
        :loading="store.loading" @db-model="tglSampai" @set-display="setSampai" />
    </div>
    <div class="row full-width justify-center">
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
      <div class="q-pa-sm">
        <q-btn icon="icon-mat-download" color="green" round size="sm" push :disable="store.loading"
          :loading="store.loading" @click="exportToExcel">
          <q-tooltip class="bg-green" :offset="[10, 10]">
            Export to Excel
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
  <cetak-lo v-model="store.dialogCetak" :printlo="printlo" />
</template>
<script setup>
import { useQuasar } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
import { useLaporanOperasionalStore } from 'src/stores/siasik/laporan/laporanoperasional/lapoperasional'
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, ref } from 'vue'
import * as XLSX from 'xlsx'
const CetakLo = defineAsyncComponent(() => import('../printLO/PrintDataLo.vue'))
const $q = useQuasar()
const store = useLaporanOperasionalStore()
const refJenis = ref('')
const refData = ref('')
// onMounted(() => {
//   Promise.all([
//     store.getDataLap()
//     // store.getDataBukubesar()
//   ])
// })
function ambilData() {
  if (refData.value === '') {
    notifErrVue('Harap Pilih Jenis Rekening Dulu!')
  } else {
    store.getDataLap()
  }
}
function tglDari(val) {
  store.setParameter('tgl', val)
}
function setDari(val) {
  store.display.dari = val
}
function tglSampai(val) {
  store.setParameter('tglx', val)
}
function setSampai(val) {
  store.display.sampai = val
}
// eslint-disable-next-line no-unused-vars
const printlo = ref(null)
function cetakData() {
  store.dialogCetak = true
}
async function exportToExcel() {
  if (!store.hasilpendapatan?.length && !store.hasilbeban?.length) {
    notifErrVue('Tidak ada data untuk diekspor!');
    return;
  }

  // Siapkan data untuk Excel
  const data = [];

  // Header tabel
  const headers = [
    'KODE REKENING',
    'URAIAN',
    'NILAI (Rp.)',
  ];
  data.push(headers);


  // Data Pendapatan
  store.hasilpendapatan.forEach((item) => {
    data.push([
      item.kode,
      item.uraian,
      item.nilai,
    ])
  });

  // Tambahkan total Pendapatan (tebal)
  data.push([
    '',
    'JUMLAH PENDAPATAN DAERAH-LO',
    totalPendapatan(),
  ])

  // Data Beban
  store.hasilbeban.forEach((item) => {
    data.push([
      item.kode,
      item.uraian,
      item.nilai,
    ])
  });

  // Tambahkan total Pendapatan (tebal)
  data.push([
    '',
    'JUMLAH BEBAN DAERAH',
    totalBeban(),
  ])


  // Surplus/Defisit
  data.push([
    '',
    'SURPLUS / DEFISIT LO',
    surplusdefisit(),
  ])

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'LO');

  // Atur lebar kolom (opsional)
  const colWidths = data[0].map((_, colIndex) => {
    return Math.max(
      ...data.map((row) => (row[colIndex] ? row[colIndex].toString()?.length : 0)),
      10
    );
  });
  worksheet['!cols'] = colWidths.map((width) => ({ wch: width }));

  // Download file Excel
  XLSX.writeFile(workbook, `LO_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

function totalPendapatan() {
  const totalpend = store.hasilpendapatan.map((x) => x.nilai)[0]
  return totalpend
}
function totalBeban() {
  const totalbeban = store.hasilbeban.map((x) => x.nilai)[0]
  return totalbeban
}

function surplusdefisit() {
  const totalpend = store.hasilpendapatan.map((x) => x.nilai)[0]
  const totalbeban = store.hasilbeban.map((x) => x.nilai)[0]
  return totalpend - totalbeban
}
</script>
