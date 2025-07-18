import bcrypt from 'bcryptjs'
import { connectDB } from '../../utils/db.js'
import Admin from '../../models/Admin.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@progrowth.com' })
    
    if (existingAdmin) {
      return {
        success: false,
        message: 'Admin already exists'
      }
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = new Admin({
      name: 'System Administrator',
      email: 'admin@progrowth.com',
      password: hashedPassword,
      role: 'super_admin',
      permissions: ['all'],
      isActive: true,
      createdAt: new Date()
    })

    await admin.save()

    return {
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    }

  } catch (error) {
    console.error('Admin setup error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create admin'
    })
  }
})