export default defineNuxtPlugin((nuxtApp) => {
  // Create loader elements
  const createLoaderElements = () => {
    // Create progress bar
    const progressBar = document.createElement('div')
    progressBar.className = 'page-loader'
    document.body.appendChild(progressBar)
    
    // Create overlay loader
    const overlay = document.createElement('div')
    overlay.className = 'page-loader-overlay'
    
    const spinner = document.createElement('div')
    spinner.className = 'page-loader-spinner'
    
    const text = document.createElement('div')
    text.className = 'page-loader-text'
    text.textContent = 'Loading...'
    
    const fancyLoader = document.createElement('div')
    fancyLoader.className = 'fancy-loader'
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div')
      fancyLoader.appendChild(dot)
    }
    
    overlay.appendChild(spinner)
    overlay.appendChild(text)
    overlay.appendChild(fancyLoader)
    document.body.appendChild(overlay)
    
    return { progressBar, overlay }
  }
  
  // Initialize loaders
  const { progressBar, overlay } = createLoaderElements()
  
  // Track loading state
  let isLoading = false
  let loadingTimeout = null
  
  // Start loading animation
  const startLoading = () => {
    if (isLoading) return
    isLoading = true
    
    // Show progress bar immediately
    progressBar.classList.add('loading')
    
    // Show overlay after a short delay (only for longer loads)
    loadingTimeout = setTimeout(() => {
      overlay.classList.add('visible')
    }, 300) // Show overlay if loading takes more than 300ms
  }
  
  // Stop loading animation
  const stopLoading = () => {
    if (!isLoading) return
    isLoading = false
    
    // Clear timeout to prevent overlay from showing if loading was quick
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
      loadingTimeout = null
    }
    
    // Hide progress bar
    progressBar.classList.remove('loading')
    
    // Hide overlay with a slight delay for smoother transition
    overlay.classList.remove('visible')
  }
  
  // Hook into Nuxt page lifecycle
  nuxtApp.hook('page:start', () => {
    startLoading()
  })
  
  nuxtApp.hook('page:finish', () => {
    stopLoading()
  })
  
  nuxtApp.hook('app:error', () => {
    stopLoading()
  })
  
  // Expose functions to the app
  return {
    provide: {
      startPageLoading: startLoading,
      stopPageLoading: stopLoading
    }
  }
})