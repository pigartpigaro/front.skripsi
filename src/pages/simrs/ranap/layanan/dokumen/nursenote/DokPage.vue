<template>
  <div id="pdfDoc" class="bg-white print-page">

    <div v-if="store.loading" class="full-height">
      <div class="full-height column flex-center">
        Harap Tunggu ...
      </div>
    </div>

    <div v-else>
      <div v-if="store.items?.length === 0" class="full-height column flex-center" style="min-height: 400px;">
        <div class="full-height column flex-center">
          Belum Ada Data
        </div>
      </div>

    </div>
    <div v-else>
      <!-- KOP SURAT -->
      <div class="col-grow kotak">
        <div class="row items-center">

          <div class="col-9 sisi-kanan">
            <div class="row q-pa-sm">
              <div class="col-auto">
                <img src="~assets/images/logo-rsud.png" style="width: 80px;">
              </div>
              <div class="col flex-wrap q-px-lg">
                <div class="text-center">
                  <div class="text-weight-bold f-12">
                    {{ dataHeader[0] }}
                  </div>
                  <div class="text-weight-bold f-10">
                    {{ dataHeader[1] }}
                  </div>
                  <div class="text-weight-bold f-16">
                    {{ dataHeader[2] }}
                  </div>
                  <div class="f-10">
                    <div>{{ dataHeader[3] }}</div>
                    <div>{{ dataHeader[4] }}</div>
                    <div>{{ dataHeader[5] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 f-14">
            <div class="text-center text-bold">
              {{ menu?.title }}
            </div>
            <div class="text-center text-bold">
              RAWAT INAP
            </div>
            <div class="text-center text-bold">
              {{ kasus?.uraian.toUpperCase() }}
            </div>
          </div>
        </div>
      </div>


      <!-- kontent -->

      <!-- bio pasien -->

      <div class="section">
        <table border="0" style="border: none !important; margin-left: 10px; margin-top: -5px;">
          <tbody>
            <tr style="border: none !important; padding: 0px !important;">
              <td style="border: none !important; padding: 0px !important; width:15%;"> NAMA PASIEN</td>
              <td style="border: none !important; padding: 0px !important; width: 85%;"> : {{ pasien?.nama_panggil }}
              </td>
            </tr>
            <tr style="border: none !important; padding: 0px !important;">
              <td style="border: none !important; padding: 0px !important; width:15%;"> TANGGAL LAHIR</td>
              <td style="border: none !important; padding: 0px !important; width: 85%;"> : {{ pasien?.tgllahir }}</td>
            </tr>
            <tr style="border: none !important; padding: 0px !important;">
              <td style="border: none !important; padding: 0px !important; width:15%;"> NO.RM</td>
              <td style="border: none !important; padding: 0px !important; width: 85%;"> : {{ pasien?.norm }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section">
        <table border="1" width="100%">
          <thead>
            <tr>
              <th style="width:20%">
                <div class="column flex-center">HARI / TANGGAL</div>
              </th>
              <th style="width: 60%;">
                <div class="column flex-center">
                  CATATAN KEPERAWATAN
                </div>
              </th>

              <th style="width: 20%;">
                <div class="column flex-center">
                  <div>NAMA & </div>
                  <div>TANDA TANGAN </div>
                </div>
              </th>

            </tr>

          </thead>
          <tbody>
            <template v-for="item in store.items" :key="item.id">
              <tr>
                <td valign="top">
                  <div class="column flex-center">
                    <div>{{ dateFullFormat(item?.created_at) }}</div>
                    <div class="text-grey-8">Jam : {{ jamTnpDetik(item?.created_at) }}</div>
                  </div>
                </td>
                <td valign="top">
                  <div class="full-width column">
                    <div class="text-bold">Catatan : </div>
                    <div>{{ item?.implementasi || '-' }}</div>

                    <template v-if="item?.flag.includes('2') || item?.flag.includes('4')">
                      <div class="text-bold">Observasi : </div>
                      <div>BB : {{ item?.bb }}, TB : {{ item?.tb }}, Nadi : {{ item?.nadi }}, Suhu : {{ item?.suhu }},
                        Sis
                        :
                        {{ item?.sis }}, Dia : {{ item?.dia }}, RR : {{ item?.rr }}, Spo2 : {{ item?.spo2 }}, Nyeri : {{
                          item?.nyeri }}, Skor : {{ item?.skor }}</div>
                      <div>CVP : {{ item?.cvp }}, ICP : {{ item?.icp }}, GCS : {{ item?.gcs }}, Kejang, Durasi : {{
                        item?.kejang
                      }},</div>
                    </template>
                    <template v-if="item?.flag.includes('5')">
                      <div class="text-bold">Catatan Pemberian Infus : </div>
                      <div> - {{ item?.ket }}</div>
                    </template>


                    <template v-if="item?.flag.includes('6')">
                      <div class="text-bold">Ventilator Menu : </div>
                      <div>
                        MODE : {{ item?.mode }}, Fraksi O2 : {{ item?.fraksio2 }}, Frekuensi : {{ item?.frek }}, PEEP :
                        {{
                          item?.peep }}, P ins : {{ item?.pins }}, I:E Rasio : {{ item?.ratio }},
                      </div>
                    </template>

                    <template v-if="item?.flag.includes('3')">
                      <div class="text-bold">INTAKE : </div>
                      <div>INFUS : {{ item?.infus }}, PUMP : {{ item?.pump }}, Obat2an : {{ item?.obat }}, Albumin : {{
                        item?.albumin }}, Makmin : {{ item?.mamin }}, Zonde : {{ item?.zonde }}, Water : {{ item?.water
                        }},
                      </div>
                      <div class="text-bold">OUTPUT : </div>
                      <div>
                        URINE : {{ item?.urine }}, DRAIN : {{ item?.drain }}, MUNTAH : {{ item?.muntah }}, Feces : {{
                          item?.feces }}, IWL : {{ item?.iwl }}, Pendarahan : {{ item?.pendarahan }}, UFG : {{ item?.ufg
                        }},
                        Produksi GC : {{ item?.produksigc }},
                      </div>
                    </template>


                    <template v-if="item?.flag.includes('1')">
                      <div class="text-bold">Pemberian Obat : </div>
                      <template v-if="item?.reseps?.length">
                        <div v-for="(resep, r) in item?.reseps" :key="r">
                          <div class="column full-width">
                            <div class="q-ml-sm"> &#9673; <span class="text-italic text-grey-8">{{ resep?.jumlah }} {{
                              resep?.satuan_ambil
                                }}</span>,
                              {{
                                resep?.nama_obat }}, <span class="text-italic text-grey-8">sisa : {{ resep?.sisa || '...'
                                }}</span>
                              {{ resep?.satuan_ambil }}</div>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="q-ml-sm"> &#9673; Tidak ada obat yang diberikan</div>
                      </template>
                    </template>
                    <template v-if="item?.flag_balance === '1'">
                      <div class="text-bold">Balance Cairan : <em>{{ item?.balance }}</em></div>

                    </template>
                  </div>
                </td>
                <td valign="top">
                  <div class="text-center">
                    <div>{{ item?.petugas?.nama }}</div>
                  </div>
                </td>
              </tr>
            </template>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useNurseNoteRanapStore } from 'src/stores/simrs/ranap/nursenote';
import { dateFullFormat, jamTnpDetik } from 'src/modules/formatter';

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  dataHeader: {
    type: Array,
    default: null
  }
})

const store = useNurseNoteRanapStore()

onMounted(() => {
  // console.log('props', props?.pasien);
  Promise.all([
    store.getNakes(),
    store.getData(props?.pasien)
  ])

  // console.log('store', store.items);
})

</script>


<style lang="scss" scoped>
.kotak {
  border: 1px solid black;
}

.sisi-kanan {
  border-right: 1px solid black;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.section {
  margin-top: 20px;
}

.section-title {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.data {
  margin-left: 20px;
}

.data-item {
  margin-bottom: 8px;
}

table {
  // width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  // width: max-content;
}

th,
td {
  border: 1px solid #000;
  padding: 10px;
  text-align: left;
  width: min-content;
}

th {
  background-color: #f2f2f2;
}

.print-page {
  background-color: #ffffff;
  padding: 20px !important;
  font-size: 12px;
}

@media print {
  .print-page {
    padding: 0px !important;
  }

  @page {
    size: letter;
    page-break-inside: avoid;

    @bottom-right {
      content: "Dokumen Sah dari RSUD MOH SALEH KOTA PROBOLINGGO | Hal Ke-" counter(page);
    }
  }

  .contentx {
    page-break-after: auto;
  }
}
</style>
