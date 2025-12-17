<template>
  <div class="q-pa-md">
    <div>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th class="text-left" :colspan="5">
              Tanggal : {{ tanggalsekarang }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-left">
            <td class="text-bold">
              Nama Penderita : {{ props?.pasien?.nama ?? '-' }}
            </td>
            <td class="text-bold">
              Kelamin : {{ props?.pasien?.kelamin ?? '-' }}
            </td>
            <td class="text-bold">
              Umur : {{ props?.pasien?.usia ?? '-' }}
            </td>
            <td class="text-bold">
              Kamar : {{ props?.pasien?.poli }}
            </td>
            <td class="text-bold">
              No. RM : {{ props?.pasien?.norm ?? '-' }}
            </td>
          </tr>
          <tr class="text-left text-bold">
            <td :colspan="3">
              Nama Dokter Ahli Bedah : {{ dokter }}
            </td>
            <td>
              Asisten Operator : {{ asisten }}
            </td>
            <td>
              Asisten Anastesi : {{ asisten2 }}
            </td>
          </tr>
          <tr class="text-left text-bold">
            <td :colspan="3">
              Nama Dokter Ahli Anastesi : {{ dokteranastesi }}
            </td>
            <td :colspan="2">
              Jenis Anastesi : {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs4 }}
            </td>
          </tr>
          <tr class="text-left text-bold">
            <td :colspan="5">
              Diagnosa Pre-Operatif : {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs5 }}
            </td>
          </tr>
          <tr class="text-left text-bold">
            <td :colspan="5">
              Diagnosa Post-Operatif : {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs6 }}
            </td>
          </tr>
          <tr class="text-left text-bold">
            <td :colspan="5">
              Tindakan Operasi : {{ props?.pasien?.kamaroperasi[0]?.mastertindakanoperasi?.rs2 }}
            </td>
          </tr>
          <tr class="text-left text-bold">
            <td :colspan="5">
              Jenis Operasi : {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs7 }}
            </td>
          </tr>
          <tr class="text-left text-bold">
            <td :colspan="3">
              Kelasifikasi Operasi : {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs8 }}
            </td>
            <td :colspan="2">
              Di Kirim Untuk Pemeriksaan P.A. : {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs9 }}
            </td>
          </tr>
          <tr class="text-left text-bold">
            <td :colspan="2">
              Tanggal Operasi : {{ formatTime(props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs10) }}
            </td>
            <td>
              Jam Mulai Operasi: {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs11 }}
            </td>
            <td>
              Jam Selesai Operasi: {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs12 }}
            </td>
            <td>
              Lama Operasi : {{ lamaoperasi }}
            </td>
          </tr>
          <tr class="text-left text-bold">
            <td :colspan="5">
              Catatan Komplikasi : {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs13 }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="q-mt-md">
        <div>
          LAPORAN OPERASI : {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs14 }}
        </div>
      </div>
      <div class="q-mt-xl">
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6 text-center">Operator</div>
        </div>
        <div class="row q-mt-xl">
          <div class="col-6"></div>
          <div class="col-6 text-center"> {{ props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs15 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar';
import { formatTime } from 'src/modules/formatter';
import { computed, h } from 'vue';

const tanggalsekarang = date.formatDate(Date.now(), 'DD MMMM YYYY')

const dokter = computed(() => {
  let dok = props?.pasien?.kamaroperasi?.map((item) => item.rs9)?.join('; ')
  let hasil = dok.split(";");
  const hasilx = hasil.filter(item => item !== '');

  console.log('hasil', hasilx)
  const dokter = []
  hasilx?.forEach(y => {
    let nama = props?.pegawai?.find(x => x?.kdpegsimrs === y)?.nama ?? null
    dokter.push(nama)
  });
  const hasilakhir = dokter.join(" & ");

  return hasilakhir
})

const lamaoperasi = computed(() => {
  let akhir = props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs12
  let mulai = props?.pasien?.kamaroperasi[0]?.laporanoperasi?.rs11

  const [jam1, menit1, detik1] = akhir.split(':').map(Number);
  const [jam2, menit2, detik2] = mulai.split(':').map(Number);

  const totalDetik1 = jam1 * 3600 + menit1 * 60 + detik1;
  const totalDetik2 = jam2 * 3600 + menit2 * 60 + detik2;

  let selisihDetik = totalDetik1 - totalDetik2;

  const jam = Math.floor(selisihDetik / 3600);
  selisihDetik %= 3600;
  const menit = Math.floor(selisihDetik / 60);
  const detik = selisihDetik % 60;

  return `${String(jam).padStart(2, '0')}:${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`
})

const dokteranastesi = computed(() => {
  let dok = props?.pasien?.kamaroperasi?.map((item) => item.rs12)?.join('; ')
  let hasil = dok.split(";");
  const hasilx = hasil.filter(item => item !== '');

  console.log('hasil', hasilx)
  const dokter = []
  hasilx?.forEach(y => {
    let nama = props?.pegawai?.find(x => x?.kdpegsimrs === y)?.nama ?? null
    dokter.push(nama)
  });
  const hasilakhir = dokter.join(" & ");

  return hasilakhir
})

const asisten = computed(() => {
  let dok = props?.pasien?.kamaroperasi?.map((item) => item.rs11)?.join('; ')
  let hasil = dok.split(";");
  const hasilx = hasil.filter(item => item !== '');

  console.log('hasil', hasilx)
  const dokter = []
  hasilx?.forEach(y => {
    let nama = props?.pegawai?.find(x => x?.kdpegsimrs === y)?.nama ?? null
    dokter.push(nama)
  });
  const hasilakhir = dokter.join(" & ");

  return hasilakhir
})

const asisten2 = computed(() => {
  let dok = props?.pasien?.kamaroperasi?.map((item) => item.rs13)?.join('; ')
  let hasil = dok.split(";");
  const hasilx = hasil.filter(item => item !== '');

  console.log('hasil', hasilx)
  const dokter = []
  hasilx?.forEach(y => {
    let nama = props?.pegawai?.find(x => x?.kdpegsimrs === y)?.nama ?? null
    dokter.push(nama)
  });
  const hasilakhir = dokter.join(" & ");

  return hasilakhir
})

const props = defineProps({
  judul: {
    type: String,
    default: null
  },
  pasien: {
    type: Object,
    default: null
  },
  pegawai: {
    type: Array,
    default: []
  }
})
</script>
