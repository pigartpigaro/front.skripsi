

let allChunks = []

self.onmessage = function (e) {
  const { chunks, jenisLaporan, isLastChunk } = e.data

  // Akumulasi chunks dari setiap halaman
  allChunks.push(...chunks)

  // Hanya proses jika ini adalah chunk terakhir
  if (isLastChunk) {
    let processed = 0
    const total = allChunks.reduce((acc, chunk) => acc + chunk?.length, 0)

    const processedData = []
    const unProcessedData = []

    allChunks.forEach((chunk, i) => {
      // Simpan data mentah
      unProcessedData.push(...chunk)

      chunk.forEach(item => {
        if (jenisLaporan === 'Generik') {
          if (item?.permintaanresep) {
            processedData.push(...processResep(item))
          }
          if (item?.permintaanracikan) {
            processedData.push(...processRacikan(item))
          }
        } else if (jenisLaporan === 'Response Time') {
          processedData.push(...processResponseTime(item))
        } else {
          if (item.permintaanresep) {
            processedData.push(...processKesesuaian(item))
          }
          if (item?.permintaanracikan) {
            processedData.push(...processKesesuaianRacikan(item))
          }
        }
        processed++
        if (processed % 100 === 0) {
          self.postMessage({
            type: 'progress',
            progress: Math.round((processed / total) * 100),
            current: processed,
            total
          })
        }
      })
    })

    self.postMessage({ type: 'complete', processedData, unProcessedData })
    // Reset allChunks untuk request berikutnya
    allChunks = []
  }
}
function processResponseTime (data) {

  const results = []
  results.push(createDataResposeTime(data))
  return results
}
function createDataResposeTime (item) {

  const keys = Object.keys(item)
  const obat = keys.find(k => k === 'noresep')

  if (!obat) {
    return {
      no_permintaan: item.no_permintaan,
      tgl: item.tgl_permintaan,
      tgl_kirim: item.tgl_kirim,
      tgl_terima: item.tgl_terima,
      tgl_kirim_depo: item.tgl_kirim_depo, // tanggal gudang mengrim ke depo
      tgl_selesai: item.tgl_terima_depo,
      dari: item.dari,
      menit: item.tt_menit,
      unit: item?.ruangan?.nama ?? item?.asal?.nama
    }
  }
  else {
    const adaRacikan = item.rincianracik?.filter(k => k.jumlah > 0)
    return {
      noresep: item.noresep,
      tgl: item.tgl_permintaan,
      tgl_kirim: item.tgl_kirim,
      tgl_selesai: item.tgl_selesai,
      tgl_diterima: item.tgl_diterima,
      menit: item.rt_menit,
      jenis: adaRacikan?.length > 0 ? 'Racikan' : 'Obat Jadi',
      sistembayar: item.sistembayar?.rs2,
      ruang: item?.poli?.nama ?? item?.ruanganranap?.nama,
      dokter: item?.ketdokter?.nama,
    }
  }
}

function processKesesuaian (data) {

  const results = []
  data.permintaanresep.forEach(item => {
    const obat = item?.mobat
    if (!(obat?.jenis_perbekalan == 'Alkes Habis Pakai' || obat?.obat_kebijakan == '1')) {
      // console.log('obat', obat)
      const keluar = data?.rincian?.filter(k => k.kdobat === item.kdobat)
      const depo = data.depo
      results.push(createDataKesesuaian(item, keluar, data, depo))
    }
    // else {
    //   const keluar = data?.rincian?.filter(k => k.kdobat === item.kdobat)
    //   const depo = data.depo
    //   results.push(createDataKesesuaian(item, keluar, data, depo))
    // }
  })
  // console.log('results', results)

  return results
}

function processKesesuaianRacikan (data) {
  const results = []
  data.permintaanracikan.forEach(item => {
    const obat = item?.mobat
    if (!(obat?.jenis_perbekalan == 'Alkes Habis Pakai' || obat?.obat_kebijakan == '1')) {
      // console.log('obat', obat)
      const keluar = data?.rincianracik?.filter(k => k.kdobat === item.kdobat)
      const depo = data.depo

      // Cek apakah item sudah ada di results
      const existingIndex = results.findIndex(
        r => r.kdobat === item.kdobat && r.noresep === data.noresep
      )

      if (existingIndex >= 0) {
        // Update existing item
        const jumKel = keluar?.reduce((acc, curr) => acc + curr.jumlah, 0) || 0
        results[existingIndex].jumlah_resep += item.jumlah
        results[existingIndex].jumlah_dilayani += jumKel
        results[existingIndex].adaRacikan = 'ada racikan'
      } else {
        // Add new item
        results.push({
          ...createDataKesesuaian(item, keluar, data, depo),
          adaRacikan: 'ada racikan'
        })
      }
    }
    // else {
    // const keluar = data?.rincianracik?.filter(k => k.kdobat === item.kdobat)
    // const depo = data.depo

    // // Cek apakah item sudah ada di results
    // const existingIndex = results.findIndex(
    //   r => r.kdobat === item.kdobat && r.noresep === data.noresep
    // )

    // if (existingIndex >= 0) {
    //   // Update existing item
    //   const jumKel = keluar?.reduce((acc, curr) => acc + curr.jumlah, 0) || 0
    //   results[existingIndex].jumlah_resep += item.jumlah
    //   results[existingIndex].jumlah_dilayani += jumKel
    //   results[existingIndex].adaRacikan = 'ada racikan'
    // } else {
    //   // Add new item
    //   results.push({
    //     ...createDataKesesuaian(item, keluar, data, depo),
    //     adaRacikan: 'ada racikan'
    //   })
    // }

    // }
  })
  return results
}
function createDataKesesuaian (item, keluar, data, depo) {

  return {
    tgl: data?.tgl_permintaan,
    nomor: item.noresep,
    fornas: item?.mobat.status_fornas,
    generik: item?.mobat.status_generik,
    forkit: item?.mobat.status_forkid,
    kebijakan: item?.mobat.obat_kebijakan,
    perbekalan: item?.mobat.jenis_perbekalan,
    nama_obat: item?.mobat.nama_obat,
    ruang: data?.poli?.nama ?? data?.ruanganranap?.nama,
    poli: data?.poli ?? null,
    ranap: data?.ruanganranap ?? null,
    dokter: data?.ketdokter?.nama,
    depo: depo,
    jumlah_resep: item.jumlah,
    jumlah_dilayani: keluar?.reduce((acc, curr) => acc + curr.jumlah, 0) || 0,
  }
}
function processResep (data) {
  const results = []
  data.permintaanresep.forEach(item => {
    const keluar = data?.rincian?.filter(k => k.kdobat === item.kdobat)
    const depo = data.depo
    results.push(createDataObject(item, keluar, data, depo))
  })
  return results
}

function processRacikan (data) {
  const results = []
  data.permintaanracikan.forEach(item => {
    const keluar = data?.rincianracik?.filter(k => k.kdobat === item.kdobat)
    const depo = data.depo

    // Cek apakah item sudah ada di results
    const existingIndex = results.findIndex(
      r => r.kdobat === item.kdobat && r.noresep === data.noresep
    )

    if (existingIndex >= 0) {
      // Update existing item
      const jumKel = keluar?.reduce((acc, curr) => acc + curr.jumlah, 0) || 0
      results[existingIndex].jumlah_resep += item.jumlah
      results[existingIndex].jumlah_dilayani += jumKel
      results[existingIndex].adaRacikan = 'ada racikan'
    } else {
      // Add new item
      results.push({
        ...createDataObject(item, keluar, data, depo),
        adaRacikan: 'ada racikan'
      })
    }
  })
  return results
}

function createDataObject (item, keluar, data, depo) {
  return {
    noresep: item.noresep,
    tgl: data.tgl_permintaan,
    jumlah_resep: item.jumlah,
    jumlah_dilayani: keluar?.reduce((acc, curr) => acc + curr.jumlah, 0) || 0,
    kdobat: item.kdobat,
    kelompok: item?.mobat?.kelompok_penyimpanan,
    perbekalan: item?.mobat?.jenis_perbekalan,
    nama_obat: item?.mobat?.nama_obat,
    generik: item?.mobat?.status_generik == '1' ? 'Generik' : '',
    status_generik: item?.mobat?.status_generik,
    fornas: item?.mobat?.status_fornas == '1' ? 'Fornas' : '',
    status_fornas: item?.mobat?.status_fornas,
    forkit: item?.mobat?.status_forkid == '1' ? 'Forkit' : '',
    status_forkit: item?.mobat?.status_forkid,
    obat_program: item?.mobat?.obat_program,
    depo: depo,
    nama_dokter: data?.ketdokter?.nama,
    kode_sistembayar: data?.sistembayar?.rs1,
    nama_sistembayar: data?.sistembayar?.rs2
  }
}
