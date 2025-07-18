import { connectDB } from './utils/db.js'
import { requireAuth } from './utils/auth.js'
import User from './models/User.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    // Authenticate user
    const user = await requireAuth(event)
    
    // Get full user profile with all details
    const userProfile = await User.findById(user._id).select('-password')
    
    if (!userProfile) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User profile not found'
      })
    }
    
    return {
      success: true,
      data: userProfile
    }
    
  } catch (error) {
    console.error('Profile fetch error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch profile'
    })
  }
})