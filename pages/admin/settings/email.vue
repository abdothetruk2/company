<template>
  <AdminSidebar>
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Email Settings</h1>
          <p class="text-gray-600">Configure email templates and SMTP settings</p>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="testEmail" class="btn-secondary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Test Email
          </button>
          <button @click="saveSettings" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Save Settings
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div class="max-w-4xl mx-auto space-y-6">
        <!-- SMTP Configuration -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">SMTP Configuration</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
              <input type="text" v-model="smtpSettings.host" class="input-field" placeholder="smtp.gmail.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
              <input type="number" v-model="smtpSettings.port" class="input-field" placeholder="587">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input type="text" v-model="smtpSettings.username" class="input-field" placeholder="your-email@gmail.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input type="password" v-model="smtpSettings.password" class="input-field" placeholder="••••••••">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
              <select v-model="smtpSettings.encryption" class="input-field">
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">From Name</label>
              <input type="text" v-model="smtpSettings.fromName" class="input-field" placeholder="ProGrowth">
            </div>
          </div>
        </div>

        <!-- Email Templates -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Email Templates</h3>
            <button @click="showAddTemplateModal = true" class="btn-primary text-sm">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Template
            </button>
          </div>
          
          <div class="space-y-4">
            <div v-for="template in emailTemplates" :key="template.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-900">{{ template.name }}</h4>
                  <p class="text-sm text-gray-600">{{ template.description }}</p>
                  <div class="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                    <span>Subject: {{ template.subject }}</span>
                    <span>Type: {{ template.type }}</span>
                    <span>Last modified: {{ formatDate(template.lastModified) }}</span>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button @click="editTemplate(template)" class="text-primary-600 hover:text-primary-900 text-sm">Edit</button>
                  <button @click="previewTemplate(template)" class="text-blue-600 hover:text-blue-900 text-sm">Preview</button>
                  <button @click="deleteTemplate(template.id)" class="text-red-600 hover:text-red-900 text-sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Email Statistics -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Email Statistics</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">{{ emailStats.sent.toLocaleString() }}</div>
              <div class="text-sm text-gray-600">Emails Sent</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ emailStats.delivered.toLocaleString() }}</div>
              <div class="text-sm text-gray-600">Delivered</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ emailStats.opened.toLocaleString() }}</div>
              <div class="text-sm text-gray-600">Opened</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-600">{{ emailStats.bounced.toLocaleString() }}</div>
              <div class="text-sm text-gray-600">Bounced</div>
            </div>
          </div>
        </div>

        <!-- Email Queue -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Email Queue</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="email in emailQueue" :key="email.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ email.recipient }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ email.subject }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(email.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ email.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(email.scheduledAt) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="retryEmail(email.id)" class="text-primary-600 hover:text-primary-900 mr-3">Retry</button>
                    <button @click="cancelEmail(email.id)" class="text-red-600 hover:text-red-900">Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Welcome Email</h4>
                <p class="text-sm text-gray-500">Send welcome email to new users</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.welcomeEmail" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Assessment Completion</h4>
                <p class="text-sm text-gray-500">Send email when user completes assessment</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.assessmentCompletion" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Job Recommendations</h4>
                <p class="text-sm text-gray-500">Send weekly job recommendations</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.jobRecommendations" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Payment Confirmations</h4>
                <p class="text-sm text-gray-500">Send payment confirmation emails</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.paymentConfirmations" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Template Modal -->
    <div v-if="showAddTemplateModal || editingTemplate" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ editingTemplate ? 'Edit Email Template' : 'Add Email Template' }}
          </h3>
          <button @click="closeTemplateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveTemplate" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
              <input type="text" v-model="templateForm.name" class="input-field" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select v-model="templateForm.type" class="input-field" required>
                <option value="welcome">Welcome</option>
                <option value="assessment">Assessment</option>
                <option value="payment">Payment</option>
                <option value="notification">Notification</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input type="text" v-model="templateForm.description" class="input-field" required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
            <input type="text" v-model="templateForm.subject" class="input-field" required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Content (HTML)</label>
            <textarea v-model="templateForm.content" class="input-field" rows="12" required placeholder="Enter HTML email content..."></textarea>
          </div>

          <div class="flex space-x-4">
            <button type="button" @click="closeTemplateModal" class="btn-secondary flex-1">Cancel</button>
            <button type="submit" class="btn-primary flex-1">
              {{ editingTemplate ? 'Update Template' : 'Create Template' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Template Preview Modal -->
    <div v-if="previewingTemplate" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Email Preview: {{ previewingTemplate.name }}</h3>
          <button @click="previewingTemplate = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-4">
          <div class="mb-4 pb-4 border-b border-gray-200">
            <div class="text-sm text-gray-600">Subject: {{ previewingTemplate.subject }}</div>
          </div>
          <div v-html="previewingTemplate.content" class="prose max-w-none"></div>
        </div>
      </div>
    </div>
  </AdminSidebar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '~/components/AdminSidebar.vue'

// Check authentication
onMounted(() => {
  const isAuthenticated = localStorage.getItem('adminAuth')
  if (!isAuthenticated) {
    navigateTo('/admin/login')
  }
})

const showAddTemplateModal = ref(false)
const editingTemplate = ref(null)
const previewingTemplate = ref(null)

const smtpSettings = ref({
  host: 'smtp.gmail.com',
  port: 587,
  username: 'noreply@progrowth.com',
  password: '',
  encryption: 'tls',
  fromName: 'ProGrowth'
})

const templateForm = ref({
  name: '',
  type: 'welcome',
  description: '',
  subject: '',
  content: ''
})

const notificationSettings = ref({
  welcomeEmail: true,
  assessmentCompletion: true,
  jobRecommendations: true,
  paymentConfirmations: true
})

const emailStats = ref({
  sent: 15847,
  delivered: 15234,
  opened: 8934,
  bounced: 123
})

const emailTemplates = ref([
  {
    id: 1,
    name: 'Welcome Email',
    type: 'welcome',
    description: 'Welcome new users to ProGrowth',
    subject: 'Welcome to ProGrowth!',
    content: '<h1>Welcome to ProGrowth!</h1><p>Thank you for joining our platform...</p>',
    lastModified: '2025-01-20'
  },
  {
    id: 2,
    name: 'Assessment Completion',
    type: 'assessment',
    description: 'Congratulate users on completing assessments',
    subject: 'Assessment Complete - View Your Results',
    content: '<h1>Congratulations!</h1><p>You have completed your career assessment...</p>',
    lastModified: '2025-01-18'
  },
  {
    id: 3,
    name: 'Payment Confirmation',
    type: 'payment',
    description: 'Confirm successful payments',
    subject: 'Payment Confirmation - ProGrowth Premium',
    content: '<h1>Payment Confirmed</h1><p>Your payment has been processed successfully...</p>',
    lastModified: '2025-01-19'
  }
])

const emailQueue = ref([
  {
    id: 1,
    recipient: 'ahmed@example.com',
    subject: 'Welcome to ProGrowth!',
    status: 'pending',
    scheduledAt: '2025-01-21T10:00:00Z'
  },
  {
    id: 2,
    recipient: 'sara@example.com',
    subject: 'Assessment Complete - View Your Results',
    status: 'sent',
    scheduledAt: '2025-01-21T09:30:00Z'
  },
  {
    id: 3,
    recipient: 'mohamed@example.com',
    subject: 'Weekly Job Recommendations',
    status: 'failed',
    scheduledAt: '2025-01-21T08:00:00Z'
  }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  switch (status) {
    case 'sent':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const saveSettings = () => {
  alert('Email settings saved successfully!')
}

const testEmail = () => {
  alert('Test email sent to admin@progrowth.com')
}

const editTemplate = (template) => {
  editingTemplate.value = template
  templateForm.value = { ...template }
}

const previewTemplate = (template) => {
  previewingTemplate.value = template
}

const deleteTemplate = (id) => {
  if (confirm('Are you sure you want to delete this template?')) {
    const index = emailTemplates.value.findIndex(t => t.id === id)
    if (index > -1) {
      emailTemplates.value.splice(index, 1)
      alert('Template deleted successfully!')
    }
  }
}

const saveTemplate = () => {
  if (editingTemplate.value) {
    // Update existing template
    const index = emailTemplates.value.findIndex(t => t.id === editingTemplate.value.id)
    if (index > -1) {
      emailTemplates.value[index] = {
        ...templateForm.value,
        lastModified: new Date().toISOString().split('T')[0]
      }
    }
    alert('Template updated successfully!')
  } else {
    // Create new template
    const newTemplate = {
      ...templateForm.value,
      id: Date.now(),
      lastModified: new Date().toISOString().split('T')[0]
    }
    emailTemplates.value.push(newTemplate)
    alert('Template created successfully!')
  }
  
  closeTemplateModal()
}

const closeTemplateModal = () => {
  showAddTemplateModal.value = false
  editingTemplate.value = null
  templateForm.value = {
    name: '',
    type: 'welcome',
    description: '',
    subject: '',
    content: ''
  }
}

const retryEmail = (id) => {
  const email = emailQueue.value.find(e => e.id === id)
  if (email) {
    email.status = 'pending'
    alert('Email queued for retry')
  }
}

const cancelEmail = (id) => {
  if (confirm('Are you sure you want to cancel this email?')) {
    const index = emailQueue.value.findIndex(e => e.id === id)
    if (index > -1) {
      emailQueue.value.splice(index, 1)
      alert('Email cancelled')
    }
  }
}

useHead({
  title: 'Email Settings - ProGrowth Admin'
})
</script>