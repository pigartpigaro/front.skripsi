export default ({ app }) => {
  app.config.errorHandler = (err, vm, info) => {
    console.error('Vue Error:', {
      error: err,
      component: vm?.$options?.name || 'Unknown',
      info,
      timestamp: new Date().toISOString(),
      url: window.location.href
    })
    
    // Kirim error ke backend
    reportError({
      type: 'vue',
      error: err.message,
      stack: err.stack,
      component: vm?.$options?.name,
      info
    })
  }

  // Global error handler
  window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Global Error:', {
      message: msg,
      url,
      lineNo,
      columnNo,
      error: error?.stack,
      timestamp: new Date().toISOString()
    })
    
    return false
  }

  // Unhandled promise rejection handler
  window.onunhandledrejection = function(event) {
    console.error('Unhandled Promise Rejection:', {
      reason: event.reason,
      timestamp: new Date().toISOString()
    })
  }
}