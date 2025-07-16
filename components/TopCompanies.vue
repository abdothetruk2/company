<template>
  <section id="companies" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Top Companies</h2>
        <p class="text-lg text-gray-600">Trusted by leading organizations worldwide</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="company in topCompanies" :key="company.id" class="card p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">{{ company.name.charAt(0) }}</span>
            </div>
            <div class="ml-4">
              <h3 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">{{ company.name }}</h3>
              <p class="text-sm text-gray-600">{{ company.industry }}</p>
            </div>
          </div>
          
          <p class="text-gray-700 mb-4">{{ company.description }}</p>
          
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center">
              <div class="flex text-yellow-400 mr-1">
                <span v-for="star in 5" :key="star">★</span>
              </div>
              <span class="text-gray-600">{{ company.rating }}</span>
            </div>
            <div class="text-primary-600 font-semibold">{{ company.openings }} openings</div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <button class="btn-secondary text-base px-8 py-3">View All Companies</button>
      </div>
    </div>
  </section>
</template>

<script setup>
const topCompanies = ref([
  {
    id: 1,
    name: 'Google',
    industry: 'Technology',
    description: 'Leading technology company focused on organizing the world\'s information and making it universally accessible.',
    rating: 4.8,
    openings: 45
  },
  {
    id: 2,
    name: 'Microsoft',
    industry: 'Technology',
    description: 'Global technology company that develops, manufactures, and supports software, services, and devices.',
    rating: 4.7,
    openings: 38
  },
  {
    id: 3,
    name: 'Apple',
    industry: 'Technology',
    description: 'Innovation-driven company that designs and manufactures consumer electronics and software.',
    rating: 4.9,
    openings: 32
  },
  {
    id: 4,
    name: 'Amazon',
    industry: 'E-commerce',
    description: 'World\'s largest online marketplace and leading cloud services provider.',
    rating: 4.5,
    openings: 67
  },
  {
    id: 5,
    name: 'Tesla',
    industry: 'Automotive',
    description: 'Electric vehicle and clean energy company accelerating the transition to sustainable transport.',
    rating: 4.6,
    openings: 28
  },
  {
    id: 6,
    name: 'Meta',
    industry: 'Social Media',
    description: 'Social technology company that connects people globally through platforms and immersive experiences.',
    rating: 4.4,
    openings: 25
  }
])
</script>