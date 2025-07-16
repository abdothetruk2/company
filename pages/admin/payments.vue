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
            <h1 class="ml-3 text-xl font-bold text-gray-900">Payment Management</h1>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin/dashboard" class="btn-secondary">Back to Dashboard</NuxtLink>
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
      <!-- Payment Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-900">{{ paymentStats.totalRevenue.toLocaleString() }} EGP</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">This Month</p>
              <p class="text-2xl font-bold text-gray-900">{{ paymentStats.monthlyRevenue.toLocaleString() }} EGP</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Individual Subs</p>
              <p class="text-2xl font-bold text-gray-900">{{ paymentStats.individualSubscriptions }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Business Subs</p>
              <p class="text-2xl font-bold text-gray-900">{{ paymentStats.businessSubscriptions }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue Chart -->
      <div class="card p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
        <div class="h-64">
          <canvas ref="revenueChart"></canvas>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="card p-6 mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search payments..."
            class="input-field w-64"
          />
          <select v-model="statusFilter" class="input-field w-40">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select v-model="typeFilter" class="input-field w-40">
            <option value="">All Types</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
          <input type="date" v-model="dateFilter" class="input-field w-40" />
          <button @click="exportPayments" class="btn-primary">Export</button>
        </div>
      </div>

      <!-- Payments Table -->
      <div class="card p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="payment in filteredPayments" :key="payment.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-sm">{{ payment.customerName.charAt(0) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ payment.customerName }}</div>
                      <div class="text-sm text-gray-500">{{ payment.customerEmail }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="payment.type === 'individual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ payment.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ payment.plan }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ payment.amount.toLocaleString() }} EGP
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ payment.method }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(payment.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ payment.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(payment.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="viewPayment(payment)" class="text-primary-600 hover:text-primary-900">View</button>
                    <button v-if="payment.status === 'pending'" @click="processRefund(payment.id)" class="text-red-600 hover:text-red-900">Refund</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Payment Details Modal -->
    <div v-if="selectedPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Payment Details</h3>
          <button @click="selectedPayment = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer Name</label>
              <p class="text-gray-900">{{ selectedPayment.customerName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="text-gray-900">{{ selectedPayment.customerEmail }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Type</label>
              <p class="text-gray-900">{{ selectedPayment.type }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Plan</label>
              <p class="text-gray-900">{{ selectedPayment.plan }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Amount</label>
              <p class="text-gray-900">{{ selectedPayment.amount.toLocaleString() }} EGP</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Payment Method</label>
              <p class="text-gray-900">{{ selectedPayment.method }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <p class="text-gray-900">{{ selectedPayment.status }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Transaction ID</label>
              <p class="text-gray-900">{{ selectedPayment.transactionId }}</p>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Date</label>
            <p class="text-gray-900">{{ formatDate(selectedPayment.date) }}</p>
          </div>
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
  
  initializeChart()
})

const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const dateFilter = ref('')
const selectedPayment = ref(null)
const revenueChart = ref(null)

const paymentStats = ref({
  totalRevenue: 1425000,
  monthlyRevenue: 142500,
  individualSubscriptions: 2847,
  businessSubscriptions: 156
})

const payments = ref([
  {
    id: 1,
    customerName: 'Ahmed Hassan',
    customerEmail: 'ahmed@example.com',
    type: 'individual',
    plan: 'Premium',
    amount: 500,
    method: 'Visa',
    status: 'completed',
    date: '2025-01-15',
    transactionId: 'TXN_001'
  },
  {
    id: 2,
    customerName: 'TechCorp Inc.',
    customerEmail: 'contact@techcorp.com',
    type: 'business',
    plan: 'Enterprise',
    amount: 25000,
    method: 'Bank Transfer',
    status: 'completed',
    date: '2025-01-14',
    transactionId: 'TXN_002'
  },
  {
    id: 3,
    customerName: 'Sara Mohamed',
    customerEmail: 'sara@example.com',
    type: 'individual',
    plan: 'Premium',
    amount: 500,
    method: 'Fawry',
    status: 'pending',
    date: '2025-01-13',
    transactionId: 'TXN_003'
  },
  {
    id: 4,
    customerName: 'FinanceHub Egypt',
    customerEmail: 'admin@financehub.com',
    type: 'business',
    plan: 'Business',
    amount: 45000,
    method: 'Stripe',
    status: 'failed',
    date: '2025-01-12',
    transactionId: 'TXN_004'
  }
])

const filteredPayments = computed(() => {
  let filtered = payments.value

  if (searchQuery.value) {
    filtered = filtered.filter(payment => 
      payment.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(payment => payment.status === statusFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(payment => payment.type === typeFilter.value)
  }

  if (dateFilter.value) {
    filtered = filtered.filter(payment => payment.date === dateFilter.value)
  }

  return filtered
})

const getStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const viewPayment = (payment) => {
  selectedPayment.value = payment
}

const processRefund = (id) => {
  if (confirm('Are you sure you want to process a refund for this payment?')) {
    const payment = payments.value.find(p => p.id === id)
    if (payment) {
      payment.status = 'refunded'
      alert('Refund processed successfully!')
    }
  }
}

const exportPayments = () => {
  alert('Exporting payment data...')
}

const initializeChart = () => {
  if (revenueChart.value) {
    const ctx = revenueChart.value.getContext('2d')
    
    // Revenue trend chart
    ctx.strokeStyle = '#10b981'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(50, 200)
    ctx.lineTo(100, 180)
    ctx.lineTo(150, 160)
    ctx.lineTo(200, 140)
    ctx.lineTo(250, 120)
    ctx.lineTo(300, 100)
    ctx.lineTo(350, 90)
    ctx.stroke()
    
    // Data points
    ctx.fillStyle = '#10b981'
    const points = [[50, 200], [100, 180], [150, 160], [200, 140], [250, 120], [300, 100], [350, 90]]
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
}

const logout = () => {
  localStorage.removeItem('adminAuth')
  navigateTo('/admin/login')
}

useHead({
  title: 'Payment Management - ProGrowth Admin'
})
</script>