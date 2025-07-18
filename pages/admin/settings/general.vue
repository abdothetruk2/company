<template>
  <AdminSidebar>
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">General Settings</h1>
          <p class="text-gray-600">Manage your application settings</p>
        </div>
        <button @click="saveSettings" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Save Changes
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div class="max-w-4xl mx-auto space-y-6">
        <!-- Site Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Site Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input type="text" v-model="settings.siteName" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
              <input type="url" v-model="settings.siteUrl" class="input-field">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
              <textarea v-model="settings.siteDescription" class="input-field" rows="3"></textarea>
            </div>
          </div>
        </div>

        <!-- Assessment Settings -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Assessment Settings</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Enable Personality Assessment</h4>
                <p class="text-sm text-gray-500">Allow users to take MBTI + RIASEC personality tests</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.enablePersonalityTest" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Enable Knowledge Assessment</h4>
                <p class="text-sm text-gray-500">Allow users to take technical knowledge tests</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.enableKnowledgeTest" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Enable Soft Skills Assessment</h4>
                <p class="text-sm text-gray-500">Allow users to take soft skills and aptitude tests</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.enableSoftSkillsTest" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Subscription Settings -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Subscription Settings</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Individual Subscription Price (EGP)</label>
              <input type="number" v-model="settings.individualPrice" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Trial Price (EGP)</label>
              <input type="number" v-model="settings.businessTrialPrice" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Annual Price (EGP)</label>
              <input type="number" v-model="settings.businessAnnualPrice" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Free Trial Duration (days)</label>
              <input type="number" v-model="settings.trialDuration" class="input-field">
            </div>
          </div>
        </div>

        <!-- Email Settings -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Email Settings</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">From Email</label>
              <input type="email" v-model="settings.fromEmail" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">From Name</label>
              <input type="text" v-model="settings.fromName" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
              <input type="email" v-model="settings.supportEmail" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
              <input type="email" v-model="settings.adminEmail" class="input-field">
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Require Email Verification</h4>
                <p class="text-sm text-gray-500">Users must verify their email before accessing the platform</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.requireEmailVerification" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Enable Two-Factor Authentication</h4>
                <p class="text-sm text-gray-500">Require 2FA for admin accounts</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.enableTwoFactor" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <input type="number" v-model="settings.sessionTimeout" class="input-field w-32">
            </div>
          </div>
        </div>

        <!-- API Settings -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">API Settings</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Enable API Access</h4>
                <p class="text-sm text-gray-500">Allow external applications to access the API</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.enableApi" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (requests per minute)</label>
              <input type="number" v-model="settings.apiRateLimit" class="input-field w-32">
            </div>
          </div>
        </div>

        <!-- Maintenance Mode -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Maintenance Mode</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Enable Maintenance Mode</h4>
                <p class="text-sm text-gray-500">Temporarily disable access to the platform</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.maintenanceMode" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div v-if="settings.maintenanceMode">
              <label class="block text-sm font-medium text-gray-700 mb-2">Maintenance Message</label>
              <textarea v-model="settings.maintenanceMessage" class="input-field" rows="3" placeholder="We're currently performing maintenance. Please check back later."></textarea>
            </div>
          </div>
        </div>
      </div>
    </main>
  </AdminSidebar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '~/components/AdminSidebar.vue'

// Check authentication
onMounted(() => {
  const isAuthenticated = localStorage.getItem('adminAuth')
  if (!isAuthenticated) {
    navigateTo('/admin/login')
  }
})

const settings = ref({
  // Site Information
  siteName: 'ProGrowth',
  siteUrl: 'https://progrowth.com',
  siteDescription: 'Advanced career assessments and smart hiring solutions',
  
  // Assessment Settings
  enablePersonalityTest: true,
  enableKnowledgeTest: true,
  enableSoftSkillsTest: true,
  
  // Subscription Settings
  individualPrice: 500,
  businessTrialPrice: 10000,
  businessAnnualPrice: 25000,
  trialDuration: 7,
  
  // Email Settings
  fromEmail: 'noreply@progrowth.com',
  fromName: 'ProGrowth',
  supportEmail: 'support@progrowth.com',
  adminEmail: 'admin@progrowth.com',
  
  // Security Settings
  requireEmailVerification: true,
  enableTwoFactor: false,
  sessionTimeout: 60,
  
  // API Settings
  enableApi: true,
  apiRateLimit: 100,
  
  // Maintenance Mode
  maintenanceMode: false,
  maintenanceMessage: ''
})

const saveSettings = () => {
  // In a real implementation, this would save to the database
  alert('Settings saved successfully!')
}

useHead({
  title: 'General Settings - ProGrowth Admin'
})
</script>