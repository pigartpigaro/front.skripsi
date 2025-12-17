import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals'

// Buat object global untuk kontrol performance monitoring
window.$performance = {
  enabled: false,
  observer: null,
  webVitalsObservers: [],

  start() {
    if (this.enabled) {
      console.log('Performance monitoring sudah berjalan')
      return
    }

    this.enabled = true

    // Monitor Core Web Vitals
    const vitalsCallback = ({ name, value, id }) => {
      console.log(`${name}: ${value} (ID: ${id})`)
    }

    // Simpan fungsi unsubscribe yang dikembalikan oleh web-vitals
    this.webVitalsObservers = []

    // Daftar web vitals yang akan dimonitor
    const vitals = [
      { fn: onCLS, name: 'CLS' },
      { fn: onFID, name: 'FID' },
      { fn: onFCP, name: 'FCP' },
      { fn: onLCP, name: 'LCP' },
      { fn: onTTFB, name: 'TTFB' }
    ]

    // Jalankan monitoring untuk setiap vital
    vitals.forEach(vital => {
      try {
        const unsubscribe = vital.fn(vitalsCallback)
        if (typeof unsubscribe === 'function') {
          this.webVitalsObservers.push(unsubscribe)
        }
      } catch (error) {
        console.warn(`Gagal memulai monitoring untuk ${vital.name}:`, error)
      }
    })

    // Performance Observer untuk metrics tambahan
    if ('PerformanceObserver' in window) {
      try {
        this.observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log('Performance Entry:', {
              name: entry.name,
              type: entry.entryType,
              startTime: entry.startTime,
              duration: entry.duration,
              ...entry.toJSON()
            })
          })
        })

        this.observer.observe({
          entryTypes: [
            'navigation',
            'resource',
            'paint',
            'largest-contentful-paint',
            'layout-shift',
            'first-input',
            'longtask'
          ]
        })
      } catch (error) {
        console.warn('Gagal memulai PerformanceObserver:', error)
      }
    }

    console.log('Performance monitoring dimulai')
  },

  stop() {
    if (!this.enabled) {
      console.log('Performance monitoring tidak aktif')
      return
    }

    // Hentikan web vitals observers
    if (Array.isArray(this.webVitalsObservers)) {
      this.webVitalsObservers.forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          try {
            unsubscribe()
          } catch (error) {
            console.warn('Gagal menghentikan web vital observer:', error)
          }
        }
      })
    }
    this.webVitalsObservers = []

    // Hentikan performance observer
    if (this.observer) {
      try {
        this.observer.disconnect()
        this.observer = null
      } catch (error) {
        console.warn('Gagal menghentikan PerformanceObserver:', error)
      }
    }

    this.enabled = false
    console.log('Performance monitoring dihentikan')
  },

  status() {
    console.log(`Performance monitoring status: ${this.enabled ? 'Aktif' : 'Tidak aktif'}`)
  }
}

// Boot plugin tidak perlu menjalankan monitoring otomatis
export default () => {
  // Kosong, karena monitoring akan dijalankan manual
}
