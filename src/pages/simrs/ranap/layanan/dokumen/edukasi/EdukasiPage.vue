<template>
  <div id="pdfDoc" class="bg-white print-page">
    <div class="page-1">
      <!-- KOP SURAT -->
      <div class="col-grow">
        <div class="row items-center">
          <div class="col-12">
            <div class="flex justify-center">
              <div class="">
                <img src="~assets/logos/logo-rsud.png" width="50">
              </div>
              <div class="q-px-md">
                <div class="text-center">
                  <div class="text-weight-bold f-14">
                    UOBK RSUD DOKTER MOHAMAD SALEH
                  </div>
                  <div class="f-12">
                    <div>Jl. Mayjend Panjaitan No.65 Probolinggo Jawa Timur</div>
                    <div>Telp. (0335) 433478,433119,421118 Fax. (0335) 432702</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr>
      <!-- CONTENT -->
      <div v-if="!EDUKASI?.length" class="q-pa-md column full-height flex-center" style="min-height: 400px;">
        <div class="text-weight-bold text-center ">
          BELUM TERSEDIA LAPORAN EDUKASI
        </div>
      </div>
      <div v-else class="full-width">
        <table border="1" width="100%">
          <thead>
            <tr>
              <th rowspan="2" class="t-vertical">
                <div>Hari / Tanggal</div>
                <div>Jam</div>
              </th>
              <th rowspan="2" class="t-vertical">Metode</th>
              <th rowspan="2">Profesi</th>
              <th rowspan="2">Materi Edukasi dan Informasi</th>
              <th rowspan="2" class="t-vertical">
                <div>Estimasi</div>
                <div>Waktu</div>
              </th>
              <th rowspan="2" class="t-vertical">Media</th>
              <th rowspan="2" class="t-vertical">
                <div>Evaluasi</div>
                <div>Respon</div>
              </th>
              <th rowspan="2" class="t-vertical">
                <div>Tingkat</div>
                <div>Pemahaman</div>
              </th>
              <th colspan="2">
                <div>Nama & </div>
                <div>Tanda Tangan </div>
              </th>

            </tr>
            <tr>
              <th>
                <div>Penerima</div>
                <div>Edukasi</div>
              </th>
              <th>
                <div>Pemberi</div>
                <div>Edukasi</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in EDUKASI" :key="item">
              <td class="t-vertical">
                <div class="text-right">{{ humanDate(item?.tgl) }}</div>
                <div class="text-right"> jam {{ jamTnpDetik(item?.tgl) }}</div>
              </td>
              <td class="t-vertical">
                <div v-if="!item?.metode?.length">
                  -
                </div>
                <div v-else>
                  <div v-for="metode in item?.metode" :key="metode">
                    <div class="text-right">{{ metode }}, </div>
                  </div>
                </div>
              </td>
              <td valign="top">
                <div v-if="!item?.petugas?.kdgroupnakes !== ''">
                  <div>{{ jenisPPA(item?.petugas?.kdgroupnakes) }}</div>
                </div>
              </td>
              <td>
                <div v-if="!item?.materi?.length">
                  -
                </div>
                <div v-else>
                  <div v-for="mat in item?.materi" :key="mat">
                    <div class="flex no-wrap">{{ mat }}, </div>
                  </div>
                </div>
                <q-separator class="q-my-sm" />
                <div v-html="getNewLine(item?.materiLain)" class="text-italic" />
              </td>
              <td class="t-vertical">
                <div class="text-right">{{ item?.estimasi }}</div>
              </td>
              <td class="t-vertical">
                <div v-if="!item?.media?.length">
                  -
                </div>
                <div v-else>
                  <div v-for="med in item?.media" :key="med">
                    <div class="text-right"> {{ med }}, </div>
                  </div>
                </div>
              </td>
              <td class="t-vertical">
                <div class="text-right">{{ item?.evaluasi }}</div>
              </td>
              <td valign="top">-</td>
              <td valign="top">

                <div v-if="item?.ttdPenerima" class="flex-center " style="width: 60px;">
                  <div class="relative-position">
                    <vue-qrcode :value="qrPenerima(item?.ttdPenerima)" tag="svg" :options="{
                      errorCorrectionLevel: 'Q',
                      color: {
                        dark: '#000000',
                        light: '#ffffff',
                      },
                      margin: 0
                    }" />
                    <img class="qrcode__image" src="~assets/logos/logo-rsud.png" alt="RSUD DOKTER MOHAMAD SALEH">
                  </div>
                  <div class="f-8 text-wrap text-center">{{ item?.namaPenerima }}</div>
                </div>
                <div v-else>
                  -
                </div>



              </td>
              <td valign="top">

                <div class="flex-center " style="width: 60px;">
                  <div class="relative-position">
                    <vue-qrcode :value="qrPetugas(item?.petugas)" tag="svg" :options="{
                      errorCorrectionLevel: 'Q',
                      color: {
                        dark: '#000000',
                        light: '#ffffff',
                      },
                      margin: 0
                    }" />
                    <img class="qrcode__image" src="~assets/logos/logo-rsud.png" alt="RSUD DOKTER MOHAMAD SALEH">
                  </div>
                  <div class="f-8 text-wrap text-center">{{ item?.petugas?.nama }}</div>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getNewLine, humanDate, jamTnpDetik } from 'src/modules/formatter';
import { computed, onMounted } from 'vue';
import { useImplementasiEdukasiRanapStore } from 'src/stores/simrs/ranap/implementasiEdukasi';
import { pathImg } from 'src/boot/axios';


const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

const store = useImplementasiEdukasiRanapStore()

onMounted(() => {
  store.getList(props?.pasien)
})

// console.log('props', props.pasien);
const EDUKASI = computed(() => {
  // console.log('props', props?.pasien?.edukasi);
  return store.items
})

const jenisPPA = (val) => {
  if (val === '1') {
    return 'Dokter'
  }
  else if (val === '2') {
    return 'Perawat'
  }
  else if (val === '3') {
    return 'Bidan'
  }
  else if (val === '4') {
    return 'Apoteker'
  }
  else if (val === '5') {
    return 'Ahli Gizi'
  }
  else {
    return 'Fisoterapis'
  }
}


const qrPetugas = (user) => {
  // console.log('user', user);
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'KIE.png'
  const asal = 'RANAP'
  const petugas = user?.nik ?? null
  const enc = btoa(`${noreg}|${dok}|${asal}|${petugas}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
}
const qrPenerima = (ttd) => {
  // console.log('user', user);
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'KIE.png'
  const asal = 'RANAP'
  const ttdPenerima = ttd ?? null
  const enc = btoa(`${noreg}|${dok}|${asal}|${ttdPenerima}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
}



</script>

<style lang="scss" scoped>
.qrcode__image {
  // background-color: #fff;
  // border: 0.05rem solid #fff;
  // border-radius: 0.25rem;
  // box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 20%;
  width: 20%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

table {
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid black;
}

.kotak {
  border: 1px solid black;
}

.print-page {
  // width: 100%;
  // height: 100%;
  background-color: #ffffff;
  padding: 20px !important;
  font-size: 12px;
}

@media print {
  .print-page {
    padding: 0px !important;
  }

  @page {
    // size: 8.5in 9in;
    size: letter;
    page-break-inside: avoid;

    @bottom-right {
      content: "Dokumen Sah dari RSUD MOH SALEH KOTA PROBOLINGGO | Hal Ke-" counter(page);
    }
  }

  .contentx {
    page-break-after: auto;
    // break-after: page;
  }

}

.t-vertical {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
</style>
