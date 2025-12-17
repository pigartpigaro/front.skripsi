<template>
  <div class="fit column scroll">
    <div class="col full-height bg-grey-1 scroll" v-for="(item, i) in props.pasien?.konsultasi" :key="i">
      <div class="q-pa-lg">
        <div class="text-h6 text-weight-light">
          [Konsultasi Dokter] Kunjungan No. <span class="text-primary">{{ item?.noreg }}</span>
        </div>
        <div class="f-20 text-weight-light">
          {{ item?.ketuntuk }}
        </div>
        <div class="q-mt-lg">
          <div>Dengan Hormat,</div>
          <div>Mohon Bantuan Dokter <b>{{ item?.dokterkonsul?.nama }}</b>, untuk konsultasi Masalah medik saat
            ini</div>
          <div>{{ item?.permintaan }}</div>

          <div class="q-mt-lg">
            Terimakasih Atas Kerjasamanya
          </div>

          <div class="q-mt-lg">
            <div class="text-weight-bold">
              Jawaban :
            </div>
            <span v-html="getNewLine(item?.jawaban) || 'Belum Ada Jawaban'" />
          </div>
        </div>
      </div>
      <q-separator style="border: 1px;" />
    </div>
  </div>
</template>

<script setup>

function getNewLine(text) {
  return text?.replace(/\n/g, '<br/>')
}

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
})



</script>
