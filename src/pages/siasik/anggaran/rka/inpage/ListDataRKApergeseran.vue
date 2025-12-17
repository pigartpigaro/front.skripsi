<template>
  <!-- <template v-if="store.datarkapergeseran?.length"> -->
  <q-card-section class="full-width">
    <div class="row q-py-md">
      <div class="full-width">
        <q-markup-table v-if="store.reqs.jenisrka === '2'" flat bordered wrap-cells :separator="separator">
          <thead style="height: 35px;">
            <tr>
              <th style="font-weight: bold" colspan="3">
                Sebelum Perubahan
              </th>
              <th style="font-weight: bold" colspan="2">
                Setelah Perubahan
              </th>
            </tr>
            <tr>
              <th style="font-weight: bold">
                Indikator
              </th>
              <th style="font-weight: bold">
                Tolak Ukur Kerja
              </th>
              <th style="font-weight: bold">
                Target Kinerja
              </th>
              <th style="font-weight: bold">
                Tolak Ukur Kerja
              </th>
              <th style="font-weight: bold">
                Target Kinerja
              </th>
            </tr>
          </thead>
          <tbody style="height: 30px;">
            <tr>
              <td class="text-bold">
                Capaian Kegiatan
              </td>
              <td>
                {{ store.pergeseran[0].capaianprogram }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targetcapaian }}
              </td>
              <td>
                {{ store.pergeseran[0].capaianprogram }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targetcapaian }}
              </td>
            </tr>
            <tr style="height: 25px">
              <td class="text-bold">
                Masukan
              </td>
              <td>
                {{ store.pergeseran[0].masukan }}
              </td>
              <td class="text-right">
                {{ formatDenganRp(paguData().pagupergeseran) }}
              </td>
              <td>
                {{ store.pergeseran[0].masukan }}
              </td>
              <td class="text-right">
                {{ formatDenganRp(paguData().pagubarupergeseran) }}
              </td>
            </tr>
            <tr style="height: 25px">
              <td class="text-bold">
                Keluaran
              </td>
              <td>
                {{ store.pergeseran[0].keluaran }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targetkeluaran }}
              </td>
              <td>
                {{ store.pergeseran[0].keluaran }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targetkeluaran }}
              </td>
            </tr>
            <tr style="height: 25px">
              <td class="text-bold">
                Hasil
              </td>
              <td>
                {{ store.pergeseran[0].hasil }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targethasil }}
              </td>
              <td>
                {{ store.pergeseran[0].hasil }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targethasil }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>


        <q-markup-table v-else-if="store.reqs.jenisrka === '3'" flat bordered wrap-cells :separator="separator">
          <thead style="height: 35px;">
            <tr>
              <th style="font-weight: bold" colspan="3">
                Sebelum Perubahan
              </th>
              <th style="font-weight: bold" colspan="2">
                Setelah Perubahan
              </th>
            </tr>
            <tr>
              <th style="font-weight: bold">
                Indikator
              </th>
              <th style="font-weight: bold">
                Tolak Ukur Kerja
              </th>
              <th style="font-weight: bold">
                Target Kinerja
              </th>
              <th style="font-weight: bold">
                Tolak Ukur Kerja
              </th>
              <th style="font-weight: bold">
                Target Kinerja
              </th>
            </tr>
          </thead>
          <tbody style="height: 30px;">
            <tr>
              <td class="text-bold">
                Capaian Kegiatan
              </td>
              <td>
                {{ store.pergeseran[0].capaianprogram }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targetcapaian }}
              </td>
              <td>
                {{ store.pergeseran[0].capaianprogram }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targetcapaian }}
              </td>
            </tr>
            <tr style="height: 25px">
              <td class="text-bold">
                Masukan
              </td>
              <td>
                {{ store.pergeseran[0].masukan }}
              </td>
              <td class="text-right">
                {{ formatDenganRp(paguData().paguperubahan) }}
              </td>
              <td>
                {{ store.pergeseran[0].masukan }}
              </td>
              <td class="text-right">
                {{ formatDenganRp(paguData().pagubaruperubahan) }}
              </td>
            </tr>
            <tr style="height: 25px">
              <td class="text-bold">
                Keluaran
              </td>
              <td>
                {{ store.pergeseran[0].keluaran }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targetkeluaran }}
              </td>
              <td>
                {{ store.pergeseran[0].keluaran }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targetkeluaran }}
              </td>
            </tr>
            <tr style="height: 25px">
              <td class="text-bold">
                Hasil
              </td>
              <td>
                {{ store.pergeseran[0].hasil }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targethasil }}
              </td>
              <td>
                {{ store.pergeseran[0].hasil }}
              </td>
              <td class="text-right">
                {{ store.pergeseran[0].targethasil }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
    <div class="row">
      <div class="full-width">
        <q-markup-table flat bordered wrap-cells :separator="separator">
          <thead>
            <tr>
              <th style="font-weight: bold;" colspan="2">REKENING</th>
              <th style="font-weight: bold;" colspan="4">SEBELUM PERUBAHAN</th>
              <th style="font-weight: bold;" colspan="4">SETELAH PERUBAHAN</th>
              <th style="font-weight: bold" rowspan="2">
                Selisih
              </th>
            </tr>
            <tr>
              <th style="font-weight: bold;">Kode</th>
              <th style="font-weight: bold;">Uraian</th>
              <th style="font-weight: bold;">Volume</th>
              <th style="font-weight: bold;">Satuan</th>
              <th style="font-weight: bold;">Harga</th>
              <th style="font-weight: bold;">Total</th>
              <th style="font-weight: bold;">Volume</th>
              <th style="font-weight: bold;">Satuan</th>
              <th style="font-weight: bold;">Harga</th>
              <th style="font-weight: bold;">Total</th>
            </tr>
          </thead>
          <tbody v-if="store.reqs.jenisrka === '2'">
            <template v-for="it in store.datarkapergeseran" :key="it">
              <tr>
                <td class="text-bold text-left q-px-sm"> {{ it.kode }} </td>
                <td class="text-bold text-left q-px-sm" colspan="4"> {{ it.uraian }} </td>
                <td class="text-right text-bold">
                  <span class="row justify-between">
                    <span class="col-auto flex-start">Rp. </span>
                    <span class="flex-end text-right q-pr-sm">
                      {{ formattanpaRp(it.pagu) }}
                    </span>
                  </span>
                </td>
                <td colspan="3"></td>
                <td class="text-right text-bold">
                  <span class="row justify-between">
                    <span class="col-auto flex-start">Rp. </span>
                    <span class="flex-end text-right q-pr-sm">
                      {{ formattanpaRp(it.pagubaru) }}
                    </span>
                  </span>
                </td>
                <td class="text-right text-bold">
                  <span class="q-pr-sm">
                    {{ formatDenganRp(it.selisih) }}
                  </span>
                </td>
              </tr>
              <template v-for="rinci in it?.rincian" :key="rinci">
                <tr>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.kode108 }}
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      - {{ rinci.usulan }}
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.volume }}
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.satuan }}
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="row justify-between">
                      <span class="col-auto flex-start">Rp. </span>
                      <span class="flex-end text-right q-pr-sm">
                        {{ formattanpaRp(rinci.harga) }}
                      </span>
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="row justify-between">
                      <span class="col-auto flex-start">Rp. </span>
                      <span class="flex-end text-right q-pr-sm">
                        {{ formattanpaRp(rinci.pagu) }}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.volumebaru }}
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.satuan }}
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="row justify-between">
                      <span class="col-auto flex-start">Rp. </span>
                      <span class="flex-end text-right q-pr-sm">
                        {{ formattanpaRp(rinci.hargabaru) }}
                      </span>
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="row justify-between">
                      <span class="col-auto flex-start">Rp. </span>
                      <span class="flex-end text-right q-pr-sm">
                        {{ formattanpaRp(rinci.pagubaru) }}
                      </span>
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="col q-pr-sm">
                      {{ formatDenganRp(rinci.selisih) }}
                    </span>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
          <tbody v-if="store.reqs.jenisrka === '3'">
            <template v-for="it in store.datarkaperubahan" :key="it">
              <tr>
                <td class="text-bold text-left q-px-sm"> {{ it.kode }} </td>
                <td class="text-bold text-left q-px-sm" colspan="4"> {{ it.uraian }} </td>
                <td class="text-right text-bold">
                  <span class="row justify-between">
                    <span class="col-auto flex-start">Rp. </span>
                    <span class="flex-end text-right q-pr-sm">
                      {{ formattanpaRp(it.pagu) }}
                    </span>
                  </span>
                </td>
                <td colspan="3"></td>
                <td class="text-right text-bold">
                  <span class="row justify-between">
                    <span class="col-auto flex-start">Rp. </span>
                    <span class="flex-end text-right q-pr-sm">
                      {{ formattanpaRp(it.pagubaru) }}
                    </span>
                  </span>
                </td>
                <td class="text-right text-bold">
                  <span class="q-pr-sm">
                    {{ formatDenganRp(it.selisih) }}
                  </span>
                </td>
              </tr>
              <template v-for="rinci in it?.rincian" :key="rinci">
                <tr>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.kode108 }}
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      - {{ rinci.usulan }}
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.volume }}
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.satuan }}
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="row justify-between">
                      <span class="col-auto flex-start">Rp. </span>
                      <span class="flex-end text-right q-pr-sm">
                        {{ formattanpaRp(rinci.harga) }}
                      </span>
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="row justify-between">
                      <span class="col-auto flex-start">Rp. </span>
                      <span class="flex-end text-right q-pr-sm">
                        {{ formattanpaRp(rinci.pagu) }}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.volumebaru }}
                    </span>
                  </td>
                  <td>
                    <span class="q-pl-md">
                      {{ rinci.satuan }}
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="row justify-between">
                      <span class="col-auto flex-start">Rp. </span>
                      <span class="flex-end text-right q-pr-sm">
                        {{ formattanpaRp(rinci.hargabaru) }}
                      </span>
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="row justify-between">
                      <span class="col-auto flex-start">Rp. </span>
                      <span class="flex-end text-right q-pr-sm">
                        {{ formattanpaRp(rinci.pagubaru) }}
                      </span>
                    </span>
                  </td>
                  <td class="text-right">
                    <span class="col q-pr-sm">
                      {{ formatDenganRp(rinci.selisih) }}
                    </span>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-card-section>
  <!-- </template> -->

</template>
<script setup>
import { formatDenganRp, formatRpDouble, formattanpaRp } from 'src/modules/formatter'
import { useRkaStore } from 'src/stores/siasik/anggaran/storerka'
import { ref } from 'vue'

const store = useRkaStore()
const separator = ref('cell')

function paguData() {
  if (store.datarkapergeseran.length > 0) {
    const pagupergeseran = store.datarkapergeseran[0].pagu
    const pagubarupergeseran = store.datarkapergeseran[0].pagubaru
    return { pagupergeseran, pagubarupergeseran }
  }
  else {
    const paguperubahan = store.datarkaperubahan[0].pagu
    const pagubaruperubahan = store.datarkaperubahan[0].pagubaru
    return { paguperubahan, pagubaruperubahan }
  }
  console.log('pagu', paguperubahan)

}

</script>
<style>
.custom-table {
  border-collapse: collapse;
}

.custom-table tr,
.custom-table th,
.custom-table td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
