<template>
  <div class="fit">
    <div v-if="store?.igdBefore === null" class="column full-height flex-center">
      Tidak Ada Data IGD Sebelumnya <br>
      Pasien Bukan Dari IGD
    </div>
    <div v-else class="column full-height">
      <!-- <ListAnamnesis :pasien="store.pasienIgd" :loadingaja="false" :key="store?.pasienIgd" :bisa-edit-hapus="false" /> -->
      <div class="col-auto">
        <q-tabs v-model="tab" dark dense class="bg-dark text-grey" active-color="white" indicator-color="white"
          align="justify">
          <q-tab name="keperawatan" label="Anamnesis" />
          <q-tab name="kebidanan" label="Anamnesis Kebidanan" />
          <!-- <q-tab name="movies" label="Movies" /> -->
        </q-tabs>
      </div>
      <div class="col full-height">
        <q-tab-panels v-model="tab" animated class="full-height">
          <q-tab-panel name="keperawatan" class="full-height q-pa-none">
            <ListAnamnesis :pasien="store.pasienIgd" :loadingaja="false" :key="store?.pasienIgd"
              :bisa-edit-hapus="false" />
          </q-tab-panel>

          <q-tab-panel name="kebidanan" class="full-height q-pa-none">
            <ListAnamnesisKebidanan :pasien="store.pasienIgd" :loadingaja="false" :key="store?.pasienIgd"
              :bisa-edit-hapus="false" />
          </q-tab-panel>

          <!-- <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel> -->
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHistoryPasienRanapStore } from 'src/stores/simrs/ranap/history'
import { defineAsyncComponent, ref } from 'vue'

const ListAnamnesis = defineAsyncComponent(() => import('src/pages/simrs/igd/layanan/anamnesis/comanamnesis/ListAnamnesis.vue'))
const ListAnamnesisKebidanan = defineAsyncComponent(() => import('src/pages/simrs/igd/layanan/anamnesis/comanamnesis/ListAnamnesisKebidanan.vue'))

const store = useHistoryPasienRanapStore()
const tab = ref('keperawatan')
</script>
