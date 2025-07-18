<template>
  <AdminSidebar>
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p class="text-gray-600">Comprehensive insights and data analysis</p>
        </div>
        <div class="flex items-center space-x-4">
          <select class="input-field w-40">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
          <button class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Export Report
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                <dd class="text-lg font-medium text-gray-900">{{ analytics.totalUsers.toLocaleString() }}</dd>
              </dl>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+12%</span>
              <span class="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Assessments Completed</dt>
                <dd class="text-lg font-medium text-gray-900">{{ analytics.assessmentsCompleted.toLocaleString() }}</dd>
              </dl>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+18%</span>
              <span class="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                <dd class="text-lg font-medium text-gray-900">{{ analytics.revenue.toLocaleString() }} EGP</dd>
              </dl>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+25%</span>
              <span class="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Job Matches</dt>
                <dd class="text-lg font-medium text-gray-900">{{ analytics.jobMatches.toLocaleString() }}</dd>
              </dl>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+15%</span>
              <span class="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- User Growth Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">User Growth</h3>
            <div class="flex space-x-2">
              <button class="text-sm text-gray-500 hover:text-gray-700">Daily</button>
              <button class="text-sm text-primary-600 font-medium">Weekly</button>
              <button class="text-sm text-gray-500 hover:text-gray-700">Monthly</button>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="userGrowthChart"></canvas>
          </div>
        </div>

        <!-- Revenue Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Revenue Trends</h3>
            <div class="flex space-x-2">
              <button class="text-sm text-gray-500 hover:text-gray-700">Daily</button>
              <button class="text-sm text-primary-600 font-medium">Weekly</button>
              <button class="text-sm text-gray-500 hover:text-gray-700">Monthly</button>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="revenueChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Assessment Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Assessment Completion Rates -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Assessment Completion</h3>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Personality Test</span>
                <span class="text-sm font-medium">{{ assessmentStats.personality }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" :style="{ width: assessmentStats.personality + '%' }"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Knowledge Test</span>
                <span class="text-sm font-medium">{{ assessmentStats.knowledge }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" :style="{ width: assessmentStats.knowledge + '%' }"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Soft Skills Test</span>
                <span class="text-sm font-medium">{{ assessmentStats.softSkills }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-orange-500 h-2 rounded-full" :style="{ width: assessmentStats.softSkills + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Personality Types -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Personality Types</h3>
          <div class="space-y-3">
            <div v-for="type in topPersonalityTypes" :key="type.type" class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-xs">{{ type.type }}</span>
                </div>
                <span class="ml-3 text-sm text-gray-900">{{ type.name }}</span>
              </div>
              <span class="text-sm font-medium text-gray-600">{{ type.count }}</span>
            </div>
          </div>
        </div>

        <!-- Subscription Analytics -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Subscription Breakdown</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Free Users</span>
              <div class="flex items-center">
                <span class="text-sm font-medium mr-2">{{ subscriptionStats.free.toLocaleString() }}</span>
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div class="bg-gray-500 h-2 rounded-full" :style="{ width: (subscriptionStats.free / (subscriptionStats.free + subscriptionStats.premium)) * 100 + '%' }"></div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Premium Users</span>
              <div class="flex items-center">
                <span class="text-sm font-medium mr-2">{{ subscriptionStats.premium.toLocaleString() }}</span>
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div class="bg-primary-500 h-2 rounded-full" :style="{ width: (subscriptionStats.premium / (subscriptionStats.free + subscriptionStats.premium)) * 100 + '%' }"></div>
                </div>
              </div>
            </div>
            <div class="pt-2 border-t border-gray-200">
              <div class="text-center">
                <span class="text-lg font-bold text-primary-600">{{ Math.round((subscriptionStats.premium / (subscriptionStats.free + subscriptionStats.premium)) * 100) }}%</span>
                <p class="text-xs text-gray-500">Conversion Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Reports -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Detailed Reports</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button class="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div class="ml-3 text-left">
                  <h4 class="font-medium text-gray-900">User Demographics</h4>
                  <p class="text-sm text-gray-500">Age, location, education</p>
                </div>
              </div>
            </button>

            <button class="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div class="ml-3 text-left">
                  <h4 class="font-medium text-gray-900">Assessment Performance</h4>
                  <p class="text-sm text-gray-500">Completion rates, scores</p>
                </div>
              </div>
            </button>

            <button class="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div class="ml-3 text-left">
                  <h4 class="font-medium text-gray-900">Revenue Analysis</h4>
                  <p class="text-sm text-gray-500">Subscription trends, churn</p>
                </div>
              </div>
            </button>

            <button class="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <div class="ml-3 text-left">
                  <h4 class="font-medium text-gray-900">Job Matching</h4>
                  <p class="text-sm text-gray-500">Success rates, feedback</p>
                </div>
              </div>
            </button>

            <button class="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                  </svg>
                </div>
                <div class="ml-3 text-left">
                  <h4 class="font-medium text-gray-900">Company Analytics</h4>
                  <p class="text-sm text-gray-500">Partnerships, hiring</p>
                </div>
              </div>
            </button>

            <button class="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div class="ml-3 text-left">
                  <h4 class="font-medium text-gray-900">System Performance</h4>
                  <p class="text-sm text-gray-500">Uptime, response times</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  </AdminSidebar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '~/components/AdminSidebar.vue'

// Check authentication
onMounted(() => {
  const isAuthenticated = localStorage.getItem('adminAuth')
  if (!isAuthenticated) {
    navigateTo('/admin/login')
  }
  
  initializeCharts()
})

const analytics = ref({
  totalUsers: 15847,
  assessmentsCompleted: 23456,
  revenue: 285000,
  jobMatches: 8934
})

const assessmentStats = ref({
  personality: 85,
  knowledge: 72,
  softSkills: 68
})

const topPersonalityTypes = ref([
  { type: 'ENFP', name: 'The Campaigner', count: 2847 },
  { type: 'INTJ', name: 'The Architect', count: 2156 },
  { type: 'ISFJ', name: 'The Protector', count: 1923 },
  { type: 'ESTP', name: 'The Entrepreneur', count: 1654 },
  { type: 'INFP', name: 'The Mediator', count: 1432 }
])

const subscriptionStats = ref({
  free: 12847,
  premium: 3000
})

const userGrowthChart = ref(null)
const revenueChart = ref(null)

const initializeCharts = () => {
  // User Growth Chart
  if (userGrowthChart.value) {
    const ctx = userGrowthChart.value.getContext('2d')
    
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Draw user growth trend
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(50, 200)
    ctx.lineTo(100, 180)
    ctx.lineTo(150, 160)
    ctx.lineTo(200, 140)
    ctx.lineTo(250, 120)
    ctx.lineTo(300, 100)
    ctx.lineTo(350, 80)
    ctx.stroke()
    
    // Data points
    ctx.fillStyle = '#3b82f6'
    const points = [[50, 200], [100, 180], [150, 160], [200, 140], [250, 120], [300, 100], [350, 80]]
    points.forEach(([x, y]) => {
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })
    
    // Labels
    ctx.fillStyle = '#374151'
    ctx.font = '12px Arial'
    const labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    labels.forEach((label, index) => {
      ctx.fillText(label, 40 + index * 50, 230)
    })
  }
  
  // Revenue Chart
  if (revenueChart.value) {
    const ctx = revenueChart.value.getContext('2d')
    
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Draw revenue bars
    ctx.fillStyle = '#10b981'
    const barWidth = 40
    const barSpacing = 50
    const revenues = [120000, 135000, 150000, 180000, 220000, 250000, 285000]
    
    revenues.forEach((revenue, index) => {
      const barHeight = (revenue / 300000) * 150
      const x = 50 + index * barSpacing
      const y = 200 - barHeight
      
      ctx.fillRect(x, y, barWidth, barHeight)
    })
    
    // Labels
    ctx.fillStyle = '#374151'
    ctx.font = '12px Arial'
    const labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    labels.forEach((label, index) => {
      ctx.fillText(label, 55 + index * 50, 230)
    })
  }
}

useHead({
  title: 'Analytics - ProGrowth Admin'
})
</script>