<template>
  <div class="full-height full-width">
    <q-scroll-area ref="scrollRef" class="full-height" @scroll="onScroll">
      <q-list separator>
        <transition-group name="list">
          <div class="q-pa-xs q-gutter-xs" v-for="(item, i) in prop?.kwitansi" :key="i">
            <q-list bordered class="rounded-borders" style="max-width: 1200px">
              <q-item-label header>{{ item?.nota }}</q-item-label>

              <q-item>
                <q-item-section top>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">[ {{ item?.noreg }} || {{ item?.norm }} ]</span>
                    <span class="text-grey-8"> - {{ item?.nama }} </span>
                  </q-item-label>
                  <q-item-label caption lines="1">
                    {{ item?.tgl_pembayaran }} || {{ item?.batal }}
                  </q-item-label>
                  <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                    <span class="cursor-pointer"> {{ formatRpDouble(item?.total) }}</span> || <q-badge outline
                      color="teal">{{
                        item?.nokwitansi }}</q-badge>
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <div v-if="item.batal === '1'" class="text-grey-8 q-gutter-xs">
                    <q-badge color="red">BATAL</q-badge>
                  </div>
                  <div v-else class="text-grey-8 q-gutter-xs">
                    <q-btn class="gt-xs" size="12px" flat dense round icon="icon-mat-print" />
                    <q-btn class="gt-xs" size="12px" flat dense round icon="icon-mat-delete" @click="batal(item)" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { formatRpDouble } from 'src/modules/formatter'

const scrollRef = ref(null)
const prop = defineProps({
  kwitansi: {
    type: Array,
    default: () => []
  }
})

function onScroll(info) {
  const { verticalPosition, verticalSize, verticalContainerSize } = info

  // Detect when scroll reaches bottom
  if (verticalPosition + verticalContainerSize >= verticalSize - 100) {
    // Trigger load more data here if needed
    console.log('Reached bottom of scroll')
  }
}

function batal(val) {
  console.log('batal', val)
}
</script>

<style scoped>
.full-height {
  height: 100%;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.q-scroll-area ::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.q-scroll-area {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
