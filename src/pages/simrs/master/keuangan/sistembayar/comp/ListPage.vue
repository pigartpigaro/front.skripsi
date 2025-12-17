<template>
  <div>
    <div v-if="!props?.listmaster?.length" class="column flex-center text-white" style="min-height:400px">
      No Data Available
    </div>
    <q-list v-else bordered class="rounded-borders bg-white" separator square>
      <q-item class="bg-primary text-white">
        <q-item-section style="max-width: 100px;">
          Kode
        </q-item-section>
        <q-item-section>Nama</q-item-section>
        <q-item-section>Jenis Sistem Bayar</q-item-section>
        <q-item-section side>
          #
        </q-item-section>
      </q-item>
      <q-item v-for="row in listmaster" :key="row?.id" v-ripple class="q-py-xs">
        <q-item-section style="max-width: 100px;">
          {{ row.rs1 }}
        </q-item-section>
        <q-item-section>{{ row.rs2 }}</q-item-section>
        <q-item-section>{{ getKode(row?.groups) }}</q-item-section>
        <q-item-section side>
          <div class="row q-gutter-xs">
            <q-btn flat icon="icon-mat-edit" size="sm" round color="primary" @click="emits('edit', row)" />
            <q-btn flat icon="icon-mat-delete" size="sm" round color="negative" @click="emits('delete', row?.rs1)" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script setup>
import { computed } from 'vue';


const props = defineProps({
  listmaster: {
    type: Array,
    default: () => []
  }
})

function getKode(x) {
  console.log(x);
  if (x === "1") {
    return "BPJS"; // BPJS
  } else if (x === "2") {
    return "UMUM"; // Umum
  } else {
    return "TAGIHAN"; // Tagihan
  }
}

const emits = defineEmits(['edit', 'delete'])
</script>
