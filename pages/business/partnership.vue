<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">PG</span>
          </div>
          <h1 class="ml-3 text-2xl font-bold text-gray-900">ProGrowth</h1>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Business Partnership</h2>
        <p class="text-gray-600">Partner with us for smarter hiring and talent development</p>
      </div>

      <div class="card p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Company Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
            <input 
              type="text" 
              v-model="form.companyName"
              class="input-field"
              placeholder="Enter company name"
              required
            />
          </div>

          <!-- Industry -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
            <select v-model="form.industry" class="input-field" required>
              <option value="">Select industry</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="consulting">Consulting</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Number of Employees -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Number of Employees *</label>
            <select v-model="form.employeeCount" class="input-field" required>
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees (Startup)</option>
              <option value="11-50">11-50 employees (Small)</option>
              <option value="51-200">51-200 employees (Medium)</option>
              <option value="201-1000">201-1000 employees (Large)</option>
              <option value="1000+">1000+ employees (Enterprise)</option>
            </select>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input 
              type="text" 
              v-model="form.location"
              class="input-field"
              placeholder="City, Country"
              required
            />
          </div>

          <!-- Partnership Goals -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What are your goals from the partnership? *</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="form.goals" value="recruitment" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                <span class="ml-2 text-sm text-gray-700">Recruitment & Hiring</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="form.goals" value="training" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                <span class="ml-2 text-sm text-gray-700">Employee Training & Development</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="form.goals" value="csr" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                <span class="ml-2 text-sm text-gray-700">CSR & Community Programs</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="form.goals" value="branding" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                <span class="ml-2 text-sm text-gray-700">Employer Branding</span>
              </label>
            </div>
          </div>

          <!-- KPIs -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What KPIs do you want to achieve from the contract? *</label>
            <textarea 
              v-model="form.kpis"
              class="input-field"
              rows="3"
              placeholder="e.g., Hire 20 qualified interns per quarter, Reduce hiring time by 50%, Improve employee retention rate..."
              required
            ></textarea>
          </div>

          <!-- Meeting Request -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Would you like a demo meeting?</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="radio" v-model="form.wantsMeeting" value="yes" class="border-gray-300 text-primary-600 focus:ring-primary-500">
                <span class="ml-2 text-sm text-gray-700">Yes, schedule a demo meeting</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="form.wantsMeeting" value="no" class="border-gray-300 text-primary-600 focus:ring-primary-500">
                <span class="ml-2 text-sm text-gray-700">No, proceed with information only</span>
              </label>
            </div>
          </div>

          <!-- Pricing Plans -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-4">Choose Your Plan *</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Trial Plan -->
              <div 
                @click="form.selectedPlan = 'trial'"
                :class="form.selectedPlan === 'trial' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
                class="border-2 rounded-lg p-4 cursor-pointer hover:border-primary-300 transition-colors duration-200"
              >
                <div class="text-center">
                  <h4 class="font-semibold text-gray-900 mb-2">1-Month Trial</h4>
                  <div class="text-2xl font-bold text-primary-600 mb-2">
                    {{ getTrialPrice }} EGP
                  </div>
                  <p class="text-sm text-gray-600">Perfect for testing our services</p>
                </div>
              </div>

              <!-- Annual Plan -->
              <div 
                @click="form.selectedPlan = 'annual'"
                :class="form.selectedPlan === 'annual' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
                class="border-2 rounded-lg p-4 cursor-pointer hover:border-primary-300 transition-colors duration-200"
              >
                <div class="text-center">
                  <h4 class="font-semibold text-gray-900 mb-2">Annual Subscription</h4>
                  <div class="text-2xl font-bold text-primary-600 mb-2">
                    {{ getAnnualPrice }} EGP
                  </div>
                  <p class="text-sm text-gray-600">Best value with discounted rate</p>
                  <div class="text-xs text-green-600 font-medium mt-1">Save 20%</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
              <input 
                type="text" 
                v-model="form.contactPerson"
                class="input-field"
                placeholder="Full name"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Email *</label>
              <input 
                type="email" 
                v-model="form.email"
                class="input-field"
                placeholder="business@company.com"
                required
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <div v-if="showStripePayment">
              <StripePayment 
                customer-type="company"
                :customer-info="companyInfo"
                @success="handlePaymentSuccess"
                @error="handlePaymentError"
              />
            </div>
            <div v-else>
              <button type="submit" class="btn-primary w-full text-lg py-3">
                Submit & Schedule Call
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StripePayment from '~/components/StripePayment.vue'

const form = ref({
  companyName: '',
  industry: '',
  employeeCount: '',
  location: '',
  goals: [],
  kpis: '',
  wantsMeeting: '',
  selectedPlan: '',
  contactPerson: '',
  email: ''
})

const showStripePayment = ref(false)
const companyInfo = ref({
  id: 'company_123', // This would be generated after form submission
  name: '',
  email: '',
  companyName: ''
})

const getTrialPrice = computed(() => {
  const prices = {
    '1-10': 10000,
    '11-50': 25000,
    '51-200': 25000,
    '201-1000': 45000,
    '1000+': 45000
  }
  return prices[form.value.employeeCount] || 'X'
})

const getAnnualPrice = computed(() => {
  const prices = {
    '1-10': 10000,
    '11-50': 25000,
    '51-200': 25000,
    '201-1000': 45000,
    '1000+': 45000
  }
  return prices[form.value.employeeCount] || 'X'
})

const handleSubmit = async () => {
  // Validate form
  if (!form.value.companyName || !form.value.industry || !form.value.employeeCount || 
      !form.value.location || form.value.goals.length === 0 || !form.value.kpis ||
      !form.value.selectedPlan || !form.value.contactPerson || !form.value.email) {
    alert('Please fill in all required fields')
    return
  }
  
  try {
    // Submit partnership form
    console.log('Partnership form submitted:', form.value)
    
    // Set company info for payment
    companyInfo.value = {
      id: 'company_' + Date.now(), // Generate temporary ID
      name: form.value.contactPerson,
      email: form.value.email,
      companyName: form.value.companyName
    }
    
    // Show Stripe payment for card payments
    showStripePayment.value = true
  } catch (error) {
    console.error('Submission failed:', error)
    alert('Submission failed. Please try again.')
  }
}

const handlePaymentSuccess = () => {
  // Redirect to thank you page after successful payment
  navigateTo('/business/thank-you')
}

const handlePaymentError = (error) => {
  console.error('Payment error:', error)
  showStripePayment.value = false
}

useHead({
  title: 'Business Partnership - ProGrowth'
})
</script>