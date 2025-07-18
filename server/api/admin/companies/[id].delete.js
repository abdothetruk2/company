import jwt from 'jsonwebtoken'
import { connectDB } from '~/server/utils/db'
import Company from '~/server/models/Company'

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
    
    // Find and delete company
    const company = await Company.findById(companyId)
    if (!company) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Company not found'
      })
    }
    
    await Company.findByIdAndDelete(companyId)
    
    return {
      success: true,
      message: 'Company deleted successfully',
      deletedCompany: {
        id: company._id,
        name: company.name,
        email: company.email
      }
    }
    
  } catch (error) {
    console.error('Company deletion error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Company deletion failed'
    })
  }
})