<template>
  <q-card class="falt col full-height">
    <q-form @submit="onSubmit" ref="formInput" class="full-height">
      <div class="row q-pa-sm q-col-gutter-md">
        <div class="col q-gutter-y-md">
          <app-input-simrs v-model="store.formheader.nonotadinas" label="Nomer Nota Dinas" readonly outlined dense />
        </div>
        <div class="col q-gutter-y-md">
          <app-input-date-human label="Tanggal Nota Dinas" :model="store.params.tgl" icon="icon-mat-event" outlined
            :autofocus="false" :disable="store.disabled || store.loading || store.transrinci.length > 0"
            @db-model="tglTransaksi" :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
          <!-- <app-input-date :model="store.formheader.tgltrans" label="Tanggal Transaksi" icon="icon-mat-event" outlined
            @set-model="tglTransaksi" /> -->
        </div>

      </div>
      <div class="row q-pa-sm q-col-gutter-md">
        <div class="col-6">
          <q-select label="Pejabat Teknis Kegiatan" v-model="store.formheader.kodepptk" clearable
            class="ellipsis-2-lines allign-center" use-input outlined dense emit-value map-options
            autocomplete="namapptk" option-value="kodepptk" standout="bg-yellow-3" hide-bottom-space
            :disable="store.loading || store.disabled || store.transrinci.length > 0" :loading="store.loading"
            :option-label="opt => Object(opt) === opt && 'kodepptk' in opt ? opt.namapptk + ' - ' + opt.kodepptk : ''"
            input-debounce="300" :options="options" @filter="filterFn" @update:model-value="(val) => pilihPTK(val)">

            <template #no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Tidak ditemukan
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-6">
          <app-autocomplete label="Kegiatan BLUD" v-model="store.formheader.kegiatan" autocomplete="kegiatan" outlined
            option-label="kegiatan" option-value="kegiatan" :source="store.kegiatans"
            @selected="(val) => pilihKegiatan(val)" :key="store.formheader.kodepptk"
            :disable="store.disabled || store.loading || store.transrinci.length > 0" :loading="store.loading" />
        </div>
        <!-- <div class="col" v-if="store.formheader.kegiatan">
          <div class="row q-px-md justify-center">
            <app-btn rounded color="teal-8" :loading="store.loading" label="Pilih NPD-LS" :source="store.datanpd"
              @click="() => {
                store.openDialog = true
              }" />
          </div>
        </div> -->
      </div>

      <select-datanpd v-model="store.openDialog" />
    </q-form>
    <div v-if="store.formheader.kegiatan" class="q-px-sm">
      <q-card class="full-width bg-grey-4 q-my-sm q-px-sm">
        <div class="row text-primary q-pa-sm q-my-sm q-px-sm">
          <div class="f-14 text-weight-bold">
            Rincian Nota Dinas Belanja
          </div>
        </div>
      </q-card>
      <div class="row q-px-md justify-center">
        <app-btn rounded color="teal-8" :loading="store.loading" label="Tambah NPD-LS" :source="store.datanpd" @click="() => {
          store.datanpd = []
          store.openDialog = true
        }" />
      </div>
    </div>
    <FormRincian v-if="store.formheader.kegiatan || store.transrinci.length" />
  </q-card>
</template>

<script setup>
import { useFormNotadinasStore } from 'src/stores/siasik/transaksi/ls/notadinas/form';
import { watch } from 'vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import FormRincian from './FormRinci.vue'
import { listdataNotadinasStore } from 'src/stores/siasik/transaksi/ls/notadinas/list';

const SelectDatanpd = defineAsyncComponent(() => import('./DialogSelectnpd.vue'));
const store = useFormNotadinasStore()
const options = ref([])
const formInput = ref(null)

const list = listdataNotadinasStore()

watch(() => store.formheader.kodepptk, (newVal) => {
  // Perbarui options saat kodepptk berubah
  if (newVal && store.ptks?.length) {
    options.value = store.ptks;
  }
});


function onSubmit() {
  store.fixed = true
}

function tglTransaksi(val) {
  console.log('tglTransaksi', val)
  store.params.tgl = val
  store.formheader.tglnotadinas = val
  store.setParams('tgl', val)
  store.getDataBidang()

}


function pilihPTK(val) {
  const arr = store.ptks
  const obj = arr?.length ? arr.find(x => x.kodepptk === val) : null

  // const arrstp = stpekerjaan.bastpekerjaan?.length ? stpekerjaan.bastpekerjaan?.find(x => x.kodepptk === val) : null
  store.formheader.namapptk = obj?.namapptk ?? ''
  store.formheader.kodepptk = obj?.kodepptk ?? ''
  store.formheader.kodebidang = obj?.kodebidang ?? ''
  store.formheader.kodekegiatan = ''
  store.formheader.kegiatan = ''
  store.params.kodekegiatan = ''
  store.params.kodepptk = obj?.kodepptk ?? ''
  store.filterKegiatan()
}
function pilihKegiatan(val) {
  const arr = store.kegiatans

  const obj = arr?.length ? arr.find(x => x.kegiatan === val) : null
  // console.log('obj kegiatan', obj)
  store.formheader.kodekegiatan = obj?.kodekegiatan ?? ''
  store.formheader.kegiatan = obj?.kegiatan ?? ''
  store.formheader.kodebidang = obj?.kodebidang ?? ''
  store.formheader.bidang = obj?.bidang ?? ''
  store.formheader.kodepptk = obj?.kodepptk ?? ''
  store.formheader.namapptk = obj?.namapptk ?? ''

  store.params.kodekegiatan = obj?.kodekegiatan ?? ''
  store.params.kodepptk = obj?.kodepptk ?? ''
  store.getDataNpdls()
  store.openDialog = true

}

async function filterFn(val, update) {
  // console.log('val filter', val)
  if (!store.ptks || store.ptks?.length === 0) {
    // Jika data rekening kosong, muat ulang data
    await store.getDataBidang();
  }
  update(() => {
    if (val === '') {
      options.value = store.ptks;
    } else {
      const needle = val.toLowerCase();
      const filter = ['kodepptk', 'namapptk'];

      // Selalu filter dari data asal (store.ptks), bukan dari options yang sudah difilter
      const multiFilter = (data = [], filterKeys = [], value = '') =>
        data.filter((item) => filterKeys.some(
          (key) =>
            item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
            item[key]
        ));

      options.value = multiFilter(store.ptks, filter, needle);
    }
  });
}

</script>
