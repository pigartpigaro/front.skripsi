<template>
  <div class="container full-width full-height">
    <q-card class="items-center q-pa-sm full-width full-height">
      <div class="row">
        <FormInput />
      </div>
      <!-- <div class="q-pt-md">
        <ListRincian />
      </div> -->
    </q-card>
  </div>

</template>
<script setup>
import { formKontrakPekerjaan } from 'src/stores/siasik/transaksi/ls/kontrak/formkontrak';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import FormInput from './FormInputKP.vue'
import { date } from 'quasar';
const store = formKontrakPekerjaan()
onBeforeMount(() => {
  // store.initReset(props.data)
  store.getPihaktiga()
  store.getDataBidang()
})

onUnmounted(() => {
  resetFormData()
})
function resetFormData() {
  // Call the resetFORM method from your store
  store.resetForm()
  store.params.tahun = date.formatDate(Date.now(), 'YYYY'),
    store.params.tgl = date.formatDate(Date.now(), 'YYYY-MM-DD'),
    store.form.tgltrans = date.formatDate(Date.now(), 'YYYY-MM-DD'),
    store.form.tglmulaikontrak = date.formatDate(Date.now(), 'YYYY-MM-DD'),
    store.form.tglakhirkontrak = date.formatDate(Date.now(), 'YYYY-MM-DD'),
    store.getDataBidang()
}

</script>
