<template>
  <q-form ref="formInput" @submit="saveNotaDinas">
    <div class="row">
      <app-input-simrs v-model="store.rinci.nonpdls" class="col q-pa-sm q-gutter-y-md" label="NPD-LS" outlined readonly
        :valid="{ required: false }" />
      <app-input-simrs v-model="store.rinci.tglnpd" class="col q-pa-sm q-gutter-y-md" label="Tanggal NPD-LS" outlined
        readonly :valid="{ required: false }" />


    </div>
    <div class="row">
      <app-input-simrs v-model="store.rinci.kegiatanblud" class="col q-pa-sm q-gutter-y-md" label="Kegiatan BLUD"
        outlined readonly :valid="{ required: false }" />

      <app-input-simrs :model-value="formattanpaRp(store.rinci.total)" class="col q-pa-sm q-gutter-y-md"
        label="Total NPD-LS" outlined readonly :valid="{ required: false }" />
    </div>
    <div class="row items-center q-pb-md q-pa-sm q-gutter-y-md">
      <div>
        <app-btn label="Simpan Rincian" class="bg-black" type="submit" :disable="store.loading"
          :loading="store.loading" />
      </div>
    </div>
  </q-form>

</template>
<script setup>
import { notifErrVue } from 'src/modules/utils';
import { ref } from 'vue';
import { formattanpaRp } from 'src/modules/formatter'
import { useFormNotadinasStore } from 'src/stores/siasik/transaksi/ls/notadinas/form';

const store = useFormNotadinasStore()
const options = ref([])
const formInput = ref(null)


const props = defineProps({
  data: {
    type: Object,
    default: null
  }
})


function saveNotaDinas() {

  if (!store.formheader.rincians) {
    store.formheader.rincians = [];
  }

  const objrincian = { ...store.rinci }; // Salin objek rinci

  store.formheader.rincians.push(objrincian);


  if (store.rinci.tglnpd > store.formheader.tglnotadinas) {
    notifErrVue('Tanggal NPD-LS tidak boleh melebihi tanggal Nota Dinas')
    return
  }

  if (store.formheader.rincians.length > 2) {
    if (store.datanpd.kode !== store.formheader.rincians[0]?.kodebelanja) {
      notifErrVue('Jenis Rekening Belanja NPD-LS Harus Sama')
      return
    }
  }

  console.log('objrincian', store.formheader);
  store.saveData(props.data).then(() => {
    store.rinci.nonpdls = ''
    store.rinci.tglnpd = ''
    store.rinci.kegiatan = ''
    store.rinci.kodekegiatanblud = ''
    store.rinci.kegiatanblud = ''
    store.rinci.nokontrak = ''
    store.rinci.noserahterima = ''
    store.rinci.total = 0
    store.rinci.kodebelanja = ''
    formInput.value.resetValidation()
    store.disabled = true
    store.formheader.rincians = []
  })

  // console.log('store.rinci', store.rinci)
  // console.log('store.header', store.formheader)
}

</script>
