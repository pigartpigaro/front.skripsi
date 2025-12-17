<template>
  <div class="row bg-secondary text-white q-pa-sm">
    <div class="col-12 text-center">
      Halaman Memo Diagnosa

    </div>
  </div>
  <div class="row q-pa-md bg-white items-center">
    <div class="col-2">Memodiagnosa :</div>
    <dic class="col-10 text-center f-14 text-weight-bold">
      {{ pasien?.memodiagnosa }}

    </dic>
  </div>
</template>

<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
