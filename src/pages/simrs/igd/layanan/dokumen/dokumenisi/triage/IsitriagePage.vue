<template>
  <div v-if="loadingaja" class="column full-height flex-center">
    <div class="text-white">
      Harap Tunggu .....
    </div>
    <div class="text-white">
      Sinkron Data Ke DATABASE
    </div>
  </div>
  <div v-if="pasien?.triage?.length <= 0" class="column full-height flex-center">
    <div class="text-white">
      Belum Ada data tersimpan
    </div>
  </div>
  <div v-else class="full-height">
    <div v-for="(item, n) in lists" :key="n" class="list-move full-height">
      <table class="q-mt-sm">
        <tr>
          <td>TANGGAL TRIASE</td>
          <td>:</td>
          <td>{{ dateFullFormat(item?.tanggal) }}</td>
          <td>JAM TRIASE</td>
          <td>:</td>
          <td>{{ tgltriage(item?.tanggal) }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-center">DOA</td>
          <td colspan="3" class="text-center">SECONDARY SURVEI</td>
        </tr>
        <tr>
          <td colspan="3" rowspan="5" valign="top">Tanda Kehidupan:</td>
          <td colspan="2" class="text-center">Tanda Tanda Vital</td>
          <td colspan="1" class="text-center">SKOR</td>
        </tr>
        <tr>
          <td colspan="1">Nadi : </td>
          <td colspan="1" class="text-center">{{ item?.nadi }} x/mnt</td>
          <td colspan="1" class="text-right">{{ item?.scorenadi }}</td>
        </tr>
        <tr>
          <td colspan="1">Pernapasan : </td>
          <td colspan="1" class="text-center">{{ item?.pernapasanx }} x/mnt</td>
          <td colspan="1" class="text-right">{{ item?.scorepernapasanx }}</td>
        </tr>
        <tr>
          <td colspan="1">Sistole : </td>
          <td colspan="1" class="text-center">{{ item?.sistole }} mmHg</td>
          <td colspan="1" class="text-right">{{ item?.scoresistole }}</td>
        </tr>
        <tr>
          <td colspan="1">Diastole : </td>
          <td colspan="1" class="text-center">{{ item?.diastole }} mmHg</td>
          <td colspan="1" class="text-right">{{ item?.scorediastole }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-center">PRIMARY SURVEI </td>
          <td colspan="1">Suhu : </td>
          <td colspan="1" class="text-center">{{ item?.suhu }}&deg; C</td>
          <td colspan="1" class="text-right">{{ item?.scoresuhu }}</td>
        </tr>
        <tr>
          <td colspan="3" rowspan="2" valign="top">Jalan Napas : {{ item?.jalannafas }}</td>
          <td colspan="1">SpO2 : </td>
          <td colspan="1" class="text-center">{{ item?.spo2 }} %</td>
          <td colspan="1" class="text-right">{{ item?.scorespo2 }}</td>
        </tr>
        <tr>
          <td colspan="1">Kesadaran : </td>
          <td colspan="1" class="text-center">{{ item?.kesadaran }} x/mnt</td>
          <td colspan="1" class="text-right">{{ item?.scorekesadaran }}</td>
        </tr>
        <tr>
          <td colspan="3" rowspan="2" valign="top">Pernafasan : {{ item?.pernapasan }}</td>
          <td colspan="1">Eye/Verbal/Motorik : </td>
          <td colspan="1" class="text-center">{{ item?.eye }} , {{ item?.verbal }} , {{ item?.motorik }}
          </td>
          <td colspan="1" class="text-right">-</td>
        </tr>
        <tr>
          <td colspan="1">Nyeri : </td>
          <td colspan="1" class="text-center">{{ item?.nyeri ?? '-' }} x/mnt</td>
          <td colspan="1" class="text-right">{{ item?.scorenyeri }}</td>
        </tr>
        <tr>
          <td colspan="3" rowspan="2" valign="top">Sirkulasi : {{ item?.sirkulasi }}</td>
          <td colspan="1">Lochea : </td>
          <td colspan="1" class="text-center">{{ item?.lochea ?? '-' }} x/mnt</td>
          <td colspan="1" class="text-right">{{ item?.scorelochea }}</td>
        </tr>
        <tr>
          <td colspan="1">Protein Urine : </td>
          <td colspan="1" class="text-center">{{ item?.proteinurin ?? '-' }} x/mnt</td>
          <td colspan="1" class="text-right">{{ item?.scoreproteinurin }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-center">Disability </td>
          <td colspan="2" class="text-center">Jumlah</td>
          <td colspan="2" class="text-right">{{ item?.totalscore }}</td>
        </tr>
        <tr>
          <td colspan="2" rowspan="2" valign="top">BB : {{ item?.bb }} Kg</td>
          <td>Riwayat Alergi : </td>
          <td> {{ props.pasien?.anamnesis?.riwayatalergi ?? '-' }}</td>
          <td rowspan="4" class="text-center text-h7">KATEGORI TRIASE </td>
          <td rowspan="4" class="text-center text-bold text-h5"> {{ item?.kategoritriage }}</td>
        </tr>
        <tr>
          <td rowspan="1">Keterangan Alergi :</td>
          <td rowspan="1">{{ props.pasien?.anamnesis?.keteranganalergi ?? '-' }}</td>
        </tr>
        <tr>
          <td colspan="2" rowspan="1">TB : {{ item?.tb }} Cm</td>
          <td rowspan="2">Gangguan Perilaku :</td>
          <td rowspan="2">{{ item?.gangguanperilaku ?? '-' }}</td>
        </tr>
        <tr>
          <td colspan="2">Hamil : {{ hamil(item?.flaghamil) }}</td>
        </tr>
        <tr>
          <td colspan="2">HPHT : {{ item?.haid ?? '-' }}</td>
          <td colspan="4" rowspan="4" valign="top">Anamnesa : {{ props.pasien?.anamnesis[0].rs4 ?? '-' }}</td>
        </tr>
        <tr>
          <td colspan="2">G : {{ item?.gravida ?? '-' }}</td>
        </tr>
        <tr>
          <td colspan="2">P : {{ item?.partus ?? '-' }}</td>
        </tr>
        <tr>
          <td colspan="2">A : {{ item?.abortus ?? '-' }}</td>
        </tr>
        <tr>
          <td colspan="6">Jam Serah Terima : {{ item?.tanggal }}</td>
        </tr>
      </table>
      <div class="row items-center no-wrap q-mt-xl">
        <div class="col-6 text-right" />
        <div class="col-6 text-weight-bold text-center">
          Probolinggo, {{ date.formatDate(Date.now(), 'DD MMMM YYYY') }}
        </div>
      </div>
      <div class="row items-center no-wrap">
        <div class="col-6 text-right" />
        <div class="col-6 text-weight-bold text-center">
          Dokter
        </div>
      </div>
      <div class="row items-center no-wrap q-mt-lg">
        <div class="col-6 text-right" />
        <div class="col-6 text-weight-bold text-center">
          {{ pasien?.dokter }}
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { date } from 'quasar';
import { dateFullFormat } from 'src/modules/formatter';
import { computed } from 'vue';

const loadingaja = false
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const lists = computed(() => {
  const arr = props.pasien?.triage
  return arr?.sort((a, b) => { return b.id - a.id })
})

function tgltriage(val) {
  const x = val.split(' ')
  console.log('val', x)
  return x[1]
}

function hamil(val) {
  if (val === '0') {
    return 'Tidak'
  } else {
    return 'Ya'
  }
}
</script>
