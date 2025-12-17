<template>
  <div class="bg-white q-pa-xs">
    <div ref="refTop" class="fixed-top bg-white" style="margin-top:50px; margin-left: 60px; z-index: 10">
      <div class="row bg-primary text-white q-pa-sm q-mb-sm print-hide">
        <div class="f-14 text-weight-bold">
          Laporan Barang Rusak
        </div>
      </div>

      <div class="row no-wrap justify-between items-center print-hide">
        <div class="col-grow">
          <div class="row q-col-gutter-sm q-my-sm items-center">
            <div class="col-2">
              <app-input v-model="store.params.q" label="Cari obat" outlined valid :loading="store.loading"
                @keyup.enter="store.setSearch" />
            </div>
            <div class="col-2">
              <div class="row items-center">
                <div class="col-2">Dari</div>
                <div class="col-10">
                  <app-autocomplete v-model="store.params.dari_bulan" label="Pilih Bulan" autocomplete="nama"
                    option-label="nama" option-value="value" outlined :source="store.bulans" :loading="store.loading" />

                  <app-input v-model="store.params.dari_tahun" label="Pilih Tahun" outlined :loading="store.loading" />
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="row items-center">
                <div class="col-2">S/D</div>
                <div class="col-10">
                  <app-autocomplete v-model="store.params.sampai_bulan" label="Pilih Bulan" autocomplete="nama"
                    option-label="nama" option-value="value" outlined :source="store.bulans" :loading="store.loading" />

                  <app-input v-model="store.params.sampai_tahun" label="Pilih Tahun" outlined
                    :loading="store.loading" />
                </div>
              </div>
            </div>

            <div class="col-2">
              <app-autocomplete v-model="store.params.kode_ruang" label="Pilih Gudang / Depo" autocomplete="nama"
                option-label="nama" option-value="value" outlined :source="store.gudangs" :loading="store.loading" />
            </div>
            <div class="col-2">
              <app-btn label="Ambil Data" :disable="store.loading" :loading="store.loading" @click="store.setPage(1)" />
            </div>
          </div>
        </div>
        <div class="col-auto q-mr-md">
          <div class="row items-center">
            <q-btn ref="refPrint" v-print="printObj" unelevated color="dark" round size="sm" icon="icon-mat-print">
              <q-tooltip class="primary" :offset="[10, 10]">
                Print
              </q-tooltip>
            </q-btn>
            <!-- <div class="q-ml-sm">
              <download-excel
                class="btn"
                :fields="store.fields"
                :fetch="store.fetch"
                :before-generate="store.startDownload"
                :before-finish="store.finishDownload"
                :name="'Mutasi Obat Bulan ' + bulan() + ' '+ store.params.tahun +jenis()+'.xls'"
              >
                <q-btn
                  color="green"
                  round
                  size="sm"
                  icon="icon-mat-download"
                  push
                  :loading="store.loadingDownload"
                  :disable="store.loadingDownload"
                >
                  <q-tooltip>Download Excel</q-tooltip>
                </q-btn>
              </download-excel>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div :style="`margin-top:${h + 5}px;`" />
    <div id="printMe">

      <div class="row items-center garis-bawah">
        <div class="col-2">
          <q-img src="~assets/images/logo-kota-grey.png" spinner-color="white"
            style="height: 3.56cm; max-width: 2.86cm" />
        </div>
        <div class="col-8">
          <div class="row justify-center f-18">
            PEMERINTAH KOTA PROBOLINGGO
          </div>
          <div class="row justify-center f-12 text-weight-bold">
            DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
          </div>
          <div class="row justify-center f-20 text-weight-bold">
            UOBK RSUD DOKTER MOHAMAD SALEH
          </div>
          <div class="row justify-center f-14">
            Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
          </div>
          <div class="row justify-center f-14">
            E-mail : rsudprob@probolinggokota.go.id
          </div>
          <div class="row justify-center f-14 text-weight-bold">
            PROBOLINGGO 67219
          </div>
        </div>
        <div class="col-2">
          <q-img src="~assets/logos/logo-rsud.png" spinner-color="white" style="height: 3cm; max-width: 3cm" />
        </div>
      </div>
      <div class="row justify-center f-16 text-weight-bold q-my-sm">
        Laporan Dead Stok
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDeadStokReportStore } from 'src/stores/simrs/laporan/farmasi/deadStok/deadStok'
import { onMounted, ref } from 'vue'

const store = useDeadStokReportStore()

const refTop = ref(null)
const h = ref(0)
onMounted(() => {
  console.log('h', refTop.value.clientHeight)
  h.value = refTop.value.clientHeight
})

const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Persediaan Farmasi'
}

</script>
