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
          <h2 class="text-lg font-semibold text-gray-900">Knowledge & Skills Assessment</h2>
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
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading knowledge assessment...</p>
      </div>

      <!-- Timer -->
      <div v-if="!loading && currentQuestion && timeRemaining > 0" class="card p-4 mb-6 bg-yellow-50 border-yellow-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-yellow-800 font-medium">Time Remaining: {{ formatTime(timeRemaining) }}</span>
          </div>
          <div class="text-sm text-yellow-700">
            Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}
          </div>
        </div>
      </div>

      <!-- Question -->
      <div v-if="!loading && currentQuestion" class="card p-8 mb-8">
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <div class="text-sm text-primary-600 font-medium">
              {{ currentQuestion.category }} • {{ currentQuestion.difficulty }}
            </div>
            <div class="text-sm text-gray-500">
              {{ currentQuestion.points }} points
            </div>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            {{ currentQuestion.text }}
          </h3>
          <div v-if="currentQuestion.code" class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre><code>{{ currentQuestion.code }}</code></pre>
          </div>
          <p v-if="currentQuestion.description" class="text-gray-600 mb-6">
            {{ currentQuestion.description }}
          </p>
        </div>

        <!-- Multiple Choice Questions -->
        <div v-if="currentQuestion.type === 'multiple-choice'" class="space-y-3">
          <label 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            class="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            :class="{ 'border-primary-500 bg-primary-50': answers[currentQuestionIndex] === option.value }"
          >
            <input 
              type="radio" 
              :value="option.value"
              v-model="answers[currentQuestionIndex]"
              class="sr-only"
            />
            <div class="w-5 h-5 border-2 border-gray-300 rounded-full mr-3 mt-0.5 flex items-center justify-center flex-shrink-0"
                 :class="{ 'border-primary-500 bg-primary-500': answers[currentQuestionIndex] === option.value }">
              <div v-if="answers[currentQuestionIndex] === option.value" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="flex-1">
              <div class="font-medium text-gray-900">{{ option.text }}</div>
              <div v-if="option.code" class="bg-gray-100 text-gray-800 p-2 rounded mt-2 text-sm">
                <code>{{ option.code }}</code>
              </div>
            </div>
          </label>
        </div>

        <!-- True/False Questions -->
        <div v-else-if="currentQuestion.type === 'true-false'" class="space-y-3">
          <label 
            v-for="option in [{ text: 'True', value: true }, { text: 'False', value: false }]" 
            :key="option.value"
            class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            :class="{ 'border-primary-500 bg-primary-50': answers[currentQuestionIndex] === option.value }"
          >
            <input 
              type="radio" 
              :value="option.value"
              v-model="answers[currentQuestionIndex]"
              class="sr-only"
            />
            <div class="w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center"
                 :class="{ 'border-primary-500 bg-primary-500': answers[currentQuestionIndex] === option.value }">
              <div v-if="answers[currentQuestionIndex] === option.value" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="font-medium text-gray-900">{{ option.text }}</div>
          </label>
        </div>

        <!-- Fill in the Blank -->
        <div v-else-if="currentQuestion.type === 'fill-blank'" class="space-y-4">
          <div class="text-gray-700">
            <span v-html="currentQuestion.textWithBlank"></span>
          </div>
          <input 
            type="text" 
            v-model="answers[currentQuestionIndex]"
            class="input-field max-w-md"
            placeholder="Enter your answer..."
          />
        </div>

        <!-- Code Completion -->
        <div v-else-if="currentQuestion.type === 'code-completion'" class="space-y-4">
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre><code v-html="currentQuestion.codeTemplate"></code></pre>
          </div>
          <textarea 
            v-model="answers[currentQuestionIndex]"
            class="input-field font-mono"
            rows="4"
            placeholder="Complete the code..."
          ></textarea>
        </div>
      </div>

      <!-- Time's Up Message -->
      <div v-if="timeRemaining <= 0 && !assessmentCompleted" class="card p-8 text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Time's Up!</h3>
        <p class="text-gray-600 mb-6">The assessment time has expired. Your answers have been automatically submitted.</p>
        <button @click="completeAssessment" class="btn-primary">
          View Results
        </button>
      </div>

      <!-- Navigation -->
      <div v-if="!loading && currentQuestion && timeRemaining > 0" class="flex items-center justify-between">
        <button 
          @click="previousQuestion"
          :disabled="currentQuestionIndex === 0"
          class="btn-secondary"
          :class="{ 'opacity-50 cursor-not-allowed': currentQuestionIndex === 0 }"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div class="text-center">
          <div class="text-sm text-gray-600 mb-2">
            {{ currentQuestionIndex + 1 }} of {{ questions.length }} questions
          </div>
          <div class="flex space-x-2">
            <div 
              v-for="(question, index) in questions" 
              :key="index"
              class="w-2 h-2 rounded-full"
              :class="getQuestionStatusClass(index)"
            ></div>
          </div>
        </div>

        <button 
          @click="nextQuestion"
          :disabled="!isCurrentQuestionAnswered"
          class="btn-primary"
          :class="{ 'opacity-50 cursor-not-allowed': !isCurrentQuestionAnswered }"
        >
          {{ isLastQuestion ? 'Complete Assessment' : 'Next' }}
          <svg v-if="!isLastQuestion" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Question Overview (for review) -->
      <div v-if="showReview" class="card p-6 mt-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Review Your Answers</h3>
        <div class="grid grid-cols-5 sm:grid-cols-10 gap-2">
          <button
            v-for="(question, index) in questions"
            :key="index"
            @click="goToQuestion(index)"
            class="w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200"
            :class="getQuestionReviewClass(index)"
          >
            {{ index + 1 }}
          </button>
        </div>
        <div class="flex items-center justify-between mt-4 pt-4 border-t">
          <div class="flex items-center space-x-4 text-sm">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Answered ({{ answeredCount }})</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span>Unanswered ({{ unansweredCount }})</span>
            </div>
          </div>
          <button @click="showReview = false" class="text-primary-600 hover:text-primary-700">
            Close Review
          </button>
        </div>
      </div>

      <!-- Review Toggle -->
      <div v-if="!loading && currentQuestion && timeRemaining > 0" class="text-center mt-6">
        <button 
          @click="showReview = !showReview" 
          class="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          {{ showReview ? 'Hide' : 'Show' }} Question Overview
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: 'Knowledge Assessment - ProGrowth',
  layout: 'assessment'
})

// Reactive data
const loading = ref(true)
const currentQuestionIndex = ref(0)
const answers = ref([])
const questions = ref([])
const currentStep = ref(2)
const totalSteps = ref(3)
const timeRemaining = ref(1800) // 30 minutes in seconds
const assessmentCompleted = ref(false)
const showReview = ref(false)
const timer = ref(null)

// Computed properties
const progress = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100)
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

const isCurrentQuestionAnswered = computed(() => {
  const answer = answers.value[currentQuestionIndex.value]
  return answer !== undefined && answer !== null && answer !== ''
})

const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)

const answeredCount = computed(() => {
  return answers.value.filter(answer => answer !== undefined && answer !== null && answer !== '').length
})

const unansweredCount = computed(() => {
  return questions.value.length - answeredCount.value
})

// Methods
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
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
      assessmentType: 'knowledge',
      currentQuestionIndex: currentQuestionIndex.value,
      answers: answers.value,
      timeRemaining: timeRemaining.value,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('knowledgeAssessmentProgress', JSON.stringify(progressData))
    
    // Navigate back to assessment overview
    await navigateTo('/assessment')
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const nextQuestion = async () => {
  if (!isCurrentQuestionAnswered.value && timeRemaining.value > 0) return
  
  if (isLastQuestion.value) {
    await completeAssessment()
  } else {
    currentQuestionIndex.value++
  }
}

const goToQuestion = (index) => {
  currentQuestionIndex.value = index
  showReview.value = false
}

const getQuestionStatusClass = (index) => {
  const isAnswered = answers.value[index] !== undefined && answers.value[index] !== null && answers.value[index] !== ''
  const isCurrent = index === currentQuestionIndex.value
  
  if (isCurrent) return 'bg-primary-500'
  if (isAnswered) return 'bg-green-500'
  return 'bg-gray-300'
}

const getQuestionReviewClass = (index) => {
  const isAnswered = answers.value[index] !== undefined && answers.value[index] !== null && answers.value[index] !== ''
  const isCurrent = index === currentQuestionIndex.value
  
  if (isCurrent) return 'bg-primary-500 text-white'
  if (isAnswered) return 'bg-green-500 text-white hover:bg-green-600'
  return 'bg-gray-200 text-gray-700 hover:bg-gray-300'
}

const completeAssessment = async () => {
  try {
    loading.value = true
    clearInterval(timer.value)
    assessmentCompleted.value = true
    
    // Calculate results
    const results = calculateKnowledgeResults()
    
    // Save assessment results
    const assessmentData = {
      type: 'knowledge',
      answers: answers.value,
      results: results,
      completedAt: new Date().toISOString(),
      timeUsed: 1800 - timeRemaining.value,
      totalTime: 1800
    }
    
    // Store results (in real app, this would be an API call)
    localStorage.setItem('knowledgeResults', JSON.stringify(assessmentData))
    
    // Navigate to final assessment or results
    await navigateTo('/assessment/practical')
  } catch (error) {
    console.error('Error completing assessment:', error)
  } finally {
    loading.value = false
  }
}

const calculateKnowledgeResults = () => {
  let totalScore = 0
  let maxScore = 0
  const categoryScores = {}
  
  questions.value.forEach((question, index) => {
    const userAnswer = answers.value[index]
    const isCorrect = checkAnswer(question, userAnswer)
    
    maxScore += question.points
    if (isCorrect) {
      totalScore += question.points
    }
    
    // Track category scores
    if (!categoryScores[question.category]) {
      categoryScores[question.category] = { score: 0, total: 0 }
    }
    categoryScores[question.category].total += question.points
    if (isCorrect) {
      categoryScores[question.category].score += question.points
    }
  })
  
  const percentage = Math.round((totalScore / maxScore) * 100)
  
  return {
    totalScore,
    maxScore,
    percentage,
    categoryScores,
    level: getSkillLevel(percentage),
    recommendations: getRecommendations(categoryScores)
  }
}

const checkAnswer = (question, userAnswer) => {
  if (question.type === 'multiple-choice' || question.type === 'true-false') {
    return userAnswer === question.correctAnswer
  } else if (question.type === 'fill-blank') {
    return question.acceptedAnswers.some(answer => 
      userAnswer.toLowerCase().trim() === answer.toLowerCase()
    )
  } else if (question.type === 'code-completion') {
    // Simplified code checking (in real app, this would be more sophisticated)
    return question.acceptedAnswers.some(answer => 
      userAnswer.includes(answer)
    )
  }
  return false
}

const getSkillLevel = (percentage) => {
  if (percentage >= 90) return 'Expert'
  if (percentage >= 80) return 'Advanced'
  if (percentage >= 70) return 'Intermediate'
  if (percentage >= 60) return 'Beginner'
  return 'Novice'
}

const getRecommendations = (categoryScores) => {
  const recommendations = []
  
  Object.entries(categoryScores).forEach(([category, scores]) => {
    const percentage = (scores.score / scores.total) * 100
    if (percentage < 70) {
      recommendations.push({
        category,
        message: `Consider improving your ${category} skills`,
        resources: [`${category} fundamentals course`, `${category} practice exercises`]
      })
    }
  })
  
  return recommendations
}

// Initialize assessment
onMounted(async () => {
  try {
    // Check for saved progress
    const savedProgress = localStorage.getItem('knowledgeAssessmentProgress')
    
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress)
      currentQuestionIndex.value = progressData.currentQuestionIndex
      answers.value = progressData.answers
      timeRemaining.value = progressData.timeRemaining
    }
    
    // Load questions (in real app, this would be an API call)
    questions.value = [
      {
        id: 1,
        type: 'multiple-choice',
        category: 'JavaScript',
        difficulty: 'Beginner',
        points: 5,
        text: 'What is the correct way to declare a variable in JavaScript?',
        options: [
          { text: 'var myVariable;', value: 'a' },
          { text: 'variable myVariable;', value: 'b' },
          { text: 'v myVariable;', value: 'c' },
          { text: 'declare myVariable;', value: 'd' }
        ],
        correctAnswer: 'a'
      },
      {
        id: 2,
        type: 'multiple-choice',
        category: 'HTML',
        difficulty: 'Beginner',
        points: 5,
        text: 'Which HTML tag is used to create a hyperlink?',
        options: [
          { text: '&lt;link&gt;', value: 'a' },
          { text: '&lt;a&gt;', value: 'b' },
          { text: '&lt;href&gt;', value: 'c' },
          { text: '&lt;url&gt;', value: 'd' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 3,
        type: 'true-false',
        category: 'CSS',
        difficulty: 'Beginner',
        points: 3,
        text: 'CSS stands for Cascading Style Sheets.',
        correctAnswer: true
      },
      {
        id: 4,
        type: 'multiple-choice',
        category: 'JavaScript',
        difficulty: 'Intermediate',
        points: 8,
        text: 'What will be the output of the following code?',
        code: `console.log(typeof null);`,
        options: [
          { text: '"null"', value: 'a' },
          { text: '"undefined"', value: 'b' },
          { text: '"object"', value: 'c' },
          { text: '"boolean"', value: 'd' }
        ],
        correctAnswer: 'c'
      },
      {
        id: 5,
        type: 'fill-blank',
        category: 'HTML',
        difficulty: 'Intermediate',
        points: 6,
        text: 'Complete the HTML tag to create a form:',
        textWithBlank: 'To create a form in HTML, you use the <strong>&lt;____&gt;</strong> tag.',
        acceptedAnswers: ['form', 'FORM']
      },
      {
        id: 6,
        type: 'code-completion',
        category: 'JavaScript',
        difficulty: 'Advanced',
        points: 10,
        text: 'Complete the function to reverse a string:',
        codeTemplate: `function reverseString(str) {
  // Complete this function
  return ____;
}`,
              acceptedAnswers: ['str.split("").reverse().join("")', 'str.split("").reverse().join("")']
      },
      {
        id: 7,
        type: 'multiple-choice',
        category: 'CSS',
        difficulty: 'Intermediate',
        points: 7,
        text: 'Which CSS property is used to change the text color?',
        options: [
          { text: 'text-color', value: 'a' },
          { text: 'color', value: 'b' },
          { text: 'font-color', value: 'c' },
          { text: 'text-style', value: 'd' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 8,
        type: 'true-false',
        category: 'JavaScript',
        difficulty: 'Advanced',
        points: 8,
        text: 'JavaScript is a statically typed language.',
        correctAnswer: false
      },
      {
        id: 9,
        type: 'multiple-choice',
        category: 'HTML',
        difficulty: 'Advanced',
        points: 10,
        text: 'Which attribute is used to specify that an input field must be filled out?',
        options: [
          { text: 'validate', value: 'a' },
          { text: 'required', value: 'b' },
          { text: 'mandatory', value: 'c' },
          { text: 'must-fill', value: 'd' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 10,
        type: 'fill-blank',
        category: 'CSS',
        difficulty: 'Advanced',
        points: 9,
        text: 'Complete the CSS selector:',
        textWithBlank: 'To select all elements with class "highlight", you use: <strong>.____</strong>',
        acceptedAnswers: ['highlight']
      }
    ]
    
    // Initialize answers array
    if (answers.value.length === 0) {
      answers.value = new Array(questions.value.length).fill(null)
    }
    
    // Start timer
    startTimer()
    
    loading.value = false
  } catch (error) {
    console.error('Error loading assessment:', error)
    loading.value = false
  }
})

// Cleanup timer on unmount
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

// SEO
useSeoMeta({
  title: 'Knowledge Assessment - ProGrowth',
  description: 'Test your technical knowledge and skills with our comprehensive assessment'
})
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.btn-primary {
  @apply bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200;
}

.input-field {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

/* Code syntax highlighting */
pre code {
  @apply text-sm;
}

/* Timer animation */
@keyframes pulse-warning {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.timer-warning {
  animation: pulse-warning 1s infinite;
}

/* Question transition effects */
.question-enter-active,
.question-leave-active {
  transition: all 0.3s ease;
}

.question-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.question-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Custom radio button animations */
.radio-option {
  transition: all 0.2s ease;
}

.radio-option:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Progress dots animation */
.progress-dot {
  transition: all 0.3s ease;
}

/* Review panel animations */
.review-enter-active,
.review-leave-active {
  transition: all 0.3s ease;
}

.review-enter-from,
.review-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>