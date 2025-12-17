<template>
  <div class="row justify-center full-width">
    <!-- <div class="q-pa-sm" style="width:25%">
      <app-autocomplete
        v-model="refJenis"
        label="Pilih Jenis LRA"
        autocomplete="nama"
        option-value="value"
        option-label="nama"
        outlined
        :disable="store.loading"
        :loading="store.loading"
        :source="store.jenis"
        @update:model-value="(val)=>{
          const valx = parseInt(val)
          store.reqs.jenislra = valx
          refData = ''
          store.reqs.levelberapa = ''
        }"
      />
    </div> -->
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete v-model="refData" label="Pilih Rekening" autocomplete="nama" option-value="value"
        option-label="nama" outlined :disable="store.loading" :loading="store.loading" :source="store.level"
        :key="ambilData" @update:model-value="(val) => {
          const valx = parseInt(val)
          store.reqs.levelberapa = valx
          store.hasilpendapatan = []
          store.hasilbelanja = []
          store.hasilsilpa = []
          console.log('ref', store.reqs.levelberapa)
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
  <cetak-lra v-model="store.dialogCetak" :printlra="printlra" />
</template>
<script setup>
import { useQuasar } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
import { useLRAjurnalStore } from 'src/stores/siasik/laporan/lra/lrajurnal.'
import { ref, defineAsyncComponent } from 'vue'
import * as XLSX from 'xlsx'


const CetakLra = defineAsyncComponent(() => import('../printLRA/PrintDataLra.vue'))
const store = useLRAjurnalStore()
const $q = useQuasar()
// Model berdasarkan ref agar tidak updte
// const berdasar = ref('')
const refJenis = ref('')
const refData = ref('')

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
function ambilData() {
  if (refData.value === '') {
    notifErrVue('Harap Pilih Jenis Rekening Dulu!')
  } else {
    store.getDataLap()
  }

}
const printlra = ref(null)
function cetakData() {
  store.dialogCetak = true
}

function exportToExcel() {
  if (!store.hasilpendapatan?.length && !store.hasilbelanja?.length && !store.hasilsilpa?.length) {
    notifErrVue('Tidak ada data untuk diekspor!');
    return;
  }

  // Siapkan data untuk Excel
  const data = [];

  // Header tabel
  const headers = [
    'KODE REKENING',
    'URAIAN',
    'PAGU (Rp.)',
    'REALISASI SEBELUMNYA (Rp.)',
    'REALISASI SAAT INI (Rp.)',
    'REALISASI SELURUHNYA (Rp.)',
    'SISA ANGGARAN (Rp.)',
    'PERSENTASE (%)',
  ];
  data.push(headers);

  // Data Pendapatan
  store.hasilpendapatan.forEach((item) => {
    data.push([
      item.kode,
      item.uraian,
      item.pagupend,
      item.nilaisblm,
      item.nilaiskg,
      item.nilaisemua,
      item.selisih,
      item.persen,
    ]);
  });

  // Total Pendapatan
  data.push([
    '',
    'JUMLAH PENDAPATAN DAERAH',
    totalPendapatan().totalpend,
    totalPendapatan().totalsblm,
    totalPendapatan().totalskg,
    totalPendapatan().totalsemua,
    totalPendapatan().totalselisih,
    totalPendapatan().totalpersen,
  ]);

  // Data Belanja
  store.hasilbelanja.forEach((item) => {
    data.push([
      item.kode,
      item.uraian,
      item.pagu,
      item.nilaisblm,
      item.nilaiskg,
      item.nilaisemua,
      item.selisih,
      item.persen,
    ]);
  });

  // Total Belanja
  data.push([
    '',
    'JUMLAH BELANJA DAERAH',
    totalBelanja().totalpagu,
    totalBelanja().totalsblm,
    totalBelanja().totalskg,
    totalBelanja().totalsemua,
    totalBelanja().totalselisih,
    totalBelanja().totalpersen,
  ]);

  // Surplus/Defisit
  data.push([
    '',
    'SURPLUS / DEFISIT LRA',
    surplusDefisit().totalpagu,
    surplusDefisit().totalsblm,
    surplusDefisit().totalskg,
    surplusDefisit().totalsemua,
    surplusDefisit().totalselisih,
    surplusDefisit().totalpersen,
  ]);

  // Data Silpa
  store.hasilsilpa.forEach((item) => {
    data.push([
      item.kode,
      item.uraian,
      item.pagu,
      item.nilaisblm,
      item.nilaiskg,
      item.nilaisemua,
      item.selisih,
      item.persen,
    ]);
  });

  // Total Silpa
  data.push([
    '',
    'TOTAL PEMBIAYAAN (NETTO)',
    totalSilpa().totalpagu,
    totalSilpa().totalsblm,
    totalSilpa().totalskg,
    totalSilpa().totalsemua,
    totalSilpa().totalselisih,
    totalSilpa().totalpersen,
  ]);

  // Sisa Lebih
  data.push([
    '',
    'SISA LEBIH PEMBIAYAAN ANGGARAN (SILPA)',
    sisaLebih().totalpagu,
    sisaLebih().totalsblm,
    sisaLebih().totalskg,
    sisaLebih().totalsemua,
    sisaLebih().totalselisih,
    sisaLebih().totalpersen,
  ]);

  // Buat workbook dan worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'LRA');

  // Atur lebar kolom (opsional)
  const colWidths = data[0].map((_, colIndex) => {
    return Math.max(
      ...data.map((row) => (row[colIndex] ? row[colIndex].toString()?.length : 0)),
      10
    );
  });
  worksheet['!cols'] = colWidths.map((width) => ({ wch: width }));

  // Download file Excel
  XLSX.writeFile(workbook, `LRA_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
}


function totalPendapatan() {
  const totalpend = store.hasilpendapatan.map((x) => x.pagupend)[0]
  const totalsblm = store.hasilpendapatan.map((x) => x.nilaisblm)[0]
  const totalskg = store.hasilpendapatan.map((x) => x.nilaiskg)[0]
  const totalsemua = store.hasilpendapatan.map((x) => x.nilaisemua)[0]
  const totalselisih = store.hasilpendapatan.map((x) => x.selisih)[0]
  const totalpersen = store.hasilpendapatan.map((x) => x.persen)[0]
  return {
    totalpend,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}
function totalBelanja() {
  const totalpagu = store.hasilbelanja.map((x) => x.pagu)[0]
  const totalsblm = store.hasilbelanja.map((x) => x.nilaisblm)[0]
  const totalskg = store.hasilbelanja.map((x) => x.nilaiskg)[0]
  const totalsemua = store.hasilbelanja.map((x) => x.nilaisemua)[0]
  const totalselisih = store.hasilbelanja.map((x) => x.selisih)[0]
  const totalpersen = store.hasilbelanja.map((x) => x.persen)[0]
  return {
    totalpagu,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}
function totalSilpa() {
  const totalpagu = store.hasilsilpa.map((x) => x.pagu)[0]
  const totalsblm = store.hasilsilpa.map((x) => x.nilaisblm)[0]
  const totalskg = store.hasilsilpa.map((x) => x.nilaiskg)[0]
  const totalsemua = store.hasilsilpa.map((x) => x.nilaisemua)[0]
  const totalselisih = store.hasilsilpa.map((x) => x.selisih)[0]
  const totalpersen = store.hasilsilpa.map((x) => x.persen)[0]
  return {
    totalpagu,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}
function surplusDefisit() {
  const totalpagu = store.hasilpendapatan.map((x) => x.pagupend)[0] - store.hasilbelanja.map((x) => x.pagu)[0]
  const totalsblm = store.hasilpendapatan.map((x) => x.nilaisblm)[0] - store.hasilbelanja.map((x) => x.nilaisblm)[0]
  const totalskg = store.hasilpendapatan.map((x) => x.nilaiskg)[0] - store.hasilbelanja.map((x) => x.nilaiskg)[0]
  const totalsemua = store.hasilpendapatan.map((x) => x.nilaisemua)[0] - store.hasilbelanja.map((x) => x.nilaisemua)[0]
  const totalselisih = store.hasilpendapatan.map((x) => x.selisih)[0] - store.hasilbelanja.map((x) => x.selisih)[0]
  const totalpersen = store.hasilpendapatan.map((x) => x.persen)[0] - store.hasilbelanja.map((x) => x.persen)[0]
  return {
    totalpagu,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}
function sisaLebih() {
  const totalpagu = (store.hasilpendapatan.map((x) => x.pagupend)[0] - store.hasilbelanja.map((x) => x.pagu)[0]) + store.hasilsilpa.map((x) => x.pagu)[0]
  const totalsblm = (store.hasilpendapatan.map((x) => x.nilaisblm)[0] - store.hasilbelanja.map((x) => x.nilaisblm)[0]) + store.hasilsilpa.map((x) => x.nilaisblm)[0]
  const totalskg = (store.hasilpendapatan.map((x) => x.nilaiskg)[0] - store.hasilbelanja.map((x) => x.nilaiskg)[0]) + store.hasilsilpa.map((x) => x.nilaiskg)[0]
  const totalsemua = (store.hasilpendapatan.map((x) => x.nilaisemua)[0] - store.hasilbelanja.map((x) => x.nilaisemua)[0]) + store.hasilsilpa.map((x) => x.nilaisemua)[0]
  const totalselisih = (store.hasilpendapatan.map((x) => x.selisih)[0] - store.hasilbelanja.map((x) => x.selisih)[0]) + store.hasilsilpa.map((x) => x.selisih)[0]
  const totalpersen = (store.hasilpendapatan.map((x) => parseFloat(x.persen))[0] - store.hasilbelanja.map((x) => parseFloat(x.persen))[0]) + store.hasilsilpa.map((x) => parseFloat(x.persen))[0]
  return {
    totalpagu,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}

</script>
