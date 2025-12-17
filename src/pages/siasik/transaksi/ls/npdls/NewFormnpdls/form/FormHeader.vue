<template>
  <q-card flat class="col full-height">
    <q-form @submit="onSubmit" ref="formNpdLS" class="full-height">
      <div class="row q-pa-sm q-col-gutter-md">
        <div class="q-gutter-y-md" style="width: 25%">
          <app-input-simrs label="Nomor NPD-LS" v-model="store.form.nonpdls" readonly :disable="store.disabled" outlined
            dense />
          <q-select label="Pejabat Teknis Kegiatan" v-model="store.form.kodepptk" clearable
            class="ellipsis-2-lines allign-center" use-input outlined dense emit-value map-options autocomplete="nama"
            option-value="nip" standout="bg-yellow-3" hide-bottom-space :disable="store.loading || store.disabled"
            :loading="store.loading"
            :option-label="opt => Object(opt) === opt && 'nip' in opt ? opt.nama + ' - ' + opt.nip : ''"
            input-debounce="0" :options="options" @filter="filterFn" @update:model-value="(val) => pilihPTK(val)">

            <template #no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Tidak ditemukan
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <!-- <app-autocomplete label="Pejabat Teknis Kegiatan" v-model="store.form.kodepptk" autocomplete="nama" outlined
            :option-label="opt => Object(opt) === opt && 'nip' in opt ? opt.nama + ' - ' + opt.nip : 'Silahkan Dipilih'"
            option-value="nip" :source="store.ptks" @selected="(val) => pilihPTK(val)" :disable="store.disabled"
            :loading="store.loading" /> -->
        </div>
        <div class="q-gutter-y-md" style="width: 25%">
          <app-input-date-human label="Tanggal Transaksi" :model="store.params.tgl" icon="icon-mat-event" outlined
            :autofocus="false" :disable="store.disabled" @db-model="tglTransaksi"
            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
          <app-autocomplete label="Kegiatan BLUD" v-model="store.form.kegiatanblud" autocomplete="kegiatan" outlined
            option-label="kegiatan" option-value="kegiatan" :source="store.kegiatans"
            @selected="(val) => pilihKegiatan(val)" :key="store.reqs.kodebidang"
            :disable="store.disabled || store.loading" :loading="store.loading" />
        </div>

        <div class="q-gutter-y-md" style="width: 50%">
          <app-autocomplete label="Pihak Ketiga" v-model="store.form.kodepenerima" autocomplete="nama"
            option-label="nama" option-value="kode" outlined :source="ambil.pihaktigas"
            @selected="(val) => pilihPihaktiga(val)" :disable="store.disabled || store.loading"
            :loading="store.loading" />

          <div class="row items-center">
            <div>
              Ada Serahterima ? :
              <q-radio class="q-pl-sm q-pr-lg" v-for="item in store.serahterimas" :key="item.value" :label="item.ket"
                v-model="store.form.serahterimapekerjaan" :val="item.value" dense size="sm" :disable="store.disabled" />
            </div>

            <template v-if="store.form.serahterimapekerjaan === '3'">
              <div>
                <app-autocomplete label="Serah Terima Dari" v-model="store.form.bast" autocomplete="nama"
                  option-value="nama" option-label="nama" outlined :disable="store.disabled"
                  :source="store.dariserahterima" @update:model-value="(val) => serahTerima(val)" />
              </div>
            </template>
          </div>
        </div>
        <app-input-simrs label="Keterangan Belanja" style="width: 50%" v-model="store.form.keterangan" outlined
          :autofocus="false" :valid="{ required: false }"
          :disable="store.loading || store.disabledx || store.transall.length > 0" />

        <template v-if="store.form.serahterimapekerjaan === '3'">
          <div class="row items-center" style="width: 50%;">
            <app-input-simrs label="Nomor Serahterima" class="q-gutter-y-md" style="width: 80%;"
              v-model="store.form.noserahterima" disable outlined :autofocus="false" :valid="{ required: false }" />

            <div class="q-px-md">
              <q-btn color="dark" round size="sm" :loading="store.loading" icon="icon-mat-add"
                :source="store.dariserahterima" @click="() => {
                  carisrt.reqs.kodebast = ''
                  store.openDialogFarmasi = true
                }" />
            </div>
          </div>
        </template>
        <app-input-simrs style="width: 50%;" v-model="store.form.biayatransfer" label="Biaya Administrasi" outlined
          :autofocus="false" :valid="{ required: true, number: true }" :disable="store.disabled" />
        <div v-if="store.form?.bast === 'Siasik' && store.transall.length > 0" class="row items-center q-gutter-y-md">
          <app-btn label="Tambah Pajak" class="bg-orange-8" :disable="store.loading" :loading="store.loading"
            @click="tambahPajak()" />
        </div>

      </div>
      <select-serahterima v-model="store.openDialogFarmasi" :key="carisrt.reqs.kodepenerima" />
      <select-serahterimapekerjaan v-model="store.openDialogSiasik" />
      <div class="q-px-sm">
        <q-card class="full-width bg-grey-4 q-my-sm q-px-sm">
          <div class="row text-primary q-pa-sm q-my-sm q-px-sm">
            <div class="f-14 text-weight-bold">
              Rincian NPD-LS
            </div>
          </div>
        </q-card>
      </div>
    </q-form>
    <FormRincianNpdls v-if="store.form?.bast !== 'Siasik'" />
    <form-input-pajak v-model="store.openDialogPajak" />
  </q-card>
</template>
<script setup>
import { formKontrakPekerjaan } from 'src/stores/siasik/transaksi/ls/kontrak/formkontrak';
import { dataBastFarmasiStore } from 'src/stores/siasik/transaksi/ls/newnpdls/bastfarmasi';
import { formInputNpdlsStore } from 'src/stores/siasik/transaksi/ls/newnpdls/formnpdls';
import { defineAsyncComponent, ref, watch } from 'vue';
import FormRincianNpdls from './FormRincian.vue'
import { dataBastPekerjaanStore } from 'src/stores/siasik/transaksi/ls/newnpdls/bastpekerjaan';
import { formInputPajakStore } from 'src/stores/siasik/transaksi/ls/newnpdls/formpajak';

const FormInputPajak = defineAsyncComponent(() => import('./formpajak/FormPajak.vue'))
const SelectSerahterima = defineAsyncComponent(() => import('./selectbast/SelectBastFarmasi.vue'))
const SelectSerahterimapekerjaan = defineAsyncComponent(() => import('./selectbast/SelectBastPekerjaan.vue'))
const store = formInputNpdlsStore()
const ambil = formKontrakPekerjaan()
const carisrt = dataBastFarmasiStore()
const stpekerjaan = dataBastPekerjaanStore()
const formNpdLS = ref(null)
const options = ref([])

const pjk = formInputPajakStore()
watch(() => store.form.kodepptk, (newVal) => {
  // Perbarui options saat kodepptk berubah
  if (newVal && store.ptks?.length) {
    options.value = store.ptks;
  }
});

function onSubmit() {
  store.fixed = true
}
function tglTransaksi(val) {
  // console.log('val Parameter', val)
  store.reqs.tgl = val
  store.form.tglnpdls = val
  carisrt.reqs.tgl = val
  store.setParams('tgl', val)
  store.getRincianBelanja()
  store.getDataBidang()
  carisrt.getDataBast()
  stpekerjaan.listBastPekerjaan()
}
const serahTerima = (val) => {
  // console.log('serahTerima', store.form.bast)
  if (val === 'Sigarang') {
    store.openDialogSigarang = false
  }
  else if (val === 'Farmasi') {
    store.openDialogFarmasi = true
    carisrt.reqs.kodebast = ''
    // carisrt.selectbastFarmasi()
  }
  else if (val === 'Siasik') {
    store.openDialogSiasik = true
  }
}
function pilihPTK(val) {
  const arr = store.ptks
  const obj = arr?.length ? arr.find(x => x.nip === val) : null

  // const arrstp = stpekerjaan.bastpekerjaan?.length ? stpekerjaan.bastpekerjaan?.find(x => x.kodepptk === val) : null
  store.form.pptk = obj?.nama ?? ''
  store.form.kodepptk = obj?.nip ?? ''
  store.form.kodebidang = obj?.kodeBagian ?? ''
  store.reqs.kodebidang = obj?.kodeBagian ?? ''

  // mengkosongkan form rinci setelah milih ulang PTK
  store.rinci.koderek50 = ''
  store.rinci.koderek108 = ''
  store.rinci.itembelanja = ''
  store.rinci.volume = ''
  store.rinci.satuan = ''
  store.rinci.harga = ''
  store.rinci.total = ''
  store.rinci.volumels = ''
  store.rinci.hargals = ''
  store.rinci.totalls = ''
  store.rinci.nominalpembayaran = ''
  // mengkosongkan form Kegiatan setelah milih ulang PTK
  store.form.kodekegiatanblud = ''
  store.form.kegiatanblud = ''
  store.form.bidang = obj?.bagian ?? ''

  // filter kegiatan berdasarkan nip
  store.reqs.nip = obj?.nip ?? ''
  store.filterKegiatan()
}
function pilihKegiatan(val) {
  const arr = store.kegiatans
  const obj = arr?.length ? arr.find(x => x.kegiatan === val) : null
  store.form.kegiatanblud = obj?.kegiatan ?? ''
  store.form.kodekegiatanblud = obj?.kodekegiatan ?? ''
  // Mengosongkan Rincian Belanja setelah milih ulang kegiatan
  store.rinci.koderek50 = ''
  store.rinci.koderek108 = ''
  store.rinci.itembelanja = ''
  store.rinci.volume = ''
  store.rinci.satuan = ''
  store.rinci.harga = ''
  store.rinci.total = ''
  store.rinci.volumels = ''
  store.rinci.hargals = ''
  store.rinci.totalls = ''
  store.rinci.nominalpembayaran = ''

  carisrt.reqs.kodekegiatanblud = obj?.kodekegiatan
  stpekerjaan.reqs.kodekegiatanblud = obj?.kodekegiatan ?? ''
  store.reqs.kodekegiatan = obj?.kodekegiatan
  store.getRincianBelanja()
}
function pilihPihaktiga(val) {

  const arr = ambil.pihaktigas
  let obj = arr?.length ? arr.find(x => x.kode === val) : null

  store.form.penerima = obj?.nama ?? ''
  store.form.kodepenerima = obj?.kode ?? ''
  carisrt.reqs.kodepenerima = obj?.kode ?? ''
  stpekerjaan.reqs.kodepenerima = obj?.kode ?? ''
  store.form.serahterimapekerjaan = '2'
  carisrt.reqs.kodebast = '1'
  store.form.bast = '-'
  store.form.bank = obj?.bank ?? ''
  store.form.rekening = obj?.norek ?? ''
  store.form.npwp = obj?.npwp ?? ''
  // console.log('store.form.penerima', store.form.penerima)
  carisrt.bastfarmasis = []
  carisrt.konsinyasis = []
  carisrt.itembelanja = []
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
      const filter = ['nip', 'nama'];

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

function tambahPajak() {
  // console.log('open Dialog')
  store.openDialogPajak = true
  pjk.form.nonpdls = store.form.nonpdls
  pjk.reqs.nonpdls = store.form.nonpdls
  pjk.getListpajak()
  console.log('nonpdls pajak', pjk.form.nonpdls)
}
</script>
