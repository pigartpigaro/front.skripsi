<template>
  <div class="row justify-between content-center full-width">
    <div class="col-auto q-pl-md flex-start">
      <q-img src="~assets/images/Pemkot.svg" style="height: 2.6cm; width: 2cm" />
    </div>
    <div class="flex-end justify-center content-center col full-width">
      <div class="row justify-center text-center text-weight-bold" style="font-size: 15px">
        PEMERINTAH KOTA PROBOLINGGO
      </div>
      <div class="row justify-center text-center text-weight-bold" style="font-size: 15px">
        DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
      </div>
      <div class="row justify-center text-center text-weight-bold" style="font-size: 15px">
        UOBK RSUD DOKTER MOHAMAD SALEH
      </div>
      <div class="row justify-center text-center text-weight-bold" style="font-size: 12px">
        Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335)
        432702
      </div>
      <div class="row justify-center text-center text-weight-bold q-pt-md" style="font-size: 13px">
        RENCANA BISNIS ANGGARAN
      </div>
      <div class="row justify-center text-center text-weight-bold">
        Tahun Anggaran {{ store.reqs.tahun }}
      </div>
    </div>
    <div class="col-auto">
      <q-img src="~assets/logos/logo-rsud.png" style="height: 2.6cm; width: 2.6cm" />
    </div>
  </div>
</template>
<script setup>
import { useRbaStore } from 'src/stores/siasik/anggaran/storerba';

const store = useRbaStore()
</script>
