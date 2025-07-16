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
            <button class="btn-primary text-sm">Apply Now</button>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <button class="btn-secondary text-base px-8 py-3">View All Jobs</button>
      </div>
    </div>
  </section>
</template>

<script setup>
const featuredJobs = ref([
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$5,000/month',
    duration: '3 months',
    description: 'Join our engineering team to work on cutting-edge web applications. You\'ll collaborate with senior developers and gain hands-on experience with modern technologies.',
    skills: ['React', 'Node.js', 'Python'],
    posted: '2 days ago'
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'DataVision',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$4,500/month',
    duration: '4 months',
    description: 'Work with our data team to analyze large datasets and build predictive models. Perfect opportunity to apply machine learning concepts in real-world scenarios.',
    skills: ['Python', 'SQL', 'Machine Learning'],
    posted: '1 week ago'
  },
  {
    id: 3,
    title: 'UX Design Intern',
    company: 'DesignHub',
    location: 'Remote',
    type: 'Part-time',
    salary: '$3,000/month',
    duration: '6 months',
    description: 'Design user experiences for mobile and web applications. Work closely with product managers and developers to create intuitive interfaces.',
    skills: ['Figma', 'Sketch', 'Prototyping'],
    posted: '3 days ago'
  },
  {
    id: 4,
    title: 'Marketing Intern',
    company: 'GrowthCo',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$3,500/month',
    duration: '3 months',
    description: 'Support marketing campaigns and analyze performance metrics. Gain experience in digital marketing, content creation, and social media management.',
    skills: ['Social Media', 'Analytics', 'Content Creation'],
    posted: '5 days ago'
  },
  {
    id: 5,
    title: 'Finance Intern',
    company: 'InvestCorp',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$4,000/month',
    duration: '4 months',
    description: 'Assist with financial analysis and reporting. Work on investment research and gain exposure to financial modeling and valuation techniques.',
    skills: ['Excel', 'Financial Modeling', 'Analysis'],
    posted: '1 day ago'
  },
  {
    id: 6,
    title: 'DevOps Intern',
    company: 'CloudTech',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$4,800/month',
    duration: '3 months',
    description: 'Learn about cloud infrastructure and deployment automation. Work with containerization, CI/CD pipelines, and monitoring systems.',
    skills: ['Docker', 'AWS', 'Kubernetes'],
    posted: '4 days ago'
  }
])
</script>