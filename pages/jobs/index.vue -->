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
          <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">← Back to Home</NuxtLink>
          <NuxtLink to="/applications" class="btn-secondary">My Applications</NuxtLink>
          <div v-if="userProfile" class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">Welcome, {{ userProfile.name }}</span>
            <NuxtLink to="/profile" class="btn-secondary text-sm">Profile</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h2>
      <p class="text-gray-600">Discover amazing opportunities from top companies</p>
    </div>

    <!-- Search and Filters -->
    <div class="card p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Jobs</label>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Job title, company, or keywords..."
            class="input-field"
            @input="debouncedSearch"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select v-model="locationFilter" class="input-field" @change="fetchJobs">
            <option value="">All Locations</option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Giza">Giza</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
          <select v-model="typeFilter" class="input-field" @change="fetchJobs">
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Experience</label>
          <select v-model="experienceFilter" class="input-field" @change="fetchJobs">
            <option value="">All Levels</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <button @click="clearFilters" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
          Clear All Filters
        </button>
        <div class="text-sm text-gray-600">
          Showing {{ jobs.length }} of {{ pagination.totalJobs }} jobs
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- Job Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="job in jobs" :key="job.id" class="card p-6 hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">{{ job.company.charAt(0) }}</span>
          </div>
          <span class="text-sm text-gray-500">{{ job.posted }}</span>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ job.title }}</h3>
        <p class="text-primary-600 font-medium mb-3">{{ job.company }}</p>
        
        <div class="flex items-center text-gray-600 mb-4">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span class="text-sm">{{ job.location }}</span>
          <span class="mx-2">•</span>
          <span class="text-sm">{{ job.type }}</span>
        </div>
        
        <p class="text-gray-700 text-sm mb-4 line-clamp-2">{{ job.description }}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="skill in job.skills.slice(0, 3)" :key="skill" class="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium">
            {{ skill }}
          </span>
          <span v-if="job.skills.length > 3" class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
            +{{ job.skills.length - 3 }} more
          </span>
        </div>
        
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold text-primary-600">{{ job.salary }}</span>
          <div class="flex space-x-2">
            <NuxtLink :to="`/jobs/${job.id}`" class="btn-secondary text-sm px-4 py-2">
              View Job
            </NuxtLink>
            <NuxtLink :to="`/jobs/${job.id}/apply`" class="btn-primary text-sm px-4 py-2">
              Apply
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && jobs.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search criteria or filters.</p>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && jobs.length > 0 && pagination.totalPages > 1" class="mt-12 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button 
          @click="goToPage(currentPage - 1)"
          :disabled="!pagination.hasPrev"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="goToPage(page)"
          :class="page === currentPage ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
          class="px-3 py-2 text-sm font-medium border border-gray-300 rounded-md"
        >
          {{ page }}
        </button>
        
        <button 
          @click="goToPage(currentPage + 1)"
          :disabled="!pagination.hasNext"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</div>
</template>

<script setup>
// Page metadata
useHead({
  title: 'Jobs - ProGrowth',
  meta: [
    {
      name: 'description',
      content: 'Browse and apply for amazing job opportunities from top companies'
    }
  ]
})

// Reactive data
const searchQuery = ref('')
const locationFilter = ref('')
const typeFilter = ref('')
const experienceFilter = ref('')
const currentPage = ref(1)
const loading = ref(false)
const jobs = ref([])
const userProfile = ref(null)
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalJobs: 0,
  hasNext: false,
  hasPrev: false
})

// Debounced search
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchJobs()
  }, 500)
}

// Computed properties
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(pagination.value.totalPages, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const fetchJobs = async () => {
  try {
    loading.value = true
    
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: '9'
    })
    
    if (searchQuery.value) params.append('search', searchQuery.value)
    if (locationFilter.value) params.append('location', locationFilter.value)
    if (typeFilter.value) params.append('type', typeFilter.value)
    if (experienceFilter.value) params.append('experience', experienceFilter.value)
    
    const { data } = await $fetch(`/api/jobs?${params.toString()}`)
    
    if (data.success) {
      jobs.value = data.jobs
      pagination.value = data.pagination
    }
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    // Show error notification
    useNuxtApp().$toast?.error('Failed to load jobs. Please try again.')
  } finally {
    loading.value = false
  }
}

const fetchUserProfile = async () => {
  try {
    const { data } = await $fetch('/api/profile')
    if (data.success) {
      userProfile.value = data.user
    }
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    // User might not be logged in, which is fine
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  locationFilter.value = ''
  typeFilter.value = ''
  experienceFilter.value = ''
  currentPage.value = 1
  fetchJobs()
}

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    currentPage.value = page
    fetchJobs()
  }
}

// Watch for filter changes to reset pagination
watch([locationFilter, typeFilter, experienceFilter], () => {
  currentPage.value = 1
  fetchJobs()
})

// Initialize data on mount
onMounted(async () => {
  await Promise.all([
    fetchJobs(),
    fetchUserProfile()
  ])
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500;
}

.btn-primary {
  @apply bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors;
}

.btn-secondary {
  @apply bg-white text-primary-600 border border-primary-600 px-4 py-2 rounded-md hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors;
}
</style>