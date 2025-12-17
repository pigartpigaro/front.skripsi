import { defineStore } from "pinia"
import { date } from "quasar"
import { api } from "src/boot/axios"
import { notifErr, notifSuccess } from "src/modules/utils"

export const listDataNpdlsStore = defineStore('list_data_npdls', {
  state: () => ({
    loading: false,
    disabled: false,
    dialogEditNpd: false,
    dialogPrintPencairan: false,
    dialogCetakNpd: false,
    openDialogFarmasi: false,
    openDialogSiasik: false,
    openDialogRinci: false,
    params: {
      q: '',
      tahun: date.formatDate(Date.now(), 'YYYY'),
      page: 1,
    },
    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    listnpdls: [],
    datanpd: [],

    npddatasave: [],
    editnpd: [],
    listrinci: []
  }),
  actions: {
    goToPage(val) {
      this.params.page = val
      this.listdatanpd()
    },
    listdatanpd() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('/v1/transaksi/belanja_ls/listnpdls', params)
          .then((resp) => {
            if (resp.status === 200) {
              console.log('data NPD', resp)

              this.listnpdls = resp.data
              this.rincianNpd()

              this.loading = false
              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    rincianNpd() {
      if (this.listnpdls?.length) {
        const sas = this.listnpdls.map((arr) => {
          // Daftar properti pajak
          const pajakKeys = ['ppnpusat', 'pph21', 'pph22', 'pph23', 'pph25', 'pajakdaerah', 'pasal4'];

          // Hitung total pajak
          const totalpajak = (() => {
            let sum = 0;

            // Hitung dari arr.newpajak
            if (Array.isArray(arr.newpajak) && arr.newpajak.length > 0) {
              const mappedValues = arr.newpajak
                .map((x) => {
                  const nilai = parseFloat(x?.nilai);
                  return isNaN(nilai) ? 0 : nilai;
                })
                .filter((val) => val !== 0); // Opsional: abaikan nilai 0

              if (mappedValues.length > 0) {
                sum += mappedValues.reduce((a, b) => a + b, 0);
              }
            }

            // Hitung dari arr.pajak jika ada
            if (arr.pajak !== null && arr.pajak !== undefined) {
              sum += pajakKeys.reduce((total, key) => {
                const nilai = parseFloat(arr.pajak[key]);
                return total + (isNaN(nilai) ? 0 : nilai);
              }, 0);
            }

            return Number(sum.toFixed(2)); // Batasi ke 2 desimal
          })();

          // Hitung total pembayaran
          const totalbayar = (() => {
            // Hitung total nominal
            const totalNominal = Array.isArray(arr.npdlsrinci) && arr.npdlsrinci.length > 0
              ? arr.npdlsrinci
                .map((x) => parseFloat(x.nominalpembayaran))
                .filter((val) => !isNaN(val))
                .reduce((a, b) => a + b, 0)
              : 0;

            // Hitung total pajak (arr.pajak + arr.newpajak)
            let totalPajak = 0;

            // Tambahkan dari arr.newpajak
            if (Array.isArray(arr.newpajak) && arr.newpajak.length > 0) {
              const mappedValues = arr.newpajak
                .map((x) => {
                  const nilai = parseFloat(x?.nilai);
                  return isNaN(nilai) ? 0 : nilai;
                })
                .filter((val) => val !== 0); // Opsional: abaikan nilai 0

              if (mappedValues.length > 0) {
                totalPajak += mappedValues.reduce((a, b) => a + b, 0);
              }
            }

            // Tambahkan dari arr.pajak jika ada
            if (arr.pajak !== null && arr.pajak !== undefined) {
              totalPajak += pajakKeys.reduce((total, key) => {
                const nilai = parseFloat(arr.pajak[key]);
                return total + (isNaN(nilai) ? 0 : nilai);
              }, 0);
            }

            // Hitung total bayar
            return Number((totalNominal - totalPajak).toFixed(2));
          })();

          return {
            nonpk: arr.nonpk,
            nonpdls: arr.nonpdls,
            tglnpdls: arr.tglnpdls,
            bidang: arr.bidang,
            kodebidang: arr.kodebidang,
            pptk: arr.pptk,
            kodepptk: arr.kodepptk,
            kegiatanblud: arr.kegiatanblud,
            kodekegiatanblud: arr.kodekegiatanblud,
            penerima: arr.penerima,
            kodepenerima: arr.kodepenerima,
            biayatransfer: arr.biayatransfer,
            bank: arr.bank,
            rekening: arr.rekening,
            npwp: arr.npwp,
            keterangan: arr.keterangan,
            nopencairan: arr.nopencairan,
            nopenerimaan: arr.nopenerimaan,
            noserahterima: arr.noserahterima,
            nonotadinas: arr.nonotadinas,
            bast: arr.bast,
            kunci: arr.kunci,
            serahterimapekerjaan: arr.serahterimapekerjaan,
            tglcair: arr.npkrinci?.header?.tglpindahbuku,
            total: Array.isArray(arr.npdlsrinci) && arr.npdlsrinci.length > 0
              ? Number(arr.npdlsrinci
                .map((x) => parseFloat(x.nominalpembayaran))
                .filter((val) => !isNaN(val))
                .reduce((a, b) => a + b, 0)
                .toFixed(2))
              : 0,
            rincian: arr.npdlsrinci,
            pajak: arr.pajak,
            newpajak: arr.newpajak,
            totalpajak: totalpajak,
            totalbayar: totalbayar,
          };
        });

        this.datanpd = sas;
        console.log('datanpd', this.datanpd);

      }
      // if (this.listnpdls?.length) {
      //   const sas = []
      //   for (let i = 0; i < this.listnpdls?.length; i++) {
      //     const arr = this.listnpdls[i]
      //     // console.log('rincianqqq', arr)
      //     const head = {
      //       nonpk: arr.nonpk,
      //       nonpdls: arr.nonpdls,
      //       tglnpdls: arr.tglnpdls,
      //       bidang: arr.bidang,
      //       kodebidang: arr.kodebidang,
      //       pptk: arr.pptk,
      //       kodepptk: arr.kodepptk,
      //       kegiatanblud: arr.kegiatanblud,
      //       kodekegiatanblud: arr.kodekegiatanblud,
      //       penerima: arr.penerima,
      //       kodepenerima: arr.kodepenerima,
      //       biayatransfer: arr.biayatransfer,
      //       bank: arr.bank,
      //       rekening: arr.rekening,
      //       npwp: arr.npwp,
      //       keterangan: arr.keterangan,
      //       nopencairan: arr.nopencairan,
      //       nopenerimaan: arr.nopenerimaan,
      //       noserahterima: arr.noserahterima,
      //       nonotadinas: arr.nonotadinas,
      //       bast: arr.bast,
      //       kunci: arr.kunci,
      //       serahterimapekerjaan: arr.serahterimapekerjaan,
      //       tglcair: arr.npkrinci?.header?.tglpindahbuku,
      //       total: arr.npdlsrinci?.map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0),
      //       rincian: arr.npdlsrinci,
      //       pajak: arr.pajak,
      //       newpajak: arr.newpajak,
      //       totalpajak: (arr.newpajak.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)) +
      //         isNaN(parseFloat(arr.pajak?.ppnpusat)) ? parseFloat(0) : parseFloat(arr.pajak?.ppnpusat) +
      //           isNaN(parseFloat(arr.pajak?.pph21)) ? parseFloat(0) : parseFloat(arr.pajak?.pph21) +
      //             isNaN(parseFloat(arr.pajak?.pph22)) ? parseFloat(0) : parseFloat(arr.pajak?.pph22) +
      //               isNaN(parseFloat(arr.pajak?.pph23)) ? parseFloat(0) : parseFloat(arr.pajak?.pph23) +
      //                 isNaN(parseFloat(arr.pajak?.pph25)) ? parseFloat(0) : parseFloat(arr.pajak?.pph25) +
      //                   isNaN(parseFloat(arr.pajak?.pajakdaerah)) ? parseFloat(0) : parseFloat(arr.pajak?.pajakdaerah) +
      //                     isNaN(parseFloat(arr.pajak?.pasal4)) ? parseFloat(0) : parseFloat(arr.pajak?.pasal4),
      //       totalbayar: (arr.npdlsrinci?.map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0)) - (
      //         isNaN(parseFloat(arr.pajak?.ppnpusat)) ? parseFloat(0) : parseFloat(arr.pajak?.ppnpusat) +
      //           isNaN(parseFloat(arr.pajak?.pph21)) ? parseFloat(0) : parseFloat(arr.pajak?.pph21) +
      //             isNaN(parseFloat(arr.pajak?.pph22)) ? parseFloat(0) : parseFloat(arr.pajak?.pph22) +
      //               isNaN(parseFloat(arr.pajak?.pph23)) ? parseFloat(0) : parseFloat(arr.pajak?.pph23) +
      //                 isNaN(parseFloat(arr.pajak?.pph25)) ? parseFloat(0) : parseFloat(arr.pajak?.pph25) +
      //                   isNaN(parseFloat(arr.pajak?.pajakdaerah)) ? parseFloat(0) : parseFloat(arr.pajak?.pajakdaerah) +
      //                     isNaN(parseFloat(arr.pajak?.pasal4)) ? parseFloat(0) : parseFloat(arr.pajak?.pasal4)
      //       )

      //     }

      //     sas.push(head)
      //   }
      //   this.datanpd = sas

      // }
    },
    kunciData(row) {
      // console.log('KUNCI', row)
      this.loading = true;
      return new Promise((resolve) => {
        api.post('/v1/transaksi/belanja_ls/kuncinpd', row)
          .then((resp) => {
            // console.log('resp', resp)
            this.loading = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch((err) => {
            console.error(err)
            this.loading = false
          });
      });
    }

  }
})
