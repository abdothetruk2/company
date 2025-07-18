export const useAuth = () => {
  // Avoid using other composables that might import this one
  const nuxtApp = useNuxtApp()

  const isAuthenticated = ref(false)
  const user = ref(null)
  const token = ref(null)

  // Check authentication status
  const checkAuth = async () => {
    if (process.client) {
      const storedToken = localStorage.getItem('authToken')
      
      if (storedToken) {
        try {
          // Verify token with server
          const response = await $fetch('/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          
          if (response.success) {
            token.value = storedToken
            user.value = response.user
            isAuthenticated.value = true
            localStorage.setItem('userData', JSON.stringify(response.user))
          } else {
            // Token is invalid, clear storage
            logout()
          }
        } catch (error) {
          // Token is invalid or expired, clear storage
          logout()
        }
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

      if (response.success && response.token) {
        token.value = response.token
        user.value = response.user
        isAuthenticated.value = true

        // Store in localStorage
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('userData', JSON.stringify(response.user))

        return { success: true, data: response }
      }
    } catch (error) {
      return { success: false, error: error.data?.message || 'Login failed' }
    }
  }

  // Register function
  const register = async (formData) => {
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: formData
      })

      if (response.success && response.token) {
        token.value = response.token
        user.value = response.user
        isAuthenticated.value = true

        // Store in localStorage
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('userData', JSON.stringify(response.user))

        return { success: true, data: response }
      }
    } catch (error) {
      return { success: false, error: error.data?.message || 'Registration failed' }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })
      
      // Clear the token cookie
      const token = useCookie('jwt')
      token.value = null
      
      // Clear localStorage
      if (process.client) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('rememberMe')
      }

      // Redirect to login
      await navigateTo('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Get auth headers for API requests
  const getAuthHeaders = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  // Refresh user data
  const refreshUser = async () => {
    if (token.value) {
      try {
        const response = await $fetch('/api/auth/profile', {
          headers: getAuthHeaders()
        })
        
        if (response.success) {
          user.value = response.user
          localStorage.setItem('userData', JSON.stringify(response.user))
        }
      } catch (error) {
        console.error('Failed to refresh user data:', error)
      }
    }
  }

  // Initialize auth state
  onMounted(() => {
    checkAuth()
  })

  return {
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    token: readonly(token),
    login,
    register,
    logout,
    checkAuth,
    refreshUser,
    getAuthHeaders
  }
}