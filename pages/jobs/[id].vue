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
            <NuxtLink to="/jobs" class="btn-secondary">Back to Jobs</NuxtLink>
            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">Home</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading job details...</p>
      </div>

      <!-- Job Not Found -->
      <div v-else-if="!job" class="text-center py-12">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h3>
        <p class="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <NuxtLink to="/jobs" class="btn-primary">Browse All Jobs</NuxtLink>
      </div>

      <!-- Job Details -->
      <div v-else>
        <!-- Job Header -->
        <div class="card p-8 mb-8">
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-start">
              <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-xl">{{ job.company.charAt(0) }}</span>
              </div>
              <div class="ml-4">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ job.title }}</h1>
                <p class="text-xl text-gray-700 mb-3">{{ job.company }}</p>
                <div class="flex items-center text-gray-600 mb-4">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{{ job.location }}</span>
                  <span class="mx-3">•</span>
                  <span>{{ job.type }}</span>
                  <span class="mx-3">•</span>
                  <span>{{ job.experience }}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="skill in job.skills" :key="skill" class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-primary-600 mb-1">{{ job.salary }}</div>
              <div class="text-sm text-gray-500 mb-4">{{ job.posted }}</div>
              <NuxtLink :to="`/jobs/${job.id}/${job.id}`" class="btn-primary text-lg px-8 py-3 inline-block text-center">Apply Now</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Job Description -->
        <div class="card p-8 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
          <div class="prose max-w-none text-gray-700">
            <p class="mb-4">{{ job.description }}</p>
            <p class="mb-4">{{ job.fullDescription }}</p>
          </div>
        </div>

        <!-- Requirements -->
        <div class="card p-8 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Requirements</h2>
          <ul class="space-y-2 text-gray-700">
            <li v-for="requirement in job.requirements" :key="requirement" class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ requirement }}</span>
            </li>
          </ul>
        </div>

        <!-- Benefits -->
        <div class="card p-8 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
          <ul class="space-y-2 text-gray-700">
            <li v-for="benefit in job.benefits" :key="benefit" class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ benefit }}</span>
            </li>
          </ul>
        </div>

        <!-- Apply Section -->
        <div class="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
            <p class="text-gray-600 mb-6">Join {{ job.company }} and take the next step in your career</p>
            <NuxtLink :to="`/job/${jobId}/apply`" class="btn-primary text-lg px-12 py-4 inline-block">Apply for This Position</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const jobId = route.params.id

const loading = ref(true)
const job = ref(null)

// Mock job data - in a real app, this would fetch from an API
const mockJobs = {
  '1': {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'Cairo, Egypt',
    type: 'Full Time',
    experience: 'Senior Level',
    salary: '25,000 EGP',
    description: 'We are looking for a senior software engineer to join our growing team. You will be responsible for designing and implementing scalable web applications.',
    fullDescription: 'As a Senior Software Engineer at TechCorp, you will work on cutting-edge projects that impact millions of users. You will collaborate with cross-functional teams to deliver high-quality software solutions and mentor junior developers.',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    posted: '2 days ago',
    requirements: [
      '5+ years of experience in software development',
      'Strong proficiency in React and Node.js',
      'Experience with cloud platforms (AWS preferred)',
      'Bachelor\'s degree in Computer Science or related field',
      'Excellent problem-solving and communication skills'
    ],
    benefits: [
      'Competitive salary and performance bonuses',
      'Health insurance coverage',
      'Flexible working hours and remote work options',
      'Professional development opportunities',
      'Modern office environment with latest technology'
    ]
  },
  '2': {
    id: 2,
    title: 'Marketing Specialist',
    company: 'GrowthCo',
    location: 'Alexandria, Egypt',
    type: 'Full Time',
    experience: 'Mid Level',
    salary: '15,000 EGP',
    description: 'Join our marketing team to develop and execute marketing campaigns that drive growth and engagement.',
    fullDescription: 'We are seeking a creative and data-driven Marketing Specialist to join our dynamic team. You will be responsible for developing and executing comprehensive marketing strategies across multiple channels.',
    skills: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation'],
    posted: '1 day ago',
    requirements: [
      '3+ years of experience in digital marketing',
      'Proficiency in social media platforms and analytics tools',
      'Strong content creation and copywriting skills',
      'Experience with marketing automation tools',
      'Bachelor\'s degree in Marketing or related field'
    ],
    benefits: [
      'Competitive salary package',
      'Health and dental insurance',
      'Creative and collaborative work environment',
      'Opportunities for career advancement',
      'Training and development programs'
    ]
  }
}

onMounted(async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  job.value = mockJobs[jobId] || null
  loading.value = false
})

useHead({
  title: computed(() => job.value ? `${job.value.title} at ${job.value.company} - ProGrowth` : 'Job Details - ProGrowth')
})
</script>