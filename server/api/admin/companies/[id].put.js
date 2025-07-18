import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Company from '~/server/models/Company'
import { connectDB } from '~/server/utils/db'

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

    // Check if user is admin
    if (decoded.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Admin access required'
      })
    }

    // Get company ID from route params
    const companyId = getRouterParam(event, 'id')
    const body = await readBody(event)

    // Find company
    const company = await Company.findById(companyId)
    if (!company) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Company not found'
      })
    }

    // Check if email is being changed and if it already exists
    if (body.email && body.email !== company.email) {
      const existingCompany = await Company.findOne({ 
        email: body.email.toLowerCase().trim(),
        _id: { $ne: companyId }
      })
      
      if (existingCompany) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Company with this email already exists'
        })
      }
    }

    // Prepare update data
    const updateData = {}
    
    if (body.name) updateData.name = body.name.trim()
    if (body.email) updateData.email = body.email.toLowerCase().trim()
    if (body.status) updateData.status = body.status
    
    // Hash new password if provided
    if (body.password && body.password.trim()) {
      updateData.password = await bcrypt.hash(body.password.trim(), 12)
    }
    
    // Update contact person
    if (body.contactPerson) {
      updateData.contactPerson = {
        ...company.contactPerson,
        ...body.contactPerson
      }
    }
    
    // Update company details
    if (body.companyDetails) {
      updateData.companyDetails = {
        ...company.companyDetails,
        ...body.companyDetails
      }
    }
    
    // Update subscription if provided
    if (body.subscription) {
      updateData.subscription = {
        ...company.subscription,
        ...body.subscription
      }
    }
    
    // Track status changes
    if (body.status && body.status !== company.status) {
      if (body.status === 'approved') {
        updateData.approvedBy = decoded.email || decoded.userId
        updateData.approvedAt = new Date()
      } else if (body.status === 'rejected') {
        updateData.rejectedBy = decoded.email || decoded.userId
        updateData.rejectedAt = new Date()
        if (body.rejectionReason) {
          updateData.rejectionReason = body.rejectionReason
        }
      }
    }
    
    updateData.updatedAt = new Date()
    
    // Update company
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password')
    
    return {
      success: true,
      message: 'Company updated successfully',
      data: updatedCompany
    }
    
  } catch (error) {
    console.error('Company update error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Company update failed'
    })
  }
})