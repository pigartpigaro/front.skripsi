<template>
  <q-dialog v-model="store.dialoggambar" :backdrop-filter="backdropFilter" transition-show="flip-down"
    transition-hide="flip-up">
    <q-card style="max-width: 500px; width: 100%;">
      <q-form ref="refFormGambar" @submit="onSubmit">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Input File</div>{{ store.formgambar.noarsip }}
        </q-card-section>
        <q-separator />

        <q-card-section align="center" class="full-height">
          <div>
            <div class="row q-gutter-xs ">
              <div class="col-12">
                <q-uploader ref="uploader" :factory="uploadFiles" :loading="uploadPercent" bordered flat
                  :label="`Upload Dokumen/ Arsip`" accept=".pdf" class="fit full-width" multiple max-files="1"
                  auto-upload @finish="finished" @rejected="onRejected" style="min-height: 200px;">
                  <template #list="scope">
                    <div class="full-height full-width">
                      <div v-if="scope.files?.length === 0" class="column flex-center full-height">
                        <q-icon name="icon-mat-cloud_upload" size="40px" color="primary" />
                        <div class="f-10">
                          Seret Gambar Kesini
                        </div>
                        <div class="text-grey-5 f-10">
                          atau
                        </div>
                        <div class="f-10">
                          Klik tanda plus diatas
                        </div>
                      </div>
                      <div v-else class="full-width full-height row">
                        <div v-for="file in scope.files" :key="file.__key" class="col-3 q-pa-xs">
                          <q-img :src="getImg(file?.__img?.src)"
                            style="border-radius: 10px; border: 2px solid grey; overflow: hidden;">
                            <div class="absolute-top f-12">
                              <div class="row items-center justify-between">
                                <div>
                                  {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                                </div>
                              </div>
                            </div>
                            <div class="absolute-bottom f-14">
                              <div class="row items-center justify-between">
                                <div />
                                <q-btn class="gt-xs" size="sm" color="negative" flat dense round icon="icon-mat-delete"
                                  @click="scope.removeFile(file)" />
                              </div>
                            </div>
                          </q-img>
                        </div>
                      </div>
                    </div>
                  </template>
                </q-uploader>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn color="red" label="Simpan" tooltip="Simpan Data" type="submit" tip :loading="store.loadingForm" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>

</template>
<script setup>
import { useQuasar } from 'quasar';
import { useUnitPengelolahArsipStore } from 'src/stores/simrs/unitpengelolaarsip/arsip';
import { ref } from 'vue';

const store = useUnitPengelolahArsipStore()
const backdropFilter = ref('blur(4px)')
const $q = useQuasar()

const props = defineProps({
  klasifikasi: {
    type: Object,
    default: null
  },
  media: {
    type: Object,
    default: null
  },
  lokasiarsip: {
    type: Object,
    default: null
  },
})

const getImg = (file) => {
  if (file) {
    return file
  }
  else {
    return new URL('../../../../../assets/images/PDF_file_icon.png', import.meta.url).href
  }
}

function uploadFiles(file) {

  store.selectFiles(file)
}
// function uploadFiles(file) {
//   return new Promise((resolve, reject) => {
//     try {
//       store.selectFiles(file);
//       // Simulasi delay, atau resolve langsung jika tidak ada proses upload ke server
//       resolve();
//     } catch (e) {
//       reject(e);
//     }
//   });
// }

function uploadPercent(files) {
  console.log('upload percent', files)
}

function finished() {
  console.log('finished')
}

function onRejected(rejectedEntries) {
  console.log('rejected')
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries?.length} ... Maaf Besar Dokummen tidak boleh lebih dari 1024 KB / 1 MB`
  })
}

function onSubmit() {
  store.saveDataGambar()
}

store.initFormGambar()

</script>
