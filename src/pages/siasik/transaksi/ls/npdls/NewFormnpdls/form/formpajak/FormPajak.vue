<template>
  <q-dialog class="q-mt-xl" backdrop-filter="blur(4px)" persistent>
    <q-card style="min-width:80vw;">
      <q-card-section class="row items-center">
        <div class="column">
          <div class="f-14 text-weight-bold">
            DATA PAJAK {{ npd.form.nonpdls }}
          </div>
          <div class="f-10">
            Silahkan Input Data Pajak Pengajuan Belanja
          </div>
        </div>
        <q-space />
        <q-btn v-close-popup icon="icon-mat-clear" flat round dense />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form class="row items-center" @submit="submitPajak" ref="formpajak">
          <div class="q-px-xs q-pb-xs" style="width: 50%">
            <app-autocomplete label="Pilih Utang Pajak" v-model="store.form.koderekening" autocomplete="uraian" outlined
              :option-label="opt => Object(opt) === opt && 'kodeall3' in opt ? opt.kodeall3 + ' - ' + opt.uraian : 'Silahkan Dipilih'"
              option-value="kodeall3" :source="store.getpajak" @selected="(val) => pilihPajak(val)"
              :disable="store.disabled" :loading="store.loading" />
          </div>
          <div class="q-px-xs" style="width: 50%">
            <app-input-simrs label="Nilai Pajak" v-model="store.form.nilai" outlined :autofocus="false"
              :valid="{ required: true, number: true }" :disable="store.disabled" />
          </div>
          <div class="row flex-center q-pt-sm" style="width: 100%">
            <app-btn label="Simpan Pajak" class="bg-black" type="submit" :disable="store.loading"
              :loading="store.loading" />
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div v-if="store.listpajak === ''" class="full-width text-center">
          <h6>Belum Ada Data Tersimpan</h6>
        </div>
        <q-markup-table v-else dense flat bordered :separator="separator">
          <thead>
            <tr style="height: 35px">
              <th class="text-bold bg-dark text-white">
                Kode Rekening
              </th>
              <th class="text-bold bg-dark text-white">
                Uraian
              </th>
              <th class="text-bold bg-dark text-white">
                Nilai (Rp.)
              </th>
              <th class="text-bold bg-dark text-white" style="width:10%">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, n) in store.listpajak" :key="n">
              <td>
                {{ item.koderekening }}
              </td>
              <td>
                {{ item.uraian }}
              </td>
              <td class="text-right">
                {{ formattanpaRp(item.nilai) }}
              </td>
              <td>
                <div class="row justify-center">
                  <div class="q-pr-sm">
                    <q-btn size="xs" round color="teal" icon="icon-mat-edit" @click="editData(item)"
                      :loading="store.loading" />
                    <q-tooltip transition-show="scale" transition-hide="scale" class="bg-teal" anchor="center right"
                      self="center left" :offset="[5, 5]">
                      Edit Rincian
                    </q-tooltip>
                  </div>
                  <div>
                    <q-btn size="xs" round color="negative" icon="icon-mat-delete" @click="deleteData(item.id)"
                      :loading="store.loading" />
                    <q-tooltip transition-show="scale" transition-hide="scale" class="bg-negative" anchor="center right"
                      self="center left" :offset="[5, 5]">
                      Hapus Rincian
                    </q-tooltip>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-bold text-center">
                Jumlah
              </td>
              <td class="text-bold text-right">
                {{ formattanpaRp(jumlahpajak()) }}
              </td>
              <td></td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { formattanpaRp } from 'src/modules/formatter';
import { formInputNpdlsStore } from 'src/stores/siasik/transaksi/ls/newnpdls/formnpdls';
import { formInputPajakStore } from 'src/stores/siasik/transaksi/ls/newnpdls/formpajak';
import { onBeforeMount, ref } from 'vue';


const store = formInputPajakStore()
const npd = formInputNpdlsStore()
const edit = ref(null)
const formpajak = ref(null)
const separator = ref('cell')
const $q = useQuasar()

onBeforeMount(() => {
  store.getSelectpajak()
  store.getListpajak()
})
function pilihPajak(val) {
  const arr = store.getpajak
  const obj = arr?.length ? arr.find(x => x.kodeall3 === val) : null
  store.form.uraian = obj?.uraian ?? ''
}
function submitPajak() {
  console.log('row', store.form)
  const payload = {
    nonpdls: npd.form?.nonpdls
  }
  store.savePajak(payload).then(() => {
    // store.savelist.push(savelistdata.value)
    // savelistdata.value = store.savelist
    store.getListpajak()
    console.log('hasil', store.savelist);
    // store.resetForm()
    // formpajak.value.resetValidation()

  })

}
function editData(id) {
  console.log('row edit', id)
  edit.value = id
  store.form = edit.value
}
const datasal = ref([])
function deleteData(id) {
  console.log('row edit', id)
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
  }).onOk(() => {
    const payload = {
      id: id
    }
    // console.log('saldohapus', store.datasaldo.id)
    store.deletePajak(payload)
  }).onCancel(() => {
    // console.log('Cancel')
    datasal.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
function jumlahpajak() {
  const data = store.listpajak.map(x => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  return data
}
</script>
