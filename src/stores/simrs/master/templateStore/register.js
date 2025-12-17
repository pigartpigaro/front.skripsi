import { createTemplateMasterStore } from "./useTemplateMasterStore.js";


// PEGAWAI
export const useMasterJabatanStore = createTemplateMasterStore('jabatan', {
  baseUrl: '/v1/simrs/master/pegawai/jabatan',
  columns: ['kode_jabatan', 'jabatan'], // ini isi column table (untuk pertama kali)
  columnHide: [],
  persist: false
})
export const useMasterPegawaiStore = createTemplateMasterStore('pegawai', {
  baseUrl: '/v1/simrs/master/pegawai/pegawai',
  columns: [
    'nip',
    'nik',
    'nama',
    'alamat',
    'kelamin',
    'templahir',
    'tgllahir',
    'telp',
    'email',

    'aktif',
    'jabatan',
    'statusspesialis',
    // 'kdgroupnakes',
    // 'kddpjp',
    // 'kdruangansim',
    // 'satset_uuid',
    // 'id', 'created_at', 'updated_at', 'deleted_at',
    // 'jenispegawai', 'flag', 'profesi',
    // 'golruang',
    // 'pendidikan', 'foto',
    // 'bagian',
    // 'ruang',
    // 'tgl_masuk',
    // 'tgl_tmt',
    // 'kategoripegawai',
    // 'alamat_detil',
    // 'rt',
    // 'rw',
    // 'kelurahan',
    // 'kecamatan',
    // 'kota',
    // 'agama',
    // 'tmt_cpns',
    // 'gaji_total',
    // 'gaji_pokok',
    // 'kel_ttg',
    // 'th_mk_tmb',
    // 'bln_mk_tmb',
    // 'jurusan',
    // 'kode_ruang',
    // 'ttdpegawai'
  ],
  // ini isi column table (untuk pertama kali),
  columnHide: [],
  persist: false
})





// FARMASI
export const useMasterObatStore = createTemplateMasterStore('obat', {
  baseUrl: '/v1/simrs/master/farmasi',
  columns: [
    // 'kd_obat',
    // 'barcode',
    // 'nama_obat',
    // 'merk',
    // 'kandungan',
    // 'bentuk_sediaan',
    // 'volumesediaan',

    // 'satuan_b',
    // 'satuan_k',
    // 'kelompok_psikotropika',
    // 'kelompok_rko',
    // 'status_generik',
    // 'status_forkid',
    // 'status_fornas',
    // 'status_kronis',
    // 'status_prb',
    // 'status_konsinyasi',
    // 'keterangan_kronis',
    // 'kekuatan_dosis',
    // 'kelas_terapi',
    // 'obat_program',
    // 'obat_donasi',
    // 'obat_kebijakan',
    // 'jenis_perbekalan',
    // 'sistembayar',
    // 'kode108',
    // 'uraian108',
    // 'kode50',
    // 'uraian50',

    'nama',
    'sediaan',
    'kelompok',
    'belanja',
    'status',
    'satuan'

  ],
  columnHide: [],
  persist: false
})





// POLI
export const useMasterPoliklinikRuanganStore = createTemplateMasterStore('poliklinik-ruangan', {
  baseUrl: '/v1/simrs/master/poliklinik/ruangan',
  primary: 'rs1',
  columns: [
    'rs1',
    'rs2',
    'rs3',
    'rs4',
    // 'rs5',
    // 'rs6',
    // 'rs7',
    'panggil_antrian',
  ],
  columnHide: [],
  persist: false
})
