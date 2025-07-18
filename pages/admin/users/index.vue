<template>
  <AdminSidebar>
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
          <p class="text-gray-600">Manage all registered users</p>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="exportUsers" class="btn-secondary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Export
          </button>
          <button @click="showAddUserModal = true" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add User
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search users..."
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subscription</label>
            <select v-model="subscriptionFilter" class="input-field">
              <option value="">All Subscriptions</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Assessment Status</label>
            <select v-model="assessmentFilter" class="input-field">
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
            <input type="date" v-model="dateFilter" class="input-field" />
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Users ({{ filteredUsers.length }})</h3>
            <div class="flex items-center space-x-2">
              <button @click="selectAll" class="text-sm text-primary-600 hover:text-primary-700">
                Select All
              </button>
              <span class="text-gray-300">|</span>
              <button @click="bulkAction('delete')" class="text-sm text-red-600 hover:text-red-700">
                Delete Selected
              </button>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" v-model="selectAllChecked" @change="toggleSelectAll" class="rounded border-gray-300">
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessments</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" v-model="selectedUsers" :value="user.id" class="rounded border-gray-300">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-sm">{{ user.name.charAt(0) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.university || 'Not specified' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm text-gray-900">{{ user.completedAssessments }}/3</div>
                    <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div class="bg-primary-500 h-2 rounded-full" :style="{ width: (user.completedAssessments / 3) * 100 + '%' }"></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="user.subscription === 'premium' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.subscription }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.joinedDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="viewUser(user)" class="text-primary-600 hover:text-primary-900">View</button>
                    <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900">Edit</button>
                    <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}</span> of <span class="font-medium">{{ filteredUsers.length }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button 
                  v-for="page in visiblePages" 
                  :key="page"
                  @click="goToPage(page)"
                  :class="page === currentPage ? 'bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add User Modal -->
    <div v-if="showAddUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Add New User</h3>
          <button @click="showAddUserModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="addUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input type="text" v-model="newUser.name" class="input-field" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" v-model="newUser.email" class="input-field" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">University</label>
            <input type="text" v-model="newUser.university" class="input-field">
          </div>
          <div class="flex space-x-4">
            <button type="button" @click="showAddUserModal = false" class="btn-secondary flex-1">Cancel</button>
            <button type="submit" class="btn-primary flex-1">Add User</button>
          </div>
        </form>
      </div>
    </div>

    <!-- User Details Modal -->
    <div v-if="selectedUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">User Details</h3>
          <button @click="selectedUser = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <p class="text-gray-900">{{ selectedUser.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="text-gray-900">{{ selectedUser.email }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">University</label>
              <p class="text-gray-900">{{ selectedUser.university || 'Not specified' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Subscription</label>
              <p class="text-gray-900">{{ selectedUser.subscription }}</p>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Assessment Progress</label>
            <div class="mt-2">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm text-gray-600">Completed: {{ selectedUser.completedAssessments }}/3</span>
                <span class="text-sm text-gray-600">{{ Math.round((selectedUser.completedAssessments / 3) * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-primary-500 h-2 rounded-full" :style="{ width: (selectedUser.completedAssessments / 3) * 100 + '%' }"></div>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Joined Date</label>
            <p class="text-gray-900">{{ formatDate(selectedUser.joinedDate) }}</p>
          </div>
        </div>
      </div>
    </div>
  </AdminSidebar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '~/components/AdminSidebar.vue'

// Check authentication
onMounted(() => {
  const isAuthenticated = localStorage.getItem('adminAuth')
  if (!isAuthenticated) {
    navigateTo('/admin/login')
  }
})

const searchQuery = ref('')
const subscriptionFilter = ref('')
const assessmentFilter = ref('')
const dateFilter = ref('')
const showAddUserModal = ref(false)
const selectedUser = ref(null)
const selectedUsers = ref([])
const selectAllChecked = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(10)

const newUser = ref({
  name: '',
  email: '',
  university: ''
})

const users = ref([
  {
    id: 1,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    university: 'Cairo University',
    completedAssessments: 3,
    subscription: 'premium',
    joinedDate: '2025-01-10'
  },
  {
    id: 2,
    name: 'Sara Mohamed',
    email: 'sara@example.com',
    university: 'Alexandria University',
    completedAssessments: 2,
    subscription: 'free',
    joinedDate: '2025-01-12'
  },
  {
    id: 3,
    name: 'Mohamed Ali',
    email: 'mohamed@example.com',
    university: 'AUC',
    completedAssessments: 1,
    subscription: 'premium',
    joinedDate: '2025-01-08'
  },
  {
    id: 4,
    name: 'Fatima Ahmed',
    email: 'fatima@example.com',
    university: 'Ain Shams University',
    completedAssessments: 3,
    subscription: 'free',
    joinedDate: '2025-01-15'
  },
  {
    id: 5,
    name: 'Omar Khaled',
    email: 'omar@example.com',
    university: 'Helwan University',
    completedAssessments: 0,
    subscription: 'free',
    joinedDate: '2025-01-18'
  }
])

const filteredUsers = computed(() => {
  let filtered = users.value

  if (searchQuery.value) {
    filtered = filtered.filter(user => 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (user.university && user.university.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }

  if (subscriptionFilter.value) {
    filtered = filtered.filter(user => user.subscription === subscriptionFilter.value)
  }

  if (assessmentFilter.value) {
    if (assessmentFilter.value === 'completed') {
      filtered = filtered.filter(user => user.completedAssessments === 3)
    } else if (assessmentFilter.value === 'in-progress') {
      filtered = filtered.filter(user => user.completedAssessments > 0 && user.completedAssessments < 3)
    } else if (assessmentFilter.value === 'not-started') {
      filtered = filtered.filter(user => user.completedAssessments === 0)
    }
  }

  if (dateFilter.value) {
    filtered = filtered.filter(user => user.joinedDate === dateFilter.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredUsers.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const viewUser = (user) => {
  selectedUser.value = user
}

const editUser = (user) => {
  // Implement edit functionality
  alert(`Edit user: ${user.name}`)
}

const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    const index = users.value.findIndex(u => u.id === id)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }
}

const addUser = () => {
  const user = {
    id: Date.now(),
    name: newUser.value.name,
    email: newUser.value.email,
    university: newUser.value.university,
    completedAssessments: 0,
    subscription: 'free',
    joinedDate: new Date().toISOString().split('T')[0]
  }
  
  users.value.push(user)
  
  newUser.value = {
    name: '',
    email: '',
    university: ''
  }
  
  showAddUserModal.value = false
}

const exportUsers = () => {
  alert('Exporting user data...')
}

const selectAll = () => {
  selectedUsers.value = paginatedUsers.value.map(user => user.id)
  selectAllChecked.value = true
}

const toggleSelectAll = () => {
  if (selectAllChecked.value) {
    selectedUsers.value = paginatedUsers.value.map(user => user.id)
  } else {
    selectedUsers.value = []
  }
}

const bulkAction = (action) => {
  if (selectedUsers.value.length === 0) {
    alert('Please select users first')
    return
  }
  
  if (action === 'delete') {
    if (confirm(`Are you sure you want to delete ${selectedUsers.value.length} users?`)) {
      users.value = users.value.filter(user => !selectedUsers.value.includes(user.id))
      selectedUsers.value = []
      selectAllChecked.value = false
    }
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

useHead({
  title: 'User Management - ProGrowth Admin'
})
</script>