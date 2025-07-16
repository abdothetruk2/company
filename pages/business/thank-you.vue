<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="flex items-center justify-center mb-6">
          <div class="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-2xl">PG</span>
          </div>
        </div>
        
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 class="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p class="text-xl text-gray-600 mb-8">
          Thank you for your submission! A representative from our team will contact you within 24 hours.
        </p>

        <!-- Calendly Integration -->
        <div class="card p-8 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Schedule Your Demo Meeting</h2>
          <p class="text-gray-600 mb-6">
            Book a convenient time for your demo meeting via Calendly/Zoom
          </p>
          
          <!-- Mock Calendly Interface -->
          <div class="bg-gray-100 rounded-lg p-8 mb-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">ProGrowth Demo Meeting</h3>
              <p class="text-gray-600 mb-4">30 minutes • Video call</p>
              
              <!-- Available Time Slots -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
                <button class="bg-white border border-gray-300 rounded-lg p-3 hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
                  <div class="font-medium text-gray-900">Tomorrow</div>
                  <div class="text-sm text-gray-600">10:00 AM</div>
                </button>
                <button class="bg-white border border-gray-300 rounded-lg p-3 hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
                  <div class="font-medium text-gray-900">Tomorrow</div>
                  <div class="text-sm text-gray-600">2:00 PM</div>
                </button>
                <button class="bg-white border border-gray-300 rounded-lg p-3 hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
                  <div class="font-medium text-gray-900">Day After</div>
                  <div class="text-sm text-gray-600">11:00 AM</div>
                </button>
                <button class="bg-white border border-gray-300 rounded-lg p-3 hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
                  <div class="font-medium text-gray-900">Day After</div>
                  <div class="text-sm text-gray-600">3:00 PM</div>
                </button>
              </div>
            </div>
          </div>
          
          <button @click="scheduleDemo" class="btn-primary text-lg px-8 py-3">
            Schedule Demo Meeting
          </button>
        </div>

        <!-- Next Steps -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div class="flex items-start">
              <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-sm">1</span>
              </div>
              <div class="ml-3">
                <h4 class="font-medium text-gray-900">Team Contact</h4>
                <p class="text-sm text-gray-600">Our team will reach out within 24 hours</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-sm">2</span>
              </div>
              <div class="ml-3">
                <h4 class="font-medium text-gray-900">Demo Meeting</h4>
                <p class="text-sm text-gray-600">Personalized demo of our platform</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-sm">3</span>
              </div>
              <div class="ml-3">
                <h4 class="font-medium text-gray-900">Contract Signing</h4>
                <p class="text-sm text-gray-600">Finalize partnership agreement</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <NuxtLink to="/" class="btn-secondary">
            Return to Homepage
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const scheduleDemo = () => {
  alert('Demo meeting scheduled! You will receive a calendar invitation shortly.')
}

useHead({
  title: 'Thank You - ProGrowth Business Partnership'
})
</script>