<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 180vw; height: 600px">
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
        <q-header elevated>
          <q-bar class="bg-black text-white">
            <div>Cetak Pencairan</div>
            <q-space />

            <q-btn dense flat icon="icon-mat-close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-header>
        <q-page-container>
          <div id="printMe" class="f-12 row justify-center">
            <template v-if="store.npddatasave.tglcair != null">
              <q-card-section>
                <div class="col-auto">
                  <div class="row b1 justify-between full-width full-height ">
                    <div class="row q-pa-sm b2 q-pr-xl" style="width:50%">
                      <div class="row full-width flex-center">
                        <q-img src="~assets/logos/logo-rsud.png" style="height: 1.5cm; width: 1.5cm" />
                        <div class="row q-px-md flex-center text-center">
                          <div class="col-auto q-pa-sm text-weight-bold text-center">
                            <div>PEMERINTAH KOTA PROBOLINGGO</div>
                            <div>RSUD DOKTER MOHAMAD SALEH</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row q-pa-sm" style="width:50%">
                      <div class="row q-pa-sm text-weight-bold flex-center">
                        <div class="col-auto">
                          <div class="q-py-xs">
                            Nomor NP2D
                          </div>
                          <div class="q-py-xs">
                            Tanggal NP2D
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col full-width">
                          <div class="q-py-xs">
                            : {{ store.npddatasave.nopencairan }}
                          </div>
                          <div class="q-py-xs">
                            : {{ store.npddatasave.tglcair }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row b justify-between full-width full-height ">
                    <div class="row q-pa-sm b2" style="width:50%">
                      <div class="row q-pa-sm text-weight-bold flex-top">
                        <div class="col-auto">
                          <div class="q-py-xs">
                            Nomor NPK-LS
                          </div>
                          <div class="q-py-xs">
                            Nomor NPD-LS
                          </div>
                          <div class="q-py-xs">
                            Tanggal NPD-LS
                          </div>
                          <div class="q-py-xs">
                            Bidang
                          </div>
                          <div class="q-py-xs full-height">
                            Kegiatan
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col full-width flex-top">
                          <div class="q-py-xs">
                            : {{ store.npddatasave.nonpk }}
                          </div>
                          <div class="q-py-xs">
                            : {{ store.npddatasave.nonpdls }}
                          </div>
                          <div class="q-py-xs">
                            : {{ store.npddatasave.tglnpdls }}
                          </div>
                          <div class="q-py-xs">
                            : {{ store.npddatasave.bidang }}
                          </div>
                          <div class="q-py-xs full-height">
                            : {{ store.npddatasave.kegiatanblud }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row" style="width:50%">
                      <div class="row flex-center full-width">
                        <div class="col text-weight-bold full-width q-pa-sm b3 text-center">
                          <div class="q-py-xs">
                            NOTA PERINTAH PENCAIRAN DANA
                          </div>
                          <div class="q-py-xs">
                            (NP2D)
                          </div>
                        </div>
                        <div class="row full-width q-pa-sm">
                          <div class="col-auto">
                            <div class="q-py-xs">
                              Dari
                            </div>
                            <div class="q-py-xs">
                              Tahun
                            </div>
                          </div>
                          <div class="q-px-md" />
                          <div class="col full-width">
                            <div class="q-py-xs">
                              : KPA (Kuasa Pengguna Anggaran)
                            </div>
                            <div class="q-py-xs">
                              : {{ store.params.tahun }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row b justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-py-xs flex-center">
                        <div class="col-auto">
                          <div>
                            Rekening Bank
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col full-width">
                          <div>
                            : BANK JATIM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row b justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-pt-xs flex-center">
                        <div class="col-auto">
                          <div>
                            Hendaklah mencairkan / memindahkan dari Rekening Nomor
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col full-width">
                          <div>
                            : 0121161061
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row q-pl-sm q-pb-xs" style="width:100%">
                      <div class="row q-pl-sm q-pb-xs flex-center">
                        <div class="col-auto">
                          <div class="q-py-xs">
                            Uang Sebesar
                          </div>
                          <div class="q-py-xs">
                            Terbilang
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col full-width">
                          <div class="q-py-xs">
                            : Rp. {{ formattanpaRp(store.npddatasave.total) }}
                          </div>
                          <div class="q-py-xs">
                            : {{ terbilangRupiah(store.npddatasave.total) }} Rupiah
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row b4 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-pb-xs flex-center">
                        <div class="col-auto">
                          <div class="q-py-xs">
                            Pihak Ketiga
                          </div>
                          <div class="q-py-xs">
                            Rekening Bank
                          </div>
                          <div class="q-py-xs">
                            No. Rekening
                          </div>
                          <div class="q-py-xs">
                            NPWP
                          </div>
                          <div class="q-py-xs">
                            Untuk Keperluan
                          </div>
                        </div>
                        <div class="q-px-sm" />
                        <div class="col full-width">
                          <div class="q-py-xs">
                            : {{ store.npddatasave.penerima }}
                          </div>
                          <div class="q-py-xs">
                            : {{ store.npddatasave.bank }}
                          </div>
                          <div class="q-py-xs">
                            : {{ store.npddatasave.rekening }}
                          </div>
                          <div class="q-py-xs">
                            : {{ store.npddatasave.npwp }}
                          </div>
                          <div class="q-py-xs">
                            : {{ store.npddatasave.keterangan }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row justify-between full-width full-height ">
                    <div class="row" style="width:100%">
                      <table class="items-center full-width">
                        <thead>
                          <tr>
                            <th>
                              No.
                            </th>
                            <th>
                              Kode Rekening
                            </th>
                            <th>
                              Uraian
                            </th>
                            <th>
                              Jumlah (Rp.)
                            </th>
                          </tr>
                        </thead>
                        <tbody class="align-middle q-pl-sm">
                          <tr v-for="item, n in store.npddatasave.rincian" :key="item">
                            <td class="text-center">
                              <div>
                                {{ n + 1 }}.
                              </div>
                            </td>
                            <td class="text-left">
                              <div>
                                {{ item.koderek50 }} - {{ item.rincianbelanja }}
                              </div>
                            </td>
                            <td class="text-left">
                              <div>
                                {{ item.itembelanja }}
                              </div>
                            </td>
                            <td class="text-right">
                              <div>
                                {{ formattanpaRp(item.nominalpembayaran) }}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-center text-weight-bold" colspan="3">
                              <div>Jumlah</div>
                            </td>
                            <td class="text-right text-weight-bold" colspan="3">
                              <div>{{ formattanpaRp(store.npddatasave.total) }} </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="row b4 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-pb-xs flex-center">
                        Potongan-potongan :
                      </div>
                    </div>
                  </div>

                  <div class="row justify-between full-width full-height ">
                    <div class="row" style="width:100%">
                      <table class="items-center full-width">
                        <thead>
                          <tr>
                            <th style="width: 40px">
                              No.
                            </th>
                            <th>
                              Uraian
                            </th>
                            <th>
                              Jumlah (Rp.)
                            </th>
                          </tr>
                        </thead>
                        <tbody class=" align-middle q-pl-sm">
                          <tr>
                            <td class="text-center">
                              <div>
                                1.
                              </div>
                            </td>
                            <td class="text-left">
                              <div>
                                PPN Pusat
                              </div>
                            </td>
                            <td class="text-right">
                              <div v-if="store.npddatasave.pajak != null || store.npddatasave.newpajak?.length > 0">
                                {{ formattanpaRp(mapPajakBaru().sumppn) }}
                              </div>
                              <div v-else>{{ formattanpaRp(0) }} </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-center">
                              <div>
                                2.
                              </div>
                            </td>
                            <td class="text-left">
                              <div>
                                PPh 21
                              </div>
                            </td>
                            <td class="text-right">
                              <div v-if="store.npddatasave.pajak != null || store.npddatasave.newpajak?.length > 0">
                                {{ formattanpaRp(mapPajakBaru().sumpph21) }}
                              </div>
                              <div v-else>{{ formattanpaRp(0) }} </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-center">
                              <div>
                                3.
                              </div>
                            </td>
                            <td class="text-left">
                              <div>
                                PPh 22
                              </div>
                            </td>
                            <td class="text-right">
                              <div v-if="store.npddatasave.pajak != null || store.npddatasave.newpajak?.length > 0">
                                {{ formattanpaRp(mapPajakBaru().sumpph22) }}
                              </div>
                              <div v-else>{{ formattanpaRp(0) }} </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-center">
                              <div>
                                4.
                              </div>
                            </td>
                            <td class="text-left">
                              <div>
                                PPh 23
                              </div>
                            </td>
                            <td class="text-right">
                              <div v-if="store.npddatasave.pajak != null || store.npddatasave.newpajak?.length > 0">
                                {{ formattanpaRp(mapPajakBaru().sumpph23) }}
                              </div>
                              <div v-else>{{ formattanpaRp(0) }} </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-center">
                              <div>
                                5.
                              </div>
                            </td>
                            <td class="text-left">
                              <div>
                                PPh 25
                              </div>
                            </td>
                            <td class="text-right">
                              <div v-if="store.npddatasave.pajak != null || store.npddatasave.newpajak?.length > 0">
                                {{ formattanpaRp(mapPajakBaru().sumpph25) }}
                              </div>
                              <div v-else>{{ formattanpaRp(0) }} </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-center">
                              <div>
                                6.
                              </div>
                            </td>
                            <td class="text-left">
                              <div>
                                Pajak Daerah (PPh Final)
                              </div>
                            </td>
                            <td class="text-right">
                              <div v-if="store.npddatasave.pajak != null || store.npddatasave.newpajak?.length > 0">
                                {{ formattanpaRp(mapPajakBaru().sumpajakdaerah) }}
                              </div>
                              <div v-else>{{ formattanpaRp(0) }} </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-center text-weight-bold" colspan="2">
                              <div>Jumlah</div>
                            </td>
                            <td class="text-right text-weight-bold">
                              <div>
                                {{ formattanpaRp(store.npddatasave.totalpajak) }}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-weight-bold" colspan="3">
                              <div>NPK yang dibayarkan</div>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" class="text-left">
                              <div>Jumlah yang Diminta</div>
                            </td>
                            <td class="text-right justify-between">
                              <div class="row">
                                <div class="col-auto">
                                  Rp.
                                </div>
                                <div class="col">
                                  {{ formattanpaRp(store.npddatasave.total) }}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" class="text-left">
                              <div>Jumlah Potongan</div>
                            </td>
                            <td class="text-right justify-between">
                              <div class="row">
                                <div class="col-auto">
                                  Rp.
                                </div>
                                <div class="col">
                                  {{ formattanpaRp(store.npddatasave.totalpajak) }}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-weight-bold" colspan="2">
                              <div>Jumlah yang Dibayarkan</div>
                            </td>
                            <td class="text-right justify-between">
                              <div class="row">
                                <div class="col-auto text-weight-bold">
                                  Rp.
                                </div>
                                <div class="col text-weight-bold">
                                  {{ formattanpaRp(store.npddatasave.totalbayar) }}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="row b4 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs text-weight-bold" style="width:100%">
                      <div>
                        Uang Sejumlah : {{ terbilangRupiah(store.npddatasave.totalbayar) }}
                      </div>
                    </div>
                  </div>

                  <div class="row b justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs text-weight-bold" style="width:100%">
                      <div class="col full-width" />
                      <div class="col text-center">
                        <div class="q-py-xs">
                          Probolinggo {{ dateFullFormat(store.npddatasave.tglcair) }}
                        </div>
                        <div class="text-bold">
                          KUASA PENGGUNA ANGGARAN
                        </div>
                        <div style="padding-bottom: 40px" />
                        <div class="underline text-bold q-py-xs">
                          {{ pegawai.pegawais[1]?.nama }}
                          <div class="garis-bawah" style="text-decoration-line: underline;" />
                        </div>
                        <div>
                          NIP. {{ pegawai.pegawais[1]?.nip }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </template>
            <template v-else>
              <q-card-section>
                <div class="container q-pa-md full-width">
                  <q-card class="items-center bg-yellow-1 q-pa-xl full-width">
                    <div class="row flex-center">
                      SABAR YA... NPD-LS BELUM DICAIRKAN
                    </div>
                  </q-card>
                </div>
              </q-card-section>
            </template>
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
import { listDataNpdlsStore } from 'src/stores/siasik/transaksi/ls/newnpdls/listdatanpdls'
import { useLaporanBkuPengeluaranStore } from 'src/stores/siasik/laporan/bku/bkupengeluaran'
import { dateFullFormat, formattanpaRp } from 'src/modules/formatter'
import { terbilangRupiah } from 'src/modules/utils'
import { ref } from 'vue'

const store = listDataNpdlsStore()
const pegawai = useLaporanBkuPengeluaranStore()

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Nota Perintah Pencairan Dana | SIASIK',
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

function mapPajakBaru() {
  const ppnlama = store.npddatasave?.pajak ? parseFloat(store.npddatasave?.pajak.ppnpusat) : parseFloat(0)
  const ppn = store.npddatasave?.newpajak?.find(x => x.koderekening === '2.1.01.06.01.0001')
  const ppnbaru = isNaN(parseFloat(ppn?.nilai)) ? parseFloat(0) : parseFloat(ppn?.nilai)
  const sumppn = parseFloat(ppnlama) + parseFloat(ppnbaru)

  const pajakdaerahlama = store.npddatasave?.pajak ? parseFloat(store.npddatasave?.pajak.pajakdaerah) : parseFloat(0)
  const pajakdaerah = store.npddatasave?.newpajak?.find(x => x.koderekening === '2.1.01.06.02.0001')
  const pajakdaerahbaru = isNaN(parseFloat(pajakdaerah?.nilai)) ? parseFloat(0) : parseFloat(pajakdaerah?.nilai)
  const sumpajakdaerah = parseFloat(pajakdaerahlama) + parseFloat(pajakdaerahbaru)

  const pph21lama = store.npddatasave?.pajak ? parseFloat(store.npddatasave?.pajak.pph21) : parseFloat(0)
  const arr21 = store.npddatasave?.newpajak?.find(x => x.koderekening === '2.1.01.05.01.0001')
  const pph21 = isNaN(parseFloat(arr21?.nilai)) ? parseFloat(0) : parseFloat(arr21?.nilai)
  const sumpph21 = parseFloat(pph21lama) + parseFloat(pph21)

  const pph22lama = store.npddatasave?.pajak ? parseFloat(store.npddatasave?.pajak.pph22) : parseFloat(0)
  const arr22 = store.npddatasave?.newpajak?.find(x => x.koderekening === '2.1.01.05.02.0001')
  const pph22 = isNaN(parseFloat(arr22?.nilai)) ? parseFloat(0) : parseFloat(arr22?.nilai)
  const sumpph22 = parseFloat(pph22lama) + parseFloat(pph22)

  const pph23lama = store.npddatasave?.pajak ? parseFloat(store.npddatasave?.pajak.pph23) : parseFloat(0)
  const arr23 = store.npddatasave?.newpajak?.find(x => x.koderekening === '2.1.01.05.03.0001')
  const pph23 = isNaN(parseFloat(arr23?.nilai)) ? parseFloat(0) : parseFloat(arr23?.nilai)
  const sumpph23 = parseFloat(pph23lama) + parseFloat(pph23)

  const pph25lama = store.npddatasave?.pajak ? parseFloat(store.npddatasave?.pajak.pph25) : parseFloat(0)
  const arr25 = store.npddatasave?.newpajak?.find(x => x.koderekening === '2.1.01.05.04.0001')
  const pph25 = isNaN(parseFloat(arr25?.nilai)) ? parseFloat(0) : parseFloat(arr25?.nilai)
  const sumpph25 = parseFloat(pph25lama) + parseFloat(pph25)

  return { sumppn, sumpajakdaerah, sumpph21, sumpph22, sumpph23, sumpph25 }
}
</script>
<style>
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
}

td {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
