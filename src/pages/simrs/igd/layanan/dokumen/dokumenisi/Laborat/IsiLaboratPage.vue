<template>
  <div class="q-pa-md">
    <div class="row text-bold" v-for="(lab, l) in laborat" :key="l">
      <div class="col-12">
        No. Nota : <q-badge rounded color="dark" outline>{{ l }} </q-badge> {{ lab?.tanggal }}
      </div>
      <table class="table q-ma-sm">
        <thead>
          <tr class="bg-blue-7">
            <th class="text-center">
              Pemeriksaan
            </th>
            <th class="text-center">
              Hasil
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rinci, r) in lab?.pemeriksaan" :key="r">

            <td class="text-center ellipsis" style="max-width: 250px;">
              {{ rinci?.nama ?? '' }} <span v-if="rinci?.paket !== ''">({{ rinci?.paket }})</span>
            </td>
            <td class="text-center ellipsis" style="max-width: 250px;">
              {{ rinci?.hasil ?? '' }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col-12">
        Interpretasi : {{ lab?.interpretasi }}
      </div>
      <div>
        Saran : {{ lab?.saran }}
      </div>
      <q-separator class="q-mt-xl q-mb-xl" style="border-top: 1px solid black;" />
    </div>
  </div>
</template>
<script setup>
import { dateFull } from 'src/modules/formatter';
import { computed } from 'vue';

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const laborat = computed(() => {
  const data = props?.pasien?.laboratold
  const hasilglobal = []
  // const uniqueData = [...new Map(data.map(item => [item.rs2, item.rs2])).values()];
  data?.forEach(x => {
    const hasil = {
      nota: x?.rs2,
      tanggal: x?.rs3,
      pemeriksaan: x?.pemeriksaanlab?.rs2,
      paket: x?.paket,
      hasil: x?.rs21,
      interpretasi: x?.interpretasi?.rs3,
      saran: x?.interpretasi?.rs4
    }
    hasilglobal.push(hasil)
  });
  const hasilx = hasilglobal;

  const groupedData = hasilx.reduce((acc, item) => {
    if (!acc[item.nota]) {
      acc[item.nota] = { nota: item.nota, tanggal: item.tanggal, paket: item.paket, pemeriksaan: [] };
    }
    acc[item.nota].pemeriksaan.push({ nama: item.pemeriksaan, hasil: item.hasil, paket: item.paket });
    return acc;
  }, {});


  const groupedByPaket = Object.values(groupedData).reduce((acc, item) => {
    if (item.paket) {
      if (!acc[item.paket]) {
        acc[item.paket] = { paket: item.paket, pemeriksaan: [] };
      }
      acc[item.paket].pemeriksaan.push(...item.pemeriksaan);
    } else {
      if (!acc[item.nota]) {
        acc[item.nota] = { nota: item.nota, tanggal: item.tanggal, pemeriksaan: [] };
      }
      acc[item.nota].pemeriksaan.push(...item.pemeriksaan);
    }
    return acc;
  }, {});

  return groupedByPaket;
})
</script>
