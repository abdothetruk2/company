<template>
  <div class="app-layout">
    <slot />
  </div>
</template>

<script setup>
// This layout will automatically use the page transitions defined in nuxt.config.ts
</script>

<style>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>                                                                                                                                                                            