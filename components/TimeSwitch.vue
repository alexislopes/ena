<script lang="ts" setup>
import { computed } from 'vue';
import { useDateUtils } from '../composables/useDateUtils';
import { useTransactionsStore } from "../store/transactionsStore.js";
const store = useTransactionsStore();
const { weekOfTimestamp } = useDateUtils()

const year = computed(() => {
  return new Date(store.timestamp).getFullYear()
});

const month = computed(() => {
  return new Date(store.timestamp).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric', day: 'numeric' }).split('de')[1]
})

const weekCount = computed(() => {
  const ano = new Date(store.timestamp).getFullYear()
  const mes = new Date(store.timestamp).getMonth()
  return Math.ceil((new Date(ano, mes + 1, 0).getDate() + new Date(ano, mes, 1).getDay()) / 7)
})

const time = ref({
  weekly: 604800 * 1000,
  monthly: 2629743 * 1000,
  yearly: 31556926 * 1000
})

const title = computed(() => {
  return {
    weekly: `Semana ${weekCount.value} DiaX - DiaY ${month.value}`,
    monthly: `${month.value} ${year.value}`,
    yearly: `${new Date(store.timestamp).getFullYear()}`
  }
})

</script>

<template>
<div class="flex gap-2 justify-between w-fit items-center">
  <div class="text-white flex items-center gap-2">
    <Icon @click="store.timestamp = store.timestamp - time[store.type]" name="uil:angle-left-b"  class="cursor-pointer" />
    <p :key="store.timestamp">
      {{ title[store.type] }}
    </p>
      <Icon @click="store.timestamp = store.timestamp + time[store.type]" name="uim:angle-right-b"  class="cursor-pointer"/>
  </div>
  <div class="flex gap-4">
    <Chip :key="store.type" :active="store.type === 'weekly'" @click="store.setType('weekly')" text="Weekly" />
    <Chip :key="store.type" :active="store.type === 'monthly'" @click="store.setType('monthly')" text="Monthly" />
    <Chip :key="store.type" :active="store.type === 'yearly'" @click="store.setType('yearly')" text="Yearly" />
  </div>
</div>
</template>

<style scoped>
.active {
  @apply bg-black text-white
}
</style>
