import { defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";

export const useRbaStore = defineStore('store_rba_siasik', {
  state: () => ({
    loading: false,
    reqs: {
      q: '',
      tahun: date.formatDate(Date.now(), 'YYYY'),
      jenis: null,
    },
    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tahunsekarang: date.formatDate(Date.now(), 'YYYY')
    },
    dialogCetak: false,
    tglcetak: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    datarba: [],
    items: [],
    jenis: [{ jenis: 'Rinci Kegiatan', value: '1' }, { jenis: 'Rinci Item', value: '2' }]
  }),
  actions: {
    getData() {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/siasik/rba/getdatarba', params).then((resp) => {
          // console.log('Data RBA', resp)
          if (resp.status === 200) {
            this.datarba = resp.data

            this.mapingData()
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    mapingData() {
      const rba = []

      const unik1 = this.datarba.map((x) => x.kode1)
      const elunik1 = unik1?.length ? [...new Set(unik1)] : []
      for (let i = 0; i < elunik1?.length; i++) {
        const el = elunik1[i];
        const arr = this.datarba
        const obj = {
          kode: arr.filter((x) => x.kode1 === el)[0].kode1,
          uraian: arr.filter((x) => x.kode1 === el)[0].uraian1,
          pagu: arr.filter((x) => x.kode1 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rba.push(obj)
      }

      const unik2 = this.datarba.map((x) => x.kode2)
      const elunik2 = unik2?.length ? [...new Set(unik2)] : []
      for (let i = 0; i < elunik2?.length; i++) {
        const el = elunik2[i];
        const arr = this.datarba
        const obj = {
          kode: arr.filter((x) => x.kode2 === el)[0].kode2,
          uraian: arr.filter((x) => x.kode2 === el)[0].uraian2,
          pagu: arr.filter((x) => x.kode2 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rba.push(obj)
      }

      const unik3 = this.datarba.map((x) => x.kode3)
      const elunik3 = unik3?.length ? [...new Set(unik3)] : []
      for (let i = 0; i < elunik3?.length; i++) {
        const el = elunik3[i];
        const arr = this.datarba
        const obj = {
          kode: arr.filter((x) => x.kode3 === el)[0].kode3,
          uraian: arr.filter((x) => x.kode3 === el)[0].uraian3,
          pagu: arr.filter((x) => x.kode3 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rba.push(obj)
      }

      const unik4 = this.datarba.map((x) => x.kode4)
      const elunik4 = unik4?.length ? [...new Set(unik4)] : []
      for (let i = 0; i < elunik4?.length; i++) {
        const el = elunik4[i];
        const arr = this.datarba
        const obj = {
          kode: arr.filter((x) => x.kode4 === el)[0].kode4,
          uraian: arr.filter((x) => x.kode4 === el)[0].uraian4,
          pagu: arr.filter((x) => x.kode4 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rba.push(obj)
      }
      const unik5 = this.datarba.map((x) => x.kode5)
      const elunik5 = unik5?.length ? [...new Set(unik5)] : []
      for (let i = 0; i < elunik5?.length; i++) {
        const el = elunik5[i];
        const arr = this.datarba
        const obj = {
          kode: arr.filter((x) => x.kode5 === el)[0].kode5,
          uraian: arr.filter((x) => x.kode5 === el)[0].uraian5,
          pagu: arr.filter((x) => x.kode5 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rba.push(obj)
      }

      const unik6 = [...new Set(this.datarba.map((x) => x.kode))]
      unik6.forEach((kode) => {
        const data = this.datarba.filter((x) => x.kode === kode)

        const unikbidang = [...new Set(data.map((x) => `${x.kodebidang}-${x.kodekegiatan}`))

        ]
        const rincian = unikbidang.map((bidKegiatan) => {
          const [kodebidang, kodekegiatan] = bidKegiatan.split('-')
          const bidangkegiatan = data.filter((x) => x.kodebidang === kodebidang && x.kodekegiatan === kodekegiatan)
          const totalrinci = bidangkegiatan.reduce((total, item) => total + parseFloat(item.pagu), 0);

          return {
            bidang: bidangkegiatan[0].bidang,
            kegiatan: bidangkegiatan[0].kegiatan,
            pagu: totalrinci,
            items: bidangkegiatan.map((item) => ({
              harga: item.harga,
              item: item.usulan,
              pagu: item.pagu,
              satuan: item.satuan,
              volume: item.volume,
            }))
          }
        })
        const totalPagu = data.reduce((total, item) => total + parseFloat(item.pagu), 0);
        const uraian = data[0].uraian;
        rba.push({
          kode: kode,
          uraian: uraian,
          pagu: totalPagu,
          rincian: rincian,
        });
      })

      // const unik6 = this.datarba.map((x) => x.kode)
      // const elunik6 = unik6?.length ? [...new Set(unik6)] : []
      // for (let i = 0; i < elunik6?.length; i++) {
      //   const el = elunik6[i];
      //   const arr = this.datarba

      //   const bidg = arr.filter((x) => x.kode === el)
      //   const unikbidg = bidg.map((x) => x.kodebidang)
      //   const elbidg = unikbidg?.length ? [...new Set(unikbidg)] : []

      //   const obj = {
      //     kode: arr.filter((x) => x.kode === el)[0].kode,
      //     uraian: arr.filter((x) => x.kode === el)[0].uraian,
      //     pagu: arr.filter((x) => x.kode === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
      //     rincian: arr.filter((x) => x.kode === el).map((z) => {
      //       return {
      //         bidang: z?.bidang,
      //         kegiatan: z?.kegiatan,
      //         item: z?.usulan,
      //         volume: z?.volume,
      //         satuan: z?.satuan,
      //         harga: z?.harga,
      //         pagu: z?.pagu,
      //       }
      //     })
      //   }
      //   rba.push(obj)
      // }
      const sortRBA = (rba) =>
        rba.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const dataRBA = sortRBA(rba)
      this.items = dataRBA
      // console.log('rba', dataRBA)
    }
  }

})
