import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from '../../utils/db.js'
import User from '../../models/User.js'
import formidable from 'formidable'
import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Ensure upload directory exists with proper permissions
    const uploadDir = './public/uploads/id-cards'
    try {
      await fs.access(uploadDir)
    } catch {
      await fs.mkdir(uploadDir, { recursive: true })
    }

    // Parse form data with file upload
    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) reject(err)
        else resolve([fields, files])
      })
    })

    // Extract form data
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email
    const password = Array.isArray(fields.password) ? fields.password[0] : fields.password
    const gender = Array.isArray(fields.gender) ? fields.gender[0] : fields.gender
    const age = Array.isArray(fields.age) ? fields.age[0] : fields.age
    const university = Array.isArray(fields.university) ? fields.university[0] : fields.university || ''

    // Validation
    if (!name || !email || !password || !gender || !age) {
      throw createError({
        statusCode: 400,
        statusMessage: 'All required fields must be provided'
      })
    }

    if (password.length < 6) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 6 characters long'
      })
    }

    if (!files.idCard) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID card is required'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Get the file information
    const idCardFile = Array.isArray(files.idCard) ? files.idCard[0] : files.idCard;
    
    // Store relative path for database
    const idCardRelativePath = `/uploads/id-cards/${path.basename(idCardFile.filepath)}`;

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      age,
      university,
      idCardPath: idCardRelativePath
    })

    await user.save()

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      throw createError({
        statusCode: 500,
        statusMessage: 'Server configuration error'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return {
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }

  } catch (error) {
    console.error('Registration error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Registration failed'
    })
  }
})