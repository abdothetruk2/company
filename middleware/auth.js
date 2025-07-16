export default defineNuxtRouteMiddleware((to, from) => {
  // Check if running on client side
  if (process.client) {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('user')
    
    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard', '/subscription', '/results']
    const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
    
    if (isProtectedRoute && !token) {
      return navigateTo('/auth/signin')
    }
    
    // Redirect authenticated users away from auth pages
    if (token && (to.path.startsWith('/auth/') || to.path === '/register/individual')) {
      const userData = user ? JSON.parse(user) : null
      if (userData?.type === 'business') {
        return navigateTo('/business/dashboard')
      } else {
        return navigateTo('/dashboard/assessments')
      }
    }
  }
})