<template>
  <q-form ref="formRef" @submit="simpan" class="q-gutter-sm q-pa-sm">
    <q-input v-model="store.form.media" dense outlined standout="bg-yellow-3" label="Jenis Media"
      :rules="[val => !!val || 'Harap diisi']" />
    <q-separator class="q-my-lg" />
    <div class="text-right">
      <q-btn label="Simpan" type="submit" color="primary" />
    </div>
  </q-form>
</template>
<script setup>
import { useArsipMasterMediaStore } from 'src/stores/arsip/master/mmedia';
import { ref } from 'vue';

const store = useArsipMasterMediaStore()
const formRef = ref()

function simpan() {
  store.simpanMaster().then(() => {
    formRef.value.resetValidation()
  })
}
</script>
