export default defineNuxtRouteMiddleware(async (to, from) => {
  // Check if we're on client side
  if (process.client) {
    // Import the admin store
    const { useAdminStore } = await import('~/stores/admin')
    const adminStore = useAdminStore()
    
    // Initialize auth if not already done
    if (!adminStore.isInitialized) {
      await adminStore.initializeAuth()
    }
    
    // Check if authenticated
    if (!adminStore.isAuthenticated) {
      return navigateTo('/admin/login')
    }
  } else {
    // Server-side check using cookie
    const tokenCookie = useCookie('admin-token')
    
    if (!tokenCookie.value) {
      return navigateTo('/admin/login')
    }
    
    // You could add server-side token verification here if needed
  }
})