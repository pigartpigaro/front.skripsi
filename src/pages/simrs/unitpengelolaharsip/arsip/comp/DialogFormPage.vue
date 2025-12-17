<template>
  <q-dialog v-model="store.dialog" :backdrop-filter="backdropFilter" transition-show="flip-down"
    transition-hide="flip-up">
    <q-card>
      <q-form ref="refForm" @submit="onSubmit">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Entry Data Arsip</div>
        </q-card-section>
        <q-separator />

        <q-card-section align="center" class="full-height full-width ">
          <div>
            <div class="row">
              <div class="col-6 ">
                <app-input-date-human :model="store.tanggal.tgl" label="Tanggal" outlined @db-model="setFrom"
                  style="width: 260px;" @set-display="setToFromDisp" />
              </div>
              <div class="col-6">
                <q-input v-model="store.form.kodekelasifikasi" label="Kode Klasifikasi" outlined dense
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" style="width: 260px;" disable />
                <!-- <q-select v-model="store.form.kodekelasifikasi" label="Kode Klasifikasi" outlined dense
                  :options="options" use-input option-label="nama" option-value="kode" clearable emit-value map-options
                  @update:model-value="(val) => kodeklasifikasi(val)"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" @filter="filterFn" style="width: 260px;">
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps"><q-item-section avatar>
                        <q-item-label>
                          <span class="text-bold">{{ scope.opt.kode }} </span><br />
                          <span>{{ scope.opt.nama }}</span>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
<template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Data Tidak Ditemukan....
                      </q-item-section>
                    </q-item>
                  </template>
</q-select> -->
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-select v-model="store.form.kelasifikasi" label="Kode Klasifikasi" outlined dense :options="options"
                  use-input option-label="nama" option-value="kode" clearable emit-value map-options
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" @filter="filterFn"
                  @update:model-value="(val) => kodeklasifikasi(val)">
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps"><q-item-section avatar>
                        <q-item-label>
                          <span class="text-bold">{{ scope.opt.kode }} </span><br />
                          <span>{{ scope.opt.nama }}</span>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Data Tidak Ditemukan....
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row">
              <div class=" col-12">
                <q-input type="textarea" v-model="store.form.uraian" label="Deskripsi" outlined
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <q-select v-model="store.form.lokasi" label="Lokasi Arsip" outlined dense :options="lokasiarsip"
                  option-value="id" option-label="nama_lokasi" emit-value map-options
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" style="width: 260px;" />
              </div>
              <div class="col-6">
                <q-select label="Jenis Media" v-model="store.form.media" outlined dense :options="media"
                  option-label="nama_media" option-value="id" clearable emit-value map-options @filter="filterFnmedia"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" style="width: 260px;">
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps"><q-item-section avatar>
                        <q-item-label>
                          <span class="text-bold">{{ scope.opt.nama_media }} </span>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Data Tidak Ditemukan....
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row">
              <div class="col-4" align="left">
                <q-option-group v-model="store.form.keaslian" :options="keaslian" color="primary" inline dense
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
              </div>
              <div class="col-4">
                <q-input v-model="store.form.jumlah" label="Jumlah" input-class="text-right" outlined dense
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" type="number" style="width: 95%;" />
              </div>
              <div class="col-4">
                <q-input v-model="store.form.nobox" label="No. Laci" outlined dense input-class="text-right"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" type="number" style="width: 95%;" />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-input type="textarea" v-model="store.form.keterangan" label="Keterangan" outlined
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
              </div>
            </div>
            <!-- <div class="row q-gutter-xs">
              <div class="col-12" v-if="store.form.noarsip === '' || store.form.noarsip === null">
                <q-uploader ref="uploader" :factory="uploadFiles" :loading="uploadPercent" bordered flat
                  :label="`Upload Dokumen/ Arsip`" accept=".pdf" class="fit" multiple max-files="1" auto-upload
                  @finish="finished" @rejected="onRejected">
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
            </div> -->
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

const keaslian = ref([
  { label: 'Copy', value: 'Copy' },
  { label: 'Asli', value: 'Asli' }
])

const options = ref([props.klasifikasi])

function filterFn(val, update) {

  if (val === "") {
    update(() => {
      options.value = props.klasifikasi
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase();

    options.value = props.klasifikasi.filter(
      (v) =>
        v.nama.toString().toLowerCase().indexOf(needle) > -1 ||
        v.kode.toString().toLowerCase().indexOf(needle) > -1
    );
  });
}

const optionsmedia = ref([props.media])

function filterFnmedia(val, update) {

  if (val === "") {
    update(() => {
      optionsmedia.value = props.media
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase();

    optionsmedia.value = props.media.filter(
      (v) =>
        v.nama_media.toString().toLowerCase().indexOf(needle) > -1
    );
  });
}

const getImg = (file) => {
  if (file) {
    return file
  }
  else {
    return new URL('../../../../../assets/images/PDF_file_icon.png', import.meta.url).href
  }
}

function uploadFiles(file) {
  // console.log(file)
  store.selectFiles(file)
}

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

function setFrom(val) {
  store.form.tgl = val
}

function setToFromDisp(vaal) {
  store.tanggal.tgl = vaal
}

function onSubmit() {
  if (store.form.keaslian === '' || store.form.keaslian === null) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'icon-mat-warning',
      message: 'Maaf Keaslian harus dipilih'
    })
    store.loading = false
  }
  store.saveData()
}

function kodeklasifikasi(val) {
  store.form.kodekelasifikasi = val
}

store.initForm()

</script>
