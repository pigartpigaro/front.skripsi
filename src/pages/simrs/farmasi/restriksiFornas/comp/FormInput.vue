<template>
  <q-dialog persistent backdrop-filter="blur(4px) saturate(150%)" transition-show="slide-left" transition-hide="fade">
    <q-card style="width: 50%;">
      <q-bar class="col-auto bg-primary text-white q-py-sm">
        <div class="text-weight-bold f-18">Form Restiksi Obat</div>
        <q-space />
        <q-btn v-close-popup class="text-right" dense flat icon="icon-mat-close" @click="emits('close')"
          :disable="store.loading || store.form?.loading">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row text-weight-bold f-16">
          {{ store.form.nama_obat }}
        </div>
        <div class="row q-my-xs">
          <app-input ref="refJumlah" v-model="store.form.jumlah" class="col-12" label="Jumlah Restriksi" type="number"
            :rules="[val => val > 0 || 'Jumlah Restriksi harus lebih dari 0']" :disable="store.form.loading"
            :loading="store.form.loading" outlined />
        </div>
        <div class="row q-my-xs">
          <div class="col-12">
            <app-input-date-human :model="store.form.dispTgl" label="Tanggal Mulai Berlaku Efektif"
              :rules="[val => val !== null || 'Tanggal tidak boleh kosong']" :disable="store.form.loading"
              :loading="store.form.loading" outlined @set-model="val => {
                store.form.dispTgl = val
              }" @db-model="val => {
                store.form.tgl_mulai_berlaku = val
              }" />

          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-if="store.form.kd_obat && store.depo" label="Hapus restriksi" no-caps color="negative"
          :loading="store.form.loading" :disable="store.form.loading" @click="store.delete" />
        <q-btn v-if="store.form.kd_obat && store.depo" label="Simpan Jumlah restriksi" no-caps color="primary"
          :loading="store.form.loading" :disable="store.form.loading" @click="store.save" />
      </q-card-actions>
      <q-card-section>
        <div class="row items-center">
          <div class="col-10">
            <app-autocomplete v-model="store.form.ruangan" label="Pilih Ruangan" autocomplete="nama" option-label="nama"
              option-value="value" outlined :source="store.ruangs" :loading="store.form.loading"
              :disable="store.form.loading" />
          </div>
          <div class="col-2 text-center">
            <q-btn v-if="store.form.kd_obat && store.depo && store.form.ruangan" class="text-right" dense flat
              icon="icon-mat-add" @click="store.addRuangan" :disable="store.form.loading" />
          </div>
        </div>
        <div v-if="store.form.kecuali?.length" class="q-mt-sm">
          <div v-for="(item, i) in store.form.kecuali" :key="i">
            <div class="row">
              <div class="col-1">{{ i + 1 }}.</div>
              <div class="col-10">
                {{ item?.ruang?.nama }}
              </div>
              <div class="col-1">
                <q-btn size="xs" flat color="negative" round dense icon="icon-mat-delete"
                  @click.stop.prevent="store.hapusRuangan(item)" :loading="item.loading" :disable="item.loading" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRestriksiFornasStore } from 'src/stores/simrs/farmasi/restriksiFornas/restriksi'
import { ref } from 'vue'

const emits = defineEmits(['close'])

const store = useRestriksiFornasStore()

const refJumlah = ref(null)
</script>
