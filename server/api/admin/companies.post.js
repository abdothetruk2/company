import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Company from '~/server/models/Company'
import { connectDB } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Verify admin authentication
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authorization token required'
      })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if (decoded.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Admin access required'
      })
    }

    // Get request body
    const body = await readBody(event)
    const {
      name,
      email,
      password,
      contactPerson,
      companyDetails,
      status = 'pending'
    } = body

    // Validate required fields
    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name, email, and password are required'
      })
    }

    // Check if company already exists
    const existingCompany = await Company.findOne({ email })
    if (existingCompany) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Company with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create company
    const company = new Company({
      name,
      email,
      password: hashedPassword,
      contactPerson: {
        name: contactPerson?.name || '',
        position: contactPerson?.position || 'Manager',
        phone: contactPerson?.phone || ''
      },
      companyDetails: {
        industry: companyDetails?.industry || 'other',
        size: companyDetails?.size || '1-10',
        website: companyDetails?.website || '',
        description: companyDetails?.description || '',
        address: companyDetails?.address || {}
      },
      documents: {
        businessLicense: 'pending'
      },
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await company.save()

    // Return company without password
    const { password: _, ...companyData } = company.toObject()

    return {
      success: true,
      message: 'Company created successfully',
      data: {
        company: companyData
      }
    }

  } catch (error) {
    console.error('Create company error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create company'
    })
  }
})