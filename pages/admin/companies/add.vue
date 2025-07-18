<template>
  <AdminSidebar>
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Add New Company</h1>
          <p class="text-gray-600">Create a new company account</p>
        </div>
        <NuxtLink
          to="/admin/companies"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Companies
        </NuxtLink>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="submitForm" class="space-y-8">
          <!-- Basic Information -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Company Name *</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-300': errors.name }"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address *</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-300': errors.email }"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password *</label>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-300': errors.password }"
                />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
              </div>

              <div>
                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  v-model="form.status"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Contact Person -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Person</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label for="contactName" class="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  id="contactName"
                  v-model="form.contactPerson.name"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-300': errors['contactPerson.name'] }"
                />
                <p v-if="errors['contactPerson.name']" class="mt-1 text-sm text-red-600">{{ errors['contactPerson.name'] }}</p>
              </div>

              <div>
                <label for="contactPosition" class="block text-sm font-medium text-gray-700">Position *</label>
                <input
                  id="contactPosition"
                  v-model="form.contactPerson.position"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-300': errors['contactPerson.position'] }"
                />
                <p v-if="errors['contactPerson.position']" class="mt-1 text-sm text-red-600">{{ errors['contactPerson.position'] }}</p>
              </div>

              <div>
                <label for="contactPhone" class="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  id="contactPhone"
                  v-model="form.contactPerson.phone"
                  type="tel"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-300': errors['contactPerson.phone'] }"
                />
                <p v-if="errors['contactPerson.phone']" class="mt-1 text-sm text-red-600">{{ errors['contactPerson.phone'] }}</p>
              </div>
            </div>
          </div>

          <!-- Company Details -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Company Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="industry" class="block text-sm font-medium text-gray-700">Industry *</label>
                <select
                  id="industry"
                  v-model="form.companyDetails.industry"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-300': errors['companyDetails.industry'] }"
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
                <p v-if="errors['companyDetails.industry']" class="mt-1 text-sm text-red-600">{{ errors['companyDetails.industry'] }}</p>
              </div>

              <div>
                <label for="size" class="block text-sm font-medium text-gray-700">Company Size *</label>
                <select
                  id="size"
                  v-model="form.companyDetails.size"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-300': errors['companyDetails.size'] }"
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
                <p v-if="errors['companyDetails.size']" class="mt-1 text-sm text-red-600">{{ errors['companyDetails.size'] }}</p>
              </div>

              <div>
                <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
                <input
                  id="website"
                  v-model="form.companyDetails.website"
                  type="url"
                  placeholder="https://example.com"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div class="md:col-span-2">
                <label for="description" class="block text-sm font-medium text-gray-700">Company Description</label>
                <textarea
                  id="description"
                  v-model="form.companyDetails.description"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Brief description of the company..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Subscription Details -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Subscription Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label for="plan" class="block text-sm font-medium text-gray-700">Subscription Plan</label>
                <select
                  id="plan"
                  v-model="form.subscription.plan"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label for="subscriptionStatus" class="block text-sm font-medium text-gray-700">Subscription Status</label>
                <select
                  id="subscriptionStatus"
                  v-model="form.subscription.status"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label for="jobPostsLimit" class="block text-sm font-medium text-gray-700">Job Posts Limit</label>
                <input
                  id="jobPostsLimit"
                  v-model.number="form.subscription.jobPostsLimit"
                  type="number"
                  min="1"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4">
            <NuxtLink
              to="/admin/companies"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </NuxtLink>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
              <span v-else>Create Company</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  </AdminSidebar>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'admin-auth'
})

// Import the admin store
const adminStore = useAdminStore()
const router = useRouter()

// Form data
const form = ref({
  name: '',
  email: '',
  password: '',
  status: 'approved',
  contactPerson: {
    name: '',
    position: '',
    phone: ''
  },
  companyDetails: {
    industry: '',
    size: '',
    website: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  },
  subscription: {
    plan: 'basic',
    status: 'active',
    jobPostsLimit: 25,
    jobPostsUsed: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: null
  }
})

// Form state
const loading = ref(false)
const errors = ref({})
const successMessage = ref('')

// Industry options
const industryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'education', label: 'Education' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'travel', label: 'Travel & Tourism' },
  { value: 'logistics', label: 'Logistics & Transportation' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'government', label: 'Government' },
  { value: 'non-profit', label: 'Non-Profit' },
  { value: 'other', label: 'Other' }
]

// Company size options
const sizeOptions = [
  { value: '1-10', label: 'Startup (1-10 employees)' },
  { value: '11-50', label: 'Small (11-50 employees)' },
  { value: '51-200', label: 'Medium (51-200 employees)' },
  { value: '201-1000', label: 'Large (201-1000 employees)' },
  { value: '1000+', label: 'Enterprise (1000+ employees)' }
]

// Subscription plan options
const planOptions = [
  { value: 'free', label: 'Free (5 job posts)', limit: 5 },
  { value: 'basic', label: 'Basic (25 job posts)', limit: 25 },
  { value: 'premium', label: 'Premium (100 job posts)', limit: 100 },
  { value: 'enterprise', label: 'Enterprise (Unlimited)', limit: -1 }
]

// Watch for plan changes to update job posts limit
watch(() => form.value.subscription.plan, (newPlan) => {
  const selectedPlan = planOptions.find(p => p.value === newPlan)
  if (selectedPlan) {
    form.value.subscription.jobPostsLimit = selectedPlan.limit
  }
})

// Form validation
const validateForm = () => {
  const newErrors = {}

  // Basic Information validation
  if (!form.value.name?.trim()) {
    newErrors.name = 'Company name is required'
  }
  
  if (!form.value.email?.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    newErrors.email = 'Please enter a valid email address'
  }
  
  if (!form.value.password?.trim()) {
    newErrors.password = 'Password is required'
  } else if (form.value.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }
  
  // Contact Person validation
  if (!form.value.contactPerson.name?.trim()) {
    newErrors['contactPerson.name'] = 'Contact person name is required'
  }
  
  if (!form.value.contactPerson.position?.trim()) {
    newErrors['contactPerson.position'] = 'Contact person position is required'
  }
  
  if (!form.value.contactPerson.phone?.trim()) {
    newErrors['contactPerson.phone'] = 'Contact person phone is required'
  } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(form.value.contactPerson.phone.replace(/[\s\-\(\)]/g, ''))) {
    newErrors['contactPerson.phone'] = 'Please enter a valid phone number'
  }
  
  // Company Details validation
  if (!form.value.companyDetails.industry) {
    newErrors['companyDetails.industry'] = 'Industry is required'
  }
  
  if (!form.value.companyDetails.size) {
    newErrors['companyDetails.size'] = 'Company size is required'
  }

  // Website validation (if provided)
  if (form.value.companyDetails.website?.trim()) {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    if (!urlPattern.test(form.value.companyDetails.website)) {
      newErrors['companyDetails.website'] = 'Please enter a valid website URL'
    }
  }

  // Subscription validation
  if (form.value.subscription.jobPostsLimit < 1) {
    newErrors['subscription.jobPostsLimit'] = 'Job posts limit must be at least 1'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Clear errors when form values change
watch(form, () => {
  if (Object.keys(errors.value).length > 0) {
    errors.value = {}
  }
}, { deep: true })

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    // Scroll to first error
    const firstErrorElement = document.querySelector('.border-red-500')
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }
  
  loading.value = true
  errors.value = {}
  successMessage.value = ''
  
  try {
    // Prepare form data
    const formData = {
      ...form.value,
      email: form.value.email.toLowerCase().trim(),
      name: form.value.name.trim(),
      contactPerson: {
        ...form.value.contactPerson,
        name: form.value.contactPerson.name.trim(),
        position: form.value.contactPerson.position.trim(),
        phone: form.value.contactPerson.phone.trim()
      },
      companyDetails: {
        ...form.value.companyDetails,
        website: form.value.companyDetails.website?.trim() || '',
        description: form.value.companyDetails.description?.trim() || ''
      }
    }

    // Use the admin store method to create company
    const response = await adminStore.createCompany(formData)
    
    if (response.success) {
      successMessage.value = 'Company created successfully!'
      
      // Show success message for 2 seconds then redirect
      setTimeout(() => {
        navigateTo('/admin/companies')
      }, 2000)
    }
  } catch (error) {
    console.error('Error creating company:', error)
    
    // Handle validation errors from server
    if (error.data?.errors) {
      errors.value = error.data.errors
    } else if (error.data?.message) {
      // Show server error message
      errors.value.general = error.data.message
    } else {
      // Show general error message
      errors.value.general = 'Failed to create company. Please try again.'
    }
    
    // Scroll to top to show error
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    loading.value = false
  }
}

// Reset form
const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    password: '',
    status: 'approved',
    contactPerson: {
      name: '',
      position: '',
      phone: ''
    },
    companyDetails: {
      industry: '',
      size: '',
      website: '',
      description: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      }
    },
    subscription: {
      plan: 'basic',
      status: 'active',
      jobPostsLimit: 25,
      jobPostsUsed: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: null
    }
  }
  errors.value = {}
  successMessage.value = ''
}

// Page title
useHead({
  title: 'Add New Company - Admin Dashboard'
})
</script>