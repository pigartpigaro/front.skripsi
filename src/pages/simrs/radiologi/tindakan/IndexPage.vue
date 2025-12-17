<template>
  <q-dialog ref="refDialog" persistent :maximized="true" transition-hide="slide-right" @hide="lihatSebelumTertutup">
    <q-card v-if="pasien?.dokter !== '' || pasien?.dokter !== null" flat>
      <q-layout view="lHr Lpr lFf" container class="shadow-2 rounded-borders z-top">
        <q-header elevated class="bg-primary">
          <HeaderLayout :pasien="pasien" :loading-save-dpjp="poli.loadingSaveGantiDpjp"
            :loading-finish="poli.loadingTerima" @toggle-left-drawer="drawer = !drawer"
            @gantidpjp="(val) => console.log(val)" @layanan-selesai="" />
        </q-header>
        <!-- LEFT DRAWER ======================================================================================-->
        <q-drawer v-model="drawer" elevated bordered show-if-above :width="230" :breakpoint="400">
          <LeftDrawer :key="pasien" :pasien="pasien" :menus="menus" :menu="menu" @click-menu="(val) => menuDiganti(val)"
            @history-pasien="historyPasien" @print-rekap="emits('printRekapBill')" @icare="getIcare"
            @show-profile="profile = !profile" />
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
                <component :is="menu.comp" v-else :key="pasien" :pasien="pasien" :loading-terima="poli.loadingTerima"
                  :depo="store.depo" />
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
// import LoaderPage from './LoaderPage.vue'
import { useInacbgPoli } from 'src/stores/simrs/pelayanan/poli/inacbg'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
// import { useMasterPemeriksaanFisik } from 'src/stores/simrs/master/poliklinik/pemeriksaanfisik'
import { defineAsyncComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref, shallowRef, watchEffect } from 'vue'
// import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
import { useQuasar } from 'quasar'

import { useListPasienRadiologiStore } from 'src/stores/simrs/radiologi/radiologi'
import { useRadiologiPoli } from 'src/stores/simrs/pelayanan/poli/radiologi'

const $q = useQuasar()

const store = useListPasienRadiologiStore()
// const store = useListPasienRadiologiStore()
const poli = usePengunjungPoliStore()
// const master = useMasterPemeriksaanFisik()
// const anamnesis = useAnamnesis()
const storeRadiologiPoli = useRadiologiPoli()


const fisik = usePemeriksaanFisik()
const drawer = ref(false)
const drawerRight = ref(false)
const profile = ref(false)
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  depo: {
    type: Object,
    default: null
  }
})
const emits = defineEmits(['printRekapBill'])

const menus = ref([
  {
    name: 'DetailPermintaanPage',
    label: 'Detail Permintaan',
    icon: 'icon-mat-medical_information',
    comp: shallowRef(defineAsyncComponent(() => import('./comptindakan/pagemenu/permintaan/IndexPage.vue')))
  },
  {
    name: 'e-resep-page',
    label: 'EResep',
    icon: 'icon-mat-receipt',
    comp: shallowRef(defineAsyncComponent(() => import('../../eresep/EresepPage.vue')))
  }
])
const menu = ref(menus.value[0])

// eslint-disable-next-line no-unused-vars
const inacbg = useInacbgPoli()
onMounted(() => {
  // console.log('pasien', props?.pasien)
  menu.value = menus.value[0]

  Promise.all([
    storeRadiologiPoli.getRadiologi(),
    storeRadiologiPoli.getJenisRadiologi()
  ]).then(() => {
    store.namaPemeriksaans = storeRadiologiPoli.namaPemeriksaans
    store.jenisPemeriksaans = storeRadiologiPoli.jenisPemeriksaans

    console.log('masterRad', store.namaPemeriksaans);
    console.log('jenisRad', store.jenisPemeriksaans);


  }).catch((err) => {
    // console.log('error', err)
  })

})

onBeforeMount(() => {
  menu.value = menus.value[0]
})

onBeforeUnmount(() => {
  menu.value = menus.value[0]
})

onUnmounted(() => {
  menu.value = menus.value[0]
})

function historyPasien() {
  drawerRight.value = !drawerRight.value
}
function getIcare() {
}

function lihatSebelumTertutup() {
  store.pasien = null
  store.pageTindakan = true
}

function menuDiganti(val) {
  if (menu.value.name === 'PemeriksaanPage') {
    if (fisik.edited) {
      // console.log('ada yg blm diupdate')
      harapSimpanPerubahanPemeriksaanFisik(val)
    }
    else {
      menu.value = val
    }
  }
  else {
    menu.value = val
  }
}

function harapSimpanPerubahanPemeriksaanFisik(val) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Perubahan Belum disimpan , Harap disimpan terlebih dahulu',
    cancel: true,
    persistent: true
  }).onOk(() => {
    console.log('OK')
    menu.value = menus.value[1]
  }).onCancel(() => {
    // console.log('Cancel')
    fisik.initReset(false, props?.pasien)
    // fisik.setNotEdit()
    menu.value = val
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

watchEffect(() => {
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
