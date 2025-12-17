<template>
  <div class="col-grow bg-teal text-white q-pa-sm">
    <q-bar class=" bg-teal text-white">
      <div class="q-ma-sm f-14 ">
        List Template
      </div>
      <q-space />
      <q-input dense v-model="store.params.q" placeholder="Search" class="q-ma-sm" style="width: 300px;" outlined
        standout="bg-yellow-3" bg-color="white" @update:model-value="store.cariList()" debounce="800"
        :loading="store.loadingCari" />
      <app-autocomplete v-model="store.params.user" label="Template untuk" bg-color="white" autocomplete="nama"
        option-label="nama" outlined option-value="value" :source="store.typeOptions"
        @update:model-value="store.cariList()" />
      <app-autocomplete v-model="store.params.sistembayar" label="Sistem Bayar" autocomplete="nama" option-label="nama"
        bg-color="white" outlined option-value="value" :source="store.sistemBayarTwoOptions"
        @update:model-value="store.cariList()" />
    </q-bar>
  </div>
  <div style="height: 80vh;">
    <q-scroll-area style="height: 100%; padding-bottom: 60px;">
      <q-list separator bordered>
        <template v-if="store.items?.length">
          <q-expansion-item disable class="bg-dark text-white">
            <template v-slot:header>
              <q-item-section style="width: 80%;">
                <div class="row" style="width: 80%;">
                  <div class="col-3 text-weight-bold">
                    Nama Template
                  </div>
                  <div class="col-2 text-weight-bold">
                    Dibuat
                  </div>
                  <div class="col-3 text-right text-weight-bold">
                    Untuk
                  </div>
                  <div class="col-3 text-right text-weight-bold">
                    Sistem bayar
                  </div>
                </div>
              </q-item-section>

            </template>


          </q-expansion-item>
          <q-expansion-item ref="refExpansion" v-for="(item, i) in store.items" :key="i" v-model="item.expanded"
            @update:model-value="updateExpand" :duration="duration">
            <template v-slot:header>
              <q-item-section style="width: 80%;">
                <div class="row">
                  <div class="col-3 text-weight-bold">
                    {{ item?.nama }}
                  </div>
                  <div class="col-3 text-primary">
                    {{ item?.pegawai?.nama }}
                  </div>
                  <div class="col-3 text-right" :class="item?.user == 'private' ? 'text-primary' : 'text-orange'">
                    {{ item?.user == 'private' ? 'Saya Saja' : 'Semua' }}
                  </div>
                  <div class="col-3 text-right" :class="item?.sistembayar == '1' ? 'text-primary' : 'text-orange'">
                    {{ item?.sistembayar == '1' ? 'BPJS' : 'Non-BPJS' }}
                  </div>
                </div>
              </q-item-section>
              <q-item-section side style="width:20%">
                <div class="row items-center q-col-gutter-sm justify-end full-width">

                  <div class="col-shrink text-right">
                    <q-btn v-if="item?.pegawai_id == parseInt(app.user.pegawai_id)" color="primary" dense flat no-caps
                      size="xs" icon="icon-mat-edit" :disable="item.loading || store.loadingKirim"
                      :loading="item.loading" @click.prevent="setTemplate(item, i)">
                      <q-tooltip class="bg-white text-primary">
                        Edit
                      </q-tooltip>
                    </q-btn>
                    <q-btn color="dark" dense no-caps size="xs" label="Kirim"
                      :disable="item.loading || store.loadingKirim" :loading="item.loading"
                      @click.stop="kirimOrder(item, i)">
                      <q-tooltip class="bg-white text-primary">
                        Kirim Template ke Depo
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <div class="row items-center full-width q-pa-xs bg-orange text-white text-weight-bold">
                  <div style="width: 5%;">No</div>
                  <div style="width: 50%;">Nama Obat</div>
                  <div style="width: 10%;">Jumlah</div>
                </div>
                <div v-for="(det, j) in item?.rinci" :key="j">
                  <div class="row items-center full-width q-pa-xs"
                    :class="det?.errMsg ? 'bg-red-1' : (j % 2 == 1 ? 'bg-grey-3' : '')">
                    <div style="width: 5%;">{{ j + 1 }}</div>
                    <div style="width: 50%;">{{ det?.obat?.nama_obat }}</div>
                    <div style="width: 10%;">{{ det?.jumlah }}</div>
                    <div style="width: 35%;">{{ det?.errMsg ?? det?.successMsg }}</div>
                  </div>
                </div>

              </q-card-section>
            </q-card>
          </q-expansion-item>
        </template>
      </q-list>
      <div class="q-mt-lg" />
    </q-scroll-area>
  </div>
</template>
<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useTemplatePersiapanOperasiStore } from 'src/stores/simrs/farmasi/kamaroperasi/template'
import { ref } from 'vue'

const props = defineProps({
  pasien: { type: Object, default: null }
})
const store = useTemplatePersiapanOperasiStore()
const app = useAplikasiStore()
const duration = ref(300)
const refExpansion = ref(null)
function setTemplate (val, i) {
  duration.value = 0
  if (val.expanded) val.expanded = false
  else val.expanded = true
  // console.log('val', refExpansion.value, i, val)
  store.item = val
  store.item.edit = true
  store.setForm('id', val.id)
  store.setForm('nama', val.nama)
  store.setForm('user', val.user)

}
function kirimOrder (val, i) {
  val.noreg = props.pasien?.noreg
  val.norm = props.pasien?.norm
  val.groupsistembayar = props.pasien?.groups
  // duration.value = 0
  // if (val.expanded) refExpansion.value[i].show()
  // val.expanded = !val.expanded
  console.log('val', props?.pasien)
  store.kirimOrder(val)
  // setTimeout(() => {
  //   duration.value = 300
  // }, 300)
}
function updateExpand (val) {
  // console.log('update', val)

}
</script>
