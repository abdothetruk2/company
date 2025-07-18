<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">PG</span>
            </div>
            <h1 class="ml-3 text-xl font-bold text-gray-900">ProGrowth</h1>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">Home</NuxtLink>
            <NuxtLink to="/jobs" class="text-gray-600 hover:text-gray-900">Jobs</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold mb-4">Discover Your Career Path</h1>
        <p class="text-xl mb-8">Take our comprehensive assessment to unlock personalized career recommendations</p>
        <div class="flex items-center justify-center space-x-8 text-sm">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>15-20 minutes</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Scientifically validated</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Instant results</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Assessment Types -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Three Comprehensive Assessments</h2>
        <p class="text-lg text-gray-600">Get a complete picture of your career potential</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Personality Assessment -->
        <div class="card p-8 text-center hover:shadow-xl transition-all duration-300 group">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Personality & Interest</h3>
          <p class="text-gray-600 mb-4">MBTI + RIASEC assessment to understand your personality type and career interests</p>
          <ul class="text-left text-sm text-gray-500 space-y-1 mb-6">
            <li>• 16 personality types analysis</li>
            <li>• Career interest mapping</li>
            <li>• Work style preferences</li>
            <li>• Team dynamics insights</li>
          </ul>
          <div class="text-sm text-gray-500 mb-4">~8 minutes</div>
        </div>

        <!-- Knowledge Assessment -->
        <div class="card p-8 text-center hover:shadow-xl transition-all duration-300 group">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Knowledge Assessment</h3>
          <p class="text-gray-600 mb-4">Evaluate your technical and domain-specific knowledge across various fields</p>
          <ul class="text-left text-sm text-gray-500 space-y-1 mb-6">
            <li>• Technical skill evaluation</li>
            <li>• Industry knowledge test</li>
            <li>• Problem-solving abilities</li>
            <li>• Learning potential analysis</li>
          </ul>
          <div class="text-sm text-gray-500 mb-4">~10 minutes</div>
        </div>

        <!-- Soft Skills Assessment -->
        <div class="card p-8 text-center hover:shadow-xl transition-all duration-300 group">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Soft Skills Assessment</h3>
          <p class="text-gray-600 mb-4">Measure your interpersonal skills, emotional intelligence, and leadership potential</p>
          <ul class="text-left text-sm text-gray-500 space-y-1 mb-6">
            <li>• Communication skills</li>
            <li>• Leadership potential</li>
            <li>• Emotional intelligence</li>
            <li>• Teamwork abilities</li>
          </ul>
          <div class="text-sm text-gray-500 mb-4">~7 minutes</div>
        </div>
      </div>

      <!-- Start Assessment Button -->
      <div class="text-center">
        <button @click="startAssessment" class="btn-primary text-lg px-12 py-4 mb-4">
          Start Complete Assessment
        </button>
        <p class="text-sm text-gray-600">
          All three assessments will be completed in sequence. You can save your progress at any time.
        </p>
      </div>

      <!-- Benefits Section -->
      <div class="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
        <h3 class="text-2xl font-bold text-gray-900 text-center mb-8">What You'll Get</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold mb-2">Personalized Recommendations</h4>
            <p class="text-gray-600">Tailored career paths based on your unique strengths</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold mb-2">Skill Development Plans</h4>
            <p class="text-gray-600">Customized learning paths to enhance your skills</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-tertiary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.5l3.5 3.5A2 2 0 0114 7h3.5a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold mb-2">Networking Opportunities</h4>
            <p class="text-gray-600">Connect with professionals in your field</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-quaternary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold mb-2">Continuous Support</h4>
            <p class="text-gray-600">Ongoing guidance and resources</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: 'Career Assessment - ProGrowth',
  description: 'Take our comprehensive career assessment to discover your ideal career path'
})

// Reactive data
const loading = ref(false)

// Methods
const startAssessment = async () => {
  loading.value = true
  
  try {
    // Navigate to the first assessment step
    await navigateTo('/assessment/personality')
  } catch (error) {
    console.error('Error starting assessment:', error)
  } finally {
    loading.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Career Assessment - ProGrowth',
  ogTitle: 'Career Assessment - ProGrowth',
  description: 'Take our comprehensive career assessment to discover your ideal career path',
  ogDescription: 'Take our comprehensive career assessment to discover your ideal career path',
  ogImage: '/images/assessment-og.jpg',
  twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.btn-primary {
  @apply bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200;
}
</style>