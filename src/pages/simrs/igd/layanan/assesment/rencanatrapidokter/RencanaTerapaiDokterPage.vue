<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card flat bordered square class="col-6 full-height">
        <div class="column full-height">
          <div class="col-12">
            <FormRencanaTerapi :pasien="props.pasien" />
          </div>
        </div>
      </q-card>
      <div class="col-6 full-height ">
        <div class="column full-height">
          <div class="col">
            <ListRencanaTerapi :pasien="props.pasien" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import FormRencanaTerapi from './comp/FormRencanaTerapi.vue';
import ListRencanaTerapi from './comp/ListRencanaTerapi.vue';
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
