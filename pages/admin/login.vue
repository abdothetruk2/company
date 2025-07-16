<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo and Title -->
      <div class="text-center">
        <div class="flex items-center justify-center mb-6">
          <div class="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg">
            <span class="text-white font-bold text-2xl">PG</span>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-white mb-2">Admin Portal</h2>
        <p class="text-gray-400">Sign in to access the admin dashboard</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-xl shadow-2xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input 
              type="text" 
              v-model="credentials.username"
              class="input-field"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              v-model="credentials.password"
              class="input-field"
              placeholder="Enter admin password"
              required
            />
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <p class="text-red-700 text-sm">{{ error }}</p>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600 mb-2">Demo Credentials:</p>
          <p class="text-xs text-gray-500">Username: admin</p>
          <p class="text-xs text-gray-500">Password: admin</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const credentials = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Simple authentication check
    if (credentials.value.username === 'admin' && credentials.value.password === 'admin') {
      // Store admin session
      localStorage.setItem('adminAuth', 'true')
      
      // Redirect to admin dashboard
      await navigateTo('/admin/dashboard')
    } else {
      error.value = 'Invalid username or password'
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Admin Login - ProGrowth'
})
</script>