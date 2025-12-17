<template>
  <div class="q-pa-md">
    <div v-for="(item, i) in props?.pasien?.planning" :key="i">
      <div class="row">
        <div class="col-5">
          Kepada Yth
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-6">
          {{ item?.masterpoli?.rs2 }}
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-12">
          Mohon Pemeriksaan dan Penanganan lebih lanjut :
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          No Kartu
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-6">
          {{ props?.pasien?.noka }}
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          No RM
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-6">
          {{ props?.pasien?.norm }}
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          Nama Peserta
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-6">
          {{ props?.pasien?.nama }}
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          Tgl Lahir
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-6">
          {{ props?.pasien?.tgllahir }}
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          Jenis Kelamin
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-6">
          {{ props?.pasien?.kelamin }}
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          Diagnosa
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-6">
          {{ props?.pasien?.memodiagnosa ?? '-' }}
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          Tanggal Rencana Konsultasi Internal
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-6">
          {{ item?.rekomdpjp?.tglKontrol }}
        </div>
        <div class="row">
          <div class="col-12">
            Demikian atas bantuaannya, diucapkan banyak terimakasih.
          </div>
        </div>
      </div>
      <div class="row items-center no-wrap">
        <div class="col-6 text-right" />
        <div class="col-6 text-weight-bold text-center">
          <div class="column flex-center">
            <div style="width: 100px;">
              <vue-qrcode :value="qrUrl" tag="svg" :options="{
                errorCorrectionLevel: 'Q',
                color: {
                  dark: '#000000',
                  light: '#ffffff',
                },
                margin: 0
              }" />
            </div>
          </div>
        </div>
      </div>
      <div class="row items-center no-wrap q-mt-lg">
        <div class="col-6 text-center"></div>
        <div class="col-6 text-weight-bold text-center">
          {{ pasien.dokter }}
        </div>
      </div>
      <q-separator class="q-my-md" />
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
