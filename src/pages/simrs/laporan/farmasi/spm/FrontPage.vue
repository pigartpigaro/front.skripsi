<template>
  <div class="bg-white q-pa-xs">
    <div ref="refTop" class="fixed-top bg-white" style="margin-top:50px; margin-left: 60px; z-index: 10">
      <div class="row bg-primary text-white q-pa-sm q-mb-sm print-hide justify-between items-center">
        <div class="f-14 text-weight-bold">
          Laporan SPM Farmasi
        </div>
        <div class="">
          <div class="row q-col-gutter-x-sm">
            <app-autocomplete v-if="store.jenisLaporan == 'Response Time' && store.params.response_time == 'Floor Stok'"
              v-model="store.tujuanMinta" label="Pilih Tujuan Permintaan" autocomplete="nama" option-label="nama"
              option-value="value" outlined :source="store.optionTujuanMinta" :disable="store.loading" bg-color="white"
              @update:model-value="() => {
                store.filterAndSetItemRespons()

              }" hide-dropdown-icon />
            <app-autocomplete v-if="store.jenisLaporan == 'Response Time'" v-model="store.params.response_time"
              label="Pilih Response Time" autocomplete="nama" option-label="nama" option-value="value" outlined
              :source="store.optionResTipeObats" :disable="store.loading" bg-color="white"
              @update:model-value="store.setParamsResponseTime" hide-dropdown-icon />
            <app-autocomplete v-model="store.jenisLaporan" label="Pilih Laporan" autocomplete="nama" option-label="nama"
              option-value="value" outlined :source="store.optionJenisLaporans" :disable="store.loading"
              bg-color="white" @update:model-value="setJenisLaporan" hide-dropdown-icon />



          </div>
        </div>
      </div>

      <div class="row justify-between print-hide ">
        <div class="col-10">
          <div class="row q-col-gutter-sm q-my-sm wrap">
            <div class="col-2">
              <app-input v-model="store.params.q" label="Cari obat" outlined valid :loading="store.loading"
                @keyup.enter="store.setSearch" />
            </div>
            <div class="col-auto" style="max-width: 12%;">
              <app-autocomplete v-model="store.tipe" label="Pilih tipe laporan" autocomplete="nama" option-label="nama"
                option-value="value" outlined :source="store.optionTipes" :loading="store.loading" hide-dropdown-icon
                @update:model-value="setTipe" />
            </div>
            <div class="col-auto" style="max-width: 12%;">
              <app-autocomplete v-model="store.params.bulan" label="Pilih Bulan" autocomplete="nama" option-label="nama"
                option-value="value" outlined :source="store.bulans" :loading="store.loading" hide-dropdown-icon />
            </div>
            <div class="col-1">
              <app-input v-model="store.params.tahun" label="Tahun" outlined :loading="store.loading" />
            </div>
            <div class="col-2">
              <app-autocomplete v-model="store.params.depo" label="Pilih Depo" autocomplete="nama" option-label="nama"
                option-value="value" multiple outlined :source="store.depos" :hide-selected="false" hide-dropdown-icon
                :disable="store.loading" />
            </div>
            <div v-if="store.jenisLaporan == 'Response Time' && store.params.response_time != 'Floor Stok'"
              class="col-2">
              <app-autocomplete v-model="store.tipeObat" label="Pilih Tipe Obat" autocomplete="nama" option-label="nama"
                option-value="value" outlined :source="store.optionTipeObats" hide-selected hide-dropdown-icon
                :disable="store.loading" @update:model-value="store.filterAndSetItemRespons()" />
            </div>
            <div v-if="store.jenisLaporan == 'Generik'" class="col-2">
              <app-autocomplete v-model="store.params.kelompok" label="Pilih Kelompok Obat" autocomplete="nama"
                option-label="nama" option-value="kode" outlined :source="store.optionKelompoks" hide-dropdown-icon
                :disable="store.loading" @update:model-value="store.filterAndSetItems()" />
            </div>

            <div v-if="store.jenisLaporan == 'Response Time' ? store.params.response_time != 'Floor Stok' : store.jenisLaporan !=
              'Kesesuaian Obat'" class="col-2">
              <app-autocomplete v-model="store.groupSistembayar" label="Pilih sistem bayar" autocomplete="nama"
                option-label="nama" option-value="kode" outlined multiple :source="store.optionSistemBayars"
                :hide-selected="false" hide-dropdown-icon :disable="store.loading" @update:model-value="setSitermbayar"
                valid />
            </div>

            <!-- ini filter rinci generik -->
            <div v-if="store.jenisLaporan == 'Generik' && store.tipe == 'Rinci'" class="col-auto"
              style="max-width: 12%;">
              <app-autocomplete v-model="store.params.generik" label="Pilih Kategori Generik" autocomplete="nama"
                option-label="nama" option-value="value" outlined :source="store.optionGeneriks"
                :loading="store.loading" hide-dropdown-icon @update:model-value="setFormularium" />
            </div>
            <div v-if="store.jenisLaporan == 'Generik' && store.tipe == 'Rinci'" class="col-auto"
              style="max-width: 12%;">
              <app-autocomplete v-model="store.params.formularium" label="Pilih Formularium" autocomplete="nama"
                option-label="nama" option-value="value" outlined :source="store.optionFormulariums"
                :loading="store.loading" hide-dropdown-icon @update:model-value="setFormularium" />
            </div>
          </div>
        </div>
        <div class="col-2 text-right">
          <div class="row items-center justify-end q-mr-md">
            <app-btn label="Ambil Data" :disable="store.loading" :loading="store.loading" @click="store.getDataTable" />
            <q-btn ref="refPrint" v-print="printObj" class="q-mx-xs" unelevated color="dark" round size="sm"
              icon="icon-mat-print">
              <q-tooltip class="primary" :offset="[10, 10]">
                Print
              </q-tooltip>
            </q-btn>
            <div class="q-ml-xs">
              <download-excel class="btn" :fields="store.fields" :fetch="store.fetch"
                :before-generate="store.startDownload" :before-finish="store.finishDownload"
                :name="'Laporan SPM ' + store.jenisLaporan + ' ' + (store.jenisLaporan == 'Response Time' ?
                  store.tujuanMinta + ' ' + store.params.response_time + ' ' : '') + ' Bulan ' + bulan() + ' ' + store.params.tahun + '(' + store.tipe + ').xls'">
                <q-btn color="green" round size="sm" icon="icon-mat-download" push :loading="store.loadingDownload"
                  :disable="store.loadingDownload || !!store.ketProses || store?.loadingNext">
                  <q-tooltip>Download Excel</q-tooltip>
                </q-btn>
              </download-excel>
            </div>
          </div>
        </div>
      </div>
      <div v-if="store.ketProses" class="row items-center justify-evenly print-hide q-mx-xl">
        <!-- <div  class="row items-center justify-center print-hide"> -->

        <div class="col-shrink">
          <div class="row justify-between items-center">
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="2em" />
            </div>
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="3em" />
            </div>
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="4em" />
            </div>
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="3em" />
            </div>
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="2em" />
            </div>
          </div>
        </div>
        <div class="col-shrink q-ml-sm text-weight-bold f-18 text-center">
          <p>
            {{ store.ketProses }}
            <span v-if="store?.meta" class="q-mx-sm f-20 text-blue">{{ store.progress ?
              store.progress : 1 }}</span>
            <span v-if="store?.meta" class="q-mx-sm">dari</span>
            <span v-if="store?.meta" class="q-mx-sm f-20 text-orange">{{ store.meta?.last_page ?? 1 }}</span>
            <span v-if="store?.meta" class="q-mx-sm">halaman</span>
          </p>
        </div>
        <div class="col-shrink">
          <div class="row justify-between items-center">
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="2em" />
            </div>
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="3em" />
            </div>
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="4em" />
            </div>
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="3em" />
            </div>
            <div class="col-shrink">
              <q-spinner-pie color="orange" size="2em" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :style="`margin-top:${h + 5}px;`" />

    <div id="printMe">
      <div class="row items-center garis-bawah">
        <div class="col-2">
          <q-img src="~assets/images/logo-kota-grey.png" spinner-color="white"
            style="height: 3.56cm; max-width: 2.86cm" />
        </div>
        <div class="col-8">
          <div class="row justify-center f-18">
            PEMERINTAH KOTA PROBOLINGGO
          </div>
          <div class="row justify-center f-12 text-weight-bold">
            DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
          </div>
          <div class="row justify-center f-20 text-weight-bold">
            UOBK RSUD DOKTER MOHAMAD SALEH
          </div>
          <div class="row justify-center f-14">
            Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
          </div>
          <div class="row justify-center f-14">
            E-mail : rsudprob@probolinggokota.go.id
          </div>
          <div class="row justify-center f-14 text-weight-bold">
            PROBOLINGGO 67219
          </div>
        </div>
        <div class="col-2">
          <q-img src="~assets/logos/logo-rsud.png" spinner-color="white" style="height: 3cm; max-width: 3cm" />
        </div>
      </div>

      <div class="row justify-center f-16 text-weight-bold q-my-sm">
        Laporan {{ store.tipe + ' ' + store.jenisLaporan + ' ' + (store.jenisLaporan == 'Response Time' ?
          store.tujuanMinta + ' ' + store.params.response_time + ' ' : '') }} {{
          date.formatDate((store.params.tahun + '-' + store.params.bulan + '-02'), 'MMMM YYYY') }}
      </div>

      <div class="q-pa-sm">
        <component ref="refTable" :is="menu.comp" :h="h" :bottom="menu.bottom" :depo="store.params?.depo" />
      </div>

      <div class="q-mt-md">
        <div class="q-my-md">
          <div class="row q-mb-md">
            <div class="col-4" />
            <div class="col-4" />
            <div class="col-4">
              <div class="text-center f-10">
                {{ pojokKananAtas }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                {{ kiriAtasSatu }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ tengahAtasSatu }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ kananAtasSatu }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                {{ kiriAtasDua }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ tengahAtasDua }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ kananAtasDua }}
              </div>
            </div>
          </div>
          <div class="row q-mt-xl text-weight-bold">
            <div class="col-4">
              <div class="text-center f-10">
                {{ kiriBawahSatu }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ tengahBawahSatu }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ kananBawahSatu }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                {{ kiriBawahDua }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ tengahBawahDua }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ kananBawahDua }}
              </div>
            </div>
          </div>
        </div>
        <div class="q-my-md print-hide">
          <div class="row ">
            <div class="col-4" />
            <div class="col-4" />
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="pojokKananAtas" label="tanggal" valid outlined />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="kiriAtasSatu" label="kiri atas satu" valid outlined />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="tengahAtasSatu" label="tengah atas satu" valid outlined />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="kananAtasSatu" label="kanan atas satu" valid outlined />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="kiriAtasDua" label="kiri atas dua" valid outlined />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="tengahAtasDua" label="tengah atas dua" valid outlined />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="kananAtasDua" label="kanan atas dua" valid outlined />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="kiriBawahSatu" label="kiri bawah satu" valid outlined />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="tengahBawahSatu" label="tengah bawah satu" valid outlined />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="kananBawahSatu" label="kanan bawah satu" valid outlined />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="kiriBawahDua" label="kiri bawah dua" valid outlined />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="tengahBawahDua" label="tengah bawah dua" valid outlined />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input v-model="kananBawahDua" label="kanan bawah dua" valid outlined />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- End id print me -->
    </div>

  </div>
</template>
<script setup>
import { date } from 'quasar'
import depo from 'src/router/depo'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useLaporanSpmFarmasiStore } from 'src/stores/simrs/laporan/farmasi/spm/spm'
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'

const store = useLaporanSpmFarmasiStore()
const apps = useAplikasiStore()

const refTop = ref(null)
const refTable = ref(null)
const h = ref(0)
onMounted(() => {
  store.getOptionKelompok()
  store.getOptionSistemBayar()
  console.log('h', refTop.value?.clientHeight)
  h.value = refTop.value?.clientHeight
})
function bulan () {
  const bul = store.bulans.find(a => a.value === store.params.bulan)
  return bul?.nama ?? '-'
}
// function jenis () {
//   const bul = store.optionTipes.find(a => a === store.tipe)
//   return ' (' + bul + ')' ?? '-'
// }
// function laporan () {
//   const bul = store.optionJenisLaporans.find(a => a === store.jenisLaporan)
//   return ' (' + bul + ')' ?? '-'
// }
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan SPM Farmasi'

}


// ganti Menu
const menus = ref([
  {
    name: 'Generik',
    bottom: 164,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/TabelGenerik.vue')))
  },
  {
    name: 'Response Time',
    bottom: 145,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/TabelResponsTime.vue')))
  },
  {
    name: 'Kesesuaian Obat',
    bottom: 145,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/TabelKesesuaian.vue')))
  },
])
const menu = ref(menus.value.find((item) => item.name === store.jenisLaporan) ?? menus.value[0])
store.url = store.urls.find((item) => item.nama === store.jenisLaporan)?.url ?? store.urls[0].url
function setJenisLaporan (val) {
  const component = menus.value.find((item) => item.name === val)
  if (component) {
    menu.value = component
  } else {
    menu.value = menus.value[0]
  }
  const url = store.urls.find((item) => item.nama === val)
  if (url) store.url = url.url
  console.log('val', val)
  if (val != 'Response Time') {
    if (store.params.response_time == 'Floor Stok') {
      store.params.response_time = 'Obat'
      store.tujuanMinta = 'Gudang'
    }
    store.setParams('depo', ['Gd-04010102', 'Gd-05010101', 'Gd-04010104'])
    store.depos = [
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
      { nama: 'Depo IGD', value: 'Gd-04010104' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
    ]
  }


}

// ganti sistem bayar
function setSitermbayar (val) {
  const sis = apps.sistemBayars.filter((item) => val.includes(item.groups))?.map((item) => item.kode)
  console.log('sis', sis)

  if (sis?.length > 0) {
    store.setParams('sistem_bayar', sis)
  }
  console.log('set sistem bayar', val, sis)
  // store.groupSistembayar = val

}

function setFormularium (val) {
  store.items = []
  const items = [...store.rawItems]
  store.items = items.filter((item) => {
    if (store.params.generik === 'Generik') {
      return item.status_generik == '1' || item.obat_program == '1'
    } else if (store.params.generik === 'Non Generik') {
      return item.status_generik != '1'
    } else {
      return item
    }
  }).filter(item => {
    if (store.params.formularium === 'Fornas') {
      return item.status_fornas == '1'
    } else if (store.params.formularium === 'Forkit') {
      return item.status_forkit == '1' && item.status_fornas != '1'
    } else {
      return item
    }
  })
  // console.log('items', items)

}

function setTipe (val) {
  if (store.jenisLaporan == 'Generik') {
    store.filterAndSetItems()
  } else if (store.jenisLaporan == 'Response Time') store.filterAndSetItemRespons()
  else store.filterAndSetItemKesesuaian()
  setTimeout(() => {
    console.log('set tipe', val, refTop.value?.clientHeight)
    h.value = refTop.value?.clientHeight
    refTable.value?.calculateOffset()
  }, 200)
}



// text tanda tangan start

const kiriAtasSatu = ref('')
const kiriAtasDua = ref('')
const kiriBawahSatu = ref('')
const kiriBawahDua = ref('')

const tengahAtasSatu = ref('')
const tengahAtasDua = ref('')
const tengahBawahSatu = ref('')
const tengahBawahDua = ref('')

const kananAtasSatu = ref('Kepala Instalasi Farmasi RSUD Dr. Mohamad Saleh')
const kananAtasDua = ref('Kota Probolinggo')
const kananBawahSatu = ref('Dra. Sri Purwanti, Apt')
const kananBawahDua = ref('NIP : 19660227 199203 2 003')

const pojokKananAtas = ref('Probolinggo, ' + date.formatDate(Date.now(), 'DD MMMM YYYY'))

// text tanda tangan end
</script>
