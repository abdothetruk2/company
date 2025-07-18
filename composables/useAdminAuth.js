import { useAdminStore } from '~/stores/admin'

export const useAdminAuth = () => {
  const adminStore = useAdminStore()

  const requireAuth = async () => {
    // Ensure auth is initialized
    await adminStore.initializeAuth()
    
    if (!adminStore.isAuthenticated) {
      await navigateTo('/admin/login')
      return false
    }
    
    return true
  }

  const checkAuth = () => {
    return adminStore.isAuthenticated
  }

  const getAdmin = () => {
    return adminStore.admin
  }

  const getToken = () => {
    return adminStore.token
  }

  const logout = async () => {
    try {
      await adminStore.logout()
      await navigateTo('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Force navigation even if logout fails
      await navigateTo('/admin/login')
    }
  }

  return {
    requireAuth,
    checkAuth,
    getAdmin,
    getToken,
    logout
  }
}