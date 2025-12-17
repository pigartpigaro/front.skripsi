<template>
  <div>
    <div class="q-pb-xl">
      <ListLoading v-if="loading" />
      <div v-else>
        <div v-if="items?.length <= 0">
          <div class="column flex-center">
            <div class="text-h3 q-mb-md">
              🏷️
            </div>
            <div class="f-14">
              Belum Ada Data
            </div>
          </div>
        </div>
        <q-list v-else separator>
          <q-item v-for="(item, i) in items" :key="i">
            <q-item-section avatar>
              <app-avatar-pasien :pasien="item" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                {{ item.nama }} | <span class="text-primary">{{ item.norm }}</span>
              </q-item-label>
              <q-item-label>
                NOREG : <span class="text-weight-bold">{{ item.noreg }} </span> | Penjamin : <span
                  class="text-weight-bold"> {{ item.sistembayar }}</span>
              </q-item-label>
              <q-item-label>
                DPJP : <span class="text-negative text-weight-bold">{{ item.dokter }}</span> | RUANGAN : <span
                  class="text-teal text-weight-bold"> {{ item.poli }}</span>
              </q-item-label>
              <q-item-label caption>
                USIA : <span class="text-weight-bold">{{ item.usia }}</span> | Kelamin : <span
                  class="text-weight-bold">{{
                    item.kelamin }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>
                <div class="row q-mt-sm justify-end">
                  <div class="q-ml-sm">
                    <q-btn outline size="sm" padding="xs" color="cyan" label="Buka Billing" @click="openBill(item)" />
                  </div>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />
        </q-list>
      </div>
      <!-- Billing -->
      <app-fullscreen-blue v-model="billOpen" @close="store.notas = {}">
        <template #default>
          <!-- <BillingPage :pasien="pasien" @print="openPrint($event)" @rekap="openFaktur" @nota="getNota" /> -->
          <FormPembayaran :pasien="pasien" :billing="store.rekapBill" :kwitansi="store.kwitansi" />
        </template>
      </app-fullscreen-blue>
      <!-- print nota -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BillingPage from './BillingPage.vue'
import ListLoading from './ListLoading.vue'
import FormPembayaran from './FormPembayaran.vue'
// import CetakRekapBilling from './CetakRekapBilling.vue'

import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useKasirRajalListKunjunganStore } from 'src/stores/simrs/kasir/rajal/kunjungan'

const pasien = ref(null)
const qrisOpen = ref(false)
const billOpen = ref(false)
const printOpen = ref(false)
const printRekap = ref(false)
const store = useKasirRajalListKunjunganStore()
// const openPrevGc = ref(false)

function openBill(row) {
  store.getparams.noreg = row?.noreg
  pasien.value = row
  billOpen.value = !billOpen.value
  store.getBill()
}
function openPrint(val) {
  console.log('print', val)
  if (val === 'tunai') {
    printOpen.value = true
  } else if (val === 'qris') {
    qrisOpen.value = true
  }
}
function openFaktur(val) {
  console.log('faktur', val)
  printRekap.value = true
}
function actPrintRekap() {
  printRekap.value = false
}
function closeQris() {
  qrisOpen.value = false
}
function resetForm() {
  store.notas = {}
  store.golongan = ''
}
const printObj = {
  id: 'printMe',
  popTitle: ' '
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
function getNota(val) {
  const param = val
  console.log('golongan nota', param, pasien.value)

  store.getNotas(param)
}

defineProps({
  loading: { type: Boolean, default: false },
  items: { type: Array, default: () => [] }
})

// function getStatus(arr) {
//   if (arr?.length === 0) {
//     return '-'
//   }

//   // 1 (mulai waktu tunggu admisi),
//   // 2 (akhir waktu tunggu admisi/mulai waktu layan admisi),
//   // 3 (akhir waktu layan admisi/mulai waktu tunggu poli),
//   // 4 (akhir waktu tunggu poli/mulai waktu layan poli),
//   // 5 (akhir waktu layan poli/mulai waktu tunggu farmasi),
//   // 6 (akhir waktu tunggu farmasi/mulai waktu layan farmasi membuat obat),
//   // 7 (akhir waktu obat selesai dibuat),
//   // 99 (tidak hadir/batal)
//   const arr0 = arr[0].taskid
//   let text
//   switch (arr0) {
//     case '1' || 1:
//       text = 'Menunggu di Admisi'
//       break
//     case '2' || 2:
//       text = 'Pelayanan di Admisi'
//       break
//     case '3' || 3:
//       text = 'Menunggu di Poli'
//       break
//     case '4' || 4:
//       text = 'Pelayanan di Poli'
//       break
//     case '5' || 5:
//       text = 'Menunggu di Farmasi'
//       break
//     case '6' || 6:
//       text = 'Farmasi'
//       break
//     case '7' || 7:
//       text = 'Sudah Ambil Obat di Farmasi'
//       break
//     default:
//       text = 'Tidak Hadir/ Batal'
//   }
//   return text
// }
</script>
<style lang="scss" scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin: 0;
  position: relative;
}

.qrcode__image {
  background-color: #fff;
  border: 0.15rem solid #fff;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 7%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 7%;
}

.garis-bawah-double {
  border-bottom: 4px solid rgba(0, 0, 0, 0.572);
  border-bottom-style: double;
}

.garis-atas-double {
  border-top: 4px solid rgba(0, 0, 0, 0.572);
  border-top-style: double;
}

.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}

.garis-bawah-dblue {
  border-bottom: 4px solid rgb(56, 150, 239);
  border-bottom-style: double;
}

.garis-atas-dblue {
  border-top: 4px solid rgb(56, 150, 239);
  border-top-style: double;
}
</style>
