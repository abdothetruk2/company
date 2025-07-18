export default defineNuxtPlugin(async () => {
  const adminStore = useAdminStore()
  
  // Initialize admin authentication on app startup
  await adminStore.initializeAuth()
})