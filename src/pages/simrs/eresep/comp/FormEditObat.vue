<template>
  <q-dialog persistent backdrop-filter="blur(4px)" @show="showMe">
    <q-card style="min-width: 70vw; ">
      <q-bar class="bg-primary">
        <q-space />

        <q-btn v-close-popup dense flat color="white" icon="icon-mat-close" @click="() => {
          store.openEditItem = false
          store.itemToEdit = null
          signa = ''
        }">
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section v-if="!store.itemToEdit?.loading">
        <div>
          <div class="row no-wrap items-center">
            <div class="col-11">
              <div class="row  q-col-gutter-sm items-center">
                <div class="col-6">
                  {{ store.itemToEdit?.mobat?.nama_obat }}
                </div>
                <div class="col-3">
                  <q-input ref="refQty" v-model="store.itemToEdit.jumlah" label="Qty" dense
                    :rules="[val => parseFloat(val) >= 1 || '']" lazy-rules no-error-icon hide-bottom-space
                    standout="bg-yellow-3" outlined @update:model-value="setJumlah" @keyup.enter.stop="qtyEnter"
                    @focus="focusJumlah()" />
                </div>
                <div class="col-3">
                  <q-select ref="refSigna" v-model="signa" label="Aturan Pakai" use-input fill-input hide-selected dense
                    clearable standout="bg-yellow-3" option-label="signa" outlined option-value="signa"
                    :rules="[val => (val !== null && val !== '') || '']" lazy-rules no-error-icon hide-bottom-space
                    hide-dropdown-icon @filter="store.getSigna" :options="store.signas"
                    @update:model-value="signaSelected" @keyup.enter.stop="signaEnter" />
                </div>
                <div class="col-6">
                  <q-input ref="refKonsumsi" v-model="store.itemToEdit.konsumsi" label="Dikonsumsi selama (hari)" dense
                    lazy-rules no-error-icon hide-bottom-space standout="bg-yellow-3" outlined />
                </div>
                <div class="col text-right">
                  <q-input ref="refKet" v-model="store.itemToEdit.keterangan" label="Keterangan" dense
                    standout="bg-yellow-3" outlined class="full-width" @keyup.enter="ketEnter" />
                </div>
              </div>
            </div>
            <div class="col-1 text-right">
              <q-btn color="dark" dense flat icon="icon-mat-save" :disable="store.loading || store.loadingkirim"
                :loading="store.loading" @click="simpanObat">
                <q-tooltip class="bg-white text-primary">
                  Simpan Edit
                </q-tooltip>
              </q-btn>
            </div>
          </div>

          <!-- {{ store.itemToEdit }} -->
        </div>
      </q-card-section>
      <q-card-section v-if="store.itemToEdit?.loading" style="height: 100px;">
        <app-loading />
      </q-card-section>
    </q-card>
  </q-dialog>

</template>
<script setup>
import { Dialog } from 'quasar'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { ref, watch } from 'vue'

const store = usePermintaanEResepStore()

const signa = ref('')
const refQty = ref(null)
const refSigna = ref(null)
const refKet = ref(null)
const refKonsumsi = ref(null)

function focusJumlah () {
  refQty.value.select()
}
function qtyEnter () {
  refSigna.value.focus()
  refSigna.value.showPopup()
}
function setJumlah (val) {
  let jumlah = parseFloat(val)
  if (signa.value) {
    if (parseFloat(jumlah) > 0) {
      const kons = jumlah / parseFloat(signa.value?.jumlah)
      store.itemToEdit.konsumsi = kons
    }
  }
  console.log('signa', jumlah, signa.value)
  // // console.log('jumlah', jumlah)
  // // console.log('alokasi', store.form.stokalokasi)
  // if (jumlah > parseFloat(store.form.stokalokasi)) {
  //   jumlah = parseFloat(store.form.stokalokasi)
  //   store.itemToEdit.jumlah = jumlah
  //   notifErrVue('jumlah tidak boleh melebihi jumlah alokasi')
  // }
  // if (Object?.keys(signa.value)?.length) {
  //   if (parseFloat(jumlah) > 0) {
  //     const kons = jumlah / parseFloat(signa.value?.jumlah)
  //     store.setForm('konsumsi', kons)
  //   }
  // }
  // else if (store.form?.aturan !== '') {
  //   const sign = store.signas.filter(sig => sig.signa === store?.form?.aturan)
  //   if (sign?.length) {
  //     if (parseFloat(jumlah) > 0) {
  //       const kons = jumlah / parseFloat(signa.value?.jumlah)
  //       store.setForm('konsumsi', kons)
  //     }
  //   }
  // }
}

function signaSelected (val) {
  console.log('signa', val)
  if (val) {
    store.itemToEdit.aturan = val?.signa
    if (parseFloat(store.itemToEdit.jumlah) > 0) {
      const kons = parseFloat(store.itemToEdit.jumlah) / parseFloat(val.jumlah)
      store.itemToEdit.konsumsi = kons
    }
  }
  refSigna.value.validate()

}
function signaEnter () {

  refKet.value.focus()
  refKet.value.select()
}

function ketEnter () {
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakah Akan dilanjutkan untuk di simpan?',
    ok: {
      push: true,
      label: 'Simpan',
      color: 'primary',
      'no-caps': true
    },
    cancel: {
      push: true,
      label: 'Batal',
      color: 'dark',
      'no-caps': true
    }
  })
    .onOk(() => {
      simpanObat()
    })
}
function simpanObat () {
  console.log('simpan obat', store.itemToEdit)
  store.simpanEditObatHasilDuplicate()
  // // console.log('obat', refObat.value?.refObat)

  // if (validate()) {
  // const form = store.form
  // store.simpanObat(form)?.then(() => {
  //   signa.value = null

  // })
  // }
}

function showMe () {
  // // console.log('show me')
  signa.value = ''
  store.getSigna(store.itemToEdit.aturan)
  refQty.value.focus()
  refQty.value.select()
}

watch(() => store.signas, (val) => {
  // console.log('val', val, store.signas)
  if (val?.length && store.itemToEdit?.aturan) {
    signa.value = store.signas.find(sig => sig.signa === store.itemToEdit.aturan)
  }

})
</script>
