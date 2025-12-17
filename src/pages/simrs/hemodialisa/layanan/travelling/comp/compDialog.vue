<template>
  <q-dialog v-model="store.isOpen" persistent>
    <q-card style="min-width: 700px; max-width: 1000px">
      <q-bar class="col-auto bg-primary text-white q-py-sm">
        <div class="f-12">
          Data Hemodialisa
        </div>
        <q-space />


        <q-btn v-close-popup dense flat icon="icon-mat-close">
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row items-center">
          <div class="col-9">
            <div class="text-subtitle2">RSUD Dokter Mohamad Saleh – Probolinggo</div>
            <div class="text-h6">Data Hemodialisa</div>
          </div>
          <div class="col-3 text-right">
            <q-btn ref="refPrint" v-print="printObj" unelevated color="dark" round size="sm" icon="icon-mat-print">
              <q-tooltip class="primary" :offset="[10, 10]">
                Print
              </q-tooltip>
            </q-btn>

          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <!-- Target print -->
        <div id="printMe" class="column q-gutter-sm text-body1">
          <app-kop-surat />
          <div class="print-section">
            <div class="print-field">
              <div class="label">Tanggal</div>
              <div class="value">{{ dateFullFormat(store?.item?.tgl) }}</div>
            </div>
            <div class="print-field">
              <div class="label">Nomor RM</div>
              <div class="value">{{ store?.item?.norm }}</div>
            </div>
            <div class="print-field">
              <div class="label">Nama</div>
              <div class="value">{{ store?.item?.name }}</div>
            </div>
            <div class="print-field">
              <div class="label">Umur</div>
              <div class="value">{{ store?.item?.age }}</div>
            </div>
            <div class="print-field">
              <div class="label">Alamat</div>
              <div class="value">{{ store?.item?.address }}</div>
            </div>
            <div class="print-field">
              <div class="label">Diagnosa</div>
              <div class="value">{{ store?.item?.diagnosa }}</div>
            </div>
          </div>

          <div class="print-section">
            <div class="print-field">
              <div class="label">Mulai HD</div>
              <div class="value">{{ dateFullFormat(store?.item?.start_date) }}</div>
            </div>
            <div class="print-field">
              <div class="label">Terakhir HD</div>
              <div class="value">{{ dateFullFormat(store?.item?.last_date) }}</div>
            </div>
          </div>

          <div class="print-section">
            <div class="print-field">
              <div class="label">Hasil Lab</div>
              <div class="value">{{ store?.item?.lab_hasil }}</div>
            </div>
            <div class="print-field">
              <div class="label">HBsAg</div>
              <div class="value">{{ store?.item?.lab_hbsag }}</div>
            </div>
            <div class="print-field">
              <div class="label">Anti-HCV</div>
              <div class="value">{{ store?.item?.lab_hcv }}</div>
            </div>
            <div class="print-field">
              <div class="label">Anti-HIV</div>
              <div class="value">{{ store?.item?.lab_hiv }}</div>
            </div>
          </div>

          <div class="print-section">
            <div class="print-field">
              <div class="label">Pengobatan</div>
              <div class="value">{{ store?.item?.pengobatan }}</div>
            </div>
            <div class="print-field">
              <div class="label">Tekanan Darah</div>
              <div class="value">{{ store?.item?.blood_pressure }}</div>
            </div>
            <div class="print-field">
              <div class="label">Akses Vaskuler</div>
              <div class="value">{{ store?.item?.vaskuler }}</div>
            </div>
            <div class="print-field">
              <div class="label">Frekuensi HD</div>
              <div class="value">{{ store?.item?.frequency }}</div>
            </div>
            <div class="print-field">
              <div class="label">QB</div>
              <div class="value">{{ store?.item?.qb }}</div>
            </div>
            <div class="print-field">
              <div class="label">QD</div>
              <div class="value">{{ store?.item?.qd }}</div>
            </div>
            <div class="print-field">
              <div class="label">TMP</div>
              <div class="value">{{ store?.item?.tmp }}</div>
            </div>
            <div class="print-field">
              <div class="label">Heparinisasi</div>
              <div class="value">{{ store?.item?.heparinisasi }}</div>
            </div>
            <div class="print-field">
              <div class="label">Dialisat</div>
              <div class="value">{{ store?.item?.dialisat }}</div>
            </div>
            <div class="print-field">
              <div class="label">Dialyzer</div>
              <div class="value">{{ store?.item?.dialyzer }}</div>
            </div>
            <div class="print-field">
              <div class="label">Komplikasi</div>
              <div class="value">{{ store?.item?.komplikasi }}</div>
            </div>
            <div class="print-field">
              <div class="label">Golongan Darah</div>
              <div class="value">{{ store?.item?.gol_darah }}</div>
            </div>
            <div class="print-field">
              <div class="label">Transfusi</div>
              <div class="value">{{ store?.item?.transfusi }}</div>
            </div>
            <div class="print-field">
              <div class="label">Alergi</div>
              <div class="value">{{ store?.item?.alergi }}</div>
            </div>
            <div class="print-field">
              <div class="label">BB Kering</div>
              <div class="value">{{ store?.item?.bb_kering }}</div>
            </div>
            <div class="print-field">
              <div class="label">Diet</div>
              <div class="value">{{ store?.item?.diet }}</div>
            </div>
            <div class="print-field">
              <div class="label">Keterangan</div>
              <div class="value">{{ store?.item?.ket }}</div>
            </div>
          </div>
          <div class="ttd row text-right q-mt-xl">
            <div class="col-8" />
            <div class="col-4 text-center">
              <div>Probolinggo, {{ dateFullFormat(store?.item?.tgl) }}</div>
              <div class="q-mb-sm">Dokter Penanggungjawab</div>
              <div class="row justify-center">
                <div class="relative-position" style="width: 90px;">
                  <vue-qrcode :value="qrDokter" tag="svg" :options="{
                    errorCorrectionLevel: 'Q',
                    color: {
                      dark: '#000000',
                      light: '#ffffff',
                    },
                    margin: 0
                  }" />
                </div>

              </div>
              <div class="text-weight-bold q-pt-sm">{{ pasien?.pegsim?.nama }}</div>
              <div>NIP: {{ pasien?.pegsim?.nip }}</div>

            </div>

          </div>

        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn class="q-mr-sm" color="negative" dense flat icon="icon-mat-delete" @click="hapus(store.item)"
          :loading="store.item?.loading" :disable="store.item?.loading">
          <q-tooltip class="bg-white text-primary">
            Hapus data ini
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Dialog } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'
import { useTravellingHDStore } from 'src/stores/simrs/hemodialisa/travelling'
import { computed } from 'vue'

const store = useTravellingHDStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
function hapus (item) {
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakah anda yakin ingin menghapus item ini?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.deleteData(item)
  })
}

const qrDokter = computed(() => {
  // const petugas = 'Nama : ' + dpjp?.value?.nama ?? '' + 'NIP : ' + dpjp?.value?.nip ?? ''
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'TRAVELING HD.png'
  const asal = 'HEMODIALISA'
  const petugas = props?.pasien?.pegsim?.nip
  const enc = btoa(`${noreg}|${dok}|${asal}|${petugas}`)
  return `${enc}`
})

const printObj = {
  id: 'printMe',
  popTitle: 'Dokumen travelling'

}
</script>
<style scoped>
.print-field {
  display: flex;
  margin-bottom: 4px;
}

.print-field .label {
  width: 200px;
  font-weight: bold;
}

.print-field .value {
  flex: 1;
}

.print-section {
  margin-top: 12px;
}

.ttd {
  margin-top: 50px;
  padding-right: 20px;
}

@media print {
  .ttd {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
