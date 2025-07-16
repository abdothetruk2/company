<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">PG</span>
          </div>
          <h1 class="ml-3 text-2xl font-bold text-gray-900">ProGrowth</h1>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p class="text-gray-600">Find answers to common questions about ProGrowth</p>
      </div>

      <div class="space-y-6">
        <!-- Student FAQs -->
        <div class="card p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">For Students</h3>
          <div class="space-y-4">
            <div class="border-b border-gray-200 pb-4">
              <button @click="toggleFaq('student1')" class="flex items-center justify-between w-full text-left">
                <h4 class="font-medium text-gray-900">I'm a student, why should I subscribe?</h4>
                <svg :class="openFaqs.student1 ? 'rotate-180' : ''" class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaqs.student1" class="mt-3 text-gray-700">
                <p>ProGrowth Premium gives you access to:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                  <li>Personalized job matches based on your assessment results</li>
                  <li>Up to 50% discounts on professional development courses</li>
                  <li>Exclusive vouchers and career resources</li>
                  <li>Priority access to internship opportunities</li>
                  <li>Monthly career guidance and goal tracking</li>
                </ul>
              </div>
            </div>

            <div class="border-b border-gray-200 pb-4">
              <button @click="toggleFaq('student2')" class="flex items-center justify-between w-full text-left">
                <h4 class="font-medium text-gray-900">How accurate are the career assessments?</h4>
                <svg :class="openFaqs.student2 ? 'rotate-180' : ''" class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaqs.student2" class="mt-3 text-gray-700">
                Our assessments are based on scientifically validated frameworks (MBTI and RIASEC) with 95% accuracy rate. We use AI algorithms to analyze your responses and provide personalized career recommendations.
              </div>
            </div>

            <div class="border-b border-gray-200 pb-4">
              <button @click="toggleFaq('student3')" class="flex items-center justify-between w-full text-left">
                <h4 class="font-medium text-gray-900">Can I cancel my subscription anytime?</h4>
                <svg :class="openFaqs.student3 ? 'rotate-180' : ''" class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaqs.student3" class="mt-3 text-gray-700">
                Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.
              </div>
            </div>
          </div>
        </div>

        <!-- Business FAQs -->
        <div class="card p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">For Businesses</h3>
          <div class="space-y-4">
            <div class="border-b border-gray-200 pb-4">
              <button @click="toggleFaq('business1')" class="flex items-center justify-between w-full text-left">
                <h4 class="font-medium text-gray-900">I'm a company, what will I benefit from ProGrowth?</h4>
                <svg :class="openFaqs.business1 ? 'rotate-180' : ''" class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaqs.business1" class="mt-3 text-gray-700">
                <p>ProGrowth helps businesses with:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                  <li>Access to pre-assessed, qualified candidates</li>
                  <li>Reduced hiring time by up to 50%</li>
                  <li>Better candidate-job fit through personality matching</li>
                  <li>Employee training and development programs</li>
                  <li>CSR and team building activities</li>
                  <li>Detailed analytics and hiring reports</li>
                </ul>
              </div>
            </div>

            <div class="border-b border-gray-200 pb-4">
              <button @click="toggleFaq('business2')" class="flex items-center justify-between w-full text-left">
                <h4 class="font-medium text-gray-900">How does the candidate matching work?</h4>
                <svg :class="openFaqs.business2 ? 'rotate-180' : ''" class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaqs.business2" class="mt-3 text-gray-700">
                Our AI algorithm matches candidates based on personality traits, skills assessment results, career interests, and your specific job requirements. You receive a compatibility score for each candidate.
              </div>
            </div>

            <div class="border-b border-gray-200 pb-4">
              <button @click="toggleFaq('business3')" class="flex items-center justify-between w-full text-left">
                <h4 class="font-medium text-gray-900">What's included in the business dashboard?</h4>
                <svg :class="openFaqs.business3 ? 'rotate-180' : ''" class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaqs.business3" class="mt-3 text-gray-700">
                The business dashboard includes job posting management, candidate matching, KPI tracking, hiring analytics, team training requests, and regular performance reports.
              </div>
            </div>
          </div>
        </div>

        <!-- General FAQs -->
        <div class="card p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">General Questions</h3>
          <div class="space-y-4">
            <div class="border-b border-gray-200 pb-4">
              <button @click="toggleFaq('general1')" class="flex items-center justify-between w-full text-left">
                <h4 class="font-medium text-gray-900">What payment methods do you accept?</h4>
                <svg :class="openFaqs.general1 ? 'rotate-180' : ''" class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaqs.general1" class="mt-3 text-gray-700">
                We accept Visa/MasterCard, Fawry, Vodafone Cash, and offline payment options. All payments are processed securely through encrypted gateways.
              </div>
            </div>

            <div class="border-b border-gray-200 pb-4">
              <button @click="toggleFaq('general2')" class="flex items-center justify-between w-full text-left">
                <h4 class="font-medium text-gray-900">Is my data secure?</h4>
                <svg :class="openFaqs.general2 ? 'rotate-180' : ''" class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaqs.general2" class="mt-3 text-gray-700">
                Yes, we use industry-standard encryption and security measures. Your personal information and assessment results are stored securely and never shared without your explicit consent.
              </div>
            </div>

            <div>
              <button @click="toggleFaq('general3')" class="flex items-center justify-between w-full text-left">
                <h4 class="font-medium text-gray-900">How can I contact support?</h4>
                <svg :class="openFaqs.general3 ? 'rotate-180' : ''" class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaqs.general3" class="mt-3 text-gray-700">
                You can reach our support team at support@progrowth.com or through the contact form on our website. We typically respond within 24 hours.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-8">
        <NuxtLink to="/" class="btn-secondary">
          Return to Homepage
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openFaqs = ref({})

const toggleFaq = (faqId) => {
  openFaqs.value[faqId] = !openFaqs.value[faqId]
}

useHead({
  title: 'FAQ - ProGrowth'
})
</script>