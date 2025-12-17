<template>
  <div class="row fit relative-position">
    <div class="absolute-top columm fit q-pa-xs">
      <div class="col-auto">
        <q-tabs v-model="tab" dense no-caps inline-label narrow-indicator indicator-color="transparent" align="left"
          class=" glassmo text-grey-8" active-color="white" active-bg-color="primary">
          <q-tab v-for="tb in tabs" :key="tb.name" :ripple="true" :name="tb?.name" content-class="tab-classes">
            <template #default>
              <div class="row q-gutter-x-xs items-center q-px-sm" style="border-radius: 10px;">
                <q-icon :name="tb?.icon" size="18px" />
                <div><strong>{{ tb?.label }}</strong></div>
              </div>
            </template>
          </q-tab>
        </q-tabs>
      </div>
      <div class="col full-height">
        <q-tab-panels v-model="tab" animated class="bg-transparent q-pa-none relative-position fit">
          <q-tab-panel ref="refPanel" :name="menu?.name" class="q-pa-none"
            style="overflow: hidden; max-height: calc(100vh - 95px);">
            <component :is="menu?.comp" :pasien="store?.pasien" :nakes="nakes" />
          </q-tab-panel>
        </q-tab-panels>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useListPasienHemodialisaStore } from 'src/stores/simrs/hemodialisa/hemodialisa'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const auth = useAplikasiStore()
const store = useListPasienHemodialisaStore()
const props = defineProps({
  headheight: {
    type: Number,
    default: 0
  }
})
const nakes = computed(() => {
  return auth?.user?.pegawai?.kdgroupnakes
})
const tab = ref('assement-harian')

const tabsxx = [
  {
    label: 'Assasement Harian', // ini isisnya Assasement awal, data tidak boleh tercampur dengan data ranap
    name: 'assement-harian',
    // icon: 'icon-my-human-back-svgrepo-com',
    nakes: ['1', '2'],
    comp: defineAsyncComponent(() => import('./anamnesis/IndexPage.vue'))
  },
  {
    label: 'Status Fungsional dan Skrining Jatuh',
    name: 'pengkajian',
    // icon: 'icon-mat-description',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./pengkajian/IndexPage.vue'))
  },
  {
    label: 'Pemeriksaan Fisik', // ini isinya pemeriksaan fisik, data tidak boleh tercampur dengan data ranap
    name: 'pemeriksaan-fisik',
    // icon: 'icon-my-human-back-svgrepo-com',
    nakes: ['1', '2'],
    comp: defineAsyncComponent(() => import('./pemeriksaan/IndexPage.vue'))
  },
  {
    label: 'Diagnosa Dan Tindakan',
    name: 'diagnosa-keperawatan',
    // icon: 'icon-my-human-back-svgrepo-com',
    nakes: ['1', '2'],
    comp: defineAsyncComponent(() => import('./diagnosaDanTindakan/IndexPage.vue'))
  },
  {
    label: 'Pemantauan Intridialitik',
    name: 'intridialitik',
    // icon: 'icon-my-stethoscope',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./intridialitik/IndexPage.vue'))
  },

]

const menu = computed(() => {
  const by = tab.value

  return tabs.value.find(i => i.name === by)
})

const tabs = computed(() => {
  return tabsxx.filter(i => i.nakes.includes(nakes.value))
})
const tingginya = computed(() => {
  console.log('head ti', props.headheight)
  return props.headheight
})
const refPanel = ref(null)
onMounted(() => {
  console.log('refPanel', refPanel.value.clientHeight)
  setTimeout(() => {
    console.log('tingginya', tingginya.value)
  }, 100)
  // console.log('head', props.headheight)
})
</script>

<style lang="scss" scoped>
.q-tab {
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;

}

.glassmo {

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(30px);
  z-index: 100;
}
</style>
