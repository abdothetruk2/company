<template>
  <AdminSidebar>
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Assessment Overview</h1>
          <p class="text-gray-600">Monitor assessment performance and analytics</p>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="exportData" class="btn-secondary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Export Data
          </button>
          <button @click="refreshData" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <!-- Assessment Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Total Assessments</p>
              <p class="text-2xl font-semibold text-gray-900">{{ assessmentStats.total.toLocaleString() }}</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+15%</span>
              <span class="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Completed</p>
              <p class="text-2xl font-semibold text-gray-900">{{ assessmentStats.completed.toLocaleString() }}</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">{{ Math.round((assessmentStats.completed / assessmentStats.total) * 100) }}%</span>
              <span class="text-gray-500 ml-2">completion rate</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Avg. Duration</p>
              <p class="text-2xl font-semibold text-gray-900">{{ assessmentStats.avgDuration }} min</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-blue-600 font-medium">-5%</span>
              <span class="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Accuracy Rate</p>
              <p class="text-2xl font-semibold text-gray-900">{{ assessmentStats.accuracy }}%</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+2%</span>
              <span class="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Assessment Types Performance -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Personality Assessment</h3>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Completion Rate</span>
                <span class="text-sm font-medium">{{ personalityStats.completionRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" :style="{ width: personalityStats.completionRate + '%' }"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Avg. Duration</span>
                <span class="text-sm font-medium">{{ personalityStats.avgDuration }} min</span>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Total Completed</span>
                <span class="text-sm font-medium">{{ personalityStats.totalCompleted.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Knowledge Assessment</h3>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Completion Rate</span>
                <span class="text-sm font-medium">{{ knowledgeStats.completionRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" :style="{ width: knowledgeStats.completionRate + '%' }"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Avg. Duration</span>
                <span class="text-sm font-medium">{{ knowledgeStats.avgDuration }} min</span>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Total Completed</span>
                <span class="text-sm font-medium">{{ knowledgeStats.totalCompleted.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Soft Skills Assessment</h3>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Completion Rate</span>
                <span class="text-sm font-medium">{{ softSkillsStats.completionRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-orange-500 h-2 rounded-full" :style="{ width: softSkillsStats.completionRate + '%' }"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Avg. Duration</span>
                <span class="text-sm font-medium">{{ softSkillsStats.avgDuration }} min</span>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Total Completed</span>
                <span class="text-sm font-medium">{{ softSkillsStats.totalCompleted.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Assessment Trends Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Assessment Trends</h3>
            <select class="text-sm border-gray-300 rounded-md">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div class="h-64">
            <canvas ref="trendsChart"></canvas>
          </div>
        </div>

        <!-- Personality Distribution Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Personality Type Distribution</h3>
            <button class="text-sm text-primary-600 hover:text-primary-700">View Details</button>
          </div>
          <div class="h-64">
            <canvas ref="personalityChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Top Personality Types -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Personality Types</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="type in topPersonalityTypes" :key="type.type" class="p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">{{ type.type }}</span>
              </div>
              <span class="text-2xl font-bold text-gray-900">{{ type.count }}</span>
            </div>
            <h4 class="font-medium text-gray-900">{{ type.name }}</h4>
            <p class="text-sm text-gray-600">{{ type.percentage }}% of users</p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Recent Assessment Activity</h3>
          <NuxtLink to="/admin/assessments/results" class="text-sm text-primary-600 hover:text-primary-700">
            View All Results
          </NuxtLink>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="activity in recentActivity" :key="activity.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-xs">{{ activity.userName.charAt(0) }}</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ activity.userName }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ activity.assessmentType }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="activity.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ activity.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ activity.duration }} min
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(activity.completedAt) }}
                </td>
              </tr>
            </tbody>
          </table>
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

const assessmentStats = ref({
  total: 23456,
  completed: 18234,
  avgDuration: 28,
  accuracy: 94
})

const personalityStats = ref({
  completionRate: 85,
  avgDuration: 25,
  totalCompleted: 8234
})

const knowledgeStats = ref({
  completionRate: 72,
  avgDuration: 32,
  totalCompleted: 6789
})

const softSkillsStats = ref({
  completionRate: 68,
  avgDuration: 22,
  totalCompleted: 5432
})

const topPersonalityTypes = ref([
  { type: 'ENFP', name: 'The Campaigner', count: 2847, percentage: 18.5 },
  { type: 'INTJ', name: 'The Architect', count: 2156, percentage: 14.2 },
  { type: 'ISFJ', name: 'The Protector', count: 1923, percentage: 12.8 },
  { type: 'ESTP', name: 'The Entrepreneur', count: 1654, percentage: 10.9 }
])

const recentActivity = ref([
  {
    id: 1,
    userName: 'Ahmed Hassan',
    assessmentType: 'Personality',
    status: 'Completed',
    duration: 24,
    completedAt: '2025-01-20T10:30:00Z'
  },
  {
    id: 2,
    userName: 'Sara Mohamed',
    assessmentType: 'Knowledge',
    status: 'In Progress',
    duration: 15,
    completedAt: '2025-01-20T09:45:00Z'
  },
  {
    id: 3,
    userName: 'Mohamed Ali',
    assessmentType: 'Soft Skills',
    status: 'Completed',
    duration: 19,
    completedAt: '2025-01-20T08:20:00Z'
  },
  {
    id: 4,
    userName: 'Fatima Ahmed',
    assessmentType: 'Personality',
    status: 'Completed',
    duration: 27,
    completedAt: '2025-01-19T16:15:00Z'
  }
])

const trendsChart = ref(null)
const personalityChart = ref(null)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const exportData = () => {
  alert('Exporting assessment data...')
}

const refreshData = () => {
  alert('Refreshing assessment data...')
}

const initializeCharts = () => {
  // Assessment Trends Chart
  if (trendsChart.value) {
    const ctx = trendsChart.value.getContext('2d')
    
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Draw trends lines
    const colors = ['#3b82f6', '#10b981', '#f59e0b']
    const datasets = [
      [50, 65, 80, 95, 110, 125, 140],
      [40, 55, 70, 85, 100, 115, 130],
      [30, 45, 60, 75, 90, 105, 120]
    ]
    
    datasets.forEach((data, index) => {
      ctx.strokeStyle = colors[index]
      ctx.lineWidth = 3
      ctx.beginPath()
      
      data.forEach((value, i) => {
        const x = 50 + i * 45
        const y = 200 - (value * 1.2)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      
      ctx.stroke()
    })
    
    // Labels
    ctx.fillStyle = '#374151'
    ctx.font = '12px Arial'
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    labels.forEach((label, index) => {
      ctx.fillText(label, 40 + index * 45, 230)
    })
  }
  
  // Personality Distribution Chart (Pie Chart)
  if (personalityChart.value) {
    const ctx = personalityChart.value.getContext('2d')
    
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    const centerX = 200
    const centerY = 130
    const radius = 80
    
    const data = [
      { label: 'ENFP', value: 30, color: '#3b82f6' },
      { label: 'INTJ', value: 25, color: '#10b981' },
      { label: 'ISFJ', value: 20, color: '#f59e0b' },
      { label: 'ESTP', value: 15, color: '#ef4444' },
      { label: 'Others', value: 10, color: '#8b5cf6' }
    ]
    
    let currentAngle = 0
    
    data.forEach(segment => {
      const sliceAngle = (segment.value / 100) * 2 * Math.PI
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = segment.color
      ctx.fill()
      
      currentAngle += sliceAngle
    })
  }
}

useHead({
  title: 'Assessment Overview - ProGrowth Admin'
})
</script>