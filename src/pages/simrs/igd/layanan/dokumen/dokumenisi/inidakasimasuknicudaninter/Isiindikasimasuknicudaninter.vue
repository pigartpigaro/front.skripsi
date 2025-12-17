<template>
  <div v-if="!props.keterangan && !props.loading">
    <app-no-data />
  </div>
  <div v-if="props.loading">
    <app-loading />
  </div>
  <div v-if="props.keterangan && !props.loading" class="full-height">
    Pasien yang membutuhkan perawatan Di Ruang {{
      props?.kelas }}
    dengan kesimpulan : <br>
    <br>
    <div v-for="(item, n) in props.isi" :key="n">
      - {{ item }}
    </div>
    <br>
    <div>
      Keterangan : {{ props?.keterangan }}
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  kelas: {
    type: Object,
    default: null
  },
  keterangan: {
    type: Object,
    default: null
  },
  isi: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
})

// const store = usePlannStore();
// const isi = store?.isiindikasimasuknicu?.planranap?.dokumentransfer?.isi ? JSON.parse(store?.isiindikasimasuknicu?.planranap?.dokumentransfer?.isi) : '-'
</script>
