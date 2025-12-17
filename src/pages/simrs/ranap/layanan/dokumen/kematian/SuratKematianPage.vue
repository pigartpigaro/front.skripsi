<template>
  <div id="pdfDoc" class="bg-white print-page">
    <div v-if="pasien?.carakeluar === 'C003'" class="page-1">
      <!-- KOP SURAT -->
      <div class="col-grow">
        <div class="row items-center">
          <div class="col-12">
            <div class="flex justify-center">
              <div class="">
                <img src="~assets/images/logo-kota-grey.png" width="50">
              </div>
              <div class="q-px-md">
                <div class="text-center">
                  <div class="text-weight-bold f-14">
                    PEMERINTAH KOTA PROBOLINGGO
                  </div>
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

      <hr class="q-mt-md">
      <hr style="margin-top:-5px;" class="q-mb-md">
      <div class="contentx">
        <div class="f-16 text-center text-bold q-mb-xs" style="text-decoration: underline; text-underline-offset: 5px;">
          {{ menu?.title }}
        </div>
        <div class="f-12 text-center text-bold q-my-sm">
          <span>NOMOR : <span>{{ nomor?.nosrtmeninggal || '472.12/......../425.208/KEM/..../20....' }}</span></span>
        </div>
        <div class="full-width q-mt-lg">
          <!-- biodata -->
          <div>Yang bertanda tangan di bawah ini : </div>


          <div class="row q-pa-sm q-ml-md">
            <div class="col-auto q-mr-lg">
              <div class="column">
                <div>Nama Dokter </div>
                <div>Pangkat / Gol </div>
                <div>Jabatan </div>
              </div>
            </div>
            <div class="col-grow">
              <div class="column">
                <div> : {{ dpjp?.nama ?? '' }}</div>
                <div v-if="dpjp?.golruang"> : {{ dpjp?.golongan ?? '' }} {{ dpjp?.golongan ? ' / ' : '' }} {{
                  dpjp?.ket_golongan ?? '' }}
                </div>
                <div v-else> : </div>
                <div> : {{ dpjp?.ket_jabatan ?? '' }}</div>
              </div>
            </div>
          </div>

          <div>Menyatakan bahwa : </div>
          <div class=""><span class="text-bold">TELAH MENINGGAL DUNIA </span> , Saudara : </div>



          <div class="full-width">
            <table class="model-1 q-ml-lg">
              <tbody>
                <tr valign="top">
                  <td width="15%">
                    <div>
                      Nama Lengkap
                    </div>
                  </td>
                  <td>
                    <div class="flex flex-wrap">
                      <div class="q-mr-sm">: </div>
                      <div>{{ pasien?.nama_panggil }}</div>
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td width="15%">
                    <div>
                      Nomor KTP
                    </div>
                    <!-- <i>Address</i> -->
                  </td>
                  <td>
                    <div class="flex flex-wrap">
                      <div class="q-mr-sm">: </div>
                      <div>{{ pasien?.nktp }}</div>
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td width="15%">
                    <div>
                      Umur
                    </div>
                    <!-- <i>Address</i> -->
                  </td>
                  <td>
                    <div class="flex flex-wrap">
                      <div class="q-mr-sm">: </div>
                      <div>{{ pasien?.usia }}</div>
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td width="15%">
                    <div>
                      Jenis Kelamin
                    </div>
                    <!-- <i>Address</i> -->
                  </td>
                  <td>
                    <div class="flex flex-wrap">
                      <div class="q-mr-sm">: </div>
                      <div>{{ pasien?.kelamin }}</div>
                    </div>
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <div>
                      Alamat
                    </div>
                  </td>
                  <td>
                    <div class="flex no-wrap q-gutter-sm">
                      <div class=""> : </div>
                      <div>{{ pasien?.alamat }}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="full-width q-mt-md">
            <div class="" style="text-indent: 20px;">
              Pada Tanggal <span class="text-bold"> {{ humanDate(pasien?.tglkeluar) }} </span>
              tepatnya pada jam : <span class="text-bold"> {{ nomor?.jamMeninggal ?? '-' }} WIB </span> ,
              dikarenakan <span class=""> {{ diagnosa }} </span> .
            </div>
          </div>
          <div class="full-width">
            <div class="" style="text-indent: 20px;">
              Demikian Surat Keterangan Kematian ini kami terbitkan untuk dapat digunakan
              semestinya dan sebijak-bijaknya
            </div>
          </div>

          <div class="row justify-between q-mt-xl">
            <div class="col-grow"></div>
            <div class="col-auto">
              <div class="column flex-center">
                <div>Probolinggo, Tgl {{ humanDate(pasien?.tglkeluar) }}</div>
                <div>Mengetahui</div>
                <div class="q-mb-sm">Dokter, </div>

                <div v-if="dpjp?.nama" style="height: 80px;" class="relative-position">
                  <div class="absolute-center" style="width: 80px;">
                    <vue-qrcode :value="qrDokter" tag="svg" :options="{
                      errorCorrectionLevel: 'Q',
                      color: {
                        dark: '#000000',
                        light: '#ffffff',
                      },
                      margin: 0
                    }" />
                    <img class="qrcode__image" src="~assets/logos/logo-rsud.png" alt="RSUD DOKTER MOHAMAD SALEH">
                  </div>
                </div>
                <div v-else style="height: 80px;" class="relative-position">
                  <div class="column flex-center full-height" style="width: 80px;">
                    <div>ttd</div>
                  </div>
                </div>

                <div class="q-mt-md">
                  {{ dpjp?.nama || '................................' }}
                </div>
              </div>
            </div>

          </div>






        </div>
        <!-- end -->
      </div>
    </div>
    <div v-else>
      <div class="column flex-center" style="height: 500px;">
        <div class="f-20">TIDAK ADA DOKUMEN</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { humanDate, jamTnpDetik, getNewLine } from 'src/modules/formatter.js'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { api } from 'src/boot/axios';
import { useDiagnosaStore } from 'src/stores/simrs/ranap/diagnosa';
// import { pathImg } from 'src/boot/axios'
// import { imageToBase64 } from 'src/modules/imgBase64'

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

// console.log('props', props?.pasien);


// const pengunjung = usePengunjungRanapStore()
// const ttdPasien = ref(null)


// const qrDokter = computed(() => {
//   const noreg = props?.pasien?.noreg// noreg
//   const dok = 'SUMMARY.png'
//   const asal = 'RANAP'
//   const petugas = props?.pasien?.kddokter ?? null
//   const enc = btoa(`${noreg}|${dok}|${asal}|${petugas}`)
//   return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
// })


const dpjp = ref(null)
const nomor = ref(null)
const diagnosa = ref(null)

const diag = useDiagnosaStore()

const qrDokter = computed(() => {
  const petugas = 'Nama : ' + dpjp?.value?.nama ?? '' + 'NIP : ' + dpjp?.value?.nip ?? ''
  const enc = btoa(`${petugas}`)
  return `${enc}`
})

onBeforeMount(() => {
  console.log('pasien', props?.pasien);
  Promise.all([getSurat(), getDpjpData()])
  getDiag()
})

const getDpjpData = async () => {
  const res = await api.get(`/v1/pegawai/master/pegawai-by-kdpegsimrs?kdpegsimrs=${props?.pasien?.kddrygmenyatakan}`)
  // console.log('res', res);
  if (res.status === 200) {
    dpjp.value = res.data

  }

}

const getSurat = async () => {
  const res = await api.get(`/v1/simrs/ranap/ruangan/no-surat?noreg=${props?.pasien?.noreg}`)
  // console.log('res', res);
  if (res.status === 200) {
    nomor.value = res.data
  }

}

const getDiag = () => {
  const dx = diag.listDiagnosa
  diagnosa.value = dx?.find(x => x?.kode === props?.pasien?.sebabkematian)?.keterangan ?? props?.pasien?.sebabkematian
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
  border-spacing: 50px 0;
}

.model-1 {

  tr,
  td {
    padding: -3px 0 !important;
  }
}

.model-2 {

  tr,
  td {
    padding-bottom: 5px !important;
  }
}

table,
tr,
td {
  border: none;
}

td {
  text-align: left;
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
</style>
