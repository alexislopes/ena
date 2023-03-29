<template>
  <div>
    <span @click="store.setType('weekly')">weekly</span>
    <span @click="store.setType('monthly')">monthly</span>
    <span @click="store.setType('yearly')">yearly</span>
  </div>
  <div>
    <input type="file" name="" id="" @change="handleFileUpload">
  </div>
  title: {{ store.title[store.type] }} |
  incomes: {{ store.incomes }} |
  received: {{ store.received }} |
  expenses: {{ store.expenses }} |
  <!-- by resource: {{ transactionsByResource }} -->
</template>

<script setup>
import { isEqual } from "lodash";
import Papa from "papaparse";
import { computed, ref } from "vue";
import { useDateUtils } from "../composables/useDateUtils";
import { useResourcesStore } from "../store/resourcesStore.js";
import { useTransactionsStore } from "../store/transactionsStore.js";
const dados = ref(undefined)

const { parseDate } = useDateUtils()

const store = useTransactionsStore();
const resourcesStore = useResourcesStore()

const transactionsByResource = computed(() => {
  return resourcesStore.resources.map(resource => {
    return {
      resource: resource.agregador,
      transactions: store.lastTransactions.filter(transaction => transaction.Conta.toLowerCase().includes(resource.agregador))
    }
  })
})

const incomesByResource = computed(() => {
  return transactionsByResource.value.map(tbr => {
    return Object.assign(tbr, { incomes: tbr.transactions.filter(t => t.Valor > 0).map(m => m.Valor).reduce((a, b) => a + b, 0) })
  })
})




const lastMonthYear = computed(() => {
  const date = new Date(lastTransaction.value.timestamp);
  return {
    month: date.getMonth(),
    year: date.getFullYear()
  }
})

const dateInfo = computed(() => {
  const agora = new Date();
  const { month, year } = lastMonthYear.value
  const dia = new Date(lastTransaction.value.timestamp).getDate()
  const isThisMonth = isEqual({ month: agora.getMonth(), year: agora.getFullYear() }, lastMonthYear.value);

  return {
    dia,
    stamp: isThisMonth ? "This month" : new Date(lastTransaction.value.timestamp).toLocaleDateString(navigator.language, { month: 'short', day: 'numeric' }),
    progress: (dia * 100) / new Date(year, month + 1, 0).getDate(),
    thatDy: new Date(year, month + 1, 0).getDate()
  }
})

function handleFileData(fileData) {
  fileData.forEach(data => {
    data.timestamp = parseDate(data.Data)
    data.Valor = Number(data.Valor)
  })

  dados.value = fileData;
  store.setTransactions(fileData)

}

async function handleFileUpload(event) {
  let d = []
  await Papa.parse(event.target.files[0], { delimiter: ";", header: true, complete: async function (results) { handleFileData(results.data) } })
  console.log(d)
  d.forEach(d => {
    parseDate(d['Data'])
  })
}





</script>
