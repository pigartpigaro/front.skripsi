<template>
  <q-page class="fit relative-position">
    <div class="fit absolute-top q-pa-sm">
      <q-card class="rounded-lg fit column" style="border-radius: 10px;">



        <q-card-section class="col fit relative-position q-pa-xs overflow-hidden">
          <DataTable flat bordered class="rounded-xl shadow-sm" :store="store" :loading="store.loading"
            :columns="store.getterColumns" :column-hide="store.columnHide" :items="store.items" :meta="store.meta"
            :dark="dark">

            <!-- HEADER -->
            <template #col-nama>
              <div>
                NAMA OBAT
              </div>
            </template>

            <!-- BODY -->
            <template #cell-nama="{ row }">
              <div class="column q-gutter-sm">
                <div class="text-weight-bold">
                  {{ row?.nama_obat }}
                </div>
                <div class="f-12">
                  <span class="text-italic">{{ row?.kd_obat }}</span> | <span class="text-weight-bold">Barcode : </span>
                  {{ row?.barcode }}
                </div>

                <div v-if="row?.kode_bpjs" class="text-italic f-10">
                  Kode Bpjs {{ row?.kode_bpjs }}
                </div>
              </div>
            </template>

            <template #cell-sediaan="{ row }">
              <div class="column q-gutter-xs">
                <app-chip v-if="row?.kekuatan_dosis" outline ada-tooltip tooltip="Dosis" :label="row.kekuatan_dosis" />
                <app-chip v-if="row.volumesediaan" outline ada-tooltip tooltip="Volume" :label="row.volumesediaan" />
                <app-chip v-if="row.bentuk_sediaan" outline ada-tooltip tooltip="Bentuk Sediaan"
                  :label="row.bentuk_sediaan" />
                <app-chip v-if="row.merk" outline ada-tooltip tooltip="Merk" :label="row.merk" />

                <app-chip v-if="row.jenis_perbekalan" font="f-10" square ada-tooltip tooltip="Perbekalan"
                  :outline="row.jenis_perbekalan.includes('Reagen') || row.jenis_perbekalan.includes('Alkes') ? true : false"
                  :label="row.jenis_perbekalan" />

              </div>
            </template>

            <template #cell-kelompok="{ row }">
              <q-list separator class="rounded-borders q-pa-none full-width" :padding="false">
                <q-item class="q-pa-xs">
                  <q-item-section class="q-pa-none">
                    <q-item-label class="text-weight-bold" caption>NAPZA</q-item-label>
                  </q-item-section>
                  <q-item-section class="q-pa-none" side>
                    {{ row?.kelompok_psikotropika === '1' ? 'YA' : 'TIDAK' }}
                  </q-item-section>
                </q-item>
                <q-item class="q-pa-xs">
                  <q-item-section class="q-pa-none">
                    <q-item-label class="text-weight-bold">KANDUNGAN</q-item-label>
                    <!-- <q-item-label lines="5">{{ row?.kandungan || '-' }}</q-item-label> -->
                    <div class="flex">{{ row?.kandungan || '-' }}</div>
                  </q-item-section>
                </q-item>
                <q-item class="q-pa-xs">
                  <q-item-section class="q-pa-none">
                    <q-item-label class="text-weight-bold">PENYIMPANAN</q-item-label>
                    <q-item-label>{{ row?.kelompok_penyimpanan || '-' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </template>

            <template #cell-belanja="{ row }">
              <div v-if="row.uraian108" class="row box-dua justify-between items-center no-wrap q-mb-sm"
                style="min-width: 250px">
                <div class="">
                  108
                </div>
                <div class="text-right">
                  {{ row.uraian108 }}
                </div>
              </div>
              <div v-if="row.uraian50" class="row box-dua justify-between items-center no-wrap q-mb-sm">
                <div class="">
                  50
                </div>
                <div class="text-right">
                  {{ row.uraian50 }}
                </div>
              </div>
            </template>


            <template #cell-status="{ row }">
              <div class="row box-tiga justify-between items-center q-mb-sm">
                <div v-if="row.status_generik === '1'" class="text-weight-bold text-green q-mx-xs">
                  Generik
                </div>
                <div v-if="row.status_fornas === '1'" class="text-weight-bold text-green q-mx-xs">
                  Fornas
                </div>
                <div v-if="row.status_forkid === '1'" class="text-weight-bold text-green q-mx-xs">
                  Forkit
                </div>
                <div v-if="row.status_kronis === '1'" class="text-weight-bold text-negative q-mx-xs">
                  Obat Kronis
                </div>
                <div v-if="row.status_prb === '1'" class="text-weight-bold text-green q-mx-xs">
                  Obat PRB
                </div>
                <div v-if="row.obat_program === '1'" class="text-weight-bold text-green q-mx-xs">
                  Obat Program
                </div>
                <div v-if="row.obat_donasi === '1'" class="text-weight-bold text-green q-mx-xs">
                  Obat Donasi
                </div>
                <div v-if="row.obat_kebijakan === '1'" class="text-weight-bold text-green q-mx-xs">
                  Obat Kebijakan
                </div>
                <div v-if="row.status_konsinyasi === '1'" class="text-weight-bold text-orange q-mx-xs">
                  Konsinyasi
                </div>
              </div>



              <div v-if="row.sistembayar" class="row box-tiga justify-between items-center no-wrap q-mb-sm">
                <div class="">
                  Sistem Bayar
                </div>
                <div class="text-right text-weight-bold" :class="sisBay(row.sistembayar)">
                  {{ row.sistembayar }}
                </div>
              </div>

            </template>

            <template #cell-satuan="{ row }">
              <q-list separator class="rounded-borders q-pa-none full-width" :padding="false">
                <q-item class="q-pa-xs">
                  <q-item-section class="q-pa-none">
                    <q-item-label class="text-weight-bold">BESAR</q-item-label>
                  </q-item-section>
                  <q-item-section class="q-pa-none" side>
                    <div>{{ row?.satuan_b || '-' }}</div>
                  </q-item-section>
                </q-item>
                <q-item class="q-pa-xs">
                  <q-item-section class="q-pa-none">
                    <q-item-label class="text-weight-bold">KECIL</q-item-label>
                  </q-item-section>
                  <q-item-section class="q-pa-none" side>
                    <div>{{ row?.satuan_k || '-' }}</div>
                  </q-item-section>
                </q-item>

              </q-list>
            </template>

          </DataTable>
        </q-card-section>

      </q-card>
    </div>


    <!-- modal form -->
    <ModalForm v-model="store.modalFormOpen" :store="store" :dark="dark" />

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMasterObatStore } from 'src/stores/simrs/master/templateStore/register'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import DataTable from './comp/DataTable.vue'
import ModalForm from './ModalForm.vue'




const store = useMasterObatStore()
const router = useRouter()
const $q = useQuasar()

const dark = computed(() => {
  return $q.dark.isActive
})

const handleSearch = () => {
  console.log('search', search.value);

}



onMounted(() => {
  store.params.order_by = 'id'
  store.params.per_page = 20
  Promise.all([
    store.fetchAll()
  ])
})
</script>