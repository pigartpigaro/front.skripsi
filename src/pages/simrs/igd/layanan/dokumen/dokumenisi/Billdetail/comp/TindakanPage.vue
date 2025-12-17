<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Tindakan
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(rinciantindakan?.total) }}
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
            <tr v-for="(tin, t) in rinciantindakan?.xxx" :key="t">
              <td class="text-center ellipsis" style="max-width: 250px;">
                {{ tin?.nota }}
              </td>
              <td class="text-center" style="max-width: 150px;">
                {{ tin?.nama }}
              </td>
              <td class="text-right" style="max-width: 150px;">
                {{ formatRp(tin?.harga) }}
              </td>
              <td class="text-right">
                {{ formatRp(tin?.jumlah) }}
              </td>
              <td class="text-right">
                {{ formatRp(tin?.subtotal) }}
              </td>
            </tr>
            <tr class="bg-primary text-white">
              <td colspan="4" class="text-right">
                TOTAL :
              </td>
              <td class="text-right">
                {{ formatRp(rinciantindakan?.total) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter';
import { computed } from 'vue';

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const rinciantindakan = computed(() => {
  const data = props?.pasien?.tindakan
  // console.log('data', data)
  const hasilglobal = []
  data?.forEach(x => {
    const hasil = {
      nama: x?.mastertindakan?.rs2,
      nota: x?.rs2,
      js: x?.rs7,
      jp: x?.rs13,
      harga: parseInt(x?.rs7) + parseInt(x?.rs13),
      jumlah: x?.rs5,
      subtotal: (parseInt(x?.rs7) + parseInt(x?.rs13)) * parseInt(x?.rs5)
    }
    hasilglobal.push(hasil)
  });
  const tindakanurut = hasilglobal.sort((a, b) => {
    if (a.nota === b.nota) {
      return a.nama.localeCompare(b.nama);
    }
    return a.nota.localeCompare(b.nota);
  });
  const tindakan = {
    xxx: tindakanurut,
    total: tindakanurut.reduce((sum, item) => sum + Number(item.subtotal), 0)
  }
  return tindakan
})

defineExpose({
  rinciantindakan
});
</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
