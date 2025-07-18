<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div :class="sidebarOpen ? 'w-64' : 'w-16'" class="bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col">
      <!-- Logo -->
      <div class="flex items-center justify-between p-4 border-b border-gray-700">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">PG</span>
          </div>
          <span v-if="sidebarOpen" class="ml-2 font-bold text-lg">ProGrowth</span>
        </div>
        <button @click="toggleSidebar" class="text-gray-400 hover:text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-2 py-4 space-y-1">
        <!-- Dashboard -->
        <NuxtLink 
          to="/admin/dashboard" 
          :class="isActive('/admin/dashboard') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
          class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          </svg>
          <span v-if="sidebarOpen">Dashboard</span>
        </NuxtLink>

        <!-- Users Management -->
        <div class="space-y-1">
          <button 
            @click="toggleSection('users')"
            :class="isActive('/admin/users') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span v-if="sidebarOpen" class="flex-1 text-left">Users</span>
            <svg v-if="sidebarOpen" :class="openSections.users ? 'rotate-90' : ''" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div v-if="sidebarOpen && openSections.users" class="ml-8 space-y-1">
            <NuxtLink to="/admin/users" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">All Users</NuxtLink>
            <NuxtLink to="/admin/users/students" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Students</NuxtLink>
            <NuxtLink to="/admin/users/premium" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Premium Users</NuxtLink>
          </div>
        </div>

        <!-- Companies -->
        <NuxtLink 
          to="/admin/companies" 
          :class="isActive('/admin/companies') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
          class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
          </svg>
          <span v-if="sidebarOpen">Companies</span>
        </NuxtLink>

        <!-- Jobs Management -->
        <div class="space-y-1">
          <button 
            @click="toggleSection('jobs')"
            :class="isActive('/admin/jobs') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            <span v-if="sidebarOpen" class="flex-1 text-left">Jobs</span>
            <svg v-if="sidebarOpen" :class="openSections.jobs ? 'rotate-90' : ''" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div v-if="sidebarOpen && openSections.jobs" class="ml-8 space-y-1">
            <NuxtLink to="/admin/jobs" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">All Jobs</NuxtLink>
            <NuxtLink to="/admin/jobs/pending" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Pending Approval</NuxtLink>
            <NuxtLink to="/admin/jobs/categories" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Categories</NuxtLink>
          </div>
        </div>

        <!-- Assessments -->
        <div class="space-y-1">
          <button 
            @click="toggleSection('assessments')"
            :class="isActive('/admin/assessments') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span v-if="sidebarOpen" class="flex-1 text-left">Assessments</span>
            <svg v-if="sidebarOpen" :class="openSections.assessments ? 'rotate-90' : ''" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div v-if="sidebarOpen && openSections.assessments" class="ml-8 space-y-1">
            <NuxtLink to="/admin/assessments" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Overview</NuxtLink>
            <NuxtLink to="/admin/assessments/questions" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Questions</NuxtLink>
            <NuxtLink to="/admin/assessments/results" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Results</NuxtLink>
          </div>
        </div>

        <!-- Payments -->
        <NuxtLink 
          to="/admin/payments" 
          :class="isActive('/admin/payments') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
          class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span v-if="sidebarOpen">Payments</span>
        </NuxtLink>

        <!-- Content Management -->
        <div class="space-y-1">
          <button 
            @click="toggleSection('content')"
            :class="isActive('/admin/content') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span v-if="sidebarOpen" class="flex-1 text-left">Content</span>
            <svg v-if="sidebarOpen" :class="openSections.content ? 'rotate-90' : ''" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div v-if="sidebarOpen && openSections.content" class="ml-8 space-y-1">
            <NuxtLink to="/admin/content/pages" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Pages</NuxtLink>
            <NuxtLink to="/admin/content/blog" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Blog Posts</NuxtLink>
            <NuxtLink to="/admin/content/resources" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Resources</NuxtLink>
          </div>
        </div>

        <!-- Analytics -->
        <NuxtLink 
          to="/admin/analytics" 
          :class="isActive('/admin/analytics') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
          class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span v-if="sidebarOpen">Analytics</span>
        </NuxtLink>

        <!-- Settings -->
        <div class="space-y-1">
          <button 
            @click="toggleSection('settings')"
            :class="isActive('/admin/settings') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span v-if="sidebarOpen" class="flex-1 text-left">Settings</span>
            <svg v-if="sidebarOpen" :class="openSections.settings ? 'rotate-90' : ''" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div v-if="sidebarOpen && openSections.settings" class="ml-8 space-y-1">
            <NuxtLink to="/admin/settings/general" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">General</NuxtLink>
            <NuxtLink to="/admin/settings/email" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Email</NuxtLink>
            <NuxtLink to="/admin/settings/integrations" class="block px-2 py-1 text-sm text-gray-400 hover:text-white">Integrations</NuxtLink>
          </div>
        </div>
      </nav>

      <!-- User Profile -->
      <div class="border-t border-gray-700 p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-sm">A</span>
          </div>
          <div v-if="sidebarOpen" class="ml-3 flex-1">
            <p class="text-sm font-medium text-white">Admin User</p>
            <p class="text-xs text-gray-400">admin@progrowth.com</p>
          </div>
          <button @click="logout" class="text-gray-400 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const route = useRoute()
const sidebarOpen = ref(true)
const openSections = ref({
  users: false,
  jobs: false,
  assessments: false,
  content: false,
  settings: false
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section]
}

const isActive = (path) => {
  return route.path.startsWith(path)
}

const logout = () => {
  localStorage.removeItem('adminAuth')
  navigateTo('/admin/login')
}
</script>