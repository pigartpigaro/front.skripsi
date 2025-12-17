<template>
  <div class="fit">
    <q-card flat bordered class="bg-transparent full-height column q-ma-xs">
      <div class="col-auto bg-primary text-white q-pa-md">
        <div class="row justify-between items-center">
          <div>
            <div class="f-20">
              LIST NURSE NOTE
            </div>
            <div class="caption text-grey-4">
              Sebagai Catatan Perkembangan Pasien
            </div>
          </div>
          <div>
            <q-btn rounded outline color="white" @click="store.isForm = true">
              <q-icon name="icon-mat-add" size="xs" /><span class="q-ml-xs">Tambah</span>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="col full-height">
        <ListPage :pasien="pasien" :kasus="kasus" :nakes="nakes" />
      </div>

    </q-card>
    <DialogFormAdd v-model="store.isForm" :pasien="pasien" :kasus="kasus" :nakes="nakes" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { useNurseNoteRanapStore } from 'src/stores/simrs/ranap/nursenote';

const ListPage = defineAsyncComponent(() => import('./comp/ListPage.vue'))
const DialogFormAdd = defineAsyncComponent(() => import('./comp/DialogFormAdd.vue'))

const tindakan = useTindakanRanapStore()
const store = useNurseNoteRanapStore()

const props = defineProps({
  pasien: { type: Object, default: () => null },
  kasus: { type: Object, default: () => null },
  nakes: { type: String, default: null }
})

// const isForm = ref(false)


onMounted(() => {
  Promise.all([
    store.getNakes(),
    tindakan.getTindakan(props?.pasien),
    store.getData(props?.pasien)
  ])
})

</script>
