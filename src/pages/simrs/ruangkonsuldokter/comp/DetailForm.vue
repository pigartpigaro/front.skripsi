<template>
  <div class="fit column">
    <div class="col-auto header">
      <div class="row justify-between items-center q-pa-md bg-white shadow-1">
        <div class="row items-center">
          <q-btn icon="icon-mat-arrow_back" flat dense size="md" color="primary" class="q-mr-md"
            @click="emits('toList')">
            <q-tooltip>
              Kembali Ke List
            </q-tooltip>
          </q-btn>
          <div>
            <div class="text-h6 text-weight-medium">Lembar Konsultasi</div>
            <div class="text-caption text-grey">
              {{ humanDate(item?.tgl_permintaan) }} - {{ formatJam(item?.tgl_permintaan) }}
            </div>
          </div>
        </div>
        <div class="row items-center">
          <q-badge :color="getStatusColor(item)" class="q-mr-md">
            {{ getStatusLabel(item) }}
          </q-badge>
          <div class="text-right">
            <div class="text-subtitle1 text-weight-medium">{{ item?.kunjunganranap?.nama }}</div>
            <div class="text-caption">
              {{ item?.kunjunganranap?.rs2 }} ||
              <span v-if="item?.kdruang === 'POL014'">{{ item?.kunjunganigd?.ruangan ?? '-' }}</span>
              <span v-if="item?.kdruang !== 'POL014'">{{ item?.kunjunganranap?.ruangan ?? '-' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col full-height bg-grey-1 scroll">
      <div class="q-pa-lg">
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="row items-start no-wrap">
              <q-avatar size="48px" color="primary" text-color="white" class="bg-orange">
                <img :src="getImage('Perempuan', item?.nakesminta)">
              </q-avatar>
              <div class="col q-ml-lg">
                <div class="text-subtitle1 text-weight-medium">
                  {{ item?.nakesminta?.nama ?? 'Not Valid' }}
                </div>
                <div class="text-caption text-grey">
                  Pengirim
                </div>
                <q-separator class="q-my-sm" />
                <div class="text-subtitle2 q-mt-sm">
                  [ Konsultasi Dokter ] Kunjungan Pasien <span class="text-primary">{{ item?.kunjunganranap?.rs1 ||
                    item?.kunjunganigd?.rs1
                    }}</span>
                </div>
                <div class="text-body2 q-mt-sm">
                  {{ item?.ketuntuk }}
                </div>
                <div class="q-mt-md q-pa-md bg-blue-1 rounded-borders">
                  <div class="text-body2">Dengan Hormat,</div>
                  <div class="text-body2 q-mt-sm">Mohon Bantuan Dokter <b>{{ item?.dokterkonsul?.nama }}</b>, untuk
                    konsultasi Masalah medik saat ini</div>
                  <div class="text-body2 q-mt-sm">{{ item?.permintaan }}</div>
                  <div class="text-body2 q-mt-md">
                    Terimakasih Atas Kerjasamanya
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered v-if="item?.jawaban" class="q-mb-md">
          <q-card-section>
            <div class="row items-start no-wrap">
              <q-avatar size="48px" color="green" text-color="white" class="bg-orange">
                <img :src="getImage('Perempuan', item?.dokterkonsul)">
              </q-avatar>
              <div class="col q-ml-lg">
                <div class="text-subtitle1 text-weight-medium">
                  {{ item?.dokterkonsul?.nama ?? 'Not Valid' }}
                </div>
                <div class="text-caption text-grey">
                  Dokter Konsultan
                </div>
                <q-separator class="q-my-sm" />
                <div class="text-body2 q-mt-sm q-pa-md bg-green-1 rounded-borders">
                  <pre class="no-margin">{{ item?.jawaban }}</pre>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-form class="q-mt-lg" @submit="onSubmit">
          <div class="text-subtitle1 text-weight-medium q-mb-sm">Jawaban Konsultasi</div>
          <q-input outlined v-model="store.form.jawaban" label="Tulis jawaban konsultasi di sini" type="textarea"
            rows="8" bg-color="white" class="shadow-1" />

          <div class="row justify-end q-mt-lg q-gutter-md">
            <q-btn color="grey" label="Kembali" flat @click="emits('toList')" />
            <q-btn :loading="store.loadingSave" :disable="store.loadingSave" color="primary" icon-right="icon-mat-send"
              label="Kirim Jawaban" type="submit" />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRuangKonsulDokterStore } from 'src/stores/simrs/ranap/ruangkonsuldokter'
import { formatJam, humanDate } from 'src/modules/formatter'
import { onMounted, ref } from 'vue'

const store = useRuangKonsulDokterStore()

const props = defineProps({
  item: {
    type: Object,
    default: null
  }
})

const isSubmitting = ref(false)

onMounted(() => {
  console.log('item', props?.item)
  store.updateFlag(props?.item)
})

const emits = defineEmits(['toList'])

const onSubmit = () => {
  isSubmitting.value = true
  store.saveJawaban(props?.item)
    .then(() => {
      isSubmitting.value = false
      emits('toList')
    })
    .catch(() => {
      isSubmitting.value = false
    })
}

const getInitials = (name) => {
  if (!name) return 'NA'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

const getStatusColor = (item) => {
  if (!item?.flag) return 'red'
  if (item?.jawaban) return 'green'
  return 'blue'
}

const getStatusLabel = (item) => {
  if (!item?.flag) return 'Belum Dibaca'
  if (item?.jawaban) return 'Sudah Dijawab'
  return 'Sudah Dibaca'
}

function getImage(kelamin, row) {
  console.log('row', row);

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
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}
</style>
