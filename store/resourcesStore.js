import { useStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { useTransactionsStore } from "./transactionsStore";

export const useResourcesStore = defineStore('resources', () => {
  const resources = ref(useStorage('resources', []))
  const transactionsStore = useTransactionsStore()

  const transactionsByResources = computed(() => {
    return resources.value.map(resource => Object.assign(resource, {
      transactions: transactionsStore.lastTransactions.filter(transaction => transaction.Conta.toLowerCase().includes(resource.agregador.toLowerCase()))
    }))
  })

  return { resources, transactionsByResources }
});