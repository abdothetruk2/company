<template>
  <AdminSidebar>
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Student Management</h1>
          <p class="text-gray-600">Manage student users and their academic progress</p>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="exportStudents" class="btn-secondary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Export Students
          </button>
          <button @click="showBulkEmailModal = true" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Bulk Email
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Total Students</p>
              <p class="text-2xl font-semibold text-gray-900">{{ studentStats.total }}</p>
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
              <p class="text-sm font-medium text-gray-500">Active Students</p>
              <p class="text-2xl font-semibold text-gray-900">{{ studentStats.active }}</p>
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
              <p class="text-sm font-medium text-gray-500">Assessments Completed</p>
              <p class="text-2xl font-semibold text-gray-900">{{ studentStats.assessmentsCompleted }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Premium Students</p>
              <p class="text-2xl font-semibold text-gray-900">{{ studentStats.premium }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search students..."
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">University</label>
            <select v-model="universityFilter" class="input-field">
              <option value="">All Universities</option>
              <option value="Cairo University">Cairo University</option>
              <option value="Alexandria University">Alexandria University</option>
              <option value="AUC">AUC</option>
              <option value="Ain Shams University">Ain Shams University</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Assessment Status</label>
            <select v-model="assessmentFilter" class="input-field">
              <option value="">All Status</option>
              <option value="completed">Completed All</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subscription</label>
            <select v-model="subscriptionFilter" class="input-field">
              <option value="">All Subscriptions</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="clearFilters" class="btn-secondary w-full">Clear Filters</button>
          </div>
        </div>
      </div>

      <!-- Students Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Students ({{ filteredStudents.length }})</h3>
            <div class="flex items-center space-x-2">
              <button @click="selectAll" class="text-sm text-primary-600 hover:text-primary-700">
                Select All
              </button>
              <span class="text-gray-300">|</span>
              <button @click="bulkAction('email')" class="text-sm text-blue-600 hover:text-blue-700">
                Email Selected
              </button>
              <span class="text-gray-300">|</span>
              <button @click="bulkAction('suspend')" class="text-sm text-red-600 hover:text-red-700">
                Suspend Selected
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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Progress</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="student in paginatedStudents" :key="student.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" v-model="selectedStudents" :value="student.id" class="rounded border-gray-300">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-sm">{{ student.name.charAt(0) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ student.name }}</div>
                      <div class="text-sm text-gray-500">{{ student.email }}</div>
                      <div class="text-xs text-gray-400">Age: {{ student.age }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ student.university || 'Not specified' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm text-gray-900">{{ student.completedAssessments }}/3</div>
                    <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div class="bg-primary-500 h-2 rounded-full" :style="{ width: (student.completedAssessments / 3) * 100 + '%' }"></div>
                    </div>
                    <div class="ml-2 text-xs text-gray-500">{{ Math.round((student.completedAssessments / 3) * 100) }}%</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="student.subscription === 'premium' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ student.subscription }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(student.lastActive) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="viewStudent(student)" class="text-primary-600 hover:text-primary-900">View</button>
                    <button @click="emailStudent(student)" class="text-blue-600 hover:text-blue-900">Email</button>
                    <button @click="suspendStudent(student.id)" class="text-red-600 hover:text-red-900">Suspend</button>
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
                Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredStudents.length) }}</span> of <span class="font-medium">{{ filteredStudents.length }}</span> results
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

    <!-- Bulk Email Modal -->
    <div v-if="showBulkEmailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Send Bulk Email</h3>
          <button @click="showBulkEmailModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="sendBulkEmail" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
            <select v-model="bulkEmail.recipients" class="input-field" required>
              <option value="all">All Students</option>
              <option value="active">Active Students Only</option>
              <option value="premium">Premium Students Only</option>
              <option value="incomplete">Students with Incomplete Assessments</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input type="text" v-model="bulkEmail.subject" class="input-field" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea v-model="bulkEmail.message" class="input-field" rows="6" required></textarea>
          </div>
          <div class="flex space-x-4">
            <button type="button" @click="showBulkEmailModal = false" class="btn-secondary flex-1">Cancel</button>
            <button type="submit" class="btn-primary flex-1">Send Email</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Student Details Modal -->
    <div v-if="selectedStudent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Student Details</h3>
          <button @click="selectedStudent = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <p class="text-gray-900">{{ selectedStudent.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="text-gray-900">{{ selectedStudent.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Age</label>
              <p class="text-gray-900">{{ selectedStudent.age }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">University</label>
              <p class="text-gray-900">{{ selectedStudent.university || 'Not specified' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Subscription</label>
              <p class="text-gray-900">{{ selectedStudent.subscription }}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Assessment Progress</label>
              <div class="mt-2">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm text-gray-600">Completed: {{ selectedStudent.completedAssessments }}/3</span>
                  <span class="text-sm text-gray-600">{{ Math.round((selectedStudent.completedAssessments / 3) * 100) }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-primary-500 h-2 rounded-full" :style="{ width: (selectedStudent.completedAssessments / 3) * 100 + '%' }"></div>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Registration Date</label>
              <p class="text-gray-900">{{ formatDate(selectedStudent.joinedDate) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Last Active</label>
              <p class="text-gray-900">{{ formatDate(selectedStudent.lastActive) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Career Analysis</label>
              <p class="text-gray-900">{{ selectedStudent.careerAnalysis ? 'Generated' : 'Not generated' }}</p>
            </div>
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
const universityFilter = ref('')
const assessmentFilter = ref('')
const subscriptionFilter = ref('')
const showBulkEmailModal = ref(false)
const selectedStudent = ref(null)
const selectedStudents = ref([])
const selectAllChecked = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(10)

const bulkEmail = ref({
  recipients: '',
  subject: '',
  message: ''
})

const studentStats = ref({
  total: 1247,
  active: 1156,
  assessmentsCompleted: 892,
  premium: 234
})

const students = ref([
  {
    id: 1,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    age: 22,
    university: 'Cairo University',
    completedAssessments: 3,
    subscription: 'premium',
    joinedDate: '2025-01-10',
    lastActive: '2025-01-20',
    careerAnalysis: true
  },
  {
    id: 2,
    name: 'Sara Mohamed',
    email: 'sara@example.com',
    age: 21,
    university: 'Alexandria University',
    completedAssessments: 2,
    subscription: 'free',
    joinedDate: '2025-01-12',
    lastActive: '2025-01-19',
    careerAnalysis: false
  },
  {
    id: 3,
    name: 'Mohamed Ali',
    email: 'mohamed@example.com',
    age: 23,
    university: 'AUC',
    completedAssessments: 1,
    subscription: 'premium',
    joinedDate: '2025-01-08',
    lastActive: '2025-01-18',
    careerAnalysis: false
  },
  {
    id: 4,
    name: 'Fatima Ahmed',
    email: 'fatima@example.com',
    age: 20,
    university: 'Ain Shams University',
    completedAssessments: 3,
    subscription: 'free',
    joinedDate: '2025-01-15',
    lastActive: '2025-01-21',
    careerAnalysis: true
  },
  {
    id: 5,
    name: 'Omar Khaled',
    email: 'omar@example.com',
    age: 24,
    university: 'Cairo University',
    completedAssessments: 0,
    subscription: 'free',
    joinedDate: '2025-01-18',
    lastActive: '2025-01-20',
    careerAnalysis: false
  }
])

const filteredStudents = computed(() => {
  let filtered = students.value

  if (searchQuery.value) {
    filtered = filtered.filter(student => 
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (student.university && student.university.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }

  if (universityFilter.value) {
    filtered = filtered.filter(student => student.university === universityFilter.value)
  }

  if (subscriptionFilter.value) {
    filtered = filtered.filter(student => student.subscription === subscriptionFilter.value)
  }

  if (assessmentFilter.value) {
    if (assessmentFilter.value === 'completed') {
      filtered = filtered.filter(student => student.completedAssessments === 3)
    } else if (assessmentFilter.value === 'in-progress') {
      filtered = filtered.filter(student => student.completedAssessments > 0 && student.completedAssessments < 3)
    } else if (assessmentFilter.value === 'not-started') {
      filtered = filtered.filter(student => student.completedAssessments === 0)
    }
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredStudents.value.length / itemsPerPage.value))

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredStudents.value.slice(start, end)
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

const clearFilters = () => {
  searchQuery.value = ''
  universityFilter.value = ''
  assessmentFilter.value = ''
  subscriptionFilter.value = ''
}

const viewStudent = (student) => {
  selectedStudent.value = student
}

const emailStudent = (student) => {
  alert(`Sending email to ${student.name}`)
}

const suspendStudent = (id) => {
  if (confirm('Are you sure you want to suspend this student?')) {
    alert('Student suspended')
  }
}

const exportStudents = () => {
  alert('Exporting student data...')
}

const sendBulkEmail = () => {
  alert(`Sending bulk email to ${bulkEmail.value.recipients}`)
  showBulkEmailModal.value = false
  bulkEmail.value = { recipients: '', subject: '', message: '' }
}

const selectAll = () => {
  selectedStudents.value = paginatedStudents.value.map(student => student.id)
  selectAllChecked.value = true
}

const toggleSelectAll = () => {
  if (selectAllChecked.value) {
    selectedStudents.value = paginatedStudents.value.map(student => student.id)
  } else {
    selectedStudents.value = []
  }
}

const bulkAction = (action) => {
  if (selectedStudents.value.length === 0) {
    alert('Please select students first')
    return
  }
  
  if (action === 'email') {
    showBulkEmailModal.value = true
  } else if (action === 'suspend') {
    if (confirm(`Are you sure you want to suspend ${selectedStudents.value.length} students?`)) {
      alert('Students suspended')
      selectedStudents.value = []
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
  title: 'Student Management - ProGrowth Admin'
})
</script>