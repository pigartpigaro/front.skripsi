<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
    :class="!style.componentfull ? 'q-pa-md' : 'q-pa-xs'"
  >
    <div class="col-auto">
      <PageHead
        v-if="!style.componentfull"
        :title="title"
        :subtitle="subtitle"
        :path="page.path"
        @togle-draw="togleDraw"
      />
    </div>
    <q-card
      flat
      class="col full-width full-height bg-grey-6"
      style="overflow: auto"
    >
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-card>
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled';
import PageHead from './PageHead.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const style = useStyledStore();
const pageRef = ref();
const page = useRoute();

// Mendefinisikan title dan subtitle berdasarkan meta rute atau fallback
const title = computed(() => page.meta?.title || 'FORM SERAHTERIMA');
const subtitle = computed(() => page.meta?.subtitle || 'Form Input Serahterima');

// Fungsi untuk toggle drawer (pastikan didefinisikan di parent atau store)
const togleDraw = () => {
  // Implementasi toggle drawer, misalnya melalui store atau emit
};
</script>

<style scoped>
.q-card {
  max-height: 100%;
}
</style>