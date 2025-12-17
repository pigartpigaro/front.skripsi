<template>
  <q-list bordered separator>
    <q-item v-for="(item, i) in menus" :key="i" v-ripple clickable :active="menu === item"
      active-class="bg-primary text-white" @click="emits('menuClick', item)">
      <q-item-section avatar>
        <q-icon :name="item.icon" size="xs" />
      </q-item-section>
      <q-item-section>{{ item.label }}</q-item-section>
      <q-item-section v-if="item?.name === 'jawaban-konsul-page' && getCount > 0" side top>
        <q-badge color="red" floating class="q-mr-sm">{{ getCount }}</q-badge>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { computed } from 'vue'

const emits = defineEmits(['menuClick'])
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menus: {
    type: Array,
    default: () => []
  },
  menu: {
    type: Object,
    default: null
  }
})
const getCount = computed(() => {
  const jawaban = props?.pasien?.jawabankonsul?.filter((item) => item?.dibaca_poli_asal === null && item?.noreg_lama === props?.pasien?.noreg && item?.jawaban !== null)
  console.log('paeian', props?.pasien, jawaban)

  return jawaban?.length
}
)
</script>
