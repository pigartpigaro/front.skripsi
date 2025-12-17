<template>
  <div class="fit">
    <q-form class="fit q-pa-sm" @submit="onSubmit">
      <div class="full-height scroll">
        <div class="bg-white q-pa-sm q-mb-sm">
          <div>Dokumen apa yang akan di Upload? </div>
          <q-separator class="q-my-sm" />
          <div class="q-gutter-sm">
            <q-radio v-for="item in store.masters" :key="item" v-model="store.form.nama" :val="item" :label="item" dense
              size="xs" />
          </div>
        </div>
        <FormComp v-if="store.form.nama" :pasien="pasien" />
      </div>
      <div class="absolute-bottom bg-primary q-pa-md">
        <div class="row justify-end">
          <q-btn label="Simpan" type="submit" class="bg-white text-dark q-px-lg" :loading="store.loadingSave"
            :disable="store.loadingSave" dense />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useHdUploadDokStore } from 'src/stores/simrs/hemodialisa/upDok'
import { defineAsyncComponent, onMounted } from 'vue'

const FormComp = defineAsyncComponent(() => import('src/pages/simrs/hemodialisa/layanan/upload/comp/comUpload/FormComp.vue'))

const store = useHdUploadDokStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  // const isRanap = true
  Promise.all([
    store.initForm(),
    // store.getMaster(isRanap).then(() => {
    //   store.masters = ['Hemodialisa']
    store.form.nama = 'Hemodialisa'
    //   // setTimeout(() => {
    //   // }, 100)
    // })
  ])
})

function onSubmit () {
  // const isRanap = false
  store.saveData(props?.pasien).then(() => {
    store.form.nama = 'Hemodialisa'
  })
    .catch((err) => {
      console.log('error', err)
    })
}

</script>

<style lang="scss" scoped></style>
