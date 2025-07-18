<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Companies Management</h1>
        <p class="text-gray-600">Manage all companies in the system</p>
      </div>
      <button 
        @click="showAddModal = true"
        class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add Company
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input 
            v-model="filters.search"
            type="text" 
            placeholder="Search companies..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <select 
            v-model="filters.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <select 
            v-model="filters.industry"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Industries</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="retail">Retail</option>
          </select>
        </div>
        <div>
          <button 
            @click="loadCompanies"
            class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Companies Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
        <p class="mt-2 text-gray-600">Loading companies...</p>
      </div>
      
      <div v-else-if="companies.length === 0" class="p-8 text-center text-gray-500">
        No companies found
      </div>
      
      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="company in companies" :key="company._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div>
                <div class="text-sm font-medium text-gray-900">{{ company.name }}</div>
                <div class="text-sm text-gray-500">{{ company.email }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ company.contactPerson?.name }}</div>
              <div class="text-sm text-gray-500">{{ company.contactPerson?.phone }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-yellow-100 text-yellow-800': company.status === 'pending',
                  'bg-green-100 text-green-800': company.status === 'approved',
                  'bg-red-100 text-red-800': company.status === 'rejected'
                }"
              >
                {{ company.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ company.companyDetails?.industry }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(company.createdAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                @click="editCompany(company)"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </button>
              <button 
                @click="deleteCompany(company._id)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.totalPages > 1" class="mt-6 flex justify-between items-center">
      <div class="text-sm text-gray-700">
        Showing {{ (pagination.currentPage - 1) * 10 + 1 }} to {{ Math.min(pagination.currentPage * 10, pagination.totalCompanies) }} of {{ pagination.totalCompanies }} companies
      </div>
      <div class="flex space-x-2">
        <button 
          @click="changePage(pagination.currentPage - 1)"
          :disabled="!pagination.hasPrev"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          @click="changePage(pagination.currentPage + 1)"
          :disabled="!pagination.hasNext"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Add/Edit Company Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ showEditModal ? 'Edit Company' : 'Add New Company' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Company Form -->
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input 
                  v-model="form.name"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter company name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="company@example.com"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input 
                  v-model="form.password"
                  type="password" 
                  :required="!showEditModal"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter password"
                />
                <p v-if="showEditModal" class="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select 
                  v-model="form.status"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <!-- Contact Person -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Contact Person</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input 
                    v-model="form.contactPerson.name"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter contact person name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                  <input 
                    v-model="form.contactPerson.position"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter position"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input 
                    v-model="form.contactPerson.phone"
                    type="tel" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter contact person phone"
                  />
                </div>
              </div>
            </div>

            <!-- Company Details -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Company Details</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                  <select 
                    v-model="form.companyDetails.industry"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    v-model="form.companyDetails.address"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter company address"
                  />
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button 
                type="submit"
                class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// Define page meta for admin layout
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

// Reactive data
const companies = ref([])
const loading = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingCompany = ref(null)
const pagination = ref(null)

// Filters
const filters = ref({
  search: '',
  status: '',
  industry: '',
  page: 1,
  limit: 10
})

// Form data
const form = ref({
  name: '',
  email: '',
  password: '',
  status: 'approved',
  contactPerson: {
    name: '',
    position: '',
    phone: ''
  },
  companyDetails: {
    industry: 'technology',
    size: '1-10',
    website: '',
    description: '',
    address: ''
  },
  subscription: {
    plan: 'basic',
    status: 'active',
    jobPostsLimit: 5
  }
})

// Load companies from API
const loadCompanies = async () => {
  try {
    loading.value = true
    const token = useCookie('admin-token')
    
    const query = new URLSearchParams()
    if (filters.value.search) query.append('search', filters.value.search)
    if (filters.value.status) query.append('status', filters.value.status)
    if (filters.value.industry) query.append('industry', filters.value.industry)
    query.append('page', filters.value.page)
    query.append('limit', filters.value.limit)

    const { data } = await $fetch(`/api/admin/companies?${query.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })

    companies.value = data.companies
    pagination.value = data.pagination
  } catch (error) {
    console.error('Error loading companies:', error)
    // Handle error - show notification
  } finally {
    loading.value = false
  }
}

// Submit form (add or edit)
const submitForm = async () => {
  try {
    const token = useCookie('admin-token')
    
    // Prepare form data
    const formData = {
      name: form.value.name,
      email: form.value.email,
      contactPerson: {
        name: form.value.contactPerson.name,
        position: form.value.contactPerson.position || 'Manager',
        phone: form.value.contactPerson.phone
      },
      companyDetails: {
        industry: form.value.companyDetails.industry,
        size: form.value.companyDetails.size,
        website: form.value.companyDetails.website,
        description: form.value.companyDetails.description,
        address: form.value.companyDetails.address ? {
          street: form.value.companyDetails.address,
          city: '',
          state: '',
          country: '',
          zipCode: ''
        } : {}
      },
      status: form.value.status,
      subscription: form.value.subscription
    }

    // Add password only if provided
    if (form.value.password) {
      formData.password = form.value.password
    }

    let response
    if (showEditModal.value && editingCompany.value) {
      // Update existing company
      response = await $fetch(`/api/admin/companies/${editingCompany.value.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json'
        },
        body: formData
      })
    } else {
      // Create new company
      response = await $fetch('/api/admin/companies', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json'
        },
        body: formData
      })
    }

    if (response.success) {
      // Show success message
      console.log('Company saved successfully')
      closeModal()
      await loadCompanies()
    }
  } catch (error) {
    console.error('Error saving company:', error)
    // Handle error - show notification
  }
}

// Edit company
const editCompany = (company) => {
  editingCompany.value = company
  
  // Populate form with company data
  form.value = {
    name: company.name,
    email: company.email,
    password: '', // Don't populate password for security
    status: company.status,
    contactPerson: {
      name: company.contactPerson?.name || '',
      position: company.contactPerson?.position || '',
      phone: company.contactPerson?.phone || ''
    },
    companyDetails: {
      industry: company.companyDetails?.industry || 'technology',
      size: company.companyDetails?.size || '1-10',
      website: company.companyDetails?.website || '',
      description: company.companyDetails?.description || '',
      address: company.companyDetails?.address?.street || ''
    },
    subscription: {
      plan: company.subscription?.plan || 'basic',
      status: company.subscription?.status || 'active',
      jobPostsLimit: company.subscription?.jobPostsLimit || 5
    }
  }
  
  showEditModal.value = true
}

// Delete company
const deleteCompany = async (companyId) => {
  if (!confirm('Are you sure you want to delete this company?')) {
    return
  }

  try {
    const token = useCookie('admin-token')
    
    const response = await $fetch(`/api/admin/companies/${companyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })

    if (response.success) {
      console.log('Company deleted successfully')
      await loadCompanies()
    }
  } catch (error) {
    console.error('Error deleting company:', error)
    // Handle error - show notification
  }
}

// Close modal and reset form
const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingCompany.value = null
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    password: '',
    status: 'approved',
    contactPerson: {
      name: '',
      position: '',
      phone: ''
    },
    companyDetails: {
      industry: 'technology',
      size: '1-10',
      website: '',
      description: '',
      address: ''
    },
    subscription: {
      plan: 'basic',
      status: 'active',
      jobPostsLimit: 5
    }
  }
}

// Change page
const changePage = (page) => {
  filters.value.page = page
  loadCompanies()
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}

// Load companies on component mount
onMounted(() => {
  loadCompanies()
})

// Watch filters for auto-reload
watch(() => filters.value.search, () => {
  filters.value.page = 1
  loadCompanies()
}, { debounce: 500 })
</script>

<style scoped>
/* Add any custom styles here */
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500;
}
</style>