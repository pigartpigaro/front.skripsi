<template>
  <div v-if="store.items.length === 0" class="column full-height flex-center" style="min-height: 350px;">
    <app-no-data-small />
  </div>
  <div v-else>
    <q-list bordered separator>
      <q-item v-for="(item, i) in store.items" :key="item.id" clickable @click="store.selectItem(item)">
        <q-item-section side>{{ i + 1 }}.</q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">{{ item.name || '-' }}</q-item-label>
          <q-item-label caption>
            Tgl Pembuatan Surat : {{ dateFullFormat(item.tgl) || '-' }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="icon-mat-chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useTravellingHDStore } from 'src/stores/simrs/hemodialisa/travelling'
const store = useTravellingHDStore()
</script>
