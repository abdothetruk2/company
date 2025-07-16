<template>
  <div class="min-h-screen bg-gray-50">
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
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Assessment Dashboard</h2>
        <p class="text-gray-600">Complete these assessments to discover your career fit</p>
      </div>

      <!-- Progress Overview -->
      <div class="card p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Overall Progress</h3>
          <span class="text-2xl font-bold text-primary-600">{{ overallProgress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div class="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500" :style="{ width: overallProgress + '%' }"></div>
        </div>
        <p class="text-sm text-gray-600 mt-2">{{ completedTests }}/3 assessments completed</p>
      </div>

      <!-- Assessment Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Test 1: Personality & Interest -->
        <div class="card p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500">Duration</div>
              <div class="font-semibold text-gray-900">25 minutes</div>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Personality & Interest Test</h3>
          <p class="text-gray-600 mb-4">MBTI + RIASEC assessment to understand your personality type and career interests</p>
          
          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">Progress</span>
              <span class="text-sm font-medium text-primary-600">{{ tests.personality.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" :style="{ width: tests.personality.progress + '%' }"></div>
            </div>
          </div>

          <button 
            @click="startTest('personality')"
            :class="tests.personality.completed ? 'btn-secondary' : 'btn-primary'"
            class="w-full"
          >
            {{ tests.personality.completed ? 'View Results' : tests.personality.progress > 0 ? 'Continue Test' : 'Start Test' }}
          </button>
        </div>

        <!-- Test 2: Knowledge & Skills -->
        <div class="card p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500">Duration</div>
              <div class="font-semibold text-gray-900">30 minutes</div>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Knowledge & Skills Test</h3>
          <p class="text-gray-600 mb-4">Evaluate your technical knowledge and professional skills across various domains</p>
          
          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">Progress</span>
              <span class="text-sm font-medium text-primary-600">{{ tests.knowledge.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full transition-all duration-300" :style="{ width: tests.knowledge.progress + '%' }"></div>
            </div>
          </div>

          <button 
            @click="startTest('knowledge')"
            :class="tests.knowledge.completed ? 'btn-secondary' : tests.knowledge.progress > 0 || tests.personality.completed ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="w-full"
            :disabled="!tests.personality.completed && tests.knowledge.progress === 0"
          >
            {{ tests.knowledge.completed ? 'View Results' : tests.knowledge.progress > 0 ? 'Continue Test' : 'Start Test' }}
          </button>
        </div>

        <!-- Test 3: Soft Skills / Aptitude -->
        <div class="card p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500">Duration</div>
              <div class="font-semibold text-gray-900">20 minutes</div>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Soft Skills / Aptitude Test</h3>
          <p class="text-gray-600 mb-4">Assess your communication, leadership, problem-solving and interpersonal skills</p>
          
          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">Progress</span>
              <span class="text-sm font-medium text-primary-600">{{ tests.softSkills.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-orange-500 h-2 rounded-full transition-all duration-300" :style="{ width: tests.softSkills.progress + '%' }"></div>
            </div>
          </div>

          <button 
            @click="startTest('softSkills')"
            :class="tests.softSkills.completed ? 'btn-secondary' : tests.softSkills.progress > 0 || tests.knowledge.completed ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="w-full"
            :disabled="!tests.knowledge.completed && tests.softSkills.progress === 0"
          >
            {{ tests.softSkills.completed ? 'View Results' : tests.softSkills.progress > 0 ? 'Continue Test' : 'Start Test' }}
          </button>
        </div>
      </div>

      <!-- Next Steps -->
      <div v-if="allTestsCompleted" class="card p-6 mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
          <p class="text-gray-600 mb-6">You've completed all assessments. View your comprehensive career profile and recommendations.</p>
          <NuxtLink to="/results/analysis" class="btn-primary text-lg px-8 py-3 inline-block">
            View Career Analysis
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const userName = ref('Ahmed')

const tests = ref({
  personality: {
    progress: 0,
    completed: false
  },
  knowledge: {
    progress: 0,
    completed: false
  },
  softSkills: {
    progress: 0,
    completed: false
  }
})

const completedTests = computed(() => {
  return Object.values(tests.value).filter(test => test.completed).length
})

const overallProgress = computed(() => {
  const totalProgress = Object.values(tests.value).reduce((sum, test) => sum + test.progress, 0)
  return Math.round(totalProgress / 3)
})

const allTestsCompleted = computed(() => {
  return Object.values(tests.value).every(test => test.completed)
})

const startTest = (testType) => {
  if (testType === 'personality') {
    navigateTo('/test/personality')
  } else if (testType === 'knowledge' && tests.value.personality.completed) {
    navigateTo('/test/knowledge')
  } else if (testType === 'softSkills' && tests.value.knowledge.completed) {
    navigateTo('/test/soft-skills')
  }
}

// Simulate some progress for demo
onMounted(() => {
  setTimeout(() => {
    tests.value.personality.progress = 100
    tests.value.personality.completed = true
    tests.value.knowledge.progress = 65
    tests.value.softSkills.progress = 30
  }, 1000)
})

useHead({
  title: 'Assessment Dashboard - ProGrowth'
})
</script>