<script lang="ts" setup>

</script>

<template>
<div class="h-screen">
  <Nav />
  <div class="flex h-[calc(100vh_-_76px)]">

    <Menu />
    <slot />
  </div>
</div>
</template>

<style scoped></style>

<style>
@import url('https://fonts.cdnfonts.com/css/youtube-sans');

.card__title {
  @apply text-white text-lg mb-5 font-medium
}
</style>
