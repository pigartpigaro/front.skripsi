<template>
  <div class="row justify-between full-width">
    <div class="col-2 flex-start">
      <div class="row justify-center">
        <q-img src="~assets/images/logo_kota_original.png" spinner-color="white" style="height: 3.3cm; width: 2.6cm" />
      </div>
    </div>
    <div class="col-6">
      <div class="row justify-center text-center text-h6">
        PEMERINTAH KOTA PROBOLINGGO
      </div>
      <div class="row justify-center text-center text-h7 text-weight-bold">
        DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
      </div>
      <div class="row justify-center text-center text-h5 text-weight-bold">
        UOBK RSUD DOKTER MOHAMAD SALEH
      </div>
      <div class="row justify-center text-center text-h8">
        Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335)
        432702
      </div>
      <div class="row justify-center text-center text-h8 text-weight-bold">
        PROBOLINGGO 67219
      </div>
    </div>
    <div class="col-2 flex-end">
      <div class="row justify-center">
        <q-img src="~assets/logos/logo-rsud.png" spinner-color="white" style="height: 3cm; width: 3cm" />
      </div>
    </div>

    <div class="full-width q-pt-md">
      <div class="row justify-center text-weight-bold">
        Buku Kas Umum Pelaksana Teknis Kegiatan
      </div>
      <div class="row justify-center text-weight-bold">
        Periode Bulan {{ bulan(store.params.bulan) }} {{ store.params.tahun }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { useLaporanBkuPtkStore } from 'src/stores/siasik/laporan/bku/bkuptk';

const store = useLaporanBkuPtkStore()
function bulan(val) {
  const bulan = store.bulans.find((x) => x.value === val)
  return bulan?.nama ?? '-'
}

</script>
