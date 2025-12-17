<template>
  <div class="justify-content-center full-width">
    <q-table style="height: 100%" :rows="store.listdataSp3b" :columns="columnsp3b" row-key="name" dense flat bordered
      wrap-cells :filter="store.reqs.q" :loading="store.loading" :rows-per-page-options="[10, 50, 100]">

      <template #loading>
        <q-inner-loading showing color="warning" />
      </template>
      <template #top-left>
        <div class="flex q-gutter-sm z-top">
          <q-input v-model="store.reqs.q" outlined color="primary" dense placeholder="Cari SP3B ..." debounce="500"
            style="min-width: 300px;">
            <template v-if="store.reqs.q" #append>
              <q-icon name="icon-mat-close" size="xs" class="cursor-pointer" @click.stop.prevent="clearSearch" />
            </template>
            <template #prepend>
              <q-icon size="sm" name="icon-mat-search" />
            </template>
          </q-input>
          <div class="q-pl-sm">
            <q-input outlined color="primary" dense label="Tahun" v-model="store.reqs.tahun"
              :disable="store.disabled && store.loading" :loading="store.loading" :autofocus="false"
              @update:model-value="(val) => {
                console.log('Tahun berapa?', val)
                store.reqs.tahun = val
                store.getList()
              }" />
          </div>
        </div>
      </template>
      <template #body="props">
        <q-tr>
          <q-td key="nosp3b" :props="props" class="text-left">
            {{ props.row?.nosp3b }}
          </q-td>
          <q-td key="tanggal" :props="props" class="text-left">
            {{ props.row?.tanggal }}
          </q-td>
          <q-td key="pendapatan" :props="props" class="text-right">
            Rp. {{ formattanpaRp(props.row?.pendapatan) }}
          </q-td>
          <q-td key="realisasi" :props="props" class="text-right">
            Rp. {{ formattanpaRp(props.row?.realisasi) }}
          </q-td>
          <q-td key="pembiayaan" :props="props" class="text-right">
            Rp. {{ formattanpaRp(props.row?.pembiayaan) }}
          </q-td>
          <q-td>
            <div class="row justify-center">
              <div>
                <q-btn flat round size="xs" color="black" icon="icon-fa-file-regular">
                  <q-menu dark style="min-width: 150px">
                    <q-list style="min-width: 150px;">
                      <q-item clickable v-close-popup @click="viewCetakDataNpdls(props?.row)">
                        <q-item-section>Cetak SP3B</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="deleteData(props?.row)">
                        <q-item-section>Delete SP3B</q-item-section>
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
  </div>
  <cetak-sp3b v-model="store.dialogCetak" :datarow="datarow" />
</template>
<script setup>
import { useQuasar } from 'quasar';
import { formattanpaRp } from 'src/modules/formatter';
import { useSp3bStore } from 'src/stores/siasik/akuntansi/sp3b/sp3b';
import { defineAsyncComponent, onMounted, ref } from 'vue';

const CetakSp3b = defineAsyncComponent(() => import('./DialogCetak.vue'))
const store = useSp3bStore()
const $q = useQuasar()

const clearSearch = () => {
  store.reqs.q = ''

}
onMounted(() => {
  store.getList()
})
const listdata = [
  {
    label: 'No. SP3B',
    name: 'nosp3b',
    field: 'nosp3b',
    align: 'center',
  },
  {
    label: 'Tanggal',
    name: 'tanggal',
    field: 'tanggal',
    align: 'center',
  },
  {
    label: 'Pendapatan',
    name: 'pendapatan',
    field: 'pendapatan',
    align: 'center',
  },
  {
    label: 'Realisasi',
    name: 'realisasi',
    field: 'realisasi',
    align: 'center',
  },
  {
    label: 'Pembiayaan',
    name: 'pembiayaan',
    field: 'pembiayaan',
    align: 'center',
  },
  {
    label: 'Aksi',
    name: 'aksi',
    align: 'center',
    headerStyle: 'width: 77px;'
  }
]
const columnsp3b = ref(listdata)

const datarow = ref(null)
function viewCetakDataNpdls(row) {
  // console.log('roow', row)
  store.dialogCetak = true
  datarow.value = row
  store.viewData = datarow.value
}

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
      nosp3b: row.nosp3b,
    }
    console.log('payload', payload)
    store.deleteData(payload).then(() => {
      store.loading = true
      store.refreshTable()
    })
  }).onCancel(() => {
    console.log('Cancel')
    selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>
<style lang="scss">
.my-stickey-table {


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
