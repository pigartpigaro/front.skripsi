/**
 *
Field   Type          Null    Default  Comment
------  ------------  ------  -------  ---------------
id      bigint(12)    NO      (NULL)   id
rs1     varchar(100)  YES     (NULL)   noreg
rs2     varchar(50)   YES     (NULL)   norm
rs3     datetime      YES     (NULL)   tgl
rs4     varchar(10)   YES     (NULL)   jam ke
rs5     varchar(255)  YES     (NULL)   keluhan
rs6     varchar(255)  YES     (NULL)   bb
rs7     varchar(255)  YES     (NULL)   kesadaran
rs8     varchar(255)  YES     (NULL)   tekanan darah
rs9     varchar(255)  YES     (NULL)   napas
rs10    varchar(255)  YES     (NULL)   suhu
rs11    varchar(255)  YES     (NULL)   qb
rs12    varchar(255)  YES     (NULL)   qd
rs13    varchar(255)  YES     (NULL)   tekanan vena
rs14    varchar(255)  YES     (NULL)   tmp
rs15    varchar(255)  YES     (NULL)   uf
rs16    varchar(255)  YES     (NULL)   assesment
rs17    varchar(255)  YES     (NULL)   perawat

 */

import { acceptHMRUpdate, defineStore } from "pinia"
import { date } from "quasar"
import { useListPasienHemodialisaStore } from "./hemodialisa"
import { api } from "src/boot/axios"
import { notifSuccess } from "src/modules/utils"

export const useIntridialitikHemodialisaStore = defineStore('intridialitik-hemodialisa', {
  state: () => ({
    loading: false,
    pengunjung: useListPasienHemodialisaStore(),
    form: {
      noreg: null,
      norm: null,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      jamKe: 'PRE HD',
      keluhan: '',
      bb: '',
      tkDarah: '',
      kesadaran: '',
      napas: '',
      suhu: '',
      qb: '',
      qd: '',
      tkVena: '',
      tmp: '',
      uf: '',
      assasement: ''
    },
    jamKeOptions: ['PRE HD', '1', '2', '3', '4', '5', '6', '7', '8', 'POST HD']
  }),
  actions: {
    initPasien () {
      // console.log('pasie', this.pengunjung?.pasien)
      this.setForm('noreg', this.pengunjung?.pasien?.noreg)
      this.setForm('norm', this.pengunjung?.pasien?.norm)
    },
    setForm (key, val) {
      this.form[key] = val
    },
    resetForm () {
      this.form = {
        noreg: null,
        norm: null,
        tgl: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
        jamKe: 'PRE HD',
        keluhan: '',
        bb: '',
        tkDarah: '',
        kesadaran: '',
        napas: '',
        suhu: '',
        qb: '',
        qd: '',
        tkVena: '',
        tmp: '',
        uf: '',
        assasement: ''
      }
    },

    simpan () {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/hemodialisa/layanan/intradialitik/simpan', this.form)
          .then(resp => {
            this.loading = false
            const data = resp?.data?.data
            const index = this.pengunjung?.pasien?.intradialitik?.findIndex(item => item.id === data?.id)

            if (index >= 0) {
              this.pengunjung.pasien.intradialitik[index] = data
            }
            else this.pengunjung.pasien.intradialitik?.push(data)
            console.log('resp', index, data, this.pengunjung?.pasien)
            notifSuccess(resp)
            resolve(resp?.data)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    hapus (item) {
      item.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/hemodialisa/layanan/intradialitik/hapus', item)
          .then(resp => {
            const index = this.pengunjung?.pasien?.intradialitik?.findIndex(it => it.id === item.id)
            if (index >= 0) this.pengunjung.pasien.intradialitik.splice(index, 1)
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            delete item.loading
          })
      })

    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIntridialitikHemodialisaStore, import.meta.hot))
}
