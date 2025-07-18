import jwt from 'jsonwebtoken'
import { connectDB } from '~/server/api/utils/db.js'
import User from '~/server/api/models/User.js'

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await connectDB()
    
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      throw new Error('User not found')
    }
    
    return { user, decoded }
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export const requireAuth = async (event) => {
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Access token required'
    })
  }
  
  const token = authHeader.substring(7)
  
  try {
    const { user, decoded } = await verifyToken(token)
    event.context.user = user
    event.context.userId = decoded.userId
    return user
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token'
    })
  }
}