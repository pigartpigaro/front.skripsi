<template>
  <div class="row justify-between items-center q-pa-sm">
    <div class="row items-center">
      <div>
        <q-input v-model="store.params.q" placeholder="Cari Pasien ..." dense outlined dark color="white"
          style="min-width:200px" debounce="800" :loading="store.loading" @update:model-value="store.search">
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
        </q-input>
      </div>
      <q-select v-model="store.params.bulan" dense outlined dark color="white" :options="periods" label="Bulan"
        class="q-ml-sm" emit-value map-options style="min-width: 150px;" @update:model-value="store.getData" />
      <q-select v-model="store.params.tahun" dense outlined dark color="white" :options="tahun" label="Tahun"
        class="q-ml-sm" emit-value map-options style="min-width: 150px;" @update:model-value="store.getData" />
      <q-select v-model="store.params.pelayanan" dense outlined dark color="white" :options="pelayanan"
        label="Pelayanan" class="q-ml-sm" emit-value map-options style="min-width: 150px;"
        @update:model-value="store.getData" />
    </div>
    <div>
      <q-btn class="q-ml-sm" unelevated color="orange" flat size="sm" padding="xs" icon="icon-mat-refresh"
        @click="store.refresh">
        <q-tooltip class="primary" :offset="[10, 10]">
          Refresh Data
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { dateDbFormat } from 'src/modules/formatter'
import { onMounted, ref } from 'vue'
import { useKlaimPenjaminanStore } from 'src/stores/simrs/penjaminan/klaim'
const store = useKlaimPenjaminanStore()
const tahun = ref([])
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'setPeriode', 'refresh', 'filter'])

const periods = ref([
  { value: 1, label: 'Januari' },
  { value: 2, label: 'Februari' },
  { value: 3, label: 'Maret' },
  { value: 4, label: 'April' },
  { value: 5, label: 'Mei' },
  { value: 6, label: 'Juni' },
  { value: 7, label: 'Juli' },
  { value: 8, label: 'Agustus' },
  { value: 9, label: 'September' },
  { value: 10, label: 'Oktober' },
  { value: 11, label: 'November' },
  { value: 12, label: 'Desember' },

])

const pelayanan = ref([
  { value: 1, label: 'IGD' },
  { value: 2, label: 'RAWAT JALAN' }
])


onMounted(() => {
  const tahunSekarang = new Date().getFullYear()
  const tahunMulai = 2024

  // Buat array tahun
  for (let i = tahunMulai; i <= tahunSekarang; i++) {
    tahun.value.push(i)
  }

  // const per = {
  //   bulan: bulan.value,
  //   tahun: tahun.value,
  // }
  // emits('setPeriode', per)
})

</script>
