import connectDB from '../utils/db.js'
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

const generateCareerAnalysis = (assessments) => {
  const { personality, knowledge, softSkills } = assessments

  // Determine personality type and interests
  const personalityType = personality.results?.mbtiType || 'ENFP'
  const riasecCode = personality.results?.riasecCode || 'SAE'
  
  // Map RIASEC to interests
  const riasecMapping = {
    'R': 'Realistic - Hands-on, practical work',
    'I': 'Investigative - Research and analysis',
    'A': 'Artistic - Creative and expressive work',
    'S': 'Social - Helping and teaching others',
    'E': 'Enterprising - Leadership and business',
    'C': 'Conventional - Organized and detail-oriented'
  }
  
  const interests = riasecCode.split('').map(code => riasecMapping[code]).filter(Boolean)

  // Determine suitable fields based on personality and interests
  const fieldMapping = {
    'INTJ': ['Technology', 'Engineering', 'Research', 'Strategy Consulting'],
    'ENFP': ['Marketing', 'Human Resources', 'Creative Industries', 'Education'],
    'ISTJ': ['Finance', 'Operations', 'Quality Assurance', 'Administration'],
    'ESTP': ['Sales', 'Business Development', 'Event Management', 'Sports'],
    'default': ['Business', 'Technology', 'Healthcare', 'Education']
  }

  const suitableFields = fieldMapping[personalityType] || fieldMapping['default']

  // Identify skills to improve based on soft skills assessment
  const skillsToImprove = []
  if (softSkills.results) {
    const skills = softSkills.results
    if (skills.communication < 7) skillsToImprove.push('Communication')
    if (skills.leadership < 7) skillsToImprove.push('Leadership')
    if (skills.problemSolving < 7) skillsToImprove.push('Problem Solving')
    if (skills.teamwork < 7) skillsToImprove.push('Teamwork')
    if (skills.adaptability < 7) skillsToImprove.push('Adaptability')
  }

  // Add technical skills if knowledge assessment shows gaps
  if (knowledge.results && knowledge.results.technicalSkills) {
    const lowTechSkills = knowledge.results.technicalSkills
      .filter(skill => skill.level < 7)
      .map(skill => skill.skill)
    
    if (lowTechSkills.length > 0) {
      skillsToImprove.push('Technical Skills')
    }
  }

  // Generate AI-powered course recommendations
  const recommendedCourses = generateCourseRecommendations(personalityType, interests, skillsToImprove)

  return {
    personalityType,
    interests,
    suitableFields,
    skillsToImprove,
    recommendedCourses,
    generatedAt: new Date()
  }
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