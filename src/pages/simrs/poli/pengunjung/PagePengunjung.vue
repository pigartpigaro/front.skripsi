<template>
  <q-page class="" :class="style.componentfull ? 'container-no-header' : 'container--q-header q-pa-xs'">
    <div class="header bg-primary text-white">
      <HeaderComp class="q-pa-xs" :tanggal="store.params.tgl" :search="store.params.q" :per-page="store.params.per_page"
        :full="style.componentfull" :custom="store.custom" @fullscreen="style.setComponentFull"
        @set-tanggal="(val) => store.setDate(val)" @set-search="store.setQ" @set-row="store.setPerPage"
        @refresh="store.getData" @set-periode="(val) => store.setPeriodik(val)" @filter="store.setFilters"
        @normal="store.notCustom" @set-poli="(val) => store.setPolis(val)" />
    </div>
    <div class="footer absolute-bottom text-white z-top">
      <!-- <FooterComp :items="store.items" /> -->
      <BottomComp v-if="store.meta !== null" :key="store.meta" :meta="store.meta" color="bg-dark"
        @go-to="store.setPage" />
    </div>
    <q-card flat no-shadow class="my-flex-1 scroll">
      <list-pengunjung :key="store.items" :items="store.items" :loading="store.loading || setting.loading"
        :loading-terima="store.loadingTerima" :loading-call="speech.isLoading" :loadingcasmix="store.loadingcasmix"
        @tindakan="bukaTindakan" @panggilan="panggil" @tidakdatang="tidakdatangs"
        @kirimkepenjaminan="kirimkepenjaminan" />
    </q-card>

    <FilterPage v-model="store.filters" @close="store.setFilters" @filter-data="store.filterData" />

    <page-tindakan :key="pasien" v-model="store.pageTindakan" :pasien="pasien" :loading-terima="store?.loadingTerima" />
    <!-- <CetakRekapBilling
      v-model="printRekap"
      :pasien="pasien"
      @tutup="actPrintRekap"
    /> -->
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { computed, onMounted, ref, watch } from 'vue'
import HeaderComp from './comp/HeaderComp.vue'
// import FooterComp from './comp/FooterComp.vue'
import FilterPage from './comp/FilterPage.vue'
import BottomComp from './comp/BottomComp.vue'
import ListPengunjung from './comp/ListPengunjung.vue'
// import PageTindakan from './comp/PageTindakan.vue'
import PageTindakan from '../tindakan/IndexPage.vue'

import { laravelEcho } from 'src/modules/newsockets'

// import CetakRekapBilling from 'src/pages/simrs/kasir/rajal/listkunjungan/comp/CetakRekapBilling.vue'
import { useQuasar } from 'quasar'
import { useSpeechStore } from 'src/stores/antrian/speech'
import { useSettingsAplikasi } from 'src/stores/simrs/settings'

const style = useStyledStore()
const speech = useSpeechStore()
const store = usePengunjungPoliStore()
const diagnosa = useLayananPoli()
const pasien = ref(null)
const indexVoices = ref(0)

const setting = useSettingsAplikasi()

const kdDisplay = computed(() => {
  const poli = setting.polis
  const kdpoli = store.params.kodepoli[0] ?? 'POL'

  const target = poli.filter(x => x.kodepoli === kdpoli)
  if (target?.length) {
    return target[0].displaykode
  }
  return null
})

// const printRekap = ref(false)

// const txt = ref('SEMUA')
// const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])

const $q = useQuasar()
onMounted(() => {
  // store.init()
  // setTimeout(() => settingsVoice(), 750)

  diagnosa.getDiagnosaDropdown()
  diagnosa.getTindakanDropdown()

  getListVoices().then((x) => {
    settingsVoice()
  })

  subscribedChannel()
  // console.log('setting', kdDisplay.value)
})

function getListVoices() {
  return new Promise(
    function (resolve, reject) {
      const synth = speech.synth
      let id = 0

      id = setInterval(() => {
        if (synth.getVoices()?.length !== 0) {
          speech.voiceList = synth.getVoices()
          resolve(synth.getVoices())
          clearInterval(id)
        }
      }, 10)
    }
  )
}

function settingsVoice() {
  const voices = speech.voiceList
  if (voices?.length) {
    const lang = voices?.map(x => {
      return {
        lang: x.lang,
        name: x.name
      }
    })
    console.log('daftar voice indonesia thok', lang.filter(x => x?.lang === 'id-ID'));

    const ind = lang.findIndex(x => x?.lang === 'id-ID' && x?.name?.includes('Google')) ?? 0
    console.log('indexVoice', ind);

    indexVoices.value = ind
  }

  // const synth = window.speechSynthesis
  speech.synth.onvoiceschanged = () => {
    speech.synth.setVoiceList(voices)
  }
  // console.log('voices', voices)
  // console.log('speech', speech)
  listenForSpeechEvents()
}

function listenForSpeechEvents() {
  speech.utterance.onstart = () => {
    console.log('start...')
    speech.isLoading = true
  }
  speech.utterance.onend = () => {
    console.log('end...')
    speech.isLoading = false
  }
}

function setSpeech(txt) {
  // console.log(speech.voiceList[indexVoices.value])
  const voice = speech.utterance
  voice.text = txt
  voice.voice = speech.voiceList[indexVoices.value]

  voice.volume = 1
  voice.pitch = 1
  voice.rate = 1

  return voice
}

function panggil(row) {
  // Log untuk debugging speech
  console.log('Speech panggilan dimulai:', {
    browser: navigator.userAgent,
    speechSupport: 'speechSynthesis' in window,
    voicesAvailable: speech.voiceList.length,
    selectedVoice: indexVoices.value,
    speechState: speech.synth.speaking ? 'speaking' : 'idle'
  })

  const nama = (row?.nama_panggil) ? (row?.nama_panggil)?.toLowerCase() : ''
  const unit = row?.panggil_antrian
  const noAntrean = row?.noantrian ? row.noantrian.toUpperCase() : ''
  // eslint-disable-next-line no-unused-vars
  const txt1 = 'pasien ? . ' + nama + '? ...Harap menujuu  ' + unit
  // eslint-disable-next-line no-unused-vars
  const txt2 = 'Nomor Antrian ... ' + noAntrean + '? ...Harap menujuu' + unit

  const txt3 = 'Nomor Antrian ... ' + noAntrean + '... nama!  ' + nama + '! ...Harap menujuu  ' + unit

  try {
    // speech.synth.speak(setSpeech(txt3))
    console.log('Speech berhasil dipanggil:')

    speakDynamic(noAntrean, nama, unit);
  } catch (error) {
    console.error('Error saat memanggil speech:', error)
  }

  // console.log(row)
  store.sendPanggil(row, `display${kdDisplay.value}`)
}

function speakDynamic(noAntrean, nama, unit) {
  const voiceList = speech?.voiceList[indexVoices.value];
  console.log('suorone sopo?', voiceList);
  console.log('index', indexVoices.value);

  // Bersihkan antrian speech yang mungkin masih ada
  speechSynthesis.cancel();

  // Gunakan satu utterance saja untuk menghindari masalah dengan multiple utterances
  const fullText = `Nomor Antrian ... ${noAntrean} ... Nama! ... ${nama} ... Harap menuju ... ${unit}`;
  const utterance = new SpeechSynthesisUtterance(fullText);
  utterance.voice = voiceList;
  utterance.volume = 1;
  utterance.pitch = 1.2;
  utterance.rate = 0.95;
  utterance.lang = 'id-ID';

  // Tambahkan event listener untuk debugging
  utterance.onstart = () => console.log('Speech mulai diputar');
  utterance.onend = () => console.log('Speech selesai diputar');
  utterance.onerror = (e) => console.error('Speech error:', e);

  // Coba dengan timeout kecil untuk mengatasi masalah timing
  setTimeout(() => {
    console.log('Mencoba memainkan speech...');
    speechSynthesis.speak(utterance);
  }, 100);

  // Alternatif: gunakan metode lama jika yang baru tidak berfungsi
  if (speech.synth && speech.utterance) {
    setTimeout(() => {
      console.log('Mencoba metode alternatif...');
      const altUtterance = setSpeech(fullText);
      speech.synth.speak(altUtterance);
    }, 200);
  }
}

function bukaTindakan(val) {
  // console.log('buka tindakan', val)
  if (val?.groups === '1') {
    if (!val?.sep) {
      $q.notify({
        type: 'negative',
        title: 'Peringatan',
        message: 'INFO WARNING <b/> MAAF, <em><b>Pasien Ini Belum terbit SEP</b></em>',
        html: true,
        timeout: 500
      })

      return
    }
  }
  pasien.value = val
  store.setTerima(val)
}

function tidakdatangs(val) {
  if (val?.groups === '1') {
    if (!val?.sep) {
      $q.notify({
        type: 'negative',
        title: 'Peringatan',
        message: 'INFO WARNING <b/> MAAF,<em><b>Pasien Ini Belum terbit SEP</b></em>',
        html: true,
        timeout: 1000
      })
      return
    }
  }
  store.settidakdatang(val)
}

function subscribedChannel() {
  if (kdDisplay.value) {

    const channel = laravelEcho.private('private.notif.display' + kdDisplay.value)
    channel.subscribed(() => {
      console.log(`subscribed private.notif.display${kdDisplay.value} channel !!!`)
    }).listen('.notif-message', (e) => {
      // console.log(`listen notif${kdDisplay.value}`, e)
    })
  }
}

// function actPrintRekap() {
//   printRekap.value = false
// }

function kirimkepenjaminan(val) {

  if (val?.satatus === 1) {
    $q.notify({
      type: 'negative',
      title: 'Peringatan',
      message: 'INFO WARNING <b/> MAAF,<em><b>Pasien Ini Masih Belum Selese Palayanan</b></em>',
      html: true,
      timeout: 1000
    })
  } else {
    store.kirimpenjaminan(val)
  }
  // $q.notify({
  //   type: 'negative',
  //   title: 'Peringatan',
  //   message: 'INFO WARNING <b/> MAAF,<em><b>Fitur Masih Dalam Proses Pengembangan</b></em>',
  //   html: true,
  //   timeout: 1000
  // })

  //   }
  // }
  // store.settidakdatang(val)
}

watch(() => kdDisplay.value, (obj, old) => {
  // console.log('new', obj)
  // console.log('old', old)
  subscribedChannel()
}, { deep: true })
</script>
