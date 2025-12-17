<template>
  <div class="q-pa-sm bg-grey-4 full-height scroll">
    <div v-for="item in items" :key="item.id" class="q-mb-md">
      <q-card flat bordered>


        <q-card-section>
          <div class="row q-col-gutter-md">
            <!-- Target Dokter -->
            <div class="col-12">
              <q-badge outline color="red" class="q-mb-sm">Target Dokter</q-badge>
              <div class="f-12">{{ item.targetdokter }}</div>
            </div>

            <!-- Rencana Terapi -->
            <div class="col-12">
              <q-badge outline color="red" class="q-mb-sm">Rencana Terapi</q-badge>
              <div class="f-12 whitespace-pre-line">{{ item.rencanaterapi }}</div>
            </div>

            <!-- Monitoring Pasien -->
            <div class="col-12">
              <q-badge outline color="red" class="q-mb-sm">Monitoring Pasien</q-badge>
              <div class="f-12">{{ item.monitoringpasien }}</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md absolute-top-right">
          <div class="row items-center justify-end text-grey-7">

            <div class="text-caption">
              {{ formatDate(item.tgl) }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>

import { computed } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const items = computed(() => {
  return props.pasien?.rencanaterapidokter ?? []
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>
