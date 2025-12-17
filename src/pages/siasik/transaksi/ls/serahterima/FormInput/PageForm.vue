<template>
  <div class="container full-width full-height">
    <q-card class="items-center q-pa-sm full-width full-height">
      <div class="row">
        <FormHeader />
      </div>
      <div class="q-pt-md">
        <ListRincian />
      </div>
    </q-card>
  </div>

</template>
<script setup>
import { useFormSerahterimaStore } from 'src/stores/siasik/transaksi/ls/serahterimapekerjaan/formserahterima'
import FormHeader from './inpage/FormHeader.vue'
import ListRincian from './inpage/ListRincian.vue'
import { onUnmounted } from 'vue'
import { date } from 'quasar'
const store = useFormSerahterimaStore()
// const ambil = formKontrakPekerjaan()
// onBeforeMount(() => {
//   // store.initReset(props.data)
//   store.getDataBidang()
//   ambil.getPihaktiga()
// })
// onBeforeMount(() => {
//   // store.initReset(props.data)
//   ambil.getPihaktiga()
// })
onUnmounted(() => {
  resetFormData()
})
function resetFormData() {
  store.resetFORM()

  store.formheader.tgltrans = date.formatDate(Date.now(), 'YYYY-MM-DD')

}

</script>
