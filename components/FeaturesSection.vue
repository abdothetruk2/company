<template>
  <section class="py-16 bg-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0); background-size: 20px 20px;"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <div class="inline-block animate-slide-up">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wide">Our Assessments</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4 animate-slide-up" style="animation-delay: 0.1s;">
          Comprehensive Career Assessment
        </h2>
        <p class="text-lg text-gray-600 animate-slide-up" style="animation-delay: 0.2s;">
          Three scientifically-backed assessments to unlock your potential
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-4 animate-scale-x" style="animation-delay: 0.3s;"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Assessment 1 -->
        <div class="group card p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up" style="animation-delay: 0.4s;">
          <div class="relative mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <!-- Floating Ring Animation -->
            <div class="absolute inset-0 w-16 h-16 mx-auto">
              <div class="absolute inset-0 border-2 border-blue-200 rounded-full animate-ping opacity-75"></div>
              <div class="absolute inset-0 border-2 border-purple-200 rounded-full animate-ping opacity-75" style="animation-delay: 0.5s;"></div>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            Personality & Interest
          </h3>
          <p class="text-gray-600 mb-4 leading-relaxed">
            MBTI + RIASEC assessment to understand your personality type and career interests
          </p>
          
          <!-- Features List -->
          <div class="text-left mb-4 space-y-2">
            <div class="flex items-center text-sm text-gray-500">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>16 Personality Types Analysis</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <div class="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>Career Interest Mapping</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span>Strengths & Preferences</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="text-primary-600 font-semibold flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              25 minutes
            </div>
            <div class="text-sm text-gray-500">95% Accuracy</div>
          </div>
        </div>

        <!-- Assessment 2 -->
        <div class="group card p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up" style="animation-delay: 0.5s;">
          <div class="relative mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <!-- Floating Ring Animation -->
            <div class="absolute inset-0 w-16 h-16 mx-auto">
              <div class="absolute inset-0 border-2 border-green-200 rounded-full animate-ping opacity-75"></div>
              <div class="absolute inset-0 border-2 border-teal-200 rounded-full animate-ping opacity-75" style="animation-delay: 0.5s;"></div>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
            Knowledge & Skills
          </h3>
          <p class="text-gray-600 mb-4 leading-relaxed">
            Evaluate your technical knowledge and professional skills across various domains
          </p>
          
          <!-- Features List -->
          <div class="text-left mb-4 space-y-2">
            <div class="flex items-center text-sm text-gray-500">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Technical Skills Assessment</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              <span>Domain Knowledge Testing</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>Skill Level Benchmarking</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="text-primary-600 font-semibold flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              30 minutes
            </div>
            <div class="text-sm text-gray-500">Adaptive Testing</div>
          </div>
        </div>

        <!-- Assessment 3 -->
        <div class="group card p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up" style="animation-delay: 0.6s;">
          <div class="relative mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <!-- Floating Ring Animation -->
            <div class="absolute inset-0 w-16 h-16 mx-auto">
              <div class="absolute inset-0 border-2 border-orange-200 rounded-full animate-ping opacity-75"></div>
              <div class="absolute inset-0 border-2 border-red-200 rounded-full animate-ping opacity-75" style="animation-delay: 0.5s;"></div>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
            Soft Skills / Aptitude
          </h3>
          <p class="text-gray-600 mb-4 leading-relaxed">
            Assess your communication, leadership, problem-solving and interpersonal skills
          </p>
          
          <!-- Features List -->
          <div class="text-left mb-4 space-y-2">
            <div class="flex items-center text-sm text-gray-500">
              <div class="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              <span>Communication Skills</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <div class="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span>Leadership Potential</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <div class="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
              <span>Problem-Solving Ability</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="text-primary-600 font-semibold flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              20 minutes
            </div>
            <div class="text-sm text-gray-500">Scenario-Based</div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-12 animate-slide-up" style="animation-delay: 0.7s;">
        <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Discover Your Career Path?</h3>
          <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
            Complete all three assessments to get your comprehensive career analysis and personalized job recommendations.
          </p>
          <NuxtLink to="/register/individual" class="btn-primary text-lg px-8 py-3 inline-flex items-center group">
            <span>Start Your Assessment</span>
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>