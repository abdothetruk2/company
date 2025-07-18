export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll-animate', {
    mounted(el, binding) {
      // Add the scroll-animate class to the element
      el.classList.add('scroll-animate')
      
      // Add any custom classes from the directive value
      if (binding.value && typeof binding.value === 'string') {
        el.dataset.animationClass = binding.value
      }
      
      // Add delay if specified in the modifiers
      if (binding.modifiers.delay) {
        el.style.transitionDelay = `${binding.modifiers.delay * 0.1}s`
      }
      
      // Add custom duration if specified
      if (binding.modifiers.fast) {
        el.style.transitionDuration = '0.4s'
      } else if (binding.modifiers.slow) {
        el.style.transitionDuration = '1.2s'
      }
      
      // Initialize intersection observer for this element
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add visible class to trigger animation
            el.classList.add('visible')
            // Stop observing once animation is triggered
            observer.unobserve(el)
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before element comes into view
      })
      
      observer.observe(el)
    }
  })
})