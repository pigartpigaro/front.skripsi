<template>
  <!-- <q-page padding class="bg-grey-2"> -->
  <div class="">
    <q-card class="rounded-xl shadow-2xl">
      <q-card-section class="text-center f-20 text-weight-bold">
        <span class="medical-symbol">📋</span> Daftar Pemakaian Obat
      </q-card-section>

      <q-separator />

      <!-- Tombol Tambah Obat -->
      <q-card-section class="q-gutter-md flex justify-center">
        <q-btn label="⚕️ Resep" class="futuristic-button" @click="addResep" />
        <q-btn label="✨ Non-Res" class="futuristic-button" @click="addNonResep" />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <q-list bordered separator class="rounded-lg shadow-md">
          <template v-if="reseps?.length">
            <q-item v-for="(obat, index) in reseps" :key="index" class="q-hoverable futuristic-item q-mb-xs">
              <q-item-section avatar>
                <q-avatar :color="obat?.flag !== '1' ? 'orange' : 'secondary'" text-color="white" size="md">
                  {{ obat?.nama_obat.charAt(0) }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="f-12 text-bold">{{ obat?.nama_obat }}</q-item-label>
                <!-- <q-item-label caption class="text-grey">{{ obat?.kandungan }}</q-item-label> -->
                <div class="text-white q-mt-xs">
                  Sisa: {{ obat?.sisa }} {{ obat?.satuan_ambil }}, <span class="text-yellow q-ml-md"> Dosis: {{
                    obat?.dosis
                    }}</span>
                </div>
              </q-item-section>

              <q-item-section side class="text-center">
                <div class="text-bold text-white">{{ obat?.jumlah }} {{ obat?.satuan_ambil }}</div>

                <!-- Tombol Hapus Item -->
                <q-btn icon="icon-mat-delete" size="xs" padding="sm" flat color="negative" round dense
                  class="q-mt-sm delete-btn" @click="hapusObat(index)" />
              </q-item-section>
            </q-item>
          </template>

          <!-- Placeholder jika daftar kosong -->
          <template v-else>
            <div class="empty-state flex flex-center column q-pa-lg">
              <!-- <q-icon name="medical_services" size="64px" color="grey-5" /> -->
              <div class="medical-symbol-large">⚕️</div>
              <div class="text-subtitle1 text-grey-5 q-mt-md">
                Belum ada data obat
              </div>
            </div>
          </template>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
  <!-- </q-page> -->
</template>

<script setup>
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  reseps: {
    type: Array,
    default: () => []
  },
  status: {
    type: String,
    default: 'add'
  }
})

onMounted(() => {
  // console.log('props.pasien', props.pasien);

})

const emits = defineEmits(['addResep', 'addNonResep', 'hapusObat'])

// Fungsi untuk menambahkan obat resep
const addResep = () => {
  emits('addResep', 'resep')
}

// Fungsi untuk menambahkan obat non-resep
const addNonResep = () => {
  emits('addNonResep', 'non-resep')
}



const $q = useQuasar()
const hapusObat = (index) => {
  // obatList.value.splice(index, 1)

  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
    // persistent: true
  }).onOk(() => {
    // const params = { id: selected.value }
    emits('hapusObat', index)
  }).onCancel(() => {
    // console.log('Cancel')
    // selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })


}


</script>

<style scoped>
.q-card {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
}

.futuristic-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.futuristic-item:hover {
  transform: translateY(-5px);
  /* INI JIKA PADA cARD PUTIH KERREN */
  /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); */
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.4),
    /* Bayangan gelap lebih kecil */
    0 4px 12px rgba(59, 130, 246, 0.4),
    /* Glow biru natural */
    0 6px 18px rgba(2, 133, 241, 0.3);
  /* Glow ungu yang lebih halus */
}

.empty-state {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(8px);
}

.futuristic-button {
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  color: white;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.futuristic-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* .futuristic-button {
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  color: white;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-weight: bold;
}

.futuristic-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
} */

.delete-btn {
  background: rgba(201, 201, 201, 0.15);
  transition: background 0.2s ease;
}

.delete-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

.medical-symbol {
  display: inline-block;
  /* font-size: 2rem; */
  transition: transform 0.3s ease, text-shadow 0.3s ease;
}

.medical-symbol:hover {
  transform: scale(1.2) rotate(10deg);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.medical-symbol-large {
  font-size: 64px;
  color: #9e9e9e;
  /* Mirip dengan grey-5 */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, text-shadow 0.3s ease;
}

.medical-symbol-large:hover {
  transform: scale(1.2) rotate(10deg);
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}
</style>
