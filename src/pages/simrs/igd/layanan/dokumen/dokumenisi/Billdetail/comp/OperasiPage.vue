<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Kamar Operasi
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(rincianoktrans?.total) }}
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <table class="table q-ml-xl q-ma-sm">
          <thead>
            <tr>
              <th class="text-center">
                Nota
              </th>
              <th class="text-center">
                Tindakan
              </th>
              <th class="text-center">
                Harga
              </th>
              <th class="text-center">
                Jumlah
              </th>
              <th class="text-center">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ok, r) in rincianoktrans?.xxx" :key="r">
              <td class="text-center ellipsis" style="max-width: 250px;">
                {{ ok?.nota }}
              </td>
              <td class="text-center" style="max-width: 150px;">
                {{ ok?.nama }} {{ ok?.namax }}
              </td>
              <td class="text-right" style="max-width: 150px;">
                {{ formatRp(ok?.harga) }}
              </td>
              <td class="text-right">
                {{ formatRp(ok?.jumlah) }}
              </td>
              <td class="text-right">
                {{ formatRp(ok?.subtotal) }}
              </td>
            </tr>
            <tr class="bg-primary text-white">
              <td colspan="4" class="text-right">
                TOTAL :
              </td>
              <td class="text-right">
                {{ formatRp(rincianoktrans?.total) }}
              </td>
            </tr>
          </tbody>
        </table>
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

const rincianoktrans = computed(() => {
  const data = props?.pasien?.oktrans
  console.log('datax', data)
  const hasilglobal = []
  data?.forEach(x => {
    const hasil = {
      nota: x?.rs2,
      tindakan: x?.rs3,
      harga: parseInt(x?.rs5) + parseInt(x?.rs6) + parseInt(x?.rs7),
      jumlah: x?.rs8,
      subtotal: parseInt(x?.subtotal)
    }
    hasilglobal.push(hasil)
  });
  const oktransurut = hasilglobal.sort((a, b) => {
    if (a.nota === b.nota) {
      return a.tindakan.localeCompare(b.tindakan);
    }
    return a.nota.localeCompare(b.nota);
  });
  const oktrans = {
    xxx: oktransurut,
    total: oktransurut.reduce((sum, item) => sum + Number(item.subtotal), 0)
  }
  return oktrans
})

defineExpose({
  rincianoktrans
});
</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
