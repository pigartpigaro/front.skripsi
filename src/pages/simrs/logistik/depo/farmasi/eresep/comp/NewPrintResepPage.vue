<template>
  <q-dialog id="endas" maximized @show="onShow">
    <div class="bg-white batang">
      <div id="printGueeee" class="column items-center bg-white page-x f-12">
        <div class="col no-wrap garis2 text-center">
          <div class="row no-wrap justify-center">
            <div class="q-mr-sm" style="min-width: 1cm;">
              <q-img src="~assets/logos/logo-rsud.png" spinner-color="white" style="height: 0.9cm; max-width: 0.9cm" />
            </div>
            <div class="">
              <div class="f-12">
                Instalasi Farmasi
              </div>
              <div class="">
                RSUD dr.Moh Saleh
              </div>
              <div class="f-10">
                (0335) 433478,433119,421118
              </div>
              <div class="f-10 q-mb-xs">
                Fax. (0335) 432702
              </div>
            </div>

            <div class="q-ml-sm text-right">
              <span class="text-weight-bolder f-26">{{ item?.nomor }}</span>
            </div>
          </div>
        </div>
        <div class="garis" />
        <div class="garis" />
        <div class=" q-mt-xs ">
          <span class="text-weight-bolder f-14">{{ item?.noresep }}</span> ({{ item?.sistembayar?.rs2 }}) / {{
            dateFull(item?.tgl_kirim) }}
        </div>
        <div class="f-12">
          {{ item?.norm }} - {{ item?.datapasien?.noka ?? 'tidak ada no BPJs' }} - {{ item?.datapasien?.nama }}
        </div>
        <div class="f-12">
          {{ item?.sep?.rs8 ?? '-' }}
        </div>
        <div class="text-italic f-10">
          {{ item?.datapasien?.usia }}
        </div>
        <div class="text-italic f-10">
          {{ item?.datapasien?.alamat }}
        </div>
        <div class="row ">
          <div class="col-shrink q-mr-xs">
            {{ item?.dokter?.nama }}
          </div>
          <div v-if="item?.poli" class="col-shrink ">
            - {{ item?.poli?.rs2 }}
          </div>
          <div v-if="item?.ruanganranap" class="col-shrink ">
            - {{ item?.ruanganranap?.rs2 }}
          </div>
          <div v-if="item?.kunjunganranap" class="col-shrink">
            <div v-if="!item?.kunjunganranap?.titipan">
              - {{ item?.kunjunganranap?.rs6 }}
            </div>
            <div v-else class="q-ml-xs">
              Dititipkan Di {{ item?.kunjunganranap?.ruangtitipan?.rs2 }} {{ item?.kunjunganranap?.rs6 }}
            </div>
          </div>
        </div>

        <div v-if="item?.diagnosaigd" class="row q-mb-xs">
          <div class="col-shrink q-mr-xs">
            diagnosa IGD :
          </div>
          <div class="col-grow">
            {{ item?.diagnosaigd }}
          </div>
        </div>
        <div v-if="item?.diagnosa" class="row q-mb-xs">
          <div class="col-shrink q-mr-xs">
            diagnosa :
          </div>
          <div class="col-grow">
            {{ item?.diagnosa }}
          </div>
        </div>
        <div class="garis q-mt-xs" />
        <div class="garis" />
        <div v-if="loading"> <app-loading /> </div>
        <div v-else-if="!loading && racikan?.length == 0 && nonRacikan?.length == 0"> <app-no-data /> </div>
        <div v-else>
          <div v-for="(rinc, i) in nonRacikan" :key="i">
            <div class="row justify-between" :class="rinc?.keterangan_bypass ? '' : 'q-mb-xs'">
              <div class="col-shrink">
                {{ i + 1 }}
              </div>
              <div class="col-5 ">
                {{ rinc?.mobat?.nama_obat }}
              </div>
              <div class="col-2">
                <i>{{ rinc?.aturan }} </i>
              </div>
              <div class="col-2">
                <i>{{ rinc?.jumlah }} {{ rinc?.mobat?.satuan_k }}</i>
              </div>
              <div class="col-2 text-right">
                <i>{{ formatDouble(rinc?.harga, 2) }}</i>
              </div>
            </div>
            <div v-if="rinc?.keterangan !== '-' && rinc?.keterangan !== ''" class="row q-mb-xs q-ml-sm">
              Ket. : {{ rinc?.keterangan }}
            </div>
            <div v-if="rinc?.keterangan_bypass" class="row q-mb-xs q-ml-sm">
              Ket. bypass : {{ rinc?.keterangan_bypass }}
            </div>
          </div>
        </div>
        <div v-for="(lirac, j) in racikan" :key="j" class="full-width q-mb-xs">
          <div class="row items-center justify-between ">
            <div class="col-shrink ">
              {{ nonRacikan?.length + j + 1 }}
            </div>
            <div class="col-5 ">
              {{ lirac?.namaracikan }}
            </div>
            <div class="col-2 ">
              <i>{{ lirac?.aturan }} </i>
            </div>
            <div class="col-2 ">
              <i>{{ lirac?.jumlahdibutuhkan }} {{ lirac?.satuan_racik }}</i>
            </div>
            <div class="col-2 text-right">
              <i>{{ formatDouble(lirac?.harga, 2) }}</i>
            </div>
          </div>
          <div v-for="(rac, n) in lirac?.rincian" :key="n">
            <div class="row q-ml-lg f-12 items-end">
              <div>* <i>{{ rac?.mobat?.nama_obat }} - <span v-if="parseInt(lirac?.flag) <= 2" class="">(rsp : {{
                rac?.jumlahresep }}) - </span> <span class="">{{ rac?.jumlah }} ({{ rac?.mobat?.satuan_k
                    }})</span></i></div>
            </div>
            <div v-if="rac?.keterangan_bypass" class="row q-ml-xl items-end q-mb-xs">
              <div>Ket. bypass : {{ rac?.keterangan_bypass }} </div>
            </div>
          </div>
          <!-- </div> -->
          <q-separator class="q-ml-lg q-my-xs" />
        </div>

        <div class="garis q-mt-xs" />
        <div class="garis" />
        <div class="row justify-between  text-weight-bold">
          <div>Subtotal</div>
          <div>{{ formatDouble(subtotal, 2) }}</div>
        </div>
        <div class="garis q-mt-xs" />
        <div class="garis" />
        <div class="row justify-between q-my-sm">
          <div class="ttd-pasien">
            <div>Penerima Resep</div>
          </div>
          <div class="ttd-petugas">
            <div>{{ dateFullFormat(new Date()) }} : {{ formatJam(new Date()) }}</div>
            <div>
              <vue-qrcode :value="qrUrl" tag="svg" :options="{
                errorCorrectionLevel: 'Q',
                color: {
                  dark: '#000000',
                  light: '#ffffff',
                },
                margin: 2
              }" />
            </div>
            <div class="text-center">
              Petugas RS
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { dateFull, dateFullFormat, formatDouble, formatJam } from 'src/modules/formatter'
import { computed, ref } from 'vue'

const emits = defineEmits(['close'])
const props = defineProps({
  item: { type: Object, default: () => { } }
})


function onShow () {
  console.log('show', props.item)
  getResep()
}
const racikan = ref([])
const nonRacikan = ref([])

const loading = ref(false)
const subtotal = ref(0)

function hitungHarga (jumlah, hargajual, r = 0) {
  return (parseFloat(jumlah) * parseFloat(hargajual)) + parseFloat(r || 0)
}
async function getResep () {
  loading.value = true
  racikan.value = []
  nonRacikan.value = []
  subtotal.value = 0
  const param = { params: { noresep: props.item?.noresep } }
  try {
    const resp = await api.get('v1/simrs/farmasinew/depo/get-for-print', param)
    if (resp?.status == 200) {
      const data = resp?.data?.data
      if (data?.rincian?.length) {
        nonRacikan.value = structuredClone(data?.rincian)
        console.log('ada rincian', nonRacikan.value)
      } else {
        if (parseInt(data?.flag) < 3) {
          if (data?.permintaanresep?.length) {
            nonRacikan.value = structuredClone(data?.permintaanresep)
            console.log('ada permintaan', nonRacikan.value)
          } else {
            nonRacikan.value = structuredClone(data?.asalpermintaanresep)
            console.log('else', nonRacikan.value)
          }
        }
      }
      if (data?.rincianracik?.length) {
        const racik = structuredClone(data?.rincianracik)
        racik?.forEach(r => {
          r.sub = hitungHarga(r.jumlah, r.harga_jual)

        })
        const allRacik = racik?.map(r => r?.namaracikan)
        const namaRacik = [...new Set(allRacik)]
        if (namaRacik?.length > 0) {
          namaRacik?.forEach(nama => {
            const dataRacik = racik.filter(r => r?.namaracikan == nama)
            const satudata = racik.find(r => r?.namaracikan == nama)
            const permintaan = data?.permintaanracikan.find(r => r?.namaracikan == nama) ?? data?.asalpermintaanracikan.find(r => r?.namaracikan == nama)
            racikan.value.push({
              namaracikan: satudata?.namaracikan,
              jumlahdibutuhkan: satudata?.jumlahdibutuhkan,
              satuan_racik: satudata?.satuan_racik,
              aturan: permintaan?.aturan,
              nilai_r: satudata?.nilai_r,
              rincian: dataRacik
            })
          })
        }
        console.log('ada rincian rac', data?.rincianracik)
      } else {
        if (parseInt(data?.flag) < 3) {
          if (data?.permintaanracikan?.length) {
            const racik = structuredClone(data?.permintaanracikan)
            racik?.forEach(r => {
              r.sub = hitungHarga(r.jumlah, r.harga_jual)
            })
            const allRacik = racik?.map(r => r?.namaracikan)
            const namaRacik = [...new Set(allRacik)]
            if (namaRacik?.length > 0) {
              namaRacik?.forEach(nama => {
                const dataRacik = racik.filter(r => r?.namaracikan == nama)
                const satudata = racik.find(r => r?.namaracikan == nama)
                const permintaan = data?.permintaanracikan.find(r => r?.namaracikan == nama) ?? data?.asalpermintaanracikan.find(r => r?.namaracikan == nama)
                racikan.value.push({
                  namaracikan: satudata?.namaracikan,
                  jumlahdibutuhkan: satudata?.jumlahdibutuhkan,
                  satuan_racik: satudata?.satuan_racik,
                  nilai_r: satudata?.r,
                  aturan: permintaan?.aturan,
                  rincian: dataRacik
                })
              })
            }
            console.log('ada permintaan rac', data?.permintaanracikan)
          } else {
            const racik = structuredClone(data?.asalpermintaanracikan)
            racik?.forEach(r => {
              r.sub = hitungHarga(r.jumlah, r.harga_jual)
            })
            const allRacik = racik?.map(r => r?.namaracikan)
            const namaRacik = [...new Set(allRacik)]
            if (namaRacik?.length > 0) {
              namaRacik?.forEach(nama => {
                const dataRacik = racik.filter(r => r?.namaracikan == nama)
                const satudata = racik.find(r => r?.namaracikan == nama)
                const permintaan = data?.asalpermintaanracikan.find(r => r?.namaracikan == nama) ?? data?.asalpermintaanracikan.find(r => r?.namaracikan == nama)
                racikan.value.push({
                  namaracikan: satudata?.namaracikan,
                  jumlahdibutuhkan: satudata?.jumlahdibutuhkan,
                  satuan_racik: satudata?.satuan_racik,
                  aturan: permintaan?.aturan,
                  nilai_r: satudata?.r,
                  rincian: dataRacik
                })
              })
            }
            console.log('ada asal permintaan rac', data?.permintaanracikan)

          }
        }
      }
      if (nonRacikan.value?.length) {
        nonRacikan.value?.forEach(nr => {
          const hargaJual = (nr?.harga_jual ?? nr?.hargajual) ?? 0
          nr.harga = hitungHarga(nr?.jumlah, hargaJual, nr?.r)
        })
      }
      if (racikan.value?.length) {
        racikan.value?.forEach(r => {
          const sub = r?.rincian?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
          r.harga = sub + r?.nilai_r
        })
      }
      const subNr = nonRacikan.value?.reduce((a, b) => parseFloat(a) + parseFloat(b.harga), 0)
      const subR = racikan.value?.reduce((a, b) => parseFloat(a) + parseFloat(b.harga), 0)
      subtotal.value = subNr + subR
      setTimeout(() => {
        loading.value = false
        printPage()
      }, 200)
      console.log('get resep', data, resp)
    }

  } catch {
    loading.value = false
  }
  finally {
    loading.value = false
  }


}

const qrUrl = computed(() => {
  const noreg = props?.item?.noresep// noresep
  const dok = 'E-RESEP.png'
  const asal = 'E-RESEP'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})


function printPage () {
  // console.log('print ')
  setTimeout(function () {
    window.print()
  }, 200)
}

window.onafterprint = (event) => {
  console.log('After print', event)
  emits('close')
}
defineExpose({ printPage })
</script>
<style lang="scss" scoped>
.fnt-10 {
  font-size: 10px !important;
}

.page-x {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 27.94cm;
  height: fit-content;
  padding: 1mm;
  // font-size: 10px !important;
}

.garis {
  width: 100%;
  border-top: 1px dashed black;
  margin-bottom: 2px;
}

.garis2 {
  width: 90%;
}
</style>
