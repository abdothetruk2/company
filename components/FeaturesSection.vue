<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Comprehensive Career Assessment</h2>
        <p class="text-lg text-gray-600">Three scientifically-backed assessments to unlock your potential</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Assessment 1 -->
        <div class="card p-8 text-center hover:shadow-lg transition-all duration-300 group">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Personality & Interest</h3>
          <p class="text-gray-600 mb-4">MBTI + RIASEC assessment to understand your personality type and career interests</p>
          <div class="text-primary-600 font-semibold">25 minutes</div>
        </div>

        <!-- Assessment 2 -->
        <div class="card p-8 text-center hover:shadow-lg transition-all duration-300 group">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Knowledge & Skills</h3>
          <p class="text-gray-600 mb-4">Evaluate your technical knowledge and professional skills across various domains</p>
          <div class="text-primary-600 font-semibold">30 minutes</div>
        </div>

        <!-- Assessment 3 -->
        <div class="card p-8 text-center hover:shadow-lg transition-all duration-300 group">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Soft Skills / Aptitude</h3>
          <p class="text-gray-600 mb-4">Assess your communication, leadership, problem-solving and interpersonal skills</p>
          <div class="text-primary-600 font-semibold">20 minutes</div>
        </div>
      </div>
    </div>
  </section>
</template>