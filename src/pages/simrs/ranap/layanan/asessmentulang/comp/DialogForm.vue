<template>
  <q-dialog persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down" @show="onShow">
    <q-card class="bg-grey-4 column fit">
      <div class="bg-primary text-white col-auto">
        <div class="row justify-between items-center q-px-md q-py-xs">
          <div class="f-12">
            Form Assessment Ulang
          </div>
          <q-btn size="12px" dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </div>

        <q-card-section class="bg-grey-2">
          <div class="flex items-center justify-between">
            <div class="q-gutter-md">
              <q-btn rounded outline color="orange" icon="icon-mat-arrow_back" v-close-popup>
                <span class="text-orange-9 q-ml-sm">Kembali </span>
              </q-btn>


              <q-btn rounded outline color="primary" icon="icon-mat-dvr" @click="openLaborat = true">
                <span class="text-primary q-ml-sm">LABORAT</span>
              </q-btn>

              <q-btn rounded outline color="primary" icon="icon-my-human-hand-bones-svgrepo-com"
                @click="openRadiologi = true">
                <span class="text-primary q-ml-sm">RADIOLOGI</span>
              </q-btn>
            </div>
            <div class="flex q-gutter-md justify-end">
              <div class="text-black column text-right">
                <div class="f-14 text-bold">{{ pasien?.norm }} || {{ pasien?.nama_panggil }} </div>
                <div class="f-12">usia {{ pasien?.usia }}</div>
                <div class="f-12 text-primary">{{ pasien?.ruangan }}</div>
              </div>
              <div class="text-black">
                <app-avatar-pasien :pasien="pasien" width="40px" />
              </div>
            </div>
          </div>
        </q-card-section>
      </div>

      <q-card-section class="col full-height scroll q-pa-none">
        <FormSoap :pasien="pasien" :kasus="kasus" :nakes="nakes" @exit="emits('exit')" />
      </q-card-section>
    </q-card>

    <!-- dialog laborat -->
    <DialogLaborat v-model="openLaborat" :pasien="pasien" :nakes="nakes" />
    <DialogRadiologi v-model="openRadiologi" :pasien="pasien" :nakes="nakes" />
  </q-dialog>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import useForm from './useForm'


const FormSoap = defineAsyncComponent(() => import('./FormSoap.vue'))
const DialogLaborat = defineAsyncComponent(() => import('./dialogPenunjang/DialogLaborat.vue'))
const DialogRadiologi = defineAsyncComponent(() => import('./dialogPenunjang/DialogRadiologi.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: () => { }
  },
  kasus: {
    type: Object,
    default: () => { }
  },
  nakes: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['exit'])
const openLaborat = ref(false)
const openRadiologi = ref(false)

const { store } = useForm(props?.pasien)

// onMounted(() => {
//   store.getPreviousForm(props?.pasien)
// })

const onShow = () => {
  store.getPreviousForm(props?.pasien, props?.nakes)
}
</script>
