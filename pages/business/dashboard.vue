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
            <div class="ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              BUSINESS
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">{{ companyName }}</div>
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
      <!-- Welcome Section -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold mb-2">Business Dashboard</h2>
              <p class="text-blue-100">Manage your hiring and talent development</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold">{{ activeJobs }}</div>
              <div class="text-blue-100">Active Jobs</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Add Job Posting -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-gray-900">Job Postings</h3>
              <button @click="showAddJobModal = true" class="btn-primary">
                Add New Job
              </button>
            </div>
            
            <div class="space-y-4">
              <div v-for="job in jobPostings" :key="job.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ job.title }}</h4>
                    <p class="text-sm text-gray-600 mb-2">{{ job.department }} • {{ job.location }}</p>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{{ job.applicants }} applicants</span>
                      <span>{{ job.matches }} matches</span>
                      <span class="text-primary-600">{{ job.status }}</span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button class="btn-secondary text-sm">View</button>
                    <button class="btn-primary text-sm">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Candidate Matches -->
          <div class="card p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Matched Candidates</h3>
            <div class="space-y-4">
              <div v-for="candidate in matchedCandidates" :key="candidate.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-start justify-between">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold">{{ candidate.name.charAt(0) }}</span>
                    </div>
                    <div class="ml-3">
                      <h4 class="font-semibold text-gray-900">{{ candidate.name }}</h4>
                      <p class="text-sm text-gray-600">{{ candidate.position }}</p>
                      <div class="flex items-center text-xs text-gray-500 mt-1">
                        <span class="text-primary-600 font-medium">{{ candidate.match }}% match</span>
                        <span class="mx-2">•</span>
                        <span>{{ candidate.experience }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button class="btn-secondary text-sm">View Profile</button>
                    <button class="btn-primary text-sm">Interview</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- KPIs -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">Hiring Target</span>
                  <span class="text-sm font-medium">15/20</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-primary-500 h-2 rounded-full" style="width: 75%"></div>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">Time to Hire</span>
                  <span class="text-sm font-medium">12 days</span>
                </div>
                <div class="text-xs text-green-600">↓ 40% improvement</div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">Quality Score</span>
                  <span class="text-sm font-medium">8.5/10</span>
                </div>
                <div class="text-xs text-green-600">↑ 15% improvement</div>
              </div>
            </div>
          </div>

          <!-- Reports -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Reports & Feedback</h3>
            <div class="space-y-3">
              <button class="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div class="font-medium text-gray-900">Monthly Hiring Report</div>
                <div class="text-sm text-gray-600">January 2025</div>
              </button>
              <button class="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div class="font-medium text-gray-900">Candidate Quality Analysis</div>
                <div class="text-sm text-gray-600">Last 30 days</div>
              </button>
              <button class="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div class="font-medium text-gray-900">Training Effectiveness</div>
                <div class="text-sm text-gray-600">Q4 2024</div>
              </button>
            </div>
          </div>

          <!-- Special Requests -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Special Requests</h3>
            <div class="space-y-3">
              <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div class="font-medium text-blue-900">CSR Training Program</div>
                <div class="text-sm text-blue-700">Internal training for 50 employees</div>
                <div class="text-xs text-blue-600 mt-1">Status: In Progress</div>
              </div>
              <div class="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div class="font-medium text-green-900">Team Building Activity</div>
                <div class="text-sm text-green-700">Quarterly team building event</div>
                <div class="text-xs text-green-600 mt-1">Status: Completed</div>
              </div>
            </div>
            <button class="btn-secondary w-full mt-4">Request New Service</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Job Modal -->
    <div v-if="showAddJobModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Add New Job</h3>
          <button @click="showAddJobModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="addJob" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input type="text" v-model="newJob.title" class="input-field" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input type="text" v-model="newJob.department" class="input-field" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input type="text" v-model="newJob.location" class="input-field" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Required KPIs</label>
            <textarea v-model="newJob.kpis" class="input-field" rows="3" placeholder="List the KPIs required for each candidate..."></textarea>
          </div>
          <div class="flex space-x-4">
            <button type="button" @click="showAddJobModal = false" class="btn-secondary flex-1">Cancel</button>
            <button type="submit" class="btn-primary flex-1">Add Job</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const companyName = ref('TechCorp Inc.')
const activeJobs = ref(8)
const showAddJobModal = ref(false)

const newJob = ref({
  title: '',
  department: '',
  location: '',
  kpis: ''
})

const jobPostings = ref([
  {
    id: 1,
    title: 'Software Engineering Intern',
    department: 'Engineering',
    location: 'Cairo, Egypt',
    applicants: 45,
    matches: 12,
    status: 'Active'
  },
  {
    id: 2,
    title: 'Marketing Intern',
    department: 'Marketing',
    location: 'Remote',
    applicants: 32,
    matches: 8,
    status: 'Active'
  },
  {
    id: 3,
    title: 'Data Analyst Intern',
    department: 'Data Science',
    location: 'Alexandria, Egypt',
    applicants: 28,
    matches: 15,
    status: 'Paused'
  }
])

const matchedCandidates = ref([
  {
    id: 1,
    name: 'Ahmed Hassan',
    position: 'Software Engineering Intern',
    match: 95,
    experience: '2 years experience'
  },
  {
    id: 2,
    name: 'Sara Mohamed',
    position: 'Marketing Intern',
    match: 92,
    experience: 'Fresh graduate'
  },
  {
    id: 3,
    name: 'Mohamed Ali',
    position: 'Data Analyst Intern',
    match: 88,
    experience: '1 year experience'
  }
])

const addJob = () => {
  // Add job logic
  jobPostings.value.push({
    id: Date.now(),
    title: newJob.value.title,
    department: newJob.value.department,
    location: newJob.value.location,
    applicants: 0,
    matches: 0,
    status: 'Active'
  })
  
  // Reset form
  newJob.value = {
    title: '',
    department: '',
    location: '',
    kpis: ''
  }
  
  showAddJobModal.value = false
}

useHead({
  title: 'Business Dashboard - ProGrowth'
})
</script>