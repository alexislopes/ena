import { maxBy } from "lodash";
import { computed, ref } from "vue";
import { useDateUtils } from '../composables/useDateUtils.js';

export const useTransactionsStore = defineStore('transactions', () => {

  const { timestampToMonthlyCode } = useDateUtils()


  const transactions = ref([])

  const lastTransactions = computed(() => {
    const weeklyCode = transactions.value.length ? timestampToMonthlyCode(maxBy(transactions.value, "timestamp").timestamp) : []

    return transactions.value.filter(transaction => timestampToMonthlyCode(transaction.timestamp) === weeklyCode);
  })

  function setTransactions(value) {
    transactions.value = value
  }

  return { lastTransactions, transactions, setTransactions }
})