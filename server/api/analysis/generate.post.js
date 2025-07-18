import { connectDB } from '../utils/db.js'
import User from '../models/User.js'

// AI-powered course recommendations based on assessment results
const generateCourseRecommendations = (personalityType, interests, skillsToImprove) => {
  const courseDatabase = {
    'INTJ': [
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
      }
    ],
    'ENFP': [
      {
        title: 'Creative Problem Solving',
        provider: 'Udemy',
        url: 'https://udemy.com/creative-problem-solving',
        difficulty: 'Beginner',
        duration: '4 weeks',
        description: 'Enhance your creative thinking and innovation skills'
      },
      {
        title: 'Public Speaking and Presentation',
        provider: 'LinkedIn Learning',
        url: 'https://linkedin.com/learning/public-speaking',
        difficulty: 'Intermediate',
        duration: '3 weeks',
        description: 'Build confidence in public speaking and presentations'
      }
    ],
    'ISTJ': [
      {
        title: 'Project Management Fundamentals',
        provider: 'PMI',
        url: 'https://pmi.org/project-management',
        difficulty: 'Intermediate',
        duration: '10 weeks',
        description: 'Learn systematic project management methodologies'
      },
      {
        title: 'Quality Assurance and Testing',
        provider: 'Coursera',
        url: 'https://coursera.org/qa-testing',
        difficulty: 'Intermediate',
        duration: '6 weeks',
        description: 'Master quality assurance processes and testing methodologies'
      }
    ],
    'default': [
      {
        title: 'Communication Skills for Professionals',
        provider: 'Coursera',
        url: 'https://coursera.org/communication-skills',
        difficulty: 'Beginner',
        duration: '4 weeks',
        description: 'Improve your professional communication abilities'
      },
      {
        title: 'Time Management and Productivity',
        provider: 'Udemy',
        url: 'https://udemy.com/time-management',
        difficulty: 'Beginner',
        duration: '3 weeks',
        description: 'Learn effective time management strategies'
      }
    ]
  }

  // Add skill-specific courses
  const skillCourses = {
    'Leadership': {
      title: 'Leadership Development Program',
      provider: 'Harvard Business School Online',
      url: 'https://hbs.edu/leadership',
      difficulty: 'Advanced',
      duration: '12 weeks',
      description: 'Comprehensive leadership development program'
    },
    'Technical Skills': {
      title: 'Full Stack Web Development',
      provider: 'freeCodeCamp',
      url: 'https://freecodecamp.org/fullstack',
      difficulty: 'Intermediate',
      duration: '16 weeks',
      description: 'Complete web development bootcamp'
    },
    'Communication': {
      title: 'Advanced Business Communication',
      provider: 'Coursera',
      url: 'https://coursera.org/business-communication',
      difficulty: 'Intermediate',
      duration: '5 weeks',
      description: 'Master professional business communication'
    }
  }

  let recommendations = courseDatabase[personalityType] || courseDatabase['default']
  
  // Add skill-specific courses
  skillsToImprove.forEach(skill => {
    if (skillCourses[skill]) {
      recommendations.push(skillCourses[skill])
    }
  })

  return recommendations.slice(0, 6) // Return top 6 recommendations
}

function generateCareerAnalysis(assessments) {
  const { personality, knowledge, softSkills } = assessments

  // Extract personality data
  const personalityType = personality.results?.mbtiType || 'Unknown'
  const riasecCode = personality.results?.riasecCode || 'Unknown'
  const personalityTraits = personality.results?.personalityTraits || []

  // Extract knowledge data
  const technicalSkills = knowledge.results?.technicalSkills || []
  const domains = knowledge.results?.domains || []

  // Extract soft skills data
  const softSkillsResults = softSkills.results || {}

  // Generate career recommendations based on personality and skills
  const suitableFields = generateSuitableFields(personalityType, riasecCode, domains)
  const skillsToImprove = generateSkillsToImprove(softSkillsResults, technicalSkills)
  const recommendedCourses = generateRecommendedCourses(skillsToImprove, domains)

  return {
    personalityType,
    interests: personalityTraits,
    suitableFields,
    skillsToImprove,
    recommendedCourses,
    generatedAt: new Date()
  }
}

function generateSuitableFields(personalityType, riasecCode, domains) {
  const fieldMappings = {
    'INTJ': ['Software Engineering', 'Data Science', 'Research', 'Strategic Planning'],
    'ENFP': ['Marketing', 'Human Resources', 'Creative Writing', 'Counseling'],
    'ISTJ': ['Accounting', 'Project Management', 'Quality Assurance', 'Operations'],
    'ESTP': ['Sales', 'Business Development', 'Event Management', 'Entrepreneurship']
  }

  const riasecMappings = {
    'R': ['Engineering', 'Construction', 'Agriculture', 'Technical Support'],
    'I': ['Research', 'Data Analysis', 'Laboratory Work', 'Academic'],
    'A': ['Design', 'Creative Arts', 'Writing', 'Media Production'],
    'S': ['Healthcare', 'Education', 'Social Work', 'Customer Service'],
    'E': ['Management', 'Sales', 'Politics', 'Business Leadership'],
    'C': ['Accounting', 'Administration', 'Data Entry', 'Banking']
  }

  let fields = []
  
  // Add fields based on personality type
  if (fieldMappings[personalityType]) {
    fields.push(...fieldMappings[personalityType])
  }

  // Add fields based on RIASEC code
  if (riasecCode && riasecCode.length > 0) {
    const primaryCode = riasecCode[0]
    if (riasecMappings[primaryCode]) {
      fields.push(...riasecMappings[primaryCode])
    }
  }

  // Add fields based on knowledge domains
  fields.push(...domains)

  // Remove duplicates and return top 6
  return [...new Set(fields)].slice(0, 6)
}

function generateSkillsToImprove(softSkillsResults, technicalSkills) {
  const skillsToImprove = []

  // Check soft skills that need improvement (below 7/10)
  Object.entries(softSkillsResults).forEach(([skill, score]) => {
    if (typeof score === 'number' && score < 7) {
      skillsToImprove.push(skill.charAt(0).toUpperCase() + skill.slice(1))
    }
  })

  // Check technical skills that need improvement (below level 3)
  technicalSkills.forEach(skill => {
    if (skill.level < 3) {
      skillsToImprove.push(skill.skill)
    }
  })

  return skillsToImprove.slice(0, 5)
}

function generateRecommendedCourses(skillsToImprove, domains) {
  const courseDatabase = [
    {
      title: 'Communication Skills Masterclass',
      provider: 'Coursera',
      url: 'https://coursera.org/communication',
      difficulty: 'Beginner',
      duration: '4 weeks',
      description: 'Improve your verbal and written communication skills',
      skills: ['Communication']
    },
    {
      title: 'Leadership and Team Management',
      provider: 'edX',
      url: 'https://edx.org/leadership',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      description: 'Develop leadership skills and learn to manage teams effectively',
      skills: ['Leadership', 'Teamwork']
    },
    {
      title: 'Problem Solving Techniques',
      provider: 'Udemy',
      url: 'https://udemy.com/problem-solving',
      difficulty: 'Beginner',
      duration: '3 weeks',
      description: 'Learn systematic approaches to problem solving',
      skills: ['Problem Solving', 'ProblemSolving']
    },
    {
      title: 'JavaScript Fundamentals',
      provider: 'freeCodeCamp',
      url: 'https://freecodecamp.org/javascript',
      difficulty: 'Beginner',
      duration: '8 weeks',
      description: 'Master the basics of JavaScript programming',
      skills: ['JavaScript', 'Programming', 'Web Development']
    },
    {
      title: 'Data Science with Python',
      provider: 'Coursera',
      url: 'https://coursera.org/data-science-python',
      difficulty: 'Intermediate',
      duration: '12 weeks',
      description: 'Learn data analysis and machine learning with Python',
      skills: ['Python', 'Data Science', 'Machine Learning']
    },
    {
      title: 'Digital Marketing Fundamentals',
      provider: 'Google Digital Garage',
      url: 'https://learndigital.withgoogle.com',
      difficulty: 'Beginner',
      duration: '6 weeks',
      description: 'Learn the basics of digital marketing and online advertising',
      skills: ['Marketing', 'Digital Marketing']
    }
  ]

  const recommendedCourses = []

  // Find courses that match skills to improve
  skillsToImprove.forEach(skill => {
    const matchingCourses = courseDatabase.filter(course => 
      course.skills.some(courseSkill => 
        courseSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(courseSkill.toLowerCase())
      )
    )
    recommendedCourses.push(...matchingCourses)
  })

  // Find courses that match domains
  domains.forEach(domain => {
    const matchingCourses = courseDatabase.filter(course =>
      course.skills.some(courseSkill =>
        courseSkill.toLowerCase().includes(domain.toLowerCase()) ||
        domain.toLowerCase().includes(courseSkill.toLowerCase())
      )
    )
    recommendedCourses.push(...matchingCourses)
  })

  // Remove duplicates and return top 5
  const uniqueCourses = recommendedCourses.filter((course, index, self) =>
    index === self.findIndex(c => c.title === course.title)
  )

  return uniqueCourses.slice(0, 5)
}

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const body = await readBody(event)
    const { userId } = body

    const user = await User.findById(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Check if all assessments are completed
    const { personality, knowledge, softSkills } = user.assessments
    if (!personality.completed || !knowledge.completed || !softSkills.completed) {
      throw createError({
        statusCode: 400,
        statusMessage: 'All assessments must be completed first'
      })
    }

    // Generate comprehensive career analysis
    const careerAnalysis = generateCareerAnalysis(user.assessments)
    
    // Save analysis to user profile
    user.careerAnalysis = careerAnalysis
    await user.save()

    return {
      success: true,
      analysis: careerAnalysis
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to generate analysis'
    })
  }
})