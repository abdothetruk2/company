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
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/dashboard" class="text-gray-600 hover:text-gray-900">← Back to Dashboard</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">My Applications</h2>
        <p class="text-gray-600">Track your job applications and their status</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Applications</p>
              <p class="text-2xl font-semibold text-gray-900">{{ applicationStats.total }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Pending</p>
              <p class="text-2xl font-semibold text-gray-900">{{ applicationStats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Interviews</p>
              <p class="text-2xl font-semibold text-gray-900">{{ applicationStats.interviews }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Rejected</p>
              <p class="text-2xl font-semibold text-gray-900">{{ applicationStats.rejected }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search applications..."
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="statusFilter" class="input-field">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Under Review</option>
              <option value="interview">Interview Scheduled</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select v-model="dateFilter" class="input-field">
              <option value="">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last 3 Months</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="clearFilters" class="btn-secondary w-full">Clear Filters</button>
          </div>
        </div>
      </div>

      <!-- Applications List -->
      <div class="space-y-6">
        <div v-for="application in filteredApplications" :key="application.id" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <!-- Company Logo -->
              <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-xl">{{ application.company.charAt(0) }}</span>
              </div>

              <!-- Job Details -->
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-xl font-semibold text-gray-900">{{ application.jobTitle }}</h3>
                  <span :class="getStatusClass(application.status)" class="px-3 py-1 text-xs font-medium rounded-full">
                    {{ application.status }}
                  </span>
                </div>
                <p class="text-lg text-gray-600 mb-2">{{ application.company }}</p>
                <div class="flex items-center text-sm text-gray-500 space-x-4">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ application.location }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                    </svg>
                    {{ application.type }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                    </svg>
                    Applied {{ formatDate(application.appliedDate) }}
                  </span>
                </div>

                <!-- Application Timeline -->
                <div class="mt-4">
                  <div class="flex items-center space-x-4">
                    <div v-for="(step, index) in application.timeline" :key="index" class="flex items-center">
                      <div :class="step.completed ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'" 
                           class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                        {{ index + 1 }}
                      </div>
                      <div class="ml-2 text-sm">
                        <p :class="step.completed ? 'text-primary-600 font-medium' : 'text-gray-500'">{{ step.title }}</p>
                        <p v-if="step.date" class="text-xs text-gray-400">{{ formatDate(step.date) }}</p>
                      </div>
                      <div v-if="index < application.timeline.length - 1" 
                           :class="step.completed ? 'bg-primary-500' : 'bg-gray-200'" 
                           class="w-8 h-0.5 mx-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col space-y-2">
              <button @click="viewApplication(application)" class="btn-primary text-sm">View Details</button>
              <button @click="withdrawApplication(application.id)" class="btn-secondary text-sm">Withdraw</button>
              <NuxtLink :to="`/job/${application.jobId}`" class="btn-secondary text-sm text-center">View Job</NuxtLink>
            </div>
          </div>

          <!-- Next Steps -->
          <div v-if="application.nextSteps" class="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 class="text-sm font-medium text-blue-900 mb-2">Next Steps</h4>
            <p class="text-sm text-blue-700">{{ application.nextSteps }}</p>
          </div>

          <!-- Interview Details -->
          <div v-if="application.interview" class="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 class="text-sm font-medium text-green-900 mb-2">Interview Scheduled</h4>
            <div class="text-sm text-green-700">
              <p><strong>Date:</strong> {{ formatDate(application.interview.date) }}</p>
              <p><strong>Time:</strong> {{ application.interview.time }}</p>
              <p><strong>Type:</strong> {{ application.interview.type }}</p>
              <p v-if="application.interview.location"><strong>Location:</strong> {{ application.interview.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')

// Sample applications data
const applications = ref([
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Cairo, Egypt',
    type: 'Full-time',
    status: 'interview',
    appliedDate: '2024-01-15',
    timeline: [
      { title: 'Application Submitted', completed: true, date: '2024-01-15' },
      { title: 'Under Review', completed: true, date: '2024-01-16' },
      { title: 'Interview Scheduled', completed: true, date: '2024-01-18' },
      { title: 'Final Decision', completed: false }
    ],
    interview: {
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'Video Call',
      location: 'Google Meet'
    },
    nextSteps: 'Prepare for technical interview focusing on React and JavaScript fundamentals.'
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Alexandria, Egypt',
    type: 'Full-time',
    status: 'reviewing',
    appliedDate: '2024-01-12',
    timeline: [
      { title: 'Application Submitted', completed: true, date: '2024-01-12' },
      { title: 'Under Review', completed: true, date: '2024-01-13' },
      { title: 'Interview Scheduled', completed: false },
      { title: 'Final Decision', completed: false }
    ],
    nextSteps: 'HR team is reviewing your application. You should hear back within 3-5 business days.'
  },
  {
    id: 3,
    jobId: 3,
    jobTitle: 'Backend Developer',
    company: 'InnovateTech',
    location: 'Remote',
    type: 'Contract',
    status: 'pending',
    appliedDate: '2024-01-10',
    timeline: [
      { title: 'Application Submitted', completed: true, date: '2024-01-10' },
      { title: 'Under Review', completed: false },
      { title: 'Interview Scheduled', completed: false },
      { title: 'Final Decision', completed: false }
    ]
  },
  {
    id: 4,
    jobId: 4,
    jobTitle: 'DevOps Engineer',
    company: 'CloudSolutions',
    location: 'Giza, Egypt',
    type: 'Full-time',
    status: 'rejected',
    appliedDate: '2024-01-05',
    timeline: [
      { title: 'Application Submitted', completed: true, date: '2024-01-05' },
      { title: 'Under Review', completed: true, date: '2024-01-06' },
      { title: 'Interview Scheduled', completed: false },
      { title: 'Final Decision', completed: true, date: '2024-01-08' }
    ]
  },
  {
    id: 5,
    jobId: 5,
    jobTitle: 'Mobile App Developer',
    company: 'MobileTech',
    location: 'Cairo, Egypt',
    type: 'Part-time',
    status: 'accepted',
    appliedDate: '2023-12-20',
    timeline: [
      { title: 'Application Submitted', completed: true, date: '2023-12-20' },
      { title: 'Under Review', completed: true, date: '2023-12-21' },
      { title: 'Interview Scheduled', completed: true, date: '2023-12-23' },
      { title: 'Final Decision', completed: true, date: '2024-01-02' }
    ]
  }
])

// Computed properties
const applicationStats = computed(() => {
  const total = applications.value.length
  const pending = applications.value.filter(app => app.status === 'pending').length
  const interviews = applications.value.filter(app => app.status === 'interview').length
  const rejected = applications.value.filter(app => app.status === 'rejected').length
  
  return { total, pending, interviews, rejected }
})

const filteredApplications = computed(() => {
  return applications.value.filter(app => {
    const matchesSearch = !searchQuery.value || 
      app.jobTitle.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !statusFilter.value || app.status === statusFilter.value
    
    const matchesDate = !dateFilter.value || (() => {
      const appDate = new Date(app.appliedDate)
      const now = new Date()
      const diffTime = Math.abs(now - appDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      switch (dateFilter.value) {
        case 'week': return diffDays <= 7
        case 'month': return diffDays <= 30
        case 'quarter': return diffDays <= 90
        default: return true
      }
    })()
    
    return matchesSearch && matchesStatus && matchesDate
  })
})

// Methods
const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewing: 'bg-blue-100 text-blue-800',
    interview: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    accepted: 'bg-purple-100 text-purple-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  dateFilter.value = ''
}

const viewApplication = (application) => {
  // Navigate to detailed application view
  console.log('Viewing application:', application.id)
}

const withdrawApplication = (applicationId) => {
  if (confirm('Are you sure you want to withdraw this application?')) {
    const index = applications.value.findIndex(app => app.id === applicationId)
    if (index !== -1) {
      applications.value.splice(index, 1)
    }
  }
}

useHead({
  title: 'My Applications - ProGrowth'
})
</script>

<style scoped>
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500;
}

.btn-primary {
  @apply bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors duration-200;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200;
}

.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}
</style>