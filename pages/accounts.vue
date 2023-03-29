<script setup>
import { computed } from "vue"
import { useTransactionsStore } from "../store/transactionsStore"
const store = useTransactionsStore()

const contas = computed(() => {
  return [...new Set(store.transactions.map(transaction => transaction.Conta))]
})

</script>

<template>
    <div v-for="conta in contas">
      {{ conta }}
  </div>
</template>

<style scoped></style>
