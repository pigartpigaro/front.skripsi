<template>
  <q-form ref="formRef" @submit="simpan()">
    <div class="row q-col-gutter-sm">
      <div class="col-3">
        <q-input v-model="store.formPrb.norm" label="NORM (Automatis)" dense outlined standout="bg-yellow-3" readonly
          :rules="[val => !!val || 'Harus diisi']" hide-bottom-space />
      </div>
      <div class="col-3">
        <q-input v-model="store.formPrb.noka" label="NOKA (Automatis)" dense outlined standout="bg-yellow-3" readonly />
      </div>
      <div class="col-6">
        <q-input v-model="store.formPrb.nosep" label="SEP (Automatis)" dense outlined standout="bg-yellow-3" readonly />
      </div>
      <div class="col-12">
        <q-input v-model="store.formPrb.alamat" label="Alamat" dense outlined standout="bg-yellow-3" />
      </div>
      <div class="col-6">
        <q-input v-model="store.formPrb.email" label="Email" dense outlined standout="bg-yellow-3" />
      </div>
      <div class="col-6">
        <q-select ref="refDiagnosa" v-model="store.formPrb.diagnosa" use-input hide-selected fill-input outlined
          hide-bottom-space standout="bg-yellow-3" dense emit-value map-options option-value="kode"
          :option-label="opt => Object(opt) === opt && 'nama' in opt ? opt.kode + ' ~ ' + opt.nama : ' Cari Diagnosa '"
          input-debounce="0" :options="optionDiagnosa" label="Cari Diagnosa PRB" @filter="onFilterDiagnosa"
          :rules="[val => !!val || 'Harus diisi']">
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <!-- <q-select v-model="store.formPrb.diagnosa" label="Diagnosa PRB" dense outlined standout="bg-yellow-3" use-input
          input-debounce="500" :options="optionDiagnosa" map-options emit-value hide-selected /> -->
      </div>
      <div class="col-12">
        <q-input ref="refKet" v-model="store.formPrb.keterangan" label="Keterangan" dense outlined hide-bottom-space
          :rules="[val => val?.length > 5 || 'Minimal 5 karakter']" standout="bg-yellow-3" />
      </div>
      <div class="col-12">
        <q-input ref="refSaran" v-model="store.formPrb.saran" label="Saran" dense outlined hide-bottom-space
          :rules="[val => val?.length > 5 || 'Minimal 5 karakter']" standout="bg-yellow-3" />
      </div>
      <div class="col-12">
        <q-separator class=" q-my-md" />
        <div class="row text-weight-bold f-14 q-py-sm items-center">Resep PRB</div>
        <div v-if="filterObatPrb?.length > 0">
          <div v-for="(item, i) in filterObatPrb" :key="i">
            <div class="row cursor-pointer items-center" :class="setBg(i, item)" @click="bukaRincian(item)">
              <div class="col-3">{{ item?.noresep }}</div>
              <div class="col-3"><q-chip :color="colorFlag(item?.flag)" text-color="white" dense>
                  {{ labelFlag(item?.flag) }}
                </q-chip></div>
              <div class="col-5">{{ ketBg?.length > 0 ? '' : 'Ada Obat belum termaping di BPJS' }}</div>
            </div>
          </div>
        </div>
        <div v-if="filterObatPrb?.length <= 0">Tidak ada obat PRB</div>
      </div>

      <div class="col-12">
        <q-separator class=" q-my-md" />
        <div class="text-right q-gutter-sm">
          <q-btn label="Simpan" color="primary" type="submit" :loading="store.loadingSave"
            :disable="store.loadingSave" />
        </div>
      </div>
    </div>
  </q-form>
  <RincianObatPrbPage v-model="ricianOpen" :resep="resep" @close="ricianOpen = false" />
</template>

<script setup>
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar, date, Dialog } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
// const masterPasien = ref(null)
const store = usePerencanaanPoliStore()
const $q = useQuasar()

const RincianObatPrbPage = defineAsyncComponent(() => import('./RincianObatPrbPage.vue'))

const refSaran = ref(null)
const refKet = ref(null)
const refDiagnosa = ref(null)
const resep = ref(null)

const ricianOpen = ref(false)
function bukaRincian (val) {

  ricianOpen.value = true
  resep.value = val
  console.log('bukaRincian', resep.value)
}
const ketBg = ref([])
function setBg (val, item) {
  const i = val % 2
  ketBg.value = item?.permintaanresep?.map(m => m?.mobat)?.filter(f => !!f?.kode_bpjs)
  // console.log('item', ketBg.value)

  return ketBg.value?.length <= 0 ? 'bg-red-3' : (i === 0 ? 'bg-grey-4' : '')
}
async function getMasterPasien () {
  const param = {
    params: {
      q: props.pasien?.norm
    }
  }
  await api.get('v1/simrs/master/pasien-by-norm', param).then(response => {
    // console.log('response', response?.data)
    const masterPasien = response?.data?.find(f => f.norm === props.pasien?.norm)
    // console.log('master pasien', masterPasien)
    if (masterPasien) {

      store.formPrb.alamat = masterPasien?.alamat + ', ' + masterPasien?.kelurahan + ', ' + masterPasien?.kecamatan + ', ' + masterPasien?.kabupatenkota
    }
  })
}
const optionDiagnosa = ref([])
const filterObatPrb = computed(() => {
  const obat = props.pasien?.newapotekrajal?.filter(ob => ob?.tiperesep === 'prb')

  return obat
})
// const filterObatPrbBelum = computed(() => {
//   console.log(props.pasien?.newapotekrajal)
//   const obat = props.pasien?.newapotekrajal?.filter(ob => ob?.tiperesep === 'prb' && ob?.flag?.includes('3', '4'))
//   return obat
// })

function labelFlag (flag) {
  let hasil = ''
  switch (flag) {
    case '':
      hasil = 'Draft'
      break
    case '1':
      hasil = 'Dikirm ke Apotik'
      break
    case '2':
      hasil = 'Sedang Dikerjakan'
      break
    case '3':
      hasil = 'Selesai'
      break
    case '4':
      hasil = 'Ada Pengembalian'
      break
    case '5':
      hasil = 'Ditolak'
      break

    default:
      hasil = 'belum di definisikan'
      break
  }
  return hasil
}
function colorFlag (flag) {
  let hasil = ''
  switch (flag) {
    case '':
      hasil = 'negative'
      break
    case '1':
      hasil = 'grey'
      break
    case '2':
      hasil = 'orange'
      break
    case '3':
      hasil = 'green'
      break
    case '4':
      hasil = 'purple'
      break
    case '5':
      hasil = 'negative'
      break

    default:
      hasil = 'red'
      break
  }
  return hasil
}

const onFilterDiagnosa = async (val, update, abort) => {
  // if (val?.length < 1) {
  //   abort()
  //   return
  // }

  update(() => {
    const needle = val.toLowerCase()
    // const arr = store.listDiagnosa
    const arr = [...store.diagPrbs]
    const filter = ['kode', 'nama']
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) => filterKeys.some(
        (key) =>
          item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
          item[key]
      )
      )
    const filteredData = multiFilter(arr, filter, needle)
    optionDiagnosa.value = filteredData
  })
}

onMounted(() => {
  store.initPasien(props.pasien)
  store.getDiagPrb()
  getMasterPasien()
  // const form = { noka: props?.pasien?.noka, tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD') }
  // store.cekPesertaByNoka(form).then(resp => {
  //   const opt = {
  //     kode: resp?.peserta?.provUmum?.kdProvider,
  //     nama: resp?.peserta?.provUmum?.nmProvider
  //   }
  //   optionsRs.value.push(opt)
  //   store.formPrb.ppkdirujuk = resp?.peserta?.provUmum?.kdProvider
  //   store.formPrb.ppkdirujukx = resp?.peserta?.provUmum?.nmProvider
  //   const poli = {
  //     nama: props?.pasien?.polibpjs,
  //     kode: props?.pasien?.kodepolibpjs
  //   }
  //   optionsPoli.value.push(poli)
  //   store.formPrb.polirujukan = props?.pasien?.kodepolibpjs
  //   store.formPrb.namapolirujukan = props?.pasien?.polibpjs
  //   // console.log('um', poli)
  // })
})

function validasi () {
  // console.log('refKet.value', refDiagnosa.value)

  const diag = refDiagnosa.value.validate()
  const ket = refKet.value.validate()
  const saran = refSaran.value.validate()
  if (ket && saran && diag) return true
  else return false

}
function mapingObat () {
  // "kdObat":"00196120124",
  // "signa1":"1",
  // "signa2":"1",
  // "jmlObat":"11"
  const obats = []
  const reseps = []
  filterObatPrb.value.forEach((resep) => {
    resep?.permintaanresep?.forEach((item) => {
      reseps.push(item)

    })
  })
  console.log('reseps', reseps)
  reseps?.forEach(item => {
    const obat = {
      'kdObat': item?.mobat?.kode_bpjs,
      'jmlObat': item?.jumlah,
      'signa1': '',
      'signa2': '',
    }
    const signas = item?.aturan?.split('x')

    if (signas?.length === 2) {
      obat.signa1 = signas[0]?.trim()
      obat.signa2 = signas[1]?.trim()
    } else if (signas?.length === 1) {
      obat.signa1 = signas[0]?.trim()
    }
    obats.push(obat)
    // console.log('signas', signas, signas?.length)
  })
  store.formPrb.obat = obats
  console.log('obat', obats)


}
function simpan () {
  console.log('ok', store.formPrb)
  if (!validasi()) return notifErrVue('Data belum lengkap')
  if (filterObatPrb.value?.length <= 0) return notifErrVue('Maaf, Obat PRB belum dibuat')
  mapingObat()

  store.saveRujukBalik(props?.pasien)

  // if (props?.pasien?.groups === '1') {
  //   // if (filterObatPrbBelum.value?.length <= 0) {
  //   //   Dialog.create({
  //   //     title: 'Konfirmasi',
  //   //     message: 'Obat belum selesai, apakah akan dilanjutkan?',
  //   //     ok: true,
  //   //     cancel: true
  //   //   })
  //   // }
  //   // maping data resep sesuai dengan apa kode bpjs
  //   // store.saveRujukBalik(props?.pasien)
  // } else {
  //   $q.notify({
  //     type: 'negative',
  //     message: 'Maaf, Anda tidak terhubung ke BPJS',
  //     position: 'top-right',
  //     color: 'negative'
  //   })
  // }
}
</script>
