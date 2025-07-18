import jwt from 'jsonwebtoken'
import { getHeader } from 'h3' // Add this import

export const requireAdminAuth = async (event) => {
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Admin access token required'
    })
  }
  
  const token = authHeader.substring(7)
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if (decoded.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Admin access required'
      })
    }
    
    event.context.admin = decoded
    return decoded
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired admin token'
    })
  }
}