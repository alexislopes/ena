import { maxBy } from "lodash";
import { computed, ref } from "vue";
import { useDateUtils } from '../composables/useDateUtils.js';

export const useTransactionsStore = defineStore('transactions', () => {

  const { timestampToMonthlyCode, timestampToWeeklyCode, timestampToYearlyCode, weekOfTimestamp } = useDateUtils()


  const transactions = ref([])
  const type = ref("weekly") // monthly | weekly | yearly  
  const incomesCategories = ref(['Rendimentos', 'Dividendos'])

  const transactionsByType = computed(() => {
    const weeklyCode = transactions.value.length ? timestampToWeeklyCode(maxBy(transactions.value, "timestamp").timestamp) : [];
    const monthlyCode = transactions.value.length ? timestampToMonthlyCode(maxBy(transactions.value, "timestamp").timestamp) : [];
    const yearlyCode = transactions.value.length ? timestampToYearlyCode(maxBy(transactions.value, "timestamp").timestamp) : [];

    return {
      weekly: transactions.value.filter(transaction => timestampToWeeklyCode(transaction.timestamp) === weeklyCode),
      monthly: transactions.value.filter(transaction => timestampToMonthlyCode(transaction.timestamp) === monthlyCode),
      yearly: transactions.value.filter(transaction => timestampToYearlyCode(transaction.timestamp) === yearlyCode),
    }
  })

  const lastTransactions = computed(() => {
    return transactionsByType.value[type.value]
  })

  const title = computed(() => {
    return {
      yearly: lastTransactions.value.length ? new Date(lastTransactions.value[0].timestamp).getFullYear() : new Date().getFullYear(),
      monthly: lastTransactions.value.length ? new Date(lastTransactions.value[0].timestamp).toLocaleDateString(navigator.language, { month: "short", year: 'numeric', day: 'numeric' }) : new Date().toLocaleDateString({ month: 'long' }),
      weekly: lastTransactions.value.length ? weekOfTimestamp(lastTransactions.value[0].timestamp) : 1
    }
  })

  function setTransactions(value) {
    transactions.value = value
  }

  function setType(value) {
    type.value = value
  }

  const received = computed(() => {
    return lastTransactions.value.filter(dado => dado.Valor > 1).map(m => m.Valor).reduce((a, b) => a + b, 0)
  })

  const expenses = computed(() => {
    return lastTransactions.value.filter(dado => dado.Valor < 1).map(m => m.Valor).reduce((a, b) => a + b, 0)
  })

  const incomes = computed(() => {
    return lastTransactions.value.filter(dado => incomesCategories.value.includes(dado.Subcategoria)).map(m => m.Valor).reduce((a, b) => a + b, 0)
  })

  return { lastTransactions, transactions, setTransactions, incomes, expenses, received, setType, type, title }
})