import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungRanapStore } from './pengunjung'

export const useImplementasiEdukasiRanapStore = defineStore('implementasi-edukasi-ranap', {
  state: () => ({
    form: {
      metode: [],
      materi: [],
      materiLain: null,
      estimasi: null,
      media: [],
      evaluasi: null,
      penerima: null,
      namaPenerima: null,
      ttdPenerima: null,
      nakes: null,
      ttdPenerima: null
    },
    loadingSave: false,
    items: [],


    metodis: ['Audio', 'Demonstrasi', 'Lisan', 'Tulisan', 'Visual'],
    materiDpjp: [
      'PENJELASAN HASIL PENGKAJIAN, DIAGNOSA DAN RENCANA ASUHAN',
      'HASIL PEMERIKSAAN PENUNJANG',
      'PERKIRAAN HARI RAWAT',
      'PENJELASAN KOMPLIKASI YANG MUNGKIN TERJADI',
      'PEMBERIAN TERAPI TERMASUK HASIL PENGOBATAN YANG TIDAK DIHARAPKAN',
      'TINDAKAN MEDIS YANG DIBERIKAN',
    ],
    materiPerBid: [
      'HASIL PENGKAJIAN, MASALAH KEPERAWATAN/KEBIDANAN DAN RENCANA ASUHAN',
      'GELANG PASIEN DAN GELANG PENANDA',
      'CUCI TANGAN',
      'ETIKA BATUK',
      'CARA BUANG SAMPAH INFEKSIUS DAN NON INFEKSIUS',
      'MANAJEMEN NYERI',
      'PENATALAKSANAAN RESIKO JATUH',
      'TINDAKAN KEPERAWATAN YANG DILAKUKAN',
      'DISCHARGE SUMMARY',
      'ASUHAN LANJUTAN DI RUMAH (PENANGANAN DAN CARA PERAWATANNYA)',
      'ALAT-ALAT MEDIS DAN KEPERAWATAN YANG PERLU DISIAPKAN DI RUMAH',
      'PENGGUNAAN PERALATAN MEDIS'
    ],
    materiApoteker: [
      'NAMA OBAT',
      'INDIKASI OBAT',
      'EFEK SAMPING OBAT',
      'POTENSI INTERAKSI OBAT DENGAN MAKANAN/OBAT LAIN',
      'DOSIS DAN ATURAN PAKAI OBAT',
      'CARA PENYIMPANAN OBAT',
    ],
    materiGizi: [
      'JENIS DIET PASIEN',
      'EDUKASI MAKANAN DARI LUAR RS',
      'KONTAMINASI, PEMBUSUKAN DAN CARA PENYIMPANAN MAKANAN'
    ],
    materiFisio: [
      'MANFAAT MOBILISASI',
      'ROM AKTIF/PASIF',
    ],
    medias: ['LEAFLET/LEMBAR BALIK', 'AUDIO/VIDEO', 'ALAT PERAGA'],
    evaluasis: ['TIDAK MENGERTI', 'MENYATAKAN PAHAM', 'MAMPU MENJELASKAN', 'MAMPU DEMONSTRASI'],
    penerimaEdukasis: ['Pasien', 'Orang Tua', 'Anak', 'Keluarga']
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {

    initReset() {
      this.form = {
        metode: [],
        materi: [],
        materiLain: null,
        estimasi: null,
        media: [],
        evaluasi: null,
        penerima: null,
        namaPenerima: null,
        ttdPenerima: null,
        nakes: null,
        ttdPenerima: null
      }
    },

    async getList(pasien) {

      const params = {
        params: {
          noreg: pasien?.noreg
        }
      }

      try {
        const resp = await api.get('v1/simrs/pelayanan/simpanimplementasi-edukasi/list', params)
        console.log('respon list implementasi', resp);

        if (resp?.status === 200) {
          this.items = resp?.data
        }
      } catch (error) {
        console.log('implementasi error', error);

      }

    },

    setForm(key, val) {
      this.form[key] = val
    },
    async simpanData(pasien, nakes) {
      // console.log('save implementasi', pasien);
      this.loadingSave = true

      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm
      this.form.kdruang = pasien?.kodepoli
      this.form.nakes = nakes

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/simpanimplementasi-edukasi', this.form)
          .then(resp => {
            if (resp?.status === 200) {
              this.items.unshift(resp?.data?.result)
              this.initReset()
              notifSuccess(resp)
            }
            this.loadingSave = false
            resolve(resp)
          })
          .catch(err => {
            console.log('save implementasi error', err);
            this.loadingSave = false
            reject(err)
          })
      })

    },

    async updateData(pasien, item, nakes) {
      // console.log('update implementasi', pasien, item);
      this.loadingSave = true
      const formupdate = item
      formupdate.nakes = nakes

      console.log('form update', formupdate);

      try {
        const resp = await api.post('v1/simrs/pelayanan/simpanimplementasi-edukasi', formupdate)
        // console.log('respon implementasi', resp);

        if (resp?.status === 200) {
          this.items?.map(obj => obj?.id === resp.data?.result?.id ? { ...obj, ...resp.data.result } : obj);
          notifSuccess(resp)
        }
        this.loadingSave = false
      } catch (error) {
        console.log('update implementasi error', error);
        this.loadingSave = false
      }


    },
    async deleteData(id) {
      // console.log('update implementasi', pasien, item);
      const params = { id: id }

      // console.log('delete', p);

      try {
        const resp = await api.post('v1/simrs/pelayanan/hapusimplementasi-edukasi', params)
        // console.log('respon implementasi', resp);

        if (resp?.status === 200) {
          this.items = this.items?.filter(item => item?.id !== id)
          notifSuccess(resp)
        }
        this.loadingSave = false
      } catch (error) {
        console.log('update implementasi error', error);
        this.loadingSave = false
      }


    }


  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImplementasiEdukasiRanapStore, import.meta.hot))
}
