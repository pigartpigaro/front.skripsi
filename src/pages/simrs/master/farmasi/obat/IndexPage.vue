<template>
  <q-page>
    <Suspense>
      <!-- main content -->
      <AsyncComp />
      <!-- loading state -->
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

// INI YANG LAMA
// const AsyncComp = defineAsyncComponent(() =>
//   import('./TabelObat.vue')
// )

// INI YANG BARU
const AsyncComp = defineAsyncComponent(() =>
  import('./BARU/RoutePage.vue')
)
</script>
