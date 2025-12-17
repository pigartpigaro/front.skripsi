import { defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";

export const dataBastPekerjaanStore = defineStore('data_bast_pekerjaan', {
  state: () => ({
    loading: false,
    disabled: false,
    reqs: {
      q: '',
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      page: 1,
      rowsPerPage: 50,
      rowsNumber: 0,
      kodepenerima: null,
      kodekegiatanblud: null
    },
    bastpekerjaan: [],
  }),
  actions: {
    goToPage(val) {
      this.reqs.page = val;
      this.listBastPekerjaan();
    },
    onRequest(props) {
      this.reqs.page = props?.pagination?.page ?? 1
      this.reqs.rowsPerPage = props?.pagination?.rowsPerPage ?? 10
      this.listBastPekerjaan()
    },
    refreshTable() {
      this.reqs.page = 1
      this.listBastPekerjaan()
    },
    listBastPekerjaan() {
      this.loading = true;
      const params = { params: this.reqs };
      return new Promise((resolve, reject) => {
        api.get('/v1/transaksi/belanja_ls/bastpekerjaan', params)
          .then((resp) => {
            if (resp.status === 200) {
              // console.log('data BAST Pekerjaan', resp);

              this.bastpekerjaan = resp.data;
              this.loading = false;
              resolve(resp.data);
            }
          })
          .catch((err) => {
            this.loading = false;
            reject(err);
          });
      });
    },
  }

})
