<template>
  <q-select :dense="dense" standout="bg-yellow-3 text-black" outlined :label="label" :option-label="optionLabel"
    :placeholder="placeholder" :option-value="optionValue" :options="optionx" use-input :use-chips="useChips"
    map-options emit-value input-debounce="0" hide-bottom-space hide-dropdown-icon @filter="filterFn"
    :rules="[requiredRule]" @update:model-value="(val) => emits('setModel', val)" @new-value="createValue"
    :multiple="multiple" />
</template>
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  valid: {
    type: Object,
    default: null
  },
  optionValue: {
    type: String,
    default: 'id'
  },
  optionLabel: {
    type: String,
    default: 'name'
  },
  minLength: {
    type: Number,
    default: 2
  },
  filtersBy: {
    type: Array,
    default: () => ['name']
  },
  useChips: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: 'Harap Enter'
  },
  dense: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['setModel'])

const optionx = ref(props.options)

onMounted(() => {
  optionx.value = props.options
})

const requiredRule = (val) => {
  if (props.valid === null) {
    return true
  }
  return (!!val || props.valid?.required || val === 0) || 'Harap diisi'
}

const filterFn = (val, update, abort) => {
  if (val?.length < props.minLength) {
    abort()
    return
  }
  update(() => {
    const needle = val?.toLowerCase()
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) =>
        filterKeys.some(
          (key) =>
            item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
            item[key]
        )
      )
    const filteredData = multiFilter(props.options, props.filtersBy, needle)
    optionx.value = filteredData
  })
}

const createValue = (val, done) => {
  // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
  // and it resets the input textbox to empty string
  // ----
  // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
  // only if is not already set
  // and it resets the input textbox to empty string
  // ----
  // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
  // (adds to model if not already in the model, removes from model if already has it)
  // and it resets the input textbox to empty string
  // ----
  // If "var" content is undefined/null, then it doesn't tampers with the model
  // and only resets the input textbox to empty string

  if (val?.length > 2) {
    if (!props.options.includes(val)) {
      done(val, 'add-unique')
    }
  }
}
</script>
