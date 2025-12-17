<template>

  <div class="row q-px-md full-width flex-center">
    <q-markup-table class="custom-table" flat bordered style="width: 100%;" wrap-cells :separator="separator">
      <thead>
        <tr class="text-bold">
          <th class="text-center" style="font-size: 12px">NO</th>
          <th class="text-center" style="font-size: 12px">TANGGAL</th>
          <th class="text-center" style="font-size: 12px">REGISTER/REKENING</th>
          <th class="text-center" style="font-size: 12px">URAIAN</th>
          <th class="text-center" style="font-size: 12px">PENERIMAAN (Rp.)</th>
          <th class="text-center" style="font-size: 12px">PENGELUARAN (Rp.)</th>
          <th class="text-center" style="font-size: 12px">SALDO (Rp.)</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, n) in store.hasilArray" :key="n">
          <tr>
            <td class="text-bold">
              {{ n + 1 }}
            </td>
            <td class="text-bold">
              {{ item?.tgl }}
            </td>
            <td class="text-left text-bold q-pl-sm q-pr-sm">
              {{ item?.notrans }}
            </td>
            <td class="text-left text-bold q-pl-sm q-pr-sm">
              {{ item?.uraian }}
            </td>
            <td class="text-right text-bold q-pl-sm q-pr-sm">
              {{ formattanpaRp(item?.penerimaan) }}
            </td>
            <td class="text-right text-bold q-pl-sm q-pr-sm">
              {{ formattanpaRp(item?.pengeluaran) }}
            </td>
            <td class="text-right text-bold q-pl-sm q-pr-sm">
              {{ formattanpaRp(item?.total) }}
            </td>
          </tr>
          <template v-if="item?.nonpd?.length">
            <template v-for="it in item?.nonpd" :key="it">
              <tr>
                <td colspan="2"></td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px"> {{ it?.nonpd }}</td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">{{ it?.uraianNPD }} </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(0) }}
                </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(it?.totalRincian) }}
                </td>
                <td></td>
              </tr>
              <template v-for="rek in it.rincian" :key="rek">
                <tr>
                  <td colspan="2"></td>
                  <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px;"> * {{ rek?.koderek50 }}</td>
                  <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px;"> * {{ rek?.rincianbelanja }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </template>
            </template>
          </template>
          <template v-if="item?.bank_kas?.length">
            <template v-for="it in item?.bank_kas" :key="it">
              <tr>
                <td colspan="2"></td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px"> {{ it?.nonpd }}</td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">{{ it?.uraianNPD }} </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(it?.nilai) }}
                </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(0) }}
                </td>
                <td></td>
              </tr>
            </template>
          </template>
          <template v-if="item?.kas_bank?.length">
            <template v-for="it in item?.kas_bank" :key="it">
              <tr>
                <td colspan="2"></td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px"> {{ it?.nonpd }}</td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">{{ it?.uraianNPD }} </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(0) }}
                </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(it?.nilai) }}
                </td>
                <td></td>
              </tr>
            </template>
          </template>
          <template v-if="item?.pjr?.length">
            <template v-for="it in item?.pjr" :key="it">
              <tr>
                <td colspan="2"></td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px"> {{ it?.nonpd }}</td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">{{ it?.uraianNPD }} </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(0) }}
                </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(it?.totalRincian) }}
                </td>
                <td></td>
              </tr>
              <template v-for="rek in it.rincian" :key="rek">
                <tr>
                  <td colspan="2"></td>
                  <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px;"> * {{ rek?.koderek50 }}</td>
                  <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px;"> * {{ rek?.rincianbelanja }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </template>
            </template>
          </template>
          <template v-if="item?.spjpanjar?.length">
            <template v-for="it in item?.spjpanjar" :key="it">
              <tr>
                <td colspan="2"></td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">* {{ it?.koderek50 }}</td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">* {{ it?.rincianbelanja }}</td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(0) }}
                </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(it?.totalRincian) }}
                </td>
                <td></td>
              </tr>
            </template>
          </template>
          <template v-if="item?.sisapanjar?.length">
            <template v-for="it in item?.sisapanjar" :key="it">
              <tr>
                <td colspan="2"></td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">* {{ it?.koderek50 }}</td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">* {{ it?.rincianbelanja }}</td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(it?.totalRincian) }}
                </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(it?.totalRincian) }}
                </td>
                <td></td>
              </tr>
            </template>
          </template>
          <template v-if="item?.cppjr?.length">
            <template v-for="it in item?.cppjr" :key="it">
              <tr>
                <td colspan="2"></td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">* {{ it?.nonpd }}</td>
                <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px">* {{ it?.uraianNPD }} </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(it?.totalRincian) }}
                </td>
                <td class="text-right q-pl-sm q-pr-sm" style="font-size: 11px">
                  {{ formattanpaRp(0) }}
                </td>
                <td></td>
              </tr>
              <template v-for="rek in it.rincian" :key="rek">
                <tr>
                  <td colspan="2"></td>
                  <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px;"> * {{ rek?.koderek50 }}</td>
                  <td class="text-left q-pl-sm q-pr-sm" style="font-size: 11px;"> * {{ rek?.rincianbelanja }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </template>
            </template>
          </template>
        </template>
        <tr class="bg-grey-2">
          <td colspan="4" class="text-bold text-center">TOTAL</td>
          <td class="text-right text-weight-bolder q-pl-sm q-pr-sm">
            {{ formattanpaRp(totaldebit()) }}
          </td>
          <td class="text-right text-weight-bolder q-pl-sm q-pr-sm">
            {{ formattanpaRp(totalkredit()) }}
          </td>
          <td class="text-right text-weight-bolder q-pl-sm q-pr-sm">
            {{ formattanpaRp(totalsaldo()) }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup>
import { formattanpaRp } from 'src/modules/formatter';
import { useLaporanBkuPengeluaranStore } from 'src/stores/siasik/laporan/bku/bkupengeluaran';
import { ref } from 'vue';

const separator = ref('cell')
const store = useLaporanBkuPengeluaranStore()
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
  return totalsaldo
}

// const listDatabku = [
//   {
//     label: 'No',
//     name: 'no',
//     field: row => [row.rowIndex],
//     align: 'center',
//     headerStyle: 'height:50px; font-weight: bold; font-size: 11px'
//   },
//   {
//     label: 'Tanggal',
//     name: 'tgl',
//     field: row => [row.tgl],
//     align: 'center',
//     headerStyle: 'height:50px; font-weight: bold; font-size: 11px'
//   },
//   {
//     label: 'Registe/Rekening',
//     name: 'notrans',
//     field: row => [row.notrans],
//     align: 'left',
//     headerStyle: 'height:50px; font-weight: bold; font-size: 11px'
//   },
//   {
//     label: 'Uraian',
//     name: 'uraian',
//     field: row => [row.uraian],
//     align: 'left',
//     headerStyle: 'height:50px; font-weight: bold; font-size: 11px'
//   },
//   {
//     label: 'Penerimaan (Rp.)',
//     name: 'penerimaan',
//     field: row => [row.penerimaan],
//     align: 'right',
//     headerStyle: 'height:50px; font-weight: bold; font-size: 11px'
//   },
//   {
//     label: 'Pengeluaran (Rp.)',
//     name: 'pengeluaran',
//     field: row => [row.pengeluaran],
//     align: 'right',
//     headerStyle: 'height:50px; font-weight: bold; font-size: 11px'
//   },
//   {
//     label: 'Saldo (Rp.)',
//     name: 'total',
//     field: row => [row.total],
//     align: 'right',
//     headerStyle: 'height:50px; font-weight: bold; font-size: 11px'
//   }


// ]
// const columns = ref(listDatabku)

// const seedSize = store.hasilArray?.length

// let rows = []
// for (let i = 0; i < 1000; i++) {
//   rows = rows.concat(store.hasilArray.map((r, j) => ({ ...r, index: i * seedSize + j + 1 })))
// }

// const tableRef = ref(null)

// onMounted(() => {
//   tableRef.value.scrollTo(5000)
// })

// const pagination = {
//   rowsPerPage: 0
// }
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
