import Company from '../../../models/Company.js'
import { connectDB } from '../../../utils/db.js'
import { verifyAdminToken } from '../../../utils/adminAuth.js'

export default defineEventHandler(async (event) => {
  try {
    // Verify admin authentication
    const admin = await verifyAdminToken(event)

    await connectDB()
    
    const query = getQuery(event)
    const { 
      page = 1, 
      limit = 10, 
      status, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = query

    // Build filter
    const filter = {}
    
    if (status && status !== 'all') {
      filter.status = status
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { 'contactPerson.name': { $regex: search, $options: 'i' } }
      ]
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1

    // Get companies
    const companies = await Company.find(filter)
      .select('-password')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))

    // Get total count
    const totalCompanies = await Company.countDocuments(filter)
    const totalPages = Math.ceil(totalCompanies / parseInt(limit))

    return {
      success: true,
      data: {
        companies,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCompanies,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        }
      }
    }

  } catch (error) {
    console.error('Error fetching companies:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch companies'
    })
  }
})