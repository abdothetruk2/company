<template>
  <AdminSidebar>
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Page Management</h1>
          <p class="text-gray-600">Manage website pages and content</p>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="showAddPageModal = true" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Page
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <!-- Page Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Total Pages</p>
              <p class="text-2xl font-semibold text-gray-900">{{ pageStats.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Published</p>
              <p class="text-2xl font-semibold text-gray-900">{{ pageStats.published }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Draft</p>
              <p class="text-2xl font-semibold text-gray-900">{{ pageStats.draft }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Page Views</p>
              <p class="text-2xl font-semibold text-gray-900">{{ pageStats.views.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search pages..."
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="statusFilter" class="input-field">
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select v-model="typeFilter" class="input-field">
              <option value="">All Types</option>
              <option value="page">Static Page</option>
              <option value="landing">Landing Page</option>
              <option value="blog">Blog Post</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="clearFilters" class="btn-secondary w-full">Clear Filters</button>
          </div>
        </div>
      </div>

      <!-- Pages Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Pages ({{ filteredPages.length }})</h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="page in filteredPages" :key="page.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ page.title }}</div>
                    <div class="text-sm text-gray-500">{{ page.slug }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getTypeClass(page.type)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ page.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(page.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ page.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ page.views.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(page.lastModified) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="editPage(page)" class="text-primary-600 hover:text-primary-900">Edit</button>
                    <button @click="viewPage(page)" class="text-blue-600 hover:text-blue-900">View</button>
                    <button @click="duplicatePage(page)" class="text-green-600 hover:text-green-900">Duplicate</button>
                    <button @click="deletePage(page.id)" class="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Add/Edit Page Modal -->
    <div v-if="showAddPageModal || editingPage" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ editingPage ? 'Edit Page' : 'Add New Page' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="savePage" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
              <input type="text" v-model="pageForm.title" class="input-field" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input type="text" v-model="pageForm.slug" class="input-field" required>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select v-model="pageForm.type" class="input-field" required>
                <option value="page">Static Page</option>
                <option value="landing">Landing Page</option>
                <option value="blog">Blog Post</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select v-model="pageForm.status" class="input-field" required>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
            <textarea v-model="pageForm.metaDescription" class="input-field" rows="3" placeholder="SEO meta description..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea v-model="pageForm.content" class="input-field" rows="12" placeholder="Page content (HTML/Markdown)..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
            <input type="url" v-model="pageForm.featuredImage" class="input-field" placeholder="https://example.com/image.jpg">
          </div>

          <div class="flex space-x-4">
            <button type="button" @click="closeModal" class="btn-secondary flex-1">Cancel</button>
            <button type="submit" class="btn-primary flex-1">
              {{ editingPage ? 'Update Page' : 'Create Page' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminSidebar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '~/components/AdminSidebar.vue'

// Check authentication
onMounted(() => {
  const isAuthenticated = localStorage.getItem('adminAuth')
  if (!isAuthenticated) {
    navigateTo('/admin/login')
  }
})

const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const showAddPageModal = ref(false)
const editingPage = ref(null)

const pageForm = ref({
  title: '',
  slug: '',
  type: 'page',
  status: 'draft',
  metaDescription: '',
  content: '',
  featuredImage: ''
})

const pageStats = ref({
  total: 24,
  published: 18,
  draft: 5,
  views: 45678
})

const pages = ref([
  {
    id: 1,
    title: 'About Us',
    slug: '/about',
    type: 'page',
    status: 'published',
    views: 12456,
    lastModified: '2025-01-20',
    metaDescription: 'Learn about ProGrowth and our mission',
    content: '<h1>About ProGrowth</h1><p>We are revolutionizing career development...</p>',
    featuredImage: ''
  },
  {
    id: 2,
    title: 'Privacy Policy',
    slug: '/privacy',
    type: 'page',
    status: 'published',
    views: 8934,
    lastModified: '2025-01-18',
    metaDescription: 'ProGrowth privacy policy and data protection',
    content: '<h1>Privacy Policy</h1><p>Your privacy is important to us...</p>',
    featuredImage: ''
  },
  {
    id: 3,
    title: 'Career Assessment Landing',
    slug: '/assessment-landing',
    type: 'landing',
    status: 'published',
    views: 15678,
    lastModified: '2025-01-19',
    metaDescription: 'Discover your career potential with our assessments',
    content: '<div class="hero">Take our career assessment...</div>',
    featuredImage: 'https://example.com/assessment-hero.jpg'
  },
  {
    id: 4,
    title: 'Terms and Conditions',
    slug: '/terms',
    type: 'page',
    status: 'published',
    views: 5432,
    lastModified: '2025-01-15',
    metaDescription: 'ProGrowth terms and conditions',
    content: '<h1>Terms and Conditions</h1><p>By using our service...</p>',
    featuredImage: ''
  },
  {
    id: 5,
    title: 'New Feature Announcement',
    slug: '/blog/new-features-2025',
    type: 'blog',
    status: 'draft',
    views: 0,
    lastModified: '2025-01-21',
    metaDescription: 'Exciting new features coming to ProGrowth',
    content: '<h1>New Features</h1><p>We are excited to announce...</p>',
    featuredImage: 'https://example.com/blog-feature.jpg'
  }
])

const filteredPages = computed(() => {
  let filtered = pages.value

  if (searchQuery.value) {
    filtered = filtered.filter(page => 
      page.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(page => page.status === statusFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(page => page.type === typeFilter.value)
  }

  return filtered
})

const getStatusClass = (status) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800'
    case 'draft':
      return 'bg-yellow-100 text-yellow-800'
    case 'archived':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getTypeClass = (type) => {
  switch (type) {
    case 'page':
      return 'bg-blue-100 text-blue-800'
    case 'landing':
      return 'bg-purple-100 text-purple-800'
    case 'blog':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  typeFilter.value = ''
}

const editPage = (page) => {
  editingPage.value = page
  pageForm.value = { ...page }
}

const viewPage = (page) => {
  window.open(page.slug, '_blank')
}

const duplicatePage = (page) => {
  const newPage = {
    ...page,
    id: Date.now(),
    title: page.title + ' (Copy)',
    slug: page.slug + '-copy',
    status: 'draft',
    views: 0,
    lastModified: new Date().toISOString().split('T')[0]
  }
  pages.value.push(newPage)
  alert('Page duplicated successfully!')
}

const deletePage = (id) => {
  if (confirm('Are you sure you want to delete this page?')) {
    const index = pages.value.findIndex(p => p.id === id)
    if (index > -1) {
      pages.value.splice(index, 1)
      alert('Page deleted successfully!')
    }
  }
}

const savePage = () => {
  if (editingPage.value) {
    // Update existing page
    const index = pages.value.findIndex(p => p.id === editingPage.value.id)
    if (index > -1) {
      pages.value[index] = {
        ...pageForm.value,
        lastModified: new Date().toISOString().split('T')[0]
      }
    }
    alert('Page updated successfully!')
  } else {
    // Create new page
    const newPage = {
      ...pageForm.value,
      id: Date.now(),
      views: 0,
      lastModified: new Date().toISOString().split('T')[0]
    }
    pages.value.push(newPage)
    alert('Page created successfully!')
  }
  
  closeModal()
}

const closeModal = () => {
  showAddPageModal.value = false
  editingPage.value = null
  pageForm.value = {
    title: '',
    slug: '',
    type: 'page',
    status: 'draft',
    metaDescription: '',
    content: '',
    featuredImage: ''
  }
}

useHead({
  title: 'Page Management - ProGrowth Admin'
})
</script>