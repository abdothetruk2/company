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
            <h1 class="ml-3 text-xl font-bold text-gray-900">ProGrowth</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">Career Analysis Results</div>
            <button @click="downloadReport" class="btn-secondary text-sm">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Generating your personalized career analysis...</p>
      </div>

      <!-- Results Content -->
      <div v-else-if="analysis" class="space-y-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Your Career Analysis</h2>
          <p class="text-xl text-gray-600">Comprehensive insights based on your assessments</p>
        </div>

        <!-- Personality Type Section -->
        <div class="card p-8">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="ml-4 text-2xl font-bold text-gray-900">Your Personality Type</h3>
          </div>
          
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
            <div class="text-center">
              <div class="text-4xl font-bold text-blue-600 mb-2">{{ analysis.personalityType }}</div>
              <div class="text-lg text-gray-700 mb-4">{{ getPersonalityDescription(analysis.personalityType) }}</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="bg-white rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2">Strengths</h4>
                  <ul class="text-gray-600 space-y-1">
                    <li v-for="strength in getPersonalityStrengths(analysis.personalityType)" :key="strength">
                      • {{ strength }}
                    </li>
                  </ul>
                </div>
                <div class="bg-white rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2">Work Style</h4>
                  <ul class="text-gray-600 space-y-1">
                    <li v-for="style in getWorkStyle(analysis.personalityType)" :key="style">
                      • {{ style }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interests Section -->
        <div class="card p-8">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="ml-4 text-2xl font-bold text-gray-900">Your Interests</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="interest in analysis.interests" :key="interest" class="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-bold">✓</span>
                </div>
                <div class="ml-3">
                  <div class="font-semibold text-gray-900">{{ interest.split(' - ')[0] }}</div>
                  <div class="text-sm text-gray-600">{{ interest.split(' - ')[1] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Suitable Fields Section -->
        <div class="card p-8">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 class="ml-4 text-2xl font-bold text-gray-900">Suitable Career Fields</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="field in analysis.suitableFields" :key="field" class="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200 hover:shadow-md transition-shadow duration-200">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold">{{ field.charAt(0) }}</span>
                </div>
                <h4 class="ml-3 text-lg font-semibold text-gray-900">{{ field }}</h4>
              </div>
              <p class="text-gray-600 text-sm">{{ getFieldDescription(field) }}</p>
              <div class="mt-3 flex items-center text-sm text-orange-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                High compatibility match
              </div>
            </div>
          </div>
        </div>

        <!-- Skills to Improve Section -->
        <div class="card p-8">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="ml-4 text-2xl font-bold text-gray-900">Skills to Develop</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="skill in analysis.skillsToImprove" :key="skill" class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span class="ml-3 font-semibold text-gray-900">{{ skill }}</span>
                </div>
                <div class="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  Priority
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI-Powered Course Recommendations -->
        <div class="card p-8">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="ml-4 text-2xl font-bold text-gray-900">AI-Recommended Courses</h3>
            <div class="ml-3 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
              Powered by AI
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="course in analysis.recommendedCourses" :key="course.title" class="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <div class="text-sm text-indigo-600 font-medium">{{ course.provider }}</div>
                  <div class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {{ course.difficulty }}
                  </div>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                  {{ course.title }}
                </h4>
                <p class="text-gray-600 text-sm mb-4">{{ course.description }}</p>
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-500">{{ course.duration }}</div>
                  <a :href="course.url" target="_blank" class="btn-primary text-sm">
                    View Course
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Take Action?</h3>
            <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
              Your personalized career roadmap is ready. Start with the recommended courses and begin building the skills that will accelerate your career growth.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="downloadReport" class="btn-primary text-lg px-8 py-3">
                Download Full Report
              </button>
              <NuxtLink to="/subscription" class="btn-secondary text-lg px-8 py-3 inline-block text-center">
                Unlock Premium Jobs
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-12">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Analysis Not Available</h3>
        <p class="text-gray-600 mb-6">Please complete all assessments first to generate your career analysis.</p>
        <NuxtLink to="/dashboard/assessments" class="btn-primary">
          Complete Assessments
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const analysis = ref(null)

const personalityDescriptions = {
  'INTJ': 'The Architect - Strategic, independent, and highly analytical',
  'ENFP': 'The Campaigner - Enthusiastic, creative, and people-focused',
  'ISTJ': 'The Logistician - Practical, reliable, and detail-oriented',
  'ESTP': 'The Entrepreneur - Energetic, adaptable, and action-oriented',
  'INFP': 'The Mediator - Idealistic, creative, and value-driven',
  'ENTJ': 'The Commander - Natural leader, strategic, and decisive'
}

const personalityStrengths = {
  'INTJ': ['Strategic thinking', 'Independent work', 'Problem solving', 'Long-term planning'],
  'ENFP': ['Creativity', 'Communication', 'Adaptability', 'Team collaboration'],
  'ISTJ': ['Attention to detail', 'Reliability', 'Organization', 'Quality focus'],
  'ESTP': ['Quick decision making', 'Adaptability', 'Practical solutions', 'Crisis management']
}

const workStyles = {
  'INTJ': ['Prefers autonomy', 'Enjoys complex challenges', 'Values competence', 'Future-focused'],
  'ENFP': ['Thrives in teams', 'Needs variety', 'Values creativity', 'People-oriented'],
  'ISTJ': ['Structured environment', 'Clear procedures', 'Consistent routine', 'Quality standards'],
  'ESTP': ['Fast-paced work', 'Hands-on approach', 'Immediate results', 'Flexible schedule']
}

const fieldDescriptions = {
  'Technology': 'Software development, AI, cybersecurity, and digital innovation',
  'Engineering': 'Design, build, and maintain systems, structures, and processes',
  'Research': 'Scientific investigation, data analysis, and knowledge discovery',
  'Marketing': 'Brand management, digital marketing, and customer engagement',
  'Finance': 'Financial analysis, investment management, and business strategy',
  'Healthcare': 'Medical services, research, and healthcare administration',
  'Education': 'Teaching, training, and educational program development',
  'Business': 'Management, operations, and strategic business development'
}

const getPersonalityDescription = (type) => {
  return personalityDescriptions[type] || 'Unique personality with diverse strengths'
}

const getPersonalityStrengths = (type) => {
  return personalityStrengths[type] || ['Problem solving', 'Communication', 'Adaptability', 'Team work']
}

const getWorkStyle = (type) => {
  return workStyles[type] || ['Collaborative', 'Goal-oriented', 'Continuous learning', 'Quality focused']
}

const getFieldDescription = (field) => {
  return fieldDescriptions[field] || 'Exciting career opportunities in this field'
}

const downloadReport = () => {
  // Implementation for downloading PDF report
  alert('Report download feature will be implemented')
}

const shareResults = () => {
  // Implementation for sharing results
  if (navigator.share) {
    navigator.share({
      title: 'My ProGrowth Career Analysis',
      text: 'Check out my personalized career analysis from ProGrowth!',
      url: window.location.href
    })
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}

onMounted(async () => {
  try {
    // Simulate API call to get analysis results
    // In real implementation, this would fetch from the database
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock analysis data
    analysis.value = {
      personalityType: 'INTJ',
      interests: [
        'Investigative - Research and analysis',
        'Artistic - Creative and expressive work',
        'Enterprising - Leadership and business'
      ],
      suitableFields: ['Technology', 'Engineering', 'Research', 'Business'],
      skillsToImprove: ['Communication', 'Leadership', 'Teamwork'],
      recommendedCourses: [
        {
          title: 'Strategic Thinking and Planning',
          provider: 'Coursera',
          url: 'https://coursera.org/strategic-thinking',
          difficulty: 'Intermediate',
          duration: '6 weeks',
          description: 'Develop strategic thinking skills for leadership roles'
        },
        {
          title: 'Data Analysis and Visualization',
          provider: 'edX',
          url: 'https://edx.org/data-analysis',
          difficulty: 'Advanced',
          duration: '8 weeks',
          description: 'Master data analysis techniques and visualization tools'
        },
        {
          title: 'Communication Skills for Professionals',
          provider: 'LinkedIn Learning',
          url: 'https://linkedin.com/learning/communication',
          difficulty: 'Beginner',
          duration: '4 weeks',
          description: 'Improve your professional communication abilities'
        },
        {
          title: 'Leadership Development Program',
          provider: 'Harvard Business School Online',
          url: 'https://hbs.edu/leadership',
          difficulty: 'Advanced',
          duration: '12 weeks',
          description: 'Comprehensive leadership development program'
        },
        {
          title: 'Project Management Fundamentals',
          provider: 'PMI',
          url: 'https://pmi.org/project-management',
          difficulty: 'Intermediate',
          duration: '10 weeks',
          description: 'Learn systematic project management methodologies'
        },
        {
          title: 'Machine Learning for Beginners',
          provider: 'Udacity',
          url: 'https://udacity.com/machine-learning',
          difficulty: 'Intermediate',
          duration: '16 weeks',
          description: 'Introduction to machine learning concepts and applications'
        }
      ],
      generatedAt: new Date()
    }
    
    loading.value = false
  } catch (error) {
    console.error('Failed to load analysis:', error)
    loading.value = false
  }
})

useHead({
  title: 'Career Analysis Results - ProGrowth'
})
</script>