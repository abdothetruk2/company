import jwt from 'jsonwebtoken'
import { connectDB } from '../../../utils/db.js'
import Admin from '../../../models/Admin.js'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authorization token required'
      })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Handle fallback admin
    if (decoded.adminId === 'fallback-admin') {
      return {
        success: true,
        admin: {
          id: 'fallback-admin',
          email: 'admin@progrowth.com',
          name: 'System Administrator',
          role: 'super_admin',
          permissions: ['all']
        }
      }
    }

    // Verify admin exists in database
    await connectDB()
    const admin = await Admin.findById(decoded.adminId)
    
    if (!admin || !admin.isActive) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Admin account not found or inactive'
      })
    }

    return {
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions
      }
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 401,
      statusMessage: error.statusMessage || 'Invalid token'
    })
  }
})