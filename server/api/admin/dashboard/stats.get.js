import { verifyAdminToken } from '../../../utils/adminAuth.js'
import { connectDB } from '../../../utils/db.js'
import Company from '../../../models/Company.js'

export default defineEventHandler(async (event) => {
  try {
    // Verify admin authentication
    const admin = await verifyAdminToken(event)

    await connectDB()

    // Get company statistics
    const totalCompanies = await Company.countDocuments()
    const approvedCompanies = await Company.countDocuments({ status: 'approved' })
    const pendingCompanies = await Company.countDocuments({ status: 'pending' })
    
    // Get recent companies (last 5)
    const recentCompanies = await Company.find()
      .select('name email status createdAt')
      .sort({ createdAt: -1 })
      .limit(5)

    // Mock user count (you can implement actual user model later)
    const totalUsers = 0

    return {
      success: true,
      stats: {
        totalCompanies,
        approvedCompanies,
        pendingCompanies,
        totalUsers
      },
      recentCompanies
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch dashboard stats'
    })
  }
})