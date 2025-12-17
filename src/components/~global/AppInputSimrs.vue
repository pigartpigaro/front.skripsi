<template>
  <q-input ref="appInputSimrs" borderless :label="label" label-slot :dense="type !== 'textarea'"
    :autogrow="type === 'textarea'" outlined standout="bg-yellow-3" :class="`q-mb-xs ${classTambahan}`"
    :autofocus="autofocus" :readonly="readonly" :disable="disable" :type="type"
    :rules="[requiredRule, minRule, maxRule, emailRule, isNumberRule]" :lazy-rules="lazyRules" :hide-bottom-space="true"
    @update:model-value="updatedModel" bottom-slots :error="!isValid" class="input-box"
    :bgColor="hasValue ? 'yellow-1' : ''">
    <!-- <template v-slot:label>
      {{ label }}
    </template> -->
    <template v-if="append" #append>
      <q-icon v-if="!appendBtn" :name="appendIcon" size="xs" class="cursor-pointer" v-ripple
        @click="emits('appendClick')" />
      <q-btn v-if="appendBtn" label="cek" outline color="primary" size="sm" v-ripple @click="emits('appendClick')" />
    </template>
    <template v-if="!isValid" v-slot:error>
      {{ errorMessage }}
    </template>
  </q-input>
</template>

<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
// const bg = ref(false)
const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  autofocus: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  },
  append: {
    type: Boolean,
    default: false
  },
  appendIcon: {
    type: String,
    default: 'icon-mat-close'
  },
  appendBtn: {
    type: Boolean,
    default: false
  },
  appendBtnLabel: {
    type: String,
    default: 'Cek'
  },
  classTambahan: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  valid: {
    type: Object,
    default: null
  },
  lazyRules: {
    type: [Boolean, String],
    default: true
  },
  hint: {
    type: String,
    default: null
  },
  errorFromServer: {
    type: [Array, Object, Boolean],
    default: null
  },
  errorMessage: {
    type: String,
    default: null
  },
  isError: {
    type: Boolean,
    default: false
  },



})

const emits = defineEmits(['appendClick', 'update:modelValue'])

const appInputSimrs = ref(null)

const hasValue = ref(false)

defineExpose({ appInputSimrs })


onMounted(() => {
  // console.log('ref', appInputSimrs.value);
})

watchEffect(() => {
  const el = appInputSimrs.value?.modelValue
  // console.log('el', el);

  if (el?.length > 0) {
    hasValue.value = true
  } else {
    hasValue.value = false
  }


})




const isValid = computed(() => {
  if (props.isError) {
    return false
  }
  return true
})




const requiredRule = (val) => {
  if (props.valid === null) {
    return true
  }
  if (props.valid?.canEmpty) {
    return true
  }
  return (!!val || props.valid?.required || val === 0) || 'Harap diisi'
}

const minRule = (val) => {
  if (props.valid === null) {
    return true
  }
  if (!props.valid?.min) {
    return true
  }
  return (val && val?.length >= parseInt(props.valid?.min)) || `Min ${props.valid?.min} char`
}

const maxRule = (val) => {
  if (props.valid === null) {
    return true
  }
  if (!props.valid?.max || val?.length === 0) {
    return true
  }
  return (val && val?.length <= parseInt(props.valid?.max)) || `Max ${props.valid?.max} char`
}

const emailRule = (val) => {
  if (props.valid === null) {
    return true
  }
  if (!props.valid?.email) {
    return true
  }
  return isValidMail(val) || 'email tidak valid'
}

const isNumberRule = (val) => {
  if (props.valid === null) {
    return true
  }
  if (!props.valid?.number) {
    return true
  }
  return (!isNaN(val) && !isNaN(parseFloat(val))) || 'Harus angka'
}

const isValidMail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val)
}

const updatedModel = (e) => {
  // console.log('updatedModel', e);

  emits('update:modelValue', e)

}

</script>

<style lang="scss" scoped>
.q-field--dense .q-field__bottom {
  display: none;
}

.q-field--error .q-field--highligted {
  background: none;
}
</style>
