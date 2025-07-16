import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectDB from '../utils/db.js'
import User from '../models/User.js'
import Company from '../models/Company.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const body = await readBody(event)
    const { type, ...data } = body

    if (type === 'individual') {
      const { name, email, password, gender, age, university, idCard } = data

      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        throw createError({
          statusCode: 400,
          statusMessage: 'User already exists'
        })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        gender,
        age,
        university: university || '',
        idCardPath: idCard || 'uploaded'
      })

      await user.save()

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )

      return {
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    } else if (type === 'business') {
      const { companyName, contactPerson, email, industry, companySize } = data

      // Check if company already exists
      const existingCompany = await Company.findOne({ email })
      if (existingCompany) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Company already registered'
        })
      }

      // Create company
      const company = new Company({
        companyName,
        contactPerson,
        email,
        industry,
        companySize
      })

      await company.save()

      return {
        success: true,
        company: {
          id: company._id,
          companyName: company.companyName,
          email: company.email
        }
      }
    }

    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid registration type'
    })

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Registration failed'
    })
  }
})