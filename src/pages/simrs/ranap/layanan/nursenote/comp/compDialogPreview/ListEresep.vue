<template>
  <!-- <div class="fit"> -->
  <q-list dark bordered separator>
    <q-item v-if="!items?.length" clickable v-ripple>
      <q-item-section>Single line item</q-item-section>
    </q-item>

    <q-item v-else v-for="(item, index) in items" :key="index" clickable
      :class="item?.jumlah !== 0 ? 'bg-primary text-white' : ''">
      <!-- <q-item-section avatar>
        <q-checkbox dark v-model="selected" :val="item" color="teal" size="sm" />
      </q-item-section> -->
      <q-item-section>
        <q-item-label>{{ item?.nama_obat }} </q-item-label>
        <q-item-label caption class="text-grey">{{ item?.uraian }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-input dark dense outlined standout="bg-dark" style="width: 60%;" label="CC" v-model="item.jumlah"
          type="number" @update:model-value="isSelected" />
      </q-item-section>
    </q-item>


  </q-list>
  <!-- </div> -->
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }

})

onMounted(() => {
  setitems()
})

const items = ref([])

const setitems = () => {
  let arr = []
  const reseps = props?.pasien?.newapotekrajal ?? []

  if (reseps?.length) {
    const detailsResep = reseps?.map(x => x?.permintaanresep?.map(y => {
      return {
        kdobat: y?.kdobat,
        nama_obat: y?.mobat?.nama_obat,
        uraian: y?.uraian108,
        jumlah: 0
      }
    }))?.flat()
    arr = [...new Set(detailsResep)]
  }

  // return arr
  items.value = arr
}


const selected = ref([])
const emits = defineEmits(['onSelected'])

const isSelected = () => {
  selected.value = items.value.filter(x => x.jumlah !== 0)
  emits('onSelected', selected.value)
}

</script>
