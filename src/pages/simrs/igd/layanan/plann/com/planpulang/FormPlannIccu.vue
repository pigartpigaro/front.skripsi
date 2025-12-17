<template>
  <q-dialog v-model="store.fixediccu">
    <q-card>
      <q-card-section>
        <div class="text-h6">Indikasi Masuk ICCU</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <q-checkbox v-model="store.form.isi" val="Sindrom Koroner Akut (UAP, NSTEMI, STEMI)"
          label="Sindrom Koroner Akut (UAP, NSTEMI, STEMI)" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Edema Paru Akut" label="Edema Paru Akut" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Gagal jantung akut" label="Gagal jantung akut" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Aritmia maligna atau dengan gangguan hemodinamik"
          label="Aritmia maligna atau dengan gangguan hemodinamik" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Syokkardiogenik : HR > 100 x per mnt, TDS < 100 mmHg"
          label="Syokkardiogenik : HR > 100 x per mnt, TDS < 100 mmHg" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Miokarditis" label="Miokarditis" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Penyakit lain yang memerlukan pemantauan hemodinamik"
          label="Penyakit lain yang memerlukan pemantauan hemodinamik" color="teal" /> <br>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn label="CLOSE" color="red" v-close-popup />
        <q-btn label="SIMPAN" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { usePlannStore } from 'src/stores/simrs/igd/plann';

const store = usePlannStore();

// function updateSelection(val) {
//   store.setForm('isi', val.join(', '))
// }

// function updateSelectionx(val) {
//   store.setForm('isix', val.join(', '))
// }
</script>
