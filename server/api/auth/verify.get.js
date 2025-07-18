import { requireAuth } from '../utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    const user = await requireAuth(event)
    
    return {
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token'
    })
  }
})
