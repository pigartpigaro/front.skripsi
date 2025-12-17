<template>
  <q-splitter v-model="splitterModel" style="height: 100%">

    <template v-slot:before>
      <q-splitter v-model="insideModel1">

        <template v-slot:before>
          <q-splitter v-model="insideModel1a" horizontal ref="insideModel1aRef">
            <!-- form A TINDAKAN -->
            <template v-slot:before>
              <div class="fit q-pa-xs">
                <q-card flat class="fit column" @mouseleave="setSplitter('insideModel1a', 50)">
                  <div class="col-auto q-pa-sm text-bold bg-dark text-white">
                    <div class="f-14">TINDAKAN</div>
                  </div>
                  <div class="col fit scroll">
                    <div class="row q-pa-md q-col-gutter-sm">
                      <autocomplete-input-two v-model="store.form.tindakan" :options="store.tindakans"
                        option-label="tindakan" option-value="tindakan" :filters-by="['tindakan']" multiple @focus="() => {
                          setSplitter('insideModel1a', 100)
                        }" class="col-12" @set-model="(val) => {
                          console.log('val', val);

                        }" />
                      <!-- <app-input-simrs label="Tindakan" /> -->
                      <q-input v-model="store.form.keterangan" type="textarea" outlined standout="bg-yellow-3"
                        @focus="() => setSplitter('insideModel1a', 100)" label="Keterangan" class="col-12" />
                    </div>
                  </div>
                </q-card>
              </div>
            </template>
            <!-- form B IMPLEMENTASI -->
            <template v-slot:after>
              <div class="fit q-pa-xs">
                <q-card flat class="fit column" @mouseover="setSplitter('insideModel1a', 0)"
                  @mouseleave="setSplitter('insideModel1a', 50)">
                  <div class="col-auto q-pa-sm text-bold bg-dark text-white">
                    <div class="f-14">IMPLEMENTASI</div>
                  </div>
                  <div class="col full-height scroll">
                    <div class="q-pa-md">

                      <q-input v-model="store.form.implementasi" type="textarea" outlined standout="bg-yellow-3"
                        label="Implementasi" row="8" @focus="() => setSplitter('insideModel1a', 0)" />



                      <q-input v-model="store.form.reseps" type="textarea" outlined standout="bg-yellow-3"
                        label="Pemakaian Obat" row="8" @focus="() => setSplitter('insideModel1a', 0)" class="q-mt-sm" />
                    </div>
                  </div>
                </q-card>
              </div>
            </template>

          </q-splitter>
        </template>

        <template v-slot:after>
          <q-splitter v-model="insideModel1b" horizontal>

            <!-- form C OBSERVASI -->
            <template v-slot:before>
              <div class="fit q-pa-xs">
                <q-card flat class="fit column" @mouseleave="setSplitter('insideModel1b', 50)">
                  <div class="col-auto q-pa-sm text-bold bg-dark text-white">
                    <div class="f-14">OBSERVASI</div>
                  </div>
                  <div class="col full-height scroll">
                    <div class="row q-pa-md q-col-gutter-sm">
                      <app-input-simrs v-model="store.form.bb" label="BB" class="col-3"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.tb" label="TB" class="col-3"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.suhu" label="Suhu" class="col-3"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.nadi" label="N" class="col-3"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.sis" label="Sis" class="col-3"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.dia" label="Dia" class="col-3"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.rr" label="RR" class="col-3"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.spo2" label="SPO2" class="col-3"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.nyeri" label="NYERI" class="col-6"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.skor" label="SKORING" class="col-6"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <!-- <q-input type="textarea" outlined standout="bg-yellow-3" label="Implementasi" class="col" /> -->
                      <div class="col-12">
                        <q-separator></q-separator>
                      </div>
                      <app-input-simrs v-model="store.form.cvp" label="CVP" class="col-4"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.icp" label="ICP" class="col-4"
                        @focus="() => setSplitter('insideModel1b', 100)" />
                      <app-input-simrs v-model="store.form.gcs" label="GCS" class="col-4" />
                      <div class="col-6">Kejang, Durasi </div> <app-input-simrs v-model="store.form.kejang"
                        label="terjadi" class="col-6" @focus="() => setSplitter('insideModel1b', 100)" />

                    </div>
                  </div>
                </q-card>
              </div>
            </template>

            <template v-slot:after>
              <div class="fit q-pa-xs">
                <q-card flat class="fit column">
                  <div class="col-auto q-pa-sm text-bold bg-dark text-white">
                    <div class="f-14">VENTILATOR MENU - CPAD</div>
                  </div>
                  <div class="col full-height scroll">
                    <div class="row q-pa-md q-col-gutter-sm">
                      <app-input-simrs v-model="store.form.mode" label="Mode" class="col-6" />
                      <app-input-simrs v-model="store.form.fraksio2" label="Fraksi O2" class="col-6" />
                      <app-input-simrs v-model="store.form.frek" label="Frekuensi" class="col-6" />
                      <app-input-simrs v-model="store.form.peep" label="PEEP" class="col-6" />
                      <app-input-simrs v-model="store.form.pins" label="P ins" class="col-6" />
                      <app-input-simrs v-model="store.form.ratio" label="I:E Rasio" class="col-6" />
                    </div>
                  </div>
                </q-card>
              </div>
            </template>

          </q-splitter>
        </template>

      </q-splitter>
    </template>

    <template v-slot:after>
      <q-splitter v-model="insideModel2">

        <template v-slot:before>
          <div class="fit q-pa-xs">
            <q-card flat class="fit column">
              <div class="col-auto q-pa-sm text-bold bg-dark text-white">
                <div class="f-14">INTAKE</div>
              </div>
              <div class="col full-height scroll">
                <div class="row q-pa-md q-col-gutter-sm">
                  <div class="col-5">Infus </div> <app-input-simrs v-model="store.form.infus" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Pump </div> <app-input-simrs v-model="store.form.pump" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Obat-obatan </div> <app-input-simrs v-model="store.form.obat" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Albumin / Transfusi </div> <app-input-simrs v-model="store.form.albumin"
                    label="mililiter" class="col-7" />
                  <div class="col-5">Makan & Minum </div> <app-input-simrs v-model="store.form.mamin" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Zonde </div> <app-input-simrs v-model="store.form.zonde" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Water Metabolism </div> <app-input-simrs v-model="store.form.water"
                    label="mililiter" class="col-7" />

                </div>
              </div>
            </q-card>
          </div>
        </template>

        <template v-slot:after>
          <div class="fit q-pa-xs">
            <q-card flat class="fit column">
              <div class="col-auto q-pa-sm text-bold bg-dark text-white">
                <div class="f-14">OUTPUT</div>
              </div>
              <div class="col full-height scroll">
                <div class="row q-pa-md q-col-gutter-sm">
                  <div class="col-5">Urine </div> <app-input-simrs v-model="store.form.urine" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Drain </div> <app-input-simrs v-model="store.form.drain" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Muntah </div> <app-input-simrs v-model="store.form.muntah" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Feces </div> <app-input-simrs v-model="store.form.feces" label="mililiter"
                    class="col-7" />
                  <div class="col-5">IWL </div> <app-input-simrs v-model="store.form.iwl" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Pendarahan </div> <app-input-simrs v-model="store.form.pendarahan"
                    label="mililiter" class="col-7" />
                  <div class="col-5">UFG </div> <app-input-simrs v-model="store.form.ufg" label="mililiter"
                    class="col-7" />
                  <div class="col-5">Produksi GC </div> <app-input-simrs v-model="store.form.produksigc"
                    label="mililiter" class="col-7" />
                </div>
              </div>
            </q-card>
          </div>
        </template>

      </q-splitter>
    </template>

  </q-splitter>
</template>

<script setup>
import { useNurseNoteRanapStore } from 'src/stores/simrs/ranap/nursenote';
import { defineAsyncComponent, onMounted, ref, watchEffect } from 'vue'


const AutocompleteInputTwo = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/AutocompleteInputTwo.vue'))
const store = useNurseNoteRanapStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['openReseps'])

const splitterModel = ref(50)
const insideModel1 = ref(50)
const insideModel1a = ref(50)
const insideModel1aRef = ref(null)
const insideModel1b = ref(50)
const insideModel2 = ref(50)

const focusing = ref(null)

const setSplitter = (val, num) => {
  // console.log('val', val);
  if (val === 'insideModel1a') {
    insideModel1a.value = num

  } else if (val === 'insideModel1b') {
    insideModel1b.value = num
  }
}

const resetSplitter = () => {
  insideModel1a.value = 50
  insideModel1b.value = 50
}

onMounted(() => {
  // console.log('mounted', insideModel1aRef.value);

})

watchEffect(() => {
  // if (focusing.value) {
  //   setSplitter(focusing.value)
  // } else {
  //   resetSplitter()
  // }
  // console.log('focusing', focusing.value);

})
</script>