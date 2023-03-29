import { computed, ref } from "vue";
import { useTransactionsStore } from "./transactionsStore";

export const useResourcesStore = defineStore('resources', () => {
  const resources = ref([])
  const transactionsStore = useTransactionsStore()

  const transactionsByResources = computed(() => {
    return resources.value.map(resource => Object.assign(resource, {
      transactions: transactionsStore.lastTransactions.filter(transaction => transaction.Conta.toLowerCase().includes(resource.agregador))
    }))
  })

  return { resources, transactionsByResources }
});