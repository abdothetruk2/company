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
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Explore Top Companies</h2>
        <p class="text-xl text-gray-600 mb-8">Discover amazing companies and their career opportunities</p>
        
        <!-- Search Bar -->
        <div class="max-w-xl mx-auto">
          <div class="flex gap-4">
            <input 
              type="text" 
              placeholder="Search companies..."
              class="flex-1 input-field"
              v-model="searchQuery"
            />
            <button class="btn-primary px-8">Search</button>
          </div>
        </div>
      </div>

      <!-- Industry Filter -->
      <div class="card p-6 mb-8">
        <div class="flex flex-wrap gap-3">
          <button 
            @click="selectedIndustry = ''"
            :class="selectedIndustry === '' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            class="px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            All Industries
          </button>
          <button 
            v-for="industry in industries" 
            :key="industry"
            @click="selectedIndustry = industry"
            :class="selectedIndustry === industry ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            class="px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            {{ industry }}
          </button>
        </div>
      </div>

      <!-- Company Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="company in filteredCompanies" :key="company.id" class="card p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">{{ company.name.charAt(0) }}</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">{{ company.name }}</h3>
              <p class="text-sm text-gray-600">{{ company.industry }}</p>
            </div>
          </div>
          
          <p class="text-gray-700 mb-4">{{ company.description }}</p>
          
          <div class="flex items-center justify-between text-sm mb-4">
            <div class="flex items-center">
              <div class="flex text-yellow-400 mr-1">
                <span v-for="star in 5" :key="star">★</span>
              </div>
              <span class="text-gray-600">{{ company.rating }}</span>
            </div>
            <div class="text-gray-600">{{ company.employees }} employees</div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-primary-600 font-semibold">{{ company.openings }} openings</div>
<NuxtLink :to="`/company/${company.id}/jobs`" class="btn-primary text-sm">View Jobs</NuxtLink>
            </div>

          <!-- Company Stats -->
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="text-gray-500">Founded</div>
                <div class="font-medium text-gray-900">{{ company.founded }}</div>
              </div>
              <div>
                <div class="text-gray-500">Location</div>
                <div class="font-medium text-gray-900">{{ company.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center mt-12">
        <button class="btn-secondary text-base px-8 py-3">Load More Companies</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedIndustry = ref('')

const industries = ref([
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'E-commerce',
  'Manufacturing',
  'Consulting',
  'Media'
])

const companies = ref([
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
    name: 'FinanceHub',
    industry: 'Finance',
    description: 'Premier financial services company providing investment and banking solutions.',
    rating: 4.6,
    employees: '200-500',
    openings: 23,
    founded: '2010',
    location: 'Alexandria, Egypt'
  },
  {
    id: 3,
    name: 'HealthTech Solutions',
    industry: 'Healthcare',
    description: 'Healthcare technology company revolutionizing patient care through digital solutions.',
    rating: 4.7,
    employees: '100-200',
    openings: 18,
    founded: '2018',
    location: 'Giza, Egypt'
  },
  {
    id: 4,
    name: 'EduPlatform',
    industry: 'Education',
    description: 'Online education platform providing courses and training programs for professionals.',
    rating: 4.5,
    employees: '50-100',
    openings: 12,
    founded: '2019',
    location: 'Remote'
  },
  {
    id: 5,
    name: 'ShopEasy',
    industry: 'E-commerce',
    description: 'E-commerce platform connecting buyers and sellers across the Middle East region.',
    rating: 4.4,
    employees: '300-500',
    openings: 35,
    founded: '2016',
    location: 'Cairo, Egypt'
  },
  {
    id: 6,
    name: 'ManufacturePro',
    industry: 'Manufacturing',
    description: 'Industrial manufacturing company specializing in automotive and electronics components.',
    rating: 4.3,
    employees: '1000+',
    openings: 28,
    founded: '2005',
    location: '6th of October, Egypt'
  },
  {
    id: 7,
    name: 'ConsultMax',
    industry: 'Consulting',
    description: 'Management consulting firm helping businesses optimize operations and strategy.',
    rating: 4.6,
    employees: '100-200',
    openings: 15,
    founded: '2012',
    location: 'New Cairo, Egypt'
  },
  {
    id: 8,
    name: 'MediaWorks',
    industry: 'Media',
    description: 'Digital media agency creating compelling content and marketing campaigns.',
    rating: 4.2,
    employees: '50-100',
    openings: 20,
    founded: '2017',
    location: 'Zamalek, Egypt'
  },
  {
    id: 9,
    name: 'DataInsights',
    industry: 'Technology',
    description: 'Data analytics company providing business intelligence and machine learning solutions.',
    rating: 4.7,
    employees: '100-200',
    openings: 32,
    founded: '2020',
    location: 'Smart Village, Egypt'
  }
])

const filteredCompanies = computed(() => {
  return companies.value.filter(company => {
    const matchesSearch = !searchQuery.value || 
      company.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesIndustry = !selectedIndustry.value || company.industry === selectedIndustry.value
    
    return matchesSearch && matchesIndustry
  })
})

useHead({
  title: 'Browse Companies - ProGrowth'
})
</script>