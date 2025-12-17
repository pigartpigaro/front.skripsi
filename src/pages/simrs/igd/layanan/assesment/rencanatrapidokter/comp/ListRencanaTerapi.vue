<template>
  <q-card flat bordered square class="full-height bg-teal-2" style="overflow: hidden;">
    <q-bar class="bg-teal text-white z-top" style="width: inherit;">
      <div class="f-12">
        Data Rencana Obat Dokter
      </div>
      <q-space />
    </q-bar>
    <q-card-section style="padding:0" class="full-height bg-grey">
      <div v-if="store.loadingaja" class="column full-height flex-center">
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div v-if="pasien?.rencanaterapidokter?.length <= 0" class="column full-height flex-center">
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area v-else style="height:calc(100% - 32px);">
        <q-list class="bg-white" separator>
          <transition-group name="list">
            <q-item v-for="(item, n) in lists" :key="n" class="list-move">
              <q-item-section>
                <div class="row q-col-gutter-sm">
                  <div class="col-12">
                    <q-badge outline color="red">Target Dokter</q-badge>
                  </div>
                  <div class="col-12">
                    <span v-html="getNewLine(item?.targetdokter ?? '-')" />
                  </div>
                  <div class="col-12">
                    <q-badge outline color="red">Rencana Terapi</q-badge>
                  </div>
                  <div class="col-12">
                    <span v-html="getNewLine(item?.rencanaterapi ?? '-')" />
                  </div>
                  <div class="col-12">
                    <q-badge outline color="red">Monitoring Pasien</q-badge>
                  </div>
                  <div class="col-12">
                    <span v-html="getNewLine(item?.monitoringpasien ?? '-')" />
                  </div>
                </div>

              </q-item-section>
              <q-item-section side>
                <div class="q-gutter-sm">
                  <q-btn flat round size="sm" icon="icon-mat-edit" @click="store.editForm(item)" />
                  <q-btn flat round size="sm" icon="icon-mat-delete" color="negative" @click="hapusItem(item.id)" />
                </div>
              </q-item-section>
            </q-item>
          </transition-group>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { getNewLine } from 'src/modules/formatter';
import { useRencanaTerapiDokterStore } from 'src/stores/simrs/igd/rencanaterapidokter';
import { computed, ref } from 'vue';

const store = useRencanaTerapiDokterStore()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const lists = computed(() => {
  const arr = props.pasien?.rencanaterapidokter
  // console.log('hahaha', arr)
  return arr?.sort((a, b) => { return b.id - a.id })
})

function hapusItem(id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>
