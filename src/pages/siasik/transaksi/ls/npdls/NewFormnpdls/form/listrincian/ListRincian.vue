<template>
  <q-card flat class="col full-height q-pt-sm">
    <q-table class="my-sticky-table" :rows="displayRows" :columns="columns" row-key="name" hide-pagination hide-bottom
      wrap-cells :rows-per-page-options="[0]" :rows-number="[0]">
      <template #body="props">
        <q-tr :props="props">
          <q-td key="rincianbelanja" :props="props" class="text-left">
            <template v-if="props.row.uraianrek50">
              <div> {{ props?.row?.uraianrek50 }} </div>

            </template>
            <template v-else>
              <div class="text-bold">{{ props.row.nopenerimaan }}</div>
              <div>{{ props.row.rincianbelanja }}</div>
            </template>
          </q-td>
          <q-td key="koderek50" :props="props" class="text-left">
            {{ props.row.koderek50 }}
          </q-td>
          <q-td key="itembelanja" :props="props" class="text-left">
            {{ props.row.itembelanja }}
          </q-td>
          <q-td key="nominalpembayaran" :props="props" class="text-right">
            {{ formattanpaRp(props.row.nominalpembayaran) }}
          </q-td>
          <q-td style="width: 5%">
            <div class="row justify-center">
              <template v-if="isTransallSerahterima(props.row)">
                <q-btn v-if="belumSave(props?.row)" size="sm" class="q-pl-md" color="green" icon="icon-mat-save"
                  @click="saveRinciSerahterima(props?.row)" :loading="store.loadingHapus" />
              </template>
              <template v-else>
                <q-btn size="sm" class="q-pl-md" color="negative" icon="icon-mat-delete"
                  @click="deleteData(props?.row?.id)" :loading="store.loadingHapus" />
              </template>
            </div>

          </q-td>
        </q-tr>
      </template>
      <template #bottom-row>
        <q-tr class="full-width text-bold">
          <q-td colspan="3" class="text-center" style="font-size: 4em">
            SUBTOTAL
          </q-td>
          <q-td colspan="2" class="text-right text-bold" style="font-size: 4em">
            {{ formattanpaRp(subtotal()) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>

  </q-card>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { formattanpaRp } from 'src/modules/formatter';
import { notifErrVue, notifSuccess } from 'src/modules/utils';
import { formInputNpdlsStore } from 'src/stores/siasik/transaksi/ls/newnpdls/formnpdls';
// import { onMounted } from 'vue';
import { computed, onMounted, ref } from 'vue';

onMounted(() => {
  // console.log(compSigna.value)
  store.getRincianBelanja()
})


const store = formInputNpdlsStore()
const tablerinci = [
  {
    label: 'Rincian Belanja',
    name: 'rincianbelanja',
    align: 'center',
    field: 'rincianbelanja'
  },
  {
    label: 'Rekening',
    name: 'koderek50',
    align: 'center',
    field: 'koderek50'
  },
  {
    label: 'Item Belanja',
    name: 'itembelanja',
    align: 'center',
    field: 'itembelanja'
  },
  {
    label: 'Jumlah',
    name: 'nominalpembayaran',
    align: 'center',
    field: 'nominalpembayaran'
  },
  {
    label: 'Opsi',
    name: 'opsi',
    align: 'center',
  }
]
const columns = ref(tablerinci)
const $q = useQuasar()
const selected = ref([])

const displayRows = computed(() => {
  const savedIds = store.transall.map((item) => item.bast_r_id);
  const unsavedRows = store.transallserahterima.filter(
    (item) => !savedIds.includes(item.id)
  );

  // Gabungkan transall (yang sudah disimpan) dengan transallserahterima (yang belum disimpan)
  return [...store.transall, ...unsavedRows];
});

function isTransallSerahterima(row) {
  return store.transallserahterima.some((item) => item.id === row.id);
}

function subtotal() {
  const subtotalrinci = displayRows.value
    .map((x) => parseFloat(x.nominalpembayaran))
    .reduce((a, b) => a + b, 0);
  return subtotalrinci;
}

function belumSave(row) {
  const bast_id = row?.id
  const transall = store.transall
  console.log('transall', store.transall)

  const rinciannpd = transall.find((x) => x?.bast_r_id === bast_id) ?? null

  console.log('row belumSave', rinciannpd)
  let gantitombol = true
  if (rinciannpd) {
    gantitombol = false
  } else {
    gantitombol = true
  }
  return gantitombol
}

function saveRinciSerahterima(row) {

  console.log('row', row)
  store.reqs.rekening50 = row.koderek50
  store.filterItemBelanja()
  const arrblj = store.itembelanja
  // console.log('arrblj', arrblj, store.reqs.rekening50)
  const cari = arrblj.find(x => x.idpp === row.idserahterima_rinci)
  // console.log('cari', cari)
  store.rinci.sisapagu = cari.sisapagu



  store.rinci.koderek50 = row.koderek50
  store.rinci.rincianbelanja = row.uraianrek50
  store.rinci.koderek108 = row.koderek108
  store.rinci.uraian108 = row.uraian108
  store.rinci.itembelanja = row.itembelanja

  store.rinci.bast_r_id = row.id
  store.rinci.idserahterima_rinci = row.idserahterima_rinci

  store.rinci.volume = row.volume
  store.rinci.satuan = row.satuan
  store.rinci.harga = row.harga
  store.rinci.total = row.total

  store.rinci.volumels = row.volumels
  store.rinci.hargals = row.hargals
  store.rinci.totalls = row.totalls
  store.rinci.nominalpembayaran = row.nominalpembayaran

  console.log('store.rinci', store.rinci.nominalpembayaran > store.rinci.sisapagu)

  if (store.rinci.nominalpembayaran > store.rinci.sisapagu) {
    store.form.rincians = []
    console.log('jumlah', store.rinci.nominalpembayaran > store.rinci.sisapagu)

    return notifErrVue('Maaf Pengajuan Lebih dari Sisa Pagu')
  }
  // else {
  //   notifErrVue('SUKSES')
  // }
  else {
    store.form.rincians.push(store.rinci)
    store.simpanNpdls().then(() => {
      store.rinci.koderek50 = ''
      store.rinci.rincianbelanja = ''
      store.rinci.koderek108 = ''
      store.rinci.uraian108 = ''
      store.rinci.itembelanja = ''
      store.rinci.idserahterima_rinci = ''
      store.rinci.volume = ''
      store.rinci.satuan = ''
      store.rinci.harga = ''
      store.rinci.total = ''
      store.rinci.sisapagu = ''
      store.rinci.volumels = ''
      store.rinci.hargals = ''
      store.rinci.totalls = ''
      store.rinci.nominalpembayaran = ''
      store.disabledx = true
      store.refreshTable()
      // store.listrincians()
      // console.log('store.transall', store.transall)
    })
  }
}
function deleteData(row) {
  // console.log('row', row)
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {

    const payload = {
      nonpdls: store.form.nonpdls,
      id: row,
      nopenerimaan: store.form.noserahterima,

    }
    console.log('payload', payload)
    store.hapusRinci(payload).then(() => {
      store.loadingHapus = true
      // carisrt.refreshTable()
      store.refreshTable()
      if (store.transall?.length === 0) {
        store.initForm()

      }
      // console.log('data hapus', store.transall)
    })
    // store.setForm = props?.row
    // console.log('vv', store.hapusRinci(row))
    // const params = { id: selected.value }
    // emits('deleteIds', selected.value)
  }).onCancel(() => {
    console.log('Cancel')
    selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>
<style lang="scss">
.my-sticky-table {
  min-height: 300px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #000000;
    color: $white;

  }

  thead tr th {
    position: sticky;
    z-index: 1;
    font-weight: bold;
  }

  /* this will be the loading indicator */
  thead tr:last-child th {
    top: 48px;

  }

  /* height of all previous header rows */

  thead tr:first-child th {
    top: 0;
  }

  .q-td {
    font-size: 3mm;
  }

  /* prevent scrolling behind sticky top row on focus */
  tbody {
    scroll-margin-top: 48px;
    font-size: 1mm;
  }

  .q-table__bottom .q-field__native,
  .q-table__bottom .q-field__inner .q-field__control .q-anchor--skip,
  i.q-icon {
    color: $white;
  }
}
</style>
