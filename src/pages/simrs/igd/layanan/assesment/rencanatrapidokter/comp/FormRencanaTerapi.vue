<template>
  <div class="q-px-md q-py-sm text-weight-bold bg-dark text-white">
    Form Tindakan
  </div>
  <q-separator />
  <q-scroll-area style="height: calc(100% - 50px);">
    <q-form class="row q-pa-md q-col-gutter-sm" ref="refForm" @submit="onSubmit">
      <div class="col-12">
        <q-input v-model="store.form.targetdokter" filled outlined type="textarea" label="Target Dokter"
          standout="bg-yellow-3" />
      </div>
      <div class="col-12">
        <q-input v-model="store.form.rencanaterapi" filled outlined type="textarea" label="Rencana Terapi"
          standout="bg-yellow-3" />
      </div>
      <div class="col-12">
        <q-input v-model="store.form.monitoringpasien" filled outlined type="textarea" label="Monitoring Pasien"
          standout="bg-yellow-3" />
      </div>
      <div class="col-12">
        <q-separator class="q-my-md" />
      </div>
      <div class="col-12 text-right">
        <q-btn label="Simpan" color="primary" type="submit" :loading="store.loadingsimpan" />
      </div>
    </q-form>
    <!-- <div class="q-pb-xl" /> -->
  </q-scroll-area>
</template>
<script setup>
import { useRencanaTerapiDokterStore } from 'src/stores/simrs/igd/rencanaterapidokter'
import { ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useRencanaTerapiDokterStore()
const refForm = ref()

function onSubmit() {
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}
</script>
