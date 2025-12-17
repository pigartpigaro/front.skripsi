<template>
  <div>
    <q-form ref="formRef" @submit="simpan">
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-radio v-model="store.formKonsul.kdSaran" checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye" val="3" label="Konsul Internal Hari Ini"
            @update:model-value="seKonsul" />
        </div>
        <div class="col-4">
          <q-radio v-model="store.formKonsul.kdSaran" checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye" val="6" label="Konsul Internal Hari Lain"
            @update:model-value="seRujuk" />
        </div>
        <div class="col-4">
          <q-radio v-model="store.formKonsul.kdSaran" checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye" val="9" label="Rujukan Internal"
            @update:model-value="seRujuk" />
        </div>
        <div class="col-5">
          <app-input-date :model="store.formKonsul.tgl_rencana_konsul" label="Tgl Rencana Konsul" outlined
            @set-model="setTanggalKonsul" :disable="store.formKonsul.kdSaran === '3'" />
        </div>
        <div class="col-7">
          <q-select ref="refPoli" v-model="store.formKonsul.kdpoli_tujuan" label="Poli Tujuan" dense outlined
            standout="bg-yellow-3" option-value="rs1" option-label="rs2" emit-value map-options use-input
            input-debounce="0" :rules="[val => (val !== null && val !== '') || 'Harap diisi']" :options="store.poli" />
        </div>
        <div class="col-12">
          <q-input v-model="store.formKonsul.ket" label="Keterangan" dense outlined standout="bg-yellow-3" />
        </div>
        <div class="col-12 q-mt-sm" style="border: 1px solid rgba(0,0,0,0.2)">
          <div class="row text-weight-bold q-my-sm">Pengantar Konsul:</div>
          <span class="" v-html="getNewLine(store?.konsulText?.header)" />
          <span class="text-weight-bold q-mx-xs">DPJP {{ poliTujuan() }}</span>
          <span class="" v-html="getNewLine(store?.konsulText?.openingText)" />

          <q-input v-model="store.konsulText.diagnosa" label=" " outlined standout="bg-yellow-3" type="textarea"
            autogrow class="q-mb-xs" />
          <div class="q-mt-lg" v-html="getNewLine(store?.konsulText?.closingText)" />

        </div>
        <div class="col-12">
          <q-separator class=" q-my-md" />
          <div class="text-right q-gutter-sm">
            <q-btn label="Simpan" color="primary" type="submit" :loading="store.loadingSaveKonsul"
              :disable="store.loadingSaveKonsul" />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { date } from 'quasar'
import { getNewLine } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import { onMounted, ref } from 'vue'

const store = usePerencanaanPoliStore()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const refPoli = ref(null)
function seKonsul (val) {
  store.setFormKonsul('tgl_rencana_konsul', date.formatDate(Date.now(), 'YYYY-MM-DD'))
}
function poliTujuan () {
  const poli = store.poli.find(item => item.rs1 === store.formKonsul.kdpoli_tujuan)
  return poli?.rs2 ?? ''
}
function seRujuk (val) {
  const tgl = Date.now()
  const tgl1 = date.addToDate(tgl, { days: 1 })
  store.setFormKonsul('tgl_rencana_konsul', date.formatDate(tgl1, 'YYYY-MM-DD'))
}
function setTanggalKonsul (val) {
  const date1 = Date.now()
  const date2 = new Date(val)
  const diff = date.getDateDiff(date2, date1, 'days')
  if (diff < 0 && store.formKonsul.kdSaran === '3') return notifErrVue('tidak boleh ada konsulan mundur')
  if (diff < 1 && store.formKonsul.kdSaran === '6') return notifErrVue('tanggal konsul minimal besok')
  if (diff < 1 && store.formKonsul.kdSaran === '9') return notifErrVue('tanggal rujukan minimal besok')
  // console.log('kd saran', store.formKonsul.kdSaran)

  // if (diff > 0) {
  //   store.setFormKonsul('kdSaran', '6')
  // } else if (diff === 0) {
  //   store.setFormKonsul('kdSaran', '3')
  // }
  store.setFormKonsul('tgl_rencana_konsul', val)
  console.log('kd saran', store.formKonsul.tgl_rencana_konsul)
}

const formRef = ref()
function simpan () {
  // console.log('ref ', refPoli.value.validate())
  if (refPoli.value.validate()) {
    // console.log('form ', store.formKonsul)

    store.saveKonsul(props.pasien)
  }
}
onMounted(() => {
  console.log('on mounted', props?.pasien?.memodiagnosa)
  store.konsulText.diagnosa = props?.pasien?.memodiagnosa

})
</script>
