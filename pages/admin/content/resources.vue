<template>
  <AdminSidebar>
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Resource Management</h1>
          <p class="text-gray-600">Manage career resources, guides, and tools</p>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="showAddResourceModal = true" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Resource
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <!-- Resource Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Total Resources</p>
              <p class="text-2xl font-semibold text-gray-900">{{ resourceStats.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Total Views</p>
              <p class="text-2xl font-semibold text-gray-900">{{ resourceStats.views.toLocaleString() }}</p>
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
              <p class="text-sm font-medium text-gray-500">Downloads</p>
              <p class="text-2xl font-semibold text-gray-900">{{ resourceStats.downloads.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Avg. Rating</p>
              <p class="text-2xl font-semibold text-gray-900">{{ resourceStats.avgRating }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search resources..."
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select v-model="categoryFilter" class="input-field">
              <option value="">All Categories</option>
              <option value="guide">Career Guides</option>
              <option value="template">Templates</option>
              <option value="tool">Tools</option>
              <option value="course">Courses</option>
              <option value="article">Articles</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select v-model="typeFilter" class="input-field">
              <option value="">All Types</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="link">External Link</option>
              <option value="interactive">Interactive</option>
            </select>
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
          <div class="flex items-end">
            <button @click="clearFilters" class="btn-secondary w-full">Clear Filters</button>
          </div>
        </div>
      </div>

      <!-- Resources Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="resource in filteredResources" :key="resource.id" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div :class="getCategoryColor(resource.category)" class="w-10 h-10 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getCategoryIcon(resource.category)" />
                  </svg>
                </div>
                <div class="ml-3">
                  <span :class="getTypeClass(resource.type)" class="px-2 py-1 text-xs font-semibold rounded-full">
                    {{ resource.type.toUpperCase() }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button @click="editResource(resource)" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="deleteResource(resource.id)" class="text-gray-400 hover:text-red-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ resource.title }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ resource.description }}</p>

            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ resource.views }} views</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ resource.downloads }} downloads</span>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex text-yellow-400">
                  <span v-for="star in 5" :key="star" :class="star <= resource.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                </div>
                <span class="ml-1 text-sm text-gray-600">({{ resource.rating }})</span>
              </div>
              <span :class="getStatusClass(resource.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                {{ resource.status }}
              </span>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">{{ formatDate(resource.lastModified) }}</span>
                <div class="flex space-x-2">
                  <button @click="viewResource(resource)" class="btn-secondary text-xs">View</button>
                  <button @click="editResource(resource)" class="btn-primary text-xs">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Resource Modal -->
    <div v-if="showAddResourceModal || editingResource" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ editingResource ? 'Edit Resource' : 'Add New Resource' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveResource" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" v-model="resourceForm.title" class="input-field" required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea v-model="resourceForm.description" class="input-field" rows="3" required></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select v-model="resourceForm.category" class="input-field" required>
                <option value="guide">Career Guide</option>
                <option value="template">Template</option>
                <option value="tool">Tool</option>
                <option value="course">Course</option>
                <option value="article">Article</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select v-model="resourceForm.type" class="input-field" required>
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="link">External Link</option>
                <option value="interactive">Interactive</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Resource URL</label>
            <input type="url" v-model="resourceForm.url" class="input-field" required>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select v-model="resourceForm.status" class="input-field" required>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Featured</label>
              <select v-model="resourceForm.featured" class="input-field">
                <option :value="false">No</option>
                <option :value="true">Yes</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input type="text" v-model="resourceForm.tags" class="input-field" placeholder="career, resume, interview">
          </div>

          <div class="flex space-x-4">
            <button type="button" @click="closeModal" class="btn-secondary flex-1">Cancel</button>
            <button type="submit" class="btn-primary flex-1">
              {{ editingResource ? 'Update Resource' : 'Create Resource' }}
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
const categoryFilter = ref('')
const typeFilter = ref('')
const statusFilter = ref('')
const showAddResourceModal = ref(false)
const editingResource = ref(null)

const resourceForm = ref({
  title: '',
  description: '',
  category: 'guide',
  type: 'pdf',
  url: '',
  status: 'draft',
  featured: false,
  tags: ''
})

const resourceStats = ref({
  total: 156,
  views: 45678,
  downloads: 12345,
  avgRating: 4.6
})

const resources = ref([
  {
    id: 1,
    title: 'Complete Resume Writing Guide',
    description: 'A comprehensive guide to writing professional resumes that get noticed by employers.',
    category: 'guide',
    type: 'pdf',
    url: 'https://example.com/resume-guide.pdf',
    status: 'published',
    featured: true,
    views: 2456,
    downloads: 1234,
    rating: 4.8,
    tags: ['resume', 'career', 'job search'],
    lastModified: '2025-01-20'
  },
  {
    id: 2,
    title: 'Interview Preparation Checklist',
    description: 'Essential checklist to prepare for job interviews and common interview questions.',
    category: 'template',
    type: 'pdf',
    url: 'https://example.com/interview-checklist.pdf',
    status: 'published',
    featured: false,
    views: 1876,
    downloads: 987,
    rating: 4.5,
    tags: ['interview', 'preparation', 'checklist'],
    lastModified: '2025-01-18'
  },
  {
    id: 3,
    title: 'Career Assessment Tool',
    description: 'Interactive tool to help users discover their career interests and strengths.',
    category: 'tool',
    type: 'interactive',
    url: 'https://example.com/career-tool',
    status: 'published',
    featured: true,
    views: 3456,
    downloads: 0,
    rating: 4.7,
    tags: ['assessment', 'career', 'interactive'],
    lastModified: '2025-01-19'
  },
  {
    id: 4,
    title: 'LinkedIn Optimization Course',
    description: 'Video course on optimizing your LinkedIn profile for better job opportunities.',
    category: 'course',
    type: 'video',
    url: 'https://example.com/linkedin-course',
    status: 'published',
    featured: false,
    views: 1234,
    downloads: 567,
    rating: 4.3,
    tags: ['linkedin', 'networking', 'profile'],
    lastModified: '2025-01-17'
  },
  {
    id: 5,
    title: 'Salary Negotiation Strategies',
    description: 'Learn effective strategies for negotiating your salary and benefits package.',
    category: 'article',
    type: 'link',
    url: 'https://example.com/salary-negotiation',
    status: 'draft',
    featured: false,
    views: 0,
    downloads: 0,
    rating: 0,
    tags: ['salary', 'negotiation', 'career'],
    lastModified: '2025-01-21'
  }
])

const filteredResources = computed(() => {
  let filtered = resources.value

  if (searchQuery.value) {
    filtered = filtered.filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(resource => resource.category === categoryFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(resource => resource.type === typeFilter.value)
  }

  if (statusFilter.value) {
    filtered = filtered.filter(resource => resource.status === statusFilter.value)
  }

  return filtered
})

const getCategoryColor = (category) => {
  const colors = {
    guide: 'bg-blue-500',
    template: 'bg-green-500',
    tool: 'bg-purple-500',
    course: 'bg-orange-500',
    article: 'bg-indigo-500'
  }
  return colors[category] || 'bg-gray-500'
}

const getCategoryIcon = (category) => {
  const icons = {
    guide: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    template: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    tool: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    course: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    article: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
  }
  return icons[category] || 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
}

const getTypeClass = (type) => {
  const classes = {
    pdf: 'bg-red-100 text-red-800',
    video: 'bg-blue-100 text-blue-800',
    link: 'bg-green-100 text-green-800',
    interactive: 'bg-purple-100 text-purple-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  categoryFilter.value = ''
  typeFilter.value = ''
  statusFilter.value = ''
}

const editResource = (resource) => {
  editingResource.value = resource
  resourceForm.value = {
    ...resource,
    tags: resource.tags.join(', ')
  }
}

const viewResource = (resource) => {
  window.open(resource.url, '_blank')
}

const deleteResource = (id) => {
  if (confirm('Are you sure you want to delete this resource?')) {
    const index = resources.value.findIndex(r => r.id === id)
    if (index > -1) {
      resources.value.splice(index, 1)
      alert('Resource deleted successfully!')
    }
  }
}

const saveResource = () => {
  const tags = resourceForm.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
  
  if (editingResource.value) {
    // Update existing resource
    const index = resources.value.findIndex(r => r.id === editingResource.value.id)
    if (index > -1) {
      resources.value[index] = {
        ...resourceForm.value,
        tags,
        lastModified: new Date().toISOString().split('T')[0]
      }
    }
    alert('Resource updated successfully!')
  } else {
    // Create new resource
    const newResource = {
      ...resourceForm.value,
      id: Date.now(),
      tags,
      views: 0,
      downloads: 0,
      rating: 0,
      lastModified: new Date().toISOString().split('T')[0]
    }
    resources.value.push(newResource)
    alert('Resource created successfully!')
  }
  
  closeModal()
}

const closeModal = () => {
  showAddResourceModal.value = false
  editingResource.value = null
  resourceForm.value = {
    title: '',
    description: '',
    category: 'guide',
    type: 'pdf',
    url: '',
    status: 'draft',
    featured: false,
    tags: ''
  }
}

useHead({
  title: 'Resource Management - ProGrowth Admin'
})
</script>