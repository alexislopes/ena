import { useLocalStorage } from "@vueuse/core";
import { maxBy } from "lodash";
import { computed, ref } from "vue";
import { useDateUtils } from '../composables/useDateUtils.js';


export const useTransactionsStore = defineStore('transactions', () => {

  const { timestampToMonthlyCode, timestampToWeeklyCode, timestampToYearlyCode, weekOfTimestamp } = useDateUtils()


  const transactions = ref(useLocalStorage('transactions', []))
  const timestamp = ref(maxBy(transactions.value, "timestamp")?.timestamp) || new Date().getTime();
  const type = ref("weekly") // monthly | weekly | yearly  
  const incomesCategories = ref(['Rendimentos', 'Dividendos', 'Proventos'])

  const transactionsByType = computed(() => {
    const weeklyCode = transactions.value.length ? timestampToWeeklyCode(timestamp.value) : [];
    const monthlyCode = transactions.value.length ? timestampToMonthlyCode(timestamp.value) : [];
    const yearlyCode = transactions.value.length ? timestampToYearlyCode(timestamp.value) : [];

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
    return lastTransactions.value.filter(dado => dado.Valor > 0).map(m => m.Valor).reduce((a, b) => a + b, 0)
  })

  const expenses = computed(() => {
    return lastTransactions.value.filter(dado => dado.Valor < 0).map(m => m.Valor).reduce((a, b) => a + b, 0)
  })

  const incomes = computed(() => {
    console.log(lastTransactions.value)
    return lastTransactions.value.filter(dado => incomesCategories.value.includes(dado.Subcategoria)).map(m => m.Valor).reduce((a, b) => a + b, 0)
  })

  return { lastTransactions, transactions, setTransactions, incomes, expenses, received, setType, type, title, transactionsByType, timestamp }
})