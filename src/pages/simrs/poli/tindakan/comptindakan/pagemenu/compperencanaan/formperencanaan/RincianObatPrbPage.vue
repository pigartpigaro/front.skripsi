<template>
  <q-dialog persistent>
    <q-card style="min-width: 800px;">
      <q-bar class="bg-primary">
        <q-space />

        <q-btn v-close-popup dense flat color="white" icon="icon-mat-close" @click="emits('close')">
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section style="min-height: 300px;">
        <div>
          <div class="row">
            <div class="col-2">Nomor Resep</div>
            <div class="col-1">:</div>
            <div class="col-3 text-weight-bold">{{ resep?.noresep }}</div>
          </div>
          <div class="row">
            <div class="col-3 text-weight-bold">Resep :</div>
          </div>
          <div class="row bg-dark text-white q-py-xs">
            <div class="col-4">Nama Obat</div>
            <div class="col-2">Kode Obat BPJS</div>
            <div class="col-2">Jumlah</div>
            <div class="col-2">Signa</div>
            <div class="col-2">keterangan</div>
          </div>
          <div v-for="(item, i) in resep?.permintaanresep" :key="i">
            <div class="row q-py-xs" :class="!item?.mobat?.kode_bpjs ? 'bg-red-2' : (i % 2 == 0 ? 'bg-grey-3' : '')">
              <div class="col-4">{{ item?.mobat?.nama_obat }}</div>
              <div class="col-2">{{ item?.mobat?.kode_bpjs }}</div>
              <div class="col-2">{{ item?.jumlah }}</div>
              <div class="col-2">{{ item?.aturan }}</div>
              <div class="col-2">{{ item?.keterangan }}</div>
            </div>

          </div>
          <!-- {{ resep }} -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
defineProps({
  resep: {
    type: Object,
    default: () => { }
  }
})
const emits = defineEmits(['close'])
</script>
