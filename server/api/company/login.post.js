import { connectDB } from '../../utils/db.js'
import Company from '../../models/Company.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const body = await readBody(event)
    const { email, password } = body
    
    // Validation
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }
    
    // Find company by email
    const company = await Company.findOne({ email: email.toLowerCase() })
    if (!company) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }
    
    // Check if company is approved
    if (company.status !== 'approved') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Your company account is pending approval. Please wait for admin approval.'
      })
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, company.password)
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }
    
    // Generate JWT token
    const token = jwt.sign(
      {
        companyId: company._id,
        email: company.email,
        name: company.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    
    return {
      success: true,
      token,
      company: {
        id: company._id,
        name: company.name,
        email: company.email,
        contactPerson: company.contactPerson,
        companyDetails: company.companyDetails,
        status: company.status
      }
    }
    
  } catch (error) {
    console.error('Company login error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Login failed'
    })
  }
})