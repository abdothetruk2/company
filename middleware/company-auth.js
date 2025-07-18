export default defineNuxtRouteMiddleware((to, from) => {
  // Check if running on client side
  if (process.client) {
    const token = useCookie('company_jwt')
    
    if (!token.value && to.path.startsWith('/company') && to.path !== '/company/login' && to.path !== '/company/register') {
      return navigateTo('/company/login')
    }
    
    if (token.value && (to.path === '/company/login' || to.path === '/company/register')) {
      return navigateTo('/company/dashboard')
    }
  }
})