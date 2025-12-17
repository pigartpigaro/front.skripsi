<template>
  <div class="row q-col-gutter-xs items-center garis-bawah-double  q-pb-sm">
    <div class="col-1 ">
      <img src="~assets/images/logo-kota-grey.png" spinner-color="white" style="height: 2cm; max-width: 1.5cm" />
    </div>
    <div class="col-10 ">
      <div class="row justify-center">
        PEMERINTAH KOTA PROBOLINGGO
      </div>
      <div class="row justify-center ">
        DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
      </div>
      <div class="row justify-center text-bold" style="font-size: 17px">
        UOBK RSUD DOKTER MOHAMAD SALEH
      </div>
      <div class="row  justify-center">
        Jl. Mayjend Panjaitan No. 65 Telp. (0335) 433119,421118 Fax. (0335) 432702
      </div>
      <div class="row justify-center ">
        E-mail : rsudprob@probolinggokota.go.id
      </div>
      <div class="row justify-center ">
        PROBOLINGGO 67219
      </div>
    </div>
    <div class="col-1">
      <img src="~assets/logos/logo-rsud.png" spinner-color="white" style="height: 1.9cm; max-width: 1.6cm" />
    </div>
  </div>

  <div v-if="props?.jangantampil !== true">
    <div class="row justify-center text-bold">
      <span class="text-h5"> {{ props?.judul }} {{ props.kelas }}</span>
    </div>
    <div class="row q-mt-sm">
      <div class="col-2">Nama</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ pasien?.nama ?? pasien?.pasien }}</div>
      <div class="col-2">No. RM</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ pasien?.norm }}</div>
    </div>
    <div class="row">
      <div class="col-2">No. Reg</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ pasien?.noreg }}</div>
      <div class="col-2">Ruangan</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ pasien?.poli }}</div>
    </div>
    <div class="row">
      <div class="col-2">Umur</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ usia(pasien?.usia) }} Tahun</div>
      <div class="col-2">Jenis Kelamin</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ pasien?.kelamin }}</div>
    </div>
    <div class="row">
      <div class="col-2">Tanggal Masuk</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ dateFull(pasien?.tgl_kunjungan) }}</div>
      <div class="col-2">Tanggal Keluar</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ dateFull(pasien?.tglpulang) }}</div>
    </div>
    <div class="row garis-bawah-double">
      <div class="col-2">Sistem Bayar</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ pasien?.sistembayar }}</div>
      <div class="col-2">DPJP</div>
      <div class="col-1">:</div>
      <div class="col-3 text-bold">{{ pasien?.dokter }}</div>
    </div>
  </div>
</template>
<script setup>
import { dateFullFormat, dateFull } from 'src/modules/formatter';
const props = defineProps({
  judul: {
    type: String,
    default: null
  },
  pasien: {
    type: Object,
    default: null
  },
  jangantampil: {
    type: Boolean,
    default: true
  },
  kelas: {
    type: Object,
    default: null
  },
})

function usia(val) {
  const x = val.split(' ')
  return x[0]
}
</script>

<style lang="scss" scoped>
.garis-bawah-double {
  border-bottom: 4px solid rgba(0, 0, 0, 0.572);
  border-bottom-style: double;
}
</style>
