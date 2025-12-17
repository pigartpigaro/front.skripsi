<template>
  <q-dialog v-model="store.fixedhcu">
    <q-card>
      <q-card-section>
        <div class="text-h6">Indikasi Masuk HCU</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <!-- Indikasi pasien masuk Ruang Unit Stroke :
        <q-checkbox v-model="store.form.isi"
          val="Pasien yang mengalami Stroke, baik yang mengalami sumbatan atau perdarahan."
          label="Pasien yang mengalami Stroke, baik yang mengalami sumbatan atau perdarahan." color="teal" /> <br>
        <q-checkbox v-model="store.form.isi"
          val="Stroke Akut (Onset 24 - 72 jam), sebagai stroke pertama maupun berulang,"
          label="Stroke Akut (Onset 24 - 72 jam), sebagai stroke pertama maupun berulang," color="teal" /> <br>
        <q-checkbox v-model="store.form.isi"
          val="Pasien Stroke Akut yang stabil , yang akan menjalani operasi/intervensi yang membutuhkan pemeriksaan neurologik secara berkala"
          label="Pasien Stroke Akut yang stabil , yang akan menjalani operasi/intervensi yang membutuhkan pemeriksaan neurologik secara berkala"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi"
          val="Pasien Stroke Akut yang telah menjalani operasi/ intervensi yang membutuhkan pemeriksaan neurologic secara berkala"
          label="Pasien Stroke Akut yang telah menjalani operasi/ intervensi yang membutuhkan pemeriksaan neurologic secara berkala"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="TIA dalam onset 24 jam" label="TIA dalam onset 24 jam" color="teal" />
        <br>
        <q-checkbox v-model="store.form.isi" val="Pasien Stroke yang mendapatkan Trombolisis"
          label="Pasien Stroke yang mendapatkan Trombolisis" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi"
          val="Tidak ada kegawatan pada organ lain yang lebih membutuhkan penatalaksanaan segera seperti kegawatdaruratan jantung, Bedah, Interna DLL"
          label="Tidak ada kegawatan pada organ lain yang lebih membutuhkan penatalaksanaan segera seperti kegawatdaruratan jantung, Bedah, Interna DLL"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Tanpa indikasi ventilator" label="Tanpa indikasi ventilator"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Sudah ada penunjang diagnose (CT Scan Kepala rotgen thorax)"
          label="Sudah ada penunjang diagnose (CT Scan Kepala rotgen thorax)" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bukan pasien dengan infeksi pernafasan (TBC atau Pneumonia)"
          label="Bukan pasien dengan infeksi pernafasan (TBC atau Pneumonia)" color="teal" /> <br> -->

        Indikasi pasien masuk HCU: <br>
        <q-checkbox v-model="store.form.isi"
          val="Pasien dengan gagal organ tunggal yang mempunyai resiko tinggi untuk komplikasi (CKD dengan HT emergency, upper GI Bleeding, DKA + HHS, Acute liver failure, Serosis Dekompensata, Tumor lisis syndrome)."
          label="Pasien dengan gagal organ tunggal yang mempunyai resiko tinggi untuk komplikasi (CKD dengan HT emergency, upper GI Bleeding, DKA + HHS, Acute liver failure, Serosis Dekompensata, Tumor lisis syndrome)."
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Reaksi anafilaksis" label="Reaksi anafilaksis" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Septic condition" label="Septic condition" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Intoksikasi alhohol," label="Intoksikasi alhohol" color="teal" />
        <br>
        <q-checkbox v-model="store.form.isi" val="Ileus paralitik ataupun obstruktif"
          label="Ileus paralitik ataupun obstruktif" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Kelainan darah & oncologi yang mengancam patensi ABC"
          label="Kelainan darah & oncologi yang mengancam patensi ABC" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi"
          val="Anak usia > 1 bulan sampai < 18 tahun, pasien dengan kondisi respirasi, hemodinamik dan kesadaran stabil yang masih memerlukan pengobatan, perawatan dan observasi ketat"
          label="Anak usia > 1 bulan sampai < 18 tahun, pasien dengan kondisi respirasi, hemodinamik dan kesadaran stabil yang masih memerlukan pengobatan, perawatan dan observasi ketat"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Dengue (DHF derajat III dan IV) yang bukan dengan syok berulang."
          label="Dengue (DHF derajat III dan IV) yang bukan dengan syok berulang." color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Pasien yang memerlukan perawatan perioperative"
          label="Pasien yang memerlukan perawatan perioperative" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Pasien pasca kateterisasi jantung dengan hemodinamik stabil"
          label="Pasien pasca kateterisasi jantung dengan hemodinamik stabil" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bukan pasien dengan infeksi pernafasan (TBC dan pneumonia)"
          label="Bukan pasien dengan infeksi pernafasan (TBC dan pneumonia)" color="teal" /> <br>
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
