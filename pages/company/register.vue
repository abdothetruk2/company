<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-2xl">PG</span>
          </div>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900">
          Register Your Company
        </h2>
        <p class="mt-2 text-gray-600">
          Join our platform to find the best talent for your company
        </p>
      </div>

      <div class="bg-white shadow rounded-lg p-8">
        <!-- Error Message -->
        <div v-if="error" class="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="success" class="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          {{ success }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-8">
          <!-- Company Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="companyName" class="block text-sm font-medium text-gray-700">
                  Company Name *
                </label>
                <input
                  id="companyName"
                  v-model="form.name"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Company Email *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="company@example.com"
                />
              </div>

              <div>
                <label for="industry" class="block text-sm font-medium text-gray-700">
                  Industry *
                </label>
                <select
                  id="industry"
                  v-model="form.industry"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="companySize" class="block text-sm font-medium text-gray-700">
                  Company Size *
                </label>
                <select
                  id="companySize"
                  v-model="form.size"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div>
                <label for="website" class="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  id="website"
                  v-model="form.website"
                  type="url"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://www.company.com"
                />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div class="mt-6">
              <label for="description" class="block text-sm font-medium text-gray-700">
                Company Description
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Tell us about your company..."
              ></textarea>
            </div>
          </div>

          <!-- Contact Person Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Person Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="contactName" class="block text-sm font-medium text-gray-700">
                  Contact Person Name *
                </label>
                <input
                  id="contactName"
                  v-model="form.contactName"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter contact person name"
                />
              </div>

              <div>
                <label for="contactPosition" class="block text-sm font-medium text-gray-700">
                  Position *
                </label>
                <input
                  id="contactPosition"
                  v-model="form.contactPosition"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., HR Manager, CEO"
                />
              </div>

              <div>
                <label for="contactPhone" class="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  id="contactPhone"
                  v-model="form.contactPhone"
                  type="tel"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          <!-- Company Address -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Company Address</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label for="street" class="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  id="street"
                  v-model="form.street"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter street address"
                />
              </div>

              <div>
                <label for="city" class="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  id="city"
                  v-model="form.city"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label for="state" class="block text-sm font-medium text-gray-700">
                  State/Province
                </label>
                <input
                  id="state"
                  v-model="form.state"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter state/province"
                />
              </div>

              <div>
                <label for="country" class="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  id="country"
                  v-model="form.country"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter country"
                />
              </div>

              <div>
                <label for="zipCode" class="block text-sm font-medium text-gray-700">
                  ZIP/Postal Code
                </label>
                <input
                  id="zipCode"
                  v-model="form.zipCode"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter ZIP/postal code"
                />
              </div>
            </div>
          </div>

          <!-- Document Upload -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Required Documents</h3>
            <div class="space-y-6">
              <div>
                <label for="businessLicense" class="block text-sm font-medium text-gray-700">
                  Business License * (PDF, JPG, PNG - Max 5MB)
                </label>
                <input
                  id="businessLicense"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  @change="handleFileUpload($event, 'businessLicense')"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <p class="mt-1 text-sm text-gray-500">Upload your business registration/license document</p>
              </div>

              <div>
                <label for="taxCertificate" class="block text-sm font-medium text-gray-700">
                  Tax Certificate (PDF, JPG, PNG - Max 5MB)
                </label>
                <input
                  id="taxCertificate"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  @change="handleFileUpload($event, 'taxCertificate')"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <p class="mt-1 text-sm text-gray-500">Upload your tax registration certificate (optional)</p>
              </div>

              <div>
                <label for="companyProfile" class="block text-sm font-medium text-gray-700">
                  Company Profile/Brochure (PDF - Max 10MB)
                </label>
                <input
                  id="companyProfile"
                  type="file"
                  accept=".pdf"
                  @change="handleFileUpload($event, 'companyProfile')"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <p class="mt-1 text-sm text-gray-500">Upload your company profile or brochure (optional)</p>
              </div>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  v-model="form.acceptTerms"
                  type="checkbox"
                  required
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-medium text-gray-700">
                  I agree to the 
                  <NuxtLink to="/terms" class="text-primary-600 hover:text-primary-500">Terms and Conditions</NuxtLink>
                  and 
                  <NuxtLink to="/privacy" class="text-primary-600 hover:text-primary-500">Privacy Policy</NuxtLink>
                </label>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Submitting Application...' : 'Submit Company Registration' }}
            </button>
          </div>

          <div class="text-center text-sm text-gray-600">
            <p>Already have an account? 
              <NuxtLink to="/company/login" class="font-medium text-primary-600 hover:text-primary-500">
                Sign in here
              </NuxtLink>
            </p>
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
  password: '',
  industry: '',
  size: '',
  website: '',
  description: '',
  contactName: '',
  contactPosition: '',
  contactPhone: '',
  street: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  businessLicense: null,
  taxCertificate: null,
  companyProfile: null,
  acceptTerms: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')

// Handle file upload
const handleFileUpload = (event, fieldName) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size
    const maxSize = fieldName === 'companyProfile' ? 10 * 1024 * 1024 : 5 * 1024 * 1024 // 10MB or 5MB
    if (file.size > maxSize) {
      error.value = `File size too large. Maximum size is ${fieldName === 'companyProfile' ? '10MB' : '5MB'}`
      event.target.value = ''
      return
    }
    
    form.value[fieldName] = file
  }
}

// Handle registration
const handleRegister = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Validate required fields
    if (!form.value.businessLicense) {
      error.value = 'Business license is required'
      loading.value = false
      return
    }
    
    // Create FormData for file upload
    const formData = new FormData()
    
    // Add all form fields
    Object.keys(form.value).forEach(key => {
      if (key !== 'acceptTerms' && form.value[key] !== null && form.value[key] !== '') {
        formData.append(key, form.value[key])
      }
    })
    
    const response = await $fetch('/api/company/register', {
      method: 'POST',
      body: formData
    })

    // Handle response
    if (response.success) {
      success.value = 'Registration successful!'
      form.value = {
        name: '',
        email: '',
        password: '',
        industry: '',
        size: '',
        website: '',
        description: '',
        contactName: '',
        contactPosition: '',
        contactPhone: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        businessLicense: null,
        taxCertificate: null,
        companyProfile: null,
        acceptTerms: false
      }
    } else {
      error.value = response.message || 'An error occurred during registration.'
    }
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred.'
  } finally {
    loading.value = false
  }
}
</script>