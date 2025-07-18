import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from '../../../utils/db.js'
import Admin from '../../../models/Admin.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const { email, password } = await readBody(event)

    // Validate input
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }

    console.log('Login attempt for:', email)
    console.log('Password provided:', password)

    // Simple hardcoded admin credentials (no hashing)
    const ADMIN_CREDENTIALS = {
      email: 'admin',
      password: 'admin'
    }

    // Check if credentials match
    if (email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() && 
        password === ADMIN_CREDENTIALS.password) {
      
      console.log('Admin credentials matched')

      // Generate JWT token
      const token = jwt.sign(
        {
          adminId: 'admin',
          email: ADMIN_CREDENTIALS.email,
          type: 'admin',
          role: 'super_admin',
          isAdmin: true
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )

      return {
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: 'admin',
          email: ADMIN_CREDENTIALS.email,
          name: 'System Administrator',
          role: 'super_admin',
          permissions: ['all']
        }
      }
    }

    // If hardcoded admin doesn't match, try database admin
    const admin = await Admin.findOne({ 
      email: email.toLowerCase().trim(),
      isActive: true 
    })

    if (admin) {
      console.log('Found admin in database:', admin.email)
      
      // Simple password comparison (no bcrypt)
      if (admin.password !== password) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid credentials'
        })
      }

      // Update last login
      admin.lastLogin = new Date()
      await admin.save()

      // Generate JWT token
      const token = jwt.sign(
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

      return {
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          permissions: admin.permissions,
          lastLogin: admin.lastLogin
        }
      }
    }

    // No admin found
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })

  } catch (error) {
    console.error('Admin login error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Login failed'
    })
  }
})