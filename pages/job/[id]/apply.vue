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
          <div class="flex items-center space-x-4">
            <NuxtLink :to="`/job/${jobId}`" class="btn-secondary">Back to Job</NuxtLink>
            <NuxtLink to="/jobs" class="text-gray-600 hover:text-gray-900">All Jobs</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading application form...</p>
      </div>

      <!-- Job Not Found -->
      <div v-else-if="!job" class="text-center py-12">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h3>
        <p class="text-gray-600 mb-6">The job you're trying to apply for doesn't exist.</p>
        <NuxtLink to="/jobs" class="btn-primary">Browse All Jobs</NuxtLink>
      </div>

      <!-- Application Success -->
      <div v-else-if="applicationSubmitted" class="text-center py-12">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
        <p class="text-xl text-gray-600 mb-2">Thank you for applying to {{ job.title }} at {{ job.company }}</p>
        <p class="text-gray-600 mb-8">We'll review your application and get back to you within 5-7 business days.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/jobs" class="btn-primary">Browse More Jobs</NuxtLink>
          <NuxtLink to="/dashboard/applications" class="btn-secondary">View My Applications</NuxtLink>
        </div>
      </div>

      <!-- Application Form -->
      <div v-else>
        <!-- Job Summary -->
        <div class="card p-6 mb-8">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">{{ job.company.charAt(0) }}</span>
            </div>
            <div class="ml-4">
              <h2 class="text-xl font-semibold text-gray-900">{{ job.title }}</h2>
              <p class="text-gray-600">{{ job.company }} • {{ job.location }}</p>
            </div>
          </div>
        </div>

        <!-- Application Form -->
        <div class="card p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Apply for this Position</h3>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Personal Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input 
                  type="text" 
                  v-model="application.firstName"
                  class="input-field"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input 
                  type="text" 
                  v-model="application.lastName"
                  class="input-field"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  v-model="application.email"
                  class="input-field"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  v-model="application.phone"
                  class="input-field"
                  required
                />
              </div>
            </div>

            <!-- Professional Information -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Current Position</label>
              <input 
                type="text" 
                v-model="application.currentPosition"
                class="input-field"
                placeholder="e.g., Software Developer at TechCorp"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
              <select v-model="application.experience" class="input-field" required>
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years (Entry Level)</option>
                <option value="2-3">2-3 years</option>
                <option value="4-5">4-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years (Senior Level)</option>
              </select>
            </div>

            <!-- Skills -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Relevant Skills</label>
              <textarea 
                v-model="application.skills"
                class="input-field"
                rows="3"
                placeholder="List your relevant skills and technologies..."
              ></textarea>
            </div>

            <!-- Cover Letter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cover Letter *</label>
              <textarea 
                v-model="application.coverLetter"
                class="input-field"
                rows="6"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                required
              ></textarea>
            </div>

            <!-- Resume Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Resume/CV *</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors duration-200">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                      <span>Upload your resume</span>
                      <input type="file" class="sr-only" @change="handleResumeUpload" accept=".pdf,.doc,.docx" required>
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
              <p v-if="application.resume" class="mt-2 text-sm text-primary-600">✓ File uploaded: {{ application.resume.name }}</p>
            </div>

            <!-- Portfolio/LinkedIn (Optional) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                <input 
                  type="url" 
                  v-model="application.linkedin"
                  class="input-field"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Portfolio/Website</label>
                <input 
                  type="url" 
                  v-model="application.portfolio"
                  class="input-field"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>

            <!-- Availability -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">When can you start? *</label>
              <select v-model="application.availability" class="input-field" required>
                <option value="">Select availability</option>
                <option value="immediately">Immediately</option>
                <option value="1-week">Within 1 week</option>
                <option value="2-weeks">Within 2 weeks</option>
                <option value="1-month">Within 1 month</option>
                <option value="negotiable">Negotiable</option>
              </select>
            </div>

            <!-- Salary Expectations -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Salary Expectations (EGP)</label>
              <input 
                type="text" 
                v-model="application.salaryExpectation"
                class="input-field"
                placeholder="e.g., 15,000 - 20,000 EGP"
              />
            </div>

            <!-- Additional Questions -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Why do you want to work at {{ job.company }}?</label>
              <textarea 
                v-model="application.whyCompany"
                class="input-field"
                rows="4"
                placeholder="Tell us what attracts you to this company..."
              ></textarea>
            </div>

            <!-- Consent -->
            <div class="flex items-start">
              <input 
                type="checkbox" 
                v-model="application.consent"
                class="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                required
              />
              <label class="ml-2 text-sm text-gray-700">
                I consent to the processing of my personal data for recruitment purposes and agree to ProGrowth's 
                <NuxtLink to="/privacy" class="text-primary-600 hover:text-primary-700">Privacy Policy</NuxtLink> *
              </label>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-red-700">{{ error }}</p>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button 
                type="submit" 
                :disabled="submitting"
                :class="submitting ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'"
                class="w-full text-lg py-3"
              >
                {{ submitting ? 'Submitting Application...' : 'Submit Application' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#app' // Nuxt 3 auto-imports this, but explicit is clearer

// 1. Reactive route parameter
const route = useRoute()
const jobId = computed(() => route.params.id)

// state
const loading = ref(true)
const submitting = ref(false)
const applicationSubmitted = ref(false)
const error = ref('')
const job = ref(null)

const application = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  currentPosition: '',
  experience: '',
  skills: '',
  coverLetter: '',
  resume: null,
  linkedin: '',
  portfolio: '',
  availability: '',
  salaryExpectation: '',
  whyCompany: '',
  consent: false,
})

// mock data
const mockJobs = {
  '1': {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'Cairo, Egypt',
  },
  '2': {
    id: 2,
    title: 'Marketing Specialist',
    company: 'GrowthCo',
    location: 'Alexandria, Egypt',
  },
}

// resume uploader
function handleResumeUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  
  if (file.size > 10 * 1024 * 1024) {
    error.value = 'File size must be less than 10MB'
    return
  }
  const allowed = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  if (!allowed.includes(file.type)) {
    error.value = 'Please upload a PDF, DOC, or DOCX file'
    return
  }
  application.value.resume = file
  error.value = ''
}

// form submit
async function handleSubmit() {
  error.value = ''
  const a = application.value
  
  if (
    !a.firstName || !a.lastName || !a.email ||
    !a.phone || !a.experience || !a.coverLetter ||
    !a.resume || !a.availability || !a.consent
  ) {
    error.value = 'Please fill in all required fields'
    return
  }
  
  submitting.value = true
  try {
    await new Promise(r => setTimeout(r, 2000))
    console.log('Submitted:', { jobId: jobId.value, ...a })
    applicationSubmitted.value = true
  } catch {
    error.value = 'Failed to submit application. Please try again.'
  } finally {
    submitting.value = false
  }
}

// load job on mount
onMounted(async () => {
  await new Promise(r => setTimeout(r, 1000))
  job.value = mockJobs[jobId.value] || null
  loading.value = false
})

// dynamic page title
useHead({
  title: computed(() =>
    job.value
      ? `Apply for ${job.value.title} at ${job.value.company} – ProGrowth`
      : 'Apply for Job – ProGrowth'
  ),
})
</script>
