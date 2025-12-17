<template>
  <div class="justify-content-center full-width">
    <q-table style="height: 100%" :rows="store.dataserahterima" :columns="columnsserahterima" row-key="name" dense flat
      bordered wrap-cells :filter="store.params.q" :loading="store.loading" :rows-per-page-options="[10, 50, 100]">
      <template #loading>
        <q-inner-loading showing color="warning" />
      </template>
      <template #top-left>
        <div class="flex q-gutter-sm z-top">
          <div>
            <q-input v-model="store.params.q" outlined dense placeholder="Cari Serahterima ..." debounce="500"
              style="min-width: 300px">
              <template v-if="store.params.q" #append>
                <q-icon name="icon-mat-close" size="xs" class="cursor-pointer" @click.stop.prevent="clearSearch" />
              </template>
              <template #prepend>
                <q-icon size="sm" name="icon-mat-search" />
              </template>
            </q-input>
          </div>
          <div class="q-pl-sm">
            <q-input outlined dense label="Tahun" v-model="store.params.tahun"
              :disable="store.disabled && store.loading" :loading="store.loading" :autofocus="false"
              @update:model-value="(val) => {
                console.log('Tahun berapa?', val)
                store.params.tahun = val
                store.listdataserahterima()
              }" />
          </div>
        </div>
      </template>
      <template #body="props">
        <q-tr>
          <q-td key="noserahterimapekerjaan" :props="props">
            <div>
              {{ props.row.noserahterimapekerjaan }}
            </div>
            <div class="q-pl-sm" key="totalpermintaanls">
              <q-badge color="green">
                {{ formatRpDouble(props.row?.totalpermintaanls) }}
              </q-badge>
            </div>
          </q-td>
          <q-td key="tgltrans" :props="props">
            {{ props.row?.tgltrans }}
          </q-td>
          <q-td key="nokontrak" :props="props">
            {{ props.row?.nokontrak }}
            <div>
              <template v-if="props.row?.nonpdls">
                <q-badge color="pink">
                  Sudah NPD: {{ props.row?.nonpdls }}
                </q-badge>
              </template>
              <template v-else>
                <q-badge color="pink">
                  Belum NPD
                </q-badge>
              </template>
            </div>
          </q-td>
          <q-td key="namaperusahaan" :props="props">
            {{ props.row?.namaperusahaan }}
          </q-td>
          <q-td key="kegiatanblud" :props="props">
            {{ props.row?.kegiatanblud }}
          </q-td>
          <q-td key="namapptk" :props="props">
            {{ props.row?.namapptk }}
          </q-td>
          <q-td>
            <div class="row justify-center">
              <div class="q-pr-xs">
                <q-btn v-if="gantiKunci(props?.row)" flat round size="xs" class="bg-red-10 text-white"
                  icon="icon-mat-lock" @click="kunciData(props?.row)">
                  <q-tooltip> Buka Kunci </q-tooltip>
                </q-btn>
                <q-btn v-else flat round size="xs" class="bg-orange" icon="icon-mat-key" @click="kunciData(props?.row)">
                  <q-tooltip> Kunci Data </q-tooltip>
                </q-btn>
              </div>
              <div> <q-btn flat round size="xs" class="bg-black" color="white" icon="icon-fa-file-regular">
                  <q-menu dark style="min-width: 150px">
                    <q-list style="min-width: 150px;">
                      <q-item clickable v-close-popup @click="viewRincian(props?.row)">
                        <q-item-section>Lihat Rincian</q-item-section>
                      </q-item>
                      <q-item clickable @click="editdata(props?.row)">
                        <q-item-section :auth="user">Edit Serahterima</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <app-dialog-rincian v-model="store.openDialogRinci" :stp="stp" />
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { formatRpDouble } from 'src/modules/formatter';
import { useAplikasiStore } from 'src/stores/app/aplikasi';
import { useFormSerahterimaStore } from 'src/stores/siasik/transaksi/ls/serahterimapekerjaan/formserahterima';
import { listdataSerahterimaStore } from 'src/stores/siasik/transaksi/ls/serahterimapekerjaan/listdataserahterima';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const AppDialogRincian = defineAsyncComponent(() => import('./DialogViewRincian.vue'))

const store = listdataSerahterimaStore()
const form = useFormSerahterimaStore()

const auth = useAplikasiStore()
const user = computed(() => auth.user?.pegawai?.kdpegsimrs)
const router = useRouter()
const listserahterima = [
  {
    name: 'noserahterimapekerjaan',
    label: 'No Serahterima',
    align: 'left',
    // field: 'noserahterimapekerjaan',
    field: row => [row.noserahterimapekerjaan, row.totalpermintaanls],
    sortable: true,
    headerStyle: 'width: 10%; height:50px; font-weight: bold;'
  },
  {
    name: 'tgltrans',
    label: 'Tanggal',
    align: 'left',
    field: 'tgltrans',
    sortable: true,
    headerStyle: 'height:50px; font-weight: bold;'
  },
  {
    name: 'nokontrak',
    label: 'No Kontrak / NPD-LS',
    align: 'left',
    // field: 'nokontrak',
    field: row => [row.nokontrak, row.nonpdls],
    sortable: true,
    // style: 'width: 200px',
    headerStyle: 'height:50px; font-weight: bold;'
  },
  {
    name: 'namaperusahaan',
    label: 'Pihak Ketiga',
    align: 'left',
    field: 'namaperusahaan',
    sortable: true,
    headerStyle: 'height:50px; font-weight: bold;'
  },
  {
    name: 'kegiatanblud',
    label: 'Kegiatan BLUD',
    align: 'left',
    field: 'kegiatanblud',
    sortable: true,
    headerStyle: 'width: 30%; height:50px; font-weight: bold;'
  },
  {
    name: 'namapptk',
    label: 'Pejabat Teknis Kegiatan',
    align: 'left',
    field: 'namapptk',
    sortable: true,
    headerStyle: 'height:50px; font-weight: bold;'
  },
  {
    name: 'aksi',
    label: 'Aksi',
    align: 'center',
    headerStyle: 'width: 77px; height:50px; font-weight: bold;'
  }

  // {
  //   name: 'totalpermintaanls',
  //   label: 'Nilai Kontrak',
  //   align: 'right',
  //   field: 'totalpermintaanls',
  //   sortable: true,
  //   headerStyle: 'width: 200px; height:50px; font-weight: bold;'
  // }
]
const columnsserahterima = ref(listserahterima)
const stp = ref(null)
function viewRincian(row) {
  store.openDialogRinci = true
  stp.value = row.rinci
  store.listrinci = stp.value
}

const clearSearch = () => {
  store.params.q = ''
  store.goToPage(1)
}


// onMounted(() => {
//   console.log('user', auth.user)
// })

function gantiKunci(row) {
  // console.log('row kunci', row)
  const nonpdls = row.kunci === "1"
  let lockdata = true
  if (nonpdls) {
    lockdata = true
  } else {
    lockdata = false
  }
  return lockdata
}

const $q = useQuasar()
const selected = ref([])
function kunciData(row) {
  if (row.kunci === "1") {
    // Validasi: hanya user super admin yang bisa buka kunci
    if (auth.user?.pegawai?.kdpegsimrs !== 'sa') {
      $q.notify({
        type: 'negative',
        message: 'Anda tidak Memiliki Izin Membuka Kunci Data ini, Silahkan Hubungi Admin'
      })
      return
    }
    $q.dialog({
      title: 'Peringatan',
      message: 'Apakah Anda yakin akan Membuka Kunci?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      const payload = {
        noserahterimapekerjaan: row.noserahterimapekerjaan,
        kunci: row.kunci,
        nonpdls: row.nonpdls
      }
      console.log('payload', payload)
      store.kunciData(payload).then(() => {
        row.kunci = row.kunci === '1' ? '' : '1'
      })
    }).onCancel(() => {
      console.log('Cancel')
      selected.value = []
    }).onDismiss(() => {
    })
  } else {
    $q.dialog({
      title: 'Peringatan',
      message: 'Apakah Anda yakin akan Mengunci Data?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      const payload = {
        noserahterimapekerjaan: row.noserahterimapekerjaan,
        kunci: row.kunci,
        nonpdls: row.nonpdls
      }
      console.log('payload', payload)
      store.kunciData(payload).then(() => {
        row.kunci = row.kunci === '1' ? '' : '1'
      })
    }).onCancel(() => {
      console.log('Cancel')
      selected.value = []
    }).onDismiss(() => {
    })
  }
}

const editDataref = ref(null)
function editdata(row) {

  // if (auth.user?.pegawai?.kdpegsimrs !== 'sa') {
  //   $q.notify({
  //     type: 'negative',
  //     message: 'Anda tidak Memiliki Akses Edit Data ini, Silahkan Hubungi Admin'
  //   })
  //   return
  // }
  if (row?.kunci === '1') {
    $q.notify({
      type: 'negative',
      message: 'Data Masih Terkunci, Silahkan Buka Kunci Terlebih Dahulu'
    })
    return
  }

  router.push({ path: '/siasik/ls/serahterima/formserahterima', replace: true, query: { id: row.id } })
  editDataref.value = row
  form.formheader = editDataref.value
  form.transall = editDataref.value?.rinci
  form.params.kodekegiatan = editDataref.value?.kodekegiatanblud
  form.getRincianBelanja()
  form.formheader.rinci = []
  form.disabled = true
  form.disableplus = true
}

</script>
