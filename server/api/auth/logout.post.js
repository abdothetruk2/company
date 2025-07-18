export default defineEventHandler(async (event) => {
  try {
    // Clear the JWT cookie
    setCookie(event, 'jwt', '', {
      maxAge: 0,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    
    return {
      success: true,
      message: 'Logged out successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Logout failed'
    })
  }
})