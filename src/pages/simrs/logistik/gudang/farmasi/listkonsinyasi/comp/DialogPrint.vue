<template>
  <q-dialog maximized>
    <q-card flat id="printMe">
      <q-bar class="bg-primary text-white q-py-sm print-hide">
        <div class="f-12">
          <!-- {{ title }} -->
        </div>
        <q-space />
        <q-btn v-print="printObj" round class="f-10 q-mr-sm" color="dark" text-color="white" icon="icon-mat-print">
          <q-tooltip class="primary" :offset="[10, 10]">
            Print, pilih save as pdf
          </q-tooltip>
        </q-btn>
        <q-btn v-close-popup dense flat icon="icon-mat-close" @click="emits('close')">
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <div class="bg-white q-pa-sm">
        <div class="q-py-sm">
          <div class="row justify-center text-weight-bold f-14">{{ data?.penyedia?.nama }}</div>
          <div class="row justify-center text-weight-bold ">{{ data?.notranskonsi }}</div>
          <div class="row justify-center text-weight-bold ">{{ data?.nobast }}</div>
          <div class="row justify-center text-weight-bold ">{{ data?.no_npd }}</div>
          <div class="row justify-center text-weight-bold ">{{ data?.no_kwitansi }}</div>
          <div class="row q-mt-md">
            <div class="col-6">
              <div class="row">
                <div class="col-4">Tanggal Transaksi</div>
                <div class="col-8">{{ dateFullFormat(data?.tgl_trans) ?? '-' }}</div>
              </div>
              <div class="row">
                <div class="col-4">Tanggal BAST</div>
                <div class="col-8">{{ dateFullFormat(data?.tgl_bast) ?? '-' }}</div>
              </div>
              <div class="row">
                <div class="col-4">Tanggal Pembayaran</div>
                <div class="col-8">{{ dateFullFormat(data?.tgl_pembayaran) ?? '-' }}</div>
              </div>
              <div class="row">
                <div class="col-4">Tanggal Pencairan NPK</div>
                <div class="col-8">{{ dateFullFormat(data?.tgl_pencairan_npk) ?? '-' }}</div>
              </div>
            </div>
            <div class="col-6">
              <div class="row">
                <div class="col-4">Jumlah Transaksi</div>
                <div class="col-8">{{ formatDouble(data?.jumlah_konsi) ?? 0 }}</div>
              </div>
              <div class="row">
                <div class="col-4">Jumlah BAST</div>
                <div class="col-8">{{ formatDouble(data?.jumlah_bast) ?? 0 }}</div>
              </div>
              <div class="row">
                <div class="col-4">Jumlah Pembayaran</div>
                <div class="col-8">{{ formatDouble(data?.nilai_pembayaran) ?? 0 }}</div>
              </div>
            </div>
          </div>

        </div>
        <div>
          <div v-if="data.rinci?.length">
            <div class="row items-center text-weight-bold">
              <div class="col-1 ">
                No
              </div>
              <div class="col-3 ">
                Obat
              </div>
              <div class="col-3 ">
                Identitas
              </div>
              <div class="col-3 ">
                Nomor
              </div>
              <div class="col-2 text-right">
                Jumlah
              </div>
            </div>
            <q-separator />
            <div v-for="(rin, i) in data.rinci" :key="i">
              <div class="row items-center q-col-gutter-sm">
                <div class="col-1">
                  {{ i + 1 }}
                </div>
                <div class="col-3">
                  <div class="row wrap" style="white-space: normal;">
                    {{ rin?.obat?.nama_obat }}
                  </div>
                  <div class="row f-10 text-italic">
                    {{ rin?.kdobat }}
                  </div>
                </div>
                <div class="col-3" style="white-space: normal;">
                  <div class="row justify-between no-wrap" style="white-space: normal;">
                    <div class="q-mr-sm">
                      Pasien
                    </div>
                    <div class="">
                      {{ rin?.pasien?.rs2 }}
                    </div>
                    <div class="f-10 text-italic">
                      ({{ rin?.noreg }})
                    </div>
                  </div>
                  <div class="row justify-between no-wrap">
                    <div class="q-mr-sm">
                      Dokter
                    </div>
                    <div class="">
                      {{ rin?.iddokter?.nama }}
                    </div>
                  </div>
                </div>
                <div class="col-3">
                  <div class="row justify-between no-wrap">
                    <div class="q-mr-sm">
                      Penerimaan
                    </div>
                    <div class="text-weight-bold text-primary">
                      {{ rin?.nopenerimaan }}
                    </div>
                  </div>
                  <div class="row justify-between no-wrap">
                    <div class="q-mr-sm">
                      Permintaan OP
                    </div>
                    <div class="text-weight-bold text-orange">
                      {{ rin?.nopermintaan }}
                    </div>
                  </div>
                  <div class="row justify-between no-wrap">
                    <div class="q-mr-sm">
                      Resep
                    </div>
                    <div class="text-weight-bold text-green">
                      {{ rin?.noresep }}
                    </div>
                  </div>
                </div>
                <div class="col-2 text-right">
                  <div class="row justify-between no-wrap">
                    <div class="q-mr-sm">
                      Jumlah
                    </div>
                    <div class="">
                      {{ rin?.jumlah }} ({{ rin?.obat?.satuan_k }})
                    </div>
                  </div>
                  <div class="row justify-between no-wrap">
                    <div class="q-mr-sm">
                      Harga
                    </div>
                    <div class="">
                      {{ formatDouble(rin?.harga_net, 2) }}
                    </div>
                  </div>
                  <div class="row justify-between no-wrap">
                    <div class="q-mr-sm">
                      subtotal
                    </div>
                    <div class="text-weight-bold">
                      {{ formatDouble(rin?.subtotal, 2) }}
                    </div>
                  </div>
                </div>
              </div>
              <q-separator />
            </div>
          </div>
          <div v-else>
            Tidak ada Rincian
          </div>
        </div>

        <div class="row q-my-lg">
          <div class="col-4 text-center">
            Transaksi
          </div>
          <div class="col-4 text-center">
            BAST
          </div>
          <div class="col-4 text-center">
            Pembayaran
          </div>
        </div>
        <div class="row q-my-lg">
          <div class="col-4 text-center">
            {{ data?.konsi?.nama ?? '-' }}
          </div>
          <div class="col-4 text-center">
            {{ data?.bast?.nama ?? '-' }}
          </div>
          <div class="col-4 text-center">
            {{ data?.bayar?.nama ?? '-' }}
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat, formatDouble } from 'src/modules/formatter'

defineProps({
  data: { type: Object, default: () => { } }
})

const emits = defineEmits(['close'])

const printObj = {
  id: 'printMe',
  popTitle: 'List Bast',
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css'
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}

// function onShow () {
//   // console.log('show')
//   setTimeout(function () {
//     // const printContents = document.getElementById('printMe').innerHTML
//     // const originalContents = document.body.innerHTML

//     // document.body.innerHTML = printContents

//     // window.print()
//   }, 600)
//   setTimeout(function () {
//     // afterPrint()
//   }, 500)
//   window.onafterprint = (event) => {
//     // console.log('After print')
//     // afterPrint()
//   }
// }
function afterPrint () {
  // window.close()
  emits('close')

}
</script>
