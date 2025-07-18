import Company from '../../../models/Company.js'
import { connectDB } from '../../../utils/db.js'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const body = await readBody(event)

    // Check if company already exists
    const existingCompany = await Company.findOne({ email: body.email })
    if (existingCompany) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Company with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 12)

    // Create company
    const company = new Company({
      ...body,
      password: hashedPassword
    })

    await company.save()

    return {
      success: true,
      message: 'Company registered successfully. Please wait for approval.',
      companyId: company._id
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Registration failed'
    })
  }
})