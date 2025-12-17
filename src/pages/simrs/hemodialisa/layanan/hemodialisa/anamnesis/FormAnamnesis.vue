<template>
  <div class="row q-col-gutter-md">
    <q-input ref="refInputKu" v-model="store.form.keluhanUtama" outlined autogrow stack-label standout="bg-yellow-3"
      label="Keluhan Utama" :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" lazy-rules="ondemand"
      hide-bottom-space :style="`${ulang ? 'width:100%' : 'width:50%'}`" />
    <q-input v-model="store.form.rwPenySkr" outlined autogrow stack-label standout="bg-yellow-3"
      label="Riwayat Penyakit Sekarang" hide-bottom-space style="width:50%" />
    <q-input v-model="store.form.rwPenyDhl" outlined autogrow stack-label standout="bg-yellow-3"
      label="Riwayat Penyakit Dahulu" hide-bottom-space style="width:50%" />
    <q-input v-model="store.form.rwPenyKlrg" outlined autogrow stack-label standout="bg-yellow-3"
      label="Riwayat Penyakit Keluarga" hide-bottom-space style="width:50%" />
    <q-input v-model="store.form.rwPengobatan" outlined autogrow stack-label standout="bg-yellow-3"
      label="Riwayat Pengobatan" hide-bottom-space style="width:50%" />
    <q-input v-model="store.form.rwPkrjDgZatBahaya" outlined autogrow stack-label standout="bg-yellow-3"
      label="Riwayat Pekerjaan yg berhubung dg Zat berbahaya" hide-bottom-space style="width:50%" />

    <div v-if="nakes === '2' || nakes === '3'" class="col-12">
      <!-- <div class="col-12"> -->
      <!-- RIWAYAT ALERGI -->
      <q-card flat bordered class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold">
            Riwayat Alergi
          </div>
          <div class="text-grey-8 f-10">
            Riwayat alergi yang pernah dialami
            oleh pasien
          </div>
          <q-separator class="q-my-sm" />
          <div class="flex q-gutter-sm q-mb-sm">
            <q-checkbox dense v-for="(al, i) in store.alergis" :key="i" v-model="store.form.rwAlergi" :val="al"
              :label="al" color="primary" />
          </div>
          <q-input v-model="store.form.ketRwAlergi" outlined label="Keterangan Alergi" standout="bg-yellow-3" autogrow
            style="width: 70%;" />
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mb-sm">
        <q-card-section class="q-py-xs q-px-md">
          <div class="q-mt-sm">
            <div class="text-weight-bold">
              Kajian Nyeri
            </div>
            <template v-if="store.form.keluhannyeri.kajianNyeri">
              <q-radio v-model="store.form.keluhannyeri.kajianNyeri" v-for="dd in store.pilihanNyeris" :key="dd"
                :label="dd?.text" :val="dd.text" @update:model-value="(val) => {
                  if (val === 'Wong Baker Face Scale') store.form.keluhannyeri.skorNyeri = 0
                  store.hitungSkorNyeri('form')
                }" />

            </template>
          </div>
          <q-separator />
        </q-card-section>
        <q-card-section>
          <div v-if="store.form?.keluhannyeri?.kajianNyeri === 'Wong Baker Face Scale'"
            class="row items-center q-col-gutter-md">
            <div class="col-8">
              <q-slider v-model="store.form.keluhannyeri.skorNyeri" color="primary" thumb-color="primary"
                label-color="primary" label-text-color="yellow" markers :marker-labels="(val) => fnMarkerLabel"
                marker-labels-class="text-primary" label-always switch-label-side :min="0" :max="10"
                @update:model-value="(val) => store.setKeteranganSkornyeri(val, 'form')" style="width: 100%;" />
            </div>
            <div class="col-4">
              <div class="flex flex-center">
                <div class="">
                  <q-icon size="lg" color="teal" :name="iconNyeri" />
                </div>
                <div><em class="text-primary q-ml-sm">{{ store.form.keluhannyeri.ket }}</em></div>
              </div>
            </div>
          </div>
          <div v-else>
            <q-separator class="q-my-xs" />
            <template v-for="(val, key) in store.form.keluhannyeri?.form" :key="val">
              <div class="row q-col-gutter-md">
                <div class="col-3 text-weight-bold">
                  {{store.formNyeris?.find(x => x.kode === key)?.label}}
                </div>
                <div class="col-9">
                  <div class="flex q-gutter-sm items-center">
                    <q-radio dense size="sm" v-model="store.form.keluhannyeri.form[key]"
                      v-for="aa in store.formNyeris?.find(x => x.kode === key)?.values" :key="aa" :label="aa?.text"
                      :val="aa" @update:model-value="(val) => {
                        // store.form.ekspresiWajahKet = aa?.text
                        // console.log('aa',val);

                        store.hitungSkorNyeri('form')
                      }" />
                  </div>
                </div>
              </div>
              <q-separator class="q-my-sm" />
            </template>
            <q-card-section class="row items-center justify-between q-py-sm q-px-md text-primary text-bold">
              <div>SKOR NYERI : {{ store.form?.keluhannyeri?.skorNyeri }}</div>
              <div>{{ store.form?.keluhannyeri?.ket }}</div>
            </q-card-section>
          </div>
        </q-card-section>
      </q-card>

      <div class="skreening-gizi-dewasa q-mb-sm">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skreening Gizi</strong>
            </div>
            <q-separator />
          </q-card-section>

          <template v-for="(val, key) in store.form.skreeninggizi?.form" :key="val">
            <q-card-section class="row">
              <div class="col-9">
                {{store.formGizis?.find(x => x.kode === key)?.label}}
              </div>
              <div class="col-3 flex q-gutter-sm justify-end">
                <q-radio v-for="aa in store.formGizis?.find(x => x.kode === key)?.values" dense
                  v-model="store.form.skreeninggizi.form[key]" :val="aa" :label="aa?.text"
                  @update:model-value="hitungSkorGizi" :key="aa" />
              </div>
            </q-card-section>
            <q-separator />
          </template>
          <!-- <q-card-section class="">
            <div class="col-12 q-mt-xs">
              <div class="text-weight-bold">
                Skreening Gizi
              </div>
              <q-separator class="q-my-xs" />
              <div class="row items-center">
                <div class="col-8">
                  Apakah Ada Penurunan Berat badan yang tidak diinginkan selama 6 Bulan terakhir ?
                </div>
                <div class="col-4">
                  <q-option-group v-model="store.form.skreeninggizi" :options="optionSkreening" color="primary" inline
                    dense @update:model-value="lihatPerubahan" />
                </div>
              </div>
            </div>
            <div class="col-12 q-mt-xs">
              <q-separator class="q-my-xs" />
              <div class="row items-center">
                <div class="col-8">
                  Apakah Asupan Makan berkurang karena tidak nafsu makan ?
                </div>
                <div class="col-4">
                  <q-option-group v-model="store.form.asupanmakan" :options="optionAsupanMakan" color="primary" inline
                    dense @update:model-value="lihatPerubahan" />
                </div>
              </div>
            </div>
            <div class="col-12">
              <q-separator class="q-my-xs" />
              <div class="row items-center q-col-gutter-sm">
                <div class="col-2">
                  Kondisi Khusus :
                </div>
                <div class="col-8">
                  <q-input v-model="store.form.kondisikhusus" outlined dense standout="bg-yellow-3"
                    label="Kondisi Khusus" stack-label @update:model-value="lihatPerubahan" />
                </div>
                <div class="col-12">
                  <q-separator class="q-my-xs" />
                  <div class="flex">
                    Skor Skreening Gizi : <div class="q-mx-sm">
                      <b>{{ isNaN(store.form.skor) ? 0 : store.form.skor }}</b>
                    </div>
                    <div>
                      Keterangan : {{ store.keteranganSkorGizi(store.form.skor) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </q-card-section> -->
          <!-- <template v-for="(val, key) in store.form.skreeninggizi?.form" :key="val">
            <q-card-section class="row">
              <div class="col-9">
                {{store.formGizis?.find(x => x.kode === key)?.label}}
              </div>
              <div class="col-3 flex q-gutter-sm justify-end">
                <q-radio v-for="aa in store.formGizis?.find(x => x.kode === key)?.values" :key="aa" dense
                  v-model="store.form.skreeninggizi.form[key]" :val="aa" :label="aa?.text"
                  @update:model-value="hitungSkorGizi" />
              </div>
            </q-card-section>
            <q-separator />
          </template> -->

          <q-card-section class="row items-center justify-between q-py-md q-px-md text-primary text-bold">
            <div>SKOR GIZI : {{ isNaN(store.form?.skreeninggizi?.skor) ? 0 : store.form?.skreeninggizi?.skor }}</div>
            <div>{{ store.form?.skreeninggizi?.ket }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- DIALOG -->
    <DialogFormRiwayat v-model="store.openDialogFormRiwayat" :pasien="pasien" />
  </div>
</template>

<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useAnamnesisHemodialisaStore } from 'src/stores/simrs/hemodialisa/anamnesis'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const TableRiwayatKehamilan = defineAsyncComponent(() => import('./comp/TableRiwayatKehamilan.vue'))
const DialogFormRiwayat = defineAsyncComponent(() => import('./comp/DialogFormRiwayat.vue'))

const store = useAnamnesisHemodialisaStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  ulang: {
    type: Boolean,
    default: false
  }
})

const auth = useAplikasiStore()

// eslint-disable-next-line no-unused-vars
const gruping = computed(() => {
  const nakes = auth?.user?.pegawai?.kdgroupnakes
  const dokter = nakes === '1'
  const perawat = nakes === '2' || nakes === '3'

  let gruping = null
  if (dokter) gruping = props?.kasus?.medis
  else if (perawat) gruping = props?.kasus?.gruping

  // console.log('gruping', gruping, nakes, props.kasus)

  return gruping
})

const optionSkreening = ref([
  { label: 'Iya (2)', value: 2 },
  { label: 'Tidak (0)', value: 0 }
])
const optionAsupanMakan = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])
function lihatPerubahan () {
  store.hitungNilaiSkor()
}
const nakes = computed(() => {
  return auth?.user?.pegawai?.kdgroupnakes
})

const refInputKu = ref(null)
defineExpose({
  refInputKu
})

const iconNyeri = computed(() => {
  // const val = store?.form.skorNyeri
  const val = store?.form.keluhannyeri?.skorNyeri
  let icon = 'icon-my-emoticon-excited-outline'
  if (val < 2) {
    icon = 'icon-my-emoticon-excited-outline'
  }
  else if (val >= 2 && val < 4) {
    icon = 'icon-my-emoticon-outline'
  }
  else if (val >= 4 && val < 6) {
    icon = 'icon-my-emoticon-neutral-outline'
  }
  else if (val >= 6 && val < 8) {
    icon = 'icon-my-emoticon-confused-outline'
  }
  else if (val >= 8 && val < 10) {
    icon = 'icon-my-emoticon-angry-outline'
  }
  else if (val >= 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
})
const iconNyeriKebidanan = computed(() => {
  // const val = store?.form.skorNyeri
  const val = store?.formKebidanan.keluhannyeri?.skorNyeri
  let icon = 'icon-my-emoticon-excited-outline'
  if (val < 2) {
    icon = 'icon-my-emoticon-excited-outline'
  }
  else if (val >= 2 && val < 4) {
    icon = 'icon-my-emoticon-outline'
  }
  else if (val >= 4 && val < 6) {
    icon = 'icon-my-emoticon-neutral-outline'
  }
  else if (val >= 6 && val < 8) {
    icon = 'icon-my-emoticon-confused-outline'
  }
  else if (val >= 8 && val < 10) {
    icon = 'icon-my-emoticon-angry-outline'
  }
  else if (val >= 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
})

onMounted(() => {
  Promise.all([
    // store.getRiwayatKehamilan()

    // props?.pasien?.anamnesis?.length ? store.initReset(props?.pasien?.anamnesis[0]) : ''
  ])
})

// eslint-disable-next-line no-unused-vars
const hitungSkorGizi = () => {
  store.hitungSkorSgd()
}

// eslint-disable-next-line no-unused-vars
function filterFn (val, update, abort, arr) {
  const stringOptions = arr
  let k = arr
  if (val?.length < 1) {
    // eslint-disable-next-line dot-notation
    store['ketubans'] = k
  }
  update(() => {
    const needle = val.toLocaleLowerCase()
    k = stringOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
    // eslint-disable-next-line dot-notation
    store['ketubans'] = k
  })
}
</script>
