<template>
  <div>
    <div class="row q-gutter-sm q-mr-lg items-center no-wrap ">
      <div class="col-10 text-bold">
        Obat
      </div>
      <div class="col-2 garis-bawah-dablue text-right text-bold">
        {{ formatRp(rincianobat?.total) }}
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <table class="table q-ml-xl q-ma-sm">
          <thead>
            <tr>
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
            <tr v-for="(obat, o) in rincianobat?.xxx" :key="o">
              <td class="text-center ellipsis" style="max-width: 250px;">
                {{ obat?.nota }} {{ obat?.keterangan }}
              </td>
              <td class="text-center" style="max-width: 150px;">
                {{ obat?.nama }}
              </td>
              <td class="text-right" style="max-width: 150px;">
                {{ formatRp(obat?.harga) }}
              </td>
              <td class="text-right">
                {{ formatRp(obat?.jumlah) }}
              </td>
              <td class="text-right">
                {{ formatRp(obat?.subtotal) }}
              </td>
            </tr>
            <tr class="bg-primary text-white">
              <td colspan="4" class="text-right">
                TOTAL :
              </td>
              <td class="text-right">
                {{ formatRp(rincianobat?.total) }}
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

const rincianobat = computed(() => {
  const data = props?.pasien?.newapotekrajal
  console.log('data', data)
  const hasilglobal = []
  const racikanr = []
  data?.forEach(x => {
    const hasil = {
      nota: x?.noresep,
      nama: x?.rincian,
      namaracikan: x?.rincianracik,
    }
    hasil.nama?.forEach(y => {
      const obat = {
        nota: x?.noresep,
        nama: y?.mobat?.nama_obat,
        harga: parseFloat(y?.harga_jual).toFixed(2),
        jumlah: y?.jumlah,
        keterangan: 'non racikan',
        nilai_r: parseFloat(y?.nilai_r),
        subtotal: parseFloat(y?.harga_jual).toFixed(2) * parseFloat(y?.jumlah) + parseFloat(y?.nilai_r)
      }
      console.log('obat', obat)
      hasilglobal.push(obat)
    })
    const racikanMap = new Map();
    hasil.namaracikan?.forEach(y => {
      const key = `${y.noresep}-${y.namaracikan}`;
      if (!racikanMap.has(key)) {
        racikanMap.set(key, y.nilai_r);
        // racikanr.push({ nama: key, r: y.nilai_r })
        racikanr.push(y.nilai_r)
      }
      console.log('racikan', racikanMap.set(key, y.nilai_r))
      // const totalNilaiR = Array.from(racikanMap.values()).reduce((sum, value) => sum + value, 0);
      //const totalNilaiR = racikanMap?.value

      const obat = {
        nota: x?.noresep,
        nama: y?.mobat?.nama_obat,
        harga: parseFloat(y?.harga_jual).toFixed(2),
        jumlah: y?.jumlah,
        keterangan: y?.namaracikan,
        nilai_r: parseFloat(y?.nilai_r),
        subtotal: parseFloat(y?.harga_jual).toFixed(2) * parseFloat(y?.jumlah)
      }
      hasilglobal.push(obat)
      // racikanr.push(totalNilaiR)
    })
  });

  const obaturut = hasilglobal.sort((a, b) => {
    if (a.nota === b.nota) {
      return a.nama.localeCompare(b.nama);
    }
    return a.nota.localeCompare(b.nota);
  });
  const obat = {
    xxx: obaturut,
    racikanR: racikanr.reduce((sum, value) => sum + value, 0),
    total: obaturut.reduce((sum, item) => sum + Number(item.subtotal), 0) + racikanr.reduce((sum, value) => sum + value, 0),
  }
  console.log('hasil', obat)
  return obat
})

defineExpose({
  rincianobat
});

</script>
<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
