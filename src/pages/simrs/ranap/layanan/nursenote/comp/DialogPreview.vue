<template>
  <q-dialog persistent>
    <q-card dark style="max-width: 60vw; width: 60vw">
      <q-card-section>
        <div class="text-h6">{{ content }}</div>
        <!-- <div class="f-12">olaaa</div> -->
      </q-card-section>

      <q-separator dark />

      <q-card-section style="max-height: 70vh ; height: 70vh ; " class="q-pa-none scroll">
        <!-- <div > -->
        <ListEresep v-if="content === 'Eresep'" :pasien="pasien" @on-selected="(val) => {
          // console.log('val', val);
          emit('onSelectedReseps', val)
        }" />
        <!-- </div> -->
      </q-card-section>

      <q-separator dark />

      <q-card-actions align="right">
        <q-btn dark label="Accept" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

// import { computed, ref } from 'vue';


const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  content: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['onSelectedReseps'])

// console.log('props', props?.pasien);


const ListEresep = defineAsyncComponent(() => import('./compDialogPreview/ListEresep.vue'))
</script>