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
            <h1 class="ml-3 text-xl font-bold text-gray-900">Company Management</h1>
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
      <!-- Filters and Search -->
      <div class="card p-6 mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search companies..."
            class="input-field w-64"
          />
          <select v-model="statusFilter" class="input-field w-40">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select v-model="industryFilter" class="input-field w-40">
            <option value="">All Industries</option>
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
          </select>
          <button @click="exportData" class="btn-primary">Export Data</button>
        </div>
      </div>

      <!-- Companies Table -->
      <div class="card p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="company in filteredCompanies" :key="company.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <span class="text-white font-bold text-sm">{{ company.companyName.charAt(0) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ company.companyName }}</div>
                      <div class="text-sm text-gray-500">{{ company.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ company.industry }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ company.companySize }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ company.contactPerson }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(company.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ company.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="company.subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ company.subscription.plan }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="viewCompany(company)" class="text-primary-600 hover:text-primary-900">View</button>
                    <button v-if="company.status === 'pending'" @click="approveCompany(company.id)" class="text-green-600 hover:text-green-900">Approve</button>
                    <button v-if="company.status === 'pending'" @click="rejectCompany(company.id)" class="text-red-600 hover:text-red-900">Reject</button>
                    <button @click="deleteCompany(company.id)" class="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Company Details Modal -->
    <div v-if="selectedCompany" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Company Details</h3>
          <button @click="selectedCompany = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Company Name</label>
            <p class="text-gray-900">{{ selectedCompany.companyName }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Industry</label>
            <p class="text-gray-900">{{ selectedCompany.industry }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Company Size</label>
            <p class="text-gray-900">{{ selectedCompany.companySize }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contact Person</label>
            <p class="text-gray-900">{{ selectedCompany.contactPerson }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <p class="text-gray-900">{{ selectedCompany.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Registration Date</label>
            <p class="text-gray-900">{{ selectedCompany.registrationDate }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Subscription</label>
            <p class="text-gray-900">{{ selectedCompany.subscription.plan }} ({{ selectedCompany.subscription.status }})</p>
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
})

const searchQuery = ref('')
const statusFilter = ref('')
const industryFilter = ref('')
const selectedCompany = ref(null)

const companies = ref([
  {
    id: 1,
    companyName: 'TechCorp Solutions',
    industry: 'technology',
    companySize: '51-200',
    contactPerson: 'Ahmed Hassan',
    email: 'ahmed@techcorp.com',
    status: 'approved',
    registrationDate: '2025-01-10',
    subscription: { plan: 'business', status: 'active' }
  },
  {
    id: 2,
    companyName: 'FinanceHub Egypt',
    industry: 'finance',
    companySize: '201-1000',
    contactPerson: 'Sara Mohamed',
    email: 'sara@financehub.com',
    status: 'pending',
    registrationDate: '2025-01-12',
    subscription: { plan: 'trial', status: 'inactive' }
  },
  {
    id: 3,
    companyName: 'HealthTech Innovations',
    industry: 'healthcare',
    companySize: '11-50',
    contactPerson: 'Mohamed Ali',
    email: 'mohamed@healthtech.com',
    status: 'approved',
    registrationDate: '2025-01-08',
    subscription: { plan: 'business', status: 'active' }
  },
  {
    id: 4,
    companyName: 'EduPlatform',
    industry: 'education',
    companySize: '1-10',
    contactPerson: 'Fatima Ahmed',
    email: 'fatima@eduplatform.com',
    status: 'rejected',
    registrationDate: '2025-01-05',
    subscription: { plan: 'trial', status: 'inactive' }
  }
])

const filteredCompanies = computed(() => {
  let filtered = companies.value

  if (searchQuery.value) {
    filtered = filtered.filter(company => 
      company.companyName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(company => company.status === statusFilter.value)
  }

  if (industryFilter.value) {
    filtered = filtered.filter(company => company.industry === industryFilter.value)
  }

  return filtered
})

const getStatusClass = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const viewCompany = (company) => {
  selectedCompany.value = company
}

const approveCompany = (id) => {
  const company = companies.value.find(c => c.id === id)
  if (company) {
    company.status = 'approved'
    alert('Company approved successfully!')
  }
}

const rejectCompany = (id) => {
  const company = companies.value.find(c => c.id === id)
  if (company) {
    company.status = 'rejected'
    alert('Company rejected.')
  }
}

const deleteCompany = (id) => {
  if (confirm('Are you sure you want to delete this company?')) {
    const index = companies.value.findIndex(c => c.id === id)
    if (index > -1) {
      companies.value.splice(index, 1)
    }
  }
}

const exportData = () => {
  alert('Exporting company data...')
}

const logout = () => {
  localStorage.removeItem('adminAuth')
  navigateTo('/admin/login')
}

useHead({
  title: 'Company Management - ProGrowth Admin'
})
</script>