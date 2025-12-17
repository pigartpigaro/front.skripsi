<template>
  <q-toolbar>
    <q-btn flat dense icon="icon-mat-sort" @click="emits('toggleLeftDrawer')" />
    <q-toolbar-title class="f-14">
      <div class="row items-center q-gutter-md">
        <div class="col-3">
          <q-btn color="primary" class="q-pl-xs" flat>
            <div class="row items-center no-wrap q-gutter-sm text-white">
              <q-avatar size="30px">
                <img :src="getImageDokter(pasien?.datasimpeg?.kelamin, pasien?.datasimpeg)">
              </q-avatar>
              <div class="column f-12">
                <div>
                  DPJP | {{ pasien?.datasimpeg?.nama }}
                </div>
              </div>
            </div>
          </q-btn>
        </div>
        <q-separator vertical color="orange" class="q-ml-sm" />
        <div class="col-3">
          <q-btn color="primary" class="q-pl-xs" flat>
            <div class="row items-center no-wrap q-gutter-sm text-white">
              <div class="column f-12">
                <div>
                  <q-badge color="lime-12" text-color="dark" class="text-bold">
                    Sistem Bayar : {{ pasien?.sistembayar }}
                  </q-badge>
                </div>
              </div>
            </div>
          </q-btn>
        </div>
      </div>
    </q-toolbar-title>
    <!-- <div v-if="pasien?.dokter !== ''">
      <q-btn v-if="pasien?.flagpelayanan === '' || pasien?.flagpelayanan === '2'" label="selesaikan layanan"
        color="negative" class="q-mr-lg q-px-lg" dense :loading="loadingFinish" :disable="loadingFinish"
        @click="selesaikanLayanan" />
      <q-btn v-else-if="pasien?.status === '3'" label="LAYANAN TELAH BATAL" color="negative" class="q-mr-lg q-px-lg"
        dense />
      <q-btn v-else label="SUDAH DILAYANI" color="white" class="q-mr-lg q-px-lg" dense outline disable />
    </div> -->
    <q-btn v-close-popup dense flat icon="icon-mat-close" :disable="store.loading || store.loadingObat">
      <q-tooltip class="bg-white text-primary">
        Close
      </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { usePengunjungIgdStore } from 'src/stores/simrs/igd/pengunjung'

const store = usePermintaanEResepStore()
const storePengunjung = usePengunjungIgdStore()

const emits = defineEmits(['toggleLeftDrawer', 'gantidpjp', 'layananSelesai'])

const search = ref('')
const kodedpjp = ref(null)
const kdpegsimrs = ref(null)
const options = ref([])
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingSaveDpjp: {
    type: Boolean,
    default: false
  },
  loadingFinish: {
    type: Boolean,
    default: false
  }
})

function updateKodeDpjp(val) {
  // console.log(props?.pasien?.groups)
  kodedpjp.value = val?.kddpjp ?? ''
  kdpegsimrs.value = val?.kdpegsimrs
}

function caririnci(val) {
  console.log('val', val)
  storePengunjung.form.kodesistembayar = []
  const allsistembayar = storePengunjung?.sistembayarrinci
  storePengunjung.sistembayarhasil = allsistembayar.filter(ft => ft.groups === val?.kode)
  //  console.log('xxxxxxxxxxxxxx', storePengunjung.sistembayarhasil)
}

function selectsistembayar(val) {
  console.log('val', val)
  storePengunjung.form.kodesistembayar = val?.kode
  storePengunjung.form.namasistembayar = val?.sistembayar
}

function gantiDpjp() {
  // console.log('ok')
  const form = {
    kodedpjp: kodedpjp.value ?? '',
    kdpegsimrs: kdpegsimrs.value,
    noreg: props?.pasien?.noreg
  }

  emits('gantidpjp', form)
}

function getImage(kelamin, row) {
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined) {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}
function getImageDokter(kelamin, row) {
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined || row.kddpjp === null) {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}

async function filterOptions(val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }
  const params = {
    params: {
      q: val
    }
  }
  // console.log('q :', val)
  const resp = await api.get('/v1/settings/appmenu/cari_dokter', params)
  console.log('cari', resp)
  update(
    () => (options.value = resp.data),
    ref => {
      if (val !== '' && ref.options?.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}

function selesaikanLayanan() {
  // console.log('ok')
  emits('layananSelesai')
}

function gantiSistemBayar() {
  storePengunjung.gantiSistemBayar(props.pasien)
}
</script>
