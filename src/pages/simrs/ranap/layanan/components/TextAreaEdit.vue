<template>
  <div @click="edit" class="editable-text" :class="{ 'editing': isEditing }">
    <textarea v-if="isEditing" v-model="editableText" @blur="save" class="editable-textarea" ref="inputRef"
      :rows="computedRows" @input="adjustRows"></textarea>
    <span v-else>
      <span v-if="!vHtml">{{ editableText }}</span>
      <span v-else v-html="getNewLine(editableText)"></span>
    </span>
  </div>
</template>

<script setup>
import { getNewLine } from 'src/modules/formatter';
import { ref, nextTick, computed } from 'vue';

const props = defineProps({
  modelValue: String,
  rows: { type: Number, default: 5 },
  vHtml: { type: Boolean, default: true },
});
const emit = defineEmits(['update:modelValue']);

const editableText = ref(props.modelValue || '-');
const isEditing = ref(false);
const inputRef = ref(null);

const computedRows = computed(() => {
  const lineCount = (editableText.value.match(/\n/g) || [])?.length + 1;
  const charCount = editableText.value?.length;
  return Math.min(20, Math.max(1, Math.max(lineCount, Math.ceil(charCount / 50))));
});

const edit = () => {
  isEditing.value = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

const save = () => {
  isEditing.value = false;
  editableText.value = editableText.value.trim() || '-';
  emit('update:modelValue', editableText.value);
};

const adjustRows = () => {
  if (inputRef.value) {
    inputRef.value.rows = computedRows.value;
  }
};
</script>

<style>
.editable-text {
  /* cursor: pointer; */
  padding: 1px 10px;
  border-radius: 6px;
}

.editing {
  border: 1px solid #d1d5db;
  border-color: #3b82f6;
}

.editable-textarea {
  width: 100%;
  min-width: 100%;
  /* padding: 4px; */
  border: none;
  outline: none;
  background: transparent;
  resize: vertical;
  min-height: 50px;
}
</style>
