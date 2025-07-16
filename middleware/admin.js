export default defineNuxtRouteMiddleware((to, from) => {
  // Check if running on client side
  if (process.client) {
    const isAuthenticated = localStorage.getItem('adminAuth')
    
    if (!isAuthenticated && to.path.startsWith('/admin') && to.path !== '/admin/login') {
      return navigateTo('/admin/login')
    }
    
    if (isAuthenticated && to.path === '/admin/login') {
      return navigateTo('/admin/dashboard')
    }
  }
})