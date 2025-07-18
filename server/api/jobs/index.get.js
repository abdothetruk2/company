import Job from '../../models/Job.js'
import { connectDB } from '../../utils/db.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const query = getQuery(event)
    const { 
      search, 
      location, 
      type, 
      experience, 
      page = 1, 
      limit = 9 
    } = query
    
    // Build filter object
    const filter = { isActive: true }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    if (location && location !== 'All Locations') {
      filter.location = { $regex: location, $options: 'i' }
    }
    
    if (type && type !== 'All Types') {
      filter.type = type
    }
    
    if (experience && experience !== 'All Levels') {
      filter.experience = experience
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    // Get jobs with pagination
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('companyId', 'name')
    
    // Get total count for pagination
    const totalJobs = await Job.countDocuments(filter)
    const totalPages = Math.ceil(totalJobs / parseInt(limit))
    
    // Format jobs data
    const formattedJobs = jobs.map(job => ({
      id: job._id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      skills: job.skills,
      posted: formatTimeAgo(job.createdAt),
      applicationsCount: job.applicationsCount
    }))
    
    return {
      success: true,
      jobs: formattedJobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalJobs,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    }

  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch jobs'
    })
  }
})

function formatTimeAgo(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) {
    return 'Just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months} month${months > 1 ? 's' : ''} ago`
  }
}