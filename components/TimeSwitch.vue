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

</script>

<template>
  <div class="flex gap-2">
    <p @click="store.timestamp = store.timestamp - time[store.type]">&lt;</p>
                  <div>
                    <span>{{ month }} {{ year }}</span>
                    <div class="flex gap-1">
                      <span v-for="i in weekCount">S{{ i }}</span>
                    </div>
                  </div>
                  <!-- <span @click="store.setType('weekly')">weekly {{ weekOfTimestamp(store.timestamp) }}</span>
                  <span @click="store.setType('monthly')">monthly {{ month }}</span>
                  <span @click="store.setType('yearly')">yearly {{ year }}</span> -->
    <p @click="store.timestamp = store.timestamp + time[store.type]">&gt;</p>
  </div>
</template>

<style scoped></style>
