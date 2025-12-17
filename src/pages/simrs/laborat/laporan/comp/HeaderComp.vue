<template>
  <div class="bg-primary q-pa-md">
    <div class="row items-center justify-between">
      <!-- Left side -->
      <div class="col-12 col-md-8">
        <div class="row q-col-gutter-md items-center">
          <div class="col-12 col-sm-4">
            <q-select v-model="yearSelected" :options="years" label="Tahun" outlined dense dark class="bg-primary"
              @update:model-value="gantiTahun" />
          </div>
          <div class="col-12 col-sm-4">
            <q-select v-model="periode" :options="periods" label="Bulan" outlined dense dark emit-value map-options
              class="bg-primary" @update:model-value="gantiPeriode" />
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="col-12 col-md-4 q-mt-sm-none">
        <div class="row justify-end q-gutter-sm">
          <q-btn flat color="white" icon="icon-mat-refresh" @click="emits('refresh')">
            <q-tooltip>Refresh Data</q-tooltip>
          </q-btn>
          <q-btn flat color="white" icon="icon-mat-download" @click="emits('export')" :loading="loadingDownload"
            :disable="loadingDownload">
            <q-tooltip>Export Excel</q-tooltip>
          </q-btn>
          <q-btn flat color="white" icon="icon-mat-print" @click="emits('print')">
            <q-tooltip>Cetak Laporan</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { date } from 'quasar'

const emits = defineEmits(['setPeriode', 'refresh', 'print', 'export'])

defineProps({
  loadingDownload: { type: Boolean, default: false }
})

const yearSelected = ref('')
const periode = ref(null)
const years = ref([])
const periods = ref([
  { value: 0, label: 'Januari' },
  { value: 1, label: 'Februari' },
  { value: 2, label: 'Maret' },
  { value: 3, label: 'April' },
  { value: 4, label: 'Mei' },
  { value: 5, label: 'Juni' },
  { value: 6, label: 'Juli' },
  { value: 7, label: 'Agustus' },
  { value: 8, label: 'September' },
  { value: 9, label: 'Oktober' },
  { value: 10, label: 'November' },
  { value: 11, label: 'Desember' }
])

function gantiTahun() {
  if (periode.value !== null) {
    emitPeriode()
  }
}

function gantiPeriode() {
  if (yearSelected.value) {
    emitPeriode()
  }
}

function emitPeriode() {
  const startDate = new Date(yearSelected.value, periode.value, 1)
  const endDate = new Date(yearSelected.value, periode.value + 1, 0)

  const period = {
    from: date.formatDate(startDate, 'YYYY-MM-DD'),
    to: date.formatDate(endDate, 'YYYY-MM-DD')
  }

  emits('setPeriode', period)
}

onMounted(() => {
  const currentYear = parseInt(date.formatDate(Date.now(), 'YYYY'))
  const yearList = []

  for (let i = 0; i < 5; i++) {
    yearList.push(currentYear - i)
  }

  years.value = yearList
  yearSelected.value = currentYear
  periode.value = parseInt(date.formatDate(Date.now(), 'M')) - 1


  emitPeriode()
})
</script>