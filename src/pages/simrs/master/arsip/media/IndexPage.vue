<template>
  <q-page class="column full-height" style="overflow: hidden;">
    <q-card flat square class="col column q-ma-sm full-height">
      <q-card-section class="col-auto">
        <div class="full-width row justify-between items-center content-between">
          <div class="bg-white col-grow">
            <div class="flex flex-column items-center flex-center">
              <div class="col text-left">
                <div class="f-14 text-weight-bold">
                  Master Media Arsip
                </div>
                <div class="title-desc">
                  Master Media Arsip
                </div>
              </div>
            </div>
          </div>
          <div class="flex q-gutter-sm">
            <q-input v-model="store.params.q" placeholder="Cari Media ..." dense outlined style="min-width:200px"
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
                @delete="(val) => hapusmastermedia(val)" />
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
import { useQuasar } from 'quasar';
import { useArsipMasterMediaStore } from 'src/stores/arsip/master/mmedia';

const $q = useQuasar()
const options = ref([])
const store = useArsipMasterMediaStore()

function hapusmastermedia(id) {
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


onMounted(() => {
  store.getMastermedia()
})
</script>
