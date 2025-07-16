<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
        <p class="text-lg text-gray-600">See how ProGrowth transformed careers</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="card p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span class="text-white font-bold">{{ testimonial.name.charAt(0) }}</span>
            </div>
            <div class="ml-3">
              <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
              <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
            </div>
          </div>
          <p class="text-gray-700 italic">"{{ testimonial.quote }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = ref([
  {
    id: 1,
    name: 'Sarah Ahmed',
    role: 'Software Engineer',
    quote: 'ProGrowth helped me discover my true passion for technology. The assessments were incredibly accurate!'
  },
  {
    id: 2,
    name: 'Mohamed Hassan',
    role: 'Marketing Manager',
    quote: 'The career recommendations were spot-on. I found my dream job within 2 months of completing the assessments.'
  },
  {
    id: 3,
    name: 'Fatima Ali',
    role: 'Data Scientist',
    quote: 'The detailed analysis helped me understand my strengths and choose the right career path in data science.'
  }
])
</script>