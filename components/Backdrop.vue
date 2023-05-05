<script lang="ts" setup></script>

<template>
  <div class="backdrop">
   <slot />
  </div>
</template>

<style scoped>
.backdrop {
  @apply backdrop-blur-md top-0 absolute h-full w-full
}
</style>
