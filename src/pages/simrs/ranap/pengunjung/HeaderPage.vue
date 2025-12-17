<template>
  <div>
    <div class="row justify-between items-center">
      <div class="col-auto">
        <div class="row items-center q-pa-sm">
          <div class="col-auto">
            <q-input v-model="store.params.q" placeholder="Cari Pasien ... Enter" dense outlined dark debounce="400"
              color="white" style="min-width:250px" @keyup.enter.stop="adaInput">
              <template v-if="store.params.q" #append>
                <q-icon name="icon-mat-close" size="xs" class="cursor-pointer" @click.stop.prevent="() => {
                  store.params.q = null
                  adaInput()
                }" />
              </template>
              <template #prepend>
                <q-icon name="icon-mat-search" />
              </template>
            </q-input>
          </div>

          <!-- <div class="col-auto">
            <q-select
              v-model="store.periode"
              dense
              outlined
              dark
              color="white"
              :options="store.periods"
              label="Periode"
              class="q-ml-sm"
              emit-value
              map-options
              style="min-width: 150px;"
              @update:model-value="store.gantiPeriode"
            />
          </div> -->

          <div class="col-auto flex items-center">
            <q-select v-model="store.params.status" dense outlined dark color="white" :options="store.statuses"
              label="Status" class="q-ml-sm" emit-value map-options style="min-width: 150px;" @update:model-value="(val) => {
                // console.log('header status val ', val);
                store.params.page = 1
                store.getData()
              }" />

            <div class="q-ml-sm" v-if="store.params.status === 'Pulang'">
              <!-- <app-input-date
                :model="store.params.from"
                label="Tanggal"
                icon="icon-mat-event"
                outlined
                dark
                @set-model="val=>{
                  store.params.from=val
                  store.getData()
                }"
              /> -->

              <q-btn outline color="white" class="bg-primary" size="md" no-caps>
                <div class="flex items-center q-mx-xs">
                  <div class="f-12 q-mr-sm">
                    {{ store?.periode }}
                  </div>
                  <transition>
                    <q-icon :name="`${showMenuPeriode ? 'icon-mat-keyboard_arrow_up' : 'icon-mat-keyboard_arrow_down'}`"
                      size="16px" />
                  </transition>
                </div>

                <q-menu dark @show="showMenuPeriode = true" @hide="showMenuPeriode = false">
                  <div class="row no-wrap q-pa-sm">
                    <q-list style="min-width: 100px">
                      <q-item v-for="item in store?.periods" :key="item" clickable :active="item === store?.periode"
                        active-class="bg-primary text-white" :disable="item === 'Custom'"
                        @click="store.setPeriode(item)">
                        <q-item-section>{{ item }}</q-item-section>
                      </q-item>
                    </q-list>
                    <q-separator vertical inset />

                    <div class="column">
                      <div class="row q-pa-sm q-col-gutter-sm">
                        <div class="col">
                          <q-date dark v-model="store.params.to" minimal bordered flat mask="YYYY-MM-DD"
                            @update:model-value="store.setPeriode('Custom')" />
                          <div class="f-10 text-grey-8 q-mt-xs">
                            DARI TANGGAL : <b>{{ store.params.to }}</b>
                          </div>
                        </div>
                        <div class="col">
                          <q-date dark v-model="store.params.from" minimal bordered flat mask="YYYY-MM-DD"
                            @update:model-value="store.setPeriode('Custom')" />
                          <div class="f-10 text-grey-8 q-mt-xs">
                            SAMPAI TANGGAL : <b>{{ store.params.to }}</b>
                          </div>
                        </div>
                      </div>
                      <q-separator />
                      <div class="row q-pa-sm justify-end">
                        <q-btn v-close-popup color="primary" label="Terapkan" push size="sm" @click="goTo" />
                      </div>
                    </div>
                  </div>
                </q-menu>
              </q-btn>

            </div>
          </div>
          <div class="col-auto">
            <q-select v-model="store.ruangan" dense outlined dark color="white" :options="store.ruangans"
              label="Ruangan" class="q-ml-sm" emit-value map-options option-value="groups" option-label="groups_nama"
              style="min-width: 150px;" @update:model-value="store.gantiRuangan" />
          </div>
        </div>
      </div>
      <div class="col-auto q-mr-sm">
        <div class="row">
          <!-- refresh Ids -->
          <q-btn unelevated round size="sm" icon="icon-mat-refresh" @click="store.refresh()">
            <q-tooltip class="primary" :offset="[10, 10]">
              Refresh Table
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { onMounted, ref } from 'vue'

const store = usePengunjungRanapStore()

const showMenuPeriode = ref(false)

function adaInput(val) {
  // console.log('ada input ', val)
  // store.params.q = val
  store.params.page = 1
  if (!store.loading) store.getData()
}

const goTo = () => {
  store.params.page = 1
  store.getData()

  // console.log('store.params', store.params);
}

onMounted(() => {
  store.periode = 'Hari ini'
  Promise.all([
    // store.initReset(),
    store.getJenisKasus(),
    store.getRuangan().then(() => store.initReset())
  ])
})
</script>
