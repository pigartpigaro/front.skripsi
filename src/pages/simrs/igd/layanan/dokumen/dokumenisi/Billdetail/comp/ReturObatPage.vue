<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Retur Obat
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(returobat?.total) }}
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <table class="table q-ml-xl q-ma-sm">
          <thead>
            <tr>
              <th class="text-center">
                No. Retur
              </th>
              <th class="text-center">
                No. Resep
              </th>
              <th class="text-center">
                Nama Obat
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
            <tr v-for="(retur, r) in returobat?.xxx" :key="r">
              <td class="text-center ellipsis" style="max-width: 250px;">
                {{ retur?.noretur }}
              </td>
              <td class="text-center" style="max-width: 150px;">
                {{ retur?.noresep }}
              </td>
              <td class="text-center" style="max-width: 150px;">
                {{ retur?.nama }}
              </td>
              <td class="text-right" style="max-width: 150px;">
                {{ formatRp(retur?.harga) }}
              </td>
              <td class="text-right">
                {{ formatRp(retur?.jumlah) }}
              </td>
              <td class="text-right">
                {{ formatRp(retur?.subtotal) }}
              </td>
            </tr>
            <tr class="bg-primary text-white">
              <td colspan="5" class="text-right">
                TOTAL :
              </td>
              <td class="text-right">
                {{ formatRp(returobat?.total) }}
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

const returobat = computed(() => {
  const data = props?.pasien?.newapotekrajalretur
  console.log('datadata', data)
  const hasilglobal = []
  data?.forEach(x => {
    const hasil = {
      noretur: x?.noretur,
      noresep: x?.noresep,
      rincian: x?.rinci,
    }
    hasil.rincian?.forEach(y => {
      const obat = {
        noretur: x?.noretur,
        noresep: x?.noresep,
        nama: y?.mobatnew?.nama_obat,
        harga: parseFloat(y?.harga_jual).toFixed(2),
        jumlah: y?.jumlah_retur,
        subtotal: parseFloat(y?.harga_jual).toFixed(2) * parseFloat(y?.jumlah_retur)
      }
      hasilglobal.push(obat)
    })
  });
  const returobaturut = hasilglobal.sort((a, b) => {
    if (a.noresep === b.noresep) {
      return a.nama.localeCompare(b.nama);
    }
    return a.noresep.localeCompare(b.noresep);
  });
  const returobat = {
    xxx: returobaturut,
    total: returobaturut.reduce((sum, item) => sum + Number(item.subtotal), 0)
  }
  console.log('returobat', returobat)
  return returobat
})

defineExpose({
  returobat
});

</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
