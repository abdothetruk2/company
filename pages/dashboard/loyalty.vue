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
            <div class="ml-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              PREMIUM
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">Welcome back, {{ userName }}</div>
            <button class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold mb-2">Welcome to Premium!</h2>
              <p class="text-primary-100">Your career journey just got supercharged</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold">{{ matchedJobs }}</div>
              <div class="text-primary-100">Jobs Matched</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Goal Selection -->
      <div class="card p-6 mb-8">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Set Your Monthly Goal</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            @click="selectedGoal = 'applications'"
            :class="selectedGoal === 'applications' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
            class="p-4 border-2 rounded-lg hover:border-primary-300 transition-colors duration-200"
          >
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 class="font-semibold text-gray-900">Job Applications</h4>
              <p class="text-sm text-gray-600">Apply to 10 jobs this month</p>
            </div>
          </button>
          
          <button 
            @click="selectedGoal = 'courses'"
            :class="selectedGoal === 'courses' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
            class="p-4 border-2 rounded-lg hover:border-primary-300 transition-colors duration-200"
          >
            <div class="text-center">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 class="font-semibold text-gray-900">Complete Courses</h4>
              <p class="text-sm text-gray-600">Finish 2 courses this month</p>
            </div>
          </button>
          
          <button 
            @click="selectedGoal = 'networking'"
            :class="selectedGoal === 'networking' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
            class="p-4 border-2 rounded-lg hover:border-primary-300 transition-colors duration-200"
          >
            <div class="text-center">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 class="font-semibold text-gray-900">Network Building</h4>
              <p class="text-sm text-gray-600">Connect with 5 professionals</p>
            </div>
          </button>
        </div>
        <div class="mt-4 text-center">
          <button @click="setGoal" class="btn-primary">Set Monthly Goal</button>
        </div>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personalized Recommendations -->
          <div class="card p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Personalized Job Recommendations</h3>
            <div class="space-y-4">
              <div v-for="job in personalizedJobs" :key="job.id" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div class="flex items-start justify-between">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <span class="text-white font-bold">{{ job.company.charAt(0) }}</span>
                    </div>
                    <div class="ml-3">
                      <h4 class="font-semibold text-gray-900">{{ job.title }}</h4>
                      <p class="text-sm text-gray-600">{{ job.company }}</p>
                      <div class="flex items-center text-xs text-gray-500 mt-1">
                        <span>{{ job.location }}</span>
                        <span class="mx-2">•</span>
                        <span>{{ job.type }}</span>
                        <span class="mx-2">•</span>
                        <span class="text-primary-600 font-medium">{{ job.match }}% match</span>
                      </div>
                    </div>
                  </div>
                  <button class="btn-primary text-sm">Apply Now</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Discounted Courses -->
          <div class="card p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Discounted Courses</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="course in discountedCourses" :key="course.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-primary-600 font-medium">{{ course.provider }}</span>
                  <div class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {{ course.discount }}% OFF
                  </div>
                </div>
                <h4 class="font-semibold text-gray-900 mb-2">{{ course.title }}</h4>
                <div class="flex items-center justify-between">
                  <div class="text-sm">
                    <span class="line-through text-gray-500">{{ course.originalPrice }} EGP</span>
                    <span class="ml-2 font-bold text-primary-600">{{ course.discountedPrice }} EGP</span>
                  </div>
                  <button class="btn-secondary text-sm">Enroll</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Vouchers -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Available Vouchers</h3>
            <div class="space-y-3">
              <div v-for="voucher in vouchers" :key="voucher.id" class="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-semibold text-gray-900">{{ voucher.title }}</div>
                    <div class="text-sm text-gray-600">{{ voucher.description }}</div>
                  </div>
                  <button class="text-primary-600 text-sm font-medium">Use</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Career News -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Career News for You</h3>
            <div class="space-y-3">
              <div v-for="news in careerNews" :key="news.id" class="border-b border-gray-200 pb-3 last:border-b-0">
                <h4 class="font-medium text-gray-900 text-sm mb-1">{{ news.title }}</h4>
                <p class="text-xs text-gray-600 mb-2">{{ news.summary }}</p>
                <div class="text-xs text-gray-500">{{ news.date }}</div>
              </div>
            </div>
          </div>

          <!-- Progress Tracking -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h3>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">Applications Sent</span>
                  <span class="text-sm font-medium">7/10</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-primary-500 h-2 rounded-full" style="width: 70%"></div>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">Courses Completed</span>
                  <span class="text-sm font-medium">1/2</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full" style="width: 50%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userName = ref('Ahmed')
const selectedGoal = ref('')
const matchedJobs = ref(47)

const personalizedJobs = ref([
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'TechCorp',
    location: 'Cairo, Egypt',
    type: 'Full-time',
    match: 95
  },
  {
    id: 2,
    title: 'Frontend Developer Intern',
    company: 'StartupHub',
    location: 'Alexandria, Egypt',
    type: 'Remote',
    match: 92
  },
  {
    id: 3,
    title: 'Data Analysis Intern',
    company: 'DataVision',
    location: 'Giza, Egypt',
    type: 'Part-time',
    match: 88
  }
])

const discountedCourses = ref([
  {
    id: 1,
    title: 'React Development Bootcamp',
    provider: 'Udemy',
    originalPrice: 2000,
    discountedPrice: 1000,
    discount: 50
  },
  {
    id: 2,
    title: 'Data Science with Python',
    provider: 'Coursera',
    originalPrice: 1500,
    discountedPrice: 900,
    discount: 40
  }
])

const vouchers = ref([
  {
    id: 1,
    title: '20% Off Next Course',
    description: 'Valid until end of month'
  },
  {
    id: 2,
    title: 'Free Resume Review',
    description: 'Professional review service'
  }
])

const careerNews = ref([
  {
    id: 1,
    title: 'Tech Industry Hiring Surge',
    summary: 'Major tech companies increasing internship positions...',
    date: '2 days ago'
  },
  {
    id: 2,
    title: 'Remote Work Opportunities',
    summary: 'New remote internship programs launched...',
    date: '1 week ago'
  }
])

const setGoal = () => {
  if (selectedGoal.value) {
    alert(`Monthly goal set: ${selectedGoal.value}`)
  }
}

useHead({
  title: 'Premium Dashboard - ProGrowth'
})
</script>