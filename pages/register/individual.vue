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
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Account Creation</h2>
        <p class="text-gray-600">Start your career development journey</p>
      </div>

      <div class="card p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input 
              type="text" 
              v-model="form.name"
              class="input-field"
              placeholder="Enter your full name"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input 
              type="email" 
              v-model="form.email"
              class="input-field"
              placeholder="Enter your email"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <input 
              type="password" 
              v-model="form.password"
              class="input-field"
              placeholder="Create a strong password"
              required
            />
          </div>

          <!-- Gender -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
            <select v-model="form.gender" class="input-field" required>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Age -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Age *</label>
            <input 
              type="number" 
              v-model="form.age"
              class="input-field"
              placeholder="Enter your age"
              min="16"
              max="100"
              required
            />
          </div>

          <!-- College/University -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">College/University (Optional)</label>
            <input 
              type="text" 
              v-model="form.university"
              class="input-field"
              placeholder="Enter your institution name"
            />
          </div>

          <!-- ID/Student Card Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Upload ID Card or Student Card *</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors duration-200">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                    <span>Upload a file</span>
                    <input type="file" class="sr-only" @change="handleFileUpload" accept="image/*" required>
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <p v-if="form.idCard" class="mt-2 text-sm text-primary-600">✓ File uploaded: {{ form.idCard.name }}</p>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button type="submit" class="btn-primary w-full text-lg py-3">
              Start Your Journey
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
  name: '',
  email: '',
  password: '',
  gender: '',
  age: '',
  university: '',
  idCard: null
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.idCard = file
  }
}

const handleSubmit = () => {
  // Validate form
  if (!form.value.name || !form.value.email || !form.value.password || 
      !form.value.gender || !form.value.age || !form.value.idCard) {
    alert('Please fill in all required fields')
    return
  }
  
  // In real implementation, this would call the registration API
  // For now, simulate successful registration
  try {
    // Simulate API call
    console.log('Registering user:', form.value)
    
    // Redirect to assessments dashboard
    navigateTo('/dashboard/assessments')
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Registration failed. Please try again.')
  }
}

useHead({
  title: 'Create Account - ProGrowth'
})
</script>