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
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Results Summary -->
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        </div>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Great News!</h2>
        <p class="text-xl text-gray-600 mb-2">
          Based on your results, we found <span class="font-bold text-primary-600">{{ matchedJobs }}</span> job/internship opportunities
        </p>
        <p class="text-xl text-gray-600">that perfectly match your profile.</p>
      </div>

      <!-- Premium Unlock Card -->
      <div class="card p-8 mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Unlock them now with a ProGrowth Premium Account</h3>
          <div class="flex items-center justify-center space-x-2 text-primary-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span class="font-semibold">Premium Features Included</span>
          </div>
        </div>

        <!-- Premium Features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="font-semibold text-gray-900">Personalized Job Matches</h4>
              <p class="text-gray-600 text-sm">Access to all matched opportunities</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="font-semibold text-gray-900">Discounted Courses</h4>
              <p class="text-gray-600 text-sm">Up to 50% off on premium courses</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="font-semibold text-gray-900">Exclusive Vouchers</h4>
              <p class="text-gray-600 text-sm">Monthly vouchers and rewards</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="font-semibold text-gray-900">Career Updates</h4>
              <p class="text-gray-600 text-sm">Latest job news tailored for you</p>
            </div>
          </div>
        </div>

        <!-- Pricing -->
        <div class="text-center mb-8">
          <div class="text-4xl font-bold text-primary-600 mb-2">500 EGP</div>
          <div class="text-gray-600">Annual Subscription</div>
        </div>

        <!-- Payment Methods -->
        <div class="mb-8">
          <h4 class="text-lg font-semibold text-gray-900 mb-4 text-center">Choose Payment Method</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              @click="selectedPayment = 'visa'"
              :class="selectedPayment === 'visa' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
              class="p-4 border-2 rounded-lg hover:border-primary-300 transition-colors duration-200"
            >
              <div class="text-center">
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.5 6h15v12h-15z"/>
                  </svg>
                </div>
                <div class="font-semibold text-gray-900">Visa/MasterCard</div>
              </div>
            </button>
            
            <button 
              @click="selectedPayment = 'fawry'"
              :class="selectedPayment === 'fawry' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
              class="p-4 border-2 rounded-lg hover:border-primary-300 transition-colors duration-200"
            >
              <div class="text-center">
                <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span class="text-white font-bold text-sm">F</span>
                </div>
                <div class="font-semibold text-gray-900">Fawry</div>
              </div>
            </button>
            
            <button 
              @click="selectedPayment = 'vodafone'"
              :class="selectedPayment === 'vodafone' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
              class="p-4 border-2 rounded-lg hover:border-primary-300 transition-colors duration-200"
            >
              <div class="text-center">
                <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span class="text-white font-bold text-sm">V</span>
                </div>
                <div class="font-semibold text-gray-900">Vodafone Cash</div>
              </div>
            </button>
            
            <button 
              @click="selectedPayment = 'offline'"
              :class="selectedPayment === 'offline' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
              class="p-4 border-2 rounded-lg hover:border-primary-300 transition-colors duration-200"
            >
              <div class="text-center">
                <div class="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div class="font-semibold text-gray-900">Offline Payment</div>
                <div class="text-xs text-gray-500">(Temporary)</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Subscribe Button -->
        <div class="text-center">
          <button 
            @click="handleSubscription"
            :disabled="!selectedPayment"
            :class="selectedPayment ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="text-lg px-12 py-4"
          >
            Subscribe Now - 500 EGP
          </button>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="text-center">
        <h3 class="text-xl font-semibold text-gray-900 mb-6">What Our Premium Members Say</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold">A</span>
              </div>
              <div class="ml-3 text-left">
                <div class="font-semibold text-gray-900">Ahmed Hassan</div>
                <div class="text-sm text-gray-600">Software Engineer</div>
              </div>
            </div>
            <p class="text-gray-700 italic text-sm">"Found my dream internship within 2 weeks of subscribing!"</p>
          </div>
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold">S</span>
              </div>
              <div class="ml-3 text-left">
                <div class="font-semibold text-gray-900">Sara Mohamed</div>
                <div class="text-sm text-gray-600">Marketing Intern</div>
              </div>
            </div>
            <p class="text-gray-700 italic text-sm">"The course discounts saved me thousands of pounds!"</p>
          </div>
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold">M</span>
              </div>
              <div class="ml-3 text-left">
                <div class="font-semibold text-gray-900">Mohamed Ali</div>
                <div class="text-sm text-gray-600">Data Analyst</div>
              </div>
            </div>
            <p class="text-gray-700 italic text-sm">"Perfect job matches based on my personality and skills!"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPayment = ref('')
const matchedJobs = ref(47) // This would come from the analysis results

const handleSubscription = async () => {
  if (!selectedPayment.value) return
  
  try {
    // Handle different payment methods
    if (selectedPayment.value === 'visa') {
      // Integrate with Stripe/Paymob for card payments
      await processCardPayment()
    } else if (selectedPayment.value === 'fawry') {
      // Integrate with Fawry
      await processFawryPayment()
    } else if (selectedPayment.value === 'vodafone') {
      // Integrate with Vodafone Cash
      await processVodafonePayment()
    } else if (selectedPayment.value === 'offline') {
      // Handle offline payment
      await processOfflinePayment()
    }
  } catch (error) {
    console.error('Payment failed:', error)
    alert('Payment failed. Please try again.')
  }
}

const processCardPayment = async () => {
  // Stripe/Paymob integration
  alert('Redirecting to secure payment gateway...')
  // Redirect to loyalty dashboard after successful payment
  navigateTo('/dashboard/loyalty')
}

const processFawryPayment = async () => {
  alert('Fawry payment code: 12345. Pay at any Fawry outlet.')
  navigateTo('/dashboard/loyalty')
}

const processVodafonePayment = async () => {
  alert('Vodafone Cash payment initiated. Check your phone for confirmation.')
  navigateTo('/dashboard/loyalty')
}

const processOfflinePayment = async () => {
  alert('Offline payment option selected. Our team will contact you within 24 hours.')
  navigateTo('/dashboard/loyalty')
}

useHead({
  title: 'Subscribe to Premium - ProGrowth'
})
</script>