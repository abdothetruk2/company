<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">PG</span>
            </div>
            <h1 class="ml-3 text-xl font-bold text-gray-900">ProGrowth Assessment</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">
              Step {{ currentStep }} of {{ totalSteps }}
            </div>
            <button @click="saveAndExit" class="text-gray-600 hover:text-gray-900">
              Save & Exit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-lg font-semibold text-gray-900">Practical Skills Assessment</h2>
          <span class="text-sm text-gray-600">{{ Math.round(progress) }}% Complete</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Assessment Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading practical assessment...</p>
      </div>

      <!-- Timer -->
      <div v-if="!loading && currentTask && timeRemaining > 0" class="card p-4 mb-6 bg-blue-50 border-blue-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-blue-800 font-medium">Time Remaining: {{ formatTime(timeRemaining) }}</span>
          </div>
          <div class="text-sm text-blue-700">
            Task {{ currentTaskIndex + 1 }} of {{ tasks.length }}
          </div>
        </div>
      </div>

      <!-- Current Task -->
      <div v-if="!loading && currentTask" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Task Description -->
        <div class="space-y-6">
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="text-sm text-primary-600 font-medium">
                {{ currentTask.category }} • {{ currentTask.difficulty }}
              </div>
              <div class="text-sm text-gray-500">
                {{ currentTask.points }} points
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ currentTask.title }}
            </h3>
            
            <div class="prose prose-sm text-gray-600 mb-6">
              <p>{{ currentTask.description }}</p>
            </div>

            <!-- Requirements -->
            <div v-if="currentTask.requirements" class="mb-6">
              <h4 class="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li v-for="requirement in currentTask.requirements" :key="requirement" class="flex items-start">
                  <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ requirement }}
                </li>
              </ul>
            </div>

            <!-- Resources -->
            <div v-if="currentTask.resources" class="mb-6">
              <h4 class="text-sm font-semibold text-gray-900 mb-2">Resources:</h4>
              <div class="space-y-2">
                <a 
                  v-for="resource in currentTask.resources" 
                  :key="resource.name"
                  :href="resource.url" 
                  target="_blank"
                  class="flex items-center text-sm text-primary-600 hover:text-primary-700"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {{ resource.name }}
                </a>
              </div>
            </div>

            <!-- Example/Template -->
            <div v-if="currentTask.example" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-sm font-semibold text-gray-900 mb-2">Example/Template:</h4>
              <pre class="text-sm text-gray-700 overflow-x-auto"><code>{{ currentTask.example }}</code></pre>
            </div>
          </div>

          <!-- Task Navigation -->
          <div class="flex items-center justify-between">
            <button 
              @click="previousTask"
              :disabled="currentTaskIndex === 0"
              class="btn-secondary"
              :class="{ 'opacity-50 cursor-not-allowed': currentTaskIndex === 0 }"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous Task
            </button>

            <div class="text-center">
              <div class="text-sm text-gray-600 mb-2">
                {{ currentTaskIndex + 1 }} of {{ tasks.length }} tasks
              </div>
              <div class="flex space-x-2">
                <div 
                  v-for="(task, index) in tasks" 
                  :key="index"
                  class="w-2 h-2 rounded-full"
                  :class="getTaskStatusClass(index)"
                ></div>
              </div>
            </div>

            <button 
              @click="nextTask"
              class="btn-primary"
            >
              {{ isLastTask ? 'Complete Assessment' : 'Next Task' }}
              <svg v-if="!isLastTask" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Code Editor/Workspace -->
        <div class="space-y-6">
          <!-- Code Editor -->
          <div v-if="currentTask.type === 'coding'" class="card p-0 overflow-hidden">
            <div class="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <span class="text-sm font-medium">{{ currentTask.language || 'JavaScript' }}</span>
                <div class="flex items-center space-x-2">
                  <button 
                    @click="runCode" 
                    :disabled="isRunning"
                    class="text-xs bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                  >
                    {{ isRunning ? 'Running...' : 'Run Code' }}
                  </button>
                  <button 
                    @click="resetCode" 
                    class="text-xs bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div class="text-xs text-gray-300">
                Auto-save enabled
              </div>
            </div>
            
            <textarea 
              v-model="submissions[currentTaskIndex]"
              class="w-full h-96 p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
              :placeholder="currentTask.placeholder || 'Write your code here...'"
              @input="autoSave"
            ></textarea>
          </div>

          <!-- File Upload -->
          <div v-else-if="currentTask.type === 'upload'" class="card p-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 mb-2">Upload Your Solution</h4>
              <p class="text-gray-600 mb-4">{{ currentTask.uploadInstructions }}</p>
              
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input 
                  type="file" 
                  @change="handleFileUpload"
                  :accept="currentTask.acceptedFormats"
                  class="hidden"
                  ref="fileInput"
                />
                <button 
                  @click="$refs.fileInput.click()"
                  class="btn-primary"
                >
                  Choose Files
                </button>
                <p class="text-sm text-gray-500 mt-2">
                  Accepted formats: {{ currentTask.acceptedFormats }}
                </p>
              </div>

              <!-- Uploaded Files -->
              <div v-if="uploadedFiles[currentTaskIndex]?.length" class="mt-4">
                <h5 class="text-sm font-medium text-gray-900 mb-2">Uploaded Files:</h5>
                <div class="space-y-2">
                  <div 
                    v-for="file in uploadedFiles[currentTaskIndex]" 
                    :key="file.name"
                    class="flex items-center justify-between bg-gray-50 p-3 rounded"
                  >
                    <div class="flex items-center">
                      <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="text-sm text-gray-700">{{ file.name }}</span>
                    </div>
                    <button 
                      @click="removeFile(file.name)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Text Response -->
          <div v-else-if="currentTask.type === 'text'" class="card p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Your Response</h4>
            <textarea 
              v-model="submissions[currentTaskIndex]"
              class="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              :placeholder="currentTask.placeholder || 'Write your response here...'"
              @input="autoSave"
            ></textarea>
            <div class="flex items-center justify-between mt-2">
              <div class="text-sm text-gray-500">
                {{ (submissions[currentTaskIndex] || '').length }} characters
              </div>
              <div class="text-sm text-gray-500">
                Auto-saved
              </div>
            </div>
          </div>

          <!-- Output/Console -->
          <div v-if="currentTask.type === 'coding'" class="card p-0 overflow-hidden">
            <div class="bg-gray-800 text-white px-4 py-2">
              <h4 class="text-sm font-semibold">Output/Console</h4>
            </div>
            <pre class="p-4 bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto"><code>{{ output }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: 'Practical Assessment - ProGrowth',
  layout: 'assessment'
})

// Reactive data
const loading = ref(true)
const currentTaskIndex = ref(0)
const submissions = ref([])
const uploadedFiles = ref([])
const tasks = ref([])
const currentStep = ref(3)
const totalSteps = ref(3)
const timeRemaining = ref(3600) // 60 minutes in seconds
const assessmentCompleted = ref(false)
const timer = ref(null)
const output = ref('')
const isRunning = ref(false)

// Computed properties
const progress = computed(() => ((currentTaskIndex.value + 1) / tasks.value.length) * 100)
const currentTask = computed(() => tasks.value[currentTaskIndex.value])
const isLastTask = computed(() => currentTaskIndex.value === tasks.value.length - 1)

// Methods
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const startTimer = () => {
  timer.value = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      clearInterval(timer.value)
      completeAssessment()
    }
  }, 1000)
}

const saveAndExit = async () => {
  try {
    clearInterval(timer.value)
    
    // Save current progress
    const progressData = {
      assessmentType: 'practical',
      currentTaskIndex: currentTaskIndex.value,
      submissions: submissions.value,
      uploadedFiles: uploadedFiles.value,
      timeRemaining: timeRemaining.value,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('practicalAssessmentProgress', JSON.stringify(progressData))
    
    // Navigate back to assessment overview
    await navigateTo('/assessment')
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

const previousTask = () => {
  if (currentTaskIndex.value > 0) {
    currentTaskIndex.value--
    output.value = ''
  }
}

const nextTask = async () => {
  if (isLastTask.value) {
    await completeAssessment()
  } else {
    currentTaskIndex.value++
    output.value = ''
  }
}

const getTaskStatusClass = (index) => {
  const hasSubmission = submissions.value[index] || uploadedFiles.value[index]?.length > 0
  const isCurrent = index === currentTaskIndex.value
  
  if (isCurrent) return 'bg-primary-500'
  if (hasSubmission) return 'bg-green-500'
  return 'bg-gray-300'
}

const autoSave = () => {
  // Auto-save functionality
  const progressData = {
    assessmentType: 'practical',
    currentTaskIndex: currentTaskIndex.value,
    submissions: submissions.value,
    uploadedFiles: uploadedFiles.value,
    timeRemaining: timeRemaining.value,
    timestamp: new Date().toISOString()
  }
  
  localStorage.setItem('practicalAssessmentProgress', JSON.stringify(progressData))
}

const runCode = async () => {
  try {
    isRunning.value = true
    output.value = 'Running code...\n'
    
    // Simulate code execution (in real app, this would be sent to a code execution service)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const code = submissions.value[currentTaskIndex.value]
    
    if (!code || code.trim() === '') {
      output.value = 'Error: No code to execute'
      return
    }
    
    // Simple JavaScript evaluation for demo purposes
    // In production, this would be handled by a secure sandboxed environment
    try {
      // Capture console.log output
      const logs = []
      const originalLog = console.log
      console.log = (...args) => {
        logs.push(args.join(' '))
      }
      
      // Execute the code
      const result = eval(code)
      
      // Restore console.log
      console.log = originalLog
      
      output.value = logs.length > 0 ? logs.join('\n') : (result !== undefined ? String(result) : 'Code executed successfully')
    } catch (error) {
      output.value = `Error: ${error.message}`
    }
  } catch (error) {
    output.value = `Execution Error: ${error.message}`
  } finally {
    isRunning.value = false
  }
}

const resetCode = () => {
  submissions.value[currentTaskIndex.value] = currentTask.value.template || ''
  output.value = ''
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  
  if (!uploadedFiles.value[currentTaskIndex.value]) {
    uploadedFiles.value[currentTaskIndex.value] = []
  }
  
  files.forEach(file => {
    uploadedFiles.value[currentTaskIndex.value].push({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    })
  })
  
  autoSave()
}

const removeFile = (fileName) => {
  if (uploadedFiles.value[currentTaskIndex.value]) {
    uploadedFiles.value[currentTaskIndex.value] = uploadedFiles.value[currentTaskIndex.value].filter(
      file => file.name !== fileName
    )
    autoSave()
  }
}

const completeAssessment = async () => {
  try {
    loading.value = true
    clearInterval(timer.value)
    assessmentCompleted.value = true
    
    // Calculate results
    const results = calculatePracticalResults()
    
    // Save assessment results
    const assessmentData = {
      type: 'practical',
      submissions: submissions.value,
      uploadedFiles: uploadedFiles.value,
      results: results,
      completedAt: new Date().toISOString(),
      timeUsed: 3600 - timeRemaining.value,
      totalTime: 3600
    }
    
    // Store results (in real app, this would be an API call)
    localStorage.setItem('practicalResults', JSON.stringify(assessmentData))
    
    // Navigate to results page
    await navigateTo('/assessment/results')
  } catch (error) {
    console.error('Error completing assessment:', error)
  } finally {
    loading.value = false
  }
}

const calculatePracticalResults = () => {
  let totalScore = 0
  let maxScore = 0
  const taskScores = []
  
  tasks.value.forEach((task, index) => {
    const submission = submissions.value[index]
    const files = uploadedFiles.value[index]
    
    maxScore += task.points
    
    // Simple scoring logic (in real app, this would be more sophisticated)
    let taskScore = 0
    if (task.type === 'coding' && submission && submission.trim() !== '') {
      // Basic code quality check
      if (submission.length > 50) taskScore = Math.floor(task.points * 0.8)
      if (submission.includes('function') || submission.includes('const') || submission.includes('let')) {
        taskScore = task.points
      }
    } else if (task.type === 'upload' && files && files.length > 0) {
      taskScore = task.points
    } else if (task.type === 'text' && submission && submission.length > 100) {
      taskScore = Math.floor(task.points * 0.9)
    }
    
    totalScore += taskScore
    taskScores.push({
      taskId: task.id,
      score: taskScore,
      maxScore: task.points,
      category: task.category
    })
  })
  
  const percentage = Math.round((totalScore / maxScore) * 100)
  
  return {
    totalScore,
    maxScore,
    percentage,
    taskScores,
    level: getSkillLevel(percentage),
    completedTasks: submissions.value.filter(s => s && s.trim() !== '').length + 
                   uploadedFiles.value.filter(f => f && f.length > 0).length
  }
}

const getSkillLevel = (percentage) => {
  if (percentage >= 90) return 'Expert'
  if (percentage >= 80) return 'Advanced'
  if (percentage >= 70) return 'Intermediate'
  if (percentage >= 60) return 'Beginner'
  return 'Novice'
}

// Initialize assessment
onMounted(async () => {
  try {
    // Check for saved progress
    const savedProgress = localStorage.getItem('practicalAssessmentProgress')
    
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress)
      currentTaskIndex.value = progressData.currentTaskIndex
      submissions.value = progressData.submissions || []
      uploadedFiles.value = progressData.uploadedFiles || []
      timeRemaining.value = progressData.timeRemaining
    }
    
    // Load tasks (in real app, this would be an API call)
    tasks.value = [
      {
        id: 1,
        type: 'coding',
        category: 'JavaScript',
        difficulty: 'Beginner',
        points: 20,
        title: 'Create a Simple Calculator',
        description: 'Build a basic calculator function that can perform addition, subtraction, multiplication, and division.',
        requirements: [
          'Create a function called calculator(a, b, operation)',
          'Support operations: +, -, *, /',
          'Return the result of the calculation',
          'Handle division by zero'
        ],
        language: 'JavaScript',
        template: `function calculator(a, b, operation) {
  // Your code here
  
}

// Test your function
console.log(calculator(10, 5, '+'));
console.log(calculator(10, 5, '-'));
console.log(calculator(10, 5, '*'));
console.log(calculator(10, 5, '/'));`,
        placeholder: 'Write your calculator function here...'
      },
      {
        id: 2,
        type: 'coding',
        category: 'HTML/CSS',
        difficulty: 'Intermediate',
        points: 25,
        title: 'Responsive Card Component',
        description: 'Create a responsive card component using HTML and CSS that adapts to different screen sizes.',
        requirements: [
          'Create a card with image, title, description, and button',
          'Make it responsive (mobile-first approach)',
          'Use CSS Grid or Flexbox for layout',
          'Add hover effects'
        ],
        language: 'HTML/CSS',
        template: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Card</title>
    <style>
        /* Your CSS here */
        
    </style>
</head>
<body>
    <!-- Your HTML here -->
    
</body>
</html>`,
        placeholder: 'Create your responsive card component...'
      },
      {
        id: 3,
        type: 'text',
        category: 'Problem Solving',
        difficulty: 'Intermediate',
        points: 15,
        title: 'Algorithm Explanation',
        description: 'Explain how you would approach solving the "Two Sum" problem and provide a step-by-step solution.',
        requirements: [
          'Explain the problem in your own words',
          'Describe your approach to solving the problem',
          'Provide a step-by-step solution',
          'Include any assumptions you made'
        ],
        placeholder: 'Explain your approach to solving the "Two Sum" problem...'
      }
    ]
    
    // Start the timer
    startTimer()
    
    // Set loading to false after tasks are loaded
    loading.value = false
  } catch (error) {
    console.error('Error initializing assessment:', error)
    loading.value = false
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

// Handle page visibility change (pause timer when tab is not active)
onMounted(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (timer.value) {
        clearInterval(timer.value)
      }
    } else {
      if (timeRemaining.value > 0 && !assessmentCompleted.value) {
        startTimer()
      }
    }
  }
  
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  // Cleanup event listener
  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })
})

// Initialize submissions array with proper length
watch(tasks, (newTasks) => {
  if (newTasks.length > 0 && submissions.value.length === 0) {
    submissions.value = new Array(newTasks.length).fill('')
    uploadedFiles.value = new Array(newTasks.length).fill(null).map(() => [])
  }
}, { immediate: true })

// Auto-save when task changes
watch(currentTaskIndex, () => {
  autoSave()
})

// Initialize template code when task changes
watch(currentTask, (newTask) => {
  if (newTask && newTask.template && !submissions.value[currentTaskIndex.value]) {
    submissions.value[currentTaskIndex.value] = newTask.template
  }
}, { immediate: true })
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center;
}

.btn-secondary {
  @apply bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center;
}

.prose {
  @apply text-gray-600;
}

.prose p {
  @apply mb-4;
}

/* Custom scrollbar for code areas */
.bg-gray-900::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.bg-gray-900::-webkit-scrollbar-track {
  background: #374151;
}

.bg-gray-900::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
}

.bg-gray-900::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Animation for progress indicators */
.w-2.h-2.rounded-full {
  transition: all 0.3s ease;
}

/* Hover effects for interactive elements */
.card:hover {
  @apply shadow-md;
}

/* Focus styles for accessibility */
textarea:focus,
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .grid-cols-1.lg\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .lg\:grid-cols-2 .space-y-6:first-child {
    margin-bottom: 2rem;
  }
}

/* Code editor enhancements */
.font-mono {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
}

/* File upload area styling */
.border-dashed {
  border-style: dashed;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.border-dashed:hover {
  @apply border-primary-300 bg-primary-50;
}

/* Task status indicators */
.bg-primary-500 {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.bg-green-500 {
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

/* Timer styling */
.bg-blue-50 {
  background-color: rgba(239, 246, 255, 0.8);
  backdrop-filter: blur(10px);
}

/* Console output styling */
pre code {
  font-size: 13px;
  line-height: 1.4;
}

/* Button disabled state */
.opacity-50 {
  pointer-events: none;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>