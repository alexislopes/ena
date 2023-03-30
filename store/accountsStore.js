import { useLocalStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { useTransactionsStore } from "./transactionsStore";

export const useAccountsStore = defineStore('accounts', () => {
  const store = useTransactionsStore();

  const accounts = ref(useLocalStorage('accounts', []));
  const compositeAccounts = ref(useLocalStorage('compositeAccounts', []))
  const archivedAccounts = ref(useLocalStorage('archivedAccounts', []))

  const availableAccounts = computed(() => {
    return [...new Set(store.transactions.map(transaction => transaction.Conta))].filter(f => !archivedAccounts.value.includes(f))
  })

  const compositeWithValues = computed(() => {
    return compositeAccounts.value.map(ca => Object.assign(ca, { valor: accounts.value.filter(a => ca.accounts.includes(a.nome)).map(m => Number(m.valor)).reduce((a, b) => a + b, 0) }))
  })

  const notSavedAccounts = computed(() => {
    const acc = accounts.value.map(account => account.nome);

    return availableAccounts.value.filter(account => !acc.includes(account))
  })

  function setAccount(account) {
    accounts.value.push(account)
  }

  function setArchivedAccount(account) {
    archivedAccounts.value.push(account)
  }

  function setCompositeAccount(account) {
    compositeAccounts.value.push(account)
  }

  return { accounts, notSavedAccounts, availableAccounts, setAccount, setArchivedAccount, setCompositeAccount, compositeAccounts, compositeWithValues }
})
