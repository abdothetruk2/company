import jwt from 'jsonwebtoken'
import { connectDB } from '../../../../utils/db.js'
import Company from '../../../../models/Company.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    // Get authorization header
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authorization token required'
      })
    }
    
    // Verify JWT token
    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Admin access required'
      })
    }
    
    // Get company ID from route params
    const companyId = getRouterParam(event, 'id')
    
    // Find and update company
    const company = await Company.findById(companyId)
    if (!company) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Company not found'
      })
    }
    
    company.status = 'approved'
    company.approvedBy = decoded.email || decoded.userId
    company.approvedAt = new Date()
    await company.save()
    
    return {
      success: true,
      message: 'Company approved successfully',
      company: {
        id: company._id,
        name: company.name,
        status: company.status,
        approvedAt: company.approvedAt
      }
    }
    
  } catch (error) {
    console.error('Company approval error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Company approval failed'
    })
  }
})