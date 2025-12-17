<template>
  <div class="fit">
    <div v-if="!items?.length" class="q-pa-md column full-height flex-center">
      <div>Belum Ada Data Tersimpan</div>
    </div>
    <div v-else class="full-height q-pa-sm scroll">
      <q-card v-for="(item, n) in items" :key="n" flat bordered rouunded class="full-width q-mb-sm">
        <q-list bordered class="rounded-borders">
          <q-expansion-item>
            <template #header>
              <q-item-section avatar>
                <q-avatar :color="warnaAvatar(item?.nakes)" text-color="white">
                  {{ titleAvatar(item?.nakes) }}
                </q-avatar>
              </q-item-section>

              <q-item-section caption>
                <div class="">
                  <span class="text-weight-bold">PPA</span> <span class="text-weight-medium">- {{ item?.petugas?.nama
                    }}</span>
                </div>
              </q-item-section>

              <q-item-section side>
                <div class="flex q-gutter-lg items-center">
                  <div v-if="auth?.user?.pegawai?.kdpegsimrs === item?.user">
                    <q-btn round flat size="sm" icon="icon-mat-delete" color="negative" @click="deleteItem(item)">
                      <q-tooltip> Hapus </q-tooltip>
                    </q-btn>
                  </div>
                  <div>
                    <div class="text-grey-8">
                      <span class="text-weight-bold"></span> <em class="text-weight-medium"> {{
                        dateFullFormat(item?.tgl) }}</em>
                    </div>
                    <div class="text-grey-8 q-mt-xs">
                      <q-badge class="q-px-sm q-py-xs" outline color="primary">
                        <div class="flex q-gutter-sm">
                          <div class="">
                            Jam
                          </div>
                          <div>:</div>
                          <div class="text-weight-bold">
                            {{ jamTnpDetik(item?.tgl) }}
                          </div>
                        </div>
                      </q-badge>
                    </div>
                  </div>
                </div>
              </q-item-section>
            </template>

            <q-card bordered flat class="bg-grey-4 full-height">
              <div class="q-pa-md">
                <div class="row q-col-gutter-sm">
                  <div class="col-3">
                    <q-card>
                      <q-bar class="bg-dark text-white">
                        <div class="f-12 text-bold">METODE YG DIGUNAKAN</div>
                      </q-bar>
                      <q-card-section class="q-pa-sm">
                        <q-list dense separator bordered>
                          <q-item v-for="it in store.metodis" :key="it" tag="label" v-ripple>
                            <q-item-section avatar>
                              <q-checkbox v-model="item.metode" :val="it" size="sm" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ it }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>

                    </q-card>
                  </div>

                  <!-- INI MASIH PERLU IF NAKES -->
                  <div class="col-3">
                    <q-card>
                      <q-bar class="bg-dark text-white">
                        <div class="f-12 text-bold">MATERI</div>
                      </q-bar>
                      <q-card-section class="q-pa-sm">
                        <q-list dense separator bordered>
                          <q-item v-for="it in materi" :key="it" tag="label" v-ripple>
                            <q-item-section avatar>
                              <q-checkbox v-model="item.materi" :val="it" size="sm" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ it }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>

                        <q-input class="q-mt-md" outlined standout="bg-yellow-3" type="textarea"
                          v-model="item.materiLain" />
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-3">
                    <q-card>
                      <q-bar class="bg-dark text-white">
                        <div class="f-12 text-bold">MEDIA</div>
                      </q-bar>
                      <q-card-section class="q-pa-sm">
                        <q-list dense separator bordered>
                          <q-item v-for="it in store.medias" :key="it" tag="label" v-ripple>
                            <q-item-section avatar>
                              <q-checkbox v-model="item.media" :val="it" size="sm" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ it }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                      <q-bar class="bg-dark text-white">
                        <div class="f-12 text-bold">EVALUASI RESPON</div>
                      </q-bar>
                      <q-card-section class="q-pa-sm">
                        <q-list dense separator bordered>
                          <q-item v-for="it in store.evaluasis" :key="it" tag="label" v-ripple>
                            <q-item-section avatar>
                              <q-radio v-model="item.evaluasi" :val="it" size="sm" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ it }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-3">
                    <q-card>
                      <q-bar class="bg-dark text-white">
                        <div class="f-12 text-bold">PENERIMA EDUKASI</div>
                      </q-bar>
                      <q-card-section class="q-pa-sm">


                        <autocomplete-input v-model="item.penerima" :options="store.penerimaEdukasis"
                          label="Penerima Edukasi" class="q-mb-sm" :valid="{ required: false }" @set-model="(val) => {
                            if (val === 'Pasien') {
                              item.namaPenerima = pasien?.nama_panggil
                            }
                            item.penerima = val
                          }" />
                        <app-input-simrs label="Nama Penerikma Edukasi" v-model="item.namaPenerima"
                          :valid:="{ required: false }" :disable="item.penerima === 'Pasien'" />
                        <app-input-simrs label="Estimasi Waktu" v-model="item.estimasi" :valid:="{ required: false }" />
                        <div class="q-pa-sm" style="border: 1px solid #ccc;">
                          <div class="q-mt-md q-mb-xs">
                            TTD PASIEN / KELUARGA :
                          </div>
                          <TtdWacom v-if="!item.ttdPenerima" uuid="ttd-penerima-edukasi"
                            :ttd-name="item.namaPenerima ?? 'nama pasien / keluarga'" @signature:ttd-penerima-edukasi="(val) => {
                              item.ttdPenerima = val
                            }" />
                          <div v-else>
                            <q-img :src="pathImg + item.ttdPenerima" contain />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
                <!-- <div style="margin-bottom: 100px;"></div> -->
              </div>
              <div class="full-width bg-white q-pa-md">
                <q-btn label="Simpan Perubahan" color="primary" text-color="white"
                  @click="updateData(pasien, item, nakes)" :loading="store.loadingSave" :disable="store.loadingSave" />
              </div>
            </q-card>
          </q-expansion-item>

          <q-separator />
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { pathImg } from 'src/boot/axios';
import { dateFullFormat, jamTnpDetik } from 'src/modules/formatter';
import { notifBottomVue } from 'src/modules/utils';
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useImplementasiEdukasiRanapStore } from 'src/stores/simrs/ranap/implementasiEdukasi';
import { computed, defineAsyncComponent } from 'vue';

const AutocompleteInput = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/AutocompleteInput.vue'))
const TtdWacom = defineAsyncComponent(() => {
  return import('src/components/~static/TtdWacomStu540.vue')
})

// console.log('implementasiEdukasiRanapStore', useImplementasiEdukasiRanapStore());


const auth = useAplikasiStore()
const store = useImplementasiEdukasiRanapStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  },
  items: {
    type: Array,
    default: null
  }
})

const materi = computed(() => {
  if (props?.nakes === '1') {
    return store.materiDpjp
  } else if (props?.nakes === '2') {
    return store.materiPerBid
  } else if (props?.nakes === '3') {
    return store.materiPerBid

  } else if (props?.nakes === '4') {
    return store.materiApoteker
  } else if (props?.nakes === '5') {
    return store.materiGizi
  } else if (props?.nakes === '6') {
    return store.materiFisio

  } else {
    return null
  }
})

const titleAvatar = (kat) => {
  // item?.nakes==='2'? 'accent' : (item?.nakes==='1'? 'primary' : 'teal'
  let r = 'Ns'
  if (kat === '2') {
    r = 'Ns'
  }
  else if (kat === '1') {
    r = 'Dr'
  }
  else if (kat === '3') {
    r = 'Bd'
  }
  else if (kat === '4') {
    r = 'Ap'
  }
  else if (kat === '5') {
    r = 'Gz'
  }
  else if (kat === '6') {
    r = 'Fs'
  } else {
    r = 'Dll'
  }

  return r
}

const warnaAvatar = (kat) => {
  // item?.nakes==='2'? 'accent' : (item?.nakes==='1'? 'primary' : 'teal'
  let r = 'accent'
  if (kat === '2') {
    r = 'accent'
  }
  else if (kat === '1') {
    r = 'primary'
  }
  else if (kat === '3') {
    r = 'teal'
  }
  else if (kat === '4') {
    r = 'cokelat'
  }
  else if (kat === '5') {
    r = 'orange'
  }
  else if (kat === '6') {
    r = 'dark'
  } else {
    r = 'grey'
  }

  return r
}

const $q = useQuasar()
const deleteItem = (item) => {
  // store.deleteData(pasien, item, nakes)
  // console.log('hi', item);
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
    // persistent: true
  }).onOk(() => {
    store.deleteData(item?.id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })

}

const updateData = (pasien, item, nakes) => {

  const kdpegsimrs = auth?.user?.pegawai?.kdpegsimrs
  const ygInput = item?.user
  console.log('update', kdpegsimrs, ygInput);
  if (kdpegsimrs !== ygInput) {
    notifBottomVue('Maaf ... anda bukan USER Peng-input Edukasi ini, Harap Edit inputan Sendiri...');
  } else {
    store.updateData(pasien, item, nakes)
  }
}
</script>