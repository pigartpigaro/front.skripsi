<template>
  <div class="justify-content-center full-width">
    <q-table style="height: 100%" :rows="store.datanotadinas" :columns="columnsdata" row-key="name" dense flat bordered
      wrap-cells :filter="store.params.q" :loading="store.loading" :rows-per-page-options="[10, 50, 100]">
      <template #loading>
        <q-inner-loading showing color="warning" />
      </template>
      <template #top-left>
        <div class="flex q-gutter-sm z-top">
          <div>
            <q-input v-model="store.params.q" outlined dense placeholder="Cari Data Nota Dinas ..." debounce="500"
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
            <q-input outlined dense label="Tahun" v-model="store.params.tahun" debounce="400"
              :disable="store.disabled && store.loading" :loading="store.loading" :autofocus="false"
              @update:model-value="(val) => {
                console.log('Tahun berapa?', val)
                store.params.tahun = val
                store.listData()
              }" />
          </div>
        </div>
      </template>
      <template #body="props">
        <q-tr>
          <q-td key="nonotadinas" :props="props">
            <div>
              {{ props.row.nonotadinas }}
            </div>
            <div class="q-pl-sm" key="total">
              <q-badge color="green">
                {{ formatRpDouble(props.row?.total) }}
              </q-badge>
            </div>
          </q-td>
          <q-td key="tglnotadinas" :props="props">
            {{ props.row?.tglnotadinas }}
          </q-td>
          <q-td key="nonpk" :props="props">
            <div>
              <template v-if="props.row?.nonpk">
                <q-badge color="brown-6">
                  NPK-LS: {{ props.row?.nonpk }}
                </q-badge>
              </template>
              <template v-else>
                <q-badge color="pink">
                  Belum NPK-LS
                </q-badge>
              </template>
            </div>
          </q-td>
          <q-td key="bidang" :props="props">
            {{ props.row?.bidang }}
          </q-td>
          <q-td key="kegiatan" :props="props">
            {{ props.row?.kegiatan }}
          </q-td>
          <q-td key="namapptk" :props="props">
            {{ props.row?.namapptk }}
          </q-td>
          <q-td>
            <div class="row justify-center">
              <div class="q-pr-xs">
                <q-btn v-if="gantiKunci(props?.row)" flat round size="xs" class="bg-red-10 text-white"
                  icon="icon-mat-lock" :auth="user" @click="kunciData(props?.row)">
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
                        <q-item-section :auth="user">Edit Notadinas</q-item-section>
                      </q-item>
                      <template v-if="props?.row.kunci === '1'">
                        <q-item clickable v-close-popup @click="viewCetakData(props?.row)">
                          <q-item-section>Cetak Nota Dinas</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="LapRealisasi(props?.row)">
                          <q-item-section>Laporan Realisasi</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="viewLembarverif(props?.row)">
                          <q-item-section>Cetak Lembar Verif</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="viewCetakSptj(props?.row)">
                          <q-item-section>Cetak SPTJ</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="viewCetakVerifikasi(props?.row)">
                          <q-item-section>Cetak Verifikasi</q-item-section>
                        </q-item>
                      </template>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <app-dialog-rincian v-model="store.openDialogRinci" :nota="nota" />
    <print-data v-model="store.dialogCetak" :cetakdata="cetakdata" />
    <cetak-sptj v-model="store.dialogCetakSptj" :cetaksptj="cetaksptj" />
    <cetak-verif v-model="store.dialogCetakPernyataan" :cetakverif="cetakverif" />
    <lembar-verif v-model="store.dialogLembarverif" :lembarverif="lembarverif" />
    <laporan-pengajuan v-model="store.dialogLaporan" :cetaklaporan="cetaklaporan" />
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { formatRpDouble } from 'src/modules/formatter';
import { useAplikasiStore } from 'src/stores/app/aplikasi';
import { useFormNotadinasStore } from 'src/stores/siasik/transaksi/ls/notadinas/form';
import { listdataNotadinasStore } from 'src/stores/siasik/transaksi/ls/notadinas/list';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const AppDialogRincian = defineAsyncComponent(() => import('./DialogViewRincian.vue'))
const PrintData = defineAsyncComponent(() => import('./DialogCetakdata.vue'))
const CetakSptj = defineAsyncComponent(() => import('./DialogCetakSptj.vue'))
const CetakVerif = defineAsyncComponent(() => import('./DialogCetakVerif.vue'))
const LembarVerif = defineAsyncComponent(() => import('./DialogLembarVerif.vue'))
const LaporanPengajuan = defineAsyncComponent(() => import('./DialogLaporanPengajuan.vue'))
const store = listdataNotadinasStore()
const form = useFormNotadinasStore()

const auth = useAplikasiStore()
const user = computed(() => auth.user?.pegawai?.kdpegsimrs)
const router = useRouter()
const listdatanota = [
  {
    name: 'nonotadinas',
    label: 'No Nota Dinas',
    align: 'left',
    // field: 'noserahterimapekerjaan',
    field: row => [row.nonotadinas, row.total],
    sortable: true,
    headerStyle: 'height:50px; font-weight: bold;'
  },
  {
    name: 'tglnotadinas',
    label: 'Tanggal',
    align: 'left',
    field: 'tglnotadinas',
    sortable: true,
    headerStyle: 'height:50px; font-weight: bold;'
  },
  {
    name: 'nonpk',
    label: 'No NPK-LS',
    align: 'left',
    field: 'nonpk',
    // field: row => [row.nonpk],
    sortable: true,
    // style: 'width: 200px',
    headerStyle: 'height:50px; font-weight: bold;'
  },
  {
    name: 'bidang',
    label: 'Bidang/Bagian',
    align: 'left',
    field: 'bidang',
    sortable: true,
    headerStyle: 'width: 10%; max-width:30%; height:50px; font-weight: bold;'
  },
  {
    name: 'kegiatan',
    label: 'Kegiatan BLUD',
    align: 'left',
    field: 'kegiatan',
    sortable: true,
    headerStyle: 'width: 20%; max-width:30%; height:50px; font-weight: bold;'
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
]
const columnsdata = ref(listdatanota)
const nota = ref(null)
function viewRincian(row) {
  store.openDialogRinci = true
  nota.value = row.rincians
  // console.log('nota', nota.value)
  store.listrinci = nota.value
}

const clearSearch = () => {
  store.params.q = ''
  store.goToPage(1)
}

const cetakdata = ref([])
function viewCetakData(row) {
  // console.log('row cetak', row)
  store.dialogCetak = true
  cetakdata.value = row
  store.cetaknotadinas = cetakdata.value
}

const cetaklaporan = ref([])
async function LapRealisasi(row) {
  store.params.tgl = row.tglnotadinas;
  store.params.kodekegiatan = row.kodekegiatan;

  store.realisasi = [];

  try {
    await store.lapRealisasi();

    // Proses perhitungan realisasi
    const real = [];
    const arr = store.anggarans.map((x) => x.koderek50);
    const uniksx = arr?.length ? [...new Set(arr)] : [];

    for (let i = 0; i < uniksx?.length; i++) {
      const rek = uniksx[i];
      const arrls = store.anggarans.filter((x) => x.koderek50 === rek).map((x) => x.realisasi);
      const ls = arrls.map((x) => x.map((y) => parseFloat(y.realisasi)).reduce((a, b) => a + b, 0));

      const arrpanjar = store.anggarans.filter((x) => x.koderek50 === rek).map((x) => x.realisasi_spjpanjar);
      const panjar = arrpanjar.map((x) => x.map((y) => parseFloat(y.realisasi)).reduce((a, b) => a + b, 0));

      const arrcp = store.anggarans.filter((x) => x.koderek50 === rek).map((x) => x.contrapost);
      const cp = arrcp.map((x) => x.map((y) => parseFloat(y.nilaicp)).reduce((a, b) => a + b, 0));

      const rincian = {
        rekeningbelanja: store.anggarans.filter((x) => x.koderek50 === rek)[0]?.uraian50,
        koderekening: store.anggarans.filter((x) => x.koderek50 === rek)[0]?.koderek50,
        pagu: store.anggarans.filter((x) => x.koderek50 === rek)?.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
        realisasi: ls.reduce((a, b) => a + b, 0) + panjar.reduce((a, b) => a + b, 0) - cp.reduce((a, b) => a + b, 0),
        pengajuan: 0,
      };

      real.push(rincian);
    }

    // Proses pengajuan
    const pengajuan = [];
    const npdls = row.rinci_npd.concat(real);
    const uniks = npdls.map((x) => x.koderekening);
    const hasilx = uniks?.length ? [...new Set(uniks)] : [];

    for (let i = 0; i < hasilx.length; i++) {
      const el = hasilx[i];
      const obj = {
        rekeningbelanja: npdls.filter((x) => x.koderekening === el)[0]?.rekeningbelanja,
        koderekening: npdls.filter((x) => x.koderekening === el)[0]?.koderekening,
        pagu: npdls.filter((x) => x.koderekening === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
        realisasi: npdls.filter((x) => x.koderekening === el).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0) -
          npdls.filter((x) => x.koderekening === el).map((x) => parseFloat(x.pengajuan)).reduce((a, b) => a + b, 0),
        pengajuan: npdls.filter((x) => x.koderekening === el).map((x) => parseFloat(x.pengajuan)).reduce((a, b) => a + b, 0),
        sisapagu: npdls.filter((x) => x.koderekening === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) -
          (npdls.filter((x) => x.koderekening === el).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0) -
            npdls.filter((x) => x.koderekening === el).map((x) => parseFloat(x.pengajuan)).reduce((a, b) => a + b, 0)) -
          npdls.filter((x) => x.koderekening === el).map((x) => parseFloat(x.pengajuan)).reduce((a, b) => a + b, 0),
      };
      pengajuan.push(obj);
    }
    const sortAnggaran = (pengajuan) =>
      pengajuan.sort(({ koderekening: a }, { koderekening: b }) =>
        a < b ? -1 : a > b ? 1 : 0
      )
    const datarealisasi = sortAnggaran(pengajuan)
    store.realisasi = datarealisasi;
    cetaklaporan.value = datarealisasi;

    store.nilaitotal = {
      pagu: store.realisasi.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
      realisasi: store.realisasi.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0),
      pengajuan: store.realisasi.map((x) => parseFloat(x.pengajuan)).reduce((a, b) => a + b, 0),
      sisapagu: store.realisasi.map((x) => parseFloat(x.sisapagu)).reduce((a, b) => a + b, 0)
    }
    store.realisasi.kegiatanblud = row.kegiatan
    store.realisasi.pptk = row.namapptk
    store.realisasi.nip = row.kodepptk
    store.realisasi.bidang = row.bidang
    console.log('row', store.realisasi)
    store.dialogLaporan = true;
  } catch (error) {
    console.error("Error saat memproses laporan:", error);
  }
}

const lembarverif = ref([])
function viewLembarverif(row) {
  // console.log('row cetak', row)
  store.dialogLembarverif = true
  lembarverif.value = row
  store.cetaknotadinas = lembarverif.value
}

const cetaksptj = ref([])
function viewCetakSptj(row) {
  // console.log('row cetak', row)
  store.dialogCetakSptj = true
  cetaksptj.value = row
  store.cetaknotadinas = cetaksptj.value
}

const cetakverif = ref([])
function viewCetakVerifikasi(row) {
  // console.log('row cetak', row)
  store.dialogCetakPernyataan = true
  cetakverif.value = row
  store.cetaknotadinas = cetakverif.value
}

function gantiKunci(row) {
  // console.log('row kunci', row)
  const notadinas = row.kunci === "1"
  let lockdata = true
  if (notadinas) {
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
        nonotadinas: row.nonotadinas,
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
        nonotadinas: row.nonotadinas,
        kunci: row.kunci,
        // nonpdls: row.nonpdls
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

  // if (auth.user?.pegawai?.kdpegsimrs !== 'sa' && row?.kunci === '') {
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

  router.push({ path: '/siasik/ls/notadinas/formdata', replace: true, query: { id: row.id } })
  editDataref.value = row
  form.formheader = editDataref.value
  form.transrinci = editDataref.value?.rincians



  form.params.kodekegiatan = editDataref.value?.kodekegiatan ?? ''
  form.params.kodepptk = editDataref.value?.kodepptk ?? ''
  // console.log('formptks', form.ptks);
  console.log('editDataref', editDataref.value)
  form.getDataNpdls()
  form.formheader.rincians = []

}

</script>
