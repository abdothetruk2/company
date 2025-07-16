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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">About ProGrowth</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          We're revolutionizing career development through AI-powered assessments and smart hiring solutions, 
          connecting the right talent with the right opportunities.
        </p>
      </div>

      <!-- Mission & Vision -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="card p-8">
          <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p class="text-gray-700">
            To empower individuals with data-driven career insights and help businesses find the perfect talent match 
            through comprehensive assessments and AI-powered recommendations.
          </p>
        </div>

        <div class="card p-8">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
          <p class="text-gray-700">
            To become the leading platform in the Middle East for career development and talent acquisition, 
            creating a future where everyone finds their perfect career fit.
          </p>
        </div>
      </div>

      <!-- Our Story -->
      <div class="card p-8 mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
        <div class="prose max-w-none text-gray-700">
          <p class="mb-4">
            ProGrowth was founded in 2024 with a simple yet powerful vision: to bridge the gap between talent and opportunity 
            in the rapidly evolving job market. Our founders, experienced professionals in HR technology and career development, 
            recognized the need for a more scientific and personalized approach to career guidance.
          </p>
          <p class="mb-4">
            Traditional career counseling often relies on generic advice and outdated methods. We believed there had to be a better way. 
            By combining scientifically validated assessment frameworks like MBTI and RIASEC with cutting-edge AI technology, 
            we created a platform that provides truly personalized career insights.
          </p>
          <p>
            Today, ProGrowth serves thousands of individuals and hundreds of companies across Egypt and the Middle East, 
            helping them make better career and hiring decisions through data-driven insights and comprehensive assessments.
          </p>
        </div>
      </div>

      <!-- Key Features -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Scientific Approach</h4>
            <p class="text-gray-600">
              Our assessments are based on validated psychological frameworks with 95% accuracy rate
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">AI-Powered Insights</h4>
            <p class="text-gray-600">
              Advanced algorithms analyze your results to provide personalized career recommendations
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Comprehensive Matching</h4>
            <p class="text-gray-600">
              We match candidates with opportunities based on personality, skills, and career interests
            </p>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">Our Team</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card p-6 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-2xl">AH</span>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-1">Ahmed Hassan</h4>
            <p class="text-primary-600 mb-2">CEO & Co-Founder</p>
            <p class="text-gray-600 text-sm">
              Former HR Director with 10+ years experience in talent acquisition and development
            </p>
          </div>

          <div class="card p-6 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-2xl">SM</span>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-1">Sara Mohamed</h4>
            <p class="text-primary-600 mb-2">CTO & Co-Founder</p>
            <p class="text-gray-600 text-sm">
              AI/ML expert with expertise in building scalable assessment and matching systems
            </p>
          </div>

          <div class="card p-6 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-2xl">MA</span>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-1">Mohamed Ali</h4>
            <p class="text-primary-600 mb-2">Head of Psychology</p>
            <p class="text-gray-600 text-sm">
              Licensed psychologist specializing in career counseling and personality assessment
            </p>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-primary-600 mb-2">50,000+</div>
            <div class="text-gray-700">Assessments Completed</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary-600 mb-2">1,200+</div>
            <div class="text-gray-700">Partner Companies</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary-600 mb-2">95%</div>
            <div class="text-gray-700">Career Match Accuracy</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary-600 mb-2">85%</div>
            <div class="text-gray-700">Job Placement Rate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us - ProGrowth'
})
</script>