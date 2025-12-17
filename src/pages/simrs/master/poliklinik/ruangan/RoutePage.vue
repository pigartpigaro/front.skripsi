<template>
  <q-page class="fit relative-position">
    <div class="fit absolute-top q-pa-sm">
      <q-card class="rounded-lg fit column" style="border-radius: 10px;">



        <q-card-section class="col fit relative-position q-pa-xs overflow-hidden">
          <DataTable flat bordered class="rounded-xl shadow-sm" :store="store" :loading="store.loading"
            :columns="store.getterColumns" :column-hide="store.columnHide" :items="items" :meta="store.meta"
            :dark="dark">

            <!-- HEADER -->
            <template #col-rs1>
              KODE
            </template>
            <template #col-rs2>
              NAMA
            </template>
            <template #col-rs3>
              STATUS
            </template>
            <template #col-rs4>
              GOLONGAN
            </template>
            <!-- <template #col-rs6>
              KODE BPJS
            </template>
            <template #col-rs7>
              NAMA BPJS
            </template> -->

            <!-- BODY -->


          </DataTable>
        </q-card-section>

      </q-card>
    </div>


    <!-- modal form -->
    <ModalForm v-model="store.modalFormOpen" :store="store" :dark="dark" />

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMasterPoliklinikRuanganStore } from 'src/stores/simrs/master/templateStore/register'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import DataTable from './comp/DataTable.vue'
import ModalForm from './ModalForm.vue'




const store = useMasterPoliklinikRuanganStore()
const router = useRouter()
const $q = useQuasar()

const dark = computed(() => {
  return $q.dark.isActive
})
const items = computed(() => {
  return store.items?.filter((item) => item.rs1)
})

const handleSearch = () => {
  console.log('search', search.value);

}



onMounted(() => {
  store.params.order_by = 'rs1'
  store.params.sort = 'ASC'
  store.params.per_page = 100
  Promise.all([
    store.fetchAll()
  ])
})
</script>