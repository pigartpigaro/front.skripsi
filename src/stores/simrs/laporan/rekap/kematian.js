import { defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";

export const uselaporankematianStore = defineStore('laporan-kematian', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
  }),
  actions: {
    async initAmbilData() {
      this.laporankematian()
    },
    async laporankematian() {
      this.items = []
      this.loading = true
      this.kolom = ['Status', 'Total']
      const params = { params: this.params }
      await api.get('v1/simrs/laporan/rekammdeik/carakeluarpasienigd', params)
        .then((resp) => {
          if (resp.status === 200) {
            const datahasil = resp?.data
            this.sethasil(datahasil)
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    sethasil(val) {
      // console.log('asli', val)
      const hasilglobal = []
      val.forEach(x => {
        const keterangan = x?.flagingx === null ? x.flaging : x.flagingx
        const hasil = {
          qr: keterangan,
          noreg: x?.noreg,
          norm: x?.norm,
          nama: x?.nama,
          tglmasuk: x?.tglmasuk,
          noka: x?.noka,
          ktp: x?.ktp,
          doa: x?.triage
        }
        hasilglobal.push(hasil)
      })
      // console.log('sasa', hasilglobal)
      const xxxxx = hasilglobal.reduce((acc, { qr }) => {
        acc[qr] = acc[qr] || { name: qr, count: 0 };
        acc[qr]['count'] += 1;

        return acc;
      }, {});
      // console.log('xxxxx', xxxxx)
      const keys = Object.keys(xxxxx)
      keys.forEach(ke => {
        // console.log('ke', ke)
        this.items.push({
          'status': xxxxx[ke]['name'],
          'jumlah': xxxxx[ke]['count']
        })
      })
      // this.items = xxxxx
      // console.log('hahahahihihi', this.items)
      this.loading = false

      this.items.forEach(sasa => {
        // console.log('sasa', sasa)
        sasa.rinci = []
        const status = sasa?.status
        // console.log('status', status)
        const caririnci = hasilglobal.filter(ft => ft.qr === status)
        // console.log('caririnci', caririnci)
        sasa.rinci = caririnci
      })
    }
  }
})
