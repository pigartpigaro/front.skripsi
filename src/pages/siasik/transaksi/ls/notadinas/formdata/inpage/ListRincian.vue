<template>
  <q-card v-if="store.transrinci.length" flat class="col full-height q-pt-sm">

    <q-table class="my-sticky-table" :rows="store.transrinci" :columns="columns" row-key="name" hide-pagination
      hide-bottom wrap-cells :rows-per-page-options="[0]" :rows-number="[0]">
      <template #body="props">
        <q-tr :props="props">
          <q-td key="nonpdls" :props="props" class="text-left">
            <div>{{ props.row.nonpdls }}</div>
          </q-td>
          <q-td key="tglnpd" :props="props" class="text-left">
            {{ props.row.tglnpd }}
          </q-td>
          <q-td key="kegiatanblud" :props="props" class="text-left">
            {{ props.row.kegiatanblud }}
          </q-td>
          <q-td key="total" :props="props" class="text-right">
            {{ formattanpaRp(props.row.total) }}
          </q-td>
          <q-td style="width: 5%">
            <div class="row justify-center">
              <q-btn size="sm" class="q-pl-md" color="negative" icon="icon-mat-delete" @click="deleteData(props?.row)"
                :loading="store.loadingHapus" />
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
import { useFormNotadinasStore } from 'src/stores/siasik/transaksi/ls/notadinas/form';

import { onMounted, ref } from 'vue';

function subtotal() {
  const subtotalrinci = store.transrinci.map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0)
  return subtotalrinci
}

onMounted(() => {
})


const store = useFormNotadinasStore()
const tablerinci = [
  {
    label: 'No NPD-LS',
    name: 'nonpdls',
    align: 'center',
    field: 'nonpdls'
  },
  {
    label: 'Tanggal NPD-LS',
    name: 'tglnpd',
    align: 'center',
    field: 'tglnpd'
  },
  {
    label: 'Kegiatan BLUD',
    name: 'kegiatanblud',
    align: 'center',
    field: 'kegiatanblud'
  },
  {
    label: 'Jumlah',
    name: 'total',
    align: 'center',
    field: 'total'
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
  console.log('row', row)
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {

    const payload = {
      nonotadinas: store.formheader.nonotadinas,
      id: row.id,
      nonpdls: row.nonpdls,

    }
    console.log('payload delete', payload)
    store.hapusRinci(payload).then(() => {
      store.loadingHapus = true
      // carisrt.refreshTable()
      store.refreshTable()

      if (store.transrinci?.length === 0) {
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
