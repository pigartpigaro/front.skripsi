<template>
  <div id="pdfDoc" class="bg-white print-page">
    <div class="page-1">
      <!-- KOP SURAT -->
      <div class="col-grow">
        <div class="row items-center">
          <div class="col-12">
            <div class="row">
              <div class="col-auto">
                <img src="~assets/images/logo-kota-grey.png" width="50">
              </div>
              <div class="col flex-wrap q-px-lg">
                <div class="text-left">
                  <!-- <div class="text-weight-bold f-12">
                    PEMERINTAH KOTA PROBOLINGGO
                  </div> -->
                  <!-- <div class="text-weight-bold f-10">
                    DINAS KESEHATAN, PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA
                  </div> -->
                  <div class="text-weight-bold f-14">
                    UOBK RSUD DOKTER MOHAMAD SALEH
                  </div>
                  <div class="f-12">
                    <div>Jl. Mayjend Panjaitan No.65 Probolinggo Jawa Timur</div>
                    <div>Telp. (0335) 433478,433119,421118 Fax. (0335) 432702</div>
                    <!-- <div>PROBOLINGGO – 67219</div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-3">
            <div class="text-center text-bold">
              PERSETUJUAN
              TINDAKAN KEDOKTERAN
            </div>
            <div class="text-center text-bold">
              OPERASI / TINDAKAN INVASIF
            </div>
          </div> -->
        </div>
      </div>

      <hr>
      <!-- CONTENT -->
      <div class="contentx">
        <div class="f-14 text-center text-bold q-mb-lg">
          RESUME MEDIS ( MEDICAL DISCHARGE SUMMARY )
        </div>
        <div class="full-width">
          <table width="99%" cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr valign="top">
                <td>Nama</td>
                <td>:</td>
                <td>{{ props?.pasien?.nama_panggil }}</td>
                <td>No. RM</td>
                <td>:</td>
                <td>{{ pasien?.norm }}</td>
              </tr>
              <tr valign="top">
                <td>Umur&nbsp;</td>
                <td>:</td>
                <td>{{ usiaTh }} thn&nbsp;</td>
                <td>Ruangan&nbsp;</td>
                <td>:</td>
                <td>{{ pasien?.ketruangan }}&nbsp;</td>
              </tr>
              <tr valign="top">
                <td />
                <td />
                <td />
                <td>Tanggal Masuk IGD</td>
                <td>:</td>
                <td>{{ pasien?.dataigd?.tglmasuk_igd ?? '-' }}</td>
              </tr>
              <tr valign="top">
                <td>Jenis Kelamin&nbsp;</td>
                <td>:</td>
                <td>{{ pasien?.kelamin }}</td>
                <td>Tanggal Masuk&nbsp;</td>
                <td>:</td>
                <td>{{ pasien?.tglmasuk ?? '-' }}</td>
              </tr>
              <tr valign="top">
                <td>Suku Bangsa</td>
                <td>:</td>
                <td />
                <td>Tgl. Keluar</td>
                <td>:</td>
                <td>{{ pasien?.tglkeluar ?? '-' }}</td>
              </tr>
              <tr valign="top">
                <td>Agama&nbsp;</td>
                <td>:</td>
                <td>{{ pasien?.agama }}</td>
                <td>DPJP </td>
                <td>:</td>
                <td>{{ pasien?.dokter }}</td>
              </tr>
              <tr valign="top">
                <td>No.Reg</td>
                <td>:</td>
                <td>{{ pasien?.noreg }}</td>
                <td>Status Covid 19</td>
                <td>:</td>
                <td>{{ pasien?.statuscovid?.length ? pasien?.statuscovid[0]?.flagcovid ?? '-' : '-' }}</td>
              </tr>
            </tbody>
          </table>

          <hr>
          <template v-for="(res, i) in resume" :key="i">
            <div class="row q-col-gutter-x-sm contentx">
              <div class="col-auto">
                <div class="flex q-gutter-md">
                  <div>{{ i + 1 }} . </div>
                  <div>{{ res?.title }}</div>
                  <div>:</div>
                </div>
              </div>
              <div v-if="res?.type === '1'" class="col full-width flex wrap">
                <div v-html="res?.isian" />
              </div>
              <div v-else-if="res?.type === '1Array'" class="col full-width flex wrap">
                <template v-for="(isi, j) in res?.isian" :key="j">
                  <span v-html="isi" />
                </template>
              </div>
              <div v-else-if="res?.type === 'penunjang'" class="col full-width">
                <div v-for="(item, n) in res?.isian" :key="n" class="column full-width">
                  <div class="row q-col-gutter-x-sm">
                    <div class="col-auto">
                      - {{ item?.label }} :
                    </div>
                    <div v-if="item?.data?.length" class="col full-width">
                      <template v-for="(pen, m) in item?.data" :key="m">
                        <!-- <span v-if="pen">{{ pen?.nama }} : <b>{{ pen?.hasil }}</b>, &nbsp; </span> -->
                        <span v-if="pen" v-html="pen" />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </template>

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

          <!-- end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import useResume from './useResume'
import html2pdf from 'html2pdf.js'
// eslint-disable-next-line no-unused-vars
import { getNewLine } from 'src/modules/formatter'

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

const { usiaTh, resume } = useResume(props?.pasien)
// console.log('resume', data)

const qrUrl = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'RESUME-MEDIS.png'
  const asal = 'RANAP'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

const exportPdf = () => {
  const concern = document.getElementById('pdfDoc')

  const pdfConfig = {
    margin: 0,
    filename: 'resume-medis-' + props?.pasien?.noreg + '.pdf',
    image: {
      type: 'jpeg',
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      logging: true,
      dpi: 192,
      letterRendering: true
    },
    jsPDF: {
      unit: 'mm', // mm | pt | in
      format: 'a4', // a4 | letter
      orientation: 'portrait' // landscape | portrait
    }
  }

  html2pdf().set(pdfConfig).from(concern).save()
}
defineExpose({ exportPdf })

</script>

<style lang="scss" scoped>
table,
tr,
td {
  border: none !important;
}

td {

  text-align: left;
}

.print-page {
  // width: 100%;
  // height: 100%;
  background-color: #ffffff;
  padding: 20px !important;
}

@media print {
  .print-page {
    padding: 0px !important;
  }

  @page {
    // size: 8.5in 9in;
    size: letter;
    // margin-top: 4in !important;
    // margin-left: 4in !important;
    // margin-right: 4in !important;

    // page-break-inside: auto;
    page-break-inside: avoid;

    @bottom-right {
      content: "Hal " counter(page) "-- dari " counter(pages) " hal";
    }

    // @top-right {
    //   content: "Page " counter(pageNumber);
    // }
  }

  .contentx {
    page-break-after: auto;
    // break-after: page;
  }

  // hr {
  //   page-break-before: auto;
  //   page-break-after: auto;
  // }

  // /* Menargetkan semua halaman bernomor genap */
  // @page :left {
  //   // margin-top: 4in !important;
  //   // margin-bottom: 4in !important;
  // }
  // @page :right {
  //   // margin-top: 4in !important;
  //   // margin-bottom: 4in !important;
  // }
  // /* Menargetkan semua halaman bernomor ganjil */
  // @page :right {
  //   size: 11in;
  //   margin-top: 4in;
  // }

  /* Targets all selectors with `page: wide;` set */
  // @page wide {
  //   size: a4 landscape;
  // }

  // @page {
  //   /* margin box at top right showing page number */
  //   @top-right {
  //     content: "Page " counter(pageNumber);
  //   }
  // }

}
</style>
