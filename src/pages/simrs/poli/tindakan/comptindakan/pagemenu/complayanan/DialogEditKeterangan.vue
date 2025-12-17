<template>
  <q-dialog v-model="store.openEdit">
    <q-card style="min-width:50vw;">
      <div class="fit column">
        <q-bar class="col-auto bg-primary text-white q-py-sm">

          <q-space />

          <q-btn v-close-popup dense flat icon="icon-mat-close" @click="store.openEdit = false">
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
        <div class="q-pa-md">
          <div class="row">
            <div class="col-12">
              <app-input-simrs v-model="store.formKetToEdit.ket" label="Keterangan"
                :loading="store.loadingSimpanKetTind" :disable="store.loadingSimpanKetTind" />
            </div>
          </div>
          <div class="row justify-end q-col-gutter-x-md">
            <div class="col-auto ">
              <q-btn color="negative" label="Batal" @click="batal" dense no-caps :loading="store.loadingSimpanKetTind"
                :disable="store.loadingSimpanKetTind" />
            </div>
            <div class="col-auto ">
              <q-btn color="primary" label="Simpan" @click="simpan" dense no-caps :loading="store.loadingSimpanKetTind"
                :disable="store.loadingSimpanKetTind" />
            </div>
          </div>

        </div>

      </div>
    </q-card>
  </q-dialog>

</template>
<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useLayananPoli()
function simpan () {
  store.seveEditKeteranganTindakan(props.pasien)
}
function batal () {
  store.openEdit = false
}
</script>
