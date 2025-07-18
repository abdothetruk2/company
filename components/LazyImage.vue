<template>
  <div class="lazy-image-container" ref="container">
    <img 
      v-if="loaded" 
      :src="src" 
      :alt="alt" 
      class="lazy-image" 
      :class="{ 'visible': loaded }"
      @load="onImageLoaded"
    />
    <div v-else class="lazy-image-placeholder">
      <div class="loading-dots">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLazyLoad } from '~/composables/useLazyLoad'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})

const loaded = ref(false)
const container = ref(null)
const { observe } = useLazyLoad()

const loadImage = () => {
  const img = new Image()
  img.src = props.src
  img.onload = () => {
    loaded.value = true
  }
}

const onImageLoaded = () => {
  // Add any additional logic after image is loaded
}

onMounted(() => {
  if (container.value) {
    observe(container.value, loadImage)
  }
})
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background-color: #f3f4f6;
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.lazy-image.visible {
  opacity: 1;
}

.lazy-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>