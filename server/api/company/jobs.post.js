import jwt from 'jsonwebtoken'
import { connectDB } from '../../utils/db.js'
import Job from '../../models/Job.js'
import Company from '../../models/Company.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    // Get authorization header
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authorization token required'
      })
    }
    
    // Verify JWT token
    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Get company
    const company = await Company.findById(decoded.companyId)
    if (!company) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Company not found'
      })
    }
    
    if (company.status !== 'approved') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Company not approved'
      })
    }
    
    const body = await readBody(event)
    const { title, department, location, description, requirements, responsibilities, benefits, skills, employmentType, experienceLevel, salary } = body
    
    // Validation
    if (!title || !department || !location || !description) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title, department, location, and description are required'
      })
    }
    
    // Create job
    const job = new Job({
      title,
      description,
      department,
      location,
      employmentType: employmentType || 'full-time',
      experienceLevel: experienceLevel || 'mid',
      salary: salary || {},
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      benefits: benefits || [],
      skills: skills || [],
      company: company._id
    })
    
    await job.save()
    
    // Add job to company's jobs array
    company.jobs.push(job._id)
    await company.save()
    
    return {
      success: true,
      job: {
        id: job._id,
        title: job.title,
        department: job.department,
        location: job.location,
        status: job.status,
        createdAt: job.createdAt
      }
    }
    
  } catch (error) {
    console.error('Job creation error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Job creation failed'
    })
  }
})