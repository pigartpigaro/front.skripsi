<template>
  <q-dialog @show="store.checkItems()" persistent>
    <q-card flat class="fit" style="overflow: hidden;min-width: 700px;">
      <div class="column bg-red">
        <q-bar class="col-auto bg-primary text-white q-py-sm">
          <div class="f-12">
            History Lab Pasien
          </div>
          <q-space />

          <q-btn v-close-popup dense flat icon="icon-mat-close" @click="store.isOpen = false">
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
      </div>

      <div class="fit column">
        <div class="row q-pa-sm q-col-gutter-x-sm items-center">
          <div class="col-9"><q-input v-model="store.form.persyarantan_lab" outlined type="textarea" valid
              label="Persyaratan Lab" :loading="store.loadingSimpan" :disable="store.loadingSimpan" /></div>
          <div class="col-3 text-center"><q-btn dense color="primary" no-caps @click="store.simpan()"
              :loading="store.loadingSimpan" :disable="store.loadingSimpan">
              Simpan
            </q-btn></div>
        </div>
        <div v-if="store.loading" class="col-auto" style="overflow: hidden;">
          <app-loading />
        </div>
        <div v-else-if="!store.loading && store.items.length === 0" class="col-auto" style="overflow: hidden;">
          <app-no-data />
        </div>
        <q-scroll-area v-else class="col">
          <div class="q-pa-md">

            <q-list separator>
              <q-expansion-item v-for="item in store.items" :key="item">
                <template #header>
                  <q-item-section>
                    <div class="row f-10">
                      {{ item?.nota }}
                    </div>
                    <div class="row f-10">
                      {{ item?.noreg }}
                    </div>
                    <div class="row f-10">
                      {{ dateFull(item?.tgl_permintaan) }}
                    </div>
                  </q-item-section>
                  <q-item-section side>
                    {{ item?.poli?.rs2 ?? item?.ranap?.rs5 }}
                  </q-item-section>
                </template>
                <q-item-section>
                  <q-markup-table separator="vertical" flat bordered dense>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Nama Pemeriksaan
                        </th>
                        <th class="text-left">
                          Kelompok Pemeriksaan
                        </th>
                        <th class="text-left">
                          Satuan Normal
                        </th>
                        <th class="text-right">
                          Hasil
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(lab, l) in item?.details" :key="l" v-ripple clickable>
                        <td class="text-left ellipsis" style="max-width: 250px;">
                          {{ lab?.pemeriksaanlab?.rs2 }}
                        </td>
                        <td class="text-right" style="max-width: 150px;">
                          {{ lab?.pemeriksaanlab?.rs21 }}
                        </td>
                        <td class="text-right" style="max-width: 150px;">
                          {{ lab?.pemeriksaanlab?.rs22 }}
                        </td>
                        <td v-if="lab?.rs27 === ''" style="max-width: 150px;">
                          <q-item-label class="text-right">
                            {{ lab?.rs21 }}
                          </q-item-label>
                        </td>
                        <td v-else style="max-width: 150px;">
                          <q-item-label class="text-right">
                            {{ lab?.rs21 }} ({{ lab?.rs27 }})
                          </q-item-label>
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </q-item-section>
              </q-expansion-item>
            </q-list>
          </div>
        </q-scroll-area>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { dateFull } from 'src/modules/formatter'
import { useHistoryLaboratoriumPasienStore } from 'src/stores/simrs/farmasi/eresep/historyLab'

const store = useHistoryLaboratoriumPasienStore()
</script>
