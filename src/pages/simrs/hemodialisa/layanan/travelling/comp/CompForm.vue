<template>
  <div class="q-pa-sm">

    <q-form @submit.prevent="submitForm">
      <div class="row q-col-gutter-x-sm">
        <q-input dense v-model="store.form.name" label="Nama Pasien" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.age" label="Umur" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.address" label="Alamat" outlined maxlength="255" class="col-6 q-mb-sm" />

        <q-input dense v-model="store.form.diagnosa" label="Diagnosa" outlined maxlength="255" class="col-6 q-mb-sm" />

        <app-input-date-human dense :model="store.dateDisp.start_date" label="Mulai Hemodialisa" outlined valid
          class="col-6 q-mb-sm" @db-model="(val) => {
            store.form.start_date = val
            console.log('start', val)

          }" @set-model="(val) => {
            console.log('start hu', val)
            store.dateDisp.start_date = val
          }" />
        <app-input-date-human dense :model="store.dateDisp.last_date" label="Terakhir Hemodialisa" outlined valid
          maxlength="255" class="col-6 q-mb-sm" @db-model="(val) => {
            store.form.last_date = val
          }" @set-model="(val) => {
            store.dateDisp.last_date = val
          }" />

        <q-input dense v-model="store.form.lab_hasil" label="Hasil Laboratorium" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.lab_hbsag" label="HBsAg" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.lab_hcv" label="Anti-HCV" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.lab_hiv" label="Anti-HIV" outlined maxlength="255" class="col-6 q-mb-sm" />

        <q-input dense v-model="store.form.pengobatan" label="Pengobatan Saat Ini" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.blood_pressure" label="Tekanan Darah" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.vaskuler" label="Akses Vaskuler" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.frequency" label="Frekuensi HD" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.qb" label="QB (ml/menit)" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.qd" label="QD (ml/jam)" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.tmp" label="TMP" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.heparinisasi" label="Heparinisasi" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.dialisat" label="Dialisat" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.dialyzer" label="Dialyzer" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.komplikasi" label="Komplikasi selama HD" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.gol_darah" label="Golongan Darah" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.transfusi" label="Transfusi" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.alergi" label="Alergi" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.bb_kering" label="Berat Badan Kering" outlined maxlength="255"
          class="col-6 q-mb-sm" />
        <q-input dense v-model="store.form.diet" label="Diet" outlined maxlength="255" class="col-6 q-mb-sm" />
        <q-input v-model="store.form.ket" label="Keterangan" type="textarea" outlined class="col-6 q-mb-sm" />

      </div>

      <div class="row q-gutter-sm q-mt-md justify-end">
        <q-btn label="Simpan" type="submit" color="primary" :loading="store.loading" :disable="store.loading" />
        <q-btn label="Reset" @click="store.resetForm(pasien)" color="secondary" flat :disable="store.loading" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useTravellingHDStore } from 'src/stores/simrs/hemodialisa/travelling'
import { onMounted } from 'vue'
const store = useTravellingHDStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
onMounted(() => {
  store.initForm(props.pasien)
  store.getList(props.pasien?.norm)
})
function submitForm () {
  store.saveForm().then(() => {
    store.initForm(props.pasien)
  })

}
</script>
