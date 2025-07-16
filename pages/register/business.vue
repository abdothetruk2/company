<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">PG</span>
          </div>
          <h1 class="ml-3 text-2xl font-bold text-gray-900">ProGrowth</h1>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Business Registration</h2>
        <p class="text-gray-600">Partner with us for smarter hiring</p>
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

          <!-- Contact Person -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
            <input 
              type="text" 
              v-model="form.contactPerson"
              class="input-field"
              placeholder="Enter contact person name"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Business Email *</label>
            <input 
              type="email" 
              v-model="form.email"
              class="input-field"
              placeholder="Enter business email"
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
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Company Size -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
            <select v-model="form.companySize" class="input-field" required>
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-1000">201-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button type="submit" class="btn-primary w-full text-lg py-3">
              Start Partnership
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  companyName: '',
  contactPerson: '',
  email: '',
  industry: '',
  companySize: ''
})

const handleSubmit = () => {
  // Validate form
  if (!form.value.companyName || !form.value.contactPerson || !form.value.email || 
      !form.value.industry || !form.value.companySize) {
    alert('Please fill in all required fields')
    return
  }
  
  // In real implementation, this would call the registration API
  try {
    // Simulate API call
    console.log('Registering company:', form.value)
    
    // Redirect to business dashboard (to be implemented)
    alert('Business registration successful! We will contact you soon.')
    navigateTo('/')
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Registration failed. Please try again.')
  }
}

useHead({
  title: 'Business Registration - ProGrowth'
})
</script>