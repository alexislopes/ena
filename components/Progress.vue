<script lang="ts" setup>
defineProps({
  progress: Number
})
</script>

<template>
<div class="progress__container">
  <div class="progress__indicator h-full bg-[#42b4d8] text-xs" :style="{ width: progress + '%' }">
    <div class="tooltip">{{ progress?.toFixed(2) }}%</div>
  </div>
</div>
</template>

<style scoped>
.progress__container {
  @apply w-full h-2 rounded-full bg-[#3e3e3e]
}

.progress__indicator {
  @apply rounded-full h-full transition-[width] duration-1000 relative
}

.tooltip {
  @apply absolute right-0 -translate-y-full translate-x-1/2 p-2 opacity-0
}
.progress__indicator:hover .tooltip {
  @apply opacity-100
}
</style>
