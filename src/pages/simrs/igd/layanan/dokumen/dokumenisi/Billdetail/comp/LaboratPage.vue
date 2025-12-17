<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Laborat
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(rincianlaborat?.total ?? 0) }}
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
            <tr v-for="(lab, l) in rincianlaborat?.xxx" :key="l">
              <td class="text-center ellipsis" style="max-width: 250px;">
                {{ lab?.nota }}
              </td>
              <td class="text-center" style="max-width: 150px;">
                {{ lab?.nama }}
              </td>
              <td class="text-right" style="max-width: 150px;">
                {{ formatRp(lab?.harga) }}
              </td>
              <td class="text-right">
                {{ formatRp(lab?.jumlah) }}
              </td>
              <td class="text-right">
                {{ formatRp(lab?.subtotal) }}
              </td>
            </tr>
            <tr class="bg-primary text-white">
              <td colspan="4" class="text-right">
                TOTAL :
              </td>
              <td class="text-right">
                {{ formatRp(rincianlaborat?.total) }}
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

const rincianlaborat = computed(() => {
  const data = props?.pasien?.laboratold
  const hasilglobal = []
  data?.forEach(x => {
    // console.log('data', x)
    if (x?.paket === '') {
      const hasil = {
        nama: x?.pemeriksaanlab?.rs2,
        paket: x?.paket,
        nota: x?.rs2,
        js: x?.rs6,
        jp: x?.rs13,
        harga: parseInt(x?.rs6) + parseInt(x?.rs13),
        jumlah: x?.rs5,
        subtotal: (parseInt(x?.rs6) + parseInt(x?.rs13)) * parseInt(x?.rs5)
      }
      hasilglobal.push(hasil)
    } else {
      // const uniqueMap = new Map();
      // data.forEach(item => uniqueMap.set(item.paket, item));
      const hasil = {
        nama: x?.paket,
        paket: x?.paket,
        nota: x?.rs2,
        js: x?.rs6,
        jp: x?.rs13,
        harga: parseInt(x?.rs6) + parseInt(x?.rs13),
        jumlah: x?.rs5,
        subtotal: (parseInt(x?.rs6) + parseInt(x?.rs13)) * parseInt(x?.rs5)
      }
      hasilglobal.push(hasil)
    }
  });
  const hasilx = hasilglobal;

  const uniqueDataglobal = [...new Map(hasilx.map(itemx => [`${itemx.nama}-${itemx.nota}`, itemx])).values()];
  const laboraturut = uniqueDataglobal.sort((a, b) => {
    if (a.nota === b.nota) {
      return a.nama.localeCompare(b.nama);
    }
    return a.nota.localeCompare(b.nota);
  });
  const laborat = {
    xxx: laboraturut,
    total: laboraturut.reduce((sum, item) => sum + Number(item.subtotal), 0)
  }

  return laborat
})

defineExpose({
  rincianlaborat
});

</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
