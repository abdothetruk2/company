import User from '../models/User.js'
import { connectDB } from '../utils/db.js'
import { requireAuth } from '../utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const user = await requireAuth(event)
    const body = await readBody(event)
    
    // Extract allowed fields for update
    const allowedFields = ['name', 'gender', 'age', 'university']
    const updateData = {}
    
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    })
    
    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!updatedUser) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }
    
    return {
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
        age: updatedUser.age,
        university: updatedUser.university,
        subscription: updatedUser.subscription,
        assessments: updatedUser.assessments,
        careerAnalysis: updatedUser.careerAnalysis
      }
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update profile'
    })
  }
})