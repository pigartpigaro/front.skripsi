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

        <app-grid :cols="{ default: 1, sm: 1 }" :gap="16" class="q-mb-md">


          <search-bpom ref="searchBpom" @on-select="handleSelectBpom" :dark="dark" />

        </app-grid>





        <app-grid :cols="{ default: 1, sm: 2 }" :gap="16">
          <div class="full-width column q-gutter-sm">

            <div class="full-width col-span-1">
              <div class="text-weight-bold f-14">📝 Identitas Obat</div>
              <q-separator class="q-my-xs"></q-separator>
            </div>


            <app-input-simrs v-model="form.nama" label="NAMA" class="" :error-message="errorMessage('nama')"
              :is-error="isError('nama')" />



            <app-input-simrs v-model="form.barcode" label="BARCODE" class="" :error-message="errorMessage('barcode')"
              :is-error="isError('barcode')" />
            <app-input-simrs v-model="form.merk" label="MERK" class="" :error-message="errorMessage('merk')"
              :is-error="isError('merk')" />

            <app-input-simrs v-model="form.kandungan" type="textarea" label="KANDUNGAN" class=""
              :error-message="errorMessage('kandungan')" :is-error="isError('kandungan')" />

            <app-input-simrs v-model="form.bentuk_sediaan" label="BENTUK SEDIAAN" class=""
              :error-message="errorMessage('bentuk_sediaan')" :is-error="isError('bentuk_sediaan')" />


            <app-grid :cols="{ default: 1, md: 2 }" :gap="16">
              <app-input-simrs v-model="form.kekuatan_dosis" label="KEKUATAN DOSIS" class=""
                :error-message="errorMessage('kekuatan_dosis')" :is-error="isError('kekuatan_dosis')" />
              <app-input-simrs v-model="form.volumesediaan" label="VOLUME SEDIAAN" class=""
                :error-message="errorMessage('volumesediaan')" :is-error="isError('volumesediaan')" />

            </app-grid>

            <app-grid :cols="{ default: 1, md: 2 }" :gap="16">
              <app-input-simrs v-model="form.satuan_b" label="SATUAN BSR" class=""
                :error-message="errorMessage('satuan_b')" :is-error="isError('satuan_b')" />
              <app-input-simrs v-model="form.satuan_k" label="SATUAN KCL" class=""
                :error-message="errorMessage('satuan_k')" :is-error="isError('satuan_k')" />
              <!-- <app-autocomplete-debounce-input v-model="form.satuan_k" autocomplete="nama" option-label="nama"
                option-value="nama" outlined valid label="SATUAN KCL" autofocus :source="storeLama.satuanKs"
                @buang="storeLama.getSatuanKec"
                @on-enter="(val) => myDialog(storeLama.simpanCepatSatuanKec, val, 'Satuan Kecil')" /> -->

              <div class="full-width col-span-2">
                <div class="text-weight-bold f-14 text-negative"> 💊 {{ form.nama_obat }}</div>
              </div>

            </app-grid>


            <div class="full-width col-span-1 q-mt-md">
              <div class="text-weight-bold f-14">📦 Klasifikasi Obat</div>
              <q-separator class="q-my-xs"></q-separator>
            </div>


            <app-input-simrs v-model="form.jenis_perbekalan" label="JNS PERBEKALAN" class=""
              :error-message="errorMessage('jenis_perbekalan')" :is-error="isError('jenis_perbekalan')" />

            <app-input-simrs v-model="form.kelas_terapi" label="KELAS TERAPI" class=""
              :error-message="errorMessage('kelas_terapi')" :is-error="isError('kelas_terapi')" />


            <div class="full-width col-span-1 q-mt-md">
              <div class="text-weight-bold f-14">🧠 Kodefikasi / Referensi</div>
              <q-separator class="q-my-xs"></q-separator>
            </div>

            <app-grid :cols="{ default: 1, md: 2 }" :gap="16">
              <app-input-simrs v-model="form.kode108" label="KODE 108" class="" :error-message="errorMessage('kode108')"
                :is-error="isError('kode108')" />
              <app-input-simrs v-model="form.kode50" label="KODE 50" class="" :error-message="errorMessage('kode50')"
                :is-error="isError('kode50')" />
            </app-grid>

            <app-input-simrs v-model="form.uraian108" type="textarea" label="URAIAN 108" class=""
              :error-message="errorMessage('uraian108')" :is-error="isError('uraian108')" />
            <app-input-simrs v-model="form.uraian50" type="textarea" label="URAIAN 50" class=""
              :error-message="errorMessage('uraian50')" :is-error="isError('uraian50')" />
          </div>





          <div class="full-width column q-gutter-sm">

            <div class="full-width col-span-1">
              <div class="text-weight-bold f-14">🌡️ Status Khusus & Regulasi</div>
              <q-separator class="q-my-xs"></q-separator>
            </div>

            <!-- <app-input-simrs v-model="form.kelompok_psikotropika" label="KELOMPOK PSIKOTROPIKA" class=""
              :error-message="errorMessage('kelompok_psikotropika')" :is-error="isError('kelompok_psikotropika')" /> -->
            <div class="row ">
              <div class="col-auto"> KELOMPOK PSIKOTROPIKA ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.kelompok_psikotropika" :options="storeLama.optionNapzas" color="primary"
                    class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> STATUS GENERIK ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.status_generik" :options="storeLama.optionStatusGeneriks"
                    color="primary" class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> STATUS FORNAS ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.status_fornas" :options="storeLama.optionStatusFornases" color="primary"
                    class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> STATUS FORKID ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.status_forkid" :options="storeLama.optionStatusForkits" color="primary"
                    class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> OBAT KRONIS ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.status_kronis" :options="storeLama.optionKronis" color="primary"
                    class="q-ml-md" dense inline />
                </div>
              </div>
            </div>

            <app-input-simrs v-model="form.keterangan_kronis" type="textarea" label="RESTRIKSI FORNAS" class=""
              :error-message="errorMessage('keterangan_kronis')" :is-error="isError('keterangan_kronis')" />

            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> OBAT PRB ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.status_prb" :options="storeLama.optionPrb" color="primary"
                    class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> OBAT PROGRAM ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.obat_program" :options="storeLama.optionYN" color="primary"
                    class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> OBAT DONASI ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.obat_donasi" :options="storeLama.optionYN" color="primary"
                    class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> OBAT KEBIJAKAN ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.obat_kebijakan" :options="storeLama.optionYN" color="primary"
                    class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> OBAT KONSINYASI ? </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.status_konsinyasi" :options="storeLama.optionStatusKonsinyasi"
                    color="primary" class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row ">
              <div class="col-auto"> SISTEM BAYAR : </div>
              <div class="col-auto">
                <div class="q-gutter-sm">
                  <q-option-group v-model="form.sistembayar" :options="storeLama.optionSistemBayars" color="primary"
                    class="q-ml-md" dense inline />
                </div>
              </div>
            </div>
            <q-separator class="q-my-sm" />


            <app-input-simrs v-model="form.kelompok_rko" type="textarea" label="KELOMPOK RKO" class=""
              :error-message="errorMessage('kelompok_rko')" :is-error="isError('kelompok_rko')" />
          </div>
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
import SearchBpom from './comp/SearchBpom.vue'
import { useMasterObatForm } from 'src/stores/simrs/master/farmasi/obat/form'



const storeLama = useMasterObatForm()

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

const searchBpom = ref(null)

const form = ref({
  'kd_obat': null,
  'nama': null, // nama obat dari bpom
  'nama_obat': '', // nama sambung
  'barcode': '',
  'merk': '',
  'kandungan': '',
  'jenis_perbekalan': '',
  'bentuk_sediaan': '',

  'kode108': '',
  'uraian108': '',
  'kode50': '',
  'uraian50': '',

  'satuan_b': '',
  'satuan_k': '',

  'kelompok_psikotropika': '',
  'kelompok_rko': '',
  'status_generik': '',
  'status_forkid': '',
  'status_fornas': '',
  'status_kronis': '',
  'status_prb': '',
  'status_konsinyasi': '',
  'keterangan_kronis': '',
  'kekuatan_dosis': '',
  'volumesediaan': '',
  'kelas_terapi': '',
  'obat_program': '',
  'obat_donasi': '',
  'obat_kebijakan': '',
  'sistembayar': '',
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

const handleSelectBpom = (item) => {
  // console.log('select bpom', item);

  // "PRODUCT_NAME" ke "Nama Barang", PRODUCT_ATC ke "barcode",
  // "PRODUCT_PACKAGE": Dimapping ke "SATUAN BESAR", "SATUAN KECIL", "VOLUME SEDIAAN"
  // "PRODUCT_FORM" dimapping ke table "BENTUK SEDIAAN", 
  // "INGREDIENTS" ke "KANDUNGAN"

  const { satuan_besar, satuan_kecil, volume_sediaan } = parseProductPackage(item?.PRODUCT_PACKAGE)


  form.value.nama = item?.PRODUCT_NAME ?? ''
  form.value.barcode = item?.PRODUCT_ATC ?? ''
  form.value.satuan_b = satuan_besar
  form.value.satuan_k = satuan_kecil
  form.value.volumesediaan = volume_sediaan
  form.value.bentuk_sediaan = item?.PRODUCT_FORM ?? ''
  form.value.kandungan = item?.INGREDIENTS?.replace(/&lt;br&gt;/g, ', ') ?? ''

  // console.log('refSearch', searchBpom.value);

  searchBpom.value.reset()


}

function parseProductPackage(text) {
  const [besar, kecilVolume] = text.split(',').map(s => s.trim());

  const match = kecilVolume.match(/^(\d+)\s(.+)\s@\s(.+)$/);

  // if (!match) return null;

  return {
    satuan_besar: besar ?? null,
    satuan_kecil: match[2]?.trim() ?? null,
    volume_sediaan: match[3]?.trim() ?? null
  };
}

function sambungNamaObat() {
  // const jenisPerbekalan = !!(form.value.jenis_perbekalan === 'Reagen' || (form.value.jenis_perbekalan ? form.value.jenis_perbekalan.includes('Alkes') : false))
  // const nama = this.namaObat.nama ? this.namaObat.nama : ''
  // const merk = this.namaObat.merk && jenisPerbekalan ? ' ' + this.namaObat.merk : ''
  // const bentukSediaan = this.namaObat.bentukSediaan ? ' ' + this.namaObat.bentukSediaan : ''
  // const volumeSediaan = this.namaObat.volumeSediaan ? ' ' + this.namaObat.volumeSediaan : ''
  // const kekuatanDosis = this.namaObat.kekuatanDosis ? ' ' + this.namaObat.kekuatanDosis : ''
  // const namaObat = nama + kekuatanDosis + volumeSediaan + bentukSediaan + merk

  // form.value.nama_obat = namaObat


  const isPerbekalan = ['Reagen', 'Alkes', 'Alkes Lainnya'].some(jenis =>
    form.value.jenis_perbekalan?.includes(jenis)
  )

  const {
    nama = '',
    merk = '',
    bentuk_sediaan = '',
    volumesediaan = '',
    kekuatan_dosis = ''
  } = form.value

  const namaObat = [
    nama,
    kekuatan_dosis,
    volumesediaan,
    bentuk_sediaan,
    isPerbekalan ? merk : ''
  ].filter(Boolean).join(' ')

  form.value.nama_obat = namaObat

  // console.log('form nama obat', namaObat);

}


watchEffect(() => {
  sambungNamaObat()
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
  height: 90vh;
}
</style>
