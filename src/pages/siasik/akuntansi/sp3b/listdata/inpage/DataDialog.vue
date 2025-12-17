<template>
  <div class="col full-width">
    <div class="row b content-center full-width q-py-xs q-px-md q-pb-xs">
      <div class="col-2 text-weight-bold">
        Kepala SKPD
      </div>
      <div class="col-auto q-pr-sm">
        :
      </div>
      <div class="col-auto">
        DINAS KESEHATAN, PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA
      </div>
    </div>
    <div class="row b full-width content-center q-py-xs q-px-md q-pb-xs">
      <div class="col-2 text-weight-bold">
        Memohon Kepada
      </div>
      <div class="col-auto q-pr-sm">
        :
      </div>
      <div class="col-auto">
        Bendahara Umum Daerah selaku PPKD
      </div>
    </div>
    <div class="row b4 content-center q-py-xs q-px-md q-pb-xs">
      <div class="col-auto">
        Agar mengesahkan dan membukukan pendapatan, belanja dan pelayanan BLUD sejumlah
      </div>
    </div>
    <div class="b q-pl-md q-py-xs ">
      <div class="row content-center q-pb-xs">
        <div class="col-3 text-weight-bold">
          1. Saldo Bulan Sebelumnya
        </div>
        <div class="col-auto q-pr-sm">
          :
        </div>
        <div class="col-auto">
          Rp.
        </div>
        <div class="text-right col-2">
          {{ formattanpaRp(store.viewData?.saldoawal) }}
        </div>
      </div>
      <div class="row content-center q-pb-xs">
        <div class="col-3 text-weight-bold">
          2. Pendapatan
        </div>
        <div class="col-auto q-pr-sm">
          :
        </div>
        <div class="col-auto">
          Rp.
        </div>
        <div class="text-right col-2">
          {{ formattanpaRp(store.viewData?.pendapatan) }}
        </div>
      </div>
      <div class="row content-center q-pb-xs">
        <div class="col-3 text-weight-bold">
          3. Belanja
        </div>
        <div class="col-auto q-pr-sm">
          :
        </div>
        <div class="col-auto">
          Rp.
        </div>
        <div class="text-right col-2">
          {{ formattanpaRp(store.viewData?.realisasi) }}
        </div>
      </div>
      <div class="row content-center q-pb-xs">
        <div class="col-3 text-weight-bold">
          4. Pembiayaan Netto
        </div>
        <div class="col-auto q-pr-sm">
          :
        </div>
        <div class="col-auto">
          Rp.
        </div>
        <div class="text-right col-2">
          {{ formattanpaRp(store.viewData?.pembiayaan) }}
        </div>
      </div>
      <div class="row content-center q-pb-xs">
        <div class="col-3 text-weight-bold">
          5. Penyesuaian
        </div>
        <div class="col-auto q-pr-sm">
          :
        </div>
        <div class="col-auto">
          Rp.
        </div>
        <div class="text-right col-2">
          {{ formattanpaRp(0) }}
        </div>
      </div>
      <div class="row content-center q-pb-xs">
        <div class="col-3 text-weight-bold">
          6. Saldo Bulan Berkenaan
        </div>
        <div class="col-auto q-pr-sm">
          :
        </div>
        <div class="col-auto">
          Rp.
        </div>
        <div class="text-right col-2">
          {{ formattanpaRp(totalsaldoAkhir()) }}
        </div>
      </div>
    </div>
    <div class="row b4 content-center q-py-xs q-px-md q-pb-xs">
      <div class="col-3 text-weight-bold">
        Untuk Bulan
      </div>
      <div class="col-auto q-pr-sm">
        :
      </div>
      <div class="col-2">
        {{ setBulan() }}
      </div>
      <div class="col-3 q-pl-xl text-weight-bold">
        Tahun Anggaran
      </div>
      <div class="col-auto q-pr-sm">
        :
      </div>
      <div class="col-2">
        {{ setTahun() }}
      </div>
    </div>
    <div class="row justify-between full-width full-height ">
      <div class="row" style="width:100%">
        <table class="items-center full-width">
          <thead>
            <tr>
              <th>
                Dasar Pengesahan:
              </th>
              <th>
                Urusan
              </th>
              <th>
                Organisasi
              </th>
              <th>
                Nama BLUD
              </th>
            </tr>
          </thead>
          <tbody class="align-middle">
            <tr>
              <td>
                Dokumen Pelaksanaan Anggaran Tahun {{ setTahun() }}
              </td>
              <td>
                1.02 URUSAN PEMERINTAHAN BIDANG KESEHATAN
              </td>
              <td>
                1.02.2.14.0.00.03.0000 DINAS KESEHATAN PENGENDALIAN PENDUDUK DAN KB
              </td>
              <td>
                1.02.2.14.0.00.03.0301 RSUD DR MOH SALEH
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row b justify-center text-bold q-py-xs q-pb-xs">
      Program, Kegiatan
    </div>
    <div class="row b4 justify-center q-py-xs q-pb-xs">
      <span class="q-pr-md">1.02.01 Program Penunjang Urusan Pemerintahan Daerah Kabupaten/Kota </span>
      <span>1.02.01.2.10 Peningkatan Pelayanan BLUD </span>
    </div>
  </div>
  <div class="row justify-between full-width full-height ">
    <div style="width:100%">
      <table class="items-center full-width">
        <thead>
          <tr>
            <th colspan="2" style="width: 50%">Pendapatan</th>
            <th colspan="2" style="width: 50%">Belanja</th>
          </tr>
          <tr>
            <th style="width: 30%">Kode Rekening</th>
            <th>Jumlah</th>
            <th style="width: 30%">Kode Rekening</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody class="align-middle">
          <tr v-for="index in maxLength" :key="index">
            <td>{{ cariDataPendapatan[index - 1]?.kode || '-' }} - {{ cariDataPendapatan[index - 1]?.uraian || '-' }}
            </td>
            <td class="text-right">
              {{ cariDataPendapatan[index - 1]?.total ? `Rp. ${formattanpaRp(cariDataPendapatan[index - 1].total)}` :
                '-' }}
            </td>
            <td>{{ cariDataBelanja[index - 1]?.kode || '-' }} - {{ cariDataBelanja[index - 1]?.uraian || '-' }}</td>
            <td class="text-right">
              {{ cariDataBelanja[index - 1]?.total ? `Rp. ${formattanpaRp(cariDataBelanja[index - 1].total)}` : '-' }}
            </td>
          </tr>
          <tr>
            <td class="text-bold">Jumlah Pendapatan</td>
            <td class="text-right text-bold">Rp. {{ formattanpaRp(store.viewData?.pendapatan) }}</td>
            <td class="text-bold">Jumlah Belanja</td>
            <td class="text-right text-bold">Rp. {{ formattanpaRp(store.viewData?.realisasi) }}</td>
          </tr>
          <tr v-if="maxLength === 0">
            <td colspan="4" class="text-center">Tidak ada data tersedia</td>
          </tr>
        </tbody>
      </table>
      <div class="b4 q-py-sm"></div>
      <div style="width:100%">
        <table class="items-center full-width">
          <thead>
            <tr class="max-width">
              <th colspan="2" style="width: 50%" class="text-bold">Penerimaan Pembiayaan</th>
              <th colspan="2" style="width: 50%" class="text-bold">Pengeluaran Pembiayaan</th>
            </tr>
            <tr class="max-width">
              <th class="text-bold" style="width: 25%">Kode Rekening</th>
              <th class="text-bold">Jumlah</th>
              <th class="text-bold" style="width: 25%">Kode Rekening</th>
              <th class="text-bold">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cariDataPembiayaan.length === 0">
              <tr>
                <td>-</td>
                <td class="text-right">Rp. {{ formattanpaRp(0) }}</td>
                <td>-</td>
                <td class="text-right">Rp. {{ formattanpaRp(0) }}</td>
              </tr>
            </template>
            <!-- Tampilkan data jika ada -->
            <template v-else>
              <tr v-for="item in cariDataPembiayaan" :key="item.kode">
                <td>{{ item.kode }} - {{ item.uraian }} </td>
                <td class="text-right">Rp. {{ formattanpaRp(item.total) }}</td>
                <td>-</td>
                <td class="text-right">Rp. {{ formattanpaRp(0) }}</td>
              </tr>
            </template>
            <tr>
              <td class="text-bold">Jumlah Penerimaan Pembiayaan</td>
              <td class="text-right text-bold">Rp. {{ formattanpaRp(store.viewData?.pembiayaan) }} </td>
              <td class="text-bold">Jumlah Pengeluaran Pembiayaan</td>
              <td class="text-right text-bold">Rp. {{ formattanpaRp(0) }} </td>
            </tr>
            <tr>
              <td colspan="4" class="q-pa-sm"></td>
            </tr>
            <tr>
              <td class="text-bold">Jumlah Penyesuaian Lebih</td>
              <td class="text-right text-bold">Rp. {{ formattanpaRp(0) }} </td>
              <td class="text-bold">Jumlah Penyesuaian Kurang</td>
              <td class="text-right text-bold">Rp. {{ formattanpaRp(0) }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- <div class="q-px-sm full-width">
    <q-markup-table class="custom-table" wrap-cells flat bordered :separator="separator">
      <thead>
        <tr class="max-width">
          <th colspan="2"><span class="text-bold">PENDAPATAN</span></th>
          <th colspan="4"><span class="text-bold">BELANJA</span></th>
        </tr>
        <tr>
          <th>
            <span class="text-bold">Kode Rekening</span>
          </th>
          <th style="width: 20%"><span class="text-bold">Jumlah</span></th>
          <th colspan="2"><span class="text-bold">Program/Kegiatan/Rekening</span></th>
          <th><span class="text-bold">Uraian</span></th>
          <th style="width: 20%"><span class="text-bold">Jumlah</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cariDataPendapatan" :key="item">
          <td>{{ item?.kode }}</td>
          <td class="text-right">Rp. {{ formattanpaRp(item?.total) }}</td>
          <td colspan="2">1.02.01</td>
          <td>Program Penunjang Urusan Pemerintahan Daerah Kabupaten/Kota</td>
          <td class="text-right">Rp. {{ formattanpaRp(store.viewData?.realisasi) }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td colspan="2">5-1.02.01.2.10</td>
          <td>Peningkatan Pelayanan BLUD</td>
          <td class="text-right">Rp. {{ formattanpaRp(store.viewData?.realisasi) }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td colspan="2">1.02.01.2.10.0001</td>
          <td>Pelayanan dan Penunjang Pelayanan BLUD</td>
          <td class="text-right">Rp. {{ formattanpaRp(store.viewData?.realisasi) }}</td>
        </tr>
        <tr v-for="(item, n) in cariDataBelanja" :key="n">
          <td></td>
          <td></td>
          <td style="width: 5px">{{ n + 1 }}. </td>
          <td> {{ item?.kode }} </td>
          <td> {{ item?.uraian }} </td>
          <td class="text-right"> Rp. {{ formattanpaRp(item?.total) }} </td>
        </tr>

        <tr>
          <td class="text-bold">JUMLAH</td>
          <td class="text-right text-bold">Rp. {{ formattanpaRp(store.viewData?.pendapatan) }}</td>
          <td class="text-right text-bold" colspan="3">JUMLAH</td>
          <td class="text-right text-bold">Rp. {{ formattanpaRp(store.viewData?.realisasi) }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div> -->
  <div class="row q-px-sm q-py-md full-width justify-between">
    <div class="col flex-start"></div>
    <div class="flex-end justify-center content-center col full-width" v-for="it in tt.ttd" :key="it">
      <div class="text-center">Probolinggo, {{ dateFullFormat(store.viewData.tanggal) }} </div>
      <div class="text-center text-bold q-pb-xl">Direktur RSUD Dokter Mohamad Saleh</div>
      <div class="text-center text-bold"> {{ it.nama }}
        <div class="garis-bawah" :style="{ width: it.nama?.length + 'ch' }"></div>
      </div>
      <div class="text-center"> NIP. {{ it.nip }} </div>
    </div>
  </div>
</template>
<script setup>
import { dateFullFormat, formattanpaRp } from 'src/modules/formatter';
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar';
import { useSp3bStore } from 'src/stores/siasik/akuntansi/sp3b/sp3b';
import { computed, ref, watch } from 'vue';
import { onMounted } from 'vue';

const tt = useBukubesarStore()
const store = useSp3bStore()
const separator = ref('cell')
onMounted(() => {
  tt.getTtd()
  // store.getDataBukubesar()
})
function totalsaldoAkhir() {
  console.log('pendapatanxxx', store.viewData)
  const pendp = store.viewData.pendapatan || 0
  const blj = store.viewData.realisasi || 0
  const biaya = store.viewData.pembiayaan || 0
  const saldoawal = store.viewData.saldoawal || 0
  // console.log('pendapatanxxx', pendp)
  const it = parseFloat(saldoawal) + (parseFloat(pendp) - parseFloat(blj)) + parseFloat(biaya)
  return it
}

function setBulan() {
  const tanggal = store.viewData.bulan_realisasi
  const date = new Date(tanggal);
  const bulan = date.toLocaleString('id-ID', { month: 'long' });
  return bulan
}
function setTahun() {
  const tanggal = store.viewData.bulan_realisasi
  const date = new Date(tanggal);
  const bulan = date.getFullYear();
  return bulan
}
// Computed properties dengan debugging rinci
const cariDataPendapatan = computed(() => {
  const pendapatan = store.viewData?.rincians?.filter(item => item.keterangan === 'PENDAPATAN') || [];

  return pendapatan;
});

const cariDataBelanja = computed(() => {
  const belanja = store.viewData?.rincians?.filter(item => item.keterangan === 'REALISASI') || [];

  return belanja;
});

const cariDataPembiayaan = computed(() => {
  const pembiayaan = store.viewData?.rincians?.filter(item => item.keterangan === 'PEMBIAYAAN') || [];
  return pembiayaan;
});

const maxLength = computed(() => {
  const pendapatanLength = Array.isArray(cariDataPendapatan.value) ? cariDataPendapatan.value.length : 0;
  const belanjaLength = Array.isArray(cariDataBelanja.value) ? cariDataBelanja.value.length : 0;
  const length = Math.max(pendapatanLength, belanjaLength);
  console.log('maxLength:', length, 'pendapatanLength:', pendapatanLength, 'belanjaLength:', belanjaLength);
  return length;
});

// Watch untuk memantau perubahan store.viewData
watch(() => store.viewData, (newData) => {
  console.log('watch - store.viewData updated:', newData);
  console.log('watch - rincians updated:', newData?.rincians);
}, { deep: true });
</script>

<style scoped>
/* Mengatur warna garis pada seluruh tabel termasuk garis luar */
.custom-table {
  border-color: #555555 !important;
}

/* Menargetkan tabel di dalam komponen q-markup-table */
.custom-table table {
  border-color: #555555 !important;
}

/* Mengatur warna garis pada sel header */
.custom-table th {
  border-color: #555555 !important;
}

/* Mengatur warna garis pada sel data */
.custom-table td {
  border-color: #555555 !important;
}

/* Pastikan garis tidak dobel */
.custom-table table {
  border-collapse: collapse;
}

.b {
  border-right-style: solid;
  border-left-style: solid;
  border-bottom-style: solid;
  border-width: 2px;
}

.b1 {
  border-style: solid;
  border-width: 2px;
}

.b2 {
  border-right-style: solid;
  border-width: 2px;
}

.b3 {
  border-bottom-style: solid;
  border-width: 2px;
}

.b4 {
  border-right-style: solid;
  border-left-style: solid;
  border-width: 2px;
}

table {
  border-color: black;
}

table,
th,
td {
  border-width: 2px;
  border-style: solid;
  border-collapse: collapse;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
