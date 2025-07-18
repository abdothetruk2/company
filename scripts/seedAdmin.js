import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../server/models/Admin.js'
import { config } from 'dotenv'

// Load environment variables
config()

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal')
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@jobportal.com' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123456', 12)

    // Create admin user
    const admin = new Admin({
      name: 'System Administrator',
      email: 'admin@jobportal.com',
      password: hashedPassword,
      role: 'super_admin',
      isActive: true,
      permissions: [
        'manage_companies',
        'manage_users', 
        'manage_jobs',
        'view_analytics',
        'system_settings'
      ]
    })

    await admin.save()
    console.log('Admin user created successfully!')
    console.log('Email: admin@jobportal.com')
    console.log('Password: admin123456')
    console.log('Please change the password after first login')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding admin:', error)
    process.exit(1)
  }
}

seedAdmin()