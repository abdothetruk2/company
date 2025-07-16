<template>
  <section class="relative bg-gradient-to-br from-primary-50 to-secondary-50 pt-16 pb-20">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 animate-bounce-gentle"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-200 rounded-full opacity-20 animate-bounce-gentle" style="animation-delay: 1s;"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
          Discover Your Career Fit
          <br>
          <span class="text-primary-600">or Hire Smarter</span>
          <br>
          <span class="text-2xl md:text-3xl text-gray-600">— with ProGrowth</span>
        </h1>
        <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-slide-up">
          Advanced career assessments and smart hiring solutions to match the right talent with the right opportunities
        </p>

        <!-- Main Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
          <NuxtLink 
            to="/register/individual"
            class="group bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[280px]"
          >
            <div class="flex items-center justify-center">
              <svg class="w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              I'm an Individual
            </div>
            <div class="text-sm text-primary-100 mt-1">Student or career developer</div>
          </NuxtLink>

          <NuxtLink 
            to="/business/partnership"
            class="group bg-white hover:bg-gray-50 text-primary-600 font-semibold py-4 px-8 rounded-xl text-lg border-2 border-primary-200 hover:border-primary-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[280px]"
          >
            <div class="flex items-center justify-center">
              <svg class="w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
              </svg>
              We're a Business
            </div>
            <div class="text-sm text-primary-500 mt-1">Company interested in partnership</div>
          </NuxtLink>
        </div>

        <!-- Quick stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">50,000+</div>
            <div class="text-gray-600">Assessments Completed</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">1,200+</div>
            <div class="text-gray-600">Partner Companies</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">95%</div>
            <div class="text-gray-600">Career Match Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic here
</script>