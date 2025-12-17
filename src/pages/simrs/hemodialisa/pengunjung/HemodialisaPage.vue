<template>
  <!-- <q-page> -->
  <q-page class="fit q-pa-md absolute">
    <template v-if="store.pasien">
      <!-- <DetailsPasien /> -->
      <page-tindakan :key="store.pasien" v-model="store.pageTindakan" :pasien="store.pasien"
        :loading-terima="store?.loadingTerima" />
    </template>
    <template v-else>
      <div class="fit column relative-position">
        <div class="col-auto">
          <HeaderComp />
        </div>
        <div class="col full-height">
          <template v-if="store.items?.length > 0">
            <transition-group appear enter-active-class="animated fadeIn faster"
              leave-active-class="animated fadeOut faster">
              <list-pasien v-if="!store.isViewList" key="list-pasien" :items="store.items" :loading="store.loading"
                @details="bukaTindakan" @kirimkesmix="kirimcasmix" />
              <thumbnail-view v-else key="thumbnail-view" :items="store.items" @details="bukaTindakan" />
            </transition-group>
          </template>
          <div v-else class="fit column flex-center">
            <div class="text-h4 q-mb-xs">
              🏷️
            </div>
            <div class="text-grey-8">
              Data Tidak Ditemukan
            </div>
          </div>
        </div>
        <div class="absolute-bottom z-top">
          <app-paginate-simple v-if="store.meta" :key="store.meta" :meta="store.meta" color="bg-grey-8"
            @go-to="store.setPage" />
        </div>
      </div>
    </template>
  </q-page>
  <!-- </q-page> -->
</template>

<script setup>
import HeaderComp from '../pengunjung/comp/HeaderComp.vue'
import ThumbnailView from '../pengunjung/comp/ThumbnailView.vue'

import { useListPasienHemodialisaStore } from 'src/stores/simrs/hemodialisa/hemodialisa'
import { onMounted } from 'vue'
import ListPasien from '../pengunjung/comp/ListPasien.vue'
// import DetailsPasien from '../pengunjung/comp/DetailsPasien.vue'
import PageTindakan from '../tindakan/IndexPage.vue'
import { usePenilaianHemodialisaStore } from 'src/stores/simrs/hemodialisa/penilaian'
import { useAnatommyHemodialisaStore } from 'src/stores/simrs/hemodialisa/anatomy'
import { useTindakanHemodialisaStore } from 'src/stores/simrs/hemodialisa/tindakan'
import { useDiagnosaHDStore } from 'src/stores/simrs/hemodialisa/diagnosa'
import { useLaboratPoli } from 'src/stores/simrs/pelayanan/poli/laborat'
import { useRadiologiPoli } from 'src/stores/simrs/pelayanan/poli/radiologi'
import { usePermintaanBankDarahHDStore } from 'src/stores/simrs/hemodialisa/bankdarah'
import { useDiagnosaKeperawatanHD } from 'src/stores/simrs/hemodialisa/diagnosaKeperawatan'
import { useQuasar } from 'quasar'
import { use } from 'echarts'

const store = useListPasienHemodialisaStore()
const penilaian = usePenilaianHemodialisaStore()
const anatomy = useAnatommyHemodialisaStore()
const tindakan = useTindakanHemodialisaStore()
const diagnosa = useDiagnosaHDStore()
const diagnosakeperawatan = useDiagnosaKeperawatanHD()
const $q = useQuasar()
const lab = useLaboratPoli()
const radiologi = useRadiologiPoli()
const bankdarah = usePermintaanBankDarahHDStore()
onMounted(() => {
  Promise.all([
    store.getDataTable(),
    penilaian.getMaster(),
    anatomy.getmasteranatomys(),

    tindakan.getTindakanDropdown(),
    diagnosa.getDiagnosaDropdown(),

    diagnosakeperawatan.getData(),


    lab.getMasterLaborat(),
    radiologi.getRadiologi(),
    radiologi.getJenisRadiologi(),
    bankdarah.getMaster(),

    store.getNakes(),
    store.getNonNakes(),
    store.getJenisKasus(),

  ])
})

function bukaTindakan(val) {
  console.log('buka tindakan', val)
  store.pasien = val
  store.terimapasien(val)
}

function kirimcasmix(val) {
  // console.log('kirimcasmix', val)
  if (!val?.status) {
    $q.notify({
      type: 'negative',
      title: 'Peringatan',
      message: 'INFO WARNING <b/> MAAF,<em><b>Pasien Ini Masih Belum Selese Palayanan</b></em>',
      html: true,
      timeout: 1000
    })
  } else {
    store.kirimpenjaminan(val)
  }
}

</script>

<style lang="scss" scoped>
.scroll {
  scrollbar-width: none;
  /* untuk Firefox */
}

.scroll::-webkit-scrollbar {
  display: none;
  /* untuk Chrome, Safari, dan Opera */
}
</style>
