<template>
  <div class="relative-position full-width z-top">
    <q-input v-model="search" outlined class="full-width relative-position" borderless rounded clearable dense
      placeholder="Cari data dari BPOM ..... Enter" @keydown.enter.prevent="handleSearch" :loading="loading"
      :disable="loading" :bg-color="dark ? 'dark' : 'white'">
      <template #prepend>
        <q-icon name="icon-mat-search" size="20px" />
      </template>

      <!-- <q-menu v-model="showing" fit>
        <q-list v-if="items?.length" separator bordered round>
          <q-item v-for="item in items" :key="item?.ID" clickable v-ripple @click="search = item?.nama">
            <q-item-section class="q-py-sm">
              <q-item-label class=""> <span class="text-weight-bold">NAMA :</span> {{ item?.PRODUCT_NAME }} ,
              </q-item-label>
              <q-item-label> <span class="text-weight-bold">ATC :</span> {{ item?.PRODUCT_ATC }}</q-item-label>
              <q-item-label> <span class="text-weight-bold">PACKAGE :</span> {{ item?.PRODUCT_PACKAGE
                }}</q-item-label>
              <q-item-label> <span class="text-weight-bold">FORM :</span> {{ item?.PRODUCT_FORM }}</q-item-label>
              <q-item-label> <span class="text-weight-bold">INGREDIENTS :</span> {{ item?.INGREDIENTS
                }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <app-btn color="fifth" @click="handlePilih(item)">PILIH</app-btn>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list v-else separator bordered round>
          <q-item>
            <q-item-section>
              <q-item-label>Tidak ditemukan data ... </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu> -->

    </q-input>
    <template v-if="!loading && showing">
      <div v-if="items?.length" class="absolute-top full-width" style="top:40px">
        <q-card class="full-width">
          <q-card-section class="q-pa-xs">
            <q-list separator bordered round>
              <q-item v-for="item in items" :key="item?.ID" clickable v-ripple @click="search = item?.nama">
                <q-item-section class="q-py-sm">
                  <q-item-label class=""> <span class="text-weight-bold">NAMA :</span> {{ item?.PRODUCT_NAME }} ,
                  </q-item-label>
                  <q-item-label> <span class="text-weight-bold">ATC :</span> {{ item?.PRODUCT_ATC }}</q-item-label>
                  <q-item-label> <span class="text-weight-bold">PACKAGE :</span> {{ item?.PRODUCT_PACKAGE
                    }}</q-item-label>
                  <q-item-label> <span class="text-weight-bold">FORM :</span> {{ item?.PRODUCT_FORM }}</q-item-label>
                  <q-item-label> <span class="text-weight-bold">INGREDIENTS :</span> {{ item?.INGREDIENTS
                    }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <app-btn color="fifth" @click="handlePilih(item)">PILIH</app-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="dark" label="Tutup" />
          </q-card-actions>
        </q-card>
      </div>
      <div v-else class="absolute-top full-width column flex-center bg-white" style="top:40px; height:80px">
        <div>Tidak ditemukan data ... </div>
        <app-btn color="dark" @click="showing = false">Tutup</app-btn>
      </div>
    </template>

    <template v-else-if="loading">
      <q-linear-progress indeterminate rounded size="xs" color="primary" class="absolute-top full-width" />
    </template>


  </div>
</template>



<script setup>
import { ref, watchEffect } from 'vue'


defineProps({
  dark: {
    type: Boolean,
    default: false
  }
})

const search = ref(null)
const perPage = ref(3)
const items = ref([])
const loading = ref(false)
const showing = ref(false)

const emits = defineEmits(['onSelect'])



const handleSearch = async () => {
  showing.value = true
  loading.value = true
  const nama = search.value
  const rows = perPage.value

  try {
    const res = await fetch(`${process.env.BPOM_URL}` + '/scrape?nama=' + nama + '&per_page=' + rows)
    const data = await res.json()
    items.value = data?.data || []

    console.log('bpom', data);
    console.log('items', items.value);

    search.value = null

  } catch (err) {
    items.value = []
    console.error('Gagal mengambil data:', err)
  } finally {
    loading.value = false
  }
}

const handlePilih = (item) => {
  // console.log('item', item);

  emits('onSelect', item)
}

const reset = () => {
  search.value = ''
  showing.value = false
  items.value = []
}

defineExpose({
  reset
})
</script>