<template>
  <div class="table-container">
    <q-table flat dense bordered :loading="store.loading" :rows="formattedData" :columns="columns"
      :pagination="{ rowsPerPage: 0 }" hide-pagination height="500px" :virtual-scroll="false"
      :rows-per-page-options="[0]" class="pemeriksaan-table">
      <!-- Custom header -->
      <template #header="props">
        <q-tr :props="props">
          <q-th auto-width rowspan="2" class="text-center">NO</q-th>
          <q-th auto-width rowspan="2" class="text-center">PEMERIKSAAN</q-th>
          <!-- Tanggal header -->
          <template v-for="i in 31" :key="`date-${i}`">
            <q-th colspan="2" class="text-center">{{ i }}</q-th>
          </template>
          <q-th auto-width rowspan="2" class="text-center">Total</q-th>
        </q-tr>
        <q-tr :props="props">
          <!-- L/P header -->
          <template v-for="i in 31" :key="i">
            <q-th class="text-center">L</q-th>
            <q-th class="text-center">P</q-th>
          </template>
        </q-tr>
      </template>

      <!-- Loading slot -->


      <!-- Body template -->
      <template #body="props">
        <q-tr :props="props">
          <q-td key="no" :props="props" :class="props.row.isCategory ? 'bg-grey-2 text-weight-bold' : ''"
            class="text-center">
            {{ props.row.no }}
          </q-td>
          <q-td key="name" :props="props"
            :class="[props.row.isCategory ? 'bg-grey-2 text-weight-bold' : '', 'pemeriksaan-column']">
            {{ props.row.name }}
          </q-td>
          <template v-for="i in 31" :key="i">
            <q-td class="text-center">{{ getDailyCount(props.row.kode, i, 'laki') }}</q-td>
            <q-td class="text-center">{{ getDailyCount(props.row.kode, i, 'perempuan') }}</q-td>
          </template>
          <q-td class="text-center text-weight-bold">{{ calculateTotal(props.row) }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useLaporanLaboratStore } from 'src/stores/simrs/penunjang/laborat/laporan';
import { onMounted, computed, ref, watch } from 'vue';

const store = useLaporanLaboratStore()

const columns = [
  {
    name: 'no',
    label: 'NO',
    field: 'no',
    align: 'right'
  },
  {
    name: 'name',
    label: 'PEMERIKSAAN',
    field: 'name',
    align: 'left',
    style: 'width: 200px; min-width: 200px; max-width: 200px'
  },
  ...Array.from({ length: 31 }, (_, i) => [
    {
      name: `day${i + 1}L`,
      label: 'L',
      field: row => row.dailyData?.[i + 1]?.L || '',
      align: 'center'
    },
    {
      name: `day${i + 1}P`,
      label: 'P',
      field: row => row.dailyData?.[i + 1]?.P || '',
      align: 'center'
    }
  ]).flat(),
  {
    name: 'total',
    label: 'Total',
    field: 'total',
    align: 'center'
  }
]



onMounted(async () => {
  Promise.all([
    store.getMaster(),
    store.getData()
  ])

})

watch(() => store.rawData, (newVal, oldVal) => {
  if (newVal !== oldVal) {
  }
}, { deep: true })

// Mengubah data menjadi format No - Pemeriksaan sesuai permintaan
const formattedData = computed(() => {
  let result = [];
  let categoryIndex = 65; // ASCII 'A'

  // Mendefinisikan urutan yang diinginkan dan mapping nama kategori
  const categoryMapping = {
    'PK': 'PATOLOGI KLINIK',
    'PA': 'PATOLOGI ANATOMI',
    'Uncategorized': 'Uncategorized'
  };

  const desiredOrder = ['PK', 'PA', 'Uncategorized'];

  // Membuat array entries yang diurutkan
  // console.log('group', store.groupedItems);

  const sortedEntries = Object.entries(store.groupedItems).sort(([a], [b]) => {
    const indexA = desiredOrder.indexOf(a);
    const indexB = desiredOrder.indexOf(b);
    return indexA - indexB;
  });

  sortedEntries.forEach(([category, subcategories]) => {
    let categoryCode = String.fromCharCode(categoryIndex);
    result.push({
      no: categoryCode,
      kode: null,
      name: categoryMapping[category] || category,
      isCategory: true
    });

    // console.log('sub', result);


    let subIndex = 1;

    const sortedSubcategories = Object.entries(subcategories).sort(([a, _], [b, __]) => {
      if (category === 'PK') {
        if (a === 'Uncategorized') return 1;
        if (b === 'Uncategorized') return -1;
      }
      return a.localeCompare(b);
    });

    sortedSubcategories.forEach(([subcategory, items]) => {
      let subCategoryCode = `${subIndex}`;
      result.push({ no: subCategoryCode, name: subcategory, kode: null, isCategory: true });

      items.forEach((item, itemIndex) => {
        let itemCode = `${subCategoryCode}.${itemIndex + 1}`;
        result.push({ no: itemCode, name: item.pemeriksaan, kode: item?.kode, isCategory: false });
      });


      subIndex++;
    });

    // console.log('sub', sortedSubcategories); 

    categoryIndex++;
  });

  return result;
});


function getDailyCount(kode, index, jenis) {
  // Format index menjadi 2 digit dengan leading zero

  // console.log('range', store.getMonthAndYear());
  const month = store.getMonthAndYear()?.month < 10 ? `0${store.getMonthAndYear()?.month}` : `${store.getMonthAndYear()?.month}`;
  const year = store.getMonthAndYear()?.year

  const formattedIndex = index < 10 ? `0${index}` : `${index}`
  const coba = store.processedData[kode]?.dates[`${year}-${month}-${formattedIndex}`] ? store.processedData[kode]?.dates[`${year}-${month}-${formattedIndex}`][jenis] : ''

  return coba
}

// Function to calculate total for a row (L + P)
const calculateTotal = (row) => {
  const key = row.kode;
  let total = 0;

  const month = store.getMonthAndYear()?.month < 10 ? `0${store.getMonthAndYear()?.month}` : `${store.getMonthAndYear()?.month}`;
  const year = store.getMonthAndYear()?.year
  for (let i = 1; i <= 31; i++) {
    const formattedIndex = i < 10 ? `0${i}` : `${i}`
    const tot = store.processedData[key]?.dates[`${year}-${month}-${formattedIndex}`] ? store.processedData[key]?.dates[`${year}-${month}-${formattedIndex}`].total : 0

    total += tot;
  }
  return total || '';
}
</script>

<style lang="scss">
.table-container {
  width: 100%;
  overflow-x: auto;
  height: calc(100vh - 140px);

  .pemeriksaan-table {
    table-layout: fixed;
    height: 100%;

    /* Reset default padding/margin */
    .q-table__middle {
      margin-top: 0;
      padding-top: 0;
    }

    /* Sticky header */
    thead tr th {
      position: sticky;
      background: white;
    }

    thead {

      /* Sticky column headers (NO dan PEMERIKSAAN) */
      tr:first-child,
      tr:nth-child(2) {

        th:first-child,
        th:nth-child(2) {
          position: sticky;
          z-index: 21 !important;
          background: white;
        }
      }

      tr:first-child th {
        top: 0;
      }

      tr:nth-child(2) th {
        top: 36px;
      }
    }

    /* Sticky columns in body */
    tbody {

      td:first-child,
      td:nth-child(2) {
        position: sticky;
        background: white;
      }

      td:first-child {
        left: 0;
      }

      td:nth-child(2) {
        left: 48px;
        box-shadow: 4px 0 4px -2px rgba(0, 0, 0, 0.15);
      }
    }

    /* Base z-index for all cells */
    td,
    th {
      background: white;
      padding: 8px;
      border: 1px solid #ddd;
    }

    /* Sticky columns (NO and PEMERIKSAAN) */
    td:first-child,
    td:nth-child(2),
    th:first-child {
      position: sticky;
      left: 0;
      z-index: 20 !important;
      background: white;
    }

    td:nth-child(2),
    th:nth-child(2) {
      position: sticky;
      left: 48px;
      background: white;
      box-shadow: 4px 0 4px -2px rgba(0, 0, 0, 0.15);
    }

    /* Header z-index adjustments for sticky columns */
    thead {

      tr:nth-child(2) {

        th:first-child,
        th:nth-child(2) {
          z-index: 2 !important;
        }

        /* Fix for first day L/P headers */
        th:nth-child(3),
        th:nth-child(4) {
          z-index: 2 !important;
        }
      }

      /* All other date headers */
      tr:first-child th:not(:first-child):not(:nth-child(2)),
      tr:nth-child(2) th:not(:first-child):not(:nth-child(2)) {
        z-index: 2 !important;
      }
    }

    /* Sticky columns */
    .no-column {
      width: 48px;
    }



    td.bg-grey-2 {
      background: #f5f5f5 !important;
    }

    /* Column width control */
    .pemeriksaan-column {
      width: 200px;
      min-width: 200px;
      max-width: 200px;
      white-space: normal;
      word-wrap: break-word;
    }

    /* Remove any unwanted spacing */
    .q-table__container {
      >* {
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
