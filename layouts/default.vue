<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })
</script>

<template>
<div class="h-screen">
  <Nav />
  <div class="flex h-[calc(100vh_-_71.25px)]">

    <Menu />
    <slot />
  </div>
</div>
</template>

<style scoped></style>

<style>
@import url('https://fonts.cdnfonts.com/css/youtube-sans');
</style>
