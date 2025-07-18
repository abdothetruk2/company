import jwt from 'jsonwebtoken'
import { connectDB } from '../../utils/db.js'
import Company from '../../models/Company.js'

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
    
    // Get company
    const company = await Company.findById(decoded.companyId)
    if (!company) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Company not found'
      })
    }
    
    const body = await readBody(event)
    const { name, industry, website, description } = body
    
    // Update company profile
    if (name) company.name = name
    if (industry) company.companyDetails.industry = industry
    if (website) company.companyDetails.website = website
    if (description) company.companyDetails.description = description
    
    await company.save()
    
    return {
      success: true,
      company: {
        id: company._id,
        name: company.name,
        email: company.email,
        companyDetails: company.companyDetails
      }
    }
    
  } catch (error) {
    console.error('Profile update error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Profile update failed'
    })
  }
})