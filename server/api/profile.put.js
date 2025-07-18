import { connectDB } from './utils/db.js'
import { requireAuth } from './utils/auth.js'
import User from './models/User.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    // Authenticate user
    const user = await requireAuth(event)
    
    // Get request body
    const body = await readBody(event)
    const { name, age, gender, university } = body
    
    // Validate required fields
    if (!name || !age || !gender) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name, age, and gender are required'
      })
    }
    
    // Validate age
    if (age < 16 || age > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Age must be between 16 and 100'
      })
    }
    
    // Validate gender
    if (!['male', 'female', 'other'].includes(gender)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid gender value'
      })
    }
    
    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name: name.trim(),
        age: parseInt(age),
        gender,
        university: university?.trim() || ''
      },
      { 
        new: true,
        runValidators: true
      }
    ).select('-password')
    
    if (!updatedUser) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }
    
    return {
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    }
    
  } catch (error) {
    console.error('Profile update error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      throw createError({
        statusCode: 400,
        statusMessage: messages.join(', ')
      })
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update profile'
    })
  }
})