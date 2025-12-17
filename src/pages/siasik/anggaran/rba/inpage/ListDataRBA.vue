<template>

  <div class="q-pa-md full-width">
    <table style="width: 100%;" wrap-cells>
      <thead>
        <tr class="text-bold">
          <td class="text-center" style="width: 10%">KODE REKENING</td>
          <td class="text-center" style="width: 70%" colspan="2">URAIAN</td>
          <td class="text-center" style="width: 20%">PAGU</td>
        </tr>

      </thead>
      <tbody>
        <template v-for="item in store.items" :key="item">
          <tr>
            <td class="text-bold text-left q-px-sm"> {{ item.kode }} </td>
            <td class="text-bold text-left q-px-sm" colspan="2"> {{ item.uraian }} </td>
            <td class="text-bold text-right q-px-sm">
              <div class="row full-width justify-between">
                <div class="col-auto flex-start">Rp. </div>
                <div class="flex-end text-right">{{ formattanpaRp(item.pagu) }}</div>
              </div>
            </td>
          </tr>
          <template v-if="item.rincian && item.rincian?.length > 0">
            <template v-for="(rincian, index) in item.rincian" :key="index">
              <tr>
                <td class="text-right text-bold q-px-sm"> > </td>
                <td colspan="2">
                  <div class="text-bold text-left q-px-sm">{{ rincian.bidang }}</div>
                  <div class="text-left q-px-sm">Sub Kegiatan: {{ rincian.kegiatan }}</div>
                </td>
                <td class="q-px-sm">
                  <div class="row justify-between">
                    <div class="col-auto flex-start">Rp. </div>
                    <div class="flex-end text-right q-pr-sm">{{ formattanpaRp(rincian.pagu) }}</div>
                  </div>
                </td>
              </tr>
              <template v-if="store.reqs.jenis === '2'">
                <tr v-for="(item, n) in rincian.items" :key="n">
                  <td></td>
                  <td class="text-left q-px-sm text-grey-8">- {{ item.item }} </td>
                  <td class="text-right q-px-sm text-grey-8" style="width: 20%"> {{ item.volume }} {{ item.satuan }} x
                    {{
                      formattanpaRp(item.harga) }}
                  </td>
                  <td class="text-right q-px-sm">
                    <div class="row justify-between">
                      <div class="col-auto flex-start text-grey-8">Rp. </div>
                      <div class="flex-end text-right q-pr-sm text-grey-8">{{ formattanpaRp(item.pagu) }}</div>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
          </template>
        </template>
      </tbody>
    </table>
  </div>

</template>
<script setup>
import { formattanpaRp } from 'src/modules/formatter';
import { useRbaStore } from 'src/stores/siasik/anggaran/storerba';
// import { ref } from 'vue';


const store = useRbaStore()
// const separator = ref('cell')
</script>

<style>
/* Tambahkan border pada setiap td dan th */
table,
tr,
td {
  border-collapse: collapse;
  border: 1px solid #000000;
  height: 30px;
  /* Garis hitam dengan ketebalan 1px */
}
</style>
