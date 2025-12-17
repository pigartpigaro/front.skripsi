<template>
  <div>
    <Suspense>
      <!-- main content -->
      <AsyncComp />
      <!-- loading state -->
      <template #fallback>

      </template>
    </Suspense>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
// import ListLoading from './comp/ListLoading.vue';

const AsyncComp = defineAsyncComponent(() =>
  import('./KunjunganPage.vue')
)
</script>
