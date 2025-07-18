import { connectDB } from '../utils/db.js'
import User from '../models/User.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const body = await readBody(event)
    const { userId, testType, progress, results } = body

    const user = await User.findById(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Update assessment progress and results
    if (testType === 'personality') {
      user.assessments.personality.progress = progress
      if (results) {
        user.assessments.personality.completed = true
        user.assessments.personality.results = {
          ...results,
          completedAt: new Date()
        }
      }
    } else if (testType === 'knowledge') {
      user.assessments.knowledge.progress = progress
      if (results) {
        user.assessments.knowledge.completed = true
        user.assessments.knowledge.results = {
          ...results,
          completedAt: new Date()
        }
      }
    } else if (testType === 'softSkills') {
      user.assessments.softSkills.progress = progress
      if (results) {
        user.assessments.softSkills.completed = true
        user.assessments.softSkills.results = {
          ...results,
          completedAt: new Date()
        }
      }
    }

    await user.save()

    return {
      success: true,
      assessments: user.assessments
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update assessment'
    })
  }
})