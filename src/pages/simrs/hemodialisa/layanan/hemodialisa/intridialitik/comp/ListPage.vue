<template>
  <div class="fit column bg-grey-4 relative-position ">
    <div class="bg-grey-4 q-pa-sm">
      <info-input-ranap :items="store?.pasien?.intradialitik" class="scroll">
        <transition-group appear tag="div" @before-enter="beforeEnter" @enter="enter">
          <div v-for="(item, i) in store?.pasien?.intradialitik" :key="item" v-ripple
            class="q-card q-pa-md q-mb-sm cursor-pointer">
            <div class="row items-center">
              <div class="col-1">{{ i + 1 }}</div>
              <div class="col-11">
                <div class="row items-end">
                  <div class="col-4">Jam Ke</div>
                  <div class="col-2">{{ item?.rs4 }}</div>
                  <div class="col-6 f-10 text-italic">{{ item?.rs3 }}</div>
                </div>
                <div class="row items-center bg-blue-2">
                  <div class="col-4">Keluhan</div>
                  <div class="col-8">{{ item?.rs5 }}</div>
                </div>
                <div class="row items-center ">
                  <div class="col-4">BB</div>
                  <div class="col-8">{{ item?.rs6 }}</div>
                </div>
                <div class="row items-center bg-blue-2">
                  <div class="col-4">Kesadaran</div>
                  <div class="col-8">{{ item?.rs7 }}</div>
                </div>
                <div class="row items-center ">
                  <div class="col-4 f-12">Tekanan Darah</div>
                  <div class="col-8">{{ item?.rs8 }}</div>
                </div>
                <div class="row items-center bg-blue-2">
                  <div class="col-4">Napas</div>
                  <div class="col-8">{{ item?.rs9 }}</div>
                </div>
                <div class="row items-center ">
                  <div class="col-4">Suhu</div>
                  <div class="col-8">{{ item?.rs10 }}</div>
                </div>
                <div class="row items-center bg-blue-2">
                  <div class="col-4">QB</div>
                  <div class="col-8">{{ item?.rs11 }}</div>
                </div>
                <div class="row items-center ">
                  <div class="col-4">QD</div>
                  <div class="col-8">{{ item?.rs12 }}</div>
                </div>
                <div class="row items-center bg-blue-2">
                  <div class="col-4">Tekanan Vena</div>
                  <div class="col-8">{{ item?.rs13 }}</div>
                </div>
                <div class="row items-center ">
                  <div class="col-4">TMP</div>
                  <div class="col-8">{{ item?.rs14 }}</div>
                </div>
                <div class="row items-center bg-blue-2">
                  <div class="col-4">UF</div>
                  <div class="col-8">{{ item?.rs15 }}</div>
                </div>
                <div class="row items-center ">
                  <div class="col-4">Assesment</div>
                  <div class="col-8">{{ item?.rs16 }}</div>
                </div>
                <div class="row items-center bg-blue-2">
                  <div class="col-4">Perawat</div>
                  <div class="col-8">{{ item?.user?.nama }}</div>
                </div>
              </div>
            </div>
            <div class="row justify-end q-ma-xs q-col-gutter-x-xs">

              <q-btn flat dense color="primary" icon="icon-mat-edit"
                @click="edit(item)"><q-tooltip>edit</q-tooltip></q-btn>
              <q-btn flat dense color="red" icon="icon-mat-delete" @click="remove(item)" :loading="item.loading"
                :disable="item.loading"><q-tooltip>hapus</q-tooltip></q-btn>
            </div>
          </div>
        </transition-group>

      </info-input-ranap>
    </div>
  </div>
</template>
<script setup>
import { useListPasienHemodialisaStore } from "src/stores/simrs/hemodialisa/hemodialisa"
import { defineAsyncComponent, onMounted } from "vue"
import { gsap } from 'gsap'
import { useIntridialitikHemodialisaStore } from "src/stores/simrs/hemodialisa/intridialitik"

const store = useListPasienHemodialisaStore()
const storeForm = useIntridialitikHemodialisaStore()
const InfoInputRanap = defineAsyncComponent(() => import('../../../components/InfoInputRanap.vue'))

function edit (item) {
  console.log('edit', item)
  storeForm.setForm('id', item.id)
  storeForm.setForm('tgl', item.rs3)
  storeForm.setForm('jamKe', item.rs4)
  storeForm.setForm('keluhan', item.rs5)
  storeForm.setForm('bb', item.rs6)
  storeForm.setForm('kesadaran', item.rs7)
  storeForm.setForm('tkDarah', item.rs8)
  storeForm.setForm('napas', item.rs9)
  storeForm.setForm('suhu', item.rs10)
  storeForm.setForm('qb', item.rs11)
  storeForm.setForm('qd', item.rs12)
  storeForm.setForm('tkVena', item.rs13)
  storeForm.setForm('tmp', item.rs14)
  storeForm.setForm('uf', item.rs15)
  storeForm.setForm('assasement', item.rs16)
}
function remove (item) {
  console.log('remove', item)
  storeForm.hapus(item)
}
const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'translateX(200px)'
}
const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    x: 0,
    duration: 0.2,
    onComplete: done
  })
}
onMounted(() => {
  console.log('pasien', store?.pasien)

})
</script>
