<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="relative">
          <div class="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span class="text-white font-bold text-2xl">PG</span>
          </div>
          <div class="absolute -inset-4">
            <div class="w-28 h-28 border-4 border-primary-200 rounded-full animate-spin border-t-primary-500"></div>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2 animate-pulse">ProGrowth</h2>
        <p class="text-gray-600 animate-pulse">{{ loadingText }}</p>
        <div class="mt-4 w-64 bg-gray-200 rounded-full h-2 mx-auto">
          <div class="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300" :style="{ width: loadingProgress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="animate-fade-in">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <FeaturedJobs />
        <TopCompanies />
        <JobCategories />
        <Newsletter />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const loadingProgress = ref(0)
const loadingText = ref('Initializing ProGrowth...')

const loadingSteps = [
  { text: 'Initializing ProGrowth...', duration: 800 },
  { text: 'Loading career assessments...', duration: 600 },
  { text: 'Preparing job matches...', duration: 700 },
  { text: 'Setting up your dashboard...', duration: 500 },
  { text: 'Almost ready...', duration: 400 }
]

onMounted(async () => {
  let currentProgress = 0
  const progressStep = 100 / loadingSteps.length

  for (let i = 0; i < loadingSteps.length; i++) {
    loadingText.value = loadingSteps[i].text
    
    // Animate progress
    const targetProgress = (i + 1) * progressStep
    const animationDuration = loadingSteps[i].duration
    const steps = 20
    const stepDuration = animationDuration / steps
    const progressIncrement = (targetProgress - currentProgress) / steps

    for (let j = 0; j < steps; j++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration))
      currentProgress += progressIncrement
      loadingProgress.value = Math.min(currentProgress, 100)
    }
  }

  // Final delay before showing content
  await new Promise(resolve => setTimeout(resolve, 300))
  isLoading.value = false
})

useHead({
  title: 'ProGrowth - Discover Your Career Fit or Hire Smarter'
})
</script>