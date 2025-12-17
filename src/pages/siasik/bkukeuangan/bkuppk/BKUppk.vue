<template>
  <div class="container q-pl-sm q-pr-sm">
    <div class="q-card q-mt-xs q-mt-ms">
      <q-card class="q-pa-xs">
        <div class="row bg-primary text-white q-pa-sm q-mb-xs q-mt-xs">
          <div class="f-14 text-weight-bold">
            Laporan BKU Pejabat Penatausahaan Keuangan | SIASIK
          </div>
        </div>
      </q-card>
    </div>
    <div class="q-card q-mt-sm">
      <q-card class="q-pa-xs">
        <div class="q-px-sm q-py-sm full-width">
          <div class="row">
            <kopPage />
          </div>
        </div>

        <div class="container items-center q-pa-sm full-width">
          <div class="row">
            <formgetData />
          </div>
        </div>

      </q-card>
    </div>

    <div class="q-mt-sm">
      <q-card class="q-py-md">
        <template v-if="store.loading">
          <div class="row justify-center">
            <div class="q-gutter-md">
              <q-spinner-pie color="amber-13" type="circle" animation="pulse-x" size="40px" />
              <q-spinner-pie color="amber-13" type="circle" animation="pulse-x" size="60px" />
              <q-spinner-pie color="amber-13" type="circle" animation="pulse-x" size="40px" />
            </div>
          </div>
        </template>
        <template v-else-if="store.hasilArray?.length === 0">
          <div class="row flex flex-center">
            <div class="kosong">
              <div>Data Belum Ada</div>
              <div>Silahkan Pilih Parameter</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row flex-center">
            <ListdataBku />
          </div>

          <div class="contaier q-pt-lg q-pl-xl">
            <q-card class="saldo bg-grey-3 q-py-xs q-px-xs" style="width: 400px">
              <div class="row justify-center q-pt-sm q-py-xs q-px-xs" style="font-size: 14px">
                <table class="text-weight-bolder">
                  <tbody style="width: 400px">
                    <tr class="no-border">
                      <td class="text-left no-border" width="150px">
                        Saldo Awal
                      </td>
                      <td width="15px" class="no-border">
                        :
                      </td>
                      <td class="text-right no-border" width="170px">
                        {{ formattanpaRp(store.nilaisaldoawal) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left no-border" width="150px">
                        Masuk
                      </td>
                      <td width="15px" class="no-border">
                        :
                      </td>
                      <td class="text-right no-border" width="170px">
                        {{ formattanpaRp(totaldebit()) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left no-border" width="150px">
                        Keluar
                      </td>
                      <td width="15px" class="no-border">
                        :
                      </td>
                      <td class="text-right no-border" width="170px">
                        {{ formattanpaRp(totalkredit()) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left no-border" width="150px">
                        Saldo Akhir
                      </td>
                      <td width="15px" class="no-border">
                        :
                      </td>
                      <td class="text-right no-border" width="170px">
                        {{ formattanpaRp(totalsaldo()) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </q-card>
          </div>
          <div style="padding-bottom: 50px" />
        </template>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { formattanpaRp } from 'src/modules/formatter'
import { useLaporanBkuPpkStore } from 'src/stores/siasik/laporan/bku/bkuppk'
import { onMounted } from 'vue'
import formgetData from './inpage/FormBkuppk.vue'
import ListdataBku from './inpage/ListDatabkuppk.vue'
import kopPage from './inpage/KopPage.vue'
const store = useLaporanBkuPpkStore()
onMounted(() => {
  // store.getDataTable()
})
function bulan(val) {
  const bulan = store.bulans.find((x) => x.value === val)
  return bulan?.nama ?? '-'
}


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
// function saldoindex(ss) {
//   const saldoss = store.hasilArray[ss];
//   let saldoawal = 0;
//   let saldototal = 0;

//   if (ss === 0) {
//     saldoawal = saldoss.penerimaan - saldoss.pengeluaran;
//     saldototal = saldoawal;
//   } else if (ss > 0) {
//     const saldoseblumnya =
//       store.hasilArray[ss - 1].penerimaan -
//       store.hasilArray[ss - 1].pengeluaran;
//     const saldoskg =
//       store.hasilArray[ss].penerimaan - store.hasilArray[ss].pengeluaran;
//     saldototal = saldoseblumnya + saldoskg;
//   }
//   // console.log(saldototal);
//   return saldototal;
// }
</script>
<style>
.kosong {
  position: relative;
  padding-top: 100px;
  text-align: center;
  justify-content: center;
  width: 25%;
  height: 270px;
  font-size: 1.5em;
}
</style>
