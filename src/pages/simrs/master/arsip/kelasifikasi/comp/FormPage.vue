<template>
  <q-form ref="formRef" @submit="simpan" class="q-gutter-sm q-pa-sm">
    <q-input v-model="store.form.kode" dense outlined standout="bg-yellow-3" label="Kode Klasifikasi"
      :rules="[val => !!val || 'Harap diisi']" />
    <q-input v-model="store.form.kelasifikasi" dense outlined standout="bg-yellow-3" label="Klasifikasi"
      :rules="[val => !!val || 'Harap diisi']" />
    <q-input v-model="store.form.retensi" dense outlined standout="bg-yellow-3" label="Retensi (Satuan Tahun)"
      :rules="[val => !!val || 'Harap diisi']" />

    <q-separator class="q-my-lg" />
    <div class="text-right">
      <q-btn label="Simpan" type="submit" color="primary" />
    </div>
  </q-form>
</template>
<script setup>
import { useArsipMasterKelasifikasiStore } from 'src/stores/arsip/master/mkelasifikasi';
import { ref } from 'vue';

const store = useArsipMasterKelasifikasiStore()
const formRef = ref()

function simpan() {
  store.simpanMaster().then(() => {
    formRef.value.resetValidation()
  })
}
</script>
