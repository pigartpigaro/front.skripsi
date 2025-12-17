<template>
  <q-bar v-if="!pasien?.nota_permintaan" dense class="bg-white q-my-md">
    <q-space />
    <q-btn ref="refPrint" v-print="printObj" unelevated color="dark" round size="sm" icon="icon-mat-print">
      <q-tooltip class="primary" :offset="[10, 10]">
        Print
      </q-tooltip>
    </q-btn>
  </q-bar>

  <div v-if="!pasien?.nota_permintaan" class="tinggi">
    <div id="printMe" class="full-width">
      <KopSurat />
      <div class="garis-bawah-dblue q-pb-sm q-mb-md">
        <div class="row justify-center f-20 text-weight-bold q-mb-md">
          RESUME HEMODIALISA
        </div>
        <div class="row">
          <div class="col-5">
            <div class="row">
              <div class="col-4">
                Nama
              </div>
              <div class="col-8">
                {{ pasien?.nama }}
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
          </div>
        </div>
      </div>
      <div>
        <div class="row q-my-sm">
          <div class="col-5">
            <div class="row">
              <div class="col-1">
                1
              </div>
              <div class="col-11">
                Diagnosis (ASSESMENT) :
              </div>
            </div>
          </div>
          <div class="col-7">
            <div v-for="(diagnosa, i) in store.items?.diagnosamedis" :key="i" class="row">
              <div class="col-12">
                {{ diagnosa?.masterdiagnosa?.rs3 ?? diagnosa?.masterdiagnosa?.rs4 }} ({{ diagnosa?.rs3 }})
              </div>
            </div>
            <!-- <div>{{ pasien?.memodiagnosa }}</div> -->
          </div>
        </div>
        <q-separator />
        <div class="row q-my-sm">
          <div class="col-5">
            <div class="row">
              <div class="col-1">
                2
              </div>
              <div class="col-11">
                Anamnese (SUBYEKTIF) :
              </div>
            </div>
          </div>
          <div class="col-7">
            <q-list class="bg-white" separator>
              <transition-group name="list">
                <q-item v-for="(anamnesis, n) in store.items?.anamnesis" :key="n" class="list-move q-pa-none">
                  <q-item-section class="">
                    <q-item-label class="f-12">
                      <span class="">Keluhan Utama </span> : <span class="text-weight-bold">{{ anamnesis?.keluhanUtama
                        }}</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Riwayat Penyakit (Sekarang) </span> : <span class="text-weight-bold">{{
                        anamnesis?.riwayatpenyakitsekarang }}</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Riwayat Penyakit </span> : <span class="text-weight-bold">{{
                        anamnesis?.riwayatpenyakit
                        }}</span>
                    </q-item-label>
                    <!-- <q-item-label>
                      <span class="">Riwayat Alergi </span> : <span class="text-weight-bold">{{ anamnesis?.riwayatalergi
                      }}</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Reaksi berupa </span> : <span class="text-weight-bold">{{
                        anamnesis?.keteranganalergi
                      }}</span>
                    </q-item-label> -->
                    <q-item-label>
                      <span class="">Riwayat Pengobatan</span> : <span class="text-weight-bold">{{
                        anamnesis?.riwayatpengobatan }}</span>
                    </q-item-label>

                    <!-- <q-item-label>
                      <span class="text-weight-bold">Skreening Gizi</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">- Apakah Pasian mengalami penurunan / peningkatan BB yang tidak diinginkan dalam 6
                        Bulan terakhir ? <b>{{ getYT(item?.skreeninggizi) }}</b></span>
                      <div class="q-my-xs">
                        - Apakah Asupan Makan berkurang karena tidak nafsu makan ? <b>{{ getYT(item?.asupanmakan) }}</b>
                      </div>
                      <div>- Kondisi Khusus : <em>{{ anamnesis?.kondisikhusus }}</em> <b>Skor : {{ anamnesis?.skor
                          }}</b>
                      </div>
                    </q-item-label> -->
                    <!-- <q-item-label>
                      <span class="text-weight-bold">Keluhan Nyeri</span>
                    </q-item-label>
                    <q-item-label>
                      <div>
                        - Skor Nyeri : <b>{{ anamnesis?.scorenyeri ?? '-' }}</b>

                        <em class="text-primary q-ml-sm"> {{ anamnesis?.keteranganscorenyeri ?? '-' }}</em>
                      </div>
                    </q-item-label> -->
                  </q-item-section>
                </q-item>
              </transition-group>

            </q-list>
          </div>
        </div>
        <q-separator />
        <div class="row q-my-sm">
          <div class="col-5">
            <div class="row">
              <div class="col-1">
                3
              </div>
              <div class="col-11">
                Pemeriksaaan fisik :
              </div>
            </div>
          </div>
          <div class="col-7">
            <q-list>
              <transition-group name="list">
                <template v-for="(pemeriksaanfisik, i) in store.items?.pemeriksaan" :key="i">
                  <q-item-label class="q-pa-none list-move">
                    - Keadaan Umum : {{ pemeriksaanfisik?.keadaanUmum }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Tingkat Kesadaran : {{ pemeriksaanfisik?.tkKesadaranKet }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - BB : {{ pemeriksaanfisik?.bb }} | TB : {{ pemeriksaanfisik?.tb }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Suhu : {{ pemeriksaanfisik?.suhu }} Celcius | Pernapasan : {{
                      pemeriksaanfisik?.pernapasan }} x/mnt | SPo2 : {{ pemeriksaanfisik?.spo }} %
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Nadi : {{ pemeriksaanfisik?.nadi }} | Sis / Dias : {{ pemeriksaanfisik?.sistole }} / {{
                      pemeriksaanfisik?.diastole }} mmHg
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Bagian Kepala : {{ pemeriksaanfisik?.rs5 }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Bagian Leher : {{ pemeriksaanfisik?.rs6 }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Bagian Dada : {{ pemeriksaanfisik?.rs7 }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Bagian Punggung : {{ pemeriksaanfisik?.rs8 }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Bagian Perut : {{ pemeriksaanfisik?.rs9 }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Tangan : {{ pemeriksaanfisik?.rs10 }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Kaki : {{ pemeriksaanfisik?.rs11 }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Status Neurologis : : {{ pemeriksaanfisik?.rs12 }}
                  </q-item-label>
                  <q-item-label class="q-pa-none list-move">
                    - Genital : {{ pemeriksaanfisik?.rs13 }}
                  </q-item-label>
                </template>
              </transition-group>
            </q-list>
          </div>
        </div>
        <q-separator />
        <div class="row q-my-sm">
          <div class="col-5">
            <div class="row">
              <div class="col-1">
                4
              </div>
              <div class="col-11">
                Edukasi Untuk Pasien :
              </div>
            </div>
          </div>
          <div class="col-7">
            <q-card v-for="(edukasi, i) in store.items?.rs239_implementasi" :key="i" flat>
              <q-card-section class="q-pa-none">
                <div class="column">
                  <div>Metode Yang Digunakan : {{ edukasi?.metode
                  }}
                  </div>
                  <div>Materi : {{ edukasi?.materi
                  }} </div>
                  <div> Media : <b><em> {{ edukasi?.media }}</em></b> </div>
                  <div> Evaluasi Respon : <b><em>{{ edukasi?.evaluasi }}</em></b> </div>
                  <div> Penerima Edukasi : <b><em>{{ edukasi?.penerima }}</em></b> </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <q-separator />
        <div class="row q-my-sm">
          <div class="col-5">
            <div class="row">
              <div class="col-1">
                5
              </div>
              <div class="col-2">
                Laborat :
              </div>
            </div>
          </div>
          <div class="col-7" v-if="store.items?.laboratold?.length > 0">
            <div class="row q-gutter-x-sm">
              <div v-for="(lab, l) in store.items?.laboratold" :key="l" class="col-auto">
                <q-chip outline color="dark" class="q-pa-xs">
                  {{ lab?.pemeriksaanlab?.rs2 }} = {{ lab?.rs21 ?? '-' }}
                </q-chip>
              </div>
            </div>
          </div>
        </div>
        <q-separator />
        <div class="row q-my-sm">
          <div class="col-5">
            <div class="row">
              <div class="col-1">
                6
              </div>
              <div class="col-11">
                Radiologi :
              </div>
            </div>
          </div>
          <div class="col-7">
            <div v-if="store.items?.hasilradiologi?.length > 0">
              <div v-for="(hasilradio, i) in store.items?.hasilradiologi" :key="i" class="row">
                <div class="col-12">
                  <div class="row no-wrap">
                    <div class="col-shrink q-mr-xs">
                      -
                    </div>
                    <div class="col">
                      {{ hasilradio?.rs3 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-separator />
        <div class="row q-my-sm">
          <div class="col-5">
            <div class="row">
              <div class="col-1">
                7
              </div>
              <div class="col-11">
                Obat :
              </div>
            </div>
          </div>
          <div class="col-7" v-if="store.items?.newapotekrajal?.length > 0">
            <div class="row items-center text-weight-bold">
              <div class="col-9">
                Obat
              </div>
              <!-- <div class="col-3">
                Jumlah
              </div> -->
            </div>
            <div v-for="(item, i) in store.items?.newapotekrajal" :key="i" class="row items-center">
              <div v-for="(newapotekrajal, i) in item?.permintaanresep" :key="i">
                <div class="col-9">
                  {{ newapotekrajal?.mobat?.nama_obat ?? '-' }} ,
                </div>
                <!-- <div class="col-3">
                  {{ item?.jumlah ?? '0' }}
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <q-separator />
        <div class="row q-my-sm">
          <div class="col-5">
            <div class="row">
              <div class="col-1">
                8
              </div>
              <div class="col-11">
                Tindakan
              </div>
            </div>
          </div>
          <div class="col-7">
            <div v-for="(item, i) in store.items?.tindakan" :key="i" class="row">
              <div class="col-12">
                {{ item?.mastertindakan?.rs2 }}
              </div>
            </div>
          </div>
        </div>
        <q-separator />
      </div>
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
    <div v-if="store.loading">
      <app-loading />
    </div>
  </div>
  <div v-else>
    <app-maintenance text="Hanya untuk Pasien Rawat Jalan dan Hemodialisa sebagai Poli" color="negative" />
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import KopSurat from 'src/components/KopSurat.vue'
import { getNewLine } from 'src/modules/formatter'
import { useDokumenResumeHDStore } from 'src/stores/simrs/hemodialisa/resume'
import { computed } from 'vue'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// console.log('pasien', props.pasien);

const store = useDokumenResumeHDStore()
const fisik = usePemeriksaanFisik()
store.setParams('noreg', props.pasien?.noreg)
store.getData()
// eslint-disable-next-line no-unused-vars
function getYT (val) {
  if (val === 1 || val === '1') {
    return 'Ya'
  }
  else if (val === 0 || val === '0') {
    return 'Tidak'
  }
  else {
    return '-'
  }
}
// eslint-disable-next-line no-unused-vars
// function getKesadaran(val) {
//   const temp = fisik.optionsTingkatkesadaran.filter(a => a.value === val)
//   if (temp?.length) {
//     return temp[0].label
//   }
//   else {
//     return '-'
//   }
// }
// eslint-disable-next-line no-unused-vars
function tekananDarah (val) {
  const normal = val >= 100 && val <= 120
  const prahipertensi = val >= 121 && val <= 139
  const hipertensiderajat1 = val >= 140 && val <= 159
  const hipertensiderajat2 = val >= 160

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  }
  else if (prahipertensi) {
    obj = { color: 'text-red', res: 'Prahipertensi' }
  }
  else if (hipertensiderajat1) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 1' }
  }
  else if (hipertensiderajat2) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 2' }
  }
  else {
    obj = { color: 'text-red', res: 'Not Valid' }
  }

  return obj
}
// eslint-disable-next-line no-unused-vars
function tekananDarahDias (val) {
  const normal = val >= 60 && val <= 79
  const prahipertensi = val >= 80 && val <= 89
  const hipertensiderajat1 = val >= 90 && val <= 99
  const hipertensiderajat2 = val >= 100

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  }
  else if (prahipertensi) {
    obj = { color: 'text-red', res: 'Prahipertensi' }
  }
  else if (hipertensiderajat1) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 1' }
  }
  else if (hipertensiderajat2) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 2' }
  }
  else {
    obj = { color: 'text-red', res: 'LOW' }
  }

  return obj
}
// eslint-disable-next-line no-unused-vars
function suhu (val) {
  const hipotermia = val < 35
  const normal = val >= 35 && val < 37
  const pireksia = val >= 37 && val <= 41.1
  const hipertermia = val > 41.1

  let obj = {
    color: 'teal',
    res: 'normal'
  }
  if (hipotermia) {
    obj = { color: 'red', res: 'Hipotermia' }
  }
  else if (normal) {
    obj = { color: 'teal', res: 'Normal' }
  }
  else if (pireksia) {
    obj = { color: 'red', res: 'Pireksia/febris' }
  }
  else if (hipertermia) {
    obj = { color: 'red', res: 'Hipertermia' }
  }

  return obj
}
// eslint-disable-next-line no-unused-vars
function nadi (val) {
  const bradikardi = val < 60
  const normal = val >= 61 && val <= 100
  const takikardi = val > 100

  let obj = {
    color: 'teal',
    res: 'Normal'
  }
  if (bradikardi) {
    obj = { color: 'red', res: 'Brakikardi' }
  }
  else if (normal) {
    obj = { color: 'teal', res: 'Normal' }
  }
  else if (takikardi) {
    obj = { color: 'red', res: 'Takikardi' }
  }

  return obj
}
const printObj = {
  id: 'printMe',
  popTitle: 'Resume Medik'

}

const qrUrl = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'RESUME-MEDIS.png'
  const asal = 'HEMODDIALISA'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})
</script>
<style lang="scss" scoped>
.tinggi {
  min-height: 100%;
}

.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}

.garis-bawah-dblue {
  border-bottom: 4px solid rgb(56, 150, 239);
  border-bottom-style: double;
}
</style>
