<template>
  <div class="row full-width justify-center">
    <div class="q-pa-sm" style="width:50%">
      <q-input v-model="store.reqs.q" outlined color="warning" dense placeholder="Cari Transaksi..." debounce="0"
        style="min-width: 300px;" @keyup.enter.stop="store.getDataBukubesar()" @update:model-value="cariData">
        <template v-if="store.reqs.q" #append>
          <q-icon name="icon-mat-close" size="xs" class="cursor-pointer" @click.stop.prevent="clearSearch" />
        </template>
        <template #prepend>
          <q-icon size="sm" name="icon-mat-search" />
        </template>
      </q-input>
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-input-date-human :model="store.reqs.tgl" label="dari tangal" outlined :disable="store.loading"
        :loading="store.loading" @db-model="tglDari" @set-display="setDari" />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-input-date-human :model="store.reqs.tglx" label="sampai tangal" outlined :disable="store.loading"
        :loading="store.loading" @db-model="tglSampai" @set-display="setSampai" />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete v-model="jenisapa" label="Pilih Jenis Buku Besar" autocomplete="nama" option-value="value"
        option-label="nama" outlined :disable="store.loading || !store.alllevel?.length"
        :loading="store.loading || !store.alllevel?.length" :source="store.jenis" @update:model-value="(val) => {
          store.hasilmapsLevel1 = []
          store.hasilmapsLevel5 = []
          store.hasilmapsLevel6 = []
          store.hasilRinci6 = []
          store.hasilRinci5 = []
          store.hasilRinci4 = []
          store.hasilRinci3 = []
          store.hasilRinci2 = []
          store.hasilRinci1 = []
          berdasarrekap = ''
          berdasarrinci = ''
          store.form.kode = ''
          store.reqs.jenisbukubesar = parseInt(val)
        }" />
    </div>
    <div class="q-pa-sm" style="width:25%">
      <app-autocomplete v-model="berdasarrekap" label="Pilih Jenis Akun" autocomplete="nama" option-value="value"
        option-label="nama" outlined :disable="store.loading || !store.alllevel?.length"
        :loading="store.loading || !store.alllevel?.length" v-if="store.reqs.jenisbukubesar < 2" :source="store.level"
        @update:model-value="(val) => {
          store.reqs.levelberapa = parseInt(val)
          // Filter store.alllevel berdasarkan panjang kodeall3
          store.optionrekening = store.alllevel?.filter(x => x?.kodeall3?.length === parseInt(val)) || []
          store.form.kode = '' // Reset kode saat jenis akun berubah
          options.value = store.optionrekening // Update options untuk q-select
        }" />
      <app-autocomplete v-model="berdasarrinci" label="Pilih Jenis Akun" autocomplete="nama" option-value="value"
        option-label="nama" outlined :disable="store.loading || !store.alllevel?.length"
        :loading="store.loading || !store.alllevel?.length" v-if="store.reqs.jenisbukubesar === 2"
        :source="store.levelrinci" @update:model-value="(val) => {
          store.reqs.levelberapa = parseInt(val)
          // Filter store.alllevel berdasarkan panjang kodeall3
          store.optionrekening = store.alllevel?.filter(x => x?.kodeall3?.length === parseInt(val)) || []
          store.form.kode = '' // Reset kode saat jenis akun berubah
          options.value = store.optionrekening // Update options untuk q-select
        }" />
    </div>
    <div class="q-pa-sm" style="width:50%">
      <q-select v-model="store.form.kode" use-input outlined standout="bg-yellow-3" dense emit-value map-options
        option-value="kodeall3" input-debounce="300" label="Pilih Rekening" class="ellipsis-2-lines" :options="options"
        :option-label="opt => Object(opt) === opt && 'kodeall3' in opt ? opt.kodeall3 + ' - ' + opt.uraian : ''"
        :disable="store.loading || !store.alllevel?.length || !store.optionrekening?.length && store.reqs.jenisbukubesar === 1"
        :loading="store.loading || !store.alllevel?.length" @filter="filterFn"
        @clear="store.setFormRekening('kode', null)" @update:model-value="(val) => {
          store.reqs.rekenings = val
          const arr = store.optionrekening
          const cari = arr.find(x => x.kodeall3 === val)
          store.form.uraian = cari.uraian
        }">
        <template v-if="store.form.kode" #append>
          <q-icon name="icon-mat-cancel" class="cursor-pointer"
            @click.stop.prevent="store.setFormRekening('kode', null)" />
        </template>
        <template v-else #no-option>
          <q-item>
            <q-item-section class="text-grey">
              Tidak ditemukan
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
  <div class="row full-width justify-center">
    <div class="row q-pa-sm">
      <div class="q-pa-sm">
        <app-btn label="Ambil Data" :disable="store.loading || !store.alllevel?.length"
          :loading="store.loading || !store.alllevel?.length" @click="ambilData()" />
      </div>
      <div class="q-pa-sm">
        <q-btn icon="icon-mat-print" color="orange" round size="sm" :disable="store.loading" :loading="store.loading"
          @click="cetakData()">
          <q-tooltip class="bg-orange" :offset="[10, 10]">
            Cetak
          </q-tooltip>
        </q-btn>
      </div>
      <div class="q-pa-sm">
        <q-btn icon="icon-mat-download" color="green" round size="sm" push :disable="store.loading"
          :loading="store.loading" @click="exportToExcel">
          <q-tooltip class="bg-green" :offset="[10, 10]">
            Export to Excel
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
  <cetak-bukubesar v-model="store.dialogCetak" :printbb="printbb" />
</template>
<script setup>
import { useQuasar } from 'quasar'
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar'
import { defineAsyncComponent, ref, watchEffect } from 'vue'
import { api } from 'src/boot/axios'
const CetakBukubesar = defineAsyncComponent(() => import('../printbukubesar/PrintBukubesar.vue'))
import * as XLSX from 'xlsx'
import { notifErrVue } from 'src/modules/utils'


const $q = useQuasar()
const store = useBukubesarStore()
const berdasarrekap = ref('')
const berdasarrinci = ref('')
const jenisapa = ref('')
const options = ref([])
// const isLoading = ref(false) // untuk filterFn
// const inpRek = ref(null)
// const emits = defineEmits(['onClick', 'newData', 'editData', 'goto', 'deleteIds', 'setRow', 'setColumns', 'setOrder', 'find', 'search', 'delete', 'refresh'])
function tglDari(val) {
  store.setParameter('tgl', val)
}
function setDari(val) {
  store.display.dari = val
}
function tglSampai(val) {
  store.setParameter('tglx', val)
}
function setSampai(val) {
  store.display.sampai = val
}

function cariData(val) {
  // console.log('ada Hasil Cari', val)
  store.reqs.q = val
  if (!store.loading) store.getDataBukubesar(val)
}
const clearSearch = () => {
  store.reqs.q = ''
  store.getDataBukubesar()
}
function ambilData() {
  store.getDataBukubesar()
  // store.hasillevel()
}

const printbb = ref(null)
function cetakData() {
  store.dialogCetak = true
}

// function filterFn(val, update, abort) {

// update(() => {
//   if (val === '') {
//     options.value = store.optionrekening;
//   } else {
//     const needle = val.toLowerCase();
//     const filter = ['kodeall3', 'uraian'];

//     // Selalu filter dari data asal (store.rekening50), bukan dari options yang sudah difilter
//     const multiFilter = (data = [], filterKeys = [], value = '') =>
//       data.filter((item) => filterKeys.some(
//         (key) =>
//           item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
//           item[key]
//       ));

//     options.value = multiFilter(store.optionrekening, filter, needle);
//   }
// });
// }

async function filterFn(val, update, abort) {
  // isLoading.value = true // Aktifkan loading saat filter dimulai

  // Jika input kosong, kembalikan semua opsi
  if (!val) {
    update(() => {
      options.value = store.optionrekening || []
      console.log('Options saat pencarian kosong:', options.value)
    })
    store.loading = false
    return
  }

  // Filter lokal
  const needle = val.toLowerCase()
  const localResults = store.optionrekening?.filter(
    (item) =>
      (item.kodeall3?.toLowerCase().includes(needle) ||
        item.uraian?.toLowerCase().includes(needle)) &&
      item.kodeall3?.length === parseInt(store.reqs.levelberapa)
  ) || []

  console.log('Hasil filter lokal:', localResults)

  // Jika ada hasil lokal, gunakan itu
  if (localResults.length > 0) {
    update(() => {
      options.value = localResults
      console.log('Options dari filter lokal:', localResults)
    })
    store.loading = false
    return
  }

  // Jika input >= 2 karakter, cari ke server
  if (val.length >= 2) {
    let allData = []
    let page = 1
    let hasMore = true

    console.log('Mulai iterasi halaman untuk levelberapa:', store.reqs.levelberapa)

    while (hasMore) {
      try {
        const resp = await api.get('v1/akuntansi/bukubesar/akun', {
          params: {
            q: val,
            per_page: 100,
            page: page,
            levelberapa: store.reqs.levelberapa
          }
        })

        console.log(`filterFn: Data halaman ${page}:`, resp.data)

        if (resp.status === 200 && resp.data.data?.length) {
          allData = [...allData, ...resp.data.data]
          hasMore = resp.data.next_page_url !== null // Untuk SimplePaginator
          page++
        } else {
          hasMore = false
        }
      } catch (error) {
        console.error('Error saat mengambil halaman:', error)
        hasMore = false
      }
    }

    console.log('filterFn: Semua data dari server:', allData)

    // Update opsi berdasarkan hasil server
    update(() => {
      if (allData.length > 0) {
        options.value = allData
        store.optionrekening = allData // Update hanya jika ada hasil
      } else {
        options.value = [] // Kosongkan opsi untuk menampilkan "Tidak ditemukan"
      }
      console.log('Options setelah update:', options.value)
    })
  } else {
    // Untuk input pendek, gunakan hasil lokal
    update(() => {
      options.value = localResults
      console.log('Options untuk pencarian pendek:', localResults)
    })
  }

  store.loading = false // Matikan loading setelah selesai
}

function exportToExcel() {
  if (!store.hasilRinci1?.length && !store.hasilRinci2?.length && !store.hasilRinci3?.length && !store.hasilRinci4?.length
    && !store.hasilRinci5?.length && !store.hasilRinci6?.length
  ) {
    notifErrVue('Tidak ada data untuk diekspor!');
    return;
  }

  // Siapkan data untuk Excel
  const data = [];

  // Header tabel
  const headers = [
    'TANGGAL',
    'NO. BUKTI',
    'URAIAN',
    'DEBIT (Rp.)',
    'KREDIT (Rp.)',
    'SALDO (Rp.)',
  ];
  data.push(headers);

  // Fungsi untuk format URAIAN
  const formatUraian = (item) => {
    if (!item.keterangan) return item.kegiatan || '';
    if (!item.kegiatan) return item.keterangan || '';
    return `${item.keterangan} > ${item.kegiatan}`;
  };

  // Gabungkan semua hasilRinci
  const allRinci = [
    ...store.hasilRinci1,
    ...store.hasilRinci2,
    ...store.hasilRinci3,
    ...store.hasilRinci4,
    ...store.hasilRinci5,
    ...store.hasilRinci6,
  ];

  // Tambahkan data
  allRinci.forEach((item) => {
    data.push([
      item.tanggal,
      item.notrans,
      formatUraian(item),
      item.debit,
      item.kredit,
      item.total,
    ]);
  });

  // Tambahkan baris total
  const totalData = total(store);
  data.push([
    '',
    '',
    'JUMLAH',
    totalData.jmldebit,
    totalData.jmlkredit,
    totalData.jumlah,
  ]);


  // Buat workbook dan worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Buku Besar');

  // Atur lebar kolom (opsional)
  const colWidths = data[0].map((_, colIndex) => {
    return Math.max(
      ...data.map((row) => (row[colIndex] ? row[colIndex].toString()?.length : 0)),
      10
    );
  });
  worksheet['!cols'] = colWidths.map((width) => ({ wch: width }));

  // Download file Excel
  XLSX.writeFile(workbook, `Buku_Besar_${new Date().toISOString().slice(0, 10)}.xlsx`);
}


function total(store) {
  if (store.hasilRinci1?.length > 0) {
    const debit = store.hasilRinci1.map((x) => x.debit);
    const jmldebit = debit.reduce((a, b) => a + b, 0);
    const kredit = store.hasilRinci1.map((x) => x.kredit);
    const jmlkredit = kredit.reduce((a, b) => a + b, 0);
    const jumlah = jmldebit - jmlkredit;
    return {
      jmldebit,
      jmlkredit,
      jumlah,
    };
  } else if (store.hasilRinci2?.length > 0) {
    const debit = store.hasilRinci2.map((x) => x.debit);
    const jmldebit = debit.reduce((a, b) => a + b, 0);
    const kredit = store.hasilRinci2.map((x) => x.kredit);
    const jmlkredit = kredit.reduce((a, b) => a + b, 0);
    const jumlah = jmldebit - jmlkredit;
    return {
      jmldebit,
      jmlkredit,
      jumlah,
    };
  } else if (store.hasilRinci3?.length > 0) {
    const debit = store.hasilRinci3.map((x) => x.debit);
    const jmldebit = debit.reduce((a, b) => a + b, 0);
    const kredit = store.hasilRinci3.map((x) => x.kredit);
    const jmlkredit = kredit.reduce((a, b) => a + b, 0);
    const jumlah = jmldebit - jmlkredit;
    return {
      jmldebit,
      jmlkredit,
      jumlah,
    };
  } else if (store.hasilRinci4?.length > 0) {
    const debit = store.hasilRinci4.map((x) => x.debit);
    const jmldebit = debit.reduce((a, b) => a + b, 0);
    const kredit = store.hasilRinci4.map((x) => x.kredit);
    const jmlkredit = kredit.reduce((a, b) => a + b, 0);
    const jumlah = jmldebit - jmlkredit;
    return {
      jmldebit,
      jmlkredit,
      jumlah,
    };
  } else if (store.hasilRinci5?.length > 0) {
    const debit = store.hasilRinci5.map((x) => x.debit);
    const jmldebit = debit.reduce((a, b) => a + b, 0);
    const kredit = store.hasilRinci5.map((x) => x.kredit);
    const jmlkredit = kredit.reduce((a, b) => a + b, 0);
    const jumlah = jmldebit - jmlkredit;
    return {
      jmldebit,
      jmlkredit,
      jumlah,
    };
  } else if (store.hasilRinci6?.length > 0) {
    const debit = store.hasilRinci6.map((x) => x.debit);
    const jmldebit = debit.reduce((a, b) => a + b, 0);
    const kredit = store.hasilRinci6.map((x) => x.kredit);
    const jmlkredit = kredit.reduce((a, b) => a + b, 0);
    const jumlah = jmldebit - jmlkredit;
    return {
      jmldebit,
      jmlkredit,
      jumlah,
    };
  }
  return {
    jmldebit: 0,
    jmlkredit: 0,
    jumlah: 0,
  };
}
</script>
