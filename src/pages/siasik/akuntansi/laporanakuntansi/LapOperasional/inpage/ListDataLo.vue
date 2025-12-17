<template>
  <template v-if="store.hasilpendapatan?.length > 0 && store.hasilbeban?.length > 0">
    <q-card-section>
      <div class="row">
        <div class="full-width">
          <q-markup-table class="custom-table" flat bordered wrap-cells :separator="separator">
            <thead>
              <tr class="bg-grey-4">
                <th>KODE REKENING</th>
                <th style="width: 70%;">
                  URAIAN
                </th>
                <th style="width: 20%;">
                  NILAI (Rp.)
                </th>
              </tr>
            </thead>
            <tbody v-if="store.reqs.levelberapa === 6">
              <tr v-for="it in store.hasilpendapatan" :key="it" :class="it.kode?.length <= 12 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH-LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan()) }}
                </td>
              </tr>
              <tr v-for="it in store.hasilbeban" :key="it" :class="it.kode?.length <= 12 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BEBAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBeban()) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusdefisit()) }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="store.reqs.levelberapa === 5">
              <tr v-for="it in store.hasilpendapatan" :key="it" :class="it.kode?.length <= 9 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH-LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan()) }}
                </td>
              </tr>
              <tr v-for="it in store.hasilbeban" :key="it" :class="it.kode?.length <= 9 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BEBAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBeban()) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusdefisit()) }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="store.reqs.levelberapa === 4">
              <tr v-for="it in store.hasilpendapatan" :key="it" :class="it.kode?.length <= 6 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH-LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan()) }}
                </td>
              </tr>
              <tr v-for="it in store.hasilbeban" :key="it" :class="it.kode?.length <= 6 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BEBAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBeban()) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusdefisit()) }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="store.reqs.levelberapa === 3">
              <tr v-for="it in store.hasilpendapatan" :key="it" :class="it.kode?.length <= 3 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH-LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan()) }}
                </td>
              </tr>
              <tr v-for="it in store.hasilbeban" :key="it" :class="it.kode?.length <= 3 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BEBAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBeban()) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusdefisit()) }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="store.reqs.levelberapa === 2 || store.reqs.levelberapa === 1">
              <tr v-for="it in store.hasilpendapatan" :key="it" :class="it.kode?.length <= 1 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH-LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan()) }}
                </td>
              </tr>
              <tr v-for="it in store.hasilbeban" :key="it" :class="it.kode?.length <= 1 ? 'text-bold' : ''">
                <td class="text-left">
                  {{ it.kode }}
                </td>
                <td class="text-left">
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BEBAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBeban()) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LO
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusdefisit()) }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
</template>
<script setup>
import { formattanpaRp } from 'src/modules/formatter'
import { useLaporanOperasionalStore } from 'src/stores/siasik/laporan/laporanoperasional/lapoperasional'
import { ref } from 'vue'

const store = useLaporanOperasionalStore()
const separator = ref('cell')

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
  font-weight: bold;
}

/* Mengatur warna garis pada sel data */
.custom-table td {
  border-color: #555555 !important;
}

/* Pastikan garis tidak dobel */
.custom-table table {
  border-collapse: collapse;
}

.custom-table thead tr {
  border-color: #555555 !important;
}
</style>
