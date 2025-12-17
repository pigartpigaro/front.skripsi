<template>
  <q-page class="container--q-header q-pa-sm relative-position overflow-hidden">
    <div class="full-height full-width ">
      <div class="col-auto header">
        <HeaderComp @set-periode="setPeriode" @refresh="refreshData" @print="printReport" @export="exportToExcel"
          :loading-download="store.loadingDownload" />
      </div>
      <div class="col full-height relative-position">
        <div class="absolute-top full-height">
          <TableComp ref="tableRef" />
        </div>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { date } from 'quasar';
import { useLaporanLaboratStore } from 'src/stores/simrs/penunjang/laborat/laporan';
import { defineAsyncComponent, ref } from 'vue'

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const TableComp = defineAsyncComponent(() => import('./comp/TableComp.vue'))

const store = useLaporanLaboratStore()

const tableRef = ref(null)

function setPeriode(period) {
  // console.log('Period changed:', period)
  store.setPeriod(period)
}

function refreshData() {
  console.log('Refreshing data...')
}

function printReport() {
  console.log('Printing report...')
}

async function exportToExcel() {
  try {
    const month = date.formatDate(new Date(store.params.from), 'MM')
    const year = date.formatDate(new Date(store.params.from), 'YYYY')

    const filename = `Laporan_Laborat_${month}_${year}.xlsx`
    await store.downloadExcel(filename)
  } catch (error) {
    console.error('Export failed:', error)
  }
}
</script>

<style lang="scss" scoped>
// .q-page {
//   height: calc(100% - 140px);
// }</style>
