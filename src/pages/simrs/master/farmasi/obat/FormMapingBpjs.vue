<template>
  <q-dialog persistent position="top">
    <q-card style="width: 70vw; max-width: 80vw; margin-top: 40px;">

      <q-bar class="bg-primary">
        <q-space />

        <q-btn v-close-popup dense flat color="white" icon="icon-mat-close" @click="() => {
          table.mapingBpjs.isOpen = false
          table.mapingBpjs.item = null
        }">
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row">
          <div class="col-2">Nama Obat</div>
          <div class="col-grow">{{ table.mapingBpjs?.item?.nama_obat }}</div>
        </div>
        <div class="row">
          <div class="col-2">Kandungan Obat</div>
          <div class="col-grow">{{ table.mapingBpjs?.item?.kandungan }}</div>
        </div>
        <div class="row">
          <div class="col-2">Kode Obat RS</div>
          <div class="col-grow">{{ table.mapingBpjs?.item?.kd_obat }}</div>
        </div>
        <div class="row">
          <div class="col-2">Kode Obat Bpjs</div>
          <div class="col-grow">{{ table.mapingBpjs?.item?.kode_bpjs }}</div>
        </div>
        <div class="row">
          <div class="col-2">Cari Kode Obat Bpjs</div>
          <div class="col-grow">
            <AppSelectServer v-model="model" label="Cari Kode Obat Bpjs" />
          </div>
        </div>

      </q-card-section>
      <q-card-actions align="right">
        <q-btn no-caps label="Simpan" color="primary" @click="Simpan()" :loading="loading" :disable="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { useMasterObatTable } from 'src/stores/simrs/master/farmasi/obat/table'
import { defineAsyncComponent, ref } from 'vue'

const table = useMasterObatTable()
const AppSelectServer = defineAsyncComponent(() => import('src/pages/simrs/master/farmasi/obat/AppSelectServer.vue'))
const model = ref(null)
const loading = ref(null)
async function Simpan () {
  loading.value = true
  console.log('model', model.value)
  console.log('item', table.mapingBpjs.item)
  const form = {
    id: table.mapingBpjs.item.id,
    kode_bpjs: model.value
  }
  const { data } = await api.post('v1/simrs/farmasi/master/insert-maping-bpjs', form)
  console.log('data', data, Object.keys(data))
  if (Object.keys(data)?.length > 0) {
    table.mapingBpjs.isOpen = false
    table.mapingBpjs.item = null
    model.value = null
    const index = table.items.findIndex(item => item.id === data.id)
    if (index >= 0) table.items[index].kode_bpjs = data.kode_bpjs
  }
  loading.value = false

}
</script>
