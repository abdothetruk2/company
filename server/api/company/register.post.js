import fs from 'fs'
import bcrypt from 'bcryptjs'
import { connectDB } from '../../utils/db.js'
import path from 'path'
import Company from '../../models/Company.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    // Handle multipart form data
    const form = await readMultipartFormData(event)
    
    if (!form) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No form data received'
      })
    }
    
    // Parse form data
    const formData = {}
    const files = {}
    
    form.forEach(item => {
      if (item.filename) {
        // It's a file
        files[item.name] = {
          filename: item.filename,
          data: item.data,
          type: item.type
        }
      } else {
        // It's a regular field
        formData[item.name] = item.data.toString()
      }
    })
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'password', 'industry', 'size', 'contactName', 'contactPosition', 'contactPhone']
    for (const field of requiredFields) {
      if (!formData[field]) {
        throw createError({
          statusCode: 400,
          statusMessage: `${field} is required`
        })
      }
    }
    
    // Check if business license is uploaded
    if (!files.businessLicense) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Business license is required'
      })
    }
    
    // Check if company already exists
    const existingCompany = await Company.findOne({ email: formData.email })
    if (existingCompany) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Company with this email already exists'
      })
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password, 12)
    
    // Save uploaded files
    const uploadPath = 'public/uploads/companies'
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    
    const savedFiles = {}
    for (const [fieldName, file] of Object.entries(files)) {
      const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.filename}`
      const filepath = path.join(uploadPath, filename)
      
      fs.writeFileSync(filepath, file.data)
      savedFiles[fieldName] = `/uploads/companies/${filename}`
    }
    
    // Create company
    const company = new Company({
      name: formData.name,
      email: formData.email.toLowerCase(),
      password: hashedPassword,
      contactPerson: {
        name: formData.contactName,
        position: formData.contactPosition,
        phone: formData.contactPhone
      },
      companyDetails: {
        industry: formData.industry,
        size: formData.size,
        website: formData.website || '',
        description: formData.description || '',
        address: {
          street: formData.street || '',
          city: formData.city || '',
          state: formData.state || '',
          country: formData.country || '',
          zipCode: formData.zipCode || ''
        }
      },
      documents: {
        businessLicense: savedFiles.businessLicense,
        taxCertificate: savedFiles.taxCertificate || '',
        companyProfile: savedFiles.companyProfile || ''
      },
      status: 'pending'
    })
    
    await company.save()
    
    return {
      success: true,
      message: 'Company registration submitted successfully. Your application is under review and you will be notified once approved.',
      companyId: company._id
    }
    
  } catch (error) {
    console.error('Company registration error:', error)
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      throw createError({
        statusCode: 400,
        statusMessage: messages.join(', ')
      })
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Company registration failed'
    })
  }
})