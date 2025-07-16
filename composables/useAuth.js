export const useAuth = () => {
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)

  // Initialize auth state
  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('authToken')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken && storedUser) {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
      }
    }
  }

  // Login function
  const login = async (credentials) => {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })

      if (response.success) {
        token.value = response.token
        user.value = response.user
        isAuthenticated.value = true
        
        // Store in localStorage
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        
        return response
      }
    } catch (error) {
      throw error
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: userData
      })

      if (response.success && response.token) {
        token.value = response.token
        user.value = response.user
        isAuthenticated.value = true
        
        // Store in localStorage
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      
      return response
    } catch (error) {
      throw error
    }
  }

  // Logout function
  const logout = () => {
    token.value = null
    user.value = null
    isAuthenticated.value = false
    
    // Clear localStorage
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    
    // Redirect to home
    navigateTo('/')
  }

  // Get auth headers for API calls
  const getAuthHeaders = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated: readonly(isAuthenticated),
    initAuth,
    login,
    register,
    logout,
    getAuthHeaders
  }
}