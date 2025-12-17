<template>
  <q-page class="column full-height" style="overflow: hidden;">
    <q-card flat square class="col column q-ma-sm full-height">
      <q-card-section class="col-auto">
        <div class="full-width row justify-between items-center content-between">
          <div class="bg-white col-grow">
            <div class="flex flex-column items-center flex-center">
              <div class="col text-left">
                <div class="f-14 text-weight-bold">
                  Master Kelasifikasi Arsip
                </div>
                <div class="title-desc">
                  Master Kelasifikasi Arsip
                </div>
              </div>
            </div>
          </div>
          <div class="flex q-gutter-sm">
            <q-input v-model="store.params.q" placeholder="Cari Kelasifikasi ..." dense outlined style="min-width:200px"
              debounce="800" :loading="store.loading" @update:model-value="store.search" standout="bg-yellow-3">
              <template #prepend>
                <q-icon name="icon-mat-search" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <div class="col-grow full-height relative-position">
        <div class="absolute full-width full-height">
          <div class="row full-height">
            <div class="col-4 full-height scroll q-pa-sm">
              <FormPage />
            </div>
            <div class="col-8 full-height bg-grey scroll q-pa-sm">
              <ListPage :listmaster="store.items" @edit="(val) => store.editForm(val)"
                @delete="(val) => hapuskelasifikasi(val)" />
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FormPage from './comp/FormPage.vue';
import ListPage from './comp/ListPage.vue';
import { useArsipMasterKelasifikasiStore } from 'src/stores/arsip/master/mkelasifikasi';
import { useQuasar } from 'quasar';

const $q = useQuasar()
const options = ref([])

function hapuskelasifikasi(id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.deleteData(id)
  }).onCancel(() => {
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

const store = useArsipMasterKelasifikasiStore()
onMounted(() => {
  store.getMkelasifikasi()
})

function filterFn(val, update) {
  if (val === '') {
    update(() => {
      options.value = store.items
      // console.log('opti', options.value)
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    const arr = options.value

    const filter = ['kode', 'nama']

    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) => filterKeys.some(
        (key) =>
          item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
          item[key]
      )
      )
    const filteredData = multiFilter(arr, filter, needle)
    console.log('filterdata', filteredData)
    options.value = filteredData
    // options.value = store.optionrekening.filter(
    //   (v) => v.uraian.toLowerCase().indexOf(needle) > -1 || v.kodeall3.toLowerCase().indexOf(needle) > -1
    // )
  })
}
</script>
