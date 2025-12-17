<template>
  <q-card class="futuristic-form" style="height: calc(100%);">
    <div class="full-height scroll">
      <div class="row q-pa-lg q-col-gutter-x-lg">
        <div class="col-4">
          <!-- Tindakan -->
          <div class="column gap-2">
            <div class="text-lg text-subtitle1 text-bold">Tindakan</div>
            <!-- <autocomplete-input-two v-model="store.form.tindakan" :options="store.tindakans" option-label="tindakan"
              option-value="tindakan" :filters-by="['tindakan']" multiple @focus="() => {
                setSplitter('insideModel1a', 100)
              }" class="col-12" @set-model="(val) => {
                console.log('val', val);

              }" /> -->
            <q-input v-model="store.form.ket" type="textarea" outlined standout="bg-yellow-3"
              @focus="() => setSplitter('insideModel1a', 100)" label="Catatan Infus" class="col-12" />
          </div>

          <div class="col-12">
            <q-separator class="q-my-sm"></q-separator>
          </div>

          <!-- Implementasi -->
          <div class="column gap-2 q-mt-sm">
            <div class="text-lg text-subtitle1 text-bold">CATATAN</div>
            <q-input v-model="store.form.implementasi" type="textarea" outlined standout="bg-yellow-3" label="Catatan"
              :rows="15" @focus="() => setSplitter('insideModel1a', 0)" />

            <!-- <q-btn class="full-width" color="teal">Tambah Pemakaian Obat Reseps</q-btn>
            <q-btn class="full-width" color="orange">Tambah Pemakaian Obat Non Reseps</q-btn> -->

            <!-- <q-input v-model="store.form.reseps" type="textarea" outlined standout="bg-yellow-3" label="Pemakaian Obat"
              row="8" @focus="() => setSplitter('insideModel1a', 0)" class="q-mt-sm" /> -->

            <!-- <q-card class="rounded-xl shadow-2xl">
              <q-card-section class="text-center f-16 text-weight-bold">
                📋 Daftar Pemakaian Obat
              </q-card-section>

              <q-separator />

              <q-card-section>
                <q-list bordered separator class="rounded-lg shadow-md">
                  <template v-if="obatList?.length">
                    <q-item v-for="(obat, index) in obatList" :key="index" class="q-hoverable futuristic-item">
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white" size="sm">
                          {{ obat.nama.charAt(0) }}
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label class="f-12 text-bold">{{ obat.nama }}</q-item-label>
                        <q-item-label caption>{{ obat.kandungan }}</q-item-label>
                      </q-item-section>

                      <q-item-section side class="text-center">
                        <div class="text-bold">{{ obat.banyak }} {{ obat.satuan }}</div>
                        <q-badge :color="obat.sisa > 10 ? 'green' : 'red'" class="text-white q-mt-sm">
                          Sisa: {{ obat.sisa }}
                        </q-badge>
                      </q-item-section>
                    </q-item>
                  </template>

<template v-else>
                    <div class="empty-state flex flex-center column q-pa-lg">
                      <div class="text-subtitle1 text-grey-5 q-mt-md">
                        📋 Belum ada data obat
                      </div>
                      <q-btn color="primary" label="Tambah Obat" class="q-mt-md" @click="addDummyData" />
                    </div>
                  </template>
</q-list>
</q-card-section>
</q-card> -->
            <CardPemakaianObat :pasien="pasien" :kasus="kasus" :nakes="nakes" :reseps="store.form.reseps"
              @add-non-resep="(val) => {
                store.typePemakaianObat = val
                store.dialogPreview = true
              }" @add-resep="(val) => {
                store.typePemakaianObat = val
                store.dialogPreview = true
              }" @hapus-obat="(index) => hapusObat(index)" />
          </div>









        </div>
        <div class="col-4">
          <div class="column gap-2">
            <div class="text-lg text-subtitle1 text-bold">Tanda-Tanda Vital (TTV)</div>
            <div class="row q-col-gutter-x-sm">
              <app-input-simrs v-model="store.form.bb" label="BB" class="col-3 q-mb-sm"
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
              <div class="col-12">
                <q-separator class="q-my-sm"></q-separator>
              </div>

              <app-input-simrs v-model="store.form.nyeri" label="NYERI" class="col-6 q-mb-sm"
                @focus="() => setSplitter('insideModel1b', 100)" />
              <app-input-simrs v-model="store.form.skor" label="SKORING" class="col-6"
                @focus="() => setSplitter('insideModel1b', 100)" />
              <!-- <q-input type="textarea" outlined standout="bg-yellow-3" label="Implementasi" class="col" /> -->
              <div class="col-12">
                <q-separator class="q-my-sm"></q-separator>
              </div>
              <app-input-simrs v-model="store.form.cvp" label="CVP" class="col-4"
                @focus="() => setSplitter('insideModel1b', 100)" />
              <app-input-simrs v-model="store.form.icp" label="ICP" class="col-4"
                @focus="() => setSplitter('insideModel1b', 100)" />
              <app-input-simrs v-model="store.form.gcs" label="GCS" class="col-4" />
              <div class="col-6">Kejang, Durasi </div> <app-input-simrs v-model="store.form.kejang" label="terjadi"
                class="col-6" @focus="() => setSplitter('insideModel1b', 100)" />

              <div class="col-12">
                <q-separator class="q-my-xs"></q-separator>
              </div>

              <!-- Implementasi -->
              <div class="col-12 row q-mt-sm">
                <div class="text-lg text-subtitle1 text-bold q-mb-sm col-12">Ventilator Menu - CPAD</div>
                <div class="row q-col-gutter-sm ">
                  <app-input-simrs v-model="store.form.mode" label="Mode" class="col-6" />
                  <app-input-simrs v-model="store.form.fraksio2" label="Fraksi O2" class="col-6" />
                  <app-input-simrs v-model="store.form.frek" label="Frekuensi" class="col-6" />
                  <app-input-simrs v-model="store.form.peep" label="PEEP" class="col-6" />
                  <app-input-simrs v-model="store.form.pins" label="P ins" class="col-6" />
                  <app-input-simrs v-model="store.form.ratio" label="I:E Rasio" class="col-6" />
                  <app-input-simrs v-model="store.form.flow" label="Flow" class="col-6" />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="column gap-2">
            <div class="text-lg text-subtitle1 text-bold">Intake</div>
            <div class="row q-col-gutter-sm">
              <div class="col-4">
                <div class="col-8">Infus </div> <app-input-simrs v-model="store.form.infus" label="mililiter"
                  class="col-4" />
              </div>
              <div class="col-4">
                <div class="col-8">Pump </div> <app-input-simrs v-model="store.form.pump" label="mililiter"
                  class="col-4" />
              </div>
              <div class="col-4">
                <div class="col-8">Obat-obatan </div> <app-input-simrs v-model="store.form.obat" label="mililiter"
                  class="col-4" />
              </div>

              <div class="col-4">
                <div class="col-8">Albumin / Transfusi </div> <app-input-simrs v-model="store.form.albumin"
                  label="mililiter" class="col-4" />
              </div>
              <div class="col-4">
                <div class="col-8">Makan & Minum </div> <app-input-simrs v-model="store.form.mamin" label="mililiter"
                  class="col-4" />
              </div>

              <div class="col-4">
                <div class="col-8">Zonde </div> <app-input-simrs v-model="store.form.zonde" label="mililiter"
                  class="col-4" />
              </div>
              <div class="col-4">
                <div class="col-8">Water Metabolism </div> <app-input-simrs v-model="store.form.water" label="mililiter"
                  class="col-4" />

              </div>

            </div>

            <div class="text-lg text-subtitle1 text-bold">Output</div>
            <div class="row q-col-gutter-sm">
              <div class="col-4">
                <div class="col-5">Urine </div> <app-input-simrs v-model="store.form.urine" label="mililiter"
                  class="col-7" />
              </div>
              <div class="col-4">
                <div class="col-5">Drain </div> <app-input-simrs v-model="store.form.drain" label="mililiter"
                  class="col-7" />
              </div>
              <div class="col-4">
                <div class="col-5">Muntah </div> <app-input-simrs v-model="store.form.muntah" label="mililiter"
                  class="col-7" />
              </div>
              <div class="col-4">
                <div class="col-5">Feces </div> <app-input-simrs v-model="store.form.feces" label="mililiter"
                  class="col-7" />
              </div>
              <div class="col-4">
                <div class="col-5">IWL </div> <app-input-simrs v-model="store.form.iwl" label="mililiter"
                  class="col-7" />

              </div>
              <div class="col-4">
                <div class="col-5">Pendarahan </div> <app-input-simrs v-model="store.form.pendarahan" label="mililiter"
                  class="col-7" />
              </div>
              <div class="col-4">
                <div class="col-5">UFG </div> <app-input-simrs v-model="store.form.ufg" label="mililiter"
                  class="col-7" />
              </div>
              <div class="col-4">
                <div class="col-5">Produksi GC </div> <app-input-simrs v-model="store.form.produksigc" label="mililiter"
                  class="col-7" />
              </div>

            </div>



            <q-card class="black-ku">
              <q-card-section>
                <div class="f-12 text-bold q-mb-sm">PENTING !</div>
                <div>Harap Pilih Inputan ini Nanti digunakan Untuk Dokumen Apa Saja, berdasarkan pilihan dibawah Berikut
                  : </div>
              </q-card-section>
              <q-card-section>
                <div class="empty-state">
                  <q-option-group dark v-model="store.form.flag" :options="store.flagings" color="primary"
                    type="checkbox" />
                </div>
              </q-card-section>
            </q-card>

          </div>

        </div>
      </div>
    </div>

  </q-card>
</template>

<script setup>
import { useNurseNoteRanapStore } from 'src/stores/simrs/ranap/nursenote';
import { defineAsyncComponent, onMounted, ref, watchEffect } from 'vue'


const AutocompleteInputTwo = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/AutocompleteInputTwo.vue'))
const CardPemakaianObat = defineAsyncComponent(() => import('./CardPemakaianObat.vue'))
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

const hapusObat = (index) => {
  // jika dari form
  store.form.reseps.splice(index, 1)
  // jika dari items (editan)
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

<style lang="scss" scoped>
.futuristic-form {
  /* background: linear-gradient(135deg, $primary, $black); */
  /* padding: 30px; */
  /* border-radius: 15px; */
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
  /* max-width: 800px; */
  /* height: 100%; */
  /* overflow: hidden; */
}

.text-lg {
  color: #fff;
  background: linear-gradient(135deg, $dark, $primary);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  font-family: 'Orbitron', sans-serif;
  padding: 0 10px;
  border-radius: 5px;
  /* Font futuristik */
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 10px 0;
}



/* .q-input:hover,
.q-select:hover {
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
} */

.futuristic-btn {
  background: linear-gradient(135deg, #00bfff, #1e90ff);
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
  transition: all 0.3s ease;
}

.futuristic-btn:hover {
  box-shadow: 0 0 25px rgba(0, 191, 255, 0.8);
  transform: scale(1.05);
}

.gap-1 {
  gap: 0.25rem;
}

/* 4px */
.gap-2 {
  gap: 0.5rem;
}

/* 8px */
.gap-3 {
  gap: 0.75rem;
}

/* 12px */
.gap-4 {
  gap: 1rem;
}

/* 16px */
.gap-5 {
  gap: 1.25rem;
}

/* 20px */
.gap-6 {
  gap: 1.5rem;
}

/* 24px */







.futuristic-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.futuristic-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.empty-state {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(8px);
}

.q-card {
  .black-ku {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: white;
  }

  .empty-state {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px;
    backdrop-filter: blur(8px);
  }
}
</style>
