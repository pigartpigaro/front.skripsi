<template>
  <template v-if="store.datarka?.length > 0">
    <q-card-section class="full-width">
      <div class="row q-py-md">
        <div class="full-width">
          <q-markup-table flat bordered wrap-cells :separator="separator">
            <thead style="height: 35px;">
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
              </tr>
            </thead>
            <tbody style="height: 30px;">
              <tr>
                <td style="font-weight: bold">
                  Capaian Kegiatan
                </td>
                <td>
                  {{ store.dataanggaran[0].capaianprogram }}
                </td>
                <td class="text-right">
                  {{ store.dataanggaran[0].targetcapaian }}
                </td>
              </tr>
              <tr>
                <td style="font-weight: bold">
                  Masukan
                </td>
                <td>
                  {{ store.dataanggaran[0].masukan }}
                </td>
                <td class="text-right">
                  {{ formatRpDouble(store.totalPagukegiatan[0].pagu) }}
                </td>
              </tr>
              <tr>
                <td style="font-weight: bold">
                  Keluaran
                </td>
                <td>
                  {{ store.dataanggaran[0].keluaran }}
                </td>
                <td class="text-right">
                  {{ store.dataanggaran[0].targetkeluaran }}
                </td>
              </tr>
              <tr>
                <td style="font-weight: bold">
                  Hasil
                </td>
                <td>
                  {{ store.dataanggaran[0].hasil }}
                </td>
                <td class="text-right">
                  {{ store.dataanggaran[0].targethasil }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
      <div class="row">
        <div class="full-width">
          <q-markup-table class="my-sticky-table" flat bordered wrap-cells :separator="separator">
            <thead>
              <tr class="bg-grey text-white max-width">
                <th>KODE REKENING</th>
                <th>URAIAN</th>
                <th>VOLUME</th>
                <th>SATUAN</th>
                <th>HARGA</th>
                <th>PAGU</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="it in store.datarka" :key="it">
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
                  </tr>
                </template>
              </template>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
</template>
<script setup>
import { formatRpDouble, formattanpaRp } from 'src/modules/formatter'
import { useRkaStore } from 'src/stores/siasik/anggaran/storerka'
import { ref } from 'vue'

const store = useRkaStore()
const separator = ref('cell')

</script>
<style>
td {
  text-align: left;
}
</style>
