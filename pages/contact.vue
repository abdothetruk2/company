<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">PG</span>
          </div>
          <h1 class="ml-3 text-2xl font-bold text-gray-900">ProGrowth</h1>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Contact Us</h2>
        <p class="text-gray-600">Get in touch with our team</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Contact Form -->
        <div class="card p-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-6">Send us a message</h3>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input 
                  type="text" 
                  v-model="form.firstName"
                  class="input-field"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input 
                  type="text" 
                  v-model="form.lastName"
                  class="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input 
                type="email" 
                v-model="form.email"
                class="input-field"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
              <select v-model="form.subject" class="input-field" required>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="partnership">Business Partnership</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea 
                v-model="form.message"
                class="input-field"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" class="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-6">
          <!-- Contact Details -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="font-medium text-gray-900">Email</h4>
                  <p class="text-gray-600">support@progrowth.com</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="font-medium text-gray-900">Phone</h4>
                  <p class="text-gray-600">+20 100 123 4567</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="font-medium text-gray-900">Address</h4>
                  <p class="text-gray-600">Cairo, Egypt</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Monday - Friday</span>
                <span class="text-gray-900">9:00 AM - 6:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Saturday</span>
                <span class="text-gray-900">10:00 AM - 4:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Sunday</span>
                <span class="text-gray-900">Closed</span>
              </div>
            </div>
          </div>

          <!-- FAQ Link -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Need Quick Answers?</h3>
            <p class="text-gray-600 mb-4">Check our FAQ section for common questions and instant answers.</p>
            <NuxtLink to="/faq" class="btn-secondary w-full text-center">
              Visit FAQ
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  // Handle form submission
  alert('Thank you for your message! We will get back to you within 24 hours.')
  
  // Reset form
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  }
}

useHead({
  title: 'Contact Us - ProGrowth'
})
</script>