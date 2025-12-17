<template>
  <q-dialog class="full-width q-mt-lg" @hide="hiddenDialog()" backdrop-filter="blur(4x)" persistent>
    <q-card style="min-width:50vw;">
      <q-card-section class="row items-center">
        <div class="column">
          <div class="f-14 text-weight-bold">
            Rincian Nota Dinas
          </div>
          <div class="f-10">
            Data Rincian Nota Dinas
          </div>
        </div>
        <q-space />
        <q-btn v-close-popup icon="icon-mat-clear" flat round dense />
      </q-card-section>
      <q-card-section>
        <q-table class="my-sticky-table" :rows="store.listrinci" :columns="columns" row-key="name" wrap-cells
          :disable="store.loading" :loading="store.loading" :rows-per-page-options="[0]" :rows-number="[0]">
          <template #body="props">
            <q-tr>
              <q-td key="nonpdls" :props="props">
                <q-badge color="green">
                  {{ props.row?.nonpdls }}
                </q-badge>
                <div>{{ props.row?.tglnpd }}</div>
              </q-td>
              <q-td key="kegiatan" :props="props">
                <q-badge color="teal">
                  {{ props.row?.bidang }}
                </q-badge>
                <span class="q-pl-sm">
                  <q-badge color="teal-9">
                    {{ props.row?.pptk }}
                  </q-badge>
                </span>
                <div>{{ props.row?.kegiatanblud }}</div>
              </q-td>
              <q-td key="nilai" :props="props">
                <q-badge size="18px" color="yellow" class="text-bold text-dark">
                  Jumlah : {{ formattanpaRp(props.row?.total) }}
                </q-badge>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>

import { formattanpaRp } from 'src/modules/formatter'
import { listdataNotadinasStore } from 'src/stores/siasik/transaksi/ls/notadinas/list'
import { ref } from 'vue'

const store = listdataNotadinasStore()

function hiddenDialog() {
  console.log('hidden dialog')
}
const rincidata = [
  {
    label: 'Nomer NPD-LS',
    name: 'nonpdls',
    field: row => [row.nonpdls, row.tglnpd]
  },
  {
    label: 'Kegiatan BLUD',
    name: 'kegiatan',
    field: row => [row.kegiatanblud, row.koderek108]
  },
  {
    label: 'Nilai',
    name: 'nilai',
    field: row => [row.total]
  }
]
const columns = ref(rincidata)
</script>

<style lang="scss">
.my-sticky-table {
  height: 510px;

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
