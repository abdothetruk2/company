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
          <NuxtLink to="/" class="btn-secondary">
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h2>
        <p class="text-xl text-gray-600 mb-8">Discover opportunities that match your skills and interests</p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
          <div class="flex gap-4">
            <input 
              type="text" 
              placeholder="Job title, keywords, or company"
              class="flex-1 input-field"
              v-model="searchQuery"
            />
            <select class="input-field w-48" v-model="selectedLocation">
              <option value="">All Locations</option>
              <option value="cairo">Cairo</option>
              <option value="alexandria">Alexandria</option>
              <option value="giza">Giza</option>
              <option value="remote">Remote</option>
            </select>
            <button class="btn-primary px-8">Search</button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card p-6 mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select class="input-field w-40" v-model="selectedCategory">
              <option value="">All Categories</option>
              <option value="technology">Technology</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
              <option value="design">Design</option>
              <option value="engineering">Engineering</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <select class="input-field w-40" v-model="selectedExperience">
              <option value="">All Levels</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <select class="input-field w-40" v-model="selectedType">
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="clearFilters" class="btn-secondary">Clear Filters</button>
          </div>
        </div>
      </div>

      <!-- Job Listings -->
      <div class="grid grid-cols-1 gap-6">
        <div v-for="job in filteredJobs" :key="job.id" class="card p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-start justify-between">
            <div class="flex items-start">
              <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-xl">{{ job.company.charAt(0) }}</span>
              </div>
              <div class="ml-4 flex-1">
                <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ job.title }}</h3>
                <p class="text-lg text-gray-700 mb-2">{{ job.company }}</p>
                <div class="flex items-center text-sm text-gray-600 mb-3">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{{ job.location }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ job.type }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ job.experience }}</span>
                </div>
                <p class="text-gray-700 mb-4">{{ job.description }}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="skill in job.skills" :key="skill" class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
            <div class="text-right flex-shrink-0 ml-4">
              <div class="text-xl font-bold text-primary-600 mb-1">{{ job.salary }}</div>
              <div class="text-sm text-gray-500 mb-4">{{ job.posted }}</div>
              <button class="btn-primary">Apply Now</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center mt-12">
        <button class="btn-secondary text-base px-8 py-3">Load More Jobs</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedLocation = ref('')
const selectedCategory = ref('')
const selectedExperience = ref('')
const selectedType = ref('')

const jobs = ref([
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'Cairo, Egypt',
    type: 'Full Time',
    experience: 'Senior Level',
    category: 'technology',
    salary: '25,000 EGP',
    description: 'We are looking for a senior software engineer to join our growing team. You will be responsible for designing and implementing scalable web applications.',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    posted: '2 days ago'
  },
  {
    id: 2,
    title: 'Marketing Specialist',
    company: 'GrowthCo',
    location: 'Alexandria, Egypt',
    type: 'Full Time',
    experience: 'Mid Level',
    category: 'marketing',
    salary: '15,000 EGP',
    description: 'Join our marketing team to develop and execute marketing campaigns that drive growth and engagement.',
    skills: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation'],
    posted: '1 day ago'
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'DesignHub',
    location: 'Remote',
    type: 'Full Time',
    experience: 'Mid Level',
    category: 'design',
    salary: '20,000 EGP',
    description: 'Create intuitive and engaging user experiences for our digital products. Work closely with product and engineering teams.',
    skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
    posted: '3 days ago'
  },
  {
    id: 4,
    title: 'Data Analyst Intern',
    company: 'DataVision',
    location: 'Cairo, Egypt',
    type: 'Internship',
    experience: 'Entry Level',
    category: 'technology',
    salary: '4,000 EGP',
    description: 'Learn data analysis and visualization techniques while working on real projects with our data science team.',
    skills: ['Python', 'SQL', 'Excel', 'Tableau'],
    posted: '1 week ago'
  },
  {
    id: 5,
    title: 'Financial Analyst',
    company: 'InvestCorp',
    location: 'Giza, Egypt',
    type: 'Full Time',
    experience: 'Entry Level',
    category: 'finance',
    salary: '18,000 EGP',
    description: 'Analyze financial data and prepare reports to support business decision-making processes.',
    skills: ['Excel', 'Financial Modeling', 'Analysis', 'PowerBI'],
    posted: '4 days ago'
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Remote',
    type: 'Full Time',
    experience: 'Senior Level',
    category: 'technology',
    salary: '30,000 EGP',
    description: 'Manage cloud infrastructure and deployment pipelines. Experience with containerization and CI/CD required.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
    posted: '5 days ago'
  }
])

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchesSearch = !searchQuery.value || 
      job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    const matchesLocation = !selectedLocation.value || job.location.toLowerCase().includes(selectedLocation.value)
    const matchesCategory = !selectedCategory.value || job.category === selectedCategory.value
    const matchesExperience = !selectedExperience.value || job.experience.toLowerCase().includes(selectedExperience.value)
    const matchesType = !selectedType.value || job.type.toLowerCase().includes(selectedType.value.replace('-', ' '))
    
    return matchesSearch && matchesLocation && matchesCategory && matchesExperience && matchesType
  })
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedLocation.value = ''
  selectedCategory.value = ''
  selectedExperience.value = ''
  selectedType.value = ''
}

useHead({
  title: 'Find Jobs - ProGrowth'
})
</script>