<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex items-center justify-center mb-6">
        <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">PG</span>
        </div>
        <h1 class="ml-3 text-2xl font-bold text-gray-900">ProGrowth</h1>
      </div>
      <h2 class="text-center text-3xl font-bold text-gray-900">Create your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink to="/auth/signin" class="font-medium text-primary-600 hover:text-primary-500">
          sign in to your existing account
        </NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSignup" class="space-y-6">
          <!-- Account Type Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Account Type</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="accountType = 'individual'"
                :class="accountType === 'individual' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 text-gray-700'"
                class="border-2 rounded-lg p-3 text-sm font-medium hover:border-primary-300 transition-colors duration-200"
              >
                <div class="flex flex-col items-center">
                  <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Individual
                </div>
              </button>
              <button
                type="button"
                @click="accountType = 'business'"
                :class="accountType === 'business' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 text-gray-700'"
                class="border-2 rounded-lg p-3 text-sm font-medium hover:border-primary-300 transition-colors duration-200"
              >
                <div class="flex flex-col items-center">
                  <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                  </svg>
                  Business
                </div>
              </button>
            </div>
          </div>

          <!-- Individual Form Fields -->
          <div v-if="accountType === 'individual'" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                v-model="form.name"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                v-model="form.email"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                v-model="form.password"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Create a password"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender"
                  v-model="form.gender"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  v-model="form.age"
                  min="16"
                  max="100"
                  required
                  class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Age"
                />
              </div>
            </div>

            <div>
              <label for="university" class="block text-sm font-medium text-gray-700">University (Optional)</label>
              <input
                id="university"
                name="university"
                type="text"
                v-model="form.university"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Your university or institution"
              />
            </div>
          </div>

          <!-- Business Form Fields -->
          <div v-if="accountType === 'business'" class="space-y-6">
            <div>
              <label for="companyName" class="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                v-model="form.companyName"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label for="contactPerson" class="block text-sm font-medium text-gray-700">Contact Person</label>
              <input
                id="contactPerson"
                name="contactPerson"
                type="text"
                v-model="form.contactPerson"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Contact person name"
              />
            </div>

            <div>
              <label for="businessEmail" class="block text-sm font-medium text-gray-700">Business Email</label>
              <input
                id="businessEmail"
                name="businessEmail"
                type="email"
                v-model="form.email"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="business@company.com"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="industry" class="block text-sm font-medium text-gray-700">Industry</label>
                <select
                  id="industry"
                  v-model="form.industry"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
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

              <div>
                <label for="companySize" class="block text-sm font-medium text-gray-700">Company Size</label>
                <select
                  id="companySize"
                  v-model="form.companySize"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="ml-2 text-sm text-red-700">{{ error }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </span>
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const accountType = ref('individual')
const loading = ref(false)
const error = ref('')

const form = ref({
  name: '',
  email: '',
  password: '',
  gender: '',
  age: '',
  university: '',
  companyName: '',
  contactPerson: '',
  industry: '',
  companySize: ''
})

const handleSignup = async () => {
  loading.value = true
  error.value = ''

  try {
    const payload = {
      type: accountType.value,
      ...form.value
    }

    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: payload
    })

    if (response.success) {
      // Store auth token for individuals
      if (accountType.value === 'individual' && response.token) {
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        navigateTo('/dashboard/assessments')
      } else {
        // For businesses, redirect to thank you page
        navigateTo('/business/thank-you')
      }
    }
  } catch (err) {
    error.value = err.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Sign Up - ProGrowth'
})
</script>