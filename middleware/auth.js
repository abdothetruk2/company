export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip middleware on server-side rendering
  if (process.server) return
  
  const token = useCookie('jwt')
  
  // If no token, redirect to login
  if (!token.value) {
    return navigateTo('/auth/login')
  }
  
  // Verify token is valid by making a quick API call
  try {
    await $fetch('/api/auth/verify', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  } catch (error) {
    // Token is invalid, clear it and redirect to login
    token.value = null
    return navigateTo('/auth/login')
  }
})