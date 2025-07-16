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
            <h1 class="ml-3 text-xl font-bold text-gray-900">ProGrowth Admin</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">Welcome, Admin</div>
            <button @click="logout" class="text-red-600 hover:text-red-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Total Students</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalStudents }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Active Companies</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.activeCompanies }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Monthly Revenue</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.monthlyRevenue }} EGP</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Assessments</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalAssessments }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Revenue Chart -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <div class="h-64">
            <canvas ref="revenueChart"></canvas>
          </div>
        </div>

        <!-- User Growth Chart -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div class="h-64">
            <canvas ref="userChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Management Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Company Management -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Company Requests</h3>
            <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">{{ pendingCompanies.length }} Pending</span>
          </div>
          
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div v-for="company in pendingCompanies" :key="company.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div>
                  <h4 class="font-semibold text-gray-900">{{ company.companyName }}</h4>
                  <p class="text-sm text-gray-600">{{ company.industry }} • {{ company.companySize }}</p>
                  <p class="text-sm text-gray-500">Contact: {{ company.contactPerson }}</p>
                  <p class="text-sm text-gray-500">{{ company.email }}</p>
                </div>
                <div class="flex space-x-2">
                  <button @click="approveCompany(company.id)" class="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600">
                    Approve
                  </button>
                  <button @click="rejectCompany(company.id)" class="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Management -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
          
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div v-for="payment in recentPayments" :key="payment.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-semibold text-gray-900">{{ payment.customerName }}</h4>
                  <p class="text-sm text-gray-600">{{ payment.type }} • {{ payment.plan }}</p>
                  <p class="text-sm text-gray-500">{{ payment.date }}</p>
                </div>
                <div class="text-right">
                  <div class="font-bold text-green-600">{{ payment.amount }} EGP</div>
                  <div class="text-xs text-gray-500">{{ payment.method }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Student Management -->
      <div class="card p-6 mt-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Student Management</h3>
          <div class="flex space-x-2">
            <input 
              type="text" 
              v-model="studentSearch"
              placeholder="Search students..."
              class="input-field w-64"
            />
            <button class="btn-primary">Export Data</button>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessments</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="student in filteredStudents" :key="student.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-sm">{{ student.name.charAt(0) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ student.name }}</div>
                      <div class="text-sm text-gray-500">{{ student.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ student.university || 'Not specified' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ student.completedAssessments }}/3</div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-primary-500 h-2 rounded-full" :style="{ width: (student.completedAssessments / 3) * 100 + '%' }"></div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="student.subscription === 'premium' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ student.subscription }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="viewStudent(student.id)" class="text-primary-600 hover:text-primary-900 mr-3">View</button>
                  <button @click="deleteStudent(student.id)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Check authentication
onMounted(() => {
  const isAuthenticated = localStorage.getItem('adminAuth')
  if (!isAuthenticated) {
    navigateTo('/admin/login')
  }
  
  // Initialize charts
  initializeCharts()
})

const studentSearch = ref('')

const stats = ref({
  totalStudents: 2847,
  activeCompanies: 156,
  monthlyRevenue: 142500,
  totalAssessments: 8541
})

const pendingCompanies = ref([
  {
    id: 1,
    companyName: 'TechStart Solutions',
    industry: 'Technology',
    companySize: '11-50',
    contactPerson: 'Ahmed Hassan',
    email: 'ahmed@techstart.com'
  },
  {
    id: 2,
    companyName: 'FinanceHub Egypt',
    industry: 'Finance',
    companySize: '51-200',
    contactPerson: 'Sara Mohamed',
    email: 'sara@financehub.com'
  },
  {
    id: 3,
    companyName: 'HealthTech Innovations',
    industry: 'Healthcare',
    companySize: '1-10',
    contactPerson: 'Mohamed Ali',
    email: 'mohamed@healthtech.com'
  }
])

const recentPayments = ref([
  {
    id: 1,
    customerName: 'Ahmed Hassan',
    type: 'Individual',
    plan: 'Premium',
    amount: 500,
    method: 'Visa',
    date: '2025-01-15'
  },
  {
    id: 2,
    customerName: 'TechCorp Inc.',
    type: 'Business',
    plan: 'Enterprise',
    amount: 25000,
    method: 'Bank Transfer',
    date: '2025-01-14'
  },
  {
    id: 3,
    customerName: 'Sara Mohamed',
    type: 'Individual',
    plan: 'Premium',
    amount: 500,
    method: 'Fawry',
    date: '2025-01-13'
  }
])

const students = ref([
  {
    id: 1,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    university: 'Cairo University',
    completedAssessments: 3,
    subscription: 'premium'
  },
  {
    id: 2,
    name: 'Sara Mohamed',
    email: 'sara@example.com',
    university: 'Alexandria University',
    completedAssessments: 2,
    subscription: 'free'
  },
  {
    id: 3,
    name: 'Mohamed Ali',
    email: 'mohamed@example.com',
    university: 'AUC',
    completedAssessments: 1,
    subscription: 'premium'
  },
  {
    id: 4,
    name: 'Fatima Ahmed',
    email: 'fatima@example.com',
    university: 'Ain Shams University',
    completedAssessments: 3,
    subscription: 'free'
  }
])

const filteredStudents = computed(() => {
  if (!studentSearch.value) return students.value
  return students.value.filter(student => 
    student.name.toLowerCase().includes(studentSearch.value.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearch.value.toLowerCase()) ||
    (student.university && student.university.toLowerCase().includes(studentSearch.value.toLowerCase()))
  )
})

const approveCompany = (id) => {
  const index = pendingCompanies.value.findIndex(c => c.id === id)
  if (index > -1) {
    pendingCompanies.value.splice(index, 1)
    stats.value.activeCompanies++
    alert('Company approved successfully!')
  }
}

const rejectCompany = (id) => {
  const index = pendingCompanies.value.findIndex(c => c.id === id)
  if (index > -1) {
    pendingCompanies.value.splice(index, 1)
    alert('Company rejected.')
  }
}

const viewStudent = (id) => {
  alert(`Viewing student details for ID: ${id}`)
}

const deleteStudent = (id) => {
  if (confirm('Are you sure you want to delete this student?')) {
    const index = students.value.findIndex(s => s.id === id)
    if (index > -1) {
      students.value.splice(index, 1)
      stats.value.totalStudents--
    }
  }
}

const logout = () => {
  localStorage.removeItem('adminAuth')
  navigateTo('/admin/login')
}

const revenueChart = ref(null)
const userChart = ref(null)

const initializeCharts = () => {
  // Revenue Chart
  if (revenueChart.value) {
    const ctx = revenueChart.value.getContext('2d')
    
    // Simple chart implementation (you can replace with Chart.js)
    ctx.fillStyle = '#10b981'
    ctx.fillRect(50, 200, 40, 50)
    ctx.fillRect(100, 180, 40, 70)
    ctx.fillRect(150, 160, 40, 90)
    ctx.fillRect(200, 140, 40, 110)
    ctx.fillRect(250, 120, 40, 130)
    ctx.fillRect(300, 100, 40, 150)
    
    // Labels
    ctx.fillStyle = '#374151'
    ctx.font = '12px Arial'
    ctx.fillText('Jan', 60, 270)
    ctx.fillText('Feb', 110, 270)
    ctx.fillText('Mar', 160, 270)
    ctx.fillText('Apr', 210, 270)
    ctx.fillText('May', 260, 270)
    ctx.fillText('Jun', 310, 270)
  }
  
  // User Growth Chart
  if (userChart.value) {
    const ctx = userChart.value.getContext('2d')
    
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(50, 200)
    ctx.lineTo(100, 180)
    ctx.lineTo(150, 160)
    ctx.lineTo(200, 140)
    ctx.lineTo(250, 120)
    ctx.lineTo(300, 100)
    ctx.stroke()
    
    // Data points
    ctx.fillStyle = '#3b82f6'
    const points = [[50, 200], [100, 180], [150, 160], [200, 140], [250, 120], [300, 100]]
    points.forEach(([x, y]) => {
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })
  }
}

useHead({
  title: 'Admin Dashboard - ProGrowth'
})
</script>