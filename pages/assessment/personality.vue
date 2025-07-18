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
          <h2 class="text-lg font-semibold text-gray-900">Personality & Interest Assessment</h2>
          <span class="text-sm text-gray-600">{{ Math.round(progress) }}% Complete</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 progress-bar">
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
        <p class="text-gray-600">Loading assessment...</p>
      </div>

      <!-- Question -->
      <div v-else-if="currentQuestion" class="card p-8 mb-8 question-enter-active question-leave-active">
        <div class="mb-6">
          <div class="text-sm text-primary-600 font-medium mb-2">
            Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            {{ currentQuestion.text }}
          </h3>
          <p v-if="currentQuestion.description" class="text-gray-600 mb-6">
            {{ currentQuestion.description }}
          </p>
        </div>

        <!-- Multiple Choice Questions -->
        <div v-if="currentQuestion.type === 'multiple-choice'" class="space-y-3">
          <label 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 radio-option"
            :class="{ 'border-primary-500 bg-primary-50 selected': answers[currentQuestionIndex] === option.value }"
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
            <div class="flex-1">
              <div class="font-medium text-gray-900">{{ option.text }}</div>
              <div v-if="option.description" class="text-sm text-gray-600 mt-1">{{ option.description }}</div>
            </div>
          </label>
        </div>

        <!-- Likert Scale Questions -->
        <div v-else-if="currentQuestion.type === 'likert'" class="space-y-6">
          <div class="grid grid-cols-5 gap-4 text-center text-sm text-gray-600 mb-4">
            <div>Strongly Disagree</div>
            <div>Disagree</div>
            <div>Neutral</div>
            <div>Agree</div>
            <div>Strongly Agree</div>
          </div>
          <div class="flex items-center justify-center space-x-8">
            <label v-for="value in [1, 2, 3, 4, 5]" :key="value" class="flex flex-col items-center cursor-pointer likert-option">
              <input 
                type="radio" 
                :value="value"
                v-model="answers[currentQuestionIndex]"
                class="sr-only"
              />
              <div class="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-primary-500 transition-colors duration-200"
                   :class="{ 'border-primary-500 bg-primary-500 text-white selected': answers[currentQuestionIndex] === value }">
                {{ value }}
              </div>
            </label>
          </div>
        </div>

        <!-- Ranking Questions -->
        <div v-else-if="currentQuestion.type === 'ranking'" class="space-y-4">
          <p class="text-gray-600 mb-4">Drag to reorder from most important (top) to least important (bottom):</p>
          <draggable 
            v-model="rankingItems" 
            class="space-y-2"
            @change="updateRankingAnswer"
            ghost-class="sortable-ghost"
            chosen-class="sortable-chosen"
          >
            <div 
              v-for="(item, index) in rankingItems" 
              :key="item.id"
              class="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-shadow duration-200"
            >
              <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <div class="font-medium text-gray-900">{{ item.text }}</div>
                <div v-if="item.description" class="text-sm text-gray-600 mt-1">{{ item.description }}</div>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </draggable>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between">
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
              :class="index <= currentQuestionIndex ? 'bg-primary-500' : 'bg-gray-300'"
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
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'

// Page metadata
definePageMeta({
  title: 'Personality Assessment - ProGrowth',
  layout: 'assessment'
})

// Reactive data
const loading = ref(true)
const currentQuestionIndex = ref(0)
const answers = ref([])
const questions = ref([])
const rankingItems = ref([])
const currentStep = ref(1)
const totalSteps = ref(3)

// Computed properties
const progress = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100)
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

const isCurrentQuestionAnswered = computed(() => {
  const answer = answers.value[currentQuestionIndex.value]
  if (currentQuestion.value?.type === 'ranking') {
    return Array.isArray(answer) && answer.length === rankingItems.value.length
  }
  return answer !== undefined && answer !== null
})

const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)

// Methods
const saveAndExit = async () => {
  try {
    // Save current progress
    const progressData = {
      assessmentType: 'personality',
      currentQuestionIndex: currentQuestionIndex.value,
      answers: answers.value,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('assessmentProgress', JSON.stringify(progressData))
    
    // Navigate back to dashboard or assessment overview
    await navigateTo('/assessment')
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    
    // Update ranking items if it's a ranking question
    if (currentQuestion.value?.type === 'ranking') {
      const savedAnswer = answers.value[currentQuestionIndex.value]
      if (savedAnswer && Array.isArray(savedAnswer)) {
        rankingItems.value = savedAnswer.map(id => 
          currentQuestion.value.options.find(option => option.id === id)
        ).filter(Boolean)
      } else {
        rankingItems.value = [...currentQuestion.value.options]
      }
    }
  }
}

const nextQuestion = async () => {
  if (!isCurrentQuestionAnswered.value) return
  
  if (isLastQuestion.value) {
    await completeAssessment()
  } else {
    currentQuestionIndex.value++
    
    // Initialize ranking items for ranking questions
    if (currentQuestion.value?.type === 'ranking') {
      const savedAnswer = answers.value[currentQuestionIndex.value]
      if (savedAnswer && Array.isArray(savedAnswer)) {
        rankingItems.value = savedAnswer.map(id => 
          currentQuestion.value.options.find(option => option.id === id)
        ).filter(Boolean)
      } else {
        rankingItems.value = [...currentQuestion.value.options]
      }
    }
  }
}

const updateRankingAnswer = () => {
  answers.value[currentQuestionIndex.value] = rankingItems.value.map(item => item.id)
}

const completeAssessment = async () => {
  try {
    loading.value = true
    
    // Calculate results
    const results = calculatePersonalityResults()
    
    // Save assessment results
    const assessmentData = {
      type: 'personality',
      answers: answers.value,
      results: results,
      completedAt: new Date().toISOString(),
      duration: calculateDuration()
    }
    
    // Store results (in real app, this would be an API call)
    localStorage.setItem('personalityResults', JSON.stringify(assessmentData))
    
    // Navigate to next assessment or results
    await navigateTo('/assessment/knowledge')
  } catch (error) {
    console.error('Error completing assessment:', error)
  } finally {
    loading.value = false
  }
}

const calculatePersonalityResults = () => {
  // Simplified personality calculation
  const personalityScores = {
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    neuroticism: 0,
    openness: 0
  }
  
  // Calculate scores based on answers
  answers.value.forEach((answer, index) => {
    const question = questions.value[index]
    if (question?.type === 'likert' && typeof answer === 'number') {
      // Map questions to personality traits (simplified)
      if (index % 5 === 0) personalityScores.extraversion += answer
      if (index % 5 === 1) personalityScores.agreeableness += answer
      if (index % 5 === 2) personalityScores.conscientiousness += answer
      if (index % 5 === 3) personalityScores.neuroticism += answer
      if (index % 5 === 4) personalityScores.openness += answer
    }
  })
  
  // Determine personality type (simplified MBTI-like)
  const personalityType = determinePersonalityType(personalityScores)
  
  return {
    scores: personalityScores,
    type: personalityType,
    description: getPersonalityDescription(personalityType)
  }
}

const determinePersonalityType = (scores) => {
  // Simplified personality type determination
  const traits = []
  
  traits.push(scores.extraversion > 15 ? 'E' : 'I') // Extraversion vs Introversion
  traits.push(scores.openness > 15 ? 'N' : 'S') // Intuition vs Sensing
  traits.push(scores.agreeableness > 15 ? 'F' : 'T') // Feeling vs Thinking
  traits.push(scores.conscientiousness > 15 ? 'J' : 'P') // Judging vs Perceiving
  
  return traits.join('')
}

const getPersonalityDescription = (type) => {
  const descriptions = {
    'ENFJ': 'The Protagonist - Charismatic and inspiring leaders',
    'ENFP': 'The Campaigner - Enthusiastic and creative free spirits',
    'ENTJ': 'The Commander - Bold and imaginative strong-willed leaders',
    'ENTP': 'The Debater - Smart and curious thinkers',
    'ESFJ': 'The Consul - Extraordinarily caring and social',
    'ESFP': 'The Entertainer - Spontaneous and enthusiastic',
    'ESTJ': 'The Executive - Excellent administrators',
    'ESTP': 'The Entrepreneur - Smart and energetic',
    'INFJ': 'The Advocate - Creative and insightful',
    'INFP': 'The Mediator - Poetic and kind altruists',
    'INTJ': 'The Architect - Imaginative and strategic thinkers',
    'INTP': 'The Thinker - Innovative inventors',
    'ISFJ': 'The Protector - Very dedicated and warm protectors',
    'ISFP': 'The Adventurer - Flexible and charming artists',
    'ISTJ': 'The Logistician - Practical and fact-minded',
    'ISTP': 'The Virtuoso - Bold and practical experimenters'
  }
  
  return descriptions[type] || 'Unique personality type'
}

const calculateDuration = () => {
  // Calculate assessment duration (simplified)
  const startTime = localStorage.getItem('assessmentStartTime')
  if (startTime) {
    return Math.round((Date.now() - parseInt(startTime)) / 1000 / 60) // minutes
  }
  return 0
}

// Initialize assessment
// Initialize assessment
onMounted(async () => {
  try {
    // Set start time if not already set
    if (!localStorage.getItem('assessmentStartTime')) {
      localStorage.setItem('assessmentStartTime', Date.now().toString())
    }
    
    // Load saved progress if exists
    const savedProgress = localStorage.getItem('assessmentProgress')
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      if (progress.assessmentType === 'personality') {
        currentQuestionIndex.value = progress.currentQuestionIndex || 0
        answers.value = progress.answers || []
      }
    }
    
    // Initialize questions (in real app, this would be fetched from API)
    questions.value = [
      {
        text: 'I enjoy being the center of attention at social gatherings',
        type: 'likert',
        trait: 'extraversion'
      },
      {
        text: 'I am sympathetic to others feelings',
        type: 'likert',
        trait: 'agreeableness'
      },
      {
        text: 'I get chores done right away',
        type: 'likert',
        trait: 'conscientiousness'
      },
      {
        text: 'I often feel blue',
        type: 'likert',
        trait: 'neuroticism'
      },
      {
        text: 'I have a vivid imagination',
        type: 'likert',
        trait: 'openness'
      },
      {
        text: 'Which work environment appeals to you most?',
        type: 'multiple-choice',
        options: [
          { text: 'Open office with lots of collaboration', value: 'collaborative', description: 'Working closely with team members' },
          { text: 'Private office for focused work', value: 'independent', description: 'Working alone with minimal interruptions' },
          { text: 'Flexible workspace that changes based on tasks', value: 'flexible', description: 'Adapting workspace to different needs' },
          { text: 'Remote work from anywhere', value: 'remote', description: 'Working from home or any location' }
        ]
      },
      {
        text: 'Rank these career aspects by importance to you:',
        type: 'ranking',
        options: [
          { id: 1, text: 'High Salary', description: 'Competitive compensation' },
          { id: 2, text: 'Work-Life Balance', description: 'Flexible hours and time for personal life' },
          { id: 3, text: 'Career Growth', description: 'Opportunities for advancement' },
          { id: 4, text: 'Job Security', description: 'Stable employment' },
          { id: 5, text: 'Meaningful Work', description: 'Making a positive impact' }
        ]
      },
      {
        text: 'I prefer to work with detailed plans rather than improvising',
        type: 'likert',
        trait: 'conscientiousness'
      },
      {
        text: 'I enjoy meeting new people',
        type: 'likert',
        trait: 'extraversion'
      },
      {
        text: 'I trust others easily',
        type: 'likert',
        trait: 'agreeableness'
      }
    ]
    
    // Initialize answers array
    if (answers.value.length === 0) {
      answers.value = new Array(questions.value.length).fill(null)
    }
    
    // Initialize ranking items for current question if it's a ranking type
    initializeRankingItems()
    
  } catch (error) {
    console.error('Error initializing assessment:', error)
  } finally {
    loading.value = false
  }
})

// Add this new method to properly initialize ranking items
const initializeRankingItems = () => {
  if (currentQuestion.value?.type === 'ranking') {
    const savedAnswer = answers.value[currentQuestionIndex.value]
    if (savedAnswer && Array.isArray(savedAnswer)) {
      // Restore saved order
      rankingItems.value = savedAnswer.map(id => 
        currentQuestion.value.options.find(option => option.id === id)
      ).filter(Boolean)
    } else {
      // Use default order
      rankingItems.value = [...currentQuestion.value.options]
    }
  }
}

// Update the answer method 
// Update the nextQuestion method

// SEO
useSeoMeta({
  title: 'Personality Assessment - ProGrowth',
  description: 'Discover your personality type and career interests with our comprehensive assessment'
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

/* Custom styles for draggable items */
.sortable-ghost {
  @apply opacity-50;
}

.sortable-chosen {
  @apply transform scale-105;
}

/* Animation for progress bar */
.progress-bar {
  transition: width 0.3s ease-in-out;
}

/* Custom radio button styles */
.radio-option:hover {
  @apply border-primary-300 bg-primary-50;
}

.radio-option.selected {
  @apply border-primary-500 bg-primary-50;
}

/* Likert scale hover effects */
.likert-option:hover {
  @apply border-primary-400 bg-primary-50;
}

.likert-option.selected {
  @apply border-primary-500 bg-primary-500 text-white;
}

/* Question transition */
.question-enter-active,
.question-leave-active {
  transition: all 0.3s ease;
}

.question-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.question-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>