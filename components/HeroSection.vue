<template>
  <section class="relative bg-gradient-to-br from-primary-50 to-secondary-50 pt-16 pb-20 overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 animate-float"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-200 rounded-full opacity-20 animate-float-delayed"></div>
      <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-accent-200 rounded-full opacity-10 animate-pulse-slow"></div>
      <div class="absolute top-1/4 right-1/3 w-24 h-24 bg-primary-300 rounded-full opacity-15 animate-bounce-gentle"></div>
    </div>

    <!-- Floating Icons -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 animate-float-icon">
        <div class="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      </div>
      <div class="absolute top-32 right-20 animate-float-icon-delayed">
        <div class="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        </div>
      </div>
      <div class="absolute bottom-32 left-1/4 animate-float-icon">
        <div class="w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Animated Title -->
        <div class="mb-6">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
            <span class="inline-block animate-slide-up" style="animation-delay: 0.1s;">Discover</span>
            <span class="inline-block animate-slide-up" style="animation-delay: 0.2s;"> Your</span>
            <span class="inline-block animate-slide-up" style="animation-delay: 0.3s;"> Career</span>
            <span class="inline-block animate-slide-up" style="animation-delay: 0.4s;"> Fit</span>
          </h1>
          <h1 class="text-4xl md:text-6xl font-bold mb-2">
            <span class="inline-block text-primary-600 animate-slide-up" style="animation-delay: 0.5s;">or</span>
            <span class="inline-block text-primary-600 animate-slide-up" style="animation-delay: 0.6s;"> Hire</span>
            <span class="inline-block text-primary-600 animate-slide-up" style="animation-delay: 0.7s;"> Smarter</span>
          </h1>
          <div class="text-2xl md:text-3xl text-gray-600 animate-slide-up" style="animation-delay: 0.8s;">
            — with <span class="font-bold text-primary-600">ProGrowth</span>
          </div>
        </div>

        <!-- Enhanced Description -->
        <div class="animate-slide-up" style="animation-delay: 0.9s;">
          <p class="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Advanced career assessments and smart hiring solutions to match the right talent with the right opportunities
          </p>
          <div class="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-12">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></div>
              <span>AI-Powered Matching</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-secondary-500 rounded-full mr-2 animate-pulse" style="animation-delay: 0.5s;"></div>
              <span>95% Accuracy Rate</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse" style="animation-delay: 1s;"></div>
              <span>50,000+ Success Stories</span>
            </div>
          </div>
        </div>

        <!-- Enhanced Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up" style="animation-delay: 1s;">
          <NuxtLink 
            to="/register/individual" 
            class="group relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[280px] overflow-hidden"
          >
            <!-- Button Background Animation -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div class="relative flex items-center justify-center">
              <svg class="w-6 h-6 mr-3 group-hover:animate-bounce transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>I'm an Individual</span>
            </div>
            <div class="text-sm text-primary-100 mt-1 relative">Student or career developer</div>
            
            <!-- Ripple Effect -->
            <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute inset-0 rounded-xl bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/business/partnership" 
            class="group relative bg-white hover:bg-gray-50 text-primary-600 font-semibold py-4 px-8 rounded-xl text-lg border-2 border-primary-200 hover:border-primary-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[280px] overflow-hidden"
          >
            <!-- Button Background Animation -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
            
            <div class="relative flex items-center justify-center">
              <svg class="w-6 h-6 mr-3 group-hover:animate-bounce transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
              </svg>
              <span>We're a Business</span>
            </div>
            <div class="text-sm text-primary-500 mt-1 relative">Company interested in partnership</div>
          </NuxtLink>
        </div>

        <!-- Enhanced Stats with Animations -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up" style="animation-delay: 1.1s;">
          <div class="group text-center transform hover:scale-105 transition-all duration-300">
            <div class="relative">
              <div class="text-3xl font-bold text-primary-600 mb-2 counter" data-target="50000">0</div>
              <div class="absolute -inset-2 bg-primary-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div class="text-gray-600">Assessments Completed</div>
            <div class="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
          <div class="group text-center transform hover:scale-105 transition-all duration-300">
            <div class="relative">
              <div class="text-3xl font-bold text-primary-600 mb-2 counter" data-target="1200">0</div>
              <div class="absolute -inset-2 bg-primary-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div class="text-gray-600">Partner Companies</div>
            <div class="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
          <div class="group text-center transform hover:scale-105 transition-all duration-300">
            <div class="relative">
              <div class="text-3xl font-bold text-primary-600 mb-2 counter" data-target="95">0</div>
              <div class="absolute -inset-2 bg-primary-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div class="text-gray-600">Career Match Accuracy</div>
            <div class="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div class="mt-16 animate-slide-up" style="animation-delay: 1.2s;">
          <p class="text-sm text-gray-500 mb-6">Trusted by leading organizations</p>
          <div class="flex items-center justify-center space-x-8 opacity-60">
            <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors duration-300">
              <span class="font-bold text-gray-600">TECH</span>
            </div>
            <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors duration-300">
              <span class="font-bold text-gray-600">CORP</span>
            </div>
            <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors duration-300">
              <span class="font-bold text-gray-600">BUSI</span>
            </div>
            <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors duration-300">
              <span class="font-bold text-gray-600">INNO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Animate counters
  const counters = document.querySelectorAll('.counter')
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'))
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counter.textContent = target.toLocaleString() + (target === 95 ? '%' : '+')
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current).toLocaleString() + (target === 95 ? '%' : '+')
      }
    }, duration / steps)
  }

  // Start counter animations when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })

  counters.forEach(counter => observer.observe(counter))
})
</script>