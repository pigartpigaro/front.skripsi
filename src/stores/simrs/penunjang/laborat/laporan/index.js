import { acceptHMRUpdate, defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import * as XLSX from 'xlsx'

export const useLaporanLaboratStore = defineStore('laporan_laborat', {
  state: () => ({
    loading: false,
    loadingDownload: false,
    items: [],
    groupedItems: {},
    rawData: [], // Data mentah dari API
    dailyTotals: {}, // Total per tanggal
    processedData: {}, // Data yang telah diproses
    grandTotal: {
      laki: 0,
      perempuan: 0,
      total: 0
    },
    reportMetadata: {
      title: 'Formulir RL 3.8 Rekapitulasi Kegiatan Pelayanan Laboratorium',
      description: 'Formulir rekapitulasi Kegiatan Pelayanan Laboratorium dilaporkan bulanan dengan data yang bersumber dari Unit Laboratorium rumah sakit.',
      columns: {
        examination: 'Pemeriksaan',
        dailyCount: 'Jumlah Pemeriksaan'
      }
    },
    params: {
      from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenis_pasien: 'all',
      ruangan: 'all'
    },
    display: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    }
  }),
  actions: {

    setPeriod(period) {
      this.params.from = period.from
      this.params.to = period.to
      this.display.from = date.formatDate(period.from, 'DD MMMM YYYY')
      this.display.to = date.formatDate(period.to, 'DD MMMM YYYY')
      this.getData()
    },

    async getMaster() {
      try {
        this.loading = true
        const { data } = await api.get('/v1/simrs/penunjang/laborat/masterlaborat')
        this.items = data
        this.groupedItems = this.groupByJenisAndGruper(data)
        console.log('this.groupedItems', this.groupedItems)
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    groupByJenisAndGruper(data) {
      // First, group by jenislab
      const groupedByJenis = data.reduce((acc, item) => {
        const jenislab = item.jenislab || 'Uncategorized'
        if (!acc[jenislab]) {
          acc[jenislab] = []
        }
        acc[jenislab].push(item)
        return acc
      }, {})

      // Then, for each jenislab group, group by gruper
      const result = Object.keys(groupedByJenis).reduce((acc, jenislab) => {
        const items = groupedByJenis[jenislab]

        // Group items by gruper
        const groupedByGruper = items.reduce((grupAcc, item) => {
          const gruper = item.gruper || 'Uncategorized'
          if (!grupAcc[gruper]) {
            grupAcc[gruper] = []
          }
          grupAcc[gruper].push(item)
          return grupAcc
        }, {})

        acc[jenislab] = groupedByGruper
        return acc
      }, {})

      return result
    },

    async getData() {
      try {
        this.loading = true
        const params = { params: this.params }
        const { data } = await api.get('/v1/simrs/penunjang/laborat/pemeriksaan-by-gender', params)
        // console.log('data', data);
        this.rawData = data?.data
        this.processData(data?.data)
        // console.log('items', this.processedData);
        // console.log('item', this.processedData['LAB028']);
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async downloadExcel(filename) {
      try {
        this.loadingDownload = true

        // Prepare headers - 2 rows
        const headers = [
          // First row
          ['NO', 'PEMERIKSAAN', ...Array(31).fill(null).map((_, i) => [i + 1, '']).flat(), 'Total'],
          // Second row
          ['', '', ...Array(31).fill(['L', 'P']).flat(), '']
        ]

        // Prepare data rows using the same formatting as TableComp
        const rows = []
        let categoryIndex = 65 // ASCII 'A'

        const categoryMapping = {
          'PK': 'PATOLOGI KLINIK',
          'PA': 'PATOLOGI ANATOMI',
          'Uncategorized': 'Uncategorized'
        }

        const desiredOrder = ['PK', 'PA', 'Uncategorized']

        // Sort and format data similar to formattedData in TableComp
        const sortedEntries = Object.entries(this.groupedItems).sort(([a], [b]) => {
          const indexA = desiredOrder.indexOf(a)
          const indexB = desiredOrder.indexOf(b)
          return indexA - indexB
        })

        sortedEntries.forEach(([category, subcategories]) => {
          const categoryCode = String.fromCharCode(categoryIndex)

          // Add category row
          rows.push({
            no: categoryCode,
            name: categoryMapping[category] || category,
            isCategory: true
          })

          let subIndex = 1

          const sortedSubcategories = Object.entries(subcategories).sort(([a, _], [b, __]) => {
            if (category === 'PK') {
              if (a === 'Uncategorized') return 1
              if (b === 'Uncategorized') return -1
            }
            return a.localeCompare(b)
          })

          sortedSubcategories.forEach(([subcategory, items]) => {
            const subCategoryCode = `${subIndex}`

            // Add subcategory row
            rows.push({
              no: subCategoryCode,
              name: subcategory,
              isCategory: true
            })

            // Add items
            items.forEach((item, itemIndex) => {
              const itemCode = `${subCategoryCode}.${itemIndex + 1}`
              const row = {
                no: itemCode,
                name: item.pemeriksaan,
                isCategory: false,
                kode: item.kode
              }

              // Add daily counts
              for (let i = 1; i <= 31; i++) {
                const formattedIndex = i < 10 ? `0${i}` : `${i}`
                const month = date.formatDate(new Date(this.params.from), 'MM')
                const year = date.formatDate(new Date(this.params.from), 'YYYY')
                const dateKey = `${year}-${month}-${formattedIndex}`

                row[`day${i}L`] = this.processedData[item.kode]?.dates[dateKey]?.laki || ''
                row[`day${i}P`] = this.processedData[item.kode]?.dates[dateKey]?.perempuan || ''
              }

              // Add total
              row.total = this.processedData[item.kode]?.total?.total || 0

              rows.push(row)
            })

            subIndex++
          })

          categoryIndex++
        })

        // Convert rows to Excel format
        const excelRows = rows.map(row => {
          const baseRow = [row.no, row.name]

          // Add daily data
          for (let i = 1; i <= 31; i++) {
            baseRow.push(row.isCategory ? '' : (row[`day${i}L`] || ''))
            baseRow.push(row.isCategory ? '' : (row[`day${i}P`] || ''))
          }

          // Add total
          baseRow.push(row.isCategory ? '' : (row.total || ''))

          return baseRow
        })

        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet([...headers, ...excelRows])

        // Style configuration
        const range = XLSX.utils.decode_range(ws['!ref'])

        // Apply styles
        for (let R = 0; R <= range.e.r; R++) {
          for (let C = 0; C <= range.e.c; C++) {
            const cell_address = XLSX.utils.encode_cell({ r: R, c: C })
            if (!ws[cell_address]) continue

            // Add cell style
            ws[cell_address].s = {
              border: {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              },
              alignment: {
                vertical: 'center',
                horizontal: C <= 1 ? 'left' : 'center'
              }
            }

            // Header styles
            if (R < 2) {
              ws[cell_address].s.font = { bold: true }
              ws[cell_address].s.fill = {
                fgColor: { rgb: "FFFFFF" },
                patternType: 'solid'
              }
            }

            // Category row styles
            if (R >= 2 && rows[R - 2]?.isCategory) {
              ws[cell_address].s.fill = {
                fgColor: { rgb: "F5F5F5" },
                patternType: 'solid'
              }
              ws[cell_address].s.font = { bold: true }
            }
          }
        }

        // Set column widths
        ws['!cols'] = [
          { wch: 8 },  // NO
          { wch: 40 }, // PEMERIKSAAN
          ...Array(62).fill({ wch: 5 }), // L/P columns
          { wch: 10 }  // Total
        ]

        // Merge cells for date headers
        for (let i = 0; i < 31; i++) {
          const startCol = XLSX.utils.encode_col(2 + (i * 2))
          const endCol = XLSX.utils.encode_col(3 + (i * 2))
          ws['!merges'] = ws['!merges'] || []
          ws['!merges'].push({
            s: { r: 0, c: 2 + (i * 2) },
            e: { r: 0, c: 3 + (i * 2) }
          })
        }

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Laporan Laborat')

        // Save file
        XLSX.writeFile(wb, filename)
      } catch (error) {
        console.error('Download failed:', error)
        throw error
      } finally {
        this.loadingDownload = false
      }
    },
    resetParams() {
      this.params = {
        q: '',
        page: 1,
        per_page: 10,
        from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        jenis_pasien: 'all',
        ruangan: 'all'
      }
      this.display = {
        from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
        to: date.formatDate(Date.now(), 'DD MMMM YYYY')
      }
    },


    processData(raw) {
      // Reset data
      this.processedData = {}
      this.dailyTotals = {}
      this.grandTotal = { laki: 0, perempuan: 0, total: 0 }

      raw.forEach(item => {
        const key = item.kode
        const tanggal = item.tgl_order

        // Initialize if not exists
        if (!this.processedData[key]) {
          this.processedData[key] = {
            kode: item.kode,
            nama_pemeriksaan: item.nama_pemeriksaan,
            dates: {},
            total: {
              laki: 0,
              perempuan: 0,
              total: 0
            }
          }
        }




        if (!this.dailyTotals[tanggal]) {
          this.dailyTotals[tanggal] = {
            laki: 0,
            perempuan: 0,
            total: 0
          }
        }

        //   // Update data per pemeriksaan
        if (!this.processedData[key].dates[tanggal]) {
          this.processedData[key].dates[tanggal] = {
            laki: item.total_laki,
            perempuan: item.total_perempuan,
            total: item.total
          }
        }

        //   // Update totals for this pemeriksaan
        this.processedData[key].total.laki += item.total_laki
        this.processedData[key].total.perempuan += item.total_perempuan
        this.processedData[key].total.total += item.total

        //   // Update daily totals
        this.dailyTotals[tanggal].laki += item.total_laki
        this.dailyTotals[tanggal].perempuan += item.total_perempuan
        this.dailyTotals[tanggal].total += item.total

        //   // Update grand totals
        this.grandTotal.laki += item.total_laki
        this.grandTotal.perempuan += item.total_perempuan
        this.grandTotal.total += item.total
        // })

        // console.log('this.processedData', this.processedData)
        // console.log('this.dailyTotals', this.dailyTotals)
        // console.log('this.rawData', this.rawData)
      })
      // this.processedData = this.processedData
    },
    getDatesInRange() {
      const dates = []
      let currentDate = new Date(this.params.from)
      const endDate = new Date(this.params.to)

      while (currentDate <= endDate) {
        dates.push(date.formatDate(currentDate, 'YYYY-MM-DD'))
        currentDate = date.addToDate(currentDate, { days: 1 })
      }

      console.log('dates', dates)

      return dates
    },

    getMonthAndYear() {
      const from = new Date(this.params.from)
      const to = new Date(this.params.to)

      const month = from.getMonth() + 1
      const year = from.getFullYear()

      return { month, year }
    },

    getDataForTable() {
      return Object.values(this.processedData).map(item => ({
        kode: item.kode,
        nama_pemeriksaan: item.nama_pemeriksaan,
        ...item.total
      }))
    }

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLaporanLaboratStore, import.meta.hot))
}
