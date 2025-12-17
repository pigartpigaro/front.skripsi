<template>
  <div class="full-widt q-pa-sm">
    <q-card v-for="(item, n) in items" :key="n" flat bordered class="q-mb-sm">
      <q-card-section>
        <q-item-section>
          <q-item-label>Data Summary Telah diinput </q-item-label>
        </q-item-section>
        <q-item-section class="q-mb-sm">
          <q-item-label :class="{ 'text-negative': !item?.ttdPasien }"> {{ item?.ttdPasien ? 'Pasien Telah TTD' :
            'Pasien Belum TTD' }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label line="5">
            Oleh : <b>{{ store?.perawats?.find(x => x?.kdpegsimrs === item?.user_input)?.nama }}</b>
          </q-item-label>
        </q-item-section>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat dense round size="sm" color="primary" icon="icon-mat-edit" @click="store?.editData(item)" />
        <q-btn flat dense round size="sm" color="negative" icon="icon-mat-delete" @click="hapusItem(item)" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useSummaryDischargePlanningRanapStore } from 'src/stores/simrs/ranap/summarydischargeplanning'

const store = useSummaryDischargePlanningRanapStore()

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  pasien: {
    type: Object,
    default: null
  }
})

const $q = useQuasar()

const hapusItem = (item) => {
  $q.dialog({
    title: 'Konfirmasi',
    message: 'Apakah anda yakin ingin menghapus item ini?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.hapusdata(props?.pasien, item?.id)
  })
}
</script>