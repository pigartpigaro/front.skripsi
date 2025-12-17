<template>
  <!-- <div v-for="(item, index) in store.items" :key="index" class="row">
    {{ index + 1 }}. {{ item }}
  </div> -->
  <table style="width: calc(100vw - 80px);">
    <thead class="" :style="{ top: `${headerOffset}px` }">
      <template v-if="store.tipe === 'Rinci'">
        <tr>
          <th width="5%">
            No
          </th>
          <th>
            Tanggal
          </th>
          <th>
            Nomor Resep
          </th>
          <th>
            Fornas
          </th>
          <th>
            Total
          </th>
          <th>
            Ruang
          </th>
          <th>
            Dokter
          </th>
          <th>
            Keterangan
          </th>
        </tr>
      </template>
      <template v-else>
        <tr>
          <th width="5%" rowspan="2">
            No
          </th>
          <th rowspan="2">
            Tanggal
          </th>
          <th colspan="2">
            Rawat Inap
          </th>
          <th colspan="2">
            Rawat Jalan
          </th>
          <th colspan="2">
            Total
          </th>

        </tr>
        <tr>
          <th>
            Fornas
          </th>
          <th>
            Total Item
          </th>
          <th>
            Fornas
          </th>
          <th>
            Total Item
          </th>
          <th>
            Fornas
          </th>
          <th>
            Total Item
          </th>
        </tr>
      </template>
    </thead>
    <tbody>
      <template v-if="store.loading">
        <template v-if="store.tipe === 'Rinci'">
          <tr v-for="n in store.params.per_page" :key="n">
            <td width="5%">
              <q-skeleton type="text" width="20px" height="14px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="n in store.params.per_page" :key="n">
            <td width="5%">
              <q-skeleton type="text" width="20px" height="14px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
            <td>
              <q-skeleton type="text" width="60px" height="25px" />
            </td>
          </tr>
        </template>
      </template>
      <template v-else-if="!store.items?.length">
        <template v-if="store.tipe === 'Rinci'">
          <tr>
            <td colspan="8">
              <app-no-data />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="8">
              <app-no-data />
            </td>
          </tr>
        </template>
      </template>
      <template v-else>
        <template v-if="store.tipe === 'Rinci'">
          <template v-for="(item, n) in store.items" :key="n">
            <tr :class="n % 2 === 0 ? 'even' : 'odd'">
              <td width="5%">
                <div class="row items-center">
                  {{ n + 1 }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ dateFullFormat(item?.tgl) }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ item?.nomor }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 250px;">
                <div class="row">
                  {{ item?.fornas }}
                </div>

              </td>

              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ item?.total }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ item?.ruang }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ item?.dokter }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ item?.ket }}
                </div>
              </td>

            </tr>
          </template>
          <tr>
            <td colspan="3">
              <div class="text-center">
                Jumlah
              </div>
            </td>
            <td>
              {{store.items.reduce((a, b) => a + b.fornas, 0)}}
            </td>
            <td>
              {{store.items.reduce((a, b) => a + b.total, 0)}}
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="text-center">% Kesesuaian Fornas</div>
            </td>
            <td colspan="2">
              <div class="text-center">
                {{
                  (store.items.reduce((a, b) => a + b.fornas, 0) /
                    store.items.reduce((a, b) => a + b.total, 0) * 100).toFixed(2)
                }} %

              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <template v-for="(item, n) in store.items" :key="n">
            <tr :class="n % 2 === 0 ? 'even' : 'odd'">
              <td width="5%">
                <div class="row items-center">
                  {{ n + 1 }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ dateFullFormat(item?.tgl) }}
                </div>
              </td>
              <!-- ranap -->
              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ item?.ranap?.fornas }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 250px;">
                <div class="row ">
                  {{ item?.ranap?.total }}
                </div>
              </td>
              <!-- rajal -->
              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ item?.rajal?.fornas }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 250px;">
                <div class="row ">
                  {{ item?.rajal?.total }}
                </div>
              </td>
              <!-- total -->
              <td style="white-space: normal; max-width: 150px;">
                <div class="row items-center">
                  {{ item?.total?.fornas }}
                </div>
              </td>
              <td style="white-space: normal; max-width: 250px;">
                <div class="row ">
                  {{ item?.total?.total }}
                </div>
              </td>
            </tr>
          </template>
          <tr>
            <td colspan="6">
              <div class="text-center">
                Jumlah
              </div>
            </td>
            <td>
              {{store.items.reduce((a, b) => a + b.total.fornas, 0)}}
            </td>
            <td>
              {{store.items.reduce((a, b) => a + b.total.total, 0)}}
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="text-center">% Kesesuaian Fornas</div>
            </td>
            <td colspan="2">
              <div class="text-center">
                {{
                  (store.items.reduce((a, b) => a + b.total.fornas, 0) /
                    store.items.reduce((a, b) => a + b.total.total, 0) * 100).toFixed(2)
                }} %

              </div>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useLaporanSpmFarmasiStore } from 'src/stores/simrs/laporan/farmasi/spm/spm'
import { ref, onMounted, onUnmounted } from 'vue'

const store = useLaporanSpmFarmasiStore()
const headerOffset = ref(0)
const props = defineProps({
  h: {
    type: Number,
    default: 0
  },
  bottom: {
    type: Number,
    default: 0
  },
  depo: {
    type: Array,
    default: () => []
  }
})
const depos = [
  { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
  { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
  { nama: 'Depo IGD', value: 'Gd-04010104' },
  { nama: 'Depo OK', value: 'Gd-04010103' },
]
function ambilDepo () {
  const depo = depos.filter((item) => props.depo.includes(item.value))?.map((item) => item.nama)?.join(' / ')
  console.log('depo', depo)
  return depo ?? ''
}
const calculateOffset = () => {

  headerOffset.value = props.bottom + (props.bottom > props.h ? (props.bottom - props.h) : (props.h - props.bottom))
  console.log('header offset kesesu', headerOffset.value)
}

onMounted(() => {
  calculateOffset()
  window.addEventListener('resize', calculateOffset)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateOffset)
})
defineExpose({
  calculateOffset
})
</script>

<style lang="scss" scoped>
.hv:hover {
  background-color: #0D5A86;
  color: #fff
}

.gt {
  border-top: 1px solid black;
}

.gka {
  border-right: 1px solid black;
}

.gki {
  border-left: 1px solid black;
}

.gb {
  border-bottom: 1px solid black;
}

//
.head {
  border: 1px solid rgb(44, 43, 43);
  padding-left: 10px;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
}

.child {
  border-bottom: 1px solid rgb(44, 43, 43);
  border-left: 1px solid rgb(44, 43, 43);
  border-right: 1px solid rgb(44, 43, 43);
  padding-left: 10px;
}

.text-end {
  text-align: end;
}

/* Standard Tables */

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 50px;
  border: 1px solid #000;
}

thead {
  position: sticky;
  z-index: 10;
  background-color: white;

  tr {
    th {
      padding: 4px;
      border: 2px solid #000;
      background-color: white;
      color: black;
      position: sticky;
      font-weight: bold;
    }
  }
}

td {
  padding: 4px;
  text-align: left;
  border: 1px solid #000;
  vertical-align: middle;
}

.odd {
  background-color: rgba(255, 255, 255, 0.05);
}

.even {
  background-color: rgba(0, 0, 0, 0.05);
}

// th,
td {

  text-align: left;
  text-indent: 2px;
  border: 2px solid black;
  vertical-align: center;
  border: 2px solid black;
}

// td {
//   // padding: 0.5em 0.5em 0.5em 1.5em;
// padding: 0.5em 0.5em 0.5em 1em;
// }
// th {
// border: inherit;
// border: 1px solid black;
// }
// tr{
//   border: 1px solid black;
// }
tr:nth-child(even) th[scope=row] {
  background-color: #f2f2f2;
}

tr:nth-child(odd) th[scope=row] {
  background-color: #fff;
}

// tr:nth-child(even) {
//   background-color: rgba(0, 0, 0, 0.05);
// }

// tr:nth-child(odd) {
//   background-color: rgba(255, 255, 255, 0.05);
// }

// td:nth-of-type(2) {
//   font-style: italic;
// }

// th:nth-of-type(3),
// td:nth-of-type(3) {
//   text-align: right;
// }
/* Fixed Headers */
// Hapus atau comment bagian ini karena sudah tidak diperlukan
// th {
//   position: -webkit-sticky;
//   position: sticky;
//   top: 0;
//   z-index: 5;
//   border: inherit;
// }

th[scope=row] {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
  border: inherit;
}

th[scope=row] {
  vertical-align: top;
  color: inherit;
  background-color: inherit;
  background: linear-gradient(90deg, transparent 0%, transparent calc(100% - .05em), #d6d6d6 calc(100% - .05em), #d6d6d6 100%);
  border: inherit;
}

table:nth-of-type(2) th:not([scope=row]):first-child {
  left: 0;
  z-index: 3;
  background: linear-gradient(90deg, #666 0%, #666 calc(100% - .05em), #ccc calc(100% - .05em), #ccc 100%);
}

/* Strictly for making the scrolling happen. */

th[scope=row]+td {
  min-width: 24em;
}

th[scope=row] {
  min-width: 20em;
}
</style>
