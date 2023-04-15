<script lang="ts" setup></script>

<template>
  <div class="h-screen">
    <Nav />
    <div class="flex h-[calc(100vh_-_56px)]">

      <Menu />
      <NuxtLink to="/home">Home</NuxtLink> | <NuxtLink to="/resources">Resources</NuxtLink> | <NuxtLink to="/accounts">
        Accounts</NuxtLink> | <NuxtLink to="analytics"> Analytics </NuxtLink>
        <slot />
      </div>
      </div>
</template>

<style scoped></style>

<style>
@import url('https://fonts.cdnfonts.com/css/youtube-sans');
</style>
