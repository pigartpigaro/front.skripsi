<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Ambulan
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(rincianambulan?.subtotal) }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { computed } from 'vue'


const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const rincianambulan = computed(() => {
  const data = props?.pasien?.ambulantrans
  const hasil = {
    subtotal: data?.reduce((sum, item) => sum + Number(item.subtotal), 0)
  }
  return hasil
})

defineExpose({
  rincianambulan
});

</script>

<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
