<template>
  <div class="full-height ">
    <div v-if="!store.pasienIgd?.konsultasi?.length" class="column full-height flex-center">
      Tidak Ada Data Konsulan
    </div>
    <div v-else class="full-height bg-grey-3 q-pa-md scroll">
      <div v-for="item in store.pasienIgd?.konsultasi" :key="item?.id" class="bg-white q-mb-md">
        <div class="row no-wrap q-pa-md">
          <div class="col-2">
            <div class="column flex-center">
              <q-avatar size="72px">
                <img :src="PHOTO_USER(item?.kddokterkonsul)">
              </q-avatar>

              <div class="q-mt-md q-mb-xs text-center">{{ NAMA_NAKES(item?.kddokterkonsul) }}</div>
            </div>
          </div>
          <q-separator vertical inset class="q-mx-lg" />
          <div class="column">
            <div>Dengan Hormat,</div>
            <div>Mohon Bantuan Dokter <b>{{ NAMA_NAKES(item?.kddokterkonsul) }}</b>, untuk konsultasi Masalah medik
              saat ini</div>
            <div>{{ item?.permintaan }}</div>
            <q-separator class="q-my-md"></q-separator>
            <div class="text-right">JAWABAN</div>
            <div v-html="getNewLine(item?.jawaban) || 'Belum Ada Jawaban'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getNewLine } from 'src/modules/formatter';
import { useHistoryPasienRanapStore } from 'src/stores/simrs/ranap/history'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung';

const store = useHistoryPasienRanapStore()
const pengunjung = usePengunjungRanapStore()

// console.log('nakes', pengunjung?.nakes);

const PHOTO_USER = (kode) => {
  const dokter = pengunjung.nakes?.find(x => x.kdpegsimrs === kode) ?? null
  // console.log('dokter', dokter)
  const kelamin = 'Laki-laki'
  const row = dokter
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined || row.kddpjp === null) {
    return kelamin === 'Perempuan'
      ? new URL('../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row?.nip + '/' + row?.foto
  }
}

const NAMA_NAKES = (kode) => {
  const nakes = pengunjung.nakes?.find(x => x.kdpegsimrs === kode) ?? null
  return nakes?.nama
}

</script>
