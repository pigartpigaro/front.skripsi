<template>
  <q-dialog v-model="store.fixednicu">
    <q-card>
      <q-card-section>
        <div class="text-h6">Indikasi Masuk NICU</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        Pasien yang membutuhkan perawatan NICU adalah semua bayi yang memerlukan monitor/observasi ketat <br>
        <q-checkbox v-model="store.form.isi" val="Memerlukan O2 > 60%" label="Memerlukan O2 > 60%" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Memerlukan CPAP/Ventilator" label="Memerlukan CPAP/Ventilator"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="NKB < 32 mg, BBL < 1500 gr" label="NKB < 32 mg, BBL < 1500 gr"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Asfiksia berat, syok, sering apnoe atau kejang, gangguan perdarahan"
          label="Asfiksia berat, syok, sering apnoe atau kejang, gangguan perdarahan" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bayi dengan kelainan congenital berat"
          label="Bayi dengan kelainan congenital berat" color="teal" /> <br>

        <!-- Kriteria pasien yang membutuhkan perawatan intermediate :
        <q-checkbox v-model="store.form.isi" val="Bayi yang baru keluar dari NICU, masih perlu monitor dan observasi"
          label="Bayi yang baru keluar dari NICU, masih perlu monitor dan observasi" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bayi yang memerlukan O2 < 60%" label="Bayi yang memerlukan O2 < 60%"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="NKB 32-34 mg, kondisi stabil, BBL > 1500 gr"
          label="NKB 32-34 mg, kondisi stabil, BBL > 1500 gr" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="NKB 34-36 mg, kondisi stabil, reflek hisap lemah"
          label="NKB 34-36 mg, kondisi stabil, reflek hisap lemah" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bayi yang dipuasakan atau EKN" label="Bayi yang dipuasakan atau EKN"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bayi yang memerlukan tranfusi tukar"
          label="Bayi yang memerlukan tranfusi tukar" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bayi yang sering muntah" label="Bayi yang sering muntah"
          color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bayi dengan kelainan kronik (CLD)"
          label="Bayi dengan kelainan kronik (CLD)" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi"
          val="Bayi yang memerlukan foto terapi dengan masalah lain : dehidrasi, minum personde"
          label="Bayi yang memerlukan foto terapi dengan masalah lain : dehidrasi, minum personde" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bayi dengan kelainan congenital ringan, missal celah bibir"
          label="Bayi dengan kelainan congenital ringan, missal celah bibir" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bayi dengan ibu DM" label="Bayi dengan ibu DM" color="teal" /> <br>
        <q-checkbox v-model="store.form.isi" val="Bayi dengan asfiksia sesdang, nilai APGAR pada 5 menit < 7"
          label="Bayi dengan asfiksia sesdang, nilai APGAR pada 5 menit < 7" color="teal" /> <br> -->
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

function updateSelection(val) {
  store.setForm('isi', val.join(', '))
}

function updateSelectionx(val) {
  store.setForm('isix', val.join(', '))
}
</script>
