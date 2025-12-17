<template>
  <div class="row justify-center">
    <div class="full-width q-px-sm">
      <q-markup-table class="custom-table" flat bordered wrap-cells :separator="separator">
        <thead>
          <tr class="max-width">
            <th class="text-bold">
              <span class="text-bold">NO</span>
            </th>
            <th width="150px">
              <span class="text-bold">TANGGAL</span>
            </th>
            <th width="220px">
              <span class="text-bold">REGISTER/REKENING</span>
            </th>
            <th width="530px">
              <span class="text-bold">URAIAN</span>
            </th>
            <th> <span class="text-bold">PENERIMAAN (Rp.)</span></th>
            <th><span class="text-bold">PENGELUARAN (Rp.)</span></th>
            <th><span class="text-bold">SALDO (Rp.)</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, n) in store.hasilArray" :key="item">
            <td>
              {{ n + 1 }}
            </td>
            <td>
              {{ item?.tgl }}
            </td>
            <td class="text-left">
              {{ item?.notrans }}
            </td>
            <td class="text-left">
              {{ item?.uraian }}
            </td>
            <td class="text-right">
              {{ formattanpaRp(item?.penerimaan) }}
            </td>
            <td class="text-right">
              {{ formattanpaRp(item?.pengeluaran) }}
            </td>
            <td class="text-right">
              {{ formattanpaRp(item?.total) }}
            </td>
          </tr>
          <tr class="bg-grey-2">
            <td colspan="4" class="text-center text-bold">
              TOTAL
            </td>
            <td class="text-right text-weight-bolder">
              {{ formattanpaRp(totaldebit()) }}
            </td>
            <td class="text-right text-weight-bolder">
              {{ formattanpaRp(totalkredit()) }}
            </td>
            <td class="text-right text-weight-bolder">
              {{ formattanpaRp(totalsaldo()) }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>
<script setup>
import { formattanpaRp } from 'src/modules/formatter';
import { useLaporanBkuPpkStore } from 'src/stores/siasik/laporan/bku/bkuppk';
import { ref } from 'vue';

const store = useLaporanBkuPpkStore()
const separator = ref('cell')
function totaldebit() {
  const debit = store.hasilArray
  // console.log("njaaias", debit);
  const totaldebit = debit?.length
    ? debit?.map((x) => x.penerimaan).reduce((x, y) => x + y, 0)
    : 0
  // console.log("debit", totaldebit);
  return totaldebit
}
function totalkredit() {
  const kredit = store.hasilArray
  // console.log("njaaias", debit);
  const totalkredit = kredit?.length
    ? kredit?.map((x) => x.pengeluaran).reduce((x, y) => x + y, 0)
    : 0
  // console.log("debit", totaldebit);
  return totalkredit
}

function totalsaldo() {
  const saldo = store.hasilArray
  // console.log("njaaias", debit);
  const totalsaldo = saldo?.length
    ? saldo?.map((x) => x.penerimaan).reduce((x, y) => x + y, 0) -
    saldo?.map((x) => x.pengeluaran).reduce((x, y) => x + y, 0)
    : 0
  // console.log("debit", totaldebit);
  store.saldoakhir = totalsaldo
  return totalsaldo
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
  background: #ffed86;
  border-color: #555555 !important;
}
</style>
