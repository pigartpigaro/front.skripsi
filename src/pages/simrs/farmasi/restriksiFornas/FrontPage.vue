<template>
  <div class="q-pa-sm bg-white">
    <div class="f-18 text-weight-bold">
      Halaman restriksi fornas
    </div>
    <q-separator class="q-my-sm" />
    <app-table :columns="store.columns" :items="store.items" :meta="store.meta" :per-page="store.params.per_page"
      :loading="store.loading" :to-search="store.params.q" :default-btn="false" :ada-tambah="false" :ada-filter="false"
      force-paginasi @goto="store.setPage" @set-row="store.setPerPage" @refresh="store.refreshTable"
      @find="store.setSearch" @set-order="store.setOder">
      <template #header-left-after-search>
        <div class="row q-col-gutter-x-xs">
          <div class="col-auto">
            <q-checkbox class="q-mr-sm" v-model="store.fornas" label="Fornas saja" @update:model-value="store.getData"
              :disable="store.loading" />
          </div>
          <div class="col-auto">
            <app-autocomplete v-model="store.depo" label="Pilih Depo" autocomplete="nama" option-label="nama"
              option-value="value" outlined :source="store.depos" :loading="store.loading" :disable="store.loading" />
          </div>
        </div>

        <!-- anu -->
      </template>
      <template #col-obat>Obat</template>
      <template #col-jumlah>Jumah Restriksi</template>
      <template #col-tgl>Tanggal Mulai Berlaku Efektif</template>
      <template #col-kecuali>Kecuali Ruangan</template>
      <template #col-act>Aksi</template>
      <template #cell-obat="{ row }">
        <div style="min-width: 350px; white-space: normal !important;">
          <div class="row">
            {{ row?.nama_obat }}
          </div>
          <div class="row text-italic f-10">
            {{ row?.kandungan }}
          </div>
          <div class="row q-col-gutter-x-xs">
            <div class="col-auto f-10">
              ({{ row?.kd_obat }})
            </div>
            <div class="col-auto f-10 text-negative text-weight-bold">
              {{ row?.status_fornas ? 'Fornas' : '' }}
            </div>
            <div class="col-auto f-10 text-italic">
              ({{ row?.satuan_k }})
            </div>
          </div>
        </div>
      </template>
      <template #cell-jumlah="{ row }">
        <div>{{ row.restriksiobat?.jumlah ?? 0 }}</div>
      </template>
      <template #cell-tgl="{ row }">
        <div class="cursor-pointer">
          {{ dateFullFormat(row.restriksiobat?.tgl_mulai_berlaku) }}
        </div>
      </template>
      <template #cell-kecuali="{ row }">
        <div v-if="row.kecuali?.length" class="">
          <div v-for="(item, i) in row.kecuali" :key="item">
            <div class="row">
              <div class="col-1">{{ i + 1 }}.</div>
              <div class="col-11">
                {{ item?.ruang?.nama }}
              </div>
            </div>
          </div>
          <!-- {{ row.kecuali }} -->
        </div>
        <div v-else>-</div>
      </template>
      <template #cell-act="{ row }">
        <div class="row q-col-gutter-x-xs">
          <div class="col-auto">
            <q-btn size="xs" flat color="primary" round dense icon="icon-mat-edit" @click.stop.prevent="edit(row)"
              :loading="row.loading" :disable="row.loading">
              <q-tooltip>Buka Form</q-tooltip>
            </q-btn>
          </div>
          <div class="col-auto">
            <!-- <q-btn size="xs" flat color="negative" round dense icon="icon-mat-delete" @click.stop.prevent="hapus(row)"
              :loading="row.loading" :disable="row.loading" /> -->
          </div>
        </div>
      </template>
    </app-table>
  </div>
  <formInput v-model="store.isOpen" @close="() => {
    store.isOpen = false
    store.form = {}
  }" />
</template>
<script setup>
import { date } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'
import { useRestriksiFornasStore } from 'src/stores/simrs/farmasi/restriksiFornas/restriksi'
import { defineAsyncComponent } from 'vue'

const store = useRestriksiFornasStore()
const formInput = defineAsyncComponent(() => import('./comp/FormInput.vue'))

function edit (row) {
  store.setEdit(row)

}

store.getData()
store.getRuangan()

</script>
