import Company from '../../../models/Company.js'
import { connectDB } from '../../../utils/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const { email, password } = await readBody(event)

    // Find company
    const company = await Company.findOne({ email })
    if (!company) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, company.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Check if company is approved
    if (company.status !== 'approved') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Company account is not approved yet'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        companyId: company._id,
        email: company.email,
        type: 'company'
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
        status: company.status
      }
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Login failed'
    })
  }
})