<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Enhanced Loading Screen -->
    <div v-if="isLoading" class="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div class="text-center max-w-md px-6">
        <div class="relative mb-8">
          <!-- Logo animation with pulse effect -->
          <div class="w-24 h-24 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span class="text-white font-bold text-3xl">PG</span>
          </div>
          
          <!-- Animated rings around logo -->
          <div class="absolute -inset-4">
            <div class="w-32 h-32 border-4 border-primary-200 rounded-full animate-spin-slow border-t-primary-500"></div>
          </div>
          <div class="absolute -inset-8">
            <div class="w-40 h-40 border-2 border-secondary-100 rounded-full animate-spin-reverse border-t-secondary-400"></div>
          </div>
        </div>
        
        <!-- Brand name with gradient text -->
        <h2 class="text-3xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          ProGrowth
        </h2>
        
        <!-- Loading message with typing animation -->
        <p class="text-gray-600 h-6 mb-6 typing-animation">{{ loadingText }}</p>
        
        <!-- Enhanced progress bar -->
        <div class="mt-4 w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
          <div 
            class="bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 h-2.5 rounded-full transition-all duration-300 relative"
            :style="{ width: loadingProgress + '%' }"
          >
            <!-- Animated shine effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shine"></div>
          </div>
        </div>
        
        <!-- Loading percentage -->
        <p class="text-sm text-gray-500 mt-2">{{ Math.round(loadingProgress) }}% Complete</p>
        
        <!-- Loading dots -->
        <div class="mt-6 flex justify-center space-x-2">
          <div v-for="i in 3" :key="i" 
               class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" 
               :style="{ animationDelay: (i * 0.15) + 's' }">
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content with enhanced fade-in -->
    <div v-else class="animate-fade-in-up">
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

// Enhanced loading steps with more professional messaging
const loadingSteps = [
  { text: 'Initializing ProGrowth platform...', duration: 800 },
  { text: 'Loading career assessment tools...', duration: 600 },
  { text: 'Preparing personalized job matches...', duration: 700 },
  { text: 'Optimizing your dashboard experience...', duration: 500 },
  { text: 'Finalizing your personalized experience...', duration: 400 }
]

onMounted(async () => {
  // Skip loading screen if returning visitor (optional)
  const isReturningVisitor = localStorage.getItem('returningVisitor')
  if (isReturningVisitor) {
    isLoading.value = false
    return
  }
  
  // Set returning visitor flag
  localStorage.setItem('returningVisitor', 'true')
  
  // Enhanced loading animation with smoother progress
  let currentProgress = 0
  const progressStep = 100 / loadingSteps.length

  for (let i = 0; i < loadingSteps.length; i++) {
    loadingText.value = loadingSteps[i].text
    
    // Animate progress with easing function for more natural movement
    const targetProgress = (i + 1) * progressStep
    const animationDuration = loadingSteps[i].duration
    const steps = 30 // More steps for smoother animation
    const stepDuration = animationDuration / steps
    
    for (let j = 0; j < steps; j++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration))
      
      // Apply easing function for smoother progress
      const progress = j / (steps - 1)
      const easedProgress = easeInOutCubic(progress)
      const increment = (targetProgress - currentProgress) * (easedProgress - (j > 0 ? easeInOutCubic((j - 1) / (steps - 1)) : 0))
      
      currentProgress += increment
      loadingProgress.value = Math.min(currentProgress, 100)
    }
  }

  // Final delay with a slight bounce effect
  loadingText.value = "Welcome to ProGrowth!"
  await new Promise(resolve => setTimeout(resolve, 500))
  isLoading.value = false
})

// Easing function for smoother animations
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

useHead({
  title: 'ProGrowth - Discover Your Career Fit or Hire Smarter',
  meta: [
    { name: 'description', content: 'Find your perfect career match with AI-powered assessments or hire the right talent with our smart recruiting tools.' }
  ]
})
</script>

<style scoped>
/* Enhanced animations */
@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shine {
  animation: shine 2s infinite;
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

.animate-spin-reverse {
  animation: spin 4s linear infinite reverse;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Typing animation for loading text */
.typing-animation {
  position: relative;
}

.typing-animation::after {
  content: '|';
  position: absolute;
  right: -8px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>