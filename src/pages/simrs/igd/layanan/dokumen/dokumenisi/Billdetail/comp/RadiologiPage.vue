<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Radiologi
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(rincianradiologi?.total) }}
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
                Pemeriksaan
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
            <tr v-for="(radio, r) in rincianradiologi?.xxx" :key="r">
              <td class="text-center ellipsis" style="max-width: 250px;">
                {{ radio?.nota }}
              </td>
              <td class="text-center" style="max-width: 150px;">
                {{ radio?.nama }} {{ radio?.namax }}
              </td>
              <td class="text-right" style="max-width: 150px;">
                {{ formatRp(radio?.harga) }}
              </td>
              <td class="text-right">
                {{ formatRp(radio?.jumlah) }}
              </td>
              <td class="text-right">
                {{ formatRp(radio?.subtotal) }}
              </td>
            </tr>
            <tr class="bg-primary text-white">
              <td colspan="4" class="text-right">
                TOTAL :
              </td>
              <td class="text-right">
                {{ formatRp(rincianradiologi?.total) }}
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

const rincianradiologi = computed(() => {
  const data = props?.pasien?.transradiologi

  const hasilglobal = []
  data?.forEach(x => {
    console.log('data', x)
    const hasil = {
      nama: x?.relmasterpemeriksaan?.rs2,
      namax: x?.relmasterpemeriksaan?.rs3,
      nota: x?.rs2,
      js: x?.rs5,
      jp: x?.rs7,
      harga: parseInt(x?.rs5) + parseInt(x?.rs7),
      jumlah: x?.rs24,
      subtotal: (parseInt(x?.rs5) + parseInt(x?.rs7)) * parseInt(x?.rs24)
    }
    hasilglobal.push(hasil)
  });
  const radiologiurut = hasilglobal.sort((a, b) => {
    if (a.nota === b.nota) {
      return a.nama.localeCompare(b.nama);
    }
    return a.nota.localeCompare(b.nota);
  });
  const radiologi = {
    xxx: radiologiurut,
    total: radiologiurut.reduce((sum, item) => sum + Number(item.subtotal), 0)
  }
  return radiologi
})
defineExpose({
  rincianradiologi
});
</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
