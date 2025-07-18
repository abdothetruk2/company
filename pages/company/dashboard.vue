<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">PG</span>
            </div>
            <h1 class="ml-3 text-2xl font-bold text-gray-900">{{ company?.name || 'Company Dashboard' }}</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Welcome, {{ company?.contactPerson?.name }}</span>
            <button @click="logout" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Dashboard Overview -->
      <div v-if="activeTab === 'overview'" class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Stats Cards -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Active Jobs</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.activeJobs }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.totalApplications }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Profile Views</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.profileViews }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Hired Candidates</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.hiredCandidates }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div class="flow-root">
              <ul class="-mb-8">
                <li v-for="(activity, index) in recentActivity" :key="index">
                  <div class="relative pb-8">
                    <span v-if="index !== recentActivity.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span :class="[
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                          activity.type === 'application' ? 'bg-green-500' : 
                          activity.type === 'job_posted' ? 'bg-blue-500' : 'bg-gray-500'
                        ]">
                          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path v-if="activity.type === 'application'" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            <path v-else-if="activity.type === 'job_posted'" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
                            <path v-else fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                          </svg>
                        </span>
                      </div>
                      <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p class="text-sm text-gray-500">{{ activity.description }}</p>
                        </div>
                        <div class="text-right text-sm whitespace-nowrap text-gray-500">
                          {{ formatDate(activity.date) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Jobs Management -->
      <div v-if="activeTab === 'jobs'" class="px-4 py-6 sm:px-0">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Job Postings</h1>
            <p class="mt-2 text-sm text-gray-700">Manage your company's job postings and applications.</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              @click="showCreateJobModal = true"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
            >
              Post New Job
            </button>
          </div>
        </div>

        <!-- Jobs Table -->
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                      <th class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="job in jobs" :key="job.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ job.title }}</div>
                        <div class="text-sm text-gray-500">{{ job.location }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ job.department }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ job.applications }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="[
                          'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                          job.status === 'active' ? 'bg-green-100 text-green-800' :
                          job.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        ]">
                          {{ job.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(job.postedDate) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button @click="editJob(job)" class="text-primary-600 hover:text-primary-900 mr-4">Edit</button>
                        <button @click="viewApplications(job)" class="text-primary-600 hover:text-primary-900">View Applications</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Applications -->
      <div v-if="activeTab === 'applications'" class="px-4 py-6 sm:px-0">
        <h1 class="text-xl font-semibold text-gray-900 mb-6">Applications</h1>
        
        <!-- Applications List -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="application in applications" :key="application.id">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-700">{{ application.candidate.name.charAt(0) }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ application.candidate.name }}</div>
                      <div class="text-sm text-gray-500">Applied for {{ application.jobTitle }}</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    ]">
                      {{ application.status }}
                    </span>
                    <div class="text-sm text-gray-500">{{ formatDate(application.appliedDate) }}</div>
                    <button @click="viewApplication(application)" class="text-primary-600 hover:text-primary-900">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Company Profile -->
      <div v-if="activeTab === 'profile'" class="px-4 py-6 sm:px-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Company Profile</h3>
              <p class="mt-1 text-sm text-gray-600">Update your company information and settings.</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form @submit.prevent="updateProfile">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="company-name" class="block text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        type="text"
                        name="company-name"
                        id="company-name"
                        v-model="profileForm.name"
                        class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="industry" class="block text-sm font-medium text-gray-700">Industry</label>
                      <select
                        id="industry"
                        name="industry"
                        v-model="profileForm.industry"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div class="col-span-6">
                      <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
                      <input
                        type="url"
                        name="website"
                        id="website"
                        v-model="profileForm.website"
                        class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6">
                      <label for="description" class="block text-sm font-medium text-gray-700">Company Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        v-model="profileForm.description"
                        class="mt-1 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Tell us about your company..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    :disabled="profileLoading"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {{ profileLoading ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    <!-- Create Job Modal -->
    <div v-if="showCreateJobModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Post New Job</h3>
            <button @click="showCreateJobModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="createJob" class="space-y-4">
            <div>
              <label for="job-title" class="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                id="job-title"
                v-model="newJob.title"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="job-department" class="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                id="job-department"
                v-model="newJob.department"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="job-location" class="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="job-location"
                v-model="newJob.location"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="job-description" class="block text-sm font-medium text-gray-700">Job Description</label>
              <textarea
                id="job-description"
                v-model="newJob.description"
                rows="4"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              ></textarea>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="showCreateJobModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="jobLoading"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
              >
                {{ jobLoading ? 'Creating...' : 'Create Job' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Meta
definePageMeta({
  middleware: 'company-auth'
})

// Reactive data
const activeTab = ref('overview')
const company = ref(null)
const loading = ref(true)
const showCreateJobModal = ref(false)
const profileLoading = ref(false)
const jobLoading = ref(false)

// Tabs
const tabs = ref([
  { id: 'overview', name: 'Overview' },
  { id: 'jobs', name: 'Jobs' },
  { id: 'applications', name: 'Applications' },
  { id: 'profile', name: 'Profile' }
])

// Stats
const stats = ref({
  activeJobs: 12,
  totalApplications: 156,
  profileViews: 1234,
  hiredCandidates: 8
})

// Recent Activity
const recentActivity = ref([
  {
    type: 'application',
    description: 'New application received for Software Engineer position',
    date: new Date()
  },
  {
    type: 'job_posted',
    description: 'Posted new job: Product Manager',
    date: new Date(Date.now() - 86400000)
  },
  {
    type: 'application',
    description: 'Application reviewed for Marketing Specialist',
    date: new Date(Date.now() - 172800000)
  }
])

// Jobs
const jobs = ref([
  {
    id: 1,
    title: 'Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    applications: 45,
    status: 'active',
    postedDate: new Date(Date.now() - 604800000)
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    applications: 23,
    status: 'active',
    postedDate: new Date(Date.now() - 259200000)
  },
  {
    id: 3,
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'San Francisco, CA',
    applications: 18,
    status: 'paused',
    postedDate: new Date(Date.now() - 1209600000)
  }
])

// Applications
const applications = ref([
  {
    id: 1,
    candidate: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    jobTitle: 'Software Engineer',
    status: 'pending',
    appliedDate: new Date(Date.now() - 86400000)
  },
  {
    id: 2,
    candidate: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    jobTitle: 'Product Manager',
    status: 'reviewed',
    appliedDate: new Date(Date.now() - 172800000)
  },
  {
    id: 3,
    candidate: {
      name: 'Mike Johnson',
      email: 'mike@example.com'
    },
    jobTitle: 'Marketing Specialist',
    status: 'accepted',
    appliedDate: new Date(Date.now() - 259200000)
  }
])

// Forms
const newJob = ref({
  title: '',
  department: '',
  location: '',
  description: ''
})

const profileForm = ref({
  name: '',
  industry: '',
  website: '',
  description: ''
})

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

const logout = async () => {
  // Clear company data
  localStorage.removeItem('companyData')
  
  // Clear JWT cookie
  const token = useCookie('company_jwt')
  token.value = null
  
  // Redirect to login
  await navigateTo('/company/login')
}

const createJob = async () => {
  try {
    jobLoading.value = true
    
    const response = await $fetch('/api/company/jobs', {
      method: 'POST',
      body: newJob.value,
      headers: {
        Authorization: `Bearer ${useCookie('company_jwt').value}`
      }
    })
    
    if (response.success) {
      // Add job to local list
      jobs.value.unshift({
        id: response.job.id,
        title: newJob.value.title,
        department: newJob.value.department,
        location: newJob.value.location,
        applications: 0,
        status: 'active',
        postedDate: new Date()
      })
      
      // Reset form and close modal
      newJob.value = {
        title: '',
        department: '',
        location: '',
        description: ''
      }
      showCreateJobModal.value = false
      
      // Update stats
      stats.value.activeJobs++
    }
  } catch (error) {
    console.error('Error creating job:', error)
    alert('Failed to create job. Please try again.')
  } finally {
    jobLoading.value = false
  }
}

const editJob = (job) => {
  // Navigate to job edit page or open edit modal
  navigateTo(`/company/jobs/${job.id}/edit`)
}

const viewApplications = (job) => {
  // Navigate to applications page for this job
  navigateTo(`/company/jobs/${job.id}/applications`)
}

const viewApplication = (application) => {
  // Navigate to application details page
  navigateTo(`/company/applications/${application.id}`)
}

const updateProfile = async () => {
  try {
    profileLoading.value = true
    
    const response = await $fetch('/api/company/profile', {
      method: 'PUT',
      body: profileForm.value,
      headers: {
        Authorization: `Bearer ${useCookie('company_jwt').value}`
      }
    })
    
    if (response.success) {
      // Update local company data
      company.value = { ...company.value, ...profileForm.value }
      localStorage.setItem('companyData', JSON.stringify(company.value))
      alert('Profile updated successfully!')
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile. Please try again.')
  } finally {
    profileLoading.value = false
  }
}

const loadCompanyData = () => {
  // Load company data from localStorage
  const companyData = localStorage.getItem('companyData')
  if (companyData) {
    company.value = JSON.parse(companyData)
    
    // Populate profile form
    profileForm.value = {
      name: company.value.name || '',
      industry: company.value.companyDetails?.industry || '',
      website: company.value.companyDetails?.website || '',
      description: company.value.companyDetails?.description || ''
    }
  }
}

// Lifecycle
onMounted(() => {
  // Check authentication
  const token = useCookie('company_jwt')
  if (!token.value) {
    navigateTo('/company/login')
    return
  }
  
  loadCompanyData()
  loading.value = false
})
</script>
