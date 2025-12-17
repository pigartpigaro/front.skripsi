<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 180vw; height: 600px">
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
        <q-header elevated>
          <q-bar class="bg-black text-white">
            <div>Cetak Buku Tunai Bendahara Pengeluaran</div>
            <q-space />

            <q-btn dense flat icon="icon-mat-close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-header>
        <q-page-container>
          <div id="printMe" class="f-12 row justify-center q-pt-md">
            <div class="row">
              <q-card-section class="full-width">
                <kopPage />
              </q-card-section>

              <q-card-section class="q-pa-md full-width">
                <template v-if="store.hasilArray">
                  <listData />
                </template>
              </q-card-section>

              <q-card-section class="full-width">
                <div class="row justify-between full-width">
                  <div class="flex-start q-pl-md">
                    <table class="text-weight-bolder" style="width: 400px">
                      <tbody>
                        <tr style="height: 30px;">
                          <td style="border: none;" class="text-left">
                            Saldo Awal
                          </td>
                          <td style="border: none;">
                            :
                          </td>
                          <td style="border: none;" class="text-right">
                            {{ formattanpaRp(0) }}
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
                  <div class="row justify-between full-width q-pt-md">
                    <div class="col flex-start justify-center content-center">
                      <div class="invisible">
                        .
                      </div>
                      <div class="text-bold text-center">
                        Pengguna Anggaran
                      </div>
                      <div style="padding-bottom: 40px" />
                      <div class="text-bold text-center" style="text-decoration-line: underline;">
                        {{ store.pegawais[1]?.nama }}
                      </div>
                      <div class="text-center">
                        NIP. {{ store.pegawais[1]?.nip }}
                      </div>
                    </div>
                    <div class="col flex-end justify-center content-center">
                      <div class="text-center">
                        Probolinggo {{ store.display.sekarang }}
                      </div>
                      <div class="text-center text-bold">
                        Bendahara Pengeluaran
                      </div>
                      <div style="padding-bottom: 40px" />
                      <div class="underline text-center text-bold" style="text-decoration-line: underline;">
                        {{ store.pegawais[0]?.nama }}
                      </div>
                      <div class="text-center">
                        NIP. {{ store.pegawais[0]?.nip }}
                      </div>
                    </div>
                  </div>
                  <div style="padding-bottom: 100px" />
                </div>
              </q-card-section>
            </div>
          </div>
        </q-page-container>
        <q-footer elevated>
          <q-card-section class="bg-primary text-white">
            <div class="row justify-end items-end">
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
import { formattanpaRp } from 'src/modules/formatter'
import { onMounted, ref } from 'vue'
import { useLaporanBkuPengeluaranStore } from 'src/stores/siasik/laporan/bku/bkupengeluaran'
import listData from './ListDatabkutunai.vue'
import kopPage from './KopPage.vue'
import { useLaporanBukuTunaiStore } from 'src/stores/siasik/laporan/buku_pembantu/bukutunai'


const store = useLaporanBukuTunaiStore()
const pegawai = useLaporanBkuPengeluaranStore()
onMounted(() => {
  pegawai.getDataTable()
})

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
  popTitle: 'Buku Tunai Bendahara Pengeluaran | SIASIK',
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
// const init = () => {
//   store.dataTersimpan()
// }
// const cetakNPD = ref(false)
// function hitungSubtotal () {
//   const arr = store.form.rincians
//   const obj = arr?.length ? arr.map((x) => x.nominalpembayaran) : []
//   const subtotal = obj.reduce((x, y) => x + y, 0)
//   // console.log('jumlah', obj)
//   // const total = nominal.reduce((x, y) => x + y, 0)
//   return subtotal
// }
</script>
<style lang="scss" scoped>
.kop {
  border-bottom: 1px solid rgb(7, 7, 7);
  width: fit-content;
}

.logo_kanan {
  right: 5%;
  position: relative;
}

.subtotal {
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 5px;
}


.underline {
  text-decoration-line: underline;

}

table,
tr,
td {
  border: none;
}
</style>
