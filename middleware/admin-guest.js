export default defineNuxtRouteMiddleware((to, from) => {
  const adminStore = useAdminStore()
  
  // If already authenticated, redirect to dashboard
  if (adminStore.isAuthenticated) {
    return navigateTo('/admin/dashboard')
  }
})