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
          <template v-if="!isAuthenticated">
            <NuxtLink to="/login" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Sign In</NuxtLink>
            <NuxtLink to="/register" class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200">Get Started</NuxtLink>
          </template>
          <template v-else>
            <div class="flex items-center space-x-4">
              <span class="text-gray-700">Welcome, {{ user?.name }}</span>
              <button @click="logout" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Logout</button>
            </div>
          </template>
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
          
          <!-- Mobile auth buttons -->
          <div class="pt-4 border-t border-gray-200">
            <template v-if="!isAuthenticated">
              <NuxtLink to="/login" class="block px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">Sign In</NuxtLink>
              <NuxtLink to="/register" class="block px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 mx-3">Get Started</NuxtLink>
            </template>
            <template v-else>
              <div class="px-3 py-2 text-gray-700">Welcome, {{ user?.name }}</div>
              <button @click="logout" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">Logout</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

// Use the authentication composable
const { isAuthenticated, user, logout } = useAuth()
</script>