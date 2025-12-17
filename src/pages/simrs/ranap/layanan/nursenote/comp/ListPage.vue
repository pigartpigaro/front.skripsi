<template>
  <div class="fit" style="overflow: hidden;">
    <div class="" v-if="store.loading">
      <app-loader></app-loader>
    </div>
    <div v-else class="fit">
      <div v-if="!store.items?.length" class="column full-height flex-center ">
        <div>Belum Ada Data Tersimpan ... 📋</div>
      </div>
      <div v-else class="full-height q-py-md scroll">
        <q-card v-for="item in store.items" :key="item?.id" class="q-mx-sm q-mb-sm" flat bordered>
          <q-list bordered class="rounded-borders" style="max-width: 100%;">
            <q-expansion-item hide-expand-icon group="somegroup">
              <template #header>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    <div v-if="item?.petugas?.foto === ''">{{ initials(item?.petugas) }}</div>
                    <img v-else :src="PHOTO_USER(item?.petugas)" alt="Ft">
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


                    <div class="column text-right">
                      <div class="text-grey-8">
                        <span class="text-weight-bold">Tgl</span> <em class="text-weight-medium"> {{
                          dateFullFormat(item?.created_at) }}</em>
                      </div>
                      <div class="text-grey-8 q-mt-xs">
                        <q-badge class="q-px-sm q-py-xs" outline color="primary">
                          <div class="flex q-gutter-sm">
                            <div class="">
                              Jam
                            </div>
                            <div>:</div>
                            <div class="text-weight-bold">
                              {{ jamTnpDetik(item?.created_at) }}
                            </div>
                          </div>
                        </q-badge>
                      </div>
                    </div>

                    <div v-if="auth?.user?.pegawai?.kdpegsimrs === item?.user">
                      <q-btn round flat size="sm" icon="icon-mat-delete" color="negative" @click="deleteItem(item)">
                        <q-tooltip> Hapus </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-item-section>
              </template>

              <q-card bordered flat class="bg-grey-4">
                <div class="q-pa-xs">
                  <div class="col full-height bg-grey-4">

                    <card-column-edit :pasien="pasien" :kasus="kasus" :item="item" :key="item?.id" />


                  </div>
                </div>
              </q-card>
            </q-expansion-item>

            <q-separator />
          </q-list>



        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { pathImg } from 'src/boot/axios';
import { useNurseNoteRanapStore } from 'src/stores/simrs/ranap/nursenote';
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { defineAsyncComponent, ref } from 'vue';
import { dateFullFormat, jamTnpDetik } from 'src/modules/formatter';
import { useQuasar } from 'quasar';


const CardColumnEdit = defineAsyncComponent(() => import('./CardColumnEdit.vue'))
// const DialogKananResep = defineAsyncComponent(() => import('./DialogKananResep.vue'))

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
  }
})

const store = useNurseNoteRanapStore()
const auth = useAplikasiStore()
const wip = ref(false)

const initials = (petugas) => {
  const nama = petugas?.nama || null

  return nama?.slice(0, 2).toUpperCase() ?? 'An'
}

const PHOTO_USER = (row) => {
  // console.log('row', row);

  return 'http://192.168.100.100/simpeg/foto/' + row?.nip + '/' + row?.foto

}




const $q = useQuasar()
const deleteItem = (item) => {
  // console.log('item', item);

  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteData(props.pasien, item?.id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })

}

</script>

<style lang="scss" scoped></style>
