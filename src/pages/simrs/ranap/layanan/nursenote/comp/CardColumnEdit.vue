<template>
  <q-card flat class="full-height q-pa-sm bg-grey">
    <q-form class="full-height" @submit="onSubmit">
      <div class="row full-height q-col-gutter-sm">
        <div class="col-4">
          <q-card flat class="full-height bg-white">
            <q-card-section class="q-pa-md">
              <div>
                <div class="text-bold">TINDAKAN </div>
                <q-separator class="q-my-sm"></q-separator>
                <!-- <div class="text-bold">Tindakan : </div>
              <div class="q-ml-sm relative-position"> {{ item?.tindakan?.join(', ') || '-' }}
                <q-popup-edit fit buttons v-model="item.tindakan" :cover="false" :offset="[0, 0]" class=""
                  v-slot="scope">

                  <autocomplete-input-two v-model="item.tindakan" :options="store.tindakans" option-label="tindakan"
                    option-value="tindakan" :filters-by="['tindakan']" label="Tindakan" multiple @set-model="(val) => {

                      item.tindakan = val
                      // console.log('val', item.tindakan);
                    }" />

                </q-popup-edit>

              </div> -->

              </div>
              <div>
                <div class="text-bold">Catatan Infus : </div>
                <div class="q-ml-sm">
                  <text-area-edit class="full-width" :model-value="item?.ket" @update:model-value="(val) => {
                    // console.log('val', val);
                    item.ket = val
                  }" />
                </div>
              </div>
              <q-separator class="q-my-sm"></q-separator>
              <div class="text-bold">IMPLEMENTASI </div>
              <q-separator class="q-my-sm"></q-separator>
              <div>
                <div class="text-bold">Catatan : </div>
                <!-- <div class="q-ml-sm column">
                <div v-html="getNewLine(item?.implementasi)" />
                <q-popup-edit fit buttons v-model="item.implementasi" :cover="true" class="" v-slot="scope">

                  <q-input type="textarea" rows="20" v-model="scope.value" autofocus :error="isErrInput"
                    :error-message="errMsg" @keyup.enter.stop label="Implementasi" />

                </q-popup-edit>

              </div> -->
                <div class="q-ml-sm" style="min-width: 100%;">
                  <text-area-edit class="full-width" :model-value="item?.implementasi" @update:model-value="(val) => {
                    // console.log('val', val);
                    item.implementasi = val
                  }" />
                </div>
              </div>
              <div>
                <!-- <div class="text-bold">Pemakaian Obat : </div>
              <div class="q-ml-sm">
                <text-area-edit class="full-width" :model-value="item?.pemakaianobat" @update:model-value="(val) => {
                  // console.log('val', val);
                  item.pemakaianobat = val

                }" />
              </div> -->

              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card flat class="fit bg-white">
            <q-card-section class="q-pa-md">
              <div>
                <div class="text-bold">Observasi </div>
                <q-separator class="q-my-sm"></q-separator>
                <div class="q-ml-sm flex">
                  <div class="text-bold">BB : </div>

                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item?.bb" type="number" @update:model-value="(val) => {
                      item.bb = val
                    }" />
                    <div>Kg</div>
                  </div>

                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">TB : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item?.tb" type="number" @update:model-value="(val) => {
                      item.tb = val
                    }" />
                    <div>Cm</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">SUHU : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item?.suhu" type="number" @update:model-value="(val) => {
                      item.suhu = val
                    }" />
                    <div>°C</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">NADI : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item?.nadi" type="number" @update:model-value="(val) => {
                      item.nadi = val
                    }" />
                    <div>x/mnt</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">Sis : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.sis" type="number" @update:model-value="(val) => {
                      item.sis = val
                    }" />
                    <div>mmHg</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">Dias : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.dia" type="number" @update:model-value="(val) => {
                      item.dia = val
                    }" />
                    <div>mmHg</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">RR : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.rr" type="number" @update:model-value="(val) => {
                      item.rr = val
                    }" />
                    <div>x/mnt</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">Spo2 : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.spo2" type="number" @update:model-value="(val) => {
                      item.spo2 = val
                    }" />
                    <div>%</div>
                  </div>
                </div>






              </div>

              <q-separator class="q-my-sm"></q-separator>

              <div class="q-ml-sm flex">
                <div class="text-bold">NYERI : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.nyeri" type="number" @update:model-value="(val) => {
                    item.nyeri = val
                  }" />
                  <div></div>
                </div>
              </div>
              <div class="q-ml-sm flex">
                <div class="text-bold">SKORING : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.skor" type="number" @update:model-value="(val) => {
                    item.skor = val
                  }" />
                  <div></div>
                </div>
              </div>



              <q-separator class="q-my-sm"></q-separator>
              <div class="q-ml-sm flex">
                <div class="text-bold">CVP : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.cvp" type="number" @update:model-value="(val) => {
                    item.cvp = val
                  }" />
                  <div></div>
                </div>
              </div>
              <div class="q-ml-sm flex">
                <div class="text-bold">ICP : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.icp" type="number" @update:model-value="(val) => {
                    item.icp = val
                  }" />
                  <div></div>
                </div>
              </div>
              <div class="q-ml-sm flex">
                <div class="text-bold">GCS : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.gcs" @update:model-value="(val) => {
                    item.gcs = val
                  }" />
                  <div></div>
                </div>
              </div>

              <div class="q-ml-sm flex">
                <div class="text-bold">KEJANG, DURASI : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.kejang" type="number" @update:model-value="(val) => {
                    item.kejang = val
                  }" />
                  <div></div>
                </div>
              </div>


              <q-separator class="q-my-sm"></q-separator>
              <div class="text-bold">VENTILATOR MENU - CPAD</div>
              <q-separator class="q-my-sm"></q-separator>

              <div class="q-ml-sm flex">
                <div class="text-bold">MODE : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.mode" @update:model-value="(val) => {
                    item.mode = val
                  }" />
                  <div></div>
                </div>
              </div>
              <div class="q-ml-sm flex">
                <div class="text-bold">FRAKSI O2 : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.fraksio2" type="number" @update:model-value="(val) => {
                    item.fraksio2 = val
                  }" />
                  <div></div>
                </div>
              </div>
              <div class="q-ml-sm flex">
                <div class="text-bold">FREKUENSI : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.frek" type="number" @update:model-value="(val) => {
                    item.frek = val
                  }" />
                  <div></div>
                </div>
              </div>
              <div class="q-ml-sm flex">
                <div class="text-bold">PEEP : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.peep" type="number" @update:model-value="(val) => {
                    item.peep = val
                  }" />
                  <div></div>
                </div>
              </div>
              <div class="q-ml-sm flex">
                <div class="text-bold">P INS : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.pins" type="number" @update:model-value="(val) => {
                    item.pins = val
                  }" />
                  <div></div>
                </div>
              </div>
              <div class="q-ml-sm flex">
                <div class="text-bold">RATIO : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.ratio" type="number" @update:model-value="(val) => {
                    item.ratio = val
                  }" />
                  <div></div>
                </div>
              </div>
              <div class="q-ml-sm flex">
                <div class="text-bold">FLOW : </div>
                <div class="flex items-center q-gutter-x-xs">
                  <text-edit style="max-width: 80px;" :model-value="item.flow" type="number" @update:model-value="(val) => {
                    item.flow = val
                  }" />
                  <div></div>
                </div>
              </div>



            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card flat class="fit bg-white">
            <q-card-section class="q-pa-md">
              <div>
                <div class="text-bold">INTAKE </div>
                <q-separator class="q-my-sm"></q-separator>
                <div class="q-ml-sm flex">
                  <div class="text-bold">INFUS : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.infus" type="number" @update:model-value="(val) => {
                      item.infus = val
                    }" />
                    <div> ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">PUMP : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.pump" type="number" @update:model-value="(val) => {
                      item.pump = val
                    }" />
                    <div> ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">OBAT2 AN : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.obat" type="number" @update:model-value="(val) => {
                      item.obat = val
                    }" />
                    <div> ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">ALBUMIN / TRANSFUSI : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.albumin" type="number" @update:model-value="(val) => {
                      item.albumin = val
                    }" />
                    <div> ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">MAKAN & MINUM : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.mamin" type="number" @update:model-value="(val) => {
                      item.mamin = val
                    }" />
                    <div> ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">ZONDE : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.zonde" type="number" @update:model-value="(val) => {
                      item.zonde = val
                    }" />
                    <div> ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">WATER MET : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.water" type="number" @update:model-value="(val) => {
                      item.water = val
                    }" />
                    <div> ml</div>
                  </div>
                </div>



                <q-separator class="q-my-sm"></q-separator>
                <div class="text-bold">OUTPUT </div>
                <q-separator class="q-my-sm"></q-separator>

                <div class="q-ml-sm flex">
                  <div class="text-bold">URINE : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.urine" type="number" @update:model-value="(val) => {
                      item.urine = val
                    }" />
                    <div>ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">DRAINE : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.draine" type="number" @update:model-value="(val) => {
                      item.draine = val
                    }" />
                    <div>ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">MUNTAH : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.muntah" type="number" @update:model-value="(val) => {
                      item.muntah = val
                    }" />
                    <div>ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">FECES : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.feces" type="number" @update:model-value="(val) => {
                      item.feces = val
                    }" />
                    <div>ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">IWL : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.iwl" type="number" @update:model-value="(val) => {
                      item.iwl = val
                    }" />
                    <div>ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">PENDARAHAN : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.pendarahan" type="number"
                      @update:model-value="(val) => {
                        item.pendarahan = val
                      }" />
                    <div>ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">UFG : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.ufg" type="number" @update:model-value="(val) => {
                      item.ufg = val
                    }" />
                    <div>ml</div>
                  </div>
                </div>
                <div class="q-ml-sm flex">
                  <div class="text-bold">PROD GC : </div>
                  <div class="flex items-center q-gutter-x-xs">
                    <text-edit style="max-width: 80px;" :model-value="item.produksigc" type="number"
                      @update:model-value="(val) => {
                        item.produksigc = val
                      }" />
                    <div>ml</div>
                  </div>
                </div>

              </div>




            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 ">

          <div class="row">
            <div class="col-6">
              <CardPemakaianObat :pasien="pasien" :kasus="kasus" :nakes="nakes" :reseps="item?.reseps" :key="item?.id"
                @add-non-resep="(val) => {
                  store.typePemakaianObat = val
                  store.dialogPreview = true
                }" @add-resep="(val) => {
                  store.typePemakaianObat = val
                  store.dialogPreview = true
                }" @hapus-obat="(index) => {
                  item?.reseps?.splice(index, 1)
                }" status="edit" />
            </div>
            <div class="col-6">
              <q-card class="black-ku q-ml-lg">
                <q-card-section>
                  <div class="f-12 text-bold q-mb-sm">PENTING !</div>
                  <div>Harap Pilih Inputan ini Nanti digunakan Untuk Dokumen Apa Saja, berdasarkan pilihan dibawah
                    Berikut
                    : </div>
                </q-card-section>
                <q-card-section>
                  <div class="empty-state">
                    <q-option-group dark v-model="item.flag" :options="store?.flagings" color="primary"
                      type="checkbox" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <q-card class="flex q-pa-sm bg-white q-mt-lg justify-between">
            <div class="column text-right">

              <div class="text-grey-8 q-mt-xs">
                <q-badge class="q-px-md q-py-sm cursor-pointer" outline color="dark" @click="showBalance(item)">
                  <div class="flex q-gutter-sm items-center">
                    <div class="">
                      Balance Cairan
                    </div>
                    <div>:</div>
                    <div v-if="store.loadingSave">
                      <q-spinner color="primary" size="20px"></q-spinner>
                    </div>
                    <div v-else>
                      <div v-if="item?.flag_balance" class="text-weight-bold">
                        {{ item?.balance }}
                      </div>
                      <div v-else>
                        <q-icon name="icon-mat-visibility_off" size="20px"></q-icon>
                      </div>
                    </div>
                  </div>
                </q-badge>
              </div>
            </div>

            <q-btn :loading="store.loadingSave"
              :disable="store.loadingSave || (auth?.user?.pegawai?.kdpegsimrs !== item?.user)" type="submit"
              label="Simpan Perubahan" color="primary">
              <q-tooltip v-if="auth?.user?.pegawai?.kdpegsimrs !== item?.user" class="bg-dark text-yellow"
                :offset="[10, 10]" anchor="top middle" self="center middle">
                Maaf Anda Bukan USER Nurse Note ini
              </q-tooltip>
            </q-btn>
          </q-card>


        </div>
      </div>



    </q-form>



    <dialog-kanan-resep :key="item?.id" :pasien="pasien" :kasus="kasus" :nakes="nakes" status="edit"
      :type="store.typePemakaianObat" class="z-top" @add-to-list="(val) => {
        // console.log(val, item);

        item?.reseps?.push(val)
      }" />
  </q-card>
</template>

<script setup>
import { getNewLine } from 'src/modules/formatter';
import { notifBottomVue } from 'src/modules/utils';
import { useAplikasiStore } from 'src/stores/app/aplikasi';
import { useNurseNoteRanapStore } from 'src/stores/simrs/ranap/nursenote';
import { defineAsyncComponent, onMounted, ref, watchEffect } from 'vue'


const AutocompleteInputTwo = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/AutocompleteInputTwo.vue'))
const TextEdit = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/TextEdit.vue'))
const TextAreaEdit = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/TextAreaEdit.vue'))
const CardPemakaianObat = defineAsyncComponent(() => import('./CardPemakaianObat.vue'))
const DialogKananResep = defineAsyncComponent(() => import('./DialogKananResep.vue'))
const store = useNurseNoteRanapStore()
const auth = useAplikasiStore()


const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  item: {
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


const insideModel1a = ref(50)
const insideModel1b = ref(50)

const focusing = ref(null)
const isErrInput = ref(false)
const errMsg = ref('')

const validInput = (val) => {
  if (val?.trim()?.length === 0) {
    isErrInput.value = true
    errMsg.value = 'Tidak boleh kosong'
    return false
  }
  isErrInput.value = false
  errMsg.value = ''
  return true
}


onMounted(() => {
  // console.log('mounted', insideModel1aRef.value);

})

const showBalance = (item) => {
  if (item.flag_balance === null || item.flag_balance === '' || item.flag_balance === '0') {
    item.flag_balance = '1'
  } else {
    item.flag_balance = null
  }
  store.simpanData(props?.pasien, item, true)
}


const onSubmit = () => {
  // console.log('item', props?.item);

  const ygPunya = auth?.user?.pegawai?.kdpegsimrs === props?.item?.user
  if (!ygPunya) {
    notifBottomVue('Maaf ... anda bukan USER Peng-input Nurse Note ini, Harap Edit Punya Sendiri...');
  } else {

    store.simpanData(props?.pasien, props?.item)
  }
}

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
