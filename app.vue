<template>
  <div class="min-h-screen bg-gray-50">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Ensure proper SSR handling
const { $router } = useNuxtApp()

// Page meta with better error handling
useHead({
  title: 'ProGrowth - Discover Your Career Fit or Hire Smarter',
  meta: [
    { name: 'description', content: 'Career development platform with assessments and smart hiring solutions' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})

// Handle client-side hydration
onMounted(() => {
  // Any client-side initialization
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}

html {
  scroll-behavior: smooth;
}

/* Prevent layout shift during hydration */
#__nuxt {
  min-height: 100vh;
}
</style>