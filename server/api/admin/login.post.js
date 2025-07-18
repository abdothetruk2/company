import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Admin credentials (in production, store these securely)
const ADMIN_CREDENTIALS = {
  email: 'admin@progrowth.com',
  password: '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // hashed version of 'admin'
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body
    
    // Validation
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }
    
    // Check admin email (case insensitive)
    if (email.toLowerCase() !== ADMIN_CREDENTIALS.email.toLowerCase()) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid admin credentials'
      })
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, ADMIN_CREDENTIALS.password)
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid admin credentials'
      })
    }
    
    // Generate JWT token
    const token = jwt.sign(
      {
        adminId: 'admin',
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
        type: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    return {
      success: true,
      token,
      admin: {
        id: 'admin',
        email: ADMIN_CREDENTIALS.email,
        name: 'Administrator',
        role: 'admin'
      }
    }
    
  } catch (error) {
    console.error('Admin login error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Admin login failed'
    })
  }
})