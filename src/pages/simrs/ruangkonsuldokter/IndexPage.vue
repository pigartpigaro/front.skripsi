<template>
  <q-page class="fit absolute column">
    <div class="fit">
      <q-splitter v-model="splitterModel" :limits="[15, 30]" before-class="overflow-hidden"
        after-class="overflow-hidden" class="fit">
        <template #before>
          <div class="column fit bg-white">
            <div class="col-auto q-pa-md bg-primary text-white">
              <div class="text-h5 text-bold text-center">
                Ruang Konsultasi
              </div>
            </div>
            <div class="col full-height scroll">
              <q-list padding>
                <q-item-label header class="text-grey-8 q-pb-xs">
                  Menu Utama
                </q-item-label>

                <q-item clickable v-ripple :active="innerTab === 'innerMails'" active-class="bg-primary text-white"
                  @click="innerTab = 'innerMails'">
                  <q-item-section avatar>
                    <q-icon name="icon-mat-email" />
                  </q-item-section>
                  <q-item-section>
                    Permintaan Konsultasi
                  </q-item-section>
                  <q-item-section side v-if="getUnreadCount > 0">
                    <q-badge color="red" :label="getUnreadCount" />
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple :active="innerTab === 'outerMails'" active-class="bg-primary text-white"
                  @click="innerTab = 'outerMails'" v-if="store?.item">
                  <q-item-section avatar>
                    <q-icon name="icon-mat-mark_email_read" />
                  </q-item-section>
                  <q-item-section>
                    Detail Konsultasi
                  </q-item-section>
                </q-item>

                <q-separator class="q-my-md" />

                <q-item clickable v-ripple @click="router.back()">
                  <q-item-section avatar>
                    <q-icon name="icon-mat-arrow_back" />
                  </q-item-section>
                  <q-item-section>
                    Kembali Ke Menu Utama
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </template>

        <template #after>
          <div class="column fit">
            <div class="col-auto full-width">
              <q-card class="row justify-between items-center q-pa-md shadow-1 bg-white">
                <div class="text-h6 text-weight-medium">
                  <q-icon name="icon-mat-medical_services" color="primary" size="sm" class="q-mr-sm" />
                  Lembar Konsultasi Dokter
                </div>
                <div>
                  <q-btn icon="icon-mat-refresh" flat round color="primary" size="sm" @click="refreshData">
                    <q-tooltip>Segarkan Data</q-tooltip>
                  </q-btn>
                  <q-btn icon="icon-mat-close" flat round color="grey" size="sm" @click="router.back()">
                    <q-tooltip>Tutup</q-tooltip>
                  </q-btn>
                </div>
              </q-card>
            </div>
            <div class="col fit">
              <q-tab-panels v-model="innerTab" animated swipeable transition-prev="fade" transition-next="fade"
                class="bg-grey-1 fit">
                <q-tab-panel name="innerMails" class="fit q-pa-none">
                  <q-slide-transition>

                    <div v-if="store.loading" class="col full-height flex flex-center">
                      <q-spinner color="primary" size="3em" />
                      <div class="text-subtitle1 q-mt-md text-grey-8">Memuat data konsultasi...</div>
                    </div>
                    <ListMail v-else :items="store.items" @details="handleDetails" @refresh="refreshData" />
                    <!-- <div v-else class="col full-height flex flex-center">
                      <div class="text-center">
                        <q-icon name="icon-mat-inbox" size="4rem" color="grey-5" />
                        <div class="text-h6 text-grey-7 q-mt-md">Belum Ada Konsultasi</div>
                        <q-btn color="primary" label="Kembali Ke Menu Utama" no-caps class="q-mt-md"
                          @click="router.back()" />
                      </div>
                    </div> -->
                  </q-slide-transition>
                </q-tab-panel>

                <q-tab-panel name="outerMails" class="fit q-pa-none">
                  <q-slide-transition>
                    <DetailForm :item="store?.item" @to-list="innerTab = 'innerMails'" />
                  </q-slide-transition>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import { useRuangKonsulDokterStore } from 'src/stores/simrs/ranap/ruangkonsuldokter'
import { defineAsyncComponent, onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const ListMail = defineAsyncComponent(() => import('./comp/ListMail.vue'))
const DetailForm = defineAsyncComponent(() => import('./comp/DetailForm.vue'))

const $q = useQuasar()
const splitterModel = ref(20)
const innerTab = ref('innerMails')
const router = useRouter()
const store = useRuangKonsulDokterStore()

const getUnreadCount = computed(() => {
  return store.items.filter(item => !item?.flag).length
})

const handleDetails = (val) => {
  store.item = val
  innerTab.value = 'outerMails'

  // Notify when opening a new consultation
  if (!val?.flag) {
    $q.notify({
      message: 'Konsultasi baru dibuka',
      color: 'primary',
      icon: 'icon-mat-mark_email_read',
      position: 'top-right',
      timeout: 2000
    })
  }
}

const refreshData = () => {
  $q.loading.show({
    message: 'Memuat data konsultasi...',
    spinnerColor: 'primary',
    spinnerSize: 40
  })

  store.getRuangKonsulDokter()
    .then(() => {
      $q.loading.hide()
      $q.notify({
        message: 'Data konsultasi berhasil dimuat',
        color: 'positive',
        icon: 'icon-mat-check_circle',
        position: 'top-right',
        timeout: 2000
      })
    })
    .catch(() => {
      $q.loading.hide()
      $q.notify({
        message: 'Gagal memuat data konsultasi',
        color: 'negative',
        icon: 'icon-mat-error',
        position: 'top-right',
        timeout: 2000
      })
    })
}

onMounted(() => {
  refreshData()
})

watch(() => store.params.status, (nw, old) => {
  console.log('Lama:', old)
  console.log('Baru:', nw)

  if (old !== nw) {
    refreshData()
  }


}, { deep: true })
</script>

<style lang="scss" scoped>
.q-item.active {
  font-weight: 500;
}
</style>
