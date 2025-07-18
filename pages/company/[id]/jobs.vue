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
            <NuxtLink to="/companies" class="text-gray-600 hover:text-gray-900">← Back to Companies</NuxtLink>
            <NuxtLink to="/jobs" class="btn-secondary">All Jobs</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="card p-6">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div class="h-20 bg-gray-200 rounded mb-4"></div>
            <div class="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Company Not Found -->
    <div v-else-if="!company" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m5 0V9a2 2 0 012-2h2a2 2 0 012 2v10" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h2>
      <p class="text-gray-600 mb-6">The company you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/companies" class="btn-primary">Browse All Companies</NuxtLink>
    </div>

    <!-- Company Jobs -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Company Header -->
      <div class="card p-8 mb-8">
        <div class="flex items-center mb-6">
          <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-2xl">{{ company.name.charAt(0) }}</span>
          </div>
          <div class="ml-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ company.name }}</h1>
            <p class="text-xl text-gray-600 mb-3">{{ company.industry }}</p>
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>{{ company.location }}</span>
              <span class="mx-3">•</span>
              <span>{{ company.employees }} employees</span>
              <span class="mx-3">•</span>
              <div class="flex items-center">
                <div class="flex text-yellow-400 mr-1">
                  <span v-for="star in 5" :key="star">★</span>
                </div>
                <span>{{ company.rating }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <p class="text-gray-700 mb-6">{{ company.description }}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-4 bg-primary-50 rounded-lg">
            <div class="text-2xl font-bold text-primary-600">{{ companyJobs.length }}</div>
            <div class="text-sm text-gray-600">Open Positions</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ company.founded }}</div>
            <div class="text-sm text-gray-600">Founded</div>
          </div>
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{{ company.employees }}</div>
            <div class="text-sm text-gray-600">Team Size</div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card p-6 mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex-1 min-w-64">
            <input 
              type="text" 
              placeholder="Search jobs..."
              class="input-field"
              v-model="searchQuery"
            />
          </div>
          <select v-model="selectedType" class="input-field w-auto">
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <select v-model="selectedExperience" class="input-field w-auto">
            <option value="">All Levels</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      <!-- Jobs Grid -->
      <div v-if="filteredJobs.length === 0" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No Jobs Found</h3>
        <p class="text-gray-600">No jobs match your current filters. Try adjusting your search criteria.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="job in filteredJobs" :key="job.id" class="card p-6 hover:shadow-lg transition-shadow duration-200">
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
            <span class="mx-2">•</span>
            <span class="text-sm">{{ job.experience }}</span>
          </div>
          
          <p class="text-gray-700 text-sm mb-4 line-clamp-2">{{ job.description }}</p>
           <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="skill in job.skills.slice(0, 3)" :key="skill" class="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
              {{ skill }}
            </span>
            <span v-if="job.skills.length > 3" class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{{ job.skills.length - 3 }} more
            </span>
          </div>

          <div class="flex items-center justify-between mb-4">
            <div class="text-lg font-bold text-primary-600">{{ job.salary }}</div>
            <div class="text-sm text-gray-500">{{ job.experience }}</div>
          </div>

          <div class="flex space-x-2">
            <NuxtLink :to="`/job/${job.id}`" class="btn-secondary flex-1 text-center text-sm">
              View Details
            </NuxtLink>
            <NuxtLink :to="`/job/${job.id}/apply`" class="btn-primary flex-1 text-center text-sm">
              Apply Now
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="filteredJobs.length > 0" class="text-center mt-12">
        <button class="btn-secondary text-base px-8 py-3">Load More Jobs</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const companyId = parseInt(route.params.id)

const loading = ref(true)
const company = ref(null)
const companyJobs = ref([])
const searchQuery = ref('')
const selectedType = ref('')
const selectedExperience = ref('')

// Sample companies data
const companies = [
  {
    id: 1,
    name: 'TechCorp',
    industry: 'Technology',
    description: 'Leading technology company focused on innovative software solutions and digital transformation.',
    rating: 4.8,
    employees: '500-1000',
    openings: 45,
    founded: '2015',
    location: 'Cairo, Egypt'
  },
  {
    id: 2,
    name: 'DataFlow',
    industry: 'Data Analytics',
    description: 'Data analytics company providing business intelligence and machine learning solutions.',
    rating: 4.6,
    employees: '100-200',
    openings: 23,
    founded: '2018',
    location: 'Alexandria, Egypt'
  },
  {
    id: 3,
    name: 'BrandBoost',
    industry: 'Marketing & Advertising',
    description: 'Digital marketing agency creating compelling content and marketing campaigns.',
    rating: 4.7,
    employees: '20-50',
    openings: 18,
    founded: '2019',
    location: 'Giza, Egypt'
  },
  {
    id: 4,
    name: 'ServerTech',
    industry: 'Technology',
    description: 'Cloud infrastructure and backend services company.',
    rating: 4.5,
    employees: '100-200',
    openings: 12,
    founded: '2017',
    location: 'Cairo, Egypt'
  }
]

// Sample jobs data
const allJobs = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechCorp',
    location: 'Cairo',
    type: 'Internship',
    experience: 'Entry Level',
    salary: '3,000 EGP',
    posted: '2 days ago',
    description: 'Join our dynamic team as a Frontend Developer Intern and gain hands-on experience with modern web technologies.',
    skills: ['JavaScript', 'Vue.js', 'CSS', 'HTML']
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'DataFlow',
    location: 'Alexandria',
    type: 'Internship',
    experience: 'Entry Level',
    salary: '3,500 EGP',
    posted: '1 week ago',
    description: 'Dive into the world of data science and machine learning with our comprehensive internship program.',
    skills: ['Python', 'SQL', 'Machine Learning', 'Pandas']
  },
  {
    id: 3,
    title: 'Marketing Assistant',
    company: 'BrandBoost',
    location: 'Giza',
    type: 'Part-time',
    experience: 'Entry Level',
    salary: '2,500 EGP',
    posted: '3 days ago',
    description: 'Support our marketing team in creating engaging campaigns and building brand awareness.',
    skills: ['Social Media', 'Content Creation', 'Analytics', 'Canva']
  },
  {
    id: 4,
    title: 'Backend Developer',
    company: 'ServerTech',
    location: 'Cairo',
    type: 'Full-time',
    experience: 'Mid Level',
    salary: '12,000 EGP',
    posted: '5 days ago',
    description: 'Build scalable backend systems and APIs for our growing platform.',
    skills: ['Node.js', 'Python', 'MongoDB', 'AWS']
  },
  {
    id: 5,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Cairo',
    type: 'Full-time',
    experience: 'Senior Level',
    salary: '18,000 EGP',
    posted: '1 week ago',
    description: 'Lead frontend development projects and mentor junior developers.',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL']
  },
  {
    id: 6,
    title: 'UI/UX Designer',
    company: 'TechCorp',
    location: 'Cairo',
    type: 'Full-time',
    experience: 'Mid Level',
    salary: '10,000 EGP',
    posted: '4 days ago',
    description: 'Design intuitive user interfaces and create exceptional user experiences.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
  },
  {
    id: 7,
    title: 'Data Analyst',
    company: 'DataFlow',
    location: 'Alexandria',
    type: 'Full-time',
    experience: 'Entry Level',
    salary: '8,000 EGP',
    posted: '6 days ago',
    description: 'Analyze data trends and create insightful reports for business decisions.',
    skills: ['Excel', 'SQL', 'Tableau', 'Python']
  },
  {
    id: 8,
    title: 'Social Media Manager',
    company: 'BrandBoost',
    location: 'Giza',
    type: 'Full-time',
    experience: 'Mid Level',
    salary: '9,000 EGP',
    posted: '2 weeks ago',
    description: 'Manage social media presence and develop engaging content strategies.',
    skills: ['Social Media Strategy', 'Content Planning', 'Analytics', 'Copywriting']
  },
  {
    id: 9,
    title: 'DevOps Engineer',
    company: 'ServerTech',
    location: 'Cairo',
    type: 'Full-time',
    experience: 'Senior Level',
    salary: '20,000 EGP',
    posted: '1 week ago',
    description: 'Manage cloud infrastructure and implement CI/CD pipelines.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins']
  },
  {
    id: 10,
    title: 'Product Manager Intern',
    company: 'TechCorp',
    location: 'Cairo',
    type: 'Internship',
    experience: 'Entry Level',
    salary: '4,000 EGP',
    posted: '3 days ago',
    description: 'Learn product management fundamentals and assist in product development.',
    skills: ['Product Strategy', 'Market Research', 'Analytics', 'Communication']
  }
]

// Computed property for filtered jobs
const filteredJobs = computed(() => {
  return companyJobs.value.filter(job => {
    const matchesSearch = !searchQuery.value || 
      job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    const matchesType = !selectedType.value || job.type === selectedType.value
    const matchesExperience = !selectedExperience.value || job.experience === selectedExperience.value
    
    return matchesSearch && matchesType && matchesExperience
  })
})

// Fetch company and jobs data
onMounted(() => {
  setTimeout(() => {
    // Find company by ID
    company.value = companies.find(c => c.id === companyId)
    
    if (company.value) {
      // Filter jobs for this company
      companyJobs.value = allJobs.filter(job => job.company === company.value.name)
    }
    
    loading.value = false
  }, 1000)
})

useHead({
  title: computed(() => company.value ? `Jobs at ${company.value.name} - ProGrowth` : 'Company Jobs - ProGrowth')
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

.btn-primary {
  @apply bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200;
}

.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}
</style>