<template>
  <div class="text-h6 q-mb-md">Alarm Settings</div>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-card flat bordered class="settings-item">
        <q-card-section>
          <div class="text-subtitle2 q-mb-md">Regular Alert</div>
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-icon name="icon-eva-bell-outline" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Regular Alert Sound</q-item-label>
                <q-item-label caption>Enable sound for regular alerts</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="regularAlertEnabled" color="primary" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <div class="row items-center q-gutter-x-md">
                  <q-btn :disable="!regularAlertEnabled" color="primary" icon="icon-mat-play_arrow" round flat
                    @click="playSound('regular')" />
                  <audio ref="regularSound" :src="regularSoundUrl" type="audio/mp3" preload="auto" />
                  <q-file v-model="regularSoundFile" :disable="!regularAlertEnabled" label="Unggah suara baru"
                    accept=".mp3" outlined dense @update:model-value="handleRegularSoundUpload">
                    <template v-slot:append>
                      <q-icon name="icon-mat-attach_file" />
                    </template>
                  </q-file>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-subtitle2 q-mb-md">CITO Alert</div>
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-icon name="icon-eva-bell-outline" color="negative" />
              </q-item-section>
              <q-item-section>
                <q-item-label>CITO Alert Sound</q-item-label>
                <q-item-label caption>Enable sound for CITO alerts</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="citoAlertEnabled" color="negative" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <div class="row items-center q-gutter-x-md">
                  <q-btn :disable="!citoAlertEnabled" color="negative" icon="icon-mat-play_arrow" round flat
                    @click="playSound('cito')" />
                  <audio ref="citoSound" :src="citoSoundUrl" type="audio/mp3" preload="auto" />
                  <q-file v-model="citoSoundFile" :disable="!citoAlertEnabled" label="Unggah suara baru" accept=".mp3"
                    outlined dense @update:model-value="handleCitoSoundUpload">
                    <template v-slot:append>
                      <q-icon name="icon-mat-attach_file" />
                    </template>
                  </q-file>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <!-- Info banner -->
  <q-banner v-if="showPermissionBanner" class="bg-info text-white">
    <template v-slot:avatar>
      <q-icon name="icon-mat-info" />
    </template>
    Aplikasi ini membutuhkan izin suara untuk berfungsi dengan baik.
    <template v-slot:action>
      <q-btn flat color="white" label="Pelajari Lebih Lanjut" @click="showPermissionHelp" />
    </template>
  </q-banner>

  <!-- Test sound button with tooltip -->
  <q-btn :disable="!regularAlertEnabled" color="primary" icon="icon-mat-play_arrow" round flat
    @click="playSound('regular')">
    <q-tooltip>
      Tes suara (memerlukan izin browser)
    </q-tooltip>
  </q-btn>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Toggle states
const regularAlertEnabled = ref(true) // Set default ke true untuk testing
const citoAlertEnabled = ref(true) // Set default ke true untuk testing

// Sound files
const regularSoundFile = ref(null)
const citoSoundFile = ref(null)

// Audio elements refs
const regularSound = ref(null)
const citoSound = ref(null)

// Update path audio
const regularSoundUrl = ref('/assets/alarms/biasa.mp3')
const citoSoundUrl = ref('/assets/alarms/cito.mp3')

// Tambahkan fungsi ini untuk check file
const verifyAudioFile = (url) => {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Audio file ${url} exists and is accessible`);
    })
    .catch(error => {
      console.error(`Audio file ${url} error:`, error);
    });
}

onMounted(() => {
  verifyAudioFile(regularSoundUrl.value)
  verifyAudioFile(citoSoundUrl.value)
  // Inisialisasi audio elements
  regularSound.value = new Audio(regularSoundUrl.value)
  citoSound.value = new Audio(citoSoundUrl.value)

  // Pre-load audio files
  regularSound.value.load()
  citoSound.value.load()

  // Check browser permissions
  if ('permissions' in navigator) {
    navigator.permissions.query({ name: 'notifications' })
      .then(permission => {
        if (permission.state === 'denied') {
          $q.notify({
            color: 'warning',
            message: 'Please enable notifications for sound alerts',
            icon: 'icon-mat-notifications_off'
          })
        }
      })
  }
})

// Update playSound function dengan logging
const playSound = async (type) => {
  try {
    const audioElement = type === 'regular' ? regularSound.value : citoSound.value

    // Debug log
    console.log('Playing audio:', type)
    console.log('Audio element:', audioElement)
    console.log('Audio source:', audioElement.src)

    if (!document.body.hasAttribute('data-user-interacted')) {
      $q.dialog({
        title: 'Aktifkan Suara',
        message: 'Klik OK untuk mengaktifkan notifikasi suara',
        ok: 'Aktifkan',
        cancel: 'Batal'
      }).onOk(() => {
        document.body.setAttribute('data-user-interacted', 'true')
        audioElement.play().catch(handlePlayError)
      })
      return
    }

    await audioElement.play().catch(handlePlayError)
  } catch (error) {
    handlePlayError(error)
  }
}

const handlePlayError = (error) => {
  // Detailed error logging
  console.error('Play error details:', {
    message: error.message,
    name: error.name,
    stack: error.stack
  })

  $q.notify({
    color: 'warning',
    message: 'Mohon aktifkan suara di pengaturan browser Anda',
    icon: 'icon-mat-volume_up',
    actions: [{
      label: 'Cara mengaktifkan',
      color: 'white',
      handler: () => {
        showPermissionHelp()
      }
    }]
  })
}

// Handle sound uploads dengan preview yang lebih baik
const handleRegularSoundUpload = async (file) => {
  if (!file) return

  try {
    if (!file.type.includes('audio')) {
      throw new Error('Tipe file tidak valid. Mohon unggah file audio.')
    }

    const objectUrl = URL.createObjectURL(file)
    regularSoundUrl.value = objectUrl
    regularSound.value?.load()

    $q.notify({
      color: 'positive',
      message: 'Suara alarm reguler berhasil diperbarui',
      icon: 'icon-mat-check'
    })
  } catch (error) {
    console.error('Upload error:', error)
    $q.notify({
      color: 'negative',
      message: `Gagal memperbarui suara alarm reguler: ${error.message}`,
      icon: 'icon-mat-error'
    })
  }
}

const handleCitoSoundUpload = async (file) => {
  if (!file) return

  try {
    if (!file.type.includes('audio')) {
      throw new Error('Tipe file tidak valid. Mohon unggah file audio.')
    }

    const objectUrl = URL.createObjectURL(file)
    citoSoundUrl.value = objectUrl
    citoSound.value?.load()

    $q.notify({
      color: 'positive',
      message: 'Suara alarm CITO berhasil diperbarui',
      icon: 'icon-mat-check'
    })
  } catch (error) {
    console.error('Upload error:', error)
    $q.notify({
      color: 'negative',
      message: `Gagal memperbarui suara alarm CITO: ${error.message}`,
      icon: 'icon-mat-error'
    })
  }
}

// Cleanup
onUnmounted(() => {
  if (regularSoundUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(regularSoundUrl.value)
  }
  if (citoSoundUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(citoSoundUrl.value)
  }
})

const showPermissionBanner = ref(true)

const showPermissionHelp = () => {
  $q.dialog({
    title: 'Izin Browser',
    message: `
      Untuk mengaktifkan notifikasi suara:
      1. Cari ikon pengaturan situs di address bar browser Anda
      2. Izinkan akses suara dan notifikasi
      3. Muat ulang halaman
      
      Catatan: Langkah-langkah mungkin berbeda untuk setiap browser.
    `,
    ok: 'Mengerti',
    persistent: true
  })
}
</script>
