import { inject } from 'vue'

export const usePageLoader = () => {
  const startPageLoading = inject('startPageLoading', () => {
    // Fallback if not provided
    if (process.client &amp;&amp; window.$startPageLoading) {
      window.$startPageLoading()
    }
  })
  
  const stopPageLoading = inject('stopPageLoading', () => {
    // Fallback if not provided
    if (process.client &amp;&amp; window.$stopPageLoading) {
      window.$stopPageLoading()
    }
  })
  
  // Helper for async operations
  const withLoading = async (asyncFn) => {
    startPageLoading()
    try {
      return await asyncFn()
    } finally {
      stopPageLoading()
    }
  }
  
  return {
    startLoading: startPageLoading,
    stopLoading: stopPageLoading,
    withLoading
  }
}