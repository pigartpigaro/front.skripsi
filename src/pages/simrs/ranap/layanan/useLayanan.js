import { computed, defineAsyncComponent, onMounted, ref, shallowRef, watchEffect } from 'vue'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useRoute } from 'vue-router'

export default function useLayanan(pasien, mpp) {
  const store = usePengunjungRanapStore()
  const auth = useAplikasiStore()
  const route = useRoute()

  const menus = ref([

    {
      name: 'AnamnesisPage',
      label: 'Anamnesse $ Riwayat',
      icon: 'icon-mat-medical_information',
      nakes: ['1', '2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./anamnesis/IndexPage.vue')))
    },
    {
      name: 'PemeriksaanPage',
      label: 'Pemeriksaan',
      icon: 'icon-my-stethoscope',
      nakes: ['1', '2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./pemeriksaan/IndexPage.vue')))
    },
    {
      name: 'DiagTindPage',
      label: 'Diagnosa & Tindakan',
      icon: 'icon-mat-health_and_safety',
      nakes: ['1', '2', '3', '4', '5', '6'],
      comp: shallowRef(defineAsyncComponent(() => import('./diagnosaDanTindakan/IndexPage.vue')))
    },
    {
      name: 'Penunjang',
      label: 'Penunjang',
      icon: 'icon-mat-post_add',
      nakes: ['1', '2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./penunjang/IndexPage.vue')))
    },
    {
      name: 'AsessmentUlang',
      label: 'Asessment Ulang',
      icon: 'icon-fa-book-medical-solid',
      nakes: ['1', '2', '3', '4', '5', '6'],
      comp: shallowRef(defineAsyncComponent(() => import('./asessmentulang/IndexPage.vue')))
    },
    {
      name: 'NurseNote',
      label: 'Nurse Note',
      icon: 'icon-mat-note_alt',
      nakes: ['2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./nursenote/IndexPage.vue')))
    },
    {
      name: 'AsessmentPraBedah',
      label: 'Asessment Pembedahan',
      icon: 'icon-fa-book-medical-solid',
      nakes: ['1', '2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./prabedah/IndexPage.vue')))
    },
    {
      name: 'hais',
      label: 'HAIs',
      icon: 'icon-my-artboard',
      nakes: ['2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./hais/IndexPage.vue')))
    },
    {
      name: 'konsulspesialis',
      label: 'Konsul Spesialis',
      icon: 'icon-mat-textsms',
      nakes: ['1', '2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./konsul/IndexPage.vue')))
    },
    {
      name: 'edukasi-page',
      label: 'Edukasi',
      icon: 'icon-mat-people_alt',
      nakes: ['1', '2', '3', '4', '5', '6', '', null],
      comp: shallowRef(defineAsyncComponent(() => import('./edukasi/IndexPage.vue')))
    },
    {
      name: 'e-resep-page',
      label: 'EResep',
      icon: 'icon-mat-receipt',
      nakes: ['1'],
      comp: shallowRef(defineAsyncComponent(() => import('../../eresep/EresepPage.vue')))
    },
    {
      name: 'inform-consent-page',
      label: 'Informed Consent',
      icon: 'icon-mat-app_registration',
      nakes: ['1', '2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./informconsent/IndexPage.vue')))
    },
    {
      name: 'discharge-planning-page',
      label: 'Discharge Planning',
      icon: 'icon-mat-send_time_extension',
      nakes: ['2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./dischargeplanning/IndexPage.vue')))
    },
    {
      name: 'upload-page',
      label: 'Upload Dokumen Luar',
      icon: 'icon-mat-cloud_upload',
      nakes: ['1', '2', '3', '4', '5', '6'],
      comp: shallowRef(defineAsyncComponent(() => import('./upload/IndexPage.vue')))
    },
    {
      name: 'catatan-dan-dokumen',
      label: 'Catatan / Dokumen',
      icon: 'icon-my-file_sign',
      nakes: ['1', '2', '3', '4', '5', '6', 'mpp'],
      comp: shallowRef(defineAsyncComponent(() => import('./dokumen/IndexPage.vue')))
    },
    {
      name: 'mpp',
      label: 'MPP',
      icon: 'icon-fa-arrows-down-to-people-solid',
      nakes: ['2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./mpp/IndexPage.vue')))
    },
    {
      name: 'page-pulang',
      label: 'Pulang / Pulangkan',
      icon: 'icon-eva-home',
      nakes: ['1', '2', '3'],
      comp: shallowRef(defineAsyncComponent(() => import('./pulang/IndexPage.vue')))
    },





    // INI PAGENYA MPP
    {
      name: 'mpp-page',
      label: 'FORM MPP',
      icon: 'icon-mat-medical_information',
      nakes: ['mpp'],
      mpp: true,
      comp: shallowRef(defineAsyncComponent(() => import('../../mpp/ranap/layanan/FORM/IndexPage.vue')))
    }

  ])



  const nakes = computed(() => {
    return auth?.user?.pegawai?.kdgroupnakes
  })

  // console.log('nakes', nakes.value);


  const filterredMenus = computed(() => {
    const mpp = route.matched?.map(a => a.path)?.includes('/mpp') ?? false
    // console.log('mpp', mpp)
    if (!mpp) {
      const byPass = ['sa']
      const user = auth?.user?.username
      if (byPass.includes(user)) {
        return menus.value.filter(menu => menu?.mpp !== true)
      }

      return menus.value.filter(menu => menu.nakes.includes(nakes.value) && menu?.mpp !== true)
    }
    else {
      return menus.value.filter(menu => menu.nakes.includes('mpp'))
    }
  })

  const menu = ref(null)

  onMounted(() => {
    console.log('mounted pageLayananRanap', auth?.user?.username)

    menu.value = filterredMenus.value[0]
  })

  function menuDiganti(val) {
    menu.value = val
  }

  watchEffect(() => {
    if (!pasien) {
      console.log('no pasien')

      store.pageLayanan = false
    }
  })

  return {
    menu,
    store,
    filterredMenus,
    nakes,

    menuDiganti
  }
}
