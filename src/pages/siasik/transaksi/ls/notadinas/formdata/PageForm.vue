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
import FormHeader from './inpage/FormHeader.vue'
import ListRincian from './inpage/ListRincian.vue'
import { onBeforeMount, onUnmounted } from 'vue'
import { date } from 'quasar'
import { useFormNotadinasStore } from 'src/stores/siasik/transaksi/ls/notadinas/form'
const store = useFormNotadinasStore()

onBeforeMount(() => {
  // store.initReset(props.data)
  store.getDataBidang()
})
onUnmounted(() => {
  resetFormData()
})
function resetFormData() {
  store.resetFORM()

  store.formheader.tglnotadinas = date.formatDate(Date.now(), 'YYYY-MM-DD')

}

</script>
