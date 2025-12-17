<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 180vw; height: 600px">
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
        <q-header elevated>
          <q-bar class="bg-black text-white">
            <div>Cetak NPD-LS</div>
            <q-space />

            <q-btn dense flat icon="icon-mat-close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-header>
        <q-page-container>
          <div id="printMe" class="f-12 row justify-center q-pt-md q-pb-md">
            <div class="row">
              <q-card-section class="full-width">
                <kopPage />
              </q-card-section>

              <q-card-section class="full-width">
                <template v-if="store.hasilArray">
                  <listData />
                </template>
              </q-card-section>
              <q-card-section class="full-width">
                <div class="row q-pl-sm justify-between full-width">
                  <div class="flex-start">
                    <table class="text-bold" style="width:400px">
                      <tbody>
                        <tr style="height: 30px;">
                          <td style="border: none;" class="text-left">
                            Saldo Awal
                          </td>
                          <td style="border: none;">
                            :
                          </td>
                          <td style="border: none;" class=" text-right">
                            {{ formattanpaRp(totalsaldo()) }}
                          </td>
                        </tr>
                        <tr style="height: 30px;">
                          <td style="border: none;" class="text-left">
                            Masuk
                          </td>
                          <td style="border: none;">
                            :
                          </td>
                          <td style="border: none;" class="text-right">
                            {{ formattanpaRp(totaldebit()) }}
                          </td>
                        </tr>
                        <tr style="height: 30px;">
                          <td style="border: none;" class="text-left">
                            Keluar
                          </td>
                          <td style="border: none;">
                            :
                          </td>
                          <td style="border: none;" class="text-right">
                            {{ formattanpaRp(totalkredit()) }}
                          </td>
                        </tr>
                        <tr style="height: 30px;">
                          <td style="border: none;" class="text-left">
                            Saldo Akhir
                          </td>
                          <td style="border: none;">
                            :
                          </td>
                          <td style="border: none;" class="text-right">
                            {{ formattanpaRp(totalsaldo()) }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="row q-pt-md justify-between full-width">
                  <div class="flex-start text-center" style="width:50%">
                    <div class="invisible">
                      .
                    </div>
                    <div class="text-bold">
                      Pengguna Anggaran
                    </div>
                    <div style="padding-bottom: 40px" />
                    <div class="text-bold" style="text-decoration-line: underline;">
                      {{ store.pegawais[1]?.nama }}
                    </div>
                    <div>
                      NIP. {{ store.pegawais[1]?.nip }}
                    </div>
                  </div>
                  <div class="flex-end text-center" style="width:50%">
                    <div>
                      Probolinggo {{ store.display.sekarang }}
                    </div>
                    <div class="text-bold">
                      Bendahara Pengeluaran
                    </div>
                    <div style="padding-bottom: 40px" />
                    <div class="text-bold" style="text-decoration-line: underline;">
                      {{ store.pegawais[0]?.nama }}
                    </div>
                    <div>
                      NIP. {{ store.pegawais[0]?.nip }}
                    </div>
                  </div>
                </div>
              </q-card-section>
            </div>
          </div>
        </q-page-container>

        <q-footer elevated>
          <q-card-section class="q-pa-none bg-primary text-white">
            <div class="q-pa-md row justify-end items-end">
              <div class="items-end">
                <q-btn v-print="printObj" unelevated color="dark" round size="sm" icon="icon-mat-print">
                  <q-tooltip class="primary" :offset="[10, 10]">
                    Print
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-footer>
      </q-layout>
    </q-card>
  </q-dialog>

</template>


<script setup>
import { useLaporanBkuPengeluaranStore } from 'src/stores/siasik/laporan/bku/bkupengeluaran';
import { onMounted, ref } from 'vue';
import listData from './ListData.vue'
import kopPage from './KopPage.vue'
import { formattanpaRp } from 'src/modules/formatter';

const store = useLaporanBkuPengeluaranStore()

// onMounted(() => {
//   // store.getDataTable()
// })

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

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'BKU Bendahara Pengeluaran | SIASIK',
  beforeOpenCallback(vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback(vue) {
    console.log('opened')
  },
  closeCallback(vue) {
    printed.value = false
    console.log('closePrint')
  }
}

</script>

<style>
.grs_bawah {
  border-bottom: 1px solid grey;
}
</style>
