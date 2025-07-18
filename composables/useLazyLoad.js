import { ref, onMounted, onUnmounted } from 'vue'

export const useLazyLoad = (options = {}) => {
  const elements = ref([])
  const observedElements = ref(new Map())
  
  const defaultOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1,
    ...options
  }
  
  const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target
        
        // Add visible class to trigger animation
        element.classList.add('visible')
        
        // If there's a callback stored for this element, execute it
        const callback = observedElements.value.get(element)
        if (callback) {
          callback(element)
        }
        
        // Stop observing this element
        observer.unobserve(element)
        observedElements.value.delete(element)
      }
    })
  }
  
  let observer = null
  
  onMounted(() => {
    if (process.client) {
      observer = new IntersectionObserver(onIntersect, defaultOptions)
      
      // Observe all elements with the scroll-animate class
      document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el)
        elements.value.push(el)
      })
    }
  })
  
  onUnmounted(() => {
    if (process.client && observer) {
      observer.disconnect()
    }
  })
  
  // Function to observe a new element
  const observe = (element, callback = null) => {
    if (process.client && observer && element) {
      observer.observe(element)
      if (callback) {
        observedElements.value.set(element, callback)
      }
      elements.value.push(element)
    }
  }
  
  // Function to check for new elements that might have been added to the DOM
  const checkElements = () => {
    if (process.client && observer) {
      document.querySelectorAll('.scroll-animate:not(.visible)').forEach(el => {
        if (!elements.value.includes(el)) {
          observer.observe(el)
          elements.value.push(el)
        }
      })
    }
  }
  
  return {
    observe,
    checkElements,
    elements
  }
}