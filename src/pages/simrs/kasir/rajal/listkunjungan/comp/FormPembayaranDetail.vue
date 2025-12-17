<template>
  <q-form ref="refForm" class="full-height bg-grey-1">
    <div class="row">
      <div class="col-12 text-weight-bold q-gutter-sm">
        <q-radio v-model="storex.jenispembayaran" val="karcis" label="Pelayanan RM" size="sm" dense><q-item-label
            caption> ( {{
              formatRpDouble(karcis) }} )</q-item-label></q-radio>
        <q-radio v-model="storex.jenispembayaran" val="konsulantarpoli" label="Konsul Antar Poli" size="sm"
          dense><q-item-label caption> ( {{
            formatRpDouble(billing?.konsulantarpoli) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="laborat" label="Laborat" size="sm" dense><q-item-label caption> (
            {{
              formatRpDouble(billing?.laborat) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="radiologi" label="Radiologi" size="sm" dense><q-item-label
            caption> ( {{
              formatRpDouble(billing?.radiologi) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="onedaycare" label="Onedaycare" size="sm" dense><q-item-label
            caption> ( {{
              formatRpDouble(billing?.onedaycare) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="fisioterapi" label="Fisioterapi" size="sm" dense><q-item-label
            caption> ( {{
              formatRpDouble(billing?.fisioterapi) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="penunjanglain" label="Penunjanglain" size="sm" dense><q-item-label
            caption> ( {{
              formatRpDouble(billing?.penunjanglain) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="psikologi" label="Psikologi" size="sm" dense><q-item-label
            caption> ( {{
              formatRpDouble(billing?.psikologi) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="cardio" label="Cardio" size="sm" dense><q-item-label caption>
            ( {{
              formatRpDouble(billing?.cardio) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="eeg" label="Eeg" size="sm" dense><q-item-label caption>
            ( {{
              formatRpDouble(billing?.eeg) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="endoscopy" label="Endoscopy" size="sm" dense><q-item-label
            caption>
            ( {{
              formatRpDouble(billing?.endoscopy) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="obat" label="Obat" size="sm" dense><q-item-label caption>
            ( {{
              formatRpDouble(billing?.obat) }} )</q-item-label></q-radio>
        <q-radio v-model="store.jenispembayaran" val="farmasinew" label="E-Resep" size="sm" dense><q-item-label caption>
            ( {{
              formatRpDouble(billing?.farmasinew) }} )</q-item-label></q-radio>
      </div>
    </div>
    <q-separator class="q-ma-sm" />
    <div class="row text-weight-bold q-mt-sm ">
      <div class="col-4  q-gutter-lg">
        <q-radio v-model="store.form.carabayar" val="Tunai" label="Tunai" size="sm" dense
          @update:model-value="(val) => jeniscarabayar(val)" />
      </div>
      <div class="col-4">
        <q-radio v-model="store.form.carabayar" val="Qris" label="Qris" size="sm" dense
          @update:model-value="(val) => jeniscarabayar(val)" />
      </div>
      <div class="col-4">
        <q-radio v-model="store.form.carabayar" val="VA" label="VA" size="sm" dense
          @update:model-value="(val) => jeniscarabayar(val)" />
      </div>
    </div>
    <!-- <div class="row q-mt-sm">
      <div class="col-4">
        <q-btn color="primary" label="SIMPAN" />
      </div>
    </div> -->
  </q-form>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { formatRpDouble } from 'src/modules/formatter';
import { useKasirRajalListKunjunganStore } from 'src/stores/simrs/kasir/rajal/kunjungan';
import { usePembayaranKasirRajalStore } from 'src/stores/simrs/kasir/rajal/pembayaran';
import { ref } from 'vue';

const refForm = ref(null)
const store = usePembayaranKasirRajalStore()
const storex = useKasirRajalListKunjunganStore()

const $q = useQuasar()

const prop = defineProps({
  pasien: { type: Object, default: () => { } },
  billing: { type: Object, default: () => { } },
  kwitansi: { type: Array, default: () => [] },
  jenislayanan: { type: String, default: '' },
})

function jeniscarabayar(val) {
  if (storex.jenispembayaran === '' || storex.jabatan === null) {
    $q.notify({
      type: 'negative',
      title: 'Peringatan',
      message: 'INFO WARNING <b/> MAAF,<em><b>Anda Belum Memilih Jenis Pelayanan</b></em>',
      html: true,
      timeout: 1000
    })
    store.form.carabayar = ''
  } else {
    console.log('val', storex.jenispembayaran)
    if (storex.jenispembayaran === 'karcis') {
      console.log('valxxx', val)
      if (val === 'Tunai') {
        $q.dialog({
          dark: true,
          title: 'Peringatan',
          message: 'Apakah Data ini akan DISIMPAN?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          // console.log('OK')
          store.savePembayaran(prop.pasien, prop.billing, prop.jenislayanan, val)
        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      } else if (val === 'Qris') {
        $q.dialog({
          dark: true,
          title: 'Peringatan',
          message: 'Apakah Data Anda Ingin Create QRIS?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          // console.log('OK')
          store.createQris(prop.pasien, prop.billing, prop.jenislayanan, val)
        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          // console.log(
        })
      }
    }
  }
}

const karcis = parseFloat(prop?.billing?.poliklinik + prop?.billing?.kartuidentitas + prop?.billing?.pelayananrm)
</script>
