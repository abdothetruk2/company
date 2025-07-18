import jwt from 'jsonwebtoken'
import Admin from '../../../models/Admin.js'
import { connectDB } from '../../../utils/db.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No token provided'
      })
    }

    const token = authHeader.substring(7)
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // Handle simple admin
      if (decoded.adminId === 'admin') {
        return {
          success: true,
          admin: {
            id: 'admin',
            email: 'admin',
            name: 'System Administrator',
            role: 'super_admin',
            permissions: ['all']
          }
        }
      }

      // Handle database admin
      const admin = await Admin.findById(decoded.adminId).select('-password')
      
      if (!admin || !admin.isActive) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid token'
        })
      }

      return {
        success: true,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          permissions: admin.permissions,
          lastLogin: admin.lastLogin
        }
      }
    } catch (jwtError) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Token verification failed'
    })
  }
})