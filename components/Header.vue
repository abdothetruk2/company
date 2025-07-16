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
          <a href="#jobs" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Find Jobs</a>
          <a href="#companies" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Companies</a>
          <a href="#resources" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Resources</a>
          <a href="#about" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">About</a>
        </nav>

        <!-- Auth buttons -->
        <div class="flex items-center space-x-4">
          <button class="text-gray-600 hover:text-primary-600 transition-colors duration-200">Sign In</button>
          <button class="btn-primary">Sign Up</button>
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
          <a href="#jobs" class="block px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">Find Jobs</a>
          <a href="#companies" class="block px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">Companies</a>
          <a href="#resources" class="block px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">Resources</a>
          <a href="#about" class="block px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">About</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>