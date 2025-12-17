<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 180vw; height: 600px">
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
        <q-header elevated>
          <q-bar class="bg-black text-white">
            <div>Cetak RKA</div>
            <q-space />

            <q-btn dense flat icon="icon-mat-close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-header>
        <q-page-container>
          <div id="printMe" class="f-12 q-py-md row justify-center">
            <q-card-section>
              <div class="col-auto" style="font-size: 1.2em">
                <div class="row  justify-between full-width full-height ">
                  <div class="row b1 justify-between full-width">
                    <div class="row b2" style="width:70%">
                      <div class="row flex-center full-width">
                        <div class="col text-weight-bold full-width q-pa-sm b3 text-center">
                          <div>
                            RENCANA KERJA DAN ANGGARAN
                          </div>
                          <div>
                            SATUAN KERJA PERANGKAT DAERAH
                          </div>
                        </div>
                      </div>
                      <div class="row text-center text-bold full-width q-py-sm">
                        <div class="full-width">
                          UOBK RSUD DOKTER MOHAMAD SALEH
                        </div>
                        <div class="full-width">
                          TAHUN ANGGARAN {{ store.reqs.tahun }}
                        </div>
                      </div>
                    </div>

                    <div class="row" style="width:30%">
                      <div class="row text-weight-bold full-width text-center">
                        <div v-if="store.datarka?.length || store.reqs.jenisrka === '1'"
                          class="col flex-center q-pa-md full-width">
                          <div class="q-pb-sm">
                            Formulir
                          </div>
                          <div>
                            RKA - RINCIAN BELANJA SKPD
                          </div>
                        </div>
                        <div v-else-if="store.reqs.jenisrka === '2'" class="col flex-center q-pa-md full-width">
                          <div class="q-pb-sm">
                            Formulir
                          </div>
                          <div class="q-pb-sm">
                            RKA - RINCIAN BELANJA SKPD
                          </div>
                          <div>
                            PERGESERAN-ANGGARAN
                          </div>
                        </div>
                        <div v-else-if="store.reqs.jenisrka === '3'" class="col flex-center q-pa-md full-width">
                          <div class="q-pb-sm">
                            Formulir
                          </div>
                          <div class="q-pb-sm">
                            RKA - RINCIAN BELANJA SKPD
                          </div>
                          <div>
                            PERUBAHAN-ANGGARAN
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row b4 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-py-xs flex-center">
                        <div class="col-auto" style="width:150px">
                          <div class="q-py-xs" style="height: 35px">
                            URUSAN PEMERINTAHAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            BIDANG URUSAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            PROGRAM
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            KEGIATAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            ORGANISASI
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            SUB ORGANISASI
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col-auto">
                          <div class="q-py-xs" style="height: 35px">
                            : 1 - URUSAN PEMERINTAHAN WAJIB YANG BERKAITAN DENGAN PELAYANAN DASAR
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02 - URUSAN PEMERINTAHAN BIDANG KESEHATAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.01 - PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.01.2.10 - PENINGKATAN PELAYANAN BLUD
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.2.14.0.00.03.0000 - DINAS KESEHATAN, PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.2.14.0.00.03.0301 - UOBK RSUD DOKTER MOHAMAD SALEH
                          </div>
                        </div>
                        <div class="q-px-md" />
                      </div>
                    </div>
                  </div>

                  <div class="row b6 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row text-bold q-pl-sm q-py-sm flex-center full-width text-center">
                        Indikator Tolak Ukur Kinerja Kegiatan
                      </div>
                    </div>
                  </div>

                  <div class="row justify-between full-width full-height ">
                    <div class="row full-width" style="width:100%">
                      <table v-if="store.datarka?.length && store.reqs.jenisrka === '1'"
                        class="justify-center full-width">
                        <thead>
                          <tr style="height: 25px">
                            <th rowspan="2">
                              Indikator
                            </th>
                            <th colspan="2">
                              Tolak Ukur Kerja
                            </th>
                          </tr>
                          <tr style="height: 25px">
                            <th>
                              Uraian
                            </th>
                            <th>
                              Target Kinerja
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Capaian Kegiatan
                            </td>
                            <td>
                              {{ store.dataanggaran[0].capaianprogram }}
                            </td>
                            <td class="text-right">
                              {{ store.dataanggaran[0].targetcapaian }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Masukan
                            </td>
                            <td>
                              {{ store.dataanggaran[0].masukan }}
                            </td>
                            <td class="text-right">
                              {{ formatRpDouble(store.datarka[0].pagu) }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Keluaran
                            </td>
                            <td>
                              {{ store.dataanggaran[0].keluaran }}
                            </td>
                            <td class="text-right">
                              {{ store.dataanggaran[0].targetkeluaran }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Hasil
                            </td>
                            <td>
                              {{ store.dataanggaran[0].hasil }}
                            </td>
                            <td class="text-right">
                              {{ store.dataanggaran[0].targethasil }}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table v-else-if="store.reqs.jenisrka === '2'" class="justify-center full-width">
                        <thead>
                          <tr style="height: 25px">
                            <th rowspan="2">
                              Indikator
                            </th>
                            <th colspan="2">
                              Sebelum Perubahan
                            </th>
                            <th colspan="2">
                              Setelah Perubahan
                            </th>
                          </tr>
                          <tr style="height: 25px">
                            <th>
                              Uraian
                            </th>
                            <th>
                              Target Kinerja
                            </th>
                            <th>
                              Uraian
                            </th>
                            <th>
                              Target Kinerja
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Capaian Kegiatan
                            </td>
                            <td>
                              {{ store.pergeseran[0].capaianprogram }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targetcapaian }}
                            </td>
                            <td>
                              {{ store.pergeseran[0].capaianprogram }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targetcapaian }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Masukan
                            </td>
                            <td>
                              {{ store.pergeseran[0].masukan }}
                            </td>
                            <td class="text-right">
                              {{ formatRpDouble(store.datarkapergeseran[0].pagu) }}
                            </td>
                            <td>
                              {{ store.pergeseran[0].masukan }}
                            </td>
                            <td class="text-right">
                              {{ formatRpDouble(store.datarkapergeseran[0].pagubaru) }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Keluaran
                            </td>
                            <td>
                              {{ store.pergeseran[0].keluaran }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targetkeluaran }}
                            </td>
                            <td>
                              {{ store.pergeseran[0].keluaran }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targetkeluaran }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Hasil
                            </td>
                            <td>
                              {{ store.pergeseran[0].hasil }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targethasil }}
                            </td>
                            <td>
                              {{ store.pergeseran[0].hasil }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targethasil }}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table v-else-if="store.reqs.jenisrka === '3'" class="justify-center full-width">
                        <thead>
                          <tr style="height: 25px">
                            <th rowspan="2">
                              Indikator
                            </th>
                            <th colspan="2">
                              Sebelum Perubahan
                            </th>
                            <th colspan="2">
                              Setelah Perubahan
                            </th>
                          </tr>
                          <tr style="height: 25px">
                            <th>
                              Uraian
                            </th>
                            <th>
                              Target Kinerja
                            </th>
                            <th>
                              Uraian
                            </th>
                            <th>
                              Target Kinerja
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Capaian Kegiatan
                            </td>
                            <td>
                              {{ store.pergeseran[0].capaianprogram }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targetcapaian }}
                            </td>
                            <td>
                              {{ store.pergeseran[0].capaianprogram }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targetcapaian }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Masukan
                            </td>
                            <td>
                              {{ store.pergeseran[0].masukan }}
                            </td>
                            <td class="text-right">
                              {{ formatRpDouble(store.datarkaperubahan[0].pagu) }}
                            </td>
                            <td>
                              {{ store.pergeseran[0].masukan }}
                            </td>
                            <td class="text-right">
                              {{ formatRpDouble(store.datarkaperubahan[0].pagubaru) }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Keluaran
                            </td>
                            <td>
                              {{ store.pergeseran[0].keluaran }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targetkeluaran }}
                            </td>
                            <td>
                              {{ store.pergeseran[0].keluaran }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targetkeluaran }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td class="text-bold">
                              Hasil
                            </td>
                            <td>
                              {{ store.pergeseran[0].hasil }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targethasil }}
                            </td>
                            <td>
                              {{ store.pergeseran[0].hasil }}
                            </td>
                            <td class="text-right">
                              {{ store.pergeseran[0].targethasil }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="row b4 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-py-xs flex-center">
                        <div class="col-auto" style="width:150px">
                          <div class="q-py-xs" style="height: 35px">
                            SUB KEGIATAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            KEGIATAN BLUD
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            SUMBER PENDANAAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            WAKTU PELAKSANAAN
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col-auto">
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.01.2.10.0001 - Pelayanan dan Penunjang Pelayanan BLUD
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : {{ store.kegiatanblud }}
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : Pendapatan dari BLUD
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : Januari s/d Desember {{ store.reqs.tahun }}
                          </div>
                        </div>
                        <div class="q-px-md" />
                      </div>
                    </div>
                  </div>

                  <div class="row justify-between full-width full-height ">
                    <div class="row full-width" style="width:100%">
                      <table v-if="store.datarka?.length && store.reqs.jenisrka === '1'"
                        class="justify-center full-width">
                        <thead>
                          <tr class="text-bold text-center" style="height:50px">
                            <td class="text-center" style="width: 10%">KODE REKENING</td>
                            <td class="text-center" style="width: 30%">URAIAN</td>
                            <td class="text-center" style="width: 5%">VOLUME</td>
                            <td class="text-center" style="width: 5%">SATUAN</td>
                            <td class="text-center" style="width: 10%">HARGA</td>
                            <td class="text-center" style="width: 20%">PAGU</td>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="it in store.datarka" :key="it">
                            <tr>
                              <td class="text-bold text-left q-py-md"> {{ it.kode }} </td>
                              <td class="text-bold text-left q-py-md" colspan="4"> {{ it.uraian }} </td>
                              <td class="text-right text-bold">
                                <span class="row justify-between">
                                  <span class="col-auto flex-start">Rp. </span>
                                  <span class="flex-end text-right">
                                    {{ formattanpaRp(it.pagu) }}
                                  </span>
                                </span>
                              </td>
                            </tr>
                            <template v-for="rinci in it?.rincian" :key="rinci">
                              <tr>
                                <td>
                                  <span class="q-pl-sm q-py-sm">
                                    {{ rinci.kode108 }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    - {{ rinci.usulan }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.volume }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.satuan }}
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.harga) }}
                                    </span>
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.pagu) }}
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            </template>
                          </template>
                        </tbody>
                      </table>

                      <table v-else-if="store.reqs.jenisrka === '2'" class="justify-center full-width">
                        <thead>
                          <tr class="text-bold text-center" style="height:50px">
                            <td class="text-center" colspan="2">REKENING</td>
                            <td class="text-center" colspan="4">SEBELUM PERUBAHAN</td>
                            <td class="text-center" colspan="4">SESUDAH PERUBAHAN</td>
                            <td class="text-center" rowspan="2">SELISIH</td>
                          </tr>
                          <tr class="text-bold text-center" style="height:50px">
                            <td class="text-center">KODE</td>
                            <td class="text-center">URAIAN</td>
                            <td class="text-center">VOLUME</td>
                            <td class="text-center">SATUAN</td>
                            <td class="text-center">HARGA</td>
                            <td class="text-center">PAGU</td>
                            <td class="text-center">VOLUME</td>
                            <td class="text-center">SATUAN</td>
                            <td class="text-center">HARGA</td>
                            <td class="text-center">PAGU</td>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="it in store.datarkapergeseran" :key="it">
                            <tr>
                              <td class="text-bold text-left q-py-md"> {{ it.kode }} </td>
                              <td class="text-bold text-left q-py-md" colspan="4"> {{ it.uraian }} </td>
                              <td class="text-right text-bold">
                                <span class="row justify-between">
                                  <span class="col-auto flex-start">Rp. </span>
                                  <span class="flex-end text-right">
                                    {{ formattanpaRp(it.pagu) }}
                                  </span>
                                </span>
                              </td>
                              <td colspan="3"></td>
                              <td class="text-right text-bold">
                                <span class="row justify-between">
                                  <span class="col-auto flex-start">Rp. </span>
                                  <span class="flex-end text-right">
                                    {{ formattanpaRp(it.pagubaru) }}
                                  </span>
                                </span>
                              </td>
                              <td class="text-right text-bold">
                                <span class="flex-end text-right">
                                  {{ formatDenganRp(it.selisih) }}
                                </span>
                              </td>
                            </tr>
                            <template v-for="rinci in it?.rincian" :key="rinci">
                              <tr>
                                <td>
                                  <span class="q-pl-sm q-py-sm">
                                    {{ rinci.kode108 }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    - {{ rinci.usulan }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.volume }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.satuan }}
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.harga) }}
                                    </span>
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.pagu) }}
                                    </span>
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.volumebaru }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.satuan }}
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.hargabaru) }}
                                    </span>
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.pagubaru) }}
                                    </span>
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="flex-end text-right">
                                    {{ formatDenganRp(rinci.selisih) }}
                                  </span>
                                </td>
                              </tr>
                            </template>
                          </template>
                        </tbody>
                      </table>

                      <table v-else-if="store.reqs.jenisrka === '3'" class="justify-center full-width">
                        <thead>
                          <tr class="text-bold text-center" style="height:50px">
                            <td class="text-center" colspan="2">REKENING</td>
                            <td class="text-center" colspan="4">SEBELUM PERUBAHAN</td>
                            <td class="text-center" colspan="4">SESUDAH PERUBAHAN</td>
                            <td class="text-center" rowspan="2">SELISIH</td>
                          </tr>
                          <tr class="text-bold text-center" style="height:50px">
                            <td class="text-center">KODE</td>
                            <td class="text-center">URAIAN</td>
                            <td class="text-center">VOLUME</td>
                            <td class="text-center">SATUAN</td>
                            <td class="text-center">HARGA</td>
                            <td class="text-center">PAGU</td>
                            <td class="text-center">VOLUME</td>
                            <td class="text-center">SATUAN</td>
                            <td class="text-center">HARGA</td>
                            <td class="text-center">PAGU</td>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="it in store.datarkaperubahan" :key="it">
                            <tr>
                              <td class="text-bold text-left q-py-md"> {{ it.kode }} </td>
                              <td class="text-bold text-left q-py-md" colspan="4"> {{ it.uraian }} </td>
                              <td class="text-right text-bold">
                                <span class="row justify-between">
                                  <span class="col-auto flex-start">Rp. </span>
                                  <span class="flex-end text-right">
                                    {{ formattanpaRp(it.pagu) }}
                                  </span>
                                </span>
                              </td>
                              <td colspan="3"></td>
                              <td class="text-right text-bold">
                                <span class="row justify-between">
                                  <span class="col-auto flex-start">Rp. </span>
                                  <span class="flex-end text-right">
                                    {{ formattanpaRp(it.pagubaru) }}
                                  </span>
                                </span>
                              </td>
                              <td class="text-right text-bold">
                                <span class="flex-end text-right">
                                  {{ formatDenganRp(it.selisih) }}
                                </span>
                              </td>
                            </tr>
                            <template v-for="rinci in it?.rincian" :key="rinci">
                              <tr>
                                <td>
                                  <span class="q-pl-sm q-py-sm">
                                    {{ rinci.kode108 }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    - {{ rinci.usulan }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.volume }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.satuan }}
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.harga) }}
                                    </span>
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.pagu) }}
                                    </span>
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.volumebaru }}
                                  </span>
                                </td>
                                <td>
                                  <span class="q-py-sm">
                                    {{ rinci.satuan }}
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.hargabaru) }}
                                    </span>
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="row justify-between">
                                    <span class="col-auto flex-start">Rp. </span>
                                    <span class="flex-end text-right">
                                      {{ formattanpaRp(rinci.pagubaru) }}
                                    </span>
                                  </span>
                                </td>
                                <td class="text-right">
                                  <span class="flex-end text-right">
                                    {{ formatDenganRp(rinci.selisih) }}
                                  </span>
                                </td>
                              </tr>
                            </template>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="row b5 justify-between q-pt-xl q-pb-md full-width">
                    <div class="row q-pl-sm q-py-xs text-weight-bold" style="width:100%">
                      <div class="col text-center">
                        <div class="text-bold">
                          Pejabat Teknis Kegiatan
                        </div>
                        <div style="padding-bottom: 60px" />
                        <div class="underline text-bold q-py-xs">
                          {{ store.namapptk }}
                          <div class="garis-bawah" style="text-decoration-line: underline;" />
                        </div>
                        <div>
                          NIP. {{ store.kodepptk }}
                        </div>
                      </div>
                      <div class="col text-center" v-for="it in tt.ttd" :key="it">
                        <div class="text-bold">
                          Kuasa Pengguna Anggaran
                        </div>
                        <div style="padding-bottom: 60px" />
                        <div class="underline text-bold q-py-xs">
                          {{ it.nama }}
                          <div class="garis-bawah" style="text-decoration-line: underline;" />
                        </div>
                        <div>
                          NIP. {{ it.nip }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </div>
        </q-page-container>
        <q-footer elevated>
          <q-card-section class="q-pa-none bg-primary text-white">
            <div class="q-pa-md row justify-end items-end">
              <div class="items-end">
                <q-btn v-print="printObj" unelevated color="dark" round size="sm" icon="icon-mat-print">
                  <q-tooltip class="primary" :offset="[10, 10]">
                    Print
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-footer>
      </q-layout>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar'
import { onMounted, ref } from 'vue'

// eslint-disable-next-line no-unused-vars
import { useRkaStore } from 'src/stores/siasik/anggaran/storerka'
import { formatDenganRp, formatRpDouble, formattanpaRp } from 'src/modules/formatter'
import listDatapergeseran from '../inpage/ListDataRKApergeseran.vue'
import listData from '../inpage/ListDataRKA.vue'


const tt = useBukubesarStore()
const store = useRkaStore()
onMounted(() => {
  tt.getTtd()
  // store.getDataBukubesar()
})
const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Rencana Kerja dan Anggaran | SIASIK',
  beforeOpenCallback(vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback(vue) {
    console.log('opened')
  },
  closeCallback(vue) {
    printed.value = false
    console.log('closePrint')
  }
}

// const init = () => {
//   store.dataTersimpan()
// }
// const cetakNPD = ref(false)
// function hitungSubtotal () {
//   const arr = store.form.rincians
//   const obj = arr?.length ? arr.map((x) => x.nominalpembayaran) : []
//   const subtotal = obj.reduce((x, y) => x + y, 0)
//   // console.log('jumlah', obj)
//   // const total = nominal.reduce((x, y) => x + y, 0)
//   return subtotal
// }
</script>
<style>
.b {
  border-bottom-style: solid;
  border-width: 2px;
}

.b1 {
  border-style: solid;
  border-width: 2px;
}

.b2 {
  border-right-style: solid;
  border-width: 2px;
}

.b3 {
  border-bottom-style: solid;
  border-width: 2px;
}

.b4 {
  border-right-style: solid;
  border-left-style: solid;
  border-width: 2px;
}

.b5 {
  border-right-style: solid;
  border-left-style: solid;
  border-bottom-style: solid;
  border-width: 2px;
}

.b6 {
  border-right-style: solid;
  border-left-style: solid;
  border-top-style: solid;
  border-width: 2px;
}

table,
thead,
th,
td {
  border-width: 2px;
  border-style: solid;
  border-collapse: collapse;
  border-right-style: solid;
  border-left-style: solid;
}

td {
  height: 35px;
  max-height: 50px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
