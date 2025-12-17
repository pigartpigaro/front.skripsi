<template>
  <q-bar dense class="bg-white q-my-md">
    <q-space />
    <q-btn ref="refPrint" v-print="printObj" unelevated color="dark" round size="sm" icon="icon-mat-print">
      <q-tooltip class="primary" :offset="[10, 10]">
        Print
      </q-tooltip>
    </q-btn>
  </q-bar>
  <div id="printMe" class="full-width">
    <KopSurat />
    <div class="garis-bawah-dblue q-pb-sm q-mb-md">
      <div class="row justify-center f-20 text-weight-bold q-mb-md">
        PEMANTAUAN INTRADIALITIK
      </div>
      <div class="row">
        <div class="col-5">
          <div class="row">
            <div class="col-4">
              Nama
            </div>
            <div class="col-8">
              {{ pasien?.nama ?? pasien?.pasien }}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              No. registrasi
            </div>
            <div class="col-8">
              {{ pasien?.noreg }}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Ruangan
            </div>
            <div class="col-8">
              Hemodialisa
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Tanggal Masuk
            </div>
            <div class="col-8">
              {{ pasien?.tgl_kunjungan }}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Sistem Bayar
            </div>
            <div class="col-8">
              {{ pasien?.sistembayar }}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Tujuan
            </div>
            <div class="col-8">
              Hemodialisa
            </div>
          </div>
        </div>
        <div class="col-7">
          <div class="row">
            <div class="col-3">
              No. RM
            </div>
            <div class="col-9">
              {{ pasien?.norm }}
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              Umur
            </div>
            <div class="col-9">
              {{ pasien?.usia }}
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              Alamat
            </div>
            <div class="col-9">
              {{ pasien?.alamat }}
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              Dokter
            </div>
            <div class="col-9">
              {{ pasien?.dokter }}
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              Diagnosa
            </div>
            <div class="col-9">
              {{ getDiagnosa }}
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th rowspan="2"></th>
            <th colspan="8">Pemantauan Jam (Waktu)</th>
          </tr>
          <tr>
            <template v-for="head in header" :key="head">
              <th>{{ ['1', '2', '3', '4', '5', '6'].includes(head) ? 'Jam Ke : ' + head : head }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-if="pasien?.intradialitik?.length">

            <template v-for="data in maping" :key="data">
              <tr>
                <td style="white-space: normal; ">{{ data?.title }}</td>
                <td v-if="data?.pre" style="white-space: normal; ">{{ data?.pre }}</td>
                <td v-if="data?.satu" style="white-space: normal; ">{{ data?.satu }}</td>
                <td v-if="data?.dua" style="white-space: normal; ">{{ data?.dua }}</td>
                <td v-if="data?.tiga" style="white-space: normal; ">{{ data?.tiga }}</td>
                <td v-if="data?.empat" style="white-space: normal; ">{{ data?.empat }}</td>
                <td v-if="data?.lima" style="white-space: normal; ">{{ data?.lima }}</td>
                <td v-if="data?.enam" style="white-space: normal; ">{{ data?.enam }}</td>
                <td v-if="data?.post" style="white-space: normal; ">{{ data?.post }}</td>
              </tr>
            </template>
            <!-- <template v-for="head in header" :key="head">
              <template v-for="(item, n) in pasien?.intradialitik" :key="n">
                <tr v-if="item?.rs4 === head">
                  <td v-if="item?.rs4 === head" style="white-space: normal; ">{{ maping(item, head) }}</td>
                </tr>
              </template>
  </template> -->
            <!-- <td style="white-space: normal; ">{{ item?.title }}</td>
              <td style="white-space: normal; ">{{ item?.jam }}</td> -->

          </template>
          <template v-else>
            <tr>
              <td colspan="9">
                <app-no-data />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="row q-pa-xl justify-between items-center">
        <div class="kiri text-center">
          <div><b>Pasien / Keluarga</b></div>
          <div style="margin-top:100px">
            <b>(................)</b>
          </div>
        </div>
        <div class="kanan text-center">
          <div><b>Probolinggo, {{ pasien?.tanggalkeluar }}</b></div>
          <div><b>Dokter Penanggung Jawab Pelayanan</b></div>
          <div class="column flex-center">
            <div style="width: 100px;">
              <vue-qrcode :value="qrUrl" tag="svg" :options="{
                errorCorrectionLevel: 'Q',
                color: {
                  dark: '#000000',
                  light: '#ffffff',
                },
                margin: 0
              }" />
            </div>
          </div>

          <div>
            <b>{{ pasien?.dokter }}</b>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script setup>
import KopSurat from 'src/components/KopSurat.vue'

import { computed } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const header = computed(() => {
  const head = props?.pasien?.intradialitik?.map(item => item?.rs4)
  return head
})
const maping = computed(() => {
  const hasil = [
    { title: 'Jam Ke', value: 'rs3' },
    { title: 'Keluhan', value: 'rs5' },
    { title: 'BB (kg)', value: 'rs6' },
    { title: 'Kesadaran', value: 'rs7' },
    { title: 'Tekanan Darah (mmHg)', value: 'rs8' },
    { title: 'Napas / Nadi (x/menit)', value: 'rs9' },
    { title: 'Suhu (C)', value: 'rs10' },
    { title: 'QB (ml/menit)', value: 'rs11' },
    { title: 'QD (ml/menit)', value: 'rs12' },
    { title: 'Tekanan Vena (mmHg)', value: 'rs13' },
    { title: 'TMP', value: 'rs14' },
    { title: 'UF (ml)', value: 'rs15' },
    { title: 'Assasement / Intervensi', value: 'rs16' },
    { title: 'Perawat', value: 'user' },
  ]
  hasil.forEach(item => {
    header.value?.forEach(head => {
      const data = props?.pasien?.intradialitik?.find(it => it?.rs4 === head)
      if (data) {
        if (data?.rs4.includes('PRE')) {
          if (item.value == 'user') item.pre = data[item.value]?.nama
          else item.pre = data[item.value]
        }
        if (data?.rs4.includes('POST')) {
          if (item.value == 'user') item.post = data[item.value]?.nama
          else item.post = data[item.value]
        }
        if (data?.rs4 == '1') {
          if (item.value == 'user') item.satu = data[item.value]?.nama
          else item.satu = data[item.value]
        }
        if (data?.rs4 == '2') {
          if (item.value == 'user') item.dua = data[item.value]?.nama
          else item.dua = data[item.value]
        }
        if (data?.rs4 == '3') {
          if (item.value == 'user') item.tiga = data[item.value]?.nama
          else item.tiga = data[item.value]
        }
        if (data?.rs4 == '4') {
          if (item.value == 'user') item.empat = data[item.value]?.nama
          else item.empat = data[item.value]
        }
        if (data?.rs4 == '5') {
          if (item.value == 'user') item.lima = data[item.value]?.nama
          else item.lima = data[item.value]
        }
        if (data?.rs4 == '6') {
          if (item.value == 'user') item.enam = data[item.value]?.nama
          else item.enam = data[item.value]
        }

      }
    })
  })
  return hasil
})


const printObj = {
  id: 'printMe',
  popTitle: 'Resume Medik'

}
const getDiagnosa = computed(() => {
  const diag = props?.pasien?.diagnosa?.map(item => item?.rs3)?.join(', ')
  // console.log('rwDiag', rwDiag)
  return diag

})
const qrUrl = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'INTRADIALITIK.png'
  const asal = 'HEMODDIALISA'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})
</script>
