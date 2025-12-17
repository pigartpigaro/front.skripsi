<template>
  <div class="full-height column">
    <div class="col-auto">
      <q-bar class="bg-dark text-white z-top" style="width: inherit;">
        <div class="f-12 text-bold">
          Data SKALA TRANSFER
        </div>

        <q-space />
      </q-bar>
    </div>
    <div class="col full-height bg-grey-3">
      <div v-if="loadingaja" class="column full-height flex-center">
        <div class="text-h5 text-dark">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <!-- <div v-if="lists?.length <= 0" class="column full-height flex-center">
        <div class="text-h5 text-dark">
          Belum Ada data tersimpan
        </div>
      </div> -->
      <div v-else class="full-height scroll">
        <q-list class="bg-white" separator>
          <transition-group name="list">
            <q-item v-for="(item, n) in lists" :key="n" class="list-move">
              <div v-if="item?.rs4 === 'Rawat Inap'">
                <q-item-label>Operasi : <span class="text-weight-bold">{{ item?.planranap?.operasi
                    }}</span></q-item-label>
                <q-item-label>Jenis Operasi : <span class="text-weight-bold">{{ item?.planranap?.jenisoperasi
                    }}</span></q-item-label>
                <q-item-label>Tanggal Operasi : <span class="text-weight-bold">{{ item?.planranap?.tgloperasi
                    }}</span></q-item-label>
                <q-item-label>Ruang Tujuan : <span class="text-weight-bold">{{ item?.planranap?.ruangranap?.rs2
                    }}</span></q-item-label>
                <div v-if="item?.planranap?.dokumentransfer !== null">
                  <q-item-label>Indikasi Masuk Ruang {{ item?.planranap?.dokumentransfer?.kelas }} : <span
                      class="text-weight-bold">{{
                        item?.planranap?.dokumentransfer?.isi
                      }}</span></q-item-label>
                </div>
              </div>
            </q-item>

            <template v-if="listsSkalaTransfer?.length > 0">
              <q-item v-for="(item, n) in listsSkalaTransfer" :key="n" class="list-move">
                <q-item-section>
                  <div class="row">
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Tanggal </span> : <span class="text-weight-bold">{{ dateFullFormat(item.tgl)
                          }}</span>
                      </q-item-label>
                    </div>
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Airways </span> : <span class="text-weight-bold">{{ item.airways }}</span>
                      </q-item-label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Cardio </span> : <span class="text-weight-bold">{{ item.cardio }}</span>
                      </q-item-label>
                    </div>
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Ecg monitor </span> : <span class="text-weight-bold">{{ item.ecgmonitor
                          }}</span>
                      </q-item-label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Haemo Dinamik </span> : <span class="text-weight-bold">{{ item.haemodinamik
                          }}</span>
                      </q-item-label>
                    </div>
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Intravenusline </span> : <span class="text-weight-bold">{{ item.intravenusline
                          }}</span>
                      </q-item-label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Kesadaran </span> : <span class="text-weight-bold">{{ item.kesadaran }}</span>
                      </q-item-label>
                    </div>
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Lanjut Usia </span> : <span class="text-weight-bold">{{ item.lanjutusia
                          }}</span>
                      </q-item-label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Prematuritas </span> : <span class="text-weight-bold">{{ item.prematurias
                          }}</span>
                      </q-item-label>
                    </div>
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Provesional Pacemaker </span> : <span class="text-weight-bold">{{
                          item.provesionalpacemaker }}</span>
                      </q-item-label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Respirasi </span> : <span class="text-weight-bold">{{ item.respirasi }}</span>
                      </q-item-label>
                    </div>
                    <div class="col-6">
                      <q-item-label>
                        <span class="">Respritarory Support </span> : <span class="text-weight-bold">{{
                          item.respritarorysupport }}</span>
                      </q-item-label>
                    </div>
                  </div>
                  <q-separator />
                  <div class="row">
                    <div class="col-6">
                      <q-item-label class="q-mt-sm q-mb-sm">
                        <span>Skor : {{ item.scoretotal }} || Derajat Transfer : {{ item.drajattransfer }}</span>
                      </q-item-label>
                    </div>
                    <div class="col-6">
                      <q-item-label class="q-mt-sm q-mb-sm">
                        <span>Tanggal : <q-badge color="teal"> {{ item?.tgl }}</q-badge></span>
                      </q-item-label>
                    </div>
                  </div>
                  <q-separator />
                </q-item-section>
                <!-- <q-item-section side>
                  <div class="q-gutter-sm">
                    <q-btn flat round size="sm" icon="icon-mat-delete" color="negative" @click="hapusItem(item.id)" />
                  </div>
                </q-item-section> -->
              </q-item>
            </template>

          </transition-group>



        </q-list>

      </div>
    </div>
  </div>


</template>

<script setup>
import { computed } from 'vue'
import { date } from 'quasar'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  },
  bisaEditHapus: {
    type: Boolean,
    default: false
  }
})

const lists = computed(() => {
  const arr = props.pasien?.planheder
  return arr?.sort((a, b) => { return b.id - a.id })
})

const listsSkalaTransfer = computed(() => {
  const arr = props.pasien?.skalatransfer
  return arr?.sort((a, b) => { return b.id - a.id })
})

const dateFullFormat = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY H:m:s')
}
</script>