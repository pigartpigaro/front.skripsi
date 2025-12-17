<script setup lang="ts">
import { formatRp } from 'src/modules/formatter';
import { computed } from 'vue';

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const administrasi = computed(() => {
  const data = props?.pasien?.rs35x
  const hasil = {
    subtotal: parseInt(data?.rs7)
  }
  return hasil
})

defineExpose({
  administrasi
});
</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Administrasi
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        <!-- {{ formatRp(props?.pasien?.rs35x?.rs7) }} -->
        {{ formatRp(administrasi?.subtotal) }}
      </div>
    </div>
  </div>
</template>
