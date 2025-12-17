<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Bank Darah
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(rincianbankdarah?.total) }}
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
                No. Kantong
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
            <tr v-for="(bdrs, r) in rincianbankdarah?.xxx" :key="r">
              <td class="text-center ellipsis" style="max-width: 250px;">
                {{ bdrs?.nota }}
              </td>
              <td class="text-center" style="max-width: 150px;">
                {{ bdrs?.nomorkantong }}
              </td>
              <td class="text-right" style="max-width: 150px;">
                {{ formatRp(bdrs?.harga) }}
              </td>
              <td class="text-right">
                {{ formatRp(bdrs?.jumlah) }}
              </td>
              <td class="text-right">
                {{ formatRp(bdrs?.subtotal) }}
              </td>
            </tr>
            <tr class="bg-primary text-white">
              <td colspan="4" class="text-right">
                TOTAL :
              </td>
              <td class="text-right">
                {{ formatRp(rincianbankdarah?.total) }}
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

const rincianbankdarah = computed(() => {
  const data = props?.pasien?.bankdarahtrans
  const hasilglobal = []
  data?.forEach(x => {
    const hasil = {
      nota: x?.rs3,
      nomorkantong: x?.rs5,
      harga: x?.subtotal,
      jumlah: 1,
      subtotal: parseInt(x?.subtotal) * 1
    }
    hasilglobal.push(hasil)
  });
  const bankdarahurut = hasilglobal.sort((a, b) => {
    if (a.nota === b.nota) {
      return a.nomorkantong.localeCompare(b.nomorkantong);
    }
    return a.nota.localeCompare(b.nota);
  });
  const bankdarah = {
    xxx: bankdarahurut,
    total: bankdarahurut.reduce((sum, item) => sum + Number(item.subtotal), 0)
  }
  return bankdarah
})

defineExpose({
  rincianbankdarah
});
</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
