<template>
  <div class="q-pa-md" style="max-width: 100%">
    <div class="row items-center">
      <div class="col-4">
        <img src="../../../../../assets/logos/logobpjs.svg" width="200">
      </div>
      <div class="col-4 text-bold text-h7">
        <div class="text-center">SURAT RENCANA KONTROL</div>
        <div class="text-center">RSUD MOH SALEH</div>
      </div>
      <div class="col-4 text-center text-bold">
        {{ store?.itemsSuket?.result?.noSuratKontrol }}
      </div>
    </div>
    <br>
    <div class="row q-mt-sm">
      <div class="col-12">
        <div class="row q-mb-xs">
          <div class="col-2">Kepada Yth</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store?.itemsSuket?.result?.namaDokter }}</div>
        </div>
        <br>
        Mohon Pemeriksaan dan Penanganan lebih lanjut :
        <div class="row">
          <div class="col-5">Poli Tujuan</div>
          <div class="col-1">:</div>
          <div class="col-6">{{ store.itemsSuket?.result?.namaPoliTujuan }}</div>
        </div>
        <div class="row">
          <div class="col-5">No. Kartu</div>
          <div class="col-1">:</div>
          <div class="col-6">{{ store.itemsSuket?.result?.sep?.peserta?.noKartu ?? '-' }}</div>
        </div>
        <div class="row">
          <div class="col-5">No. RM</div>
          <div class="col-1">:</div>
          <div class="col-6">{{ pasien?.norm }}</div>
        </div>
        <div class="row">
          <div class="col-5">Nama Peserta</div>
          <div class="col-1">:</div>
          <div class="col-6">{{ store.itemsSuket?.result?.sep?.peserta?.nama ?? '-' }}</div>
        </div>
        <div class="row">
          <div class="col-5">Tgl Lahir</div>
          <div class="col-1">:</div>
          <div class="col-6">{{ humanDate(store.itemsSuket?.result?.sep?.peserta?.tglLahir ?? '-') }}</div>
        </div>
        <div class="row">
          <div class="col-5">Diagnosa</div>
          <div class="col-1">:</div>
          <div class="col-6">{{ store.itemsSuket?.result?.sep?.diagnosa }}</div>
        </div>
        <div class="row">
          <div class="col-5">Rencana Kontrol</div>
          <div class="col-1">:</div>
          <div class="col-6">{{ humanDate(store.itemsSuket?.result?.tglRencanaKontrol ?? '-') }}</div>
        </div>
        <div class="row">
          <div class="col-12">Demikian Atas Bantuanya, diucapkan banyak terimakasih.</div>
        </div>
        <br>
        <br>
        <div class="row text-center">
          <div class="col-6"></div>
          <div class="col-6">Mengetauhi DPJP</div>
        </div>
        <br>
        <br>
        <div class="row text-center">
          <div class="col-6"></div>
          <div class="col-6 ">{{ pasien?.bpjssuratkontrol?.namaDokter }}</div>
        </div>
        <div class="row">
          <div class="col-6" style="font-size: x-small;">*Tgl Entry {{ humanDate(pasien?.bpjssuratkontrol?.created_at)
          }}
            <br>
            *Tgl Cetak {{ humanDate(Date.now()) }} dari RS
          </div>
          <!-- <div class="col-6">
            <div class="row">
              <div class="col-6">Mengetauhi DPJP</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { humanDate } from 'src/modules/formatter';
import { useSuratKontrolPoliStore } from 'src/stores/simrs/pelayanan/poli/suratkontrol';

const store = useSuratKontrolPoliStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})



</script>
