<template>
  <q-card class="falt col full-height">
    <q-form @submit="onSubmit" ref="formInput" class="full-height">
      <div class="row q-pa-sm q-col-gutter-md">
        <div class="q-gutter-y-md" style="width: 30%">
          <app-input-simrs v-model="store.formheader.noserahterimapekerjaan" label="Nomer Serahterima" readonly outlined
            dense />
        </div>
        <div class="q-gutter-y-md" style="width: 30%">
          <app-input-date-human label="Tanggal Serahterima" :model="store.formheader.tgltrans" icon="icon-mat-event"
            outlined :autofocus="false" :disable="store.disabled || store.loading" @db-model="tglTransaksi"
            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
          <!-- <app-input-date :model="store.formheader.tgltrans" label="Tanggal Transaksi" icon="icon-mat-event" outlined
            @set-model="tglTransaksi" /> -->
        </div>
        <div class="row q-gutter-y-md" style="width: 40%">
          <app-input-simrs style="width: 80%" label="Pilih Kontrak" readonly outlined dense
            v-model="store.formheader.nokontrak" :autofocus="false" :valid="{ required: false }"
            :disable="store.disabled || store.loading" />
          <div class="q-px-sm q-gutter-y-xs">
            <q-btn color="dark" round size="sm" icon="icon-mat-add" :loading="store.loading"
              :disable="store.loading || store.disableplus" :source="store.kontrakpekerjaan" @click="() => {
                store.kontrakpekerjaan = []
                store.openDialog = true
                store.getKontrakPekerjaan()
              }" />
          </div>
        </div>
      </div>
      <div class="row q-pa-sm q-col-gutter-md">
        <div class="q-gutter-y-md" style="width: 30%">
          <app-input-simrs label="Pejabat Teknis Kegiatan" readonly outlined dense v-model="store.formheader.namapptk"
            :autofocus="false" :valid="{ required: false }" :disable="store.disabled || store.loading" />
        </div>
        <div class="q-gutter-y-md" style="width: 30%">
          <app-input-simrs label="Kegiatan BLUD" readonly outlined dense v-model="store.formheader.kegiatanblud"
            :autofocus="false" :valid="{ required: false }" :disable="store.disabled || store.loading" />
        </div>
        <div class="q-gutter-y-md" style="width: 40%">
          <app-input-simrs label="Pihak Ketiga" readonly outlined dense v-model="store.formheader.namaperusahaan"
            :autofocus="false" :valid="{ required: false }" :disable="store.disabled || store.loading" />
        </div>
      </div>
      <select-kontrak v-model="store.openDialog" />

    </q-form>
    <div v-if="store.formheader.nokontrak" class="q-px-sm">
      <q-card class="full-width bg-grey-4 q-my-sm q-px-sm">
        <div class="row text-primary q-pa-sm q-my-sm q-px-sm">
          <div class="f-14 text-weight-bold">
            Rincian Serahterima
          </div>
        </div>
      </q-card>
    </div>
    <FormRincianSerahterima v-if="store.formheader.nokontrak" />
  </q-card>
</template>

<script setup>
import { useFormSerahterimaStore } from 'src/stores/siasik/transaksi/ls/serahterimapekerjaan/formserahterima';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import FormRincianSerahterima from './FormRincian.vue'


const SelectKontrak = defineAsyncComponent(() => import('./SelectKontrakPekerjaan.vue'))
const store = useFormSerahterimaStore()

// onMounted(() => {
//   store.getKontrakPekerjaan()
// })
const formInput = ref(null)

function onSubmit() {
  store.fixed = true
}

function tglTransaksi(val) {
  console.log('tglTransaksi', val)
  store.formheader.tgltrans = val


}




</script>
