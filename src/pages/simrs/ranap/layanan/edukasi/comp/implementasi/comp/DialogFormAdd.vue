<template>
  <q-dialog persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
    <q-card class="fit bg-grey-3">
      <q-form class="column full-height" @submit="simpan">
        <div class="col-auto bg-primary text-white">
          <q-bar class="">
            <div>FORM IMPLEMENTASI</div>
            <q-space />


            <q-btn dense flat icon="icon-mat-close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
        </div>

        <div class="col scroll">
          <q-card-section class="row q-col-gutter-md justify-around">
            <div class="col-3">
              <q-card>
                <q-bar class="bg-dark text-white">
                  <div class="f-12 text-bold">METODE YG DIGUNAKAN</div>
                </q-bar>
                <q-card-section class="q-pa-sm">
                  <q-list dense separator bordered>
                    <q-item v-for="item in store.metodis" :key="item" tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-checkbox v-model="store.form.metode" :val="item" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ item }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>

              </q-card>
            </div>
            <div class="col-3">
              <q-card>
                <q-bar class="bg-dark text-white">
                  <div class="f-12 text-bold">MATERI</div>
                </q-bar>
                <q-card-section class="q-pa-sm">
                  <q-list dense separator bordered>
                    <q-item v-for="item in materi" :key="item" tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-checkbox v-model="store.form.materi" :val="item" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ item }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>

                  <q-input class="q-mt-md" outlined standout="bg-yellow-3" type="textarea"
                    v-model="store.form.materiLain" />
                </q-card-section>
              </q-card>
            </div>
            <div class="col-3">
              <q-card>
                <q-bar class="bg-dark text-white">
                  <div class="f-12 text-bold">MEDIA</div>
                </q-bar>
                <q-card-section class="q-pa-sm">
                  <q-list dense separator bordered>
                    <q-item v-for="item in store.medias" :key="item" tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-checkbox v-model="store.form.media" :val="item" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ item }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-bar class="bg-dark text-white">
                  <div class="f-12 text-bold">EVALUASI RESPON</div>
                </q-bar>
                <q-card-section class="q-pa-sm">
                  <q-list dense separator bordered>
                    <q-item v-for="item in store.evaluasis" :key="item" tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-radio v-model="store.form.evaluasi" :val="item" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ item }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-3">
              <q-card>
                <q-bar class="bg-dark text-white">
                  <div class="f-12 text-bold">PENERIMA EDUKASI</div>
                </q-bar>
                <q-card-section class="q-pa-sm">


                  <autocomplete-input v-model="store.form.penerima" :options="store.penerimaEdukasis"
                    label="Penerima Edukasi" class="q-mb-sm" :valid="{ required: false }" @set-model="(val) => {
                      if (val === 'Pasien') {
                        store.form.namaPenerima = pasien?.nama_panggil
                      } else {
                        store.form.namaPenerima = null
                      }
                      store.form.penerima = val
                    }" />
                  <app-input-simrs label="Nama Penerikma Edukasi" v-model="store.form.namaPenerima"
                    :valid:="{ required: false }" />
                  <app-input-simrs label="Estimasi Waktu" v-model="store.form.estimasi" :valid:="{ required: false }" />
                  <div class="q-pa-sm" style="border: 1px solid #ccc;">
                    <div class="q-mt-md q-mb-xs">
                      TTD PASIEN / KELUARGA :
                    </div>
                    <TtdWacom uuid="ttd-penerima-edukasi"
                      :ttd-name="store.form.namaPenerima ?? 'nama pasien / keluarga'" @signature:ttd-penerima-edukasi="(val) => {
                        store.form.ttdPenerima = val
                      }" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </div>
        <div class="col-auto bg-primary q-pa-md">
          <div class="row justify-between">
            <q-btn label="Kembali" color="dark" text-color="white" v-close-popup />
            <q-btn type="submit" label="Simpan" color="yellow-3" text-color="dark" :loading="store.loadingSave"
              :disable="store.loadingSave" />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useImplementasiEdukasiRanapStore } from 'src/stores/simrs/ranap/implementasiEdukasi';
import { computed, defineAsyncComponent } from 'vue';


const store = useImplementasiEdukasiRanapStore()
const AutocompleteInput = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/AutocompleteInput.vue'))
const TtdWacom = defineAsyncComponent(() => {
  return import('src/components/~static/TtdWacomStu540.vue')
})

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  },
})

const materi = computed(() => {
  if (props?.nakes === '1') {
    return store.materiDpjp
  } else if (props?.nakes === '2') {
    return store.materiPerBid
  } else if (props?.nakes === '3') {
    return store.materiPerBid

  } else if (props?.nakes === '4') {
    return store.materiApoteker
  } else if (props?.nakes === '5') {
    return store.materiGizi
  } else if (props?.nakes === '6') {
    return store.materiFisio

  } else {
    return null
  }
})

const emits = defineEmits(['exit'])
const simpan = () => {
  // console.log('simpan');
  store.simpanData(props.pasien, props.nakes)
    .then(() => {
      emits('exit')
    })

}


</script>