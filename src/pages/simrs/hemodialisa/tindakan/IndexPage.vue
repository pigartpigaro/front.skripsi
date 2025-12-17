<template>
  <q-dialog ref="refDialog" persistent :maximized="true" transition-hide="slide-right" @hide="lihatSebelumTertutup">
    <q-card v-if="pasien?.dokter !== '' || pasien?.dokter !== null" flat>
      <q-layout view="lHr Lpr lFf" container class="shadow-2 rounded-borders z-top">
        <q-header ref="refHeader" elevated class="bg-primary">
          <HeaderLayout :pasien="pasien" :loading-save-dpjp="store.loadingSaveGantiDpjp"
            :loading-finish="store.loadingTerima" @toggle-left-drawer="drawer = !drawer"
            @gantidpjp="(val) => store.gantiDpjp(val, pasien)" @layanan-selesai="store.setLayananSelesai(pasien)" />
        </q-header>
        <!-- LEFT DRAWER ======================================================================================-->
        <q-drawer v-model="drawer" elevated bordered show-if-above :width="230" :breakpoint="400">
          <LeftDrawer :key="pasien" :pasien="pasien" :menus="filterredMenus" :menu="menu"
            @click-menu="(val) => menuDiganti(val)" @history-pasien="historyPasien"
            @print-rekap="emits('printRekapBill')" @icare="getIcare" @show-profile="profile = !profile" />
        </q-drawer>

        <!-- RIGHT DRAWER ======================================================================================-->
        <q-drawer v-model="drawerRight" side="right" show-if-above overlay bordered :width="845" :breakpoint="500">
          <RightDrawer :key="pasien" :pasien="pasien" @close="drawerRight = false" />
        </q-drawer>

        <!-- CONTAINER ============================================================================================-->
        <q-page-container>
          <q-page class="contain bg-grey-3">
            <Suspense :key="menu.comp" timeout="0">
              <template #default>
                <div v-if="pasien?.dokter === '' || pasien?.dokter === null"
                  class="column full-height flex-center absolute-center z-top full-width"
                  style="background-color: black; opacity: .9;">
                  <div class="text-white">
                    Maaf, DPJP Pasien Ini Belum Ada ... Harap Input DPJP Terlebih dahulu
                  </div>
                </div>
                <component :is="menu.comp" v-else :key="pasien" :pasien="pasien" :loading-terima="store.loadingTerima"
                  :kasus="store?.jnsKasusPasien" :nakes="nakes" depo="rnp" :headheight='headerHeight' />
              </template>
              <template #fallback>
                <AppLoader />
              </template>
            </Suspense>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-card>

    <!-- dialogProfile -->
    <DialogProfile :key="pasien" v-model="profile" :pasien="pasien" />
  </q-dialog>
</template>

<script setup>
import LeftDrawer from './complayout/LeftDrawer.vue'
import RightDrawer from './complayout/RightDrawer.vue'
import HeaderLayout from './complayout/HeaderLayout.vue'
import DialogProfile from './DialogProfile.vue'
import { useInacbgPoli } from 'src/stores/simrs/pelayanan/poli/inacbg'
import { computed, defineAsyncComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref, shallowRef, watchEffect } from 'vue'

import { useQuasar } from 'quasar'

import { useListPasienHemodialisaStore } from 'src/stores/simrs/hemodialisa/hemodialisa'
import useLayanan from '../layanan/useLayanan'

const $q = useQuasar()

const hemodialisa = useListPasienHemodialisaStore()


const { filterredMenus, menu, store, nakes, menuDiganti } = useLayanan()

const drawer = ref(false)
const drawerRight = ref(false)
const profile = ref(false)
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const emits = defineEmits(['printRekapBill'])

function historyPasien () {
  drawerRight.value = !drawerRight.value
}
function getIcare () {
  // store.getDataIcare(props.pasien).then(resp => {
  //   if (resp) {
  //     console.log('anu', resp?.response?.url)
  //     window.open(resp?.response?.url, '_blank')
  //   }
  // })
}

function lihatSebelumTertutup () {
  hemodialisa.pasien = null
  hemodialisa.pageTindakan = true
}
const refHeader = ref(null)
const headerHeight = computed(() => {
  // console.log('refHeader', refHeader.value?.$el?.clientHeight)
  return refHeader.value?.$el?.clientHeight
})
onMounted(() => {
  // setTimeout(() => {
  //   headerHeight.value = refHeader.value?.$el?.clientHeight
  //   console.log('refHeader', headerHeight.value)

  // }, 100)
})
watchEffect(() => {
  // console.log('watch effect', store.loadingTerima)
  // if (store.loadingTerima === false) {
  //   inacbg.getDataIna(props.pasien)
  //   inacbg.setTotalTindakan(props.pasien)
  //   inacbg.setTotalLaborat(props.pasien)
  // }
})
</script>

<style lang="scss">
.contain {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  overflow: hidden;
}
</style>
