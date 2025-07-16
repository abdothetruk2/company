<template>
  <section class="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Get the latest internship opportunities delivered to your inbox every week
        </p>
        
        <div class="max-w-md mx-auto">
          <div class="flex gap-3">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
              v-model="email"
            />
            <button class="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Subscribe
            </button>
          </div>
          <p class="text-primary-100 text-sm mt-3">
            Join 50,000+ students already subscribed
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
</script>