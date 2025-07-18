export default defineNuxtPlugin(async () => {
  const adminStore = useAdminStore()
  
  // Initialize auth state from cookie on app startup
  await adminStore.initializeAuth()
  
  // Add navigation guard for admin routes
  addRouteMiddleware('admin-auth', async (to) => {
    if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
      await adminStore.initializeAuth()
      
      if (!adminStore.isAuthenticated) {
        return navigateTo('/admin/login')
      }
    }
  }, { global: true })
})