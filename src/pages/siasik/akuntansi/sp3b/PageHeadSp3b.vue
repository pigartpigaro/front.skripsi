<template>
  <div class="row items-center justify-between title-page q-mb-md">
    <div class="flex items-center">
      <!-- <div class="q-mr-md">
        <div class="f-16 text-weight-bold">
          Laporan AKUNTANSI
        </div>
      </div> -->
      <div class="left">
        <div class="text-h6">
          {{ title }}
        </div>
        <div class="f-12">
          <span>{{ subtitle }}</span>
        </div>
      </div>
    </div>

    <div class="row items-center">
      <q-btn-group outline>
        <q-btn :outline="path !== '/akuntansi/sp3b/form'" glossy size="md" color="black" label="Form SP3B"
          @click="goTo('/akuntansi/sp3b/form')" />
        <q-btn :outline="path !== '/akuntansi/sp3b/listdata'" glossy size="md" color="black" label="Data SP3B"
          @click="goTo('/akuntansi/sp3b/listdata')" />
        <!-- <q-btn :outline="path !== '/akuntansi/jurnal/postingjurnal'" glossy size="md" color="primary"
          label="Posting Jurnal" @click="goTo('/akuntansi/jurnal/postingjurnal')" /> -->
        <!-- <q-btn
          :outline="path!=='/akuntansi/laporan/lo'"
          glossy
          push
          color="teal"
          label="LO"
          size="md"
          @click="goTo('/akuntansi/laporan/lo')"
        />
        <q-btn
          :outline="path!=='/pendaftaran/igd/kunjungan'"
          glossy
          push
          color="deep-orange"
          label="Master  Pasien"
          size="md"
          @click="goTo('/pendaftaran/igd/kunjungan')"
        /> -->
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// const emits = defineEmits(['togleDraw'])
defineProps({
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  },
  path: {
    type: String,
    default: null
  }
})

function goTo(val) {
  console.log('sasa', val)
  router.push({ path: val, replace: true })
}

</script>
