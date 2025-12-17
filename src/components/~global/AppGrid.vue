<script setup>
import { computed } from 'vue'

const props = defineProps({
  cols: {
    type: [Number, Object], // { default: 1, sm: 2, md: 4, lg: 6 }
    default: 1
  },
  rows: {
    type: [Number, Object], // { default: 1, sm: 2, md: 4, lg: 6 }
    default: undefined
  },
  gap: {
    type: [Number, String],
    default: 16
  }
})

const classCols = computed(() => {
  if (typeof props.cols === 'number') {
    return [`grid-cols-${props.cols}`]
  }

  const classes = []
  for (const key in props.cols) {
    const val = props.cols[key]
    classes.push(`grid-${key}-cols-${val}`)
  }
  return classes
})

const classRows = computed(() => {
  if (!props.rows) return []
  if (typeof props.rows === 'number') {
    return [`grid-rows-${props.rows}`]
  }

  const classes = []
  for (const key in props.rows) {
    const val = props.rows[key]
    classes.push(`grid-${key}-rows-${val}`)
  }
  return classes
})

const gapSize = computed(() => {
  return typeof props.gap === 'number' ? `${props.gap}px` : props.gap
})
</script>

<template>
  <div class="grid" :class="[classCols, classRows]" :style="{ gap: gapSize }">
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>
