<template>
  <q-form ref="formRef" @submit="simpan" class="q-gutter-sm q-pa-sm">
    <q-input v-model="store.form.kode" dense outlined standout="bg-yellow-3" label="Kode" disable />
    <q-input v-model="store.form.nama" dense outlined standout="bg-yellow-3" label="Sistem Bayar"
      :rules="[val => !!val || 'Harap diisi']" />
    <q-select v-model="store.form.group" dense outlined standout="bg-yellow-3" label="Groups Sistembayar"
      :options="options" :rules="[val => !!val || 'Harap diisi']" option-label="label" option-value="value" emit-value
      map-options />

    <q-separator class="q-my-lg" />
    <div class="text-right">
      <q-btn label="Simpan" type="submit" color="primary" :loading="store.loadingSave" />
    </div>
  </q-form>
</template>
<script setup>

import { useKeuanganMasterSistemBayarStore } from 'src/stores/keuangan/master/sistembayar';
import { ref } from 'vue';

const store = useKeuanganMasterSistemBayarStore()
const formRef = ref()

const options = ref([
  { label: 'BPJS', value: '1' },
  { label: 'UMUM', value: '2' },
  { label: 'TAGIHAN', value: '3' }
])

function simpan() {
  store.simpanMaster().then(() => {
    formRef.value.resetValidation()
  })
}
</script>
