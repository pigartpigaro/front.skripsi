<template>
  <div class="row q-col-gutter-xs full-width">
    <q-card flat bordered class="col-12 relative-position">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Pemeriksaan Umum</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm row q-col-gutter-xs ">
        <q-select ref="refKeadaanUmum" v-model="store.form.keadaanUmum" dense standout="bg-yellow-3 text-black" outlined
          label="Keadaan Umum" :options="store.keadaanUmums" class="col-4" input-class="ellipsis" fill-input
          :rules="[val => !!val || 'Harap diisi']" lazy-rules="ondemand" hide-bottom-space />
        <app-input-simrs label="BB (kg)" class-tambahan="col-2" v-model="store.form.bb" :valid="{ number: true }"
          :lazy-rules="false" @update:model-value="(val) => {
            const _removedZeros = val.replace(/^0+/, '')
            if (val > 1) store.form.bb = _removedZeros
            // cekEws('bb', _removedZeros)
          }" />
        <app-input-simrs label="TB (cm)" class="col-2" v-model="store.form.tb" :valid="{ number: true }"
          @update:model-value="(val) => {
            const _removedZeros = val.replace(/^0+/, '')
            if (val > 1) store.form.tb = _removedZeros
            // cekEws('tb', _removedZeros)
          }" />

        <app-input-simrs label="Sis (mmHg)" class="col-2" v-model="store.form.sistole" :valid="{ number: true }"
          :lazy-rules="true" @update:model-value="(val) => {
            const _removedZeros = val.replace(/^0+/, '')
            if (val > 1) store.form.sistole = _removedZeros

            cekEws()
          }" />
        <app-input-simrs label="Dia (mmHg)" class="col-2" v-model="store.form.diastole" :valid="{ number: true }"
          :lazy-rules="true" @update:model-value="(val) => {
            const _removedZeros = val.replace(/^0+/, '')
            if (val > 1) store.form.diastole = _removedZeros

            cekEws()
          }" />
        <app-input-simrs label="N (x/mnt)" class="col-2" v-model="store.form.nadi" :valid="{ number: true }"
          :lazy-rules="true" @update:model-value="(val) => {
            const _removedZeros = val.replace(/^0+/, '')
            if (val > 1) store.form.nadi = _removedZeros

            cekEws()
          }" />
        <app-input-simrs label="RR (x/mnt)" class="col-2" v-model="store.form.pernapasan" :valid="{ number: true }"
          :lazy-rules="true" @update:model-value="(val) => {
            const _removedZeros = val.replace(/^0+/, '')
            if (val > 1) store.form.pernapasan = _removedZeros

            cekEws()
          }" />
        <app-input-simrs label="SpO2 (%)" class="col-2" v-model="store.form.spo" :valid="{ number: true }"
          :lazy-rules="true" @update:model-value="(val) => {
            const _removedZeros = val.replace(/^0+/, '')
            if (val > 1) store.form.spo = _removedZeros

            cekEws()
          }" />
        <app-input-simrs label="Suhu C" class="col-3" v-model="store.form.suhu" :valid="{ number: true }"
          :lazy-rules="true" @update:model-value="(val) => {
            const _removedZeros = val.replace(/^0+/, '')
            if (val > 1) store.form.suhu = _removedZeros

            cekEws()
          }" />
        <div v-if="gruping === '4.4' || gruping === '5.4'" class="col-12 row q-col-gutter-xs">
          <app-input-simrs label="Lika (cm)" class="col-2" v-model="store.formPediatrik.lila" :valid="{ number: true }"
            :lazy-rules="true" @update:model-value="(val) => {
              const _removedZeros = val.replace(/^0+/, '')
              if (val > 1) store.formPediatrik.lila = _removedZeros

              // cekEws('bb', _removedZeros)
            }" />
          <app-input-simrs label="Lida (cm)" class="col-2" v-model="store.formPediatrik.lida" :valid="{ number: true }"
            :lazy-rules="true" @update:model-value="(val) => {
              const _removedZeros = val.replace(/^0+/, '')
              if (val > 1) store.formPediatrik.lida = _removedZeros
            }" />
          <app-input-simrs label="Lirut (cm)" class="col-2" v-model="store.formPediatrik.lirut"
            :valid="{ number: true }" :lazy-rules="true" @update:model-value="(val) => {
              const _removedZeros = val.replace(/^0+/, '')
              if (val > 1) store.formPediatrik.lirut = _removedZeros
            }" />
          <app-input-simrs label="Lila" class="col-3" v-model="store.formPediatrik.lilengtas" :valid="{ number: true }"
            :lazy-rules="true" @update:model-value="(val) => {
              const _removedZeros = val.replace(/^0+/, '')
              if (val > 1) store.formPediatrik.lilengtas = _removedZeros
            }" />
        </div>

        <q-separator class="q-my-xs col-12" />
        <div v-if="gruping === '5.4'" class="col-12 row q-col-gutter-xs">
          <app-input-simrs label="BBI" class="col-4" v-model="store.formPediatrik.bbi" :lazy-rules="true"
            @update:model-value="(val) => {
              // const _removedZeros = val.replace(/^0+/, '')
              // if (val > 1) store.formPediatrik.lila=_removedZeros
            }" />
          <app-input-simrs label="BMI" class="col-4" v-model="store.formPediatrik.bmi" :lazy-rules="true"
            @update:model-value="(val) => {
              // const _removedZeros = val.replace(/^0+/, '')
              // if (val > 1) store.formPediatrik.lila=_removedZeros
            }" />
          <app-input-simrs label="Status Gizi" class="col-4" v-model="store.formPediatrik.statusGizi" :lazy-rules="true"
            @update:model-value="(val) => {
              // const _removedZeros = val.replace(/^0+/, '')
              // if (val > 1) store.formPediatrik.lila=_removedZeros
            }" />
          <app-input-simrs label="Kesimpulan Antropometri" class="col-10" v-model="store.formPediatrik.kesimpulan"
            :lazy-rules="true" @update:model-value="(val) => {
              // const _removedZeros = val.replace(/^0+/, '')
              // if (val > 1) store.formPediatrik.lila=_removedZeros
            }" />
        </div>

        <q-select v-model="store.form.tkKesadaran" dense standout="bg-yellow-3 text-black" outlined
          label="Tingkat Kesadaran" :options="store.optionsTingkatkesadaran" emit-value map-options
          input-class="ellipsis" fill-input hide-bottom-space class="col-4" @update:model-value="(val) => {
            // console.log('cek', store.optionsTingkatkesadaran?.find(item => item.value === val));
            store.form.tkKesadaranKet = store.optionsTingkatkesadaran?.find(item => item.value === val)?.label ?? null
            // console.log('store.form.tkKesadaranKet', store.form.tkKesadaranKet);

            cekEws()
          }" />
      </q-card-section>
      <div class="absolute q-pa-md" style="right: 0; bottom:0">
        <q-card flat bordered>
          <q-card-section align="center">
            <div class="f-12 ">
              SKOR
            </div>
            <div class="f-24 text-bold">
              {{ skoring }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-card>


    <!-- psikologis , ekonomi, spiritual -->
    <q-card v-if="!ulang" flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Pemeriksaan Psikologis, Sosial Ekonomi, Spiritual</strong>
      </q-card-section>
      <q-card-section class="row q-pa-sm q-col-gutter-xs">
        <q-input v-model="store.form.sosial" outlined autogrow stack-label standout="bg-yellow-3" label="Sosial"
          hide-bottom-space style="width:50%" />
        <q-input v-model="store.form.spiritual" outlined autogrow stack-label standout="bg-yellow-3" label="Spiritual"
          hide-bottom-space style="width:50%" />
        <q-select v-model="store.form.statusPsikologis" dense standout="bg-yellow-3 text-black" outlined
          label="Status Psikologis" :options="store.statusPsikologis" stack-label emit-value map-options
          input-class="ellipsis" fill-input hide-bottom-space class="col-6" />
        <q-select v-model="store.form.ansuransi" dense standout="bg-yellow-3 text-black" outlined
          label="Ekonomi, Punya Ansuransi ?" :options="store.adaTidaks" emit-value map-options input-class="ellipsis"
          fill-input hide-bottom-space class="col-6" />

        <q-list flat bordered separator class="col-12 q-mt-xs">
          <q-item v-for="item in store.frmEdukasis" :key="item">
            <q-item-section>
              <q-item-label>{{ item?.label }}</q-item-label>
            </q-item-section>
            <q-item-section style="max-width: 35%;">
              <div class="flex q-gutter-sm">
                <q-radio dense v-for="n in item.values" :key="n" v-model="store.form.edukasi[item?.kode]" :val="n"
                  :label="n?.value" />
              </div>
              <div v-if="item?.kode === 'butuhEdukasi'" class="q-mt-sm">
                <app-input-simrs v-if="store.form.edukasi.butuhEdukasi?.value === 'Ya'"
                  label="Jenis Edukasi yg Dibutuhkan" v-model="store.form.ketEdukasi" class="full-width" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- anatomy sementara -->
    <q-card v-if="!ulang" flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Pemeriksaan Fisik (Anatomy)</strong>
      </q-card-section>
      <q-card-section class="row q-pa-sm q-col-gutter-xs">
        <q-input v-model="store.form.rs5" outlined autogrow stack-label standout="bg-yellow-3" label="KEPALA"
          hide-bottom-space style="width:50%" />
        <q-input v-model="store.form.rs6" outlined autogrow stack-label standout="bg-yellow-3" label="LEHER"
          hide-bottom-space style="width:50%" />
        <q-input v-model="store.form.rs7" outlined autogrow stack-label standout="bg-yellow-3" label="DADA"
          hide-bottom-space style="width:50%" />
        <q-input v-model="store.form.rs8" outlined autogrow stack-label standout="bg-yellow-3" label="PUNGGUNG"
          hide-bottom-space style="width:50%" />
        <q-input v-model="store.form.rs9" outlined autogrow stack-label standout="bg-yellow-3" label="PERUT"
          hide-bottom-space style="width:50%" />
        <q-input v-model="store.form.rs10" outlined autogrow stack-label standout="bg-yellow-3" label="TANGAN"
          hide-bottom-space style="width:50%" />
        <q-input v-model="store.form.rs11" outlined autogrow stack-label standout="bg-yellow-3" label="KAKI"
          hide-bottom-space style="width:50%" />
        <q-input v-model="store.form.rs12" outlined autogrow stack-label standout="bg-yellow-3" label="NEUROLOGIS"
          hide-bottom-space style="width:50%" />
        <q-input v-model="store.form.rs13" outlined autogrow stack-label standout="bg-yellow-3" label="GENITAL"
          hide-bottom-space style="width:50%" />
      </q-card-section>
    </q-card>

  </div>
</template>

<script setup>

import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import useEws from '../../../Ews/useEws'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePemeriksaanUmumHemodialisaStore } from 'src/stores/simrs/hemodialisa/pemeriksaanumum'

const AutocompleteInput = defineAsyncComponent(() => import('../../../components/AutocompleteInput.vue'))
const SelectInput = defineAsyncComponent(() => import('../../../components/SelectInput.vue'))

const auth = useAplikasiStore()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  ulang: {
    type: Boolean,
    default: false
  }
})

// eslint-disable-next-line no-unused-vars
const gruping = computed(() => {
  const nakes = auth?.user?.pegawai?.kdgroupnakes
  const dokter = nakes === '1' || nakes === 1
  const perawat = nakes === '2' || nakes === '3'

  // console.log('nakes', nakes, dokter, perawat)

  let gruping = null
  if (dokter) gruping = props?.kasus?.medis
  else if (perawat) gruping = props?.kasus?.gruping

  // console.log('gruping', gruping, nakes)

  return gruping
})

// eslint-disable-next-line no-unused-vars
const nakes = computed(() => {
  return auth?.user?.pegawai?.kdgroupnakes
})

const { cekEws, skoring } = useEws(props?.pasien, props?.kasus)
const refKeadaanUmum = ref(null)

defineExpose({
  refKeadaanUmum
})
const store = usePemeriksaanUmumHemodialisaStore()

onMounted(() => {
  // console.log('moun', store.form)

  // store.initReset()
})
</script>
