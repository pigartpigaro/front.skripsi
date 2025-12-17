<template>
  <q-dialog persistent>
    <q-card class="lebar column">
      <q-bar class="col-auto bg-primary text-white q-py-xs">
        <div>Form Tambah Master Jabatan</div>
        <q-space />
        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <!-- FORM -->

      <q-form class="col full-height column" @submit="handleSubmit" @reset="handleReset">
        <q-card-section class="col full-height scroll" :class="dark ? 'bg-dark' : 'bg-grey-3'">

          <div class="row q-py-lg">
            <app-input-simrs v-model="form.jabatan" label="Jabatan" class="col-12"
              :error-message="errorMessage('jabatan')" :is-error="isError('jabatan')" />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="col-auto">

          <app-btn label="Cancel" flat type="reset" />
          <app-btn label="Simpan Data" :loading="store.loadingSave" color="primary" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

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
  jabatan: null
})

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


const handleSubmit = () => {
  props.store.create(form.value)
}

const handleReset = () => {
  form.value = {
    jabatan: null
  }

  props.store.clearAllError()
  props.store.setEdit(null)
  props.store.modalFormOpen = false
}


</script>
<style lang="scss" scoped>
.lebar {
  max-width: 50vw;
  width: 30vw;
  max-height: 50vh;
}
</style>
