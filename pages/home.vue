<template>
<div class="flex flex-col bg-base w-full">

  <div class="flex items-center w-full justify-center">
    <TimeSwitch />
  </div>
  <div class=" gap-4 grid grid-cols-2 p-4">
    <div class="grid grid-cols-3 gap-2 h-fit">
      <Card title="Incomes" :relation="distributionIncomes" />
      <Card title="Expenses" :relation="distributionExpenses" />
      <Card title="Revenues" :relation="distributionRevenues" />
    </div>
    <div class="flex justify-end">
      <div  :class="['dropzone', { over: isOverDropZone }]" ref="dropzone">
        <label for="file" class="bg-[#42b4d8] text-white font-medium px-4 py-2 rounded">
          Importar transaçoes
          <input class="hidden" id="file" type="file" name="" @change="handleFileUpload($event.target.files)">
        </label>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { useDropZone } from '@vueuse/core';
import { isEqual } from "lodash";
import Papa from "papaparse";
import { computed, ref } from "vue";
import { useTransactions } from "~~/composables/useTransactions";
import { useDateUtils } from "../composables/useDateUtils";
import { useResourcesStore } from "../store/resourcesStore.js";
import { useTransactionsStore } from "../store/transactionsStore.js";


definePageMeta({ title: "Home | blu?" })

const { incomes, revenues, expenses } = useTransactions()
const dados = ref(undefined)
const dropzone = ref(undefined)


const { parseDate } = useDateUtils()

const store = useTransactionsStore();
const resourcesStore = useResourcesStore()

const distributionIncomes = computed(() => {
  const total = resourcesStore.transactionsByResources.map(resource => incomes(resource.transactions)).reduce((a, b) => a + b, 0)
  const distr = resourcesStore.transactionsByResources.map(resource => {
    return {
      name: resource.agregador,
      percentage: (Math.abs(incomes(resource.transactions)) * 100) / Math.abs(total)
    }
  })
  return { total, distribution: distr }
})

const distributionExpenses = computed(() => {
  const total = resourcesStore.transactionsByResources.map(resource => expenses(resource.transactions)).reduce((a, b) => a + b, 0)
  const distr = resourcesStore.transactionsByResources.map(resource => {
    return {
      name: resource.agregador,
      percentage: (Math.abs(expenses(resource.transactions)) * 100) / Math.abs(total)
    }
  })
  return { total, distribution: distr }
})

const distributionRevenues = computed(() => {
  const total = resourcesStore.transactionsByResources.map(resource => revenues(resource.transactions)).reduce((a, b) => a + b, 0)
  const distr = resourcesStore.transactionsByResources.map(resource => {
    return {
      name: resource.agregador,
      percentage: (Math.abs(revenues(resource.transactions)) * 100) / Math.abs(total)
    }
  })
  return { total, distribution: distr }
})

// const transactionsByResource = computed(() => {
//   return resourcesStore.resources.map(resource => {
//     return {
//       resource: resource.agregador,
//       transactions: store.lastTransactions.filter(transaction => transaction.Conta.toLowerCase().includes(resource.agregador))
//     }
//   })
// })

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

async function handleFileUpload(files) {
  console.log(files)
  let d = []
  await Papa.parse(files[0], { delimiter: ";", header: true, complete: async function (results) { handleFileData(results.data) } })
  console.log(d)
  d.forEach(d => {
    parseDate(d['Data'])
  })
}


const { isOverDropZone } = useDropZone(dropzone, handleFileUpload)



</script>

<style scoped>
.dropzone {
  @apply bg-[#282828] border-2 border-dashed border-[#3e3e3e] w-[50%] flex items-center justify-center rounded-md;
}

.dropzone.over {
  @apply border-[#42b4d8]
}
</style>
