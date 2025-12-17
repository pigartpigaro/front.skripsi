<template>
  <!-- jam -->
  <div class="row items-center q-col-gutter-x-sm">

    <div class="col-2">
      <app-autocomplete v-model="store.form.jamKe" :source="store.jamKeOptions" label="Jam Ke" outlined
        hide-dropdown-icon :disable="!!store.form.id" />
    </div>
    <div class="col-3">
      <app-input-simrs v-model="store.form.tgl" label="format (Th-bln-tgl jam:men:det)" :disable="!!store.form.id" />
    </div>
    <div class="col-1">
      <q-btn v-if="!store.form.id" flat icon="icon-mat-refresh" size="xs" dense @click="() => {
        store.setForm('tgl', date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'))
      }">
        <q-tooltip>set ke waktu sekarang</q-tooltip>
      </q-btn>
    </div>
    <!-- BB -->

    <div class="col-5">
      <app-input-simrs v-model="store.form.bb" label="BB" />
    </div>
    <div class="col-1 text-center">Kg</div>

    <!-- keluhan -->

    <div class="col-6">
      <app-input-simrs ref="refKeluhan" v-model="store.form.keluhan"
        :label="'Keluhan ' + panjangChar(store.form.keluhan, 250)" type="textarea" :valid="{ max: 255, canEmpty: true }"
        @update:model-value="setKeluhan" />
    </div>

    <!-- kesadaran -->

    <div class="col-6">
      <app-input-simrs ref="refKesadaran" v-model="store.form.kesadaran"
        :label="'Kesadaran ' + panjangChar(store.form.kesadaran, 250)" type="textarea"
        :valid="{ max: 255, canEmpty: true }" @update:model-value="setKesadaran" />
    </div>

    <!-- tekanan darah -->

    <div class="col-5">
      <app-input-simrs v-model="store.form.tkDarah" label="Tekanan Darah" />
    </div>
    <div class="col-1 text-center">mmHg</div>
    <!-- napas / nadi -->

    <div class="col-5">
      <app-input-simrs v-model="store.form.napas" label="Napas/Nadi" />
    </div>
    <div class="col-1 text-center">x/menit</div>

    <!-- suhu -->

    <div class="col-5">
      <app-input-simrs v-model="store.form.suhu" label="Suhu" />
    </div>
    <div class="col-1 text-center">
      <div class="row justify-center">
        <span class="f-10">o</span> C
      </div>
    </div>
    <!-- QB -->

    <div class="col-5">
      <app-input-simrs v-model="store.form.qb" label="QB" />
    </div>
    <div class="col-1 text-center">ml/menit</div>
    <!-- QD -->
    <div class="col-5">
      <app-input-simrs v-model="store.form.qd" label="QD" />
    </div>
    <div class="col-1 text-center">ml/menit</div>

    <!-- tekanan vena -->
    <div class="col-5">
      <app-input-simrs v-model="store.form.tkVena" label="Tekanan Vena" />
    </div>
    <div class="col-1 text-center">mmHg</div>

    <!-- TMP -->
    <div class="col-6"> <app-input-simrs ref="refTmp" v-model="store.form.tmp"
        :label="'TMP ' + panjangChar(store.form.tmp, 250)" type="textarea" :valid="{ max: 255, canEmpty: true }"
        @update:model-value="setTmp" /></div>


    <!-- Assasement / intervensi -->
    <div class="col-6"> <app-input-simrs ref="refAssasement" v-model="store.form.assasement"
        :label="'Assasement / Intervensi ' + panjangChar(store.form.assasement, 250)" type="textarea"
        :valid="{ max: 255, canEmpty: true }" @update:model-value="setAssasement" /></div>
    <!-- UF -->
    <div class="col-5">
      <app-input-simrs v-model="store.form.uf" label="UF" />
    </div>
    <div class="col-1 text-center">ml</div>
  </div>
  <div class="row q-mt-md justify-end">
    <q-btn label="Simpan" no-caps dense color="primary" @click="simpan" :loading="store.loading"
      :disable="store.loading"> <q-tooltip>Simpan</q-tooltip></q-btn>
  </div>
  <!-- Pelaksana -->
</template>
<script setup>
import { date } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
import { useIntridialitikHemodialisaStore } from 'src/stores/simrs/hemodialisa/intridialitik'
import { onMounted, onUnmounted, ref } from 'vue'

const store = useIntridialitikHemodialisaStore()

const refKeluhan = ref(null)
function setKeluhan (val) {
  refKeluhan.value?.appInputSimrs.validate()
}
const refKesadaran = ref(null)
function setKesadaran (val) {
  refKesadaran.value?.appInputSimrs.validate()
}
const refTmp = ref(null)
function setTmp (val) {
  refTmp.value?.appInputSimrs.validate()
}
const refAssasement = ref(null)
function setAssasement (val) {
  refAssasement.value?.appInputSimrs.validate()
}


function panjangChar (val, panj) {
  if (val?.length > parseInt(panj)) return '(' + val?.length + ')'
  else return ''
}
function resetValidasi () {
  refKeluhan.value?.appInputSimrs.resetValidation()
  refKesadaran.value?.appInputSimrs.resetValidation()
  refTmp.value?.appInputSimrs.resetValidation()
  refAssasement.value?.appInputSimrs.resetValidation()

}
function validasi () {

  if (refKeluhan.value?.appInputSimrs.validate() &&
    refKesadaran.value?.appInputSimrs.validate() &&
    refTmp.value?.appInputSimrs.validate() &&
    refAssasement.value?.appInputSimrs.validate()) return true
  else return false
}

function simpan () {
  if (!validasi()) return notifErrVue('Silahkan lengkapi form terlebih dahulu')
  store.simpan().then(() => {
    store.resetForm()
    resetValidasi()
    store.initPasien()
  })
}
onMounted(() => {

  store.initPasien()
  setTimeout(() => {
    resetValidasi()

  }, 100)
})
onUnmounted(() => {
  store.resetForm()
})
</script>
