import jwt from 'jsonwebtoken'
import { connectDB } from '../../../utils/db.js'
import Company from '../../../models/Company.js'

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
    
    // Get company statistics
    const [
      totalCompanies,
      pendingCompanies,
      approvedCompanies,
      rejectedCompanies,
      suspendedCompanies,
      recentCompanies,
      companiesByIndustry,
      companiesBySize
    ] = await Promise.all([
      Company.countDocuments(),
      Company.countDocuments({ status: 'pending' }),
      Company.countDocuments({ status: 'approved' }),
      Company.countDocuments({ status: 'rejected' }),
      Company.countDocuments({ status: 'suspended' }),
      Company.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email status createdAt'),
      Company.aggregate([
        {
          $group: {
            _id: '$companyDetails.industry',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]),
      Company.aggregate([
        {
          $group: {
            _id: '$companyDetails.size',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ])
    ])
    
    return {
      success: true,
      data: {
        overview: {
          total: totalCompanies,
          pending: pendingCompanies,
          approved: approvedCompanies,
          rejected: rejectedCompanies,
          suspended: suspendedCompanies
        },
        recentCompanies,
        analytics: {
          byIndustry: companiesByIndustry,
          bySize: companiesBySize
        }
      }
    }
    
  } catch (error) {
    console.error('Company stats error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch company statistics'
    })
  }
})