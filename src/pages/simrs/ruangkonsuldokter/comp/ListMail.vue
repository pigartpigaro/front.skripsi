<template>
  <div class="column fit">
    <div class="col-auto bg-white q-px-md q-py-sm shadow-1">
      <div class="row justify-between items-center">
        <div class="kiri">
          <q-btn icon="icon-mat-refresh" size="sm" flat dense color="primary" class="q-mr-sm" @click="emits('refresh')">
            <q-tooltip>
              Segarkan
            </q-tooltip>
          </q-btn>
          <q-btn-dropdown color="primary" :label="'Filter : ' + pelabelanFilter" flat dense no-caps>
            <q-list>

              <q-item clickable v-close-popup @click="store.params.status = ''">
                <q-item-section>
                  <q-item-label>Belum Dibaca</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="store.params.status = '1'">
                <q-item-section>
                  <q-item-label>Sudah Dibaca & Belum dijawab</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="store.params.status = '2'">
                <q-item-section>
                  <q-item-label>Sudah Dijawab</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn v-if="store.params.status === '' && filteredItems?.length" dark flat
            @click="store.tandaiSemuaSudahDibaca">Tandai Semua Sudah di baca</q-btn>
        </div>
        <div class="kanan">
          <q-pagination v-model="store.params.page" :max="10" input color="primary"
            @update:model-value="store.getRuangKonsulDokter" />
        </div>
      </div>
    </div>
    <div v-if="store.items?.length" class="col full-height scroll">
      <q-list separator class="rounded-borders q-mt-sm">
        <q-slide-transition v-for="(item, i) in filteredItems" :key="i">
          <q-item clickable v-ripple :class="getItemClass(item)" @click="emits('details', item)"
            class="q-my-sm q-mx-md rounded-borders transition-all q-pb-lg">
            <q-item-section avatar>
              <q-avatar class="bg-orange">
                <img :src="getImage('Perempuan', item?.nakesminta)">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-medium">
                {{ item?.nakesminta?.nama ?? 'Not Valid' }}
                <q-badge v-if="!item?.flag" color="red" class="q-ml-sm">Baru</q-badge>
              </q-item-label>

              <q-item-label v-if="item?.kdruang === 'POL014'" caption lines="1">
                <q-icon name="icon-mat-person" size="sm" class="q-mr-xs" />
                {{ item?.kunjunganigd?.nama ?? '-' }} ({{ item?.kunjunganigd?.rs2 ?? '-' }}) IRD
              </q-item-label>

              <q-item-label v-if="item?.kdruang !== 'POL014'" caption lines="1">
                <q-icon name="icon-mat-person" size="sm" class="q-mr-xs" />
                {{ aturPasien(item) }}
              </q-item-label>

              <q-item-label caption lines="1">
                <q-icon name="icon-mat-local_hospital" size="xs" class="q-mr-xs" />
                Diagnosa: {{ item?.kunjunganranap?.diagnosamedis[0]?.masterdiagnosa?.rs4 ?? 'Belum Ada Diagnosa' }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="column items-end">
                <div class="text-caption">
                  {{ humanDate(item?.tgl_permintaan) }}
                </div>
                <div class="text-caption">
                  {{ formatJam(item?.tgl_permintaan) }}
                </div>
                <div class="q-mt-xs">
                  <q-badge :color="item?.jawaban ? 'positive' : 'grey'"
                    :label="item?.jawaban ? 'Dijawab' : 'Menunggu'" />
                </div>
              </div>
            </q-item-section>

            <q-item-section side>
              <q-icon :name="getStatusIcon(item)" :color="getStatusColor(item)" size="md" />
            </q-item-section>


            <q-badge v-if="item?.kdruang !== 'POL014'" class="absolute-bottom-left">
              {{ item?.kunjunganranap?.ruangan || 'Tidak Ada Ruangan' }}
            </q-badge>
            <q-badge v-if="item?.kdruang === 'POL014'" class="absolute-bottom-left">
              IRD
            </q-badge>
          </q-item>
        </q-slide-transition>
      </q-list>
    </div>
    <div v-else-if="!store?.items?.length" class="col full-height flex flex-center">
      <div class="text-center">
        <q-icon name="icon-mat-filter_list" size="4rem" color="grey-5" />
        <div class="text-h6 text-grey-7 q-mt-md">Tidak ada item yang sesuai dengan filter</div>
        <q-btn color="primary" flat label="Reset Filter" class="q-mt-sm" @click="store.params.status = ''" />
      </div>
    </div>
    <div v-else-if="!items?.length" class="col full-height flex flex-center">
      <div class="text-center">
        <q-icon name="icon-mat-inbox" size="4rem" color="grey-5" />
        <div class="text-h6 text-grey-7 q-mt-md">Belum ada konsultasi</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatJam, humanDate } from 'src/modules/formatter'
import { useRuangKonsulDokterStore } from 'src/stores/simrs/ranap/ruangkonsuldokter';
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const store = useRuangKonsulDokterStore()

const emits = defineEmits(['details', 'refresh'])

const current = ref(1)
const filterStatus = ref('all')

const filteredItems = computed(() => {
  // if (filterStatus.value === 'all') {
  //   return props.items
  // } else if (filterStatus.value === 'unread') {
  //   return props.items.filter(item => !item?.flag)
  // } else if (filterStatus.value === 'read') {
  //   return props.items.filter(item => item?.flag && !item?.jawaban)
  // } else if (filterStatus.value === 'answered') {
  //   return props.items.filter(item => item?.jawaban)
  // }
  return props.items
})


const pelabelanFilter = computed(() => {
  const filt = store.params.status
  let res = 'Belum Dibaca'
  if (filt === '') {
    res = 'Belum Dibaca'
  } else if (filt === '1') {
    res = 'Sudah Dibaca & Belum Dijawab'
  } else {
    res = 'Sudah Dijawab'
  }

  return res;
})

const aturPasien = (item) => {
  if (item?.kdruang !== 'POL014') {
    return `${item?.kunjunganranap?.nama ?? '-'} (${item?.kunjunganranap?.rs2 ?? '-'}, ${item?.kunjunganranap?.ruangan ?? '-'}) `
  }
  else {
    return `${item?.kunjunganigd?.nama ?? '-'} (${item?.kunjunganigd?.rs2 ?? '-'}, ${item?.kunjunganigd?.ruangan ?? '-'}) `
  }
}

const getInitials = (name) => {
  if (!name) return 'NA'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

const getAvatarColor = (item) => {
  if (!item?.flag) return 'red'
  if (item?.jawaban) return 'green'
  return 'blue'
}

const getStatusIcon = (item) => {
  if (!item?.flag) return 'icon-mat-mark_email_unread'
  if (item?.jawaban) return 'icon-mat-mark_email_read'
  return 'icon-mat-email'
}

const getStatusColor = (item) => {
  if (!item?.flag) return 'red'
  if (item?.jawaban) return 'green'
  return 'blue'
}

const getItemClass = (item) => {
  let classes = 'shadow-1 '

  if (!item?.flag) {
    classes += 'bg-red-1 border-left-4 border-red q-pl-sm'
  } else if (item?.jawaban) {
    classes += 'bg-green-1 border-left-4 border-green q-pl-sm'
  } else {
    classes += 'bg-blue-1 border-left-4 border-blue q-pl-sm'
  }

  return classes
}

function getImage(kelamin, row) {
  // console.log('row', row);

  if (row.foto === null || row.foto === '') {
    return kelamin === 'Perempuan'
      ? new URL('../../../../assets/images/user-avatar.svg', import.meta.url).href
      : new URL('../../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
    // return row.foto_pegawai
  }
}
</script>

<style lang="scss" scoped>
.transition-all {
  transition: all 0.3s ease;
}

.border-left-4 {
  border-left-width: 4px;
  border-left-style: solid;
}

.border-red {
  border-left-color: #f44336;
}

.border-green {
  border-left-color: #4caf50;
}

.border-blue {
  border-left-color: #2196f3;
}
</style>
