<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">PG</span>
            </div>
            <h1 class="ml-2 text-xl font-bold text-gray-900">ProGrowth</h1>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink to="/jobs" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Find Jobs</NuxtLink>
          <NuxtLink to="/companies" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Companies</NuxtLink>
          <NuxtLink to="/resources" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Resources</NuxtLink>
          <NuxtLink to="/about" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">About</NuxtLink>
        </nav>

        <!-- Auth buttons -->
        <div class="flex items-center space-x-4">
          <div v-if="!isAuthenticated" class="flex items-center space-x-4">
            <NuxtLink to="/auth/signin" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Sign In</NuxtLink>
            <NuxtLink to="/auth/signup" class="btn-primary">Sign Up</NuxtLink>
          </div>
          <div v-else class="flex items-center space-x-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">{{ user?.name?.charAt(0) || 'U' }}</span>
              </div>
              <span class="ml-2 text-sm text-gray-700">{{ user?.name }}</span>
            </div>
            <button @click="handleLogout" class="text-gray-600 hover:text-red-600 transition-colors duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600 hover:text-primary-600">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
        <div class="space-y-2">
          <NuxtLink to="/jobs" class="block px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">Find Jobs</NuxtLink>
          <NuxtLink to="/companies" class="block px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">Companies</NuxtLink>
          <NuxtLink to="/resources" class="block px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">Resources</NuxtLink>
          <NuxtLink to="/about" class="block px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">About</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mobileMenuOpen = ref(false)
const { user, isAuthenticated, logout, initAuth } = useAuth()

onMounted(() => {
  initAuth()
})

const handleLogout = () => {
  logout()
}
</script>