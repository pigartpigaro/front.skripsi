// Buat object global untuk kontrol monitoring
window.$monitoring = {
  enabled: false,
  intervalId: null,

  start(interval = 5000) {
    if (this.intervalId) {
      console.log('Monitoring sudah berjalan')
      return
    }

    this.enabled = true
    this.intervalId = setInterval(() => {
      if (!performance.memory) {
        console.log('Browser tidak mendukung memory monitoring')
        this.stop()
        return
      }

      const memoryInfo = {
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        timestamp: new Date().toISOString()
      }

      console.log('Memory Usage:', {
        usage: `${((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100).toFixed(2)}%`,
        used: `${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        total: `${(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        limit: `${(memoryInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
      })
    }, interval)

    console.log(`Memory monitoring dimulai (interval: ${interval}ms)`)
  },

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
      this.enabled = false
      console.log('Memory monitoring dihentikan')
    }
  },

  status() {
    console.log(`Monitoring status: ${this.enabled ? 'Aktif' : 'Tidak aktif'}`)
  }
}

// Boot plugin tidak perlu menjalankan monitoring otomatis
export default () => {
  // Kosong, karena monitoring akan dijalankan manual
}
