<template>
  <div class="bg-grey-2 q-pa-xs full-height scroll">
    <div class=" full-width">
      <div class="row q-col-gutter-sm">
        <!-- Profiling Permintaan -->
        <div class="col-12 col-md-4">
          <q-card class="shadow-6 bg-white q-pa-none">
            <!-- Header dengan Foto & Info Utama -->
            <q-card-section class="bg-primary text-white">
              <div class="row items-center">
                <div class="text-subtitle1 text-weight-bold">
                  <span class="text-h5">🗂️ </span> Detail Permintaan
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <!-- Informasi Detail -->
            <q-card-section class="f-14">
              <div class="row q-col-gutter-y-md">
                <!-- Data Pasien -->
                <div class="col-12">
                  <div class="text-subtitle1 text-primary text-weight-bold q-mb-sm">
                    <span class="text-h5">🧍</span> Data Pasien
                  </div>
                  <q-list dense>
                    <q-item>
                      <q-item-section>
                        <div class="row">
                          <div class="col-4">NOREG | NORM</div>
                          <div class="col-8">: {{ pasien?.noreg }} | {{ pasien?.norm }}</div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <div class="row">
                          <div class="col-4">NIK</div>
                          <div class="col-8">: {{ pasien?.noktp }} </div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <div class="row">
                          <div class="col-4">Kelamin / Usia</div>
                          <div class="col-8">: {{ pasien?.usia }} ({{ pasien?.kelamin }})</div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <div class="row">
                          <div class="col-4">TTL</div>
                          <div class="col-8">: {{ pasien?.templahir }}, {{ formatDate(pasien?.tgllahir) }}</div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <div class="row">
                          <div class="col-4">Alamat</div>
                          <div class="col-8">
                            <div class="row">
                              <div class="col-auto" style="min-width:8px"> : </div>
                              <div class="col">{{ pasien?.alamat }}</div>

                            </div>
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>

                <!-- Informasi Kunjungan -->
                <div class="col-12">
                  <div class="text-subtitle1 text-primary text-weight-bold q-mb-sm">
                    <span class="text-h5">ℹ️ </span> Informasi Kunjungan
                  </div>
                  <q-list dense>
                    <q-item>
                      <q-item-section>
                        <div class="row">
                          <div class="col-4">DPJP</div>
                          <div class="col-8">: {{ pasien?.dokter }}</div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <div class="row">
                          <div class="col-4">Ruangan</div>
                          <div class="col-8">: {{ pasien?.ruangan }}</div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <div class="row">
                          <div class="col-4">Tgl Kunjungan</div>
                          <div class="col-8">: {{ formatDateTime(pasien?.tgl_kunjungan) }}</div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <div class="row">
                          <div class="col-4">Sistem Bayar</div>
                          <div class="col-8">: {{ pasien?.sistembayar }}</div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>

                <!-- No Permintaan -->
                <div class="col-12">
                  <q-list dense>
                    <q-banner class="bg-grey-2 relative-position">
                      <template v-slot:avatar>
                        <!-- <q-icon name="icon-mat-receipt" color="primary" /> -->
                        <div class="text-h4">🧾</div>
                      </template>
                      <div class="text-subtitle2">No. Permintaan:</div>
                      <div class="text-weight-bold">{{ pasien?.nota_permintaan }}</div>

                      <div v-if="pasien?.cito" class="absolute-right">
                        <q-badge class="q-pa-sm">Cito</q-badge>
                      </div>
                    </q-banner>
                    <q-separator></q-separator>
                    <q-banner class="bg-grey-2">
                      <div class="row">
                        <div class="col-4">Diagnosa Kerja</div>
                        <div class="col-8">
                          <div class="row">
                            <div class="col-auto" style="min-width:5px"> : </div>
                            <div class="col">{{ permintaan?.diagnosakerja }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4">Met. Peny. Hasil</div>
                        <div class="col-8">
                          <div class="row">
                            <div class="col-auto" style="min-width:5px"> : </div>
                            <div class="col">{{ permintaan?.metodepenyampaianhasil }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4">Status Alergi</div>
                        <div class="col-8">
                          <div class="row">
                            <div class="col-auto" style="min-width:5px"> : </div>
                            <div class="col">{{ permintaan?.statusalergipasien }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4">Catatan</div>
                        <div class="col-8">
                          <div class="row">
                            <div class="col-auto" style="min-width:5px"> : </div>
                            <div class="col">{{ permintaan?.catatanpermintaan }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4">Dibuat Tgl</div>
                        <div class="col-8">
                          <div class="row">
                            <div class="col-auto" style="min-width:5px"> : </div>
                            <div class="col">{{ formatDateTime(permintaan?.created_at) }}</div>
                          </div>
                        </div>
                      </div>
                    </q-banner>
                  </q-list>
                </div>

              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Existing code for right column -->
        <div class="col-12 col-md-8">
          <q-card class="shadow-6 bg-white">
            <div class="text-h6 text-white bg-primary q-pa-md flex items-center">
              <q-icon name="icon-mat-assignment" class="q-mr-sm" />
              Daftar Permintaan Pemeriksaan
            </div>
            <q-list bordered>


              <template v-for="item in ListPermintaans" :key="item">
                <q-expansion-item group="somegroup" icon="icon-mat-app_registration"
                  :label="`${item?.rs2} - (${item?.rs3})`" header-class="text-teal f-18 text-weight-bold q-pa-md">
                  <q-card>
                    <q-separator />
                    <q-card-section>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                      commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                      eveniet doloribus ullam aliquid.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />
              </template>


            </q-list>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { date } from 'quasar'
import { useListPasienRadiologiStore } from 'src/stores/simrs/radiologi/radiologi'

const store = useListPasienRadiologiStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const nota = computed(() => {
  return props.pasien?.nota_permintaan || null
})

const permintaan = computed(() => {
  if (!props.pasien?.radiologi?.length) return null
  return props.pasien?.radiologi?.find(item => item?.rs2 === nota.value) || null
})

const ListPermintaans = computed(() => {
  const data = permintaan.value?.rs15 || null
  const arrayResult = data ? data?.split(';') : []

  const master = store.namaPemeriksaans

  return arrayResult.map(kode => {
    const item = master?.find(item => item.rs1 === kode)
    return {
      ...item,
      kode
    }
  })

})

console.log('pasien from index', props.pasien, permintaan.value);
console.log('ListPermintaans', ListPermintaans.value);







function formatDate(dateStr) {
  if (!dateStr) return '-'
  return date.formatDate(dateStr, 'DD MMMM YYYY')
}

function formatDateTime(dateStr) {
  if (!dateStr) return '-'
  return date.formatDate(dateStr, 'DD MMMM YYYY HH:mm')
}
</script>

<style scoped>
.container {
  max-width: 100%;
}
</style>