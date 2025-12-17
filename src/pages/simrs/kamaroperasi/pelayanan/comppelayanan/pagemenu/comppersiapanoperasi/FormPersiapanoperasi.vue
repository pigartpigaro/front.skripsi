<template>
  <div class="bg-white full-height column">
    <div class="col-auto bg-primary text-white">
      <div class="q-pa-sm">
        Form Persiapan Operasi
      </div>
    </div>
    <div class="col full-height relative-position">
      <!-- Option tipe Resep -->
      <div class="row justify-between items-center">
        <div v-if="store?.form?.tiperesep === 'iter'">
          <app-input-date :model="store.form.iter_expired" label="Iter Berlaku Sampai" outlined
            @set-model="store.setForm('iter_expired', $event)" />
        </div>
      </div>
      <q-scroll-area style="height: 100%; padding-bottom: 60px;">
        <q-list separator bordered>
          <!-- Header nya -->
          <q-item class="bg-dark text-white">
            <q-item-section style="width: 50%;">
              NAMA OBAT
            </q-item-section>
            <q-item-section side style="width:50%">
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div class="col">
                  Jumlah
                </div>
              </div>
            </q-item-section>
          </q-item>
          <!-- Inputan -->
          <q-item>
            <q-item-section style="width: 50%;" class="relative-position full-height">
              <q-select ref="refObat" v-model="store.namaObat" use-input label="Cari Obat" dense option-label="namaobat"
                option-value="kodeobat" standout="bg-yellow-3" outlined input-debounce="800" class="full-width"
                hide-dropdown-icon :rules="[obatValid]" lazy-rules hide-bottom-space no-error-icon
                :options="store.Obats" @input-value="inputObat" @focus="inputObat" @update:model-value="obatSelected"
                @keyup.enter.stop="obatEnter">
                <template #prepend>
                  <q-icon name="icon-mat-search" />
                </template>
                <template #option="scope">
                  <q-item v-bind="scope.itemProps">
                    <div v-if="scope.opt.namaobat">
                      {{ scope.opt.namaobat }}
                    </div>
                    <div v-if="scope.opt.kandungan" class="q-ml-xs q-mr-xs text-deep-orange">
                      ({{ scope.opt.kandungan }})
                    </div>
                    <div v-if="scope.opt.alokasi > 0" class="q-ml-xs text-weight-bold text-green">
                      {{ scope.opt.alokasi }} <span class="f-8">(tersedia)</span>
                    </div>
                    <div v-if="scope.opt.alokasi <= 0" class="q-ml-xs text-weight-bold text-negative f-14">
                      {{ scope.opt.alokasi }} <span class="f-8">(habis)</span>
                    </div>
                    <div v-if="scope.opt.satuankecil" class="q-ml-xs text-primary">
                      {{ scope.opt.satuankecil }}
                    </div>
                    <div v-if="scope.opt.status_konsinyasi === '1'"
                      class="q-ml-xs text-italic f-10 text-weight-bold text-deep-purple">
                      ( Konsinyasi )
                    </div>
                  </q-item>
                </template>
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-item-section>
            <q-item-section side style="width:50%">
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div class="text-right col">
                  <q-input ref="refQty" v-model="store.form.jumlah_minta" label="Qty" dense
                    :rules="[val => parseFloat(val) >= 1 || '']" lazy-rules no-error-icon hide-bottom-space
                    standout="bg-yellow-3" outlined @keyup.enter.stop="qtyEnter" />
                </div>
                <div class="col-shrink text-right">
                  <q-btn color="dark" dense flat icon="icon-mat-save" :disable="store.loading || store.loadingkirim"
                    :loading="store.loading" @click="simpanObat">
                    <q-tooltip class="bg-white text-primary">
                      Simpan Obat
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-item-section>
          </q-item>

          <!-- hasil Inputan -->
          <template v-if="store.listBelum?.rinci?.length">
            <q-item v-for="(item, i) in store.listBelum?.rinci" :key="i">
              <!-- {{ item }} -->
              <q-item-section style="width: 50%;">
                <div class="row">
                  {{ item?.obat?.nama_obat }}
                </div>
                <div class="row text-italic f-10">
                  {{ item?.kd_obat }}
                </div>
              </q-item-section>
              <q-item-section side style="width:50%">
                <div class="row items-center q-col-gutter-sm full-width">
                  <div class="text-right col-3">
                    {{ item?.jumlah_minta }}
                  </div>
                  <div class="col text-right">
                    <!-- {{ item?.keterangan }} -->
                  </div>
                  <div class="col-shrink text-right">
                    <q-btn color="negative" dense flat no-caps size="xs" icon="icon-mat-delete"
                      :disable="store.loading || store.loadingkirim"
                      :loading="store.loadingHapus && store.obatId === item.id && !store.namaRacikan"
                      @click="store.hapusObat(item)">
                      <q-tooltip class="bg-white text-primary">
                        Hapus
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
        <div class="q-mt-lg" />
      </q-scroll-area>
      <div class="absolute-bottom q-pa-sm bg-yellow-3 row items-center justify-between">
        <div class="q-gutter-sm">
          <q-btn color="dark" @click="tempOp.isOpen = true">
            Buka Template
          </q-btn>
        </div>
        <div>
          <q-btn color="primary" :loading="store.loadingkirim" :disable="store.loadingkirim"
            @click="store.selesaiResep">
            Kirim Permintaan
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <app-fullscreen-blue v-model="tempOp.isOpen">
    <template #default>
      <frontTemplate :pasien="pasien" />
    </template>
  </app-fullscreen-blue>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { onMounted, ref, onUnmounted, defineAsyncComponent } from 'vue'
import { usePersiapanOperasiStore } from 'src/stores/simrs/farmasi/kamaroperasi/resepsemntara'
import { notifErrVue } from 'src/modules/utils'
import { useTemplatePersiapanOperasiStore } from 'src/stores/simrs/farmasi/kamaroperasi/template'

const props = defineProps({
  pasien: { type: Object, default: null },
  depo: { type: String, default: '' }
})
const store = usePersiapanOperasiStore()
const tempOp = useTemplatePersiapanOperasiStore()

const frontTemplate = defineAsyncComponent(() => import('src/pages/simrs/kamaroperasi/pelayanan/comppelayanan/pagemenu/comppersiapanoperasi/compTemplate/FrontTemplate.vue'))

const refObat = ref(null)
const refQty = ref(null)
function setPasien () {
  store.setPasien()
}

function myDebounce (func, timeout = 800) {
  let timer
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, arg) }, timeout)
  }
}
const inputObat = myDebounce((val) => {
  // console.log('input obat', val, typeof val)
  if ((typeof val) !== 'string') val = ''
  if (val !== '') store.cariObat(val)
  if (val === '' && store.nonFilteredObat?.length) store.Obats = store.nonFilteredObat
})

function obatSelected (val) {
  // console.log('select obat', val)
  if (val?.alokasi <= 0) {
    store.namaObat = null
    return notifErrVue('Stok Alokasi sudah habis, silahkan pilih obat yang lain')
  }
  // console.log('obat selected', val)
  store.setForm('satuan_kcl', val?.satuankecil ?? '-')
  store.setForm('kodeobat', val?.kdobat ?? '-')
  store.setForm('kandungan', val?.kandungan ?? '-')
  store.setForm('status_konsinyasi', val?.status_konsinyasi ?? '-')
  store.setForm('fornas', val?.fornas ?? '-')
  store.setForm('forkit', val?.forkit ?? '-')
  store.setForm('generik', val?.generik ?? '-')
  store.setForm('kode108', val?.kode108 ?? '-')
  store.setForm('uraian108', val?.uraian108 ?? '-')
  store.setForm('kode50', val?.kode50 ?? '-')
  store.setForm('uraian50', val?.uraian50 ?? '-')
  store.setForm('stokalokasi', val?.alokasi ?? '-')
  store.setForm('kodedepo', 'Gd-04010103')
}

function obatEnter () {
  refQty.value.focus()
  refQty.value.select()
}
// jumlah
function qtyEnter () {
  console.log('qty enter')
  simpanObat()

}

function obatValid (val) {
  return (val !== null && val !== '') || ''
}

function validate () {
  if (store?.form?.kodeobat !== '') {
    const ob = store?.nonFilteredObat.filter(o => o.kodeobat === store?.form?.kodeobat)
    if (ob?.length && !Object?.keys(store?.namaObat)?.length) store.namaObat = ob[0]

  }


  if (refObat.value.validate() && refQty.value.validate()) return true
  else return false
}

function simpanObat () {
  console.log('simpan', store.form)
  if (validate()) {
    store.simpanObat()
  }
}
onMounted(() => {
  console.log('depo', props.pasien)
  store.pasien = props?.pasien
  store.depo = 'ok'
  store.dpPar = 'Gd-04010103'
  // store.getSigna()
  store.cariObat()
  setPasien()
  if (props?.pasien?.permintaanobatoperasi?.length) store.setNopermintaan(props?.pasien?.permintaanobatoperasi)

  refObat.value.focus()

})
onUnmounted(() => {

  store.resetForm()
})
</script>
