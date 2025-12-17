<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 180vw; height: 600px">
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
        <q-header>
          <q-bar class="bg-black text-white">
            <div>Cetak RBA</div>
            <q-space />

            <q-btn dense flat icon="icon-mat-close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-header>
        <q-page-container>
          <q-card-section id="printMe">
            <div class="q-pa-md">
              <kop-cetak />
            </div>
            <div class="q-px-md full-width">
              <data-rba />
            </div>
            <div class="row q-pt-md justify-between full-width">

              <div class="col"></div>
              <div v-for="it in ttd.ttd" :key="it" class="flex-end text-center" style="width:50%">
                <div>
                  Probolinggo {{ store.tglcetak }}
                </div>
                <div class="text-bold">
                  Pengguna Anggaran
                </div>
                <div style="padding-bottom: 40px" />
                <div class="underline text-bold">
                  {{ it.nama }}
                  <div class="garis-bawah" style="text-decoration-line: underline;" />
                </div>
                <div>
                  NIP. {{ it.nip }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-page-container>
        <q-footer>
          <q-card-section class="q-pa-none bg-primary text-white">
            <div class="q-pa-md row justify-end items-end">
              <div class="items-end">
                <q-btn v-print="printObj" unelevated color="dark" round size="sm" icon="icon-mat-print">
                  <q-tooltip class="primary" :offset="[10, 10]">
                    Print
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-footer>
      </q-layout>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import KopCetak from './KopCetak.vue'
import DataRba from './ListDataRBA.vue'
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar'
import { useRbaStore } from 'src/stores/siasik/anggaran/storerba'


const ttd = useBukubesarStore()
const store = useRbaStore()

onMounted(() => {
  ttd?.getTtd()
})
const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Rencana Bisnis Anggaran | SIASIK on XENTER',
  beforeOpenCallback(vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback(vue) {
    console.log('opened')
  },
  closeCallback(vue) {
    printed.value = false
    console.log('closePrint')
  }
}
</script>
