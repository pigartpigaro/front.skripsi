<template>
  <div class="app-table f-12 full-height full-width column">
    <div class="col-auto q-px-sm q-pt-sm">
      <div class="print-only">
        <slot name="header-for-print" />
      </div>
      <div class="flex items-center justify-between q-mb-md print-hide" :class="[]">
        <div class="col-one flex items-center">
          <div>
            <q-input v-model="store.params.q" outlined class="search-big" borderless rounded :debounce="debounce"
              clearable dense :placeholder="labelSearch" @keydown.enter.prevent="handleSearch" @clear="handleSearch">
              <template #prepend>
                <q-icon name="icon-mat-search" size="20px" />
              </template>
            </q-input>
          </div>
          <slot name="header-left-after-search" class="q-mr-md" />
        </div>
        <div class="col-one">
          <!-- delete Ids -->
          <slot name="header-right-before" class="q-ml-md" />
          <q-btn v-if="selected?.length > 0" unelevated color="red" round size="sm" icon="icon-mat-delete_sweep"
            @click="handleDeleteAll">
            <q-tooltip class="primary" :offset="[10, 10]">
              Hapus Data
            </q-tooltip>
          </q-btn>


          <!-- refresh Ids -->

          <q-btn unelevated round size="sm" color="teal" icon="icon-mat-refresh" @click="handleRefresh">
            <q-tooltip class="primary" :offset="[10, 10]">
              Refresh Table
            </q-tooltip>
          </q-btn>


          <!-- per page -->
          <q-btn class="q-ml-sm" unelevated color="orange" round size="sm" icon="icon-mat-layers">
            <q-tooltip class="primary" :offset="[10, 10]">
              Per Baris
            </q-tooltip>
            <q-menu fit anchor="bottom left" self="top left">
              <q-list dense>
                <q-item v-for="(opt, i) in options" :key="i" v-ripple clickable v-close-popup>
                  <q-radio v-model="store.params.per_page" size="xs" :val="opt" :label="opt + ' Baris'" color="primary"
                    @update:model-value="handleRefresh" />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- filter table -->


          <!-- <q-btn class="q-ml-sm" unelevated color="indigo" round size="sm" icon="icon-mat-sort">
            <q-tooltip class="primary" :offset="[10, 10]">
              Filter Table
            </q-tooltip>
            <q-menu transition-show="flip-left" transition-hide="flip-right" class="q-pt-sm">
              <q-list style="min-width: 131px">
                <q-item v-for="(head, index) in filterCheckbox" :key="index" v-ripple tag="label">
                  <q-item-section avatar>
                    <q-checkbox v-model="selectColumn" size="sm" dense :val="head" color="primary" />
                  </q-item-section>
                  <q-item-section>{{ head }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn> -->


          <!-- data baru -->


          <q-btn class="q-ml-sm" unelevated round color="primary" size="sm" icon="icon-mat-add" @click="handleAdd">
            <q-tooltip class="primary" :offset="[10, 10]">
              Data Baru
            </q-tooltip>
          </q-btn>


        </div>
      </div>
    </div>


    <q-separator />
    <!-- <q-separator :style="stickyHeader ? 'margin-top:70px' : ''" /> -->



    <!-- table -->
    <div class="col full-height full-width">
      <q-markup-table ref="refCellTable" flat bordered
        class="rounded-xl shadow-sm full-height relative-position head-x column-x" :dense="$q.screen.lt.md"
        :class="[dark ? 'bg-dark' : 'bg-white']">

        <thead class="" :class="dark ? 'bg-black' : 'bg-grey-4'">
          <tr :class="dark ? 'bg-black' : 'bg-grey-4'">
            <th v-if="isChecked" width="5%" class="text-left">
              <div>
                <q-checkbox v-model="checkAll" size="xs" keep-color color="cyan" />
              </div>
            </th>
            <th v-if="rowNo" width="5%" class="text-left">
              <div class="text-weight-bold">
                NO
              </div>
            </th>
            <th v-if="rowImage !== null" width="5%" class="text-left">
              <div class="">
                #
              </div>
            </th>
            <th v-for="(head, index) in filterColumn" :key="index" class="cursor-pointer"
              @click="emits('setOrder', head)">
              <div class="row items-center text-weight-bold">
                <slot :name="'col-' + head" :row="head" :left="'col-grow text-left'" :right="'col-grow text-right'">
                  <div class="col-grow text-left">
                    {{ ubahSpace(head)?.toUpperCase() }}
                  </div>
                </slot>
                <div v-if="orderBy === head">
                  <q-icon v-if="sort === 'desc'" class="q-ml-xs" name="icon-mat-vertical_align_bottom" />
                  <q-icon v-else class="q-ml-xs" name="icon-mat-vertical_align_top" />
                </div>
              </div>
            </th>
            <th v-if="actionField" class="text-right" width="5%">
              {{ labelAction || "Aksi" }}
            </th>

          </tr>
        </thead>
        <template v-if="!loading">

          <template v-if="!items?.length">
            <div class="column flex-center fit absolute-top" :class="dark ? 'bg-dark-page' : 'bg-grey-2'"
              style="min-height:300px">
              <div>
                <q-icon name="icon-mat-layers" color="primary" size="50px" />
              </div>
              <div class="text-primary q-mt-sm">
                Data Belum Ada
              </div>
            </div>
          </template>
          <template v-else>
            <tbody>


              <tr v-for="(item, i) in items" :key="i" class="text-left" :class="[clickAble ? item.highlight === true ? 'cursor-pointer bg-light-blue-11' : 'cursor-pointer' : '',
              i % 2 === 0 ? dark ? 'bg-dark-page' : 'bg-grey-2' : ''

              ]" @click="clickAble ? clicked(item, i) : ''">
                <td v-if="isChecked">
                  <q-checkbox v-model="selected" size="xs" keep-color :val="item.id" color="teal" />
                </td>
                <td v-if="rowNo" class="text-left">
                  {{ meta?.from + i }}
                </td>
                <td v-if="rowImage !== null" class="text-left">
                  <slot :name="'cell-default-img'" :row="item" />
                </td>
                <td v-for="(col, idx) in filterColumn" :key="idx" width="10%" class="text-left"
                  style="vertical-align: top;">
                  <slot :name="'cell-' + col" :row="item" :index="i">
                    {{ item[col] }}
                  </slot>
                </td>
                <td class="text-right" style="vertical-align: top; ">
                  <div class="row justify-end items-center">
                    <!-- class="q-ml-md" -->
                    <slot name="left-acttion" :row="item" :col="i" />
                    <div v-if="actionField" class="q-gutter-xs">
                      <q-btn v-if="adaEdit" class="" size="sm" round color="grey" icon="icon-mat-edit"
                        @click="handleEdit(item)">
                        <q-tooltip anchor="top middle" self="center middle">
                          Edit Data
                        </q-tooltip>
                      </q-btn>
                      <template v-if="selected?.length < 2 && adaDelete">
                        <q-spinner v-if="store.loadingDelete && idRemove === item?.id" color="negative" size="1.5em"
                          :thickness="3" />
                        <q-btn v-else class="" size="sm" round color="negative" icon="icon-mat-delete_sweep"
                          @click="deleteOne(item.id)">
                          <q-tooltip anchor="top middle" self="center middle">
                            Delete Data
                          </q-tooltip>
                        </q-btn>
                      </template>

                    </div>
                    <div>
                      <slot name="custom-btn" :row="item" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </template>


        <template v-else>
          <div class="column fit flex-center absolute-top">


            <q-spinner-cube color="primary" size="40px" />
            <div class="text-primary q-mt-sm">
              harap bersabar, menunggu...
            </div>

          </div>
        </template>


      </q-markup-table>
    </div>
    <div class="print-only">
      <slot name="footer-for-print" />
    </div>
    <!-- Pagination -->
    <PaginateTable v-if="(items?.length > 0) && adaPaginasi" class="print-hide" :meta="meta" @first="goTo(1)"
      @last="goTo(meta?.last_page)" @next="goTo(meta?.current_page + 1)" @prev="goTo(meta?.current_page - 1)" />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useQuasar, getCssVar } from 'quasar'
import PaginateTable from './PaginateTable.vue'

const props = defineProps({
  store: { type: Object, required: true },
  meta: { type: Object, default: null },
  labelSearch: { type: String, default: 'Cari ... Enter' },
  debounce: { type: Number, default: 300 },
  dark: { type: Boolean, default: false },

  // content table
  // Header
  columns: { type: Array, default: () => [] },
  columnHide: { type: Array, default: () => [] },
  isChecked: { type: Boolean, default: false },
  rowNo: { type: Boolean, default: false },
  rowImage: { type: String, default: null },
  actionField: { type: Boolean, default: true },
  labelAction: { type: String, default: 'Aksi' },
  orderBy: { type: String, default: 'id' },

  // row
  loading: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
  meta: { type: Object, default: null },
  clickAble: { type: Boolean, default: false },
  adaEdit: { type: Boolean, default: true },
  adaDelete: { type: Boolean, default: true },

  // pagination
  adaPaginasi: { type: Boolean, default: true },
  forcePaginasi: { type: Boolean, default: false },


})
const emits = defineEmits([''])
const $q = useQuasar()


const refCellTable = ref(null)
const checkAll = ref(false)
const selectColumn = ref([])
const heightCell = ref(0)
const selected = ref([])
const options = ref([5, 10, 20, 50, 100, 1000])
const idRemove = ref(0)

const filterColumn = computed(() => {
  const cols = props.store.columns ? props.store.columns : []
  if (cols?.length > 0) {
    const filterred = cols.filter((el) => !props.store.columnHide.includes(el))
    if (selectColumn.value?.length > 0) {
      const thumb = filterred.filter((el) => selectColumn.value.includes(el))
      return thumb
    }
    return filterred
  }

  return cols
})

function ubahSpace(text) {
  return text.replace(/_/g, ' ')

}


const handleSearch = () => {
  // console.log('search');
  props.store.setSearch()
}

const handleRefresh = () => {
  props.store.params.page = 1
  props.store.fetchAll()
}

const handleAdd = () => {
  props.store.setAdd()
}

const handleEdit = (item) => {
  props.store.setEdit(item)
}

const deleteOne = (id) => {

  $q.dialog({
    title: 'Peringatan<em>!</em>',
    message: '<em>Apakah Anda Yakin ?</em> <span class="text-red">Data Akan Di Hapus</span> <strong> DI SISTEM</strong>',
    html: true,
    cancel: true
  }).onOk(() => {
    // console.log('OK')
    props.store.remove(id)
    idRemove.value = id
  }).onCancel(() => {
    selected.value = []
    idRemove.value = 0
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

const handleDeleteAll = () => {
  // emits('deleteAll', selected.value)
}




const filterCheckbox = computed(() => {
  const cols = props.columns ? props.columns : []
  if (cols?.length > 0) {
    return cols.filter((el) => !props.columnHide.includes(el))
  }
  return cols
})

watch(filterCheckbox, (obk) => {
  for (let i = 0; i < obk?.length; i++) {
    selectColumn.value.push(obk[i])
  }
})

watch(checkAll, () => {
  setCheck(checkAll.value)
})
watch(selectColumn, () => {
  setCheck(checkAll.value)
})
watch(() => props.items, (obj) => {
  //   console.log('Watch items', obj)
  selected.value = []
})

const setCheck = (x) => {
  const arr = []
  if (x) {
    for (let i = 0; i < props.items?.length; i++) {
      arr.push(props.items[i].id)
    }
    selected.value = arr
  }
  else {
    selected.value = []
  }
}

const goTo = (page) => {
  props.store.setPage(page)
}


const bgAction = computed(() => {
  return props.dark ? getCssVar('dark') : getCssVar('dark-light')
})


</script>

<style lang="scss" scoped>
$fs : v-bind(ts);
$pfs: v-bind(pts);

$white: #fff;
$aksi: v-bind(bgAction);

.sticky-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  padding: 15px 10px;
}

.head-x thead tr th {
  position: sticky;
  top: 0;
  z-index: 21 !important;
}

.app-table {
  width: 100%;
  /* print width */
  font-size: $fs;

  .q-table {
    max-width: 100% !important;
    max-height: 100% !important;
  }
}


.column-x {
  // specifying max-width so the example can highlight
  // the sticky column on any browser window
  // max-width: 600px;

  thead {
    tr:last-child {
      th:last-child {
        // bg color is important for th; just specify one
        background-color: $dark-light;
        color: $white;
      }
    }
  }

  td:last-child {
    background-color: $dark-light;
    color: $white;
  }

  th:last-child,
  td:last-child {
    position: sticky;
    right: 0;
    z-index: 1;
  }
}

@media print {
  .app-table {
    width: 100%;
    /* print width */
    font-size: $pfs;

    .q-table {
      max-width: 100% !important;
    }

    .q-table td {
      padding: 5px 5px;
      font-size: $pfs;
      white-space: normal !important;
      word-wrap: normal !important;
      hyphens: manual;
    }

    .q-table th {
      padding: 5px 5px;
      font-size: $pfs;
      white-space: normal !important;
      word-wrap: normal !important;
      hyphens: manual;
    }

    .screenwide {
      max-width: 100% !important;
    }

  }
}
</style>
