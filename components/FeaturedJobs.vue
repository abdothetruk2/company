<template>
<section id="jobs" class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Internships</h2>
      <p class="text-lg text-gray-600">Discover amazing opportunities from top companies</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="job in featuredJobs" :key="job.id" class="card p-6 hover:shadow-lg transition-all duration-300 group">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">{{ job.company.charAt(0) }}</span>
            </div>
            <div class="ml-3">
              <h3 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">{{ job.title }}</h3>
              <p class="text-sm text-gray-600">{{ job.company }}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-primary-600 font-semibold">{{ job.salary }}</div>
            <div class="text-sm text-gray-500">{{ job.duration }}</div>
          </div>
        </div>

        <div class="flex items-center text-sm text-gray-600 mb-4">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ job.location }}</span>
          <span class="mx-2">•</span>
          <span>{{ job.type }}</span>
        </div>

        <p class="text-gray-700 mb-4 line-clamp-3">{{ job.description }}</p>

        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="skill in job.skills" :key="skill" class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
            {{ skill }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">{{ job.posted }}</span>
          <NuxtLink :to="`/job/${job.id}/apply`" class="btn-primary text-sm">
            Apply Now
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="text-center mt-12">
      <NuxtLink to="/jobs" class="btn-secondary text-base px-8 py-3">
        View All Jobs
      </NuxtLink>
    </div>
  </div>
</section>
</template>

<script setup>
const featuredJobs = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechCorp',
    location: 'Cairo, Egypt',
    type: 'Internship',
    salary: '3,000 EGP',
    duration: '3 months',
    posted: '2 days ago',
    description: 'Join our dynamic team as a Frontend Developer Intern and gain hands-on experience with modern web technologies including Vue.js, React, and TypeScript.',
    skills: ['JavaScript', 'Vue.js', 'CSS']
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'DataFlow',
    location: 'Alexandria, Egypt',
    type: 'Internship',
    salary: '3,500 EGP',
    duration: '6 months',
    posted: '1 week ago',
    description: 'Dive into the world of data science and machine learning with our comprehensive internship program. Work on real projects with experienced mentors.',
    skills: ['Python', 'SQL', 'Machine Learning']
  },
  {
    id: 3,
    title: 'Marketing Assistant',
    company: 'BrandBoost',
    location: 'Giza, Egypt',
    type: 'Part-time',
    salary: '2,500 EGP',
    duration: 'Ongoing',
    posted: '3 days ago',
    description: 'Support our marketing team in creating engaging campaigns and building brand awareness across digital platforms.',
    skills: ['Social Media', 'Content Creation', 'Analytics']
  }
]
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.btn-primary {
  @apply bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>