import { connectDB } from '../utils/db.js'
import User from '../models/User.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const body = await readBody(event)
    const { userId, testType } = body

    const user = await User.findById(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Reset the assessment if it exists
    if (testType === 'personality') {
      user.assessments.personality.progress = 0
      user.assessments.personality.completed = false
      user.assessments.personality.results = {}
    } else if (testType === 'knowledge') {
      user.assessments.knowledge.progress = 0
      user.assessments.knowledge.completed = false
      user.assessments.knowledge.results = {}
    } else if (testType === 'softSkills') {
      user.assessments.softSkills.progress = 0
      user.assessments.softSkills.completed = false
      user.assessments.softSkills.results = {}
    }

    await user.save()

    return {
      success: true,
      message: `${testType} assessment started`,
      assessments: user.assessments
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to start assessment'
    })
  }
})