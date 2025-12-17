<template>
  <q-select ref="refAuto" :options="optionx" :label="label" dense :outlined="outlined" hide-bottom-space no-error-icon
    input-debounce="500" emit-value map-options use-input fill-input hide-selected :option-value="optionValue"
    :option-label="optionLabel" :disable="disable" :loading="loading" lazy-rules :rules="[anotherValid]" behavior="menu"
    transition-show="jump-up" transition-hide="jump-down" :bottom-slots="hint !== null" @filter="filterFn"
    @new-value="createValue">
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
    <template v-if="hint" #hint>
      {{ props.hint }}
    </template>
  </q-select>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
const emits = defineEmits(['selected', 'onEnter'])
const props = defineProps({
  label: { type: String, default: 'Label' },
  disable: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  optionValue: { type: [Object, Array, String, Function], default: 'kode' },
  optionLabel: { type: [Object, Array, String, Function], default: 'nama' },
  outlined: { type: Boolean, default: true },
  valid: { type: Boolean, default: false },
  filterred: { type: Boolean, default: true },
  hint: { type: String, default: null },
  limit: { type: Number, default: 10 },
  url: { type: String, default: '/v1/simrs/farmasi/master/maping-bpjs' },
  filterBy: { type: String, default: 'name' },
  filterMin: { type: Number, default: 2 }
})
const refAuto = ref(null)
const optionx = ref([])

defineExpose({ refAuto })

async function filterFn (val, update, abort) {
  if (val?.length < props.filterMin) {
    abort()
    return
  }

  const param = {
    q: val,
    limit: props.limit ?? 10
  }

  const params = { params: param }

  const { data } = await api.get(props.url, params)
  console.log('data', data)

  update(() => {
    optionx.value = data?.data
  })

}

function anotherValid (val) {
  if (props.valid) {
    return true
  }
  return (val !== null && val !== '') || 'Harap diisi'
}

function createValue (val, done) {
  if (!props.filterred) {
    emits('onEnter', val)
    done(val)
  }
}
</script>

<style lang="scss" scoped>
.q-virtual-scroll__content {
  .q-item {
    min-height: 39px !important;
  }
}
</style>
