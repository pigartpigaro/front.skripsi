<template>
  <div v-if="!store.rekapBill && !store.loading">
    <app-no-data />
  </div>
  <div v-if="store.loading">
    <app-loading />
  </div>
  <div v-if="store.rekapBill && !store.loading" class="full-height q-mt-md">
    <div class="row q-gutter-sm items-center no-wrap ">
      <div class="col-auto">
        1.
      </div>
      <div class="col-2">
        Diagnosa (ASSESMENT)
      </div>
      <div class="col-auto">
        :
      </div>
      <div class="col-10">
        <div v-for="(diag, i) in pasien?.diagnosa" :key="i">
          {{ diag?.masterdiagnosa?.rs4 }}
        </div>
      </div>
    </div>
    <q-separator class="q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
    <div class="row q-gutter-sm items-center no-wrap ">
      <div class="col-auto ">
        2.
      </div>
      <div class="col-2">
        Anamnesis (SUBYEKTIF)
      </div>
      <div class="col-auto">
        :
      </div>
      <div class="col-10" v-for="(anamnesis, i) in hasilanamnesis" :key="i">
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Keluhan Utama
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ anamnesis?.rs4 }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Riwayat Penyakit Sekarang
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ anamnesis?.riwayatpenyakitsekarang }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Riwayat Penyakit Dahulu
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ anamnesis?.riwayatpenyakit }}
          </div>
        </div>
      </div>
    </div>
    <q-separator class="q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
    <div class="row q-gutter-sm items-center no-wrap ">
      <div class="col-auto">
        3.
      </div>
      <div class="col-2">
        Pemeriksaan Fisik (OBYEKTIF)
      </div>
      <div class="col-auto">
        :
      </div>
      <div class="col-10" v-for="(pemeriksaanfisik, i) in hasilpemeriksaanfisik" :key="i">
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Kepala
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ pemeriksaanfisik?.rs5 ?? '-' }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Leher
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ pemeriksaanfisik?.rs6 ?? '-' }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Dada
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ pemeriksaanfisik?.rs7 ?? '-' }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Punggung
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ pemeriksaanfisik?.rs8 ?? '-' }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Perut
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ pemeriksaanfisik?.rs9 ?? '-' }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Tangan
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ pemeriksaanfisik?.rs10 ?? '-' }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Kaki
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ pemeriksaanfisik?.rs11 ?? '-' }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Status Neurologis
          </div>
          <div class="col-auto">
            :
          </div>
          <div class="col-8">
            {{ pemeriksaanfisik?.rs12 ?? '-' }}
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-auto">
            - Genital
          </div>
          <div class="col-1">
            :
          </div>
          <div class="col-8">
            {{ pemeriksaanfisik?.rs13 ?? '-' }}
          </div>
        </div>
        <q-separator class="q-mt-sm q-mb-sm" style="width: 88%;" />
        <div class="row q-gutter-sm" v-for="(triage, x) in pasien?.triage" :key="x">
          <q-badge outline color="black">
            Sax : {{ triage?.suhu ?? '-' }}</q-badge>
          <!-- <q-badge outline color="black">
            Srec : {{ triage?.suhu ?? '-' }}</q-badge> -->
          <q-badge outline color="black">
            Napas : {{ triage?.pernapasanx ?? '-' }}</q-badge>
          <q-badge outline color="black">
            Nadi : {{ triage?.nadi ?? '-' }}</q-badge>
          <q-badge outline color="black">
            Tensi : {{ triage?.sistole ?? '-' }}/{{ triage?.diastole ?? '-' }}</q-badge>
          <q-badge outline color="black">
            Spo2 : {{ triage?.spo2 ?? '-' }}</q-badge>
          <q-badge outline color="black">
            BB : {{ triage?.bb ?? '-' }}</q-badge>
          <q-badge outline color="black">
            Tinggi : {{ triage?.tb ?? '-' }}</q-badge>
          <!-- <q-badge outline color="black">
            Alergi : {{ anamnesis?.riwayatalergi ?? '-' }}</q-badge> -->
        </div>
        <q-separator class="q-mt-sm q-mb-sm" style="width: 88%;" />
        <div v-for="(triagex, xx) in pasien?.triage" :key="xx">
          Kategori Triage : {{ triagex?.kategoritriage ?? '-' }}
        </div>
      </div>
    </div>
    <q-separator class=" q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
    <div class="row q-gutter-sm items-center no-wrap ">
      <div class="col-auto">4.</div>
      <div class="col-2">
        Laboratorium
      </div>
      <div class="col-auto">:</div>
      <div class="col-8">
        <div class="row q-gutter-sm">
          <div v-for="(lab, l) in pasien?.laboratold" :key="l">
            <q-badge outline color="black">{{ lab?.pemeriksaanlab?.rs2 }} = {{ lab?.rs21 ?? '-' }}</q-badge>
          </div>
        </div>
      </div>
    </div>
    <q-separator class=" q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
    <div class="row q-gutter-sm items-center no-wrap ">
      <div class="col-auto">5.</div>
      <div class="col-2">
        Radiologi
      </div>
      <div class="col-auto">:</div>
      <div class="col-8">
        <div class="row q-gutter-sm">
          <div v-for="(haradio, r) in pasien?.hasilradiologi" :key="r">
            <span>{{ haradio?.rs3 }}</span>
          </div>
        </div>
      </div>
    </div>
    <q-separator class=" q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
    <div class="row q-gutter-sm items-center no-wrap ">
      <div class="col-auto">6.</div>
      <div class="col-2">
        Obat
      </div>
      <div class="col-auto">:</div>
      <div class="col-8">
        <div class="row q-gutter-xs">
          <div v-for="(newapotekrajalx, rx) in filterredTableobat" :key="rx">
            <q-badge color="black" outline>{{ newapotekrajalx?.nama }}</q-badge>
          </div>
        </div>
      </div>
    </div>
    <q-separator class=" q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
    <div class="row q-gutter-sm items-center no-wrap ">
      <div class="col-auto">7.</div>
      <div class="col-2">
        Tindakan
      </div>
      <div class="col-auto">:</div>
      <div class="col-8">
        <div class="row q-gutter-xs">
          <div v-for="(tindakan, t) in filterredTabletindakan" :key="t">
            <q-badge color="black" outline>{{ tindakan?.nama }}</q-badge>
          </div>
        </div>
      </div>
    </div>
    <q-separator class=" q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
    <div class="row q-gutter-sm items-center no-wrap ">
      <div class="col-auto">8.</div>
      <div class="col-2">
        Cara Keluar
      </div>
      <div class="col-auto">:</div>
      <div class="col-8">
        <div class="row q-gutter-xs">
          <div v-for="(carakeluar, t) in pasien?.planheder" :key="t">
            <span v-if="carakeluar?.rs4 === 'Pulang'">{{ carakeluar?.rs4 }}</span>
            <span v-else-if="carakeluar?.rs4 === 'Rawat Inap'">{{ carakeluar?.rs4 }} Ke {{
              carakeluar?.planranap?.ruangranap?.rs2 }}</span>
            <span v-else-if="carakeluar?.rs4 === 'Rujuk'">{{ carakeluar?.rs4 }} Ke {{ carakeluar?.transrujukan?.rs7
              }}</span>
            <span v-else></span>
          </div>
        </div>
      </div>
    </div>
    <q-separator class=" q-mt-sm q-mb-sm" style="border-top: 1px solid black;" />
    <div class="row items-center no-wrap q-mt-xl ">
      <div class="col-6 text-center " />
      <div class="col-6 text-weight-bold text-center">
        Probolinggo, {{ date.formatDate(Date.now(), 'DD MMMM YYYY') }}
      </div>
    </div>
    <div class="row items-center no-wrap">
      <div class="col-6 text-center text-weight-bold">Pasien/Keluarga </div>
      <div class="col-6 text-weight-bold text-center">
        Dokter
      </div>
    </div>
    <div class="row items-center no-wrap">
      <div class="col-6 text-right" />
      <div class="col-6 text-weight-bold text-center">
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
      </div>
    </div>
    <div class="row items-center no-wrap q-mt-lg">
      <div class="col-6 text-center">(..........................)</div>
      <div class="col-6 text-weight-bold text-center">
        {{ pasien.dokter }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter';
import { useKasirIgdStore } from 'src/stores/simrs/kasir/igd/kasirigd';
import { date } from 'quasar';
import { computed } from 'vue';

const store = useKasirIgdStore()
const props = defineProps({
  pasien: { type: Object, default: () => { } }
})

const qrUrl = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'Reseume-Medis.png'
  const asal = 'IGD'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

const dataanamnesis = props?.pasien?.anamnesis
const hasilanamnesis = dataanamnesis.filter(item => {
  if (item.datasimpeg.kdgroupnakes === "1") {
    // lakukan sesuatu dengan item
    console.log(item);
    return true;
  }
  return false;
});

const datapemeriksaanfisik = props?.pasien?.pemeriksaanfisikpsikologidll
const hasilpemeriksaanfisik = datapemeriksaanfisik.filter(item => {
  if (item.datasimpeg.kdgroupnakes === "1") {
    // lakukan sesuatu dengan item
    console.log(item);
    return true;
  }
  return false;
});

const filterredTableobat = computed(() => {
  const dataawalobat = props?.pasien?.newapotekrajal
  // console.log('dataawalobat', dataawalobat);
  const hasilglobal = []
  dataawalobat.forEach(x => {
    const permintaanresep = x?.permintaanresep
    // console.log('permintaanresep', permintaanresep);
    const hasil = []
    permintaanresep.forEach(y => {
      // console.log('y', y?.mobat);
      const obat = {
        kode: y?.mobat?.kd_obat,
        nama: y?.mobat?.nama_obat,
      }
      hasil.push(obat)
    })
    const xxx = [...new Set(hasil)]
    // const sasa = xxx.filter(item => item.kode !== null)
    hasilglobal.push(xxx)
  })

  const flattenedArray = hasilglobal.flat();
  const uniqueMap = new Map()
  flattenedArray.forEach(item => uniqueMap.set(item.kode, item));

  return [...uniqueMap.values()]
})


const filterredTabletindakan = computed(() => {
  const arr = props?.pasien?.tindakan
  console.log('arr', arr);
  const tindakan = []
  arr.forEach(x => {
    const tindakanx = {
      kode: x?.mastertindakan?.rs1,
      nama: x?.mastertindakan?.rs2,
    }
    tindakan.push(tindakanx)
  })
  const xxx = tindakan
  const uniqueMap = new Map();
  xxx.forEach(item => uniqueMap.set(item.kode, item));

  return [...uniqueMap.values()]
})


</script>

<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
