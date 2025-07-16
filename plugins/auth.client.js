export default defineNuxtPlugin(() => {
  const { initAuth } = useAuth()
  
  // Initialize auth state when the app starts
  initAuth()
})