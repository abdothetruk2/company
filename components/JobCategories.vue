<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
        <p class="text-lg text-gray-600">Find internships in your field of interest</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="category in categories" :key="category.id" class="card p-6 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div class="text-white text-2xl" v-html="category.icon"></div>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">{{ category.name }}</h3>
          <p class="text-sm text-gray-600 mb-3">{{ category.description }}</p>
          <div class="text-primary-600 font-semibold">{{ category.jobCount }} jobs</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = ref([
  {
    id: 1,
    name: 'Technology',
    description: 'Software development, AI, cybersecurity',
    jobCount: 3420,
    icon: '💻'
  },
  {
    id: 2,
    name: 'Business',
    description: 'Finance, consulting, operations',
    jobCount: 2100,
    icon: '📊'
  },
  {
    id: 3,
    name: 'Design',
    description: 'UX/UI, graphic design, product design',
    jobCount: 1250,
    icon: '🎨'
  },
  {
    id: 4,
    name: 'Marketing',
    description: 'Digital marketing, content, social media',
    jobCount: 1800,
    icon: '📱'
  },
  {
    id: 5,
    name: 'Healthcare',
    description: 'Medical research, pharmaceuticals',
    jobCount: 980,
    icon: '🏥'
  },
  {
    id: 6,
    name: 'Engineering',
    description: 'Mechanical, electrical, civil',
    jobCount: 1500,
    icon: '⚙️'
  },
  {
    id: 7,
    name: 'Media',
    description: 'Journalism, video production, PR',
    jobCount: 750,
    icon: '📺'
  },
  {
    id: 8,
    name: 'Research',
    description: 'Scientific research, data analysis',
    jobCount: 650,
    icon: '🔬'
  }
])
</script>