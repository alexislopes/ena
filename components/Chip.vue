<script lang="ts" setup>
import { useAttrs } from "vue";

const { active } = useAttrs()
defineProps({
  text: String
})
</script>

<template>
<div class="chip" :class="{ active }">
  {{ text }}
</div>
</template>

<style scoped>
.chip {
  @apply bg-[#272727] font-medium text-white flex items-center text-sm h-fit py-2 px-5 rounded-lg cursor-pointer
}

.chip.active {
  @apply bg-white text-black
}
</style>
