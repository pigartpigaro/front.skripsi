<template>
  <q-dialog persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          {{ label }}
        </div>
      </q-card-section>

      <q-separator />
      <div style="max-height: 30vh; height:30vh; max-width: 30vw; width:30vw" class="scroll">
        <slot />
      </div>

      <q-separator />

      <q-card-actions align="right">
        <app-btn v-close-popup color="dark" :label="labelBtnClose" />
        <app-btn :label="labelBtnOk" @click="emits('onOk')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
const emits = defineEmits(['onOk'])
defineProps({
  label: {
    type: String,
    default: 'Dialog'
  },
  labelBtnOk: {
    type: String,
    default: 'Ok'
  },
  labelBtnClose: {
    type: String,
    default: 'Close'
  },
  size: {
    type: String,
    default: 'xl'
  }
})
</script>
