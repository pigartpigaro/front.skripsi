<template>
  <div style="height: 75vh;">
    <div class="col full-height relative-position">

      <!-- Nama header template -->
      <div class="row items-center q-col-gutter-sm q-mb-sm">
        <div class="col-4">
          <q-input ref="refNamaTemplate" v-model="store.form.nama" label="Nama Template" dense
            :rules="[val => !!val || '']" lazy-rules no-error-icon hide-bottom-space standout="bg-yellow-3" outlined />
        </div>
        <div class="col-4">
          <app-autocomplete v-model="store.form.user" label="Template untuk" autocomplete="nama" option-label="nama"
            outlined option-value="value" :source="store.typeOptions" />
        </div>
        <div class="col-4">
          <app-autocomplete v-model="store.form.groups" label="Sistem Bayar" autocomplete="nama" option-label="nama"
            outlined option-value="value" :source="store.sistemBayarOptions" @update:model-value="store.cariObat('')" />
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
                hide-dropdown-icon :rules="[val => (val !== null && val !== '') || '']" lazy-rules hide-bottom-space
                no-error-icon :options="store.Obats" @input-value="inputObat" @focus="inputObat" clearable
                :loading="store.loadingObat" @update:model-value="obatSelected" @keyup.enter.stop="obatEnter">
                <template #prepend>
                  <q-icon name="icon-mat-search" />
                </template>
                <template #option="scope">
                  <q-item v-bind="scope.itemProps">
                    <div v-if="scope.opt.namaobat">
                      <span v-html="highlightText(scope.opt?.namaobat)" />
                    </div>
                    <div v-if="scope.opt.kandungan" class="q-ml-xs q-mr-xs text-deep-orange">
                      (<span v-html="highlightText(scope.opt?.kandungan)" />)

                    </div>
                    <!-- <div v-if="scope.opt.alokasi > 0" class="q-ml-xs text-weight-bold text-green">
                      {{ scope.opt.alokasi }} <span class="f-8">(tersedia)</span>
                    </div> -->
                    <!-- <div v-if="scope.opt.alokasi <= 0" class="q-ml-xs text-weight-bold text-negative f-14">
                      {{ scope.opt.alokasi }} <span class="f-8">(habis)</span>
                    </div> -->
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
                  <q-input ref="refQty" v-model="store.form.jumlah" label="Qty" dense
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

          <template v-if="store.item?.rinci?.length && store.item?.edit">
            <q-item v-for="(item, i) in store.item?.rinci" :key="i" :class="item?.errMsg ? 'bg-red-1' : ''">
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
                    {{ item?.jumlah }}
                  </div>
                  <div class="col text-right">
                    {{ item?.errMsg ?? item?.successMsg }}
                  </div>
                  <div class="col-shrink text-right">
                    <q-btn color="negative" dense flat no-caps size="xs" icon="icon-mat-delete"
                      :disable="item.loading || store.loadingKirim" :loading="item.loading"
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
      </q-scroll-area>
      <div class="row q-mx-sm justify-between" v-if="store.item">
        <q-btn color="primary" no-caps size="sm" label="Selesai" @click="() => {
          store.item = null
          store.setForm('id', null)
          store.setForm('nama', '')
          store.setForm('user', 'private')
        }" />
        <q-btn color="dark" no-caps size="sm" label="Kirim" @click="kirimOrder" :loading="store.item.loading"
          :disable="store.item.loading || store.loadingKirim"> <q-tooltip class="bg-white text-primary">
            Kirim Template ke Depo
          </q-tooltip>
        </q-btn>
      </div>

    </div>
  </div>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useTemplatePersiapanOperasiStore } from 'src/stores/simrs/farmasi/kamaroperasi/template'
import { ref } from 'vue'
const props = defineProps({
  pasien: { type: Object, default: null }
})
const store = useTemplatePersiapanOperasiStore()
const refNamaTemplate = ref(null)
const refObat = ref(null)
const refQty = ref(null)

const modVal = ref(null)

function kirimOrder () {
  store.item.noreg = props.pasien.noreg
  store.item.norm = props.pasien.norm
  store.kirimOrder(store.item)
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

  modVal.value = val
})

function obatSelected (val) {
  // console.log('select obat', val)
  if (val?.alokasi <= 0) {
    store.namaObat = null
    return notifErrVue('Stok Alokasi sudah habis, silahkan pilih obat yang lain')
  }
  // console.log('obat selected', val)
  // store.setForm('satuan_kcl', val?.satuankecil ?? '-')
  store.setForm('kd_obat', val?.kdobat ?? '-')
  // store.setForm('kandungan', val?.kandungan ?? '-')
  // store.setForm('status_konsinyasi', val?.status_konsinyasi ?? '-')
  // store.setForm('fornas', val?.fornas ?? '-')
  // store.setForm('forkit', val?.forkit ?? '-')
  // store.setForm('generik', val?.generik ?? '-')
  // store.setForm('kode108', val?.kode108 ?? '-')
  // store.setForm('uraian108', val?.uraian108 ?? '-')
  // store.setForm('kode50', val?.kode50 ?? '-')
  // store.setForm('uraian50', val?.uraian50 ?? '-')
  // store.setForm('stokalokasi', val?.alokasi ?? '-')
  // store.setForm('kodedepo', 'Gd-04010103')
  setTimeout(() => {
    obatEnter()
  }, 100)
}
function obatEnter () {
  // refObat.value?.hidePopup()
  refQty.value.focus()
  refQty.value.select()
}
function validate () {
  console.log('validate', refQty.value)

  const nama = refNamaTemplate.value?.validate()
  const obat = refObat.value?.validate()
  const qty = refQty.value?.validate()
  if (!nama) notifErrVue('Nama Template tidak boleh kosong')
  if (!obat) notifErrVue('Obat tidak boleh kosong')
  if (!qty) notifErrVue('Jumlah harus lebih dari 1')
  if (nama && obat && qty) return true
  else return false
}
function qtyEnter () {
  console.log('qty enter')
  simpanObat()
}
function simpanObat () {
  if (validate()) {
    refQty.value.blur()
    console.log('simpan', refObat.value)
    store.simpan().then(() => {
      refObat.value?.focus()
    })
  }
  else console.log('simpan obat tidak valid', store.form)
  // store.simpanObat()
}

function highlightText (text) {
  // Implement your text highlighting logic here
  // For example, you can wrap the matching text in <span> with a specific style
  // console.log('text', text)
  return text.replace(new RegExp(modVal.value, 'ig'), matchedText => `<span class="bg-yellow text-dark">${matchedText}</span>`)
}
</script>
