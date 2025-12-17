<template>
  <template v-if="store.pendapatans?.length > 0 || store.belanjas?.length > 0">
    <div class="q-pa-sm full-width">
      <q-markup-table wrap-cells flat bordered :separator="separator">
        <thead>
          <tr class="bg-primary text-white max-width">
            <th colspan="2">PENDAPATAN</th>
            <th colspan="4">BELANJA</th>
          </tr>
          <tr class="bg-primary text-white max-width">
            <th>Kode Rekening</th>
            <th>Jumlah</th>
            <th colspan="2">Program/Kegiatan/Rekening</th>
            <th>Uraian</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.pendapatans" :key="item">
            <td>{{ item?.kode }}</td>
            <td class="text-right">Rp. {{ formattanpaRp(item?.total) }}</td>
            <td colspan="2">1.02.01</td>
            <td>Program Penunjang Urusan Pemerintahan Daerah Kabupaten/Kota</td>
            <td class="text-right">Rp. {{ formattanpaRp(totalBelanja()) }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td colspan="2">5-1.02.01.2.10</td>
            <td>Peningkatan Pelayanan BLUD</td>
            <td class="text-right">Rp. {{ formattanpaRp(totalBelanja()) }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td colspan="2">1.02.01.2.10.0001</td>
            <td>Pelayanan dan Penunjang Pelayanan BLUD</td>
            <td class="text-right">Rp. {{ formattanpaRp(totalBelanja()) }}</td>
          </tr>
          <tr v-for="(item, n) in store.belanjas" :key="n">
            <td></td>
            <td></td>
            <td style="width: 5px">{{ n + 1 }}. </td>
            <td> {{ item?.kode }} </td>
            <td> {{ item?.uraian }} </td>
            <td class="text-right"> Rp. {{ formattanpaRp(item?.total) }} </td>
          </tr>

          <tr>
            <td class="text-bold">JUMLAH</td>
            <td class="text-right text-bold">Rp. {{ formattanpaRp(totalPendapatan()) }}</td>
            <td class="text-right text-bold" colspan="3">JUMLAH</td>
            <td class="text-right text-bold">Rp. {{ formattanpaRp(totalBelanja()) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="row q-px-sm full-width justify-between">
      <q-markup-table class="flex-start" wrap-cells flat bordered :separator="separator">
        <thead>
          <tr class="bg-primary text-white max-width">
            <th colspan="2">PENERIMAAN PEMBIAYAAN</th>
            <th colspan="2">PENGELUARAN PEMBIAYAAN</th>
          </tr>
          <tr class="bg-primary text-white max-width">
            <th>Kode Rekening</th>
            <th>Jumlah</th>
            <th>Kode Rekening</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.pembiayaans" :key="item">
            <td> {{ item.kode }} </td>
            <td class="text-right">Rp. {{ formattanpaRp(item.total) }} </td>
            <td></td>
            <td class="text-right"> {{ formattanpaRp(0) }} </td>
          </tr>
          <tr>
            <td class="text-bold">JUMLAH</td>
            <td class="text-right text-bold">Rp. {{ formattanpaRp(totalPembiayaan()) }} </td>
            <td class="text-bold">JUMLAH</td>
            <td class="text-right text-bold"> {{ formattanpaRp(0) }} </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div class="flex-end justify-center content-center col full-width" v-for="it in tt.ttd" :key="it">
        <div class="text-center">Probolinggo, {{ store.tanggal }} </div>
        <div class="text-center q-pb-xl">Direktur RSUD Dokter Mohamad Saleh</div>
        <div class="text-center"> {{ it.nama }}
          <div class="garis-bawah" :style="{ width: it.nama?.length + 'ch' }"></div>
        </div>
        <div class="text-center"> NIP. {{ it.nip }} </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="row q-pa-md full-width text-subtitle1 flex-center">
      Belum Ada Data
    </div>
  </template>
</template>
<script setup>
import { formattanpaRp } from 'src/modules/formatter';
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar';
import { useSp3bStore } from 'src/stores/siasik/akuntansi/sp3b/sp3b';
import { onMounted, ref } from 'vue';

const store = useSp3bStore()
const tt = useBukubesarStore()
const separator = ref('cell')


onMounted(() => {
  tt.getTtd()
  console.log('tt', tt.getTtd())
  // store.getDataBukubesar()
})
function totalPendapatan() {
  const itu = store.pendapatans.map(x => x.total) || 0
  // console.log('pendapatanxxx', it)
  const it = itu?.length ? itu.reduce((a, b) => a + b, 0) : 0
  store.form.pendapatan = it
  return it
}
function totalBelanja() {
  const it = store.belanjas.map(x => parseFloat(x.total)).reduce((a, b) => a + b, 0) || 0
  // console.log('pendapatanxxx', it)
  store.form.realisasi = it
  return it
}

function totalPembiayaan() {
  const it = store.pembiayaans.map(x => parseFloat(x.total)).reduce((a, b) => a + b, 0) || 0
  // console.log('pendapatanxxx', it)
  store.form.pembiayaan = it
  return it
}

</script>
<style>
.garis-bawah {
  border-bottom: 1px solid black;
  /* Garis bawah */
  margin: 0 auto;
  /* Pusatkan garis */
  height: 1px;
  /* Tinggi garis */

}
</style>
