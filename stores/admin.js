import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admin: null,
    token: null,
    isAuthenticated: false,
    loading: false
  }),

  getters: {
    getAdmin: (state) => state.admin,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    async login(credentials) {
      this.loading = true
      
      try {
        console.log('Attempting login with:', credentials)
        
        // Remove the destructuring of { data } - just get the response directly
        const response = await $fetch('/api/admin/auth/login', {
          method: 'POST',
          body: credentials
        })

        console.log('Login response:', response)

        if (response && response.success) {
          this.token = response.token
          this.admin = response.admin
          this.isAuthenticated = true

          // Store token in cookie
          const tokenCookie = useCookie('admin-token', {
            default: () => null,
            maxAge: 60 * 60 * 24 // 24 hours
          })
          tokenCookie.value = response.token

          // Store admin data in cookie
          const adminCookie = useCookie('admin-data', {
            default: () => null,
            maxAge: 60 * 60 * 24
          })
          adminCookie.value = JSON.stringify(response.admin)

          return response
        } else {
          throw new Error(response?.message || 'Login failed')
        }
      } catch (error) {
        console.error('Login error in store:', error)
        this.logout()
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.admin = null
      this.token = null
      this.isAuthenticated = false

      // Clear cookies
      const tokenCookie = useCookie('admin-token')
      const adminCookie = useCookie('admin-data')
      tokenCookie.value = null
      adminCookie.value = null

      await navigateTo('/admin/login')
    },

    async checkAuth() {
      const tokenCookie = useCookie('admin-token')
      const adminCookie = useCookie('admin-data')
      
      if (tokenCookie.value && adminCookie.value) {
        try {
          // Verify token with server
          const response = await $fetch('/api/admin/auth/verify', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          })

          if (response && response.success) {
            this.token = tokenCookie.value
            this.admin = JSON.parse(adminCookie.value)
            this.isAuthenticated = true
            return true
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          this.logout()
        }
      }
      
      return false
    },

    async createCompany(companyData) {
      try {
        const { data } = await $fetch('/api/admin/companies', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          body: companyData
        })

        return data
      } catch (error) {
        console.error('Create company error:', error)
        throw error
      }
    },

    async getCompanies(params = {}) {
      try {
        const response = await $fetch('/api/admin/companies', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          query: params
        })
        return response
      } catch (error) {
        throw error
      }
    },

    async updateCompany(companyId, updateData) {
      try {
        const response = await $fetch(`/api/admin/companies/${companyId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          body: updateData
        })

        console.error('Update company error:', response) // Debug log
        return response
      } catch (error) {
        console.error('Update company error:', error)
        throw error
      }
    },

    async deleteCompany(companyId) {
      try {
        const response = await $fetch(`/api/admin/companies/${companyId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })

        console.error('Delete company error:', response) // Debug log
        return response
      } catch (error) {
        console.error('Delete company error:', error)
        throw error
      }
    },

    async initializeAuth() {
      if (this.isInitialized) return

      try {
        const tokenCookie = useCookie('admin-token')
        const adminCookie = useCookie('admin-data')

        if (tokenCookie.value && adminCookie.value) {
          this.token = tokenCookie.value
          this.admin = JSON.parse(adminCookie.value)
          this.isAuthenticated = true
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        await this.logout()
      } finally {
        this.isInitialized = true
      }
    }
  }
})