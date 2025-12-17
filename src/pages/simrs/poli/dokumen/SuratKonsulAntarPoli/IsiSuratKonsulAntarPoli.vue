<template>
  <div v-for="(item, i) in props?.pasien?.jawabankonsulbynoreg" :key="i">
    <div class="q-pa-md" style="max-width: 100%">
      <div class="row text-bold text-h6">
        <u>Pengantar Konsul Dari {{ item?.poli_asal?.rs2 }}</u>
      </div>
      <div class="row q-mt-sm">
        Dengan Hormat
      </div>
      <div class="row q-mt-sm">
        Mohon Bantuan DPJP untuk konsultasi masalah medik saat ini, Atas nama <span class="text-bold">{{
          props?.pasien?.nama }}</span>
        dengan kondisi :
      </div>
      <div class="row q-mt-sm text-bold">
        {{ item?.pertanyaan }}
      </div>
      <div class="row q-mt-sm">
        Terimakasih Atas Kerjasamanya
      </div>
    </div>

    <div class="q-pa-md" style="max-width: 100%">
      <div class="row text-bold text-h6">
        <u>Jawaban Dari {{ item?.poli_tujuan?.rs2 }}</u>
      </div>
      <div class="row q-mt-sm">
        Dengan Hormat
      </div>
      <div class="row q-mt-sm">
        Sesuai Permintaan konsultasi pada Pemeriksaan pasien, kami dapati saat ini
      </div>
      <div class="row q-mt-sm">
        Saran Tindakan medik / Pengobatan :
      </div>
      <div class="row q-mt-sm">
        {{ item?.jawaban ?? '-' }}
      </div>
    </div>
    <q-separator class="q-my-md" />
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// const jawabankonsul = computed(() => {
//   const data = props?.pasien?.jawabankonsulbynoreg
//   data.forEach(x => {

//   });
// })
</script>
