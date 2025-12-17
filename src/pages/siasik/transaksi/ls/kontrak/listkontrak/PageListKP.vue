<template>
  <div class="container full-width full-height">
    <q-card class="items-center q-pa-sm full-width full-height">
      <div class="row">
        <ListData />
      </div>
      <!-- <div class="q-pt-md">
        <ListRincian />
      </div> -->
    </q-card>
  </div>

</template>
<script setup>
import { onBeforeMount } from 'vue';
import ListData from './ListKontrakPekerjaan.vue'
import { uselistKontrakPekerjaan } from 'src/stores/siasik/transaksi/ls/kontrak/listkontrak';
const store = uselistKontrakPekerjaan()
onBeforeMount(() => {
  // store.initReset(props.data)
  store.getInitialData()
})

</script>
