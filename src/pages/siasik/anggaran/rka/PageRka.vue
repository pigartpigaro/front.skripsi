<template>
  <div class="row items-center justify-between title-page">
    <div class="flex items-center q-pl-md">
      <div class="left">
        <div class="text-h6">
          RKA
        </div>
        <div class="f-12">
          <span>Rencana Kerja Anggaran</span>
        </div>
      </div>
    </div>
  </div>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormGet />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <template v-if="store.datarka?.length > 0 && store.reqs.jenisrka === '1'">
          <listData />
        </template>

        <template
          v-else-if="store.datarkapergeseran?.length > 0 && store.reqs.jenisrka === '2' || store.datarkaperubahan.length > 0 && store.reqs.jenisrka === '3'">
          <listDatapergeseran />
        </template>

        <!-- <template v-else-if="!store.datarka?.length && !store.datarkapergeseran?.length">
          <div class="row q-pa-md full-width text-subtitle1 flex-center">
            <q-icon class="q-pr-sm" size="sm" name="icon-mat-warning" />
            Data Tidak Ditemukan
          </div>
        </template> -->

        <template v-else>
          <div class="row q-pa-md full-width text-subtitle1 flex-center">
            <q-icon class="q-pr-sm" size="sm" name="icon-mat-warning" />
            Silahkan Pilih Parameter Dulu
          </div>
        </template>
      </div>
    </q-card>
  </div>
</template>
<script setup>
import { useRkaStore } from 'src/stores/siasik/anggaran/storerka';
import FormGet from './inpage/FormgetRka.vue'
import listData from './inpage/ListDataRKA.vue'
import listDatapergeseran from './inpage/ListDataRKApergeseran.vue'

const store = useRkaStore()



</script>
