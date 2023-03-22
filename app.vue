<template>
  <div>
    <input type="file" name="" id="" @change="handleFileUpload">
  </div>
</template>

<script setup>
import { isEqual, maxBy } from "lodash";
import Papa from "papaparse";
import { computed, ref } from "vue";
const dados = ref(undefined)

function parseDate(data) {
  const [dia, mes, ano] = data.split("/");
  return new Date([mes, dia, ano]).getTime()
}

const lastTransaction = computed(() => {
  return maxBy(dados.value, o => o.timestamp)
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
