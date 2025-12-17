<template>
  <div v-if="!store.items && !store.loadingsep">
    <app-no-data />
  </div>
  <div v-else-if="store.loadingsep">
    <app-loading />
  </div>
  <div v-else-if="store.items && !store.loadingsep" class="q-pa-md" style="max-width: 100%">
    <div class="row items-center">
      <div class="col-6">
        <img src="../../../../../assets/logos/logobpjs.svg" width="200">
      </div>
      <div class="col-6 text-bold text-h7">
        <div class="text-center">SURAT ELEGIBILITAS PESERTA</div>
        <div class="text-center">RSUD MOH SALEH</div>
      </div>
    </div>
    <br>
    <div class="row q-mt-sm">
      <div class="col-12">
        <div class="row q-mb-xs">
          <div class="col-2">No. SEP</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.noSep }}</div>
          <div class="col-2">Prolanis PRB</div>
          <div class="col-1">:</div>
          <div class="col-3"> - </div>
        </div>
        <div class="row">
          <div class="col-2">Tgl. SEP</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ dateFullFormat(store.items?.tglSep) }}</div>
          <div class="col-2"></div>
          <div class="col-1"></div>
          <div class="col-3"></div>
        </div>
        <div class="row">
          <div class="col-2">No. Kartu</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.peserta?.noKartu }}</div>
          <div class="col-2">Peserta</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.peserta?.jnsPeserta }}</div>
        </div>
        <div class="row">
          <div class="col-2">Nama Peserta</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.peserta?.nama }}</div>
          <div class="col-2"></div>
          <div class="col-1"></div>
          <div class="col-3"></div>
        </div>
        <div class="row">
          <div class="col-2">Tgl Lahir</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.peserta?.tglLahir }}</div>
          <div class="col-2">COB</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.cob === '0' ? 'Tidak' : 'Ya' }}</div>
        </div>
        <div class="row">
          <div class="col-2">No. Telepon</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.itemsx?.peserta?.mr?.noTelepon }}</div>
          <div class="col-2">Jns Rawat</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.jnsPelayanan }}</div>
        </div>
        <div class="row">
          <div class="col-2">Sub/Spesialis</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.poli }}</div>
          <div class="col-2">Jns Kunjungan</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.tujuanKunj?.nama }}</div>
        </div>
        <div class="row">
          <div class="col-2">Dokter</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.dpjp?.nmDPJP }}</div>
          <div class="col-2">Kelas Hak</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.peserta?.hakKelas }}</div>
        </div>
        <div class="row">
          <div class="col-2">Asal Faskes Tk. I</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.itemsx?.peserta?.provUmum?.nmProvider }}</div>
          <div class="col-2">Kelas Rawat</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.klsRawat?.klsRawatHak }}</div>
        </div>
        <div class="row">
          <div class="col-2">Diagnosa Awal</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.diagnosa }}</div>
          <div class="col-2">Penjamin</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.penjamin }}</div>
        </div>
        <div class="row">
          <div class="col-2">Catatan</div>
          <div class="col-1">:</div>
          <div class="col-3">{{ store.items?.catatan }}</div>
          <div class="col-2"></div>
          <div class="col-1"></div>
          <div class="col-3"></div>
        </div>
        <br>
        <br>
        <div class="row">
          <div class="col-6" style="font-size: x-small;">*Saya Menyetujui BPJS KEsehatan menggunakan Informasi Medis
            Pasien jika diperlukan
            <br>
            *SEP bukan sebagai bukti penjaminan peserta
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">Pasien/Keluarga Pasien</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6">----------------------</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter';
import { useSepBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/sep';

const store = useSepBpjsStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

store.carisep(props?.pasien)

</script>
