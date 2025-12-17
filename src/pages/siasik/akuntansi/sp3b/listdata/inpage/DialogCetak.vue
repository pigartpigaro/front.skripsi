<template>
  <q-dialog presistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 180vw; height: 600px">
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
        <q-header>
          <q-bar class="bg-black text-white">
            <div>Cetak SP3B</div>
            <q-space />

            <q-btn dense flat icon="icon-mat-close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-header>
        <q-page-container id="printMe">
          <div class="q-pt-sm q-px-md full-width">
            <kop-cetak />
          </div>
          <div class="q-px-md full-width">
            <data-sp3b />
          </div>
        </q-page-container>
        <q-footer elevated>
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
import KopCetak from './KopCetak.vue'
import DataSp3b from './DataDialog.vue'
import { ref } from 'vue'


const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Surat Permintaan Pengesahan Pendapatan, Belanja, dan Pembiayaan | SIASIK on XENTER',
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
