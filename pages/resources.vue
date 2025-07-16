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
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Career Resources</h2>
        <p class="text-xl text-gray-600">Tools and guides to accelerate your career growth</p>
      </div>

      <!-- Resource Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- Resume Builder -->
        <div class="card p-8 text-center hover:shadow-lg transition-all duration-300 group">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Resume Builder</h3>
          <p class="text-gray-600 mb-6">Create professional resumes with our AI-powered builder</p>
          <button class="btn-primary w-full">Build Resume</button>
        </div>

        <!-- Interview Prep -->
        <div class="card p-8 text-center hover:shadow-lg transition-all duration-300 group">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Interview Preparation</h3>
          <p class="text-gray-600 mb-6">Practice with mock interviews and expert tips</p>
          <button class="btn-primary w-full">Start Practice</button>
        </div>

        <!-- Career Guides -->
        <div class="card p-8 text-center hover:shadow-lg transition-all duration-300 group">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Career Guides</h3>
          <p class="text-gray-600 mb-6">Comprehensive guides for different career paths</p>
          <button class="btn-primary w-full">Browse Guides</button>
        </div>
      </div>

      <!-- Featured Articles -->
      <div class="mb-12">
        <h3 class="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="article in featuredArticles" :key="article.id" class="card p-6 hover:shadow-lg transition-all duration-300">
            <div class="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4 flex items-center justify-center">
              <svg class="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ article.title }}</h4>
            <p class="text-gray-600 mb-4">{{ article.excerpt }}</p>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">{{ article.readTime }} min read</span>
              <button class="text-primary-600 font-medium hover:text-primary-700">Read More</button>
            </div>
          </article>
        </div>
      </div>

      <!-- Tools Section -->
      <div class="mb-12">
        <h3 class="text-2xl font-bold text-gray-900 mb-8">Career Tools</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 class="ml-3 text-lg font-semibold text-gray-900">Salary Calculator</h4>
            </div>
            <p class="text-gray-600 mb-4">Calculate expected salary based on your skills and experience</p>
            <button class="btn-secondary w-full">Calculate Salary</button>
          </div>

          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 class="ml-3 text-lg font-semibold text-gray-900">Skill Assessment</h4>
            </div>
            <p class="text-gray-600 mb-4">Test your skills and get personalized improvement recommendations</p>
            <button class="btn-secondary w-full">Take Assessment</button>
          </div>

          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 class="ml-3 text-lg font-semibold text-gray-900">Network Builder</h4>
            </div>
            <p class="text-gray-600 mb-4">Connect with professionals in your field and expand your network</p>
            <button class="btn-secondary w-full">Start Networking</button>
          </div>

          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 class="ml-3 text-lg font-semibold text-gray-900">Career Timeline</h4>
            </div>
            <p class="text-gray-600 mb-4">Plan your career progression with milestone tracking</p>
            <button class="btn-secondary w-full">Create Timeline</button>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p class="text-gray-600 mb-6">Get the latest career tips and resources delivered to your inbox</p>
          <div class="max-w-md mx-auto flex gap-3">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="flex-1 input-field"
            />
            <button class="btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const featuredArticles = ref([
  {
    id: 1,
    title: '10 Tips for Acing Your Next Job Interview',
    excerpt: 'Master the art of interviewing with these proven strategies from hiring managers.',
    readTime: 5
  },
  {
    id: 2,
    title: 'Building a Strong Professional Network',
    excerpt: 'Learn how to build meaningful professional relationships that advance your career.',
    readTime: 7
  },
  {
    id: 3,
    title: 'Remote Work Best Practices',
    excerpt: 'Essential tips for thriving in a remote work environment and staying productive.',
    readTime: 6
  },
  {
    id: 4,
    title: 'Negotiating Your Salary Like a Pro',
    excerpt: 'Strategies for negotiating better compensation and benefits packages.',
    readTime: 8
  },
  {
    id: 5,
    title: 'Career Change: A Step-by-Step Guide',
    excerpt: 'Navigate career transitions successfully with this comprehensive guide.',
    readTime: 10
  },
  {
    id: 6,
    title: 'LinkedIn Optimization for Job Seekers',
    excerpt: 'Optimize your LinkedIn profile to attract recruiters and opportunities.',
    readTime: 4
  }
])

useHead({
  title: 'Career Resources - ProGrowth'
})
</script>