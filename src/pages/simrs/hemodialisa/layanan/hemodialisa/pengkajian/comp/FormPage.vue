<template>
  <div class="row items-center q-col-gutter-x-sm">
    <div class="col-12 text-weight-bold f-14 q-px-md q-py-sm">Status Fungsional</div>
    <!-- Status fungsional -->
    <div class="col-6">
      <app-autocomplete class="q-my-xs" v-model="store.form.fungsional" :source="store.statusFungs"
        label="Status Fungsional" outlined hide-dropdown-icon />
    </div>
    <!-- jika fingsional Perlu Bantuan -->
    <div v-if="store.form.fungsional === 'Perlu Bantuan'" class="col-6">
      <app-input-simrs ref="refLainFungsi" v-model="store.form.lainx"
        :label="'Sebutkan Bantuan yang diperlukan ' + panjangChar(store.form.lainx, 250)"
        :valid="{ max: 255, canEmpty: true }" />
    </div>
    <!-- jika fingsional Perlu Bantuan -->
    <div v-if="store.form.fungsional === 'Perlu Bantuan'" class="col-6">
      <app-input-simrs ref="refLaporFungsi" v-model="store.form.jam_lapor_fs"
        :label="'ketergantungan total, jam lapor dokter ' + panjangChar(store.form.jam_lapor_fs, 50)"
        :valid="{ max: 50, canEmpty: true, canEmpty: true }" />
    </div>
    <div class="col-12 text-weight-bold f-14 q-px-md q-py-sm">Skrining Resiko Cedera / Jatuh</div>
    <!-- skrining jatuh -->

    <div class="col-12" v-for="(val, key) in store.formSkiringJatuh" :key="key">
      <div class="row q-my-xs">
        <div class="col-9">
          {{store.formSkiringJatuh?.find(x => x.kode === val.kode)?.label}}
        </div>
        <div class="col-3 flex q-gutter-sm justify-end">
          <q-radio v-for="aa in store.formSkiringJatuh?.find(x => x.kode === val.kode)?.values" dense
            v-model="store.form.resiko_jatuh.form[key].values" :val="aa" :label="aa" @update:model-value="setHasil"
            :key="aa" />
        </div>
      </div>
    </div>
    <div class="col-12 text-weight-bold q-px-md q-py-sm">Hasil</div>
    <div class="col-8 q-px-md q-py-sm">{{ store.form.resiko_jatuh?.hasil?.label }}</div>

    <div v-if="store.form?.resiko_jatuh?.hasil?.count == 2" class="col-4 flex q-gutter-sm justify-end">
      <q-radio v-for="aa in ytOptions" dense v-model="store.form.resiko_jatuh.hasil.values" :val="aa" :label="aa"
        :key="aa" />
    </div>
    <div v-if="store.form?.resiko_jatuh?.hasil?.values?.toLowerCase() == 'iya'" class="col-6">
      <app-input-simrs v-model="store.form.resiko_jatuh.hasil.jam_lapor" :label="'jam lapor dokter '"
        :valid="{ canEmpty: true }" />
    </div>


  </div>
  <div class="row q-mt-md justify-end">
    <q-btn label="Simpan" no-caps dense color="primary" @click="simpan" :loading="store.loading"
      :disable="store.loading">
      <q-tooltip>Simpan</q-tooltip></q-btn>
  </div>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { usePengkajianHemodialisaStore } from 'src/stores/simrs/hemodialisa/pengkajian'
import { onMounted, onUnmounted, ref } from 'vue'


const store = usePengkajianHemodialisaStore()
const ytOptions = ref(['Iya', 'Tidak'])

const refLainFungsi = ref(null)
const refLaporFungsi = ref(null)

function resetValidasi () {
  refLainFungsi.value?.appInputSimrs?.resetValidation()
  refLaporFungsi.value?.appInputSimrs?.resetValidation()
}
function validasi () {


  if (
    (!refLainFungsi.value ? true : refLainFungsi.value?.appInputSimrs?.validate()) &&
    (!refLaporFungsi.value ? true : refLaporFungsi.value?.appInputSimrs?.validate())

  ) {
    return true
  } else {
    return false
  }
}
function panjangChar (val, panj) {
  if (val?.length > parseInt(panj)) return '(' + val?.length + ')'
  else return ''
}
function setHasil () {
  const hasil = store.form.resiko_jatuh.form.filter(x => x.values.toLowerCase() == 'iya')
  store.form.resiko_jatuh.hasil = store.hasilSkringJatuh.find(x => parseInt(x.count) == hasil.length)
  store.form.resiko_jatuh.form.forEach(x => {
    const anu = store.formSkiringJatuh?.find(y => y.kode === x.kode)
    // console.log('x', x.values, anu)
    if (x.values.toLowerCase() == 'iya') {
      x.label = anu?.labelY
    } else x.label = anu?.labelT
  })
  console.log('set hasil', hasil, store.form)

}

function simpan () {
  if (!validasi()) return notifErrVue('Silahkan lengkapi form terlebih dahulu')
  store.simpan().then(() => {
    store.resetForm()
    resetValidasi()
    store.initPasien()
  })
  console.log('store.form', store.form)

}
onMounted(() => {
  store.initPasien()
  setTimeout(() => {
    resetValidasi()

  }, 50)
})
onUnmounted(() => {
  store.resetForm()
})
</script>
