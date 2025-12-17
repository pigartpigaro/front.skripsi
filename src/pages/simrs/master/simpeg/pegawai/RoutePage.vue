<template>
  <q-page class="fit relative-position">
    <div class="fit absolute-top q-pa-sm">
      <q-card class="rounded-lg fit column" style="border-radius: 10px;">



        <q-card-section class="col fit relative-position q-pa-xs overflow-hidden">
          <DataTable flat bordered class="rounded-xl shadow-sm" :store="store" :loading="store.loading"
            :columns="store.columns" :column-hide="store.columnHide" :items="store.items" :meta="store.meta"
            :dark="dark">

            <template v-slot:col-kode_jabatan="{ row, left, right }">
              <div :class="left">
                KODE
              </div>
            </template>

          </DataTable>
        </q-card-section>

      </q-card>
    </div>


    <!-- modal form -->
    <ModalForm v-model="store.modalFormOpen" :store="store" />

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMasterJabatanStore, useMasterPegawaiStore } from 'src/stores/simrs/master/templateStore/register'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import DataTable from './comp/DataTable.vue'
import ModalForm from './ModalForm.vue'




const store = useMasterPegawaiStore()

const router = useRouter()
const $q = useQuasar()

const dark = computed(() => {
  return $q.dark.isActive
})

const handleSearch = () => {
  console.log('search', search.value);

}



onMounted(() => {
  store.params.order_by = 'id'
  store.params.per_page = 20
  Promise.all([
    store.fetchAll(),

  ])
})
</script>
