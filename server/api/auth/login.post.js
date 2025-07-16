import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectDB from '../utils/db.js'
import User from '../models/User.js'
import Company from '../models/Company.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const body = await readBody(event)
    const { email, password } = body

    // Check if it's a user account
    const user = await User.findOne({ email })
    if (user) {
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid email or password'
        })
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, type: 'individual' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      )

      return {
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          type: 'individual',
          subscription: user.subscription
        }
      }
    }

    // Check if it's a company account
    const company = await Company.findOne({ email })
    if (company) {
      // For demo purposes, companies don't have passwords yet
      // In production, you'd add password field to Company model
      const token = jwt.sign(
        { companyId: company._id, email: company.email, type: 'business' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      )

      return {
        success: true,
        token,
        user: {
          id: company._id,
          name: company.contactPerson,
          email: company.email,
          type: 'business',
          companyName: company.companyName,
          subscription: company.subscription
        }
      }
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password'
    })

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Login failed'
    })
  }
})