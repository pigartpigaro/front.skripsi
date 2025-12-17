<template>
  <div class="q-pa-md">
    * Pemeriksasan Radiologi
    <div>
      <div class="q-ma-sm text-bold" v-for="(item, i) in props.pasien?.radiologi" :key="i">
        {{ item?.rs4 }} <br>
      </div>
    </div>
    * Hasil Bacaan Radiologi
    <div>
      <div v-for="(item, x) in props.pasien?.hasilradiologi" :key="x">
        {{ item?.rs3 }}
      </div>
    </div>
  </div>
</template>
<script setup>


const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
