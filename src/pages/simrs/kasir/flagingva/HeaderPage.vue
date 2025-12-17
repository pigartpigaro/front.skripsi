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
      <q-select v-model="txt" dense outlined dark color="white" :options="txts" label="status pembayaran va"
        class="q-ml-sm" emit-value map-options style="min-width: 150px;" @update:model-value="gantiStatus" />
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
import { useFlagingVaStore } from 'src/stores/simrs/kasir/va/flagingva'
const store = useFlagingVaStore()
const txt = ref('BELUM TERBAYAR')
const txts = ref(['SEMUA', 'BELUM TERBAYAR', 'SUDAH TERBAYAR'])
const periode = ref(1)
const to = ref(dateDbFormat(new Date()))
const from = ref(dateDbFormat(new Date()))
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'setPeriode', 'refresh', 'filter'])


function gantiStatus(val) {
  console.log('val', val)
  if (val === 'BELUM TERBAYAR') {
    store.params.status = ''
  } else if (val === 'SUDAH TERBAYAR') {
    store.params.status = '1'
  } else {
    store.params.status = 'all'
  }
  store.getDataVa()
}

onMounted(() => {
  store.getDataVa()
})
</script>
