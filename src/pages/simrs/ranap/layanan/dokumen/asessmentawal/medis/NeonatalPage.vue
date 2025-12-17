<template>

  <div id="pdfDoc" class="bg-white print-page">


    <!-- KOP SURAT -->
    <div class="col-grow kotak">
      <div class="row items-center">

        <div class="col-9 sisi-kanan">
          <div class="row q-pa-sm">
            <div class="col-auto">
              <img src="~assets/images/logo-rsud.png" width="80">
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
          <div class="flex q-gutter-x-sm">
            <div>Nama</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pasien -->
    <div class="flex justify-between kotak q-mt-xs q-pa-sm" style="gap:0 10px">
      <div class="col-auto">Nama : {{ pasien?.nama_panggil }}</div>
      <div class="col-auto">No. Register : {{ pasien?.noreg }}</div>
      <div class="col-auto">Tanggal : {{ dateFullFormat(pasien?.tglmasuk) }}</div>
      <div class="col-auto">Jam : {{ jamTnpDetik(pasien?.tglmasuk) }}</div>
    </div>

    <!-- Anamnesis -->

    <div class="section">
      <div class="section-title">Anamnesis : </div>
      <div class="data">
        <div class="data-item">1. Keluhan Utama / Chief Complaint : {{ anamnesisAwal?.keluhanUtama || '-' }}</div>
        <div class="data-item">2. Riwayat Penyakit Sekarang / Present Disease History : {{
          anamnesisAwal?.riwayatpenyakitsekarang || '-' }}</div>
        <div class="data-item">3. Riwayat Penyakit Dahulu / Past Disease History : {{ anamnesisAwal?.riwayatpenyakit ||
          '-' }}</div>
        <div class="data-item">4. Riwayat Penyakit Keluarga / History Disease in the Family : {{
          anamnesisAwal?.riwayatpenyakitkeluarga || '-' }}</div>
        <div class="data-item">5. Riwayat Pekerjaan / History of Job : {{
          anamnesisAwal?.riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya || '-' }}</div>
        <div class="data-item">6. Status Sosial / Social Status : {{ pemeriksaanUmum?.sosial || '-' }}</div>
        <div class="data-item">7. Status Ekonomi / Economic Status : {{ pemeriksaanUmum?.ansuransi || '-' }} {{
          pemeriksaanUmum?.ansuransi ? 'Ansuransi' : '' }}
        </div>
        <div class="data-item">8. Status Kejiwaan dan Kebiasaan / Psychological Status : {{
          pemeriksaanUmum?.statusPsikologis }}</div>
        <div class="data-item flex">9. Kultural / Cultural :
          <div class="q-ml-sm">
            <div>- Pola Komunikasi {{ pemeriksaanUmum?.komunikasi }}</div>
            <div>- Pantangan Makanan {{ pemeriksaanUmum?.pantanganMkanan }}</div>
            <div>- makanan Pokok : {{ pemeriksaanUmum?.makananPokok }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Pemeriksaan Umum : </div>
      <!-- <div class="data">
        <div class="data-item">Kesadaran: ............................................</div>
        <div class="data-item">Tekanan Darah: ............................................ mmHg</div>
        <div class="data-item">Nadi: ............................................ x/menit</div>
        <div class="data-item">Suhu: ............................................ &deg;C</div>
        <div class="data-item">Pernapasan: ............................................ x/menit</div>
        <div class="data-item">Keadaan Umum: Baik / Sedang / Buruk</div>
        <div class="data-item">Keadaan Gizi: Baik / Sedang / Buruk</div>
      </div> -->
      <table border="0" style="border: none !important; margin-left: 10px; margin-top: -5px;">
        <tbody>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important; width:15%;"> - Kesadaran</td>
            <td style="border: none !important; padding: 0px !important; width: 35%;"> : {{
              pemeriksaanUmum?.tkKesadaranKet || ' - ' }}</td>
            <td style="border: none !important; padding: 0px !important; width: 15%;"> - Keadaan Umum </td>
            <td style="border: none !important; padding: 0px !important;">: {{ pemeriksaanUmum?.keadaanUmum || ' - ' }}
            </td>
          </tr>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important;"> - Tekanan Darah</td>
            <td style="border: none !important; padding: 0px !important;">: {{
              pemeriksaanUmum?.sistole || ' -' }} / {{ pemeriksaanUmum?.diastole || ' -' }} mmHg</td>
            <td style="border: none !important; padding: 0px !important;"> - Keadaan Gizi</td>
            <td style="border: none !important; padding: 0px !important;">:
              {{ anamnesisAwal?.skreeninggizi?.dewasa?.keterangan || ' - ' }}
            </td>
          </tr>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important;"> - Nadi</td>
            <td style="border: none !important; padding: 0px !important;">: {{ pemeriksaanUmum?.nadi || ' - ' }} x/menit
            </td>
            <td style="border: none !important; padding: 0px !important;"></td>
            <td style="border: none !important; padding: 0px !important;"></td>
          </tr>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important;"> - Suhu </td>
            <td style="border: none !important; padding: 0px !important;">: {{ pemeriksaanUmum?.suhu || ' - ' }} &deg;C
            </td>
            <td style="border: none !important; padding: 0px !important;"></td>
            <td style="border: none !important; padding: 0px !important;"></td>
          </tr>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important;"> - Pernapasan</td>
            <td style="border: none !important; padding: 0px !important;">: {{ pemeriksaanUmum?.pernapasan || ' - ' }}
              x/menit</td>
            <td style="border: none !important; padding: 0px !important;"></td>
            <td style="border: none !important; padding: 0px !important;"></td>
          </tr>


        </tbody>
      </table>
    </div>

    <table>
      <thead>
        <tr>
          <th>Bagian</th>
          <th>Normal</th>
          <th>Jika Tidak Normal, Jelaskan</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Kepala (Head)</td>
          <td>{{ pemeriksaanUmum?.rs5?.toUpperCase() === 'TAK' ? 'TAK' : '' }}</td>
          <td> {{ pemeriksaanUmum?.rs5?.toUpperCase() !== 'TAK' ? pemeriksaanUmum?.rs5 : '' }} </td>
        </tr>
        <!-- <tr>
          <td>Mata (Eyes)</td>
          <td>............................................</td>
          <td>............................................</td>
        </tr> -->
        <!-- <tr>
          <td>THT (ENT)</td>
          <td>............................................</td>
          <td>............................................</td>
        </tr> -->
        <!-- <tr>
          <td>Mulut (Mouth)</td>
          <td>............................................</td>
          <td>............................................</td>
        </tr> -->
        <tr>
          <td>Leher (Neck)</td>
          <td>{{ pemeriksaanUmum?.rs6?.toUpperCase() === 'TAK' ? 'TAK' : '' }}</td>
          <td> {{ pemeriksaanUmum?.rs6?.toUpperCase() !== 'TAK' ? pemeriksaanUmum?.rs6 : '' }} </td>
        </tr>
        <!-- <tr>
          <td>Jantung (Heart)</td>
          <td>............................................</td>
          <td>............................................</td>
        </tr> -->
        <tr>
          <td>Dada & Payudara (Chest & Breast)</td>
          <td>{{ pemeriksaanUmum?.rs7?.toUpperCase() === 'TAK' ? 'TAK' : '' }}</td>
          <td> {{ pemeriksaanUmum?.rs7?.toUpperCase() !== 'TAK' ? pemeriksaanUmum?.rs7 : '' }} </td>
        </tr>
        <tr>
          <td>Punggung (Back)</td>
          <td>{{ pemeriksaanUmum?.rs8?.toUpperCase() === 'TAK' ? 'TAK' : '' }}</td>
          <td> {{ pemeriksaanUmum?.rs8?.toUpperCase() !== 'TAK' ? pemeriksaanUmum?.rs8 : '' }} </td>
        </tr>
        <tr>
          <td>Perut (Abdomen)</td>
          <td>{{ pemeriksaanUmum?.rs9?.toUpperCase() === 'TAK' ? 'TAK' : '' }}</td>
          <td> {{ pemeriksaanUmum?.rs9?.toUpperCase() !== 'TAK' ? pemeriksaanUmum?.rs9 : '' }} </td>
        </tr>
        <tr>
          <td>Urogenital</td>
          <td>{{ pemeriksaanUmum?.rs13?.toUpperCase() === 'TAK' ? 'TAK' : '' }}</td>
          <td> {{ pemeriksaanUmum?.rs13?.toUpperCase() !== 'TAK' ? pemeriksaanUmum?.rs13 : '' }} </td>
        </tr>
        <!-- <tr>
          <td>Anggota Gerak (Extremities)</td>
          <td>............................................</td>
          <td>............................................</td>
        </tr> -->
        <tr>
          <td>Tangan (Hand)</td>
          <td>{{ pemeriksaanUmum?.rs10?.toUpperCase() === 'TAK' ? 'TAK' : '' }}</td>
          <td> {{ pemeriksaanUmum?.rs10?.toUpperCase() !== 'TAK' ? pemeriksaanUmum?.rs10 : '' }} </td>
        </tr>
        <tr>
          <td>Kaki (Foot)</td>
          <td>{{ pemeriksaanUmum?.rs11?.toUpperCase() === 'TAK' ? 'TAK' : '' }}</td>
          <td> {{ pemeriksaanUmum?.rs11?.toUpperCase() !== 'TAK' ? pemeriksaanUmum?.rs11 : '' }} </td>
        </tr>
        <tr>
          <td>Status Neurologis (Neurological Status)</td>
          <td>{{ pemeriksaanUmum?.rs12?.toUpperCase() === 'TAK' ? 'TAK' : '' }}</td>
          <td> {{ pemeriksaanUmum?.rs12?.toUpperCase() !== 'TAK' ? pemeriksaanUmum?.rs12 : '' }} </td>
        </tr>
        <!-- <tr>
          <td>Muskuloskeletal</td>
          <td>............................................</td>
          <td>............................................</td>
        </tr> -->
      </tbody>
    </table>



    <div class="section">
      <table border="0" style="border: none !important; margin-left: 10px; margin-top: -5px;">
        <tbody>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important; width: 35%">
              <div class="text-weight-bold">PEMERIKSAAN PENUNJANG PRE-RAWAT INAP</div>
              <div class="text-italic">PRE-INPATIENT SUPPORTING CHECKUP</div>
            </td>
            <td valign="top" style="border: none !important; padding: 0px !important;"> : </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">Asesmen</div>
      <table style="margin-top: -5px;">
        <thead>
          <tr>
            <th width="50%" class="text-center">MASALAH MEDIS</th>
            <th width="50%">MASALAH KEPERAWATAN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="50%">{{ pasien?.memodiagnosa }}</td>
            <td width="50%">
              <div v-for="(item, i) in pasien?.diagnosakeperawatan" :key="i">
                <div> - {{ item?.nama }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>


    <div class="section">
      <table border="0" style="border: none !important; margin-left: 10px; margin-top: -5px;">
        <tbody>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important; width: 17%">
              <div class="text-weight-bold">DIAGNOSIS KERJA</div>
              <div class="text-italic">WORKING DIAGNOSIS</div>
            </td>
            <td valign="top" style="border: none !important; padding: 0px !important;"> : {{
              diagnosa?.masterdiagnosa?.rs4 || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="section">
      <table border="0" style="border: none !important; margin-left: 10px; margin-top: -5px;">
        <tbody>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important; width: 20%">
              <div class="text-weight-bold">DIAGNOSIS BANDING</div>
              <div class="text-italic">DIFFERENTIAL DIAGNOSIS</div>
            </td>
            <td valign="top" style="border: none !important; padding: 0px !important;"> : {{
              diagnosa?.rs6 || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <table border="0" style="border: none !important; margin-left: 10px; margin-top: -5px;">
        <tbody>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important; width: 17%">
              <div class="text-weight-bold">PENGOBATAN</div>
              <div class="text-italic">THERAPY</div>
            </td>
            <td valign="top" style="border: none !important; padding: 0px !important;"> : {{
              pasien?.planningdokter?.terapi }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <table border="0" style="border: none !important; margin-left: 10px; margin-top: -5px;">
        <tbody>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important; width: 17%">
              <div class="text-weight-bold">RENCANA</div>
              <div class="text-italic">PLANNING</div>
            </td>
            <td valign="top" style="border: none !important; padding: 0px !important;">
              <div class="flex">
                <div class="q-mr-sm">: </div>
                <div>
                  <div>Monitoring : {{ pasien?.planningdokter?.monitor || '-' }}</div>
                  <div>Target : {{ pasien?.planningdokter?.target || '-' }}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <table border="0" style="border: none !important; margin-left: 10px; margin-top: -5px;">
        <tbody>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important; width: 17%">
              <div class="text-weight-bold">CATATAN KIE</div>
              <div class="text-italic">EDUCATION NOTE</div>
            </td>
            <td valign="top" style="border: none !important; padding: 0px !important;"> : - </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <table border="0" style="border: none !important; margin-left: 10px; margin-top: -5px;">
        <tbody>
          <tr style="border: none !important; padding: 0px !important;">
            <td style="border: none !important; padding: 0px !important; width: 17%">
              <div class="text-weight-bold">TANGGAL / DATE</div>
              <div class="text-italic">JAM / TIME</div>
            </td>
            <td valign="top" style="border: none !important; padding: 0px !important;"> : <b>Tanggal</b> {{
              dateFullFormat(pasien?.tglmasuk) }} / <b>Jam</b> {{ jamTnpDetik(pasien?.tglmasuk) }}</td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="section">

      <div class="flex justify-between q-mx-xl">
        <!-- <div class="flex-center " style="width: 60px;">
          <div class="relative-position">
            <vue-qrcode :value="qrDokter" tag="svg" :options="{
              errorCorrectionLevel: 'Q',
              color: {
                dark: '#000000',
                light: '#ffffff',
              },
              margin: 0
            }" />
          </div>
          <div class="f-8 text-wrap text-center">{{ dpjp?.nama }}</div>
        </div> -->

        <div></div>


        <div class="column flex-center ">

          <div>DOKTER</div>
          <div style="margin-top: -5px; margin-bottom: 10px;">DOCTOR</div>

          <div class="relative-position" style="width: 80px;">
            <vue-qrcode :value="qrDokter" tag="svg" :options="{
              errorCorrectionLevel: 'Q',
              color: {
                dark: '#000000',
                light: '#ffffff',
              },
              margin: 0
            }" />
            <!-- <img class="qrcode__image" src="~assets/logos/logo-rsud.png" alt="RSUD DOKTER MOHAMAD SALEH"> -->
          </div>
          <div class="text-wrap text-center">{{ dpjp?.nama }}</div>
        </div>
      </div>
    </div>

  </div>



</template>

<script setup>
import { api } from 'src/boot/axios';
import { dateFullFormat, jamTnpDetik } from 'src/modules/formatter';
import { computed, onMounted, ref } from 'vue';




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

const dpjp = ref(null)

onMounted(() => {
  getDpjpData()
})



// console.log('props', props?.pasien);

const anamnesisAwal = computed(() => {
  const awal = props?.pasien?.anamnesis?.find(x => x?.awal === '1' && x?.nakes === '1') || null
  console.log('awal', awal);

  return awal
})
const pemeriksaanUmum = computed(() => {
  const awal = props?.pasien?.pemeriksaan?.find(x => x?.awal === '1' && x?.nakes === '1') || null
  console.log('awal', awal);

  return awal
})

const diagnosa = computed(() => {
  const primer = props?.pasien?.diagnosa?.find(x => x?.rs4 === 'Primer' && x?.rs13 === 'POL014') || null
  console.log('awal', primer);

  return primer
})


const getDpjpData = async () => {
  const res = await api.get(`/v1/pegawai/master/pegawai-by-kdpegsimrs?kdpegsimrs=${props?.pasien?.kodedokter}`)
  // console.log('res', res);
  if (res.status === 200) {
    dpjp.value = res.data

  }

}

const qrDokter = computed(() => {
  // const petugas = 'Nama : ' + dpjp?.value?.nama ?? '' + 'NIP : ' + dpjp?.value?.nip ?? ''
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'ASESSMENT-AWAL-MEDIS.png'
  const asal = 'RANAP'
  const petugas = dpjp?.value?.nip || null
  const enc = btoa(`${noreg}|${dok}|${asal}|${petugas}`)
  return `${enc}`
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
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #000;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
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