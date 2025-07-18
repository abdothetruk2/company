import Company from '~/server/models/Company'
import { connectDB } from '~/server/utils/db.js'
import { verifyAdminToken } from '../../../utils/adminAuth.js'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  try {
    // Verify admin authentication
    const admin = await verifyAdminToken(event)
    
    // Check if admin has permission to manage companies
    if (!admin.permissions.includes('manage_companies') && admin.role !== 'super_admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Insufficient permissions to manage companies'
      })
    }

    await connectDB()
    const body = await readBody(event)

    // Validate required fields
    const { name, email, password, contactPerson, companyDetails, status } = body

    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name, email, and password are required'
      })
    }

    // Check if company already exists
    const existingCompany = await Company.findOne({ 
      email: email.toLowerCase().trim() 
    })
    
    if (existingCompany) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Company with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password.trim(), 12)

    // Create company data
    const companyData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      contactPerson: {
        name: contactPerson?.name || '',
        position: contactPerson?.position || 'Manager',
        email: contactPerson?.email || '',
        phone: contactPerson?.phone || ''
      },
      companyDetails: {
        industry: companyDetails?.industry || 'other',
        size: companyDetails?.size || '1-10',
        website: companyDetails?.website || '',
        description: companyDetails?.description || '',
        address: companyDetails?.address || {}
      },
      status: status || 'pending',
      subscription: {
        plan: 'free',
        isActive: false,
        jobPostsLimit: 5,
        jobPostsUsed: 0
      },
      approvedBy: admin.email,
      approvedAt: status === 'approved' ? new Date() : null
    }

    // Create new company
    const company = new Company(companyData)
    await company.save()

    return {
      success: true,
      message: 'Company created successfully',
      data: {
        id: company._id,
        name: company.name,
        email: company.email,
        status: company.status,
        contactPerson: company.contactPerson,
        companyDetails: company.companyDetails,
        subscription: company.subscription,
        createdAt: company.createdAt
      }
    }

  } catch (error) {
    console.error('Create company error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create company'
    })
  }
})})