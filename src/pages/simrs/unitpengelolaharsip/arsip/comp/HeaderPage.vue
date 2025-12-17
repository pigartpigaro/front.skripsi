<template>
  <div class="row justify-between items-center q-pa-sm">
    <div class="row items-center">
      <div>
        <q-input v-model="store.params.q" placeholder="Cari Arsip ..." dense outlined dark color="white"
          style="min-width:200px" debounce="800" :loading="store.loading" @update:model-value="store.search">
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
        </q-input>
      </div>
      <div v-if="users === '' || users === null">
        <q-select v-model="store.params.bidangbagian" dense outlined dark color="white" :options="organisasi"
          label="Unit Pengelolah.." option-label="nama" option-value="kode" class="q-ml-sm" emit-value map-options
          style="min-width: 300px;" @update:model-value="getUnit" />
      </div>
      <!-- <q-select v-model="periode" dense outlined dark color="white" :options="periods" label="Periode" class="q-ml-sm"
        emit-value map-options style="min-width: 150px;" @update:model-value="gantiPeriode" />
      <q-select v-model="txt" dense outlined dark color="white" :options="txts" label="status pasien" class="q-ml-sm"
        emit-value map-options style="min-width: 150px;" @update:model-value="gantiTxt" /> -->
    </div>
    <div>
      <q-btn class="q-ml-sm" unelevated color="orange" flat size="sm" padding="xs" icon="icon-mat-add"
        @click="emits('tambaharsip')">
        <q-tooltip class="primary" :offset="[10, 10]">
          Tambah Data
        </q-tooltip>
      </q-btn>
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
import { computed, ref } from 'vue'
import { useUnitPengelolahArsipStore } from 'src/stores/simrs/unitpengelolaarsip/arsip'
const store = useUnitPengelolahArsipStore()
// const txt = ref('BELUM TERLAYANI')
// const txts = ref(['SEMUA', 'BELUM TERLAYANI', 'MASIH DILAYANI', 'SUDAH TERLAYANI'])
// const periode = ref(1)
// const to = ref(dateDbFormat(new Date()))
// const from = ref(dateDbFormat(new Date()))
const emits = defineEmits(['fullscreen', 'tambaharsip'])

const props = defineProps({
  users: {
    type: String,
    default: ""
  },
  organisasi: {
    type: Array,
    default: () => []
  },
})

function getUnit(val) {
  console.log('val', val)
  store.params.bidangbagian = val
  store.search()
}

// onMounted(() => {
//   store.getData()
// })
</script>
