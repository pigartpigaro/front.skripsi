<template>
  <q-dialog persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down" @show="onShow">
    <q-card class="fit bg-grey-3">
      <q-form class="column full-height" @submit="simpan">

        <div class="col-auto bg-primary text-white">
          <q-bar class="">
            <div>FORM Nurse Note</div>
            <q-space />


            <q-btn dense flat icon="icon-mat-close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
        </div>

        <!-- <div class="col-auto bg-white">
          <q-card-section class="row justify-between">
            <div class="q-gutter-md">
              <q-btn rounded outline color="orange" icon="icon-mat-arrow_back" v-close-popup>
                <span class="text-orange-9 q-ml-sm">Kembali </span>
              </q-btn>
              <q-btn rounded outline color="primary" @click="store.dialogPreview = true">
                <span class="text-primary q-ml-sm">Lihat Eresep </span>
              </q-btn>
            </div>
          </q-card-section>
        </div> -->

        <div class="col full-height bg-grey-4">
          <!-- <card-column :pasien="pasien" :kasus="kasus" /> -->
          <form-tambah :pasien="pasien" :kasus="kasus" :nakes="nakes" />
        </div>

        <div class="col-auto bg-primary q-pa-md">
          <div class="row justify-between">
            <q-btn rounded outline color="orange" icon="icon-mat-arrow_back" v-close-popup>
              <span class="text-orange q-ml-sm">Kembali </span>
            </q-btn>
            <q-btn :loading="store.loadingSave" :disabled="store.loadingSave" type="submit" rounded outline
              color="white" icon="icon-mat-save">
              <span class=" q-ml-sm">Simpan Catatan </span>
            </q-btn>
          </div>
        </div>
      </q-form>



      <dialog-kanan-resep :pasien="pasien" :kasus="kasus" :nakes="nakes" :type="store.typePemakaianObat" />

    </q-card>




    <!-- dialog dynamic -->
    <!-- <dialog-preview v-model="store.dialogPreview" :pasien="pasien" :content="contentPreview" @on-selected-reseps="(val) => {
      store.form.reseps = val
    }" /> -->



  </q-dialog>
</template>

<script setup>
import { getNewLine } from 'src/modules/formatter';
import { useNurseNoteRanapStore } from 'src/stores/simrs/ranap/nursenote';
import { defineAsyncComponent, ref } from 'vue';

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})

const CardColumn = defineAsyncComponent(() => import('./CardColumn.vue'))
const FormTambah = defineAsyncComponent(() => import('./FormTambah.vue'))
const DialogKananResep = defineAsyncComponent(() => import('./DialogKananResep.vue'))
const AutocompleteInputTwo = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/AutocompleteInputTwo.vue'))
const DialogPreview = defineAsyncComponent(() => import('./DialogPreview.vue'))

const store = useNurseNoteRanapStore()

const contentPreview = ref(null)

const simpan = () => {
  // console.log('simpan');
  store.simpanData(props.pasien)

}

const onShow = () => {
  previewDiagKeperawatan()
  store.initForm(null, previewDiagKeperawatan())
}

const previewDiagKeperawatan = () => {

  const dxkep = props?.pasien?.diagnosakeperawatan || []
  const justIntervensi = dxkep?.map(x => x?.intervensi)?.flat() || []
  const intervensis = justIntervensi?.filter(x => x?.masterintervensi?.group !== 'plann').map(x => {
    return {
      group: x?.masterintervensi?.group,
      nama: x?.masterintervensi?.nama,
      kt_kerja: ubahKataBendaKeKerja(x?.masterintervensi?.nama)
    }
  }) || []
  // console.log('props', dxkep);
  // console.log('intervensi', justIntervensi);
  // console.log('master', intervensis);
  const jdText = intervensis?.map(x => '- ' + x?.kt_kerja)?.join('\n') || ''
  return jdText

}

function ubahKataBendaKeKerja(kalimat) {

  const kata = kalimat.toLowerCase().split(" ")[0];
  let hsl = "";
  console.log('kata', kata);

  // Daftar aturan awalan berdasarkan huruf awal kata
  const vokal = ["a", "e", "i", "o", "u"];
  const aturan = [
    { prefix: "ber", suffix: "kan", gantiAwalan: "me" }, // berikan -> memberikan
    { prefix: "", gantiAwalan: "meng", startsWith: vokal }, // ambil -> mengambil
    { prefix: "", gantiAwalan: "meng", startsWith: ["h", "k"] }, // hapus -> menghapus
    { prefix: "", gantiAwalan: "men", startsWith: ["t", "d", "c", "j", "z"] }, // tulis -> menulis
    { prefix: "", gantiAwalan: "mem", startsWith: ["b", "p", "f", "v"] }, // pakai -> memakai
    { prefix: "", gantiAwalan: "meny", startsWith: ["s"] }, // sapu -> menyapu
  ];
  let kataDasar = kata.toLowerCase().trim(); // Normalisasi teks menjadi huruf kecil semua

  // Cek aturan awalan "ber-...-kan"
  if (kataDasar.startsWith("ber") && kataDasar.endsWith("kan")) {
    hsl = "me" + kataDasar.slice(3); // Hapus "ber" dan ganti dengan "me"
  }

  // Cek aturan berdasarkan huruf pertama
  for (let rule of aturan) {
    if (rule.startsWith && rule.startsWith.includes(kataDasar[0])) {
      hsl = rule.gantiAwalan + kataDasar;
    }
  }

  // Jika tidak termasuk aturan khusus, kembalikan kata asal
  // hsl = kataDasar;

  let kataArray = kalimat.split(" ");
  if (kataArray[0].toLowerCase()) {
    kataArray[0] = hsl === "" ? kataArray[0] : hsl; // Ganti kata pertama dengan kataBaru
  }
  return kataArray.join(" ");
}

</script>
