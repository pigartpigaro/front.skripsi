<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Kamar Jenazah
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(rinciankamarjenazah?.total) }}
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
            <tr v-for="(kamarjenazah, km) in rinciankamarjenazah?.xxx" :key="km">
              <td class="text-center ellipsis" style="max-width: 250px;">
                {{ kamarjenazah?.nota }}
              </td>
              <td class="text-center" style="max-width: 150px;">
                {{ kamarjenazah?.tindakan }}
              </td>
              <td class="text-right" style="max-width: 150px;">
                {{ formatRp(kamarjenazah?.harga) }}
              </td>
              <td class="text-right">
                {{ formatRp(kamarjenazah?.jumlah) }}
              </td>
              <td class="text-right">
                {{ formatRp(kamarjenazah?.subtotal) }}
              </td>
            </tr>
            <tr class="bg-primary text-white">
              <td colspan="4" class="text-right">
                TOTAL :
              </td>
              <td class="text-right">
                {{ formatRp(rinciankamarjenazah?.total) }}
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

const rinciankamarjenazah = computed(() => {
  const data = props?.pasien?.kamarjenazah
  const hasilglobal = []
  data?.forEach(x => {
    const hasil = {
      nota: x?.rs2,
      tindakan: x?.pelayananjenazah?.rs2,
      harga: parseInt(x?.rs6) + parseInt(x?.rs7),
      jumlah: x?.rs8,
      subtotal: parseInt(x?.subtotal) * parseInt(x?.rs8)
    }
    hasilglobal.push(hasil)
  });
  const kamarjenazahurut = hasilglobal.sort((a, b) => {
    if (a.nota === b.nota) {
      return a.tindakan.localeCompare(b.tindakan);
    }
    return a.nota.localeCompare(b.nota);
  });
  const kamarjenazah = {
    xxx: kamarjenazahurut,
    total: kamarjenazahurut.reduce((sum, item) => sum + Number(item.subtotal), 0)
  }

  return kamarjenazah
})
defineExpose({
  rinciankamarjenazah
});
</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
