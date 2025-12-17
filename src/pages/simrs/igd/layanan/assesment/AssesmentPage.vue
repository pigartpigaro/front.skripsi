<template>
  <div class="column full-height q-ma-sm" style="overflow: hidden;">
    <div class="column full-height">
      <div class="col-auto bg-red">
        <q-tabs v-model="store.tab" no-caps inline-label class=" bg-grey-4 shadow-2 text-grey-8" align="left" dense
          active-color="yellow" active-bg-color="primary">
          <q-tab v-for="(item, i) in store.tabs" :key="i" :name="item" :label="item"
            style="border-top-left-radius: 100px;border-bottom-right-radius: 100px;width: 100%;" />
        </q-tabs>
      </div>
      <div class="col full-height" style="overflow: hidden;">
        <q-tab-panels v-model="store.tab" animated class="full-height">
          <q-tab-panel name="Diagnosa Medik" class="full-height q-pa-none">
            <DiagnosaPage :pasien="props.pasien" :tipekhasusdiagnosa="store.listkhasusdiagnosa" />
          </q-tab-panel>
          <q-tab-panel name="Rencana Terapi Dokter" class="full-height q-pa-none">
            <RencanaTerapaiDokterPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel name="Tindakan Medik" class="full-height q-pa-none">
            <TindakanPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel name="Diagnosa Keperawatan" class="full-height q-pa-none">
            <DiagnosaKeperawatanPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel name="Diagnosa Kebidanan" class="full-height q-pa-none">
            <DiagnosaKebidananPage :pasien="props.pasien" />
          </q-tab-panel>
          <q-tab-panel name="Pra Anastesi" class="full-height q-pa-none">
            <PraAnastesiPage :pasien="props.pasien" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePengunjungIgdStore } from 'src/stores/simrs/igd/pengunjung'
// import { useInacbgPoli } from 'src/stores/simrs/pelayanan/poli/inacbg'
import DiagnosaPage from '../assesment/diagnosa/DiagnosaPage.vue'
import TindakanPage from '../assesment/tindakan/TindakanPage.vue'
import DiagnosaKeperawatanPage from './diagnosakeperawatan/DiagnosaKeperawatanPage.vue'
import DiagnosaKebidananPage from './diagnosakebidanan/DiagnosaKebidananPage.vue'
import PraAnastesiPage from './praanastesi/PraAnastesiPage.vue'
import RencanaTerapaiDokterPage from './rencanatrapidokter/RencanaTerapaiDokterPage.vue'

import { onMounted } from 'vue'
import { useDiagnosaDokter } from 'src/stores/simrs/igd/diagnosadokter'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePengunjungIgdStore()
const storetindakan = useDiagnosaDokter()

// const inacbg = useInacbgPoli()
onMounted(() => {
  // console.log('tabs', store.tabs)
  // store.getNota(props.pasien)
  storetindakan.getNota(props.pasien)
  store.getTipeDiagnosa()
})

</script>
