<template>
  <div @click="edit" class="editable-text" :class="{ 'editing': isEditing }">
    <input v-if="isEditing" v-model="editableText" @blur="save" class="editable-input" :type="type" ref="inputRef"
      :style="{ width: inputWidth + 'px', maxWidth: '100%' }" />
    <span v-else>{{ editableText ? editableText : type === 'number' ? 0 : '-' }}</span>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
});
const emit = defineEmits(['update:modelValue']);

const editableText = ref(props.modelValue); // Sesuaikan tipe data berdasarkan modelValue
const isEditing = ref(false);
const inputRef = ref(null);
const inputWidth = ref(50);

const edit = () => {
  isEditing.value = true;
  nextTick(() => {
    adjustWidth();
    inputRef.value.focus();
  });
};

const save = () => {
  isEditing.value = false;
  // Trim dan konversi value sesuai tipe yang sesuai
  // Jika input adalah string, kita bisa trim
  if (props.type === 'string') {
    editableText.value = editableText.value.trim() || '-';
  }

  // editableText.value = editableText.value?.trim() || '-';
  if (props.type === 'number') {
    editableText.value = editableText.value === '' || editableText.value === null ? 0 : parseFloat(editableText.value); // Convert to number if it's a number input
  }
  emit('update:modelValue', editableText.value);
};

const adjustWidth = () => {
  if (inputRef.value) {
    const charWidth = 8; // Approximate width per character
    const padding = 5;
    const minWidth = Math.max(50, (editableText.value?.length ? editableText.value?.length : 1) * charWidth + padding);
    // const minWidth = 30;
    inputWidth.value = minWidth;
  }
};

// Watch the editableText to adjust the width dynamically
watch(editableText, adjustWidth);

// Sync with the prop's modelValue when it changes
watch(() => props.modelValue, (newValue) => {
  editableText.value = newValue !== undefined ? newValue : props.type === 'number' ? 0 : '-';
});
</script>

<style>
.editable-text {
  cursor: pointer;
  padding: 1px 5px;
  border-radius: 6px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
}

.editing {
  border: 1px solid #d1d5db;
  border-color: #3b82f6;
}

.editable-input {
  border: none;
  outline: none;
  background: transparent;
  max-width: 100%;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Untuk Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
