<template>
  <q-card v-if="store.transall.length" flat class="col full-height q-pt-sm">

    <q-table class="my-sticky-table" :rows="store.transall" :columns="columns" row-key="name" hide-pagination
      hide-bottom wrap-cells :rows-per-page-options="[0]" :rows-number="[0]">
      <template #body="props">
        <q-tr :props="props">
          <q-td key="uraianrek50" :props="props" class="text-left">
            <div>{{ props.row.uraianrek50 }}</div>
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
              <q-btn size="sm" class="q-pl-md" color="negative" icon="icon-mat-delete"
                @click="deleteData(props?.row?.id)" :loading="store.loadingHapus" />
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
import { notifSuccess } from 'src/modules/utils';
import { useFormSerahterimaStore } from 'src/stores/siasik/transaksi/ls/serahterimapekerjaan/formserahterima';
// import { onMounted } from 'vue';
import { onMounted, ref } from 'vue';

function subtotal() {
  const subtotalrinci = store.transall.map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0)
  return subtotalrinci
}

onMounted(() => {
  // console.log(compSigna.value)
  // store.initForm()
})


const store = useFormSerahterimaStore()
const tablerinci = [
  {
    label: 'Rincian Belanja',
    name: 'uraianrek50',
    align: 'center',
    field: 'uraianrek50'
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
function deleteData(row) {
  // console.log('row', row)
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {

    const payload = {
      noserahterimapekerjaan: store.formheader.noserahterimapekerjaan,
      id: row,
      // nopenerimaan: store.form.noserahterima,

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
