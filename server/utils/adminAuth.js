import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import { connectDB } from './db.js'

export const verifyAdminToken = async (event) => {
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

    // Check if it's an admin token
    if (!decoded.isAdmin && decoded.type !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Admin access required'
      })
    }

    // Handle fallback admin
    if (decoded.adminId === 'fallback-admin') {
      return {
        id: 'fallback-admin',
        email: 'admin@progrowth.com',
        role: 'super_admin',
        permissions: ['all']
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
      id: admin._id,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions
    }

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }
    if (error.name === 'TokenExpiredError') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token expired'
      })
    }
    throw error
  }
}

export const generateAdminToken = (admin) => {
  return jwt.sign(
    {
      adminId: admin._id,
      email: admin.email,
      type: 'admin',
      role: admin.role,
      isAdmin: true
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
}