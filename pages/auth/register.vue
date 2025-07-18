<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">PG</span>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink to="/auth/login" class="font-medium text-primary-600 hover:text-primary-500">
          sign in to your existing account
        </NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Error Message -->
        <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="success" class="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          {{ success }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                v-model="form.name"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="form.email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="age" class="block text-sm font-medium text-gray-700">
                Age
              </label>
              <div class="mt-1">
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="16"
                  max="100"
                  required
                  v-model="form.age"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Age"
                />
              </div>
            </div>

            <div>
              <label for="gender" class="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div class="mt-1">
                <select
                  id="gender"
                  name="gender"
                  required
                  v-model="form.gender"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label for="university" class="block text-sm font-medium text-gray-700">
              University (Optional)
            </label>
            <div class="mt-1">
              <input
                id="university"
                name="university"
                type="text"
                v-model="form.university"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter your university"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                v-model="form.password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
            <p class="mt-1 text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                v-model="form.confirmPassword"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <label for="idCard" class="block text-sm font-medium text-gray-700">
              ID Card Upload
            </label>
            <div class="mt-1">
              <input
                id="idCard"
                name="idCard"
                type="file"
                accept="image/*,.pdf"
                required
                @change="handleFileUpload"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <p class="mt-1 text-xs text-gray-500">
              Upload a clear photo of your ID card (JPG, PNG, or PDF)
            </p>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              v-model="form.acceptTerms"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <NuxtLink to="/terms" class="text-primary-600 hover:text-primary-500">Terms and Conditions</NuxtLink>
              and
              <NuxtLink to="/privacy" class="text-primary-600 hover:text-primary-500">Privacy Policy</NuxtLink>
            </label>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Meta
definePageMeta({
  layout: false
})

// Reactive data
const form = ref({
  name: '',
  email: '',
  age: '',
  gender: '',
  university: '',
  password: '',
  confirmPassword: '',
  idCard: null,
  acceptTerms: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'File size must be less than 5MB'
      event.target.value = ''
      return
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      error.value = 'Please upload a valid image (JPG, PNG) or PDF file'
      event.target.value = ''
      return
    }
    
    form.value.idCard = file
    error.value = ''
  }
}

// Handle registration
const handleRegister = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Validate form
    if (form.value.password !== form.value.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }
    
    if (form.value.password.length < 8) {
      error.value = 'Password must be at least 8 characters long'
      return
    }
    
    if (!form.value.idCard) {
      error.value = 'Please upload your ID card'
      return
    }
    
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('email', form.value.email)
    formData.append('age', form.value.age)
    formData.append('gender', form.value.gender)
    formData.append('university', form.value.university)
    formData.append('password', form.value.password)
    formData.append('idCard', form.value.idCard)
    
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: formData
    })
    
    if (response.success) {
      success.value = 'Account created successfully'
    } else {
      error.value = response.message || 'Failed to create account'
    }
  } catch (err) {
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>