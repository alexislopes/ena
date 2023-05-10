<script lang="ts" setup></script>

<template>
<div class="box">
  <slot />
</div>
</template>

<style scoped>
.box {
  @apply bg-surface border-2 border-detail rounded-md
}
</style>
