<template>
  <q-menu v-if="punyaAkses" fit transition-show="scale" transition-hide="scale">
    <q-list style="min-width: 500px">
      <q-item-label header class="text-primary flex justify-between">
        Notifikasi Laborat
        <q-btn flat size="sm" color="primary" @click="clearNotif">Clear</q-btn>
      </q-item-label>

      <q-separator />
      <!-- Notifikasi List -->
      <q-scroll-area style="height: 300px; max-height: 300px">
        <template v-for="(notification, index) in notifications" :key="index">
          <q-item clickable v-ripple v-close-popup class="notification-item" @click="markAsRead(index)">
            <q-item-section avatar>
              <q-avatar rounded size="40px" :color="notification.color">
                <q-icon :name="notification.icon" color="white" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ notification.title }}, {{ notification.dari }}
                <q-badge v-if="notification.cito === 'Iya'" color="negative" rounded class="q-ml-lg">Cito</q-badge>
              </q-item-label>
              <q-item-label caption>{{ formatTime(notification.timestamp) }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge v-if="!notification.read" color="red" rounded>New</q-badge>
            </q-item-section>
          </q-item>
          <!-- Separator antar notifikasi -->
          <q-separator v-if="index < notifications?.length - 1" />
        </template>
      </q-scroll-area>

      <!-- Footer -->
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section class="text-center text-primary">
          {{ unreadCount }} Permintaan Baru belum dilihat
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Audio Element untuk Alarm -->
    <audio ref="notificationSound">
      <source :src="regularSoundUrl" type="audio/mp3" preload="auto" />
    </audio>
    <audio ref="notificationCito">
      <source :src="citoSoundUrl" type="audio/mp3" preload="auto" />
    </audio>
  </q-menu>
</template>

<script setup>
import { useTransaksiLaboratTable } from "src/stores/simrs/penunjang/laborat/transaksi_laborat";
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { laravelEcho } from 'src/modules/newsockets'
import { useAplikasiStore } from "src/stores/app/aplikasi";
import { LocalStorage } from "quasar";
import { formatTime } from "src/modules/formatter";
import { useQuasar } from 'quasar';

const emit = defineEmits(['notif'])

const router = useRouter()
const route = useRoute()
const lab = useTransaksiLaboratTable()
const auth = useAplikasiStore()
const $q = useQuasar()

const punyaAkses = ref(false)
const routeLab = ref('/admin/laborat/table')

// Data Notifikasi
const notifications = ref([]);
const timer = ref(null);

// Audio elements refs
const notificationSound = ref(null);
const notificationCito = ref(null);

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
  notificationSound.value = new Audio(regularSoundUrl.value)
  notificationCito.value = new Audio(citoSoundUrl.value)

  // Pre-load audio files
  notificationSound.value.load()
  notificationCito.value.load()


  lihatAksesLaborat()

  timer.value = setInterval(() => {
    notifications.value = [...notifications.value];
  }, 1000);


  if (punyaAkses.value) {
    Promise.all([


      subscribedChannel(),
      loadNotifications()
    ])
  }




})

// **Muat Notifikasi dari Local Storage**
const loadNotifications = () => {
  notifications.value = LocalStorage.getItem("notifications") || [];

  // Hitung jumlah notifikasi belum dibaca
  emit('notif', unreadCount.value)
};

// **Simpan Notifikasi ke Local Storage**
const saveNotifications = () => {
  LocalStorage.set("notifications", notifications.value);
  // kirim ke parent
  emit('notif', unreadCount.value)
};

// **Tambah Notifikasi Baru & Putar Suara**
const addNotification = (title, dari, cito, read, icon = "icon-mat-medical_information", color = "blue") => {
  notifications.value.unshift({
    title,
    dari,
    cito,
    read,
    icon,
    color,
    read: false,
    timestamp: Date.now(),
  });
  saveNotifications();

  // Putar suara notifikasi
  playNotificationSound(cito);


};


// **Hitung jumlah notifikasi belum dibaca**
const unreadCount = computed(() => notifications.value.filter((n) => !n.read)?.length);

// **Putar Suara Notifikasi**
const playNotificationSound = async (cito) => {
  try {
    await nextTick()
    const audioElement = cito === 'Iya' ? notificationCito.value : notificationSound.value
    console.log('Playing notification:', cito === 'Iya' ? 'cito sound' : 'regular sound')

    await audioElement?.play().catch(handlePlayError)
  } catch (error) {
    handlePlayError(error)
  }
}

const handlePlayError = (error) => {
  console.error('Audio play error:', {
    message: error.message,
    name: error.name,
    code: error.code
  })
}


// **Jalankan Interval Setiap Detik**


const markAsRead = (index) => {

  const path = route?.fullPath
  console.log('index', index, path);

  if (path === routeLab.value) {
    lab.fromNotifs()
  } else {

    router.push(routeLab.value)
  }

  // notifications.value[index].read = true;
  viewAll()
};

const viewAll = () => {
  notifications.value.forEach((n) => (n.read = true));
  saveNotifications();
};




// **Hentikan Interval Saat Komponen Dilepas**
onUnmounted(() => {
  laravelEcho.leave('private.notif.permintaan-laborat')
  clearInterval(timer.value);
});

const lihatAksesLaborat = () => {
  const apps = auth?.items
  const akses = auth?.aksesApps

  // console.log('akses ke aplikasi laborat', akses);
  const laborat = apps?.find(x => x?.aplikasi === 'laborat')?.id || null

  let haveAkses = false
  // Handle kasus 'All' access
  if (akses === 'All') {
    haveAkses = false
  } else if (Array.isArray(akses) && akses?.length) {
    haveAkses = akses?.some(x => x?.aplikasi_id === laborat)
  }


  console.log('akses ke aplikasi laborat', haveAkses);
  punyaAkses.value = haveAkses
}


const subscribedChannel = () => {
  const channel = laravelEcho.private('private.notif.permintaan-laborat')
  channel.subscribed(() => {
    console.log('subscribed private.notif.permintaan-laborat channel !!!')
  }).listen('.notif-message', (e) => {
    // console.log('listen notif', e)
    const data = e?.message?.data || null
    if (data?.menu === 'permintaan-laborat' && punyaAkses.value) {
      console.log('message', data);
      const color = data.dari === 'RANAP' ? 'blue' : data.dari === 'IGD' ? 'orange' : 'red'
      addNotification(data?.title, data?.dari, data?.cito, data?.read, "icon-mat-medical_information", color);
    }


  })
}

// const cobaSendNotif = () => {
//   lab.cobaNotifikasi()
// }

const clearNotif = () => {
  notifications.value = []
  saveNotifications()
}
</script>
