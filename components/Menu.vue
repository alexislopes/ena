<script lang="ts" setup></script>

<template>
  <div class="min-w-[224px] h-full bg-base p-3">
    <NuxtLink to="/home" class="menu__item">
      <Icon name="material-symbols:home-rounded" class="menu__icon" />
      <span>Home</span>
    </NuxtLink>
    <NuxtLink to="/resources" class="menu__item">
      <Icon name="mdi:users" class="menu__icon"/>
      <span>Resources</span>
    </NuxtLink>
    <NuxtLink to="/accounts" class="menu__item">
      <Icon name="material-symbols:account-balance-wallet" class="menu__icon"/>
      <span>Accounts</span>
    </NuxtLink>
    <NuxtLink to="/analytics" class="menu__item">
      <Icon name="material-symbols:analytics" class="menu__icon"/>
      <span>Analytics</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.menu__item {
  @apply text-white flex gap-4 rounded-lg items-center p-2
}

.menu__item:hover {
  @apply bg-[#272727]
}

.menu__icon {
  @apply text-[1.6rem]
}

.router-link-exact-active {
  @apply bg-[#272727]
}

.router-link-exact-active:hover {
  @apply bg-[#3d3d3d]
}
</style>
