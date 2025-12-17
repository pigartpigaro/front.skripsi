<template>
  <q-page>
    <Suspense>
      <AsyncComp />
      <template #fallback>
        <app-loader />
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent, onBeforeMount } from 'vue'

const AsyncComp = defineAsyncComponent(() => import('./MainPage.vue'))

</script>
