// import { api } from 'src/boot/axios'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useAnamnesisHemodialisaStore } from 'src/stores/simrs/hemodialisa/anamnesis'
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'

export default function useRightPanel (pasien) {
  const store = useAnamnesisHemodialisaStore()
  const auth = useAplikasiStore()

  const settings = reactive({
    splitMin: 94,
    hoverred: false
  })

  const nakes = reactive({
    dokter: !!(auth?.user?.pegawai?.kdgroupnakes === '1' || auth?.user?.pegawai?.kdgroupnakes === 1),
    perawat: !!(auth?.user?.pegawai?.kdgroupnakes === '2' || auth?.user?.pegawai?.kdgroupnakes === 2),
    bidan: !!(auth?.user?.pegawai?.kdgroupnakes === '3' || auth?.user?.pegawai?.kdgroupnakes === 3)

  })

  const fields = reactive({
    igd: [
      { row: 'keluhanUtama', label: 'Keluhan Utama' },
      { row: 'riwayatpenyakitsekarang', label: 'Riwayat Penyakit Skrg' },
      { row: 'riwayatpenyakit', label: 'Riwayat Penyakit Dhl' },
      { row: 'riwayatpengobatan', label: 'Riwayat Pengobatan' },
      { row: 'riwayatpengobatan', label: 'Riwayat Pengobatan' },
      { row: 'riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya', label: 'Rwyt Pkrjaan yg berhubungan dg zat berbahaya' }
    ]
  })
  onMounted(() => {
    nakes.dokter = !!(auth?.user?.pegawai?.kdgroupnakes === '1' || auth?.user?.pegawai?.kdgroupnakes === 1)
    nakes.perawat = !!(auth?.user?.pegawai?.kdgroupnakes === '2' || auth?.user?.pegawai?.kdgroupnakes === '3')

    // console.log('nakes', nakes)
    // console.log('pasien?.anamnesis_awal_hd', pasien?.anamnesis_awal_hd)

    // getData(pasien)
    store.PISAH_DATA_RANAP_IGD(pasien?.anamnesis_awal_hd, pasien)
  })


  watch(() => pasien.anamnesis_awal_hd, (val) => {
    console.log('watch', val)
    store.PISAH_DATA_RANAP_IGD(pasien?.anamnesis_awal_hd, pasien)
  }, { deep: true })

  watchEffect(() => {
    // console.log('watchEffect pasien', pasien)
    // store.PISAH_DATA_RANAP_IGD(pasien?.anamnesis, pasien)
  })

  return {
    store, settings, fields, nakes
  }
}
