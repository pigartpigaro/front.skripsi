<template>
  <div class="full-height q-pa-sm bg-white" style="overflow: scroll;">
    <div v-if="!pasien?.jawabankonsul || pasien?.jawabankonsul?.length == 0">
      <app-no-data text="Belum ada data konsul" />
    </div>
    <q-list v-else bordered class="rounded-borders">
      <template v-for="(item, i) in pasien?.jawabankonsul" :key="item">
        <q-expansion-item v-model="item.expand" expand-separator
          :class="(item?.dibaca_poli_asal === null && item?.jawaban !== null && item?.noreg_lama === pasien?.noreg) ? 'bg-blue-2' : (i % 2 == 0 ? 'bg-grey-4' : 'bg-grey-2')"
          @show="show(item)">
          <template v-slot:header>
            <q-item-section>Konsul dari {{ item?.poli_asal?.rs2 }} ketika berkunjung tanggal {{
              dateFullFormat(item?.tgl_kunjungan)
              }} dengan nomor registrasi {{ item?.noreg_lama }}</q-item-section>
            <q-item-section>ke {{ item?.poli_tujuan?.rs2 }}
              <span v-if="item?.noreg_baru != null">dengan nomor registrasi {{ item?.noreg_baru
                }}</span>
              <span v-else class="text-weight-bold">dengan tanggal rencana kunjungan {{
                dateFullFormat(item?.tgl_rencana_konsul)
              }}</span>
            </q-item-section>
            <q-item-section side>
              <q-btn
                v-if="(item?.poli_tujuan?.rs1 == pasien?.kodepoli) && (date.formatDate(item?.tgl_rencana_konsul, 'YYYY-MM-DD') == date.formatDate(pasien?.tgl_kunjungan, 'YYYY-MM-DD')) && !item?.noreg_baru"
                icon="icon-mat-edit" color="primary" :loading="item?.loading" :disable="item?.loading"
                @click="bukajawaban(item)">
                <q-tooltip class="primary" :offset="[10, 10]">
                  Buka Edit Jawaban Konsul
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </template>
          <div class="row q-pa-sm bg-white items-center">
          </div>
          <div class="row q-px-sm q-pb-sm bg-white items-center q-col-gutter-sm">
            <div class="col-5">
              <!-- <div class="row q-ml-sm" v-html="getNewLine(item?.pertanyaan)" /> -->
              <div class="col-12 q-mt-sm" style="border: 1px solid rgba(0,0,0,0.2)">
                <div class="row text-weight-bold q-my-sm">Pengantar Konsul:</div>
                <span class="" v-html="getNewLine(store?.konsulText?.header)" />
                <span class="text-weight-bold q-mx-xs">DPJP {{ item?.poli_tujuan?.rs2 }}</span>
                <span class="" v-html="getNewLine(store?.konsulText?.openingText)" />
                <div class="q-ml-xs text-weight-bold" v-html="getNewLine(item?.pertanyaan ?? '-')" />
                <!--
                <q-input v-model="store.konsulText.diagnosa" label=" " outlined standout="bg-yellow-3" type="textarea"
                  autogrow class="q-mb-xs" /> -->
                <div class="q-mt-lg" v-html="getNewLine(store?.konsulText?.closingText)" />

              </div>
            </div>
            <div class="col-6">
              <div v-if="pasien?.noreg !== item?.noreg_baru" class="col-12 q-mt-sm"
                style="border: 1px solid rgba(0,0,0,0.2)">
                <div class="row text-weight-bold q-my-sm">Jawaban Konsul:</div>
                <span class="" v-html="getNewLine(store?.jawabanText?.header)" />
                <div class="row q-ml-sm" v-html="getNewLine(item?.jawaban)" />
              </div>

              <div v-if="pasien?.noreg === item?.noreg_baru" class="col-12 q-ml-sm full-width"
                style="border: 1px solid rgba(0,0,0,0.2)">
                <div class="row text-weight-bold q-my-sm">Jawaban Konsul:</div>
                <span class="" v-html="getNewLine(store?.jawabanText?.header)" />
                <q-input v-if="item?.edit" v-model="store.jawabanText.jawaban" class="full-width" label=" " outlined
                  standout="bg-yellow-3" type="textarea" autogrow />
                <div v-if="!item?.edit" class="row text-weight-bold" v-html="getNewLine(item?.jawaban)" />
              </div>
            </div>
            <div class="col-1 text-center">
              <div v-if="pasien?.noreg === item?.noreg_baru">
                <q-btn v-if="!item?.edit" icon="icon-mat-edit" flat dense color="primary" @click="bisaEdit(item)">
                  <q-tooltip class="primary" :offset="[10, 10]">
                    Edit
                  </q-tooltip>
                </q-btn>
                <q-btn v-if="item?.edit" icon="icon-mat-save" flat dense color="primary" @click="simpan(item)"
                  :loading="store?.loading" :disable="store?.loading">
                  <q-tooltip class="primary" :offset="[10, 10]">
                    Simpan
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </q-expansion-item>
      </template>
    </q-list>

  </div>
</template>

<script setup>
import { date } from 'quasar'
import { dateFullFormat, getNewLine } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useJawabanKonsulStore } from 'src/stores/simrs/pelayanan/poli/jawabanKonsul'


const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingTerima: {
    type: Boolean,
    default: false
  },
  depo: {
    type: String,
    default: ''
  }
})

const store = useJawabanKonsulStore()
function simpan (item) {
  console.log('item', item)
  item.edit = false
  store.simpanJawaban(props?.pasien, item)

}
function bisaEdit (item) {
  const date1 = new Date(Date.now())
  const date2 = new Date(props.pasien?.tgl_kunjungan)
  const unit = 'days'

  const diff = date.getDateDiff(date1, date2, unit)
  // console.log('diff', diff, props.pasien)
  if (diff > 30) return notifErrVue('Jawaban Konsul dapat di edit sampai 30 hari setelah tanggal kunjungan')
  else {
    item.edit = true
    store.jawabanText.jawaban = item?.jawaban
  }

}
function show (item) {
  // console.log('show', item)
  if (item?.dibaca_poli_asal === null && item?.jawaban !== null && item?.noreg_lama === props?.pasien?.noreg) {
    store.updateDibaca(props?.pasien, item)
  }
}

function bukajawaban (item) {
  item.expand = !item.expand
  store.updateNoreg(props?.pasien, item)
  // console.log('buka jawaban', item) // tgl_rencana_konsul poli_tujuan?.rs1
  // console.log('pasien', props.pasien) // kodepoli tgl_kunjungan

}
</script>
