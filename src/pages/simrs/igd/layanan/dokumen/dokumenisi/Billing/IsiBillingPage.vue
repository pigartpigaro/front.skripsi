<template>
  <div v-if="!store.rekapBill && !store.loading">
    <app-no-data />
  </div>
  <div v-if="store.loading">
    <app-loading />
  </div>
  <div v-if="store.rekapBill && !store.loading" class="full-height">
    <div class="row items-center no-wrap ">
      <div class="col-1">
        1.
      </div>
      <div class="col-9">
        Administrasi
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.adminigd) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1">
        2.
      </div>
      <div class="col-9">
        Tindakan :
      </div>
    </div>
    <div v-if="store.rekapBill.tindakan?.length">
      <div v-for="(tin, i) in store.rekapBill.tindakan" :key="i" class="row items-center no-wrap ">
        <div class="col-1" />
        <div class="col-9">
          {{ tin.namatindakan }}
        </div>
        <div class="col-2 garis-bawah-dablue text-right">
          {{ formatRp(tin.subtotal) }}
        </div>
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1">
        3.
      </div>
      <div class="col-9">
        Biaya Pelayanan Penunjang
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Laboratorium
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.laborat) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Radiologi
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.radiologi) }}
      </div>
    </div>
    <!-- <div class="row items-center no-wrap ">
            <div class="col-1" />
            <div class="col-9">
              Operasi One Day Care
            </div>
            <div class="col-2 garis-bawah-dablue text-right">
              {{ formatRp(store.rekapBill.onedaycare) }}
            </div>
          </div> -->
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Fisioterapi
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.fisioterapi) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Hemodialisa
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.hd) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Anestesi Di Luar OK & ICU
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.penunjanglain) }}
      </div>
    </div>
    <!-- <div class="row items-center no-wrap ">
            <div class="col-1" />
            <div class="col-9">
              Klinik Psikologi
            </div>
            <div class="col-2 garis-bawah-dablue text-right">
              {{ formatRp(store.rekapBill.psikologi) }}
            </div>
          </div> -->
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Cardio
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.cardio) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        EEG
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.eeg) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Endoscope
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.endoscopy) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Biaya Penggunaan Darah
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.bdrs) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        OK IGD
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.okigd) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Tindakan Operasi IGD
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.tindakanokigd) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        OK IBS
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.okranap) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Tindakan Operasi IBS
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.tindakanokranap) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Perawatan Jenasah
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.perawatanjenasah) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1" />
      <div class="col-9">
        Ambulan
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.ambulan) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1">
        4.
      </div>
      <div class="col-9">
        Biaya Farmasi / Obat
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.farmasi + store.rekapBill.eresep) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-1">
        5.
      </div>
      <div class="col-9">
        Biaya Pembuatan Dokumen dan Materai
      </div>
      <div class="col-2 garis-bawah-dablue text-right">
        {{ formatRp(store.rekapBill.biayamatrei) }}
      </div>
    </div>

    <div class="row items-center no-wrap ">
      <div class="col-10 text-right">
        Sub Total Rp.
      </div>
      <div class="col-2 text-right garis-bawah-dablue">
        {{ formatRp(store.rekapBill.totalall) }}
      </div>
    </div>
    <div class="row items-center no-wrap ">
      <div class="col-10 text-right">
        Sharing BPJS Rp.
      </div>
      <div class="col-2 text-right ">
        0
      </div>
    </div>
    <div class="row items-center no-wrap">
      <div class="col-10 text-right">
        Total Rp.
      </div>
      <div class="col-2 text-right garis-atas-dblue garis-bawah-dablue">
        {{ formatRp(store.rekapBill.totalall) }}
      </div>
    </div>

    <div class="row items-center no-wrap q-mt-xl">
      <div class="col-6 text-right" />
      <div class="col-6 text-weight-bold text-center">
        Probolinggo, {{ date.formatDate(Date.now(), 'DD MMMM YYYY') }}
      </div>
    </div>
    <div class="row items-center no-wrap">
      <div class="col-6 text-right" />
      <div class="col-6 text-weight-bold text-center">
        Dokter
      </div>
    </div>
    <div class="row items-center no-wrap">
      <div class="col-6 text-right" />
      <div class="col-6 text-weight-bold text-center">
        <div class="column flex-center">
          <div style="width: 100px;">
            <vue-qrcode :value="qrUrl" tag="svg" :options="{
              errorCorrectionLevel: 'Q',
              color: {
                dark: '#000000',
                light: '#ffffff',
              },
              margin: 0
            }" />
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center no-wrap q-mt-lg">
      <div class="col-6 text-right" />
      <div class="col-6 text-weight-bold text-center">
        {{ pasien.dokter }}
      </div>
    </div>
  </div>

</template>
<script setup>
import { formatRp } from 'src/modules/formatter';
import { useKasirIgdStore } from 'src/stores/simrs/kasir/igd/kasirigd';
import { date } from 'quasar';
import { computed } from 'vue';

const store = useKasirIgdStore()
const props = defineProps({
  pasien: { type: Object, default: () => { } }
})

const qrUrl = computed(() => {
  const noreg = props?.pasien?.noreg// noreg
  const dok = 'BILLING.png'
  const asal = 'IGD'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

</script>

<style lang="scss" scoped>
.garis-bawah-dablue {
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
</style>
