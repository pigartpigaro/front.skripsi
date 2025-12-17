<template>
  <div class="row items-center justify-between title-page q-mb-md">
    <div class="flex items-center">
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
        <q-btn :outline="path !== '/siasik/ls/serahterima/formserahterima'" glossy size="md" color="teal"
          label="Form Serahterima" @click="goTo('/siasik/ls/serahterima/formserahterima')" />
        <q-btn :outline="path !== '/siasik/ls/serahterima/listserahterima'" glossy size="md" color="dark"
          label="List Serahterima" @click="goTo('/siasik/ls/serahterima/listserahterima')" />

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
