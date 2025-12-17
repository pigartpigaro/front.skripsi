<template>
  <div>
    <div v-if="!props?.listmaster?.length" class="column flex-center text-white" style="min-height:400px">
      No Data Available
    </div>
    <q-list v-else bordered class="rounded-borders bg-white" separator square>
      <q-item class="bg-primary text-white">
        <q-item-section>
          Jenis Media
        </q-item-section>
        <q-item-section side>
          #
        </q-item-section>
      </q-item>
      <q-item v-for="row in listmaster" :key="row?.id" v-ripple class="q-py-xs">
        <q-item-section>
          {{ row.nama_media }}
        </q-item-section>
        <q-item-section side>
          <div class="row q-gutter-xs">
            <q-btn flat icon="icon-mat-edit" size="sm" round color="primary" @click="emits('edit', row)" />
            <q-btn flat icon="icon-mat-delete" size="sm" round color="negative" @click="emits('delete', row?.id)" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script setup>

const props = defineProps({
  listmaster: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['edit', 'delete'])
</script>
