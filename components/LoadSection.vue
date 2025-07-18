<template>
  <div class="lazy-load-section">
    <div v-for="(item, index) in items" :key="index" 
         v-scroll-animate="item.animationType"
         :class="['card', item.class]"
         :style="{ transitionDelay: `${index * 0.1}s` }">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useLazyLoad } from '~/composables/useLazyLoad'

// Sample data
const items = ref([
  {
    title: 'Feature 1',
    description: 'Description for feature 1',
    animationType: 'fade',
    class: 'feature-card'
  },
  {
    title: 'Feature 2',
    description: 'Description for feature 2',
    animationType: 'slide-left',
    class: 'feature-card'
  },
  {
    title: 'Feature 3',
    description: 'Description for feature 3',
    animationType: 'slide-right',
    class: 'feature-card'
  },
  {
    title: 'Feature 4',
    description: 'Description for feature 4',
    animationType: 'scale',
    class: 'feature-card'
  }
])

// Initialize lazy loading
const { checkElements } = useLazyLoad()

// Check for new elements after component is mounted
onMounted(() => {
  // Allow time for DOM to update
  setTimeout(() => {
    checkElements()
  }, 100)
})
</script>

<style scoped>
.lazy-load-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 40px 0;
}

.card {
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.feature-card {
  border-left: 4px solid #4f46e5;
}
</style>