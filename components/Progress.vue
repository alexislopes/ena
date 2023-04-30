<script lang="ts" setup>
defineProps({
  progress: Number
})
</script>

<template>
<div class="progress__container">
  <div class="progress__indicator h-full bg-[#42b4d8]" :style="{ width: progress + '%' }"></div>
</div>
</template>

<style scoped>
.progress__container {
  @apply w-full h-2 rounded-full
}

.progress__indicator {
  @apply rounded-full h-full transition-[width] duration-1000
}
</style>
