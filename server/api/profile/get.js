import User from '../models/User.js'
import { connectDB } from '../utils/db.js'
import { requireAuth } from '../utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const user = await requireAuth(event)
    
    return {
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        university: user.university,
        subscription: user.subscription,
        assessments: user.assessments,
        careerAnalysis: user.careerAnalysis
      }
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to get profile'
    })
  }
})