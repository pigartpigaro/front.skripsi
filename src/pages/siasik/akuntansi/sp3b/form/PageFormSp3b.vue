<template>
  <div class="container q-pa-sm full-width">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row justify-center">
        <FormHeader />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm  full-width full-height">
    <q-card class="items-center q-pa-sm full-width full-height">
      <div class="row">
        <ListRincian />
      </div>
    </q-card>
  </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import FormHeader from './inpage/FormHeader.vue'
import ListRincian from './inpage/ListRinciandata.vue'
import { useSp3bStore } from 'src/stores/siasik/akuntansi/sp3b/sp3b';

const store = useSp3bStore()
onBeforeMount(() => {
  store.pendapatans = []
  store.belanjas = []
  store.pembiayaans = []
})
// onMounted(() => {
//   // console.log(compSigna.value)
//   initForm()
// })

// function initForm() {
//   store.form.nonpdls = ''
//   store.form.kodepptk = ''
//   store.form.pptk = ''
//   store.form.kodebidang = ''
//   store.form.bidang = ''
//   store.form.bast = ''
//   store.form.serahterimapekerjaan = ''
//   store.form.noserahterima = ''
//   store.form.nokontrak = ''
//   store.form.kodepenerima = ''
//   store.form.kegiatanblud = ''
//   store.form.kodekegiatanblud = ''
//   store.form.keterangan = ''
//   store.form.biayatransfer = 0
//   store.form.rincians = []

//   store.transall = []
//   store.disabled = false
// }
</script>
