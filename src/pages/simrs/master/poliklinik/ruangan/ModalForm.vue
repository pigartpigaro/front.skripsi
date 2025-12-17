<template>
  <q-dialog persistent>
    <q-card class="lebar column">
      <q-bar class="col-auto bg-primary text-white q-py-xs">
        <div>Form Tambah Master Obat</div>
        <q-space />
        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <!-- FORM -->

      <!-- <q-form class="col full-height column" @submit="handleSubmit" @reset="handleReset"> -->
      <q-card-section class="col full-height scroll" :class="dark ? 'bg-dark-page' : 'bg-grey-3'">







        <app-grid :cols="{ default: 1, sm: 1 }" :gap="16" class="q-my-lg">
          <!-- <div class="full-width column q-gutter-sm"> -->

          <!-- <div class="full-width col-span-1">
            <div class="text-weight-bold f-14">📝 RUANGAN POLIKLINIK</div>
            <q-separator class="q-my-none"></q-separator>
          </div> -->


          <app-input-simrs v-model="form.rs2" label="NAMA" class="" :error-message="errorMessage('rs2')"
            :is-error="isError('rs2')" />
          <!-- <app-input-simrs v-model="form.rs3" label="STATUS POLIKLINIK" class="" :error-message="errorMessage('rs3')"
            :is-error="isError('rs3')" /> -->
          <!-- <app-input-simrs v-model="form.rs4" label="GOLONGAN" class="" :error-message="errorMessage('rs4')"
            :is-error="isError('rs4')" /> -->


          <q-separator />
          <div class="row ">
            <div class="col-auto"> GOLONGAN </div>
            <div class="col-auto">
              <div class="q-gutter-sm">
                <q-option-group v-model="form.rs4" :options="optionGolongans" color="primary" class="q-ml-md" dense
                  inline />
              </div>
            </div>
          </div>

          <q-separator />
          <div v-if="form.rs4 === 'Poliklinik'" class="row ">
            <div class="col-auto"> STATUS </div>
            <div class="col-auto">
              <div class="q-gutter-sm">
                <q-option-group v-model="form.rs3" :options="optionStatus" color="primary" class="q-ml-md" dense
                  inline />
              </div>
            </div>
          </div>


          <q-separator />

          <app-input-simrs v-model="form.panggil_antrian" label="NAMA PANGGILAN ANTRIAN" class=""
            :error-message="errorMessage('panggil_antrian')" :is-error="isError('panggil_antrian')" />












          <!-- </div> -->
        </app-grid>

      </q-card-section>
      <q-card-actions align="right" class="col-auto q-py-md">

        <app-btn label="Cancel" flat :color="dark ? 'white' : 'dark'" @click="handleReset" />
        <app-btn label="Simpan Data" :loading="store.loadingSave" color="primary" @click="handleSubmit" />
      </q-card-actions>
      <!-- </q-form> -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { Dialog } from 'quasar'



// const storeLama = useMasterObatForm()

const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  store: {
    type: Object,
    default: null
  }
})


const form = ref({
  'rs1': '',
  'rs2': '',
  'rs3': '',
  'rs4': '',
  // 'rs5': '',
  // 'rs6': '',
  // 'rs7': '',
  'panggil_antrian': '',
})

const optionGolongans = ref([
  { label: 'Tidak Ada', value: '' },
  { label: 'Penunjang', value: 'Penunjang' },
  { label: 'Poliklinik', value: 'Poliklinik' }
])
const optionStatus = ref([
  { label: 'NON SPESIALIS', value: '' },
  { label: 'SPESIALIS', value: 'SPESIALIS' },
])

const error = computed(() => {
  const err = props.store.error
  const status = err?.status === 422
  if (status) {
    return err?.response?.data?.errors
  }
  return null
})

function errorMessage(field) {
  return error.value?.[field]?.[0] ?? null
}

function isError(field) {
  return !!error.value?.[field]
}


watch(() => (form.value), (newForm, oldForm) => {
  // console.log('🔥 watch form', newForm, oldForm);

  for (const key in newForm) {
    props.store.clearFieldError(key)
  }

}, { deep: true })

watch(() => (props.store.item), (newForm, oldForm) => {
  // console.log('🔥 watch form', newForm, oldForm);
  const excludedKeys = ['created_at', 'updated_at']

  if (newForm) {
    form.value = Object.fromEntries(
      Object.entries(newForm).filter(([key]) => !excludedKeys.includes(key))
    )
  }

  console.log('🔥 watch form', form.value);


}, { deep: true })


const handleSubmit = (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()

  props.store.create(form.value)

  // console.log('form', form.value);

}

const handleReset = () => {
  form.value = {
    jabatan: null
  }

  props.store.clearAllError()
  props.store.setEdit(null)
  props.store.modalFormOpen = false
}


const handleSearch = () => {
  console.log('search');
  // props.store.setSearch()
}







watchEffect(() => {
  // sambungNamaObat()
})

function myDialog(func, val, anu) {
  Dialog.create({
    title: 'Konfirmasi',
    message: `apakah anda akan menyimpan <strong>${anu} : <span style="color: red;" >${val}</span></strong> ?`,
    html: true,
    ok: {
      label: 'Simpan',
      push: true,
      color: 'primary',
      'no-caps': true
    },
    cancel: {
      label: 'Batal',
      color: 'dark',
      push: true,
      'no-caps': true
    }
  })
    .onOk((a) => {
      func(val)
    })
}

</script>
<style lang="scss" scoped>
.lebar {
  max-width: 90vw;
  width: 50vw;
  max-height: 90vh;
}
</style>
