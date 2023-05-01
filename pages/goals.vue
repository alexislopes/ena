<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })
import { useAccountsStore } from '~~/store/accountsStore';

const accountsStore = useAccountsStore();
const client = useSupabaseClient()

import { useFinancial } from "../composables/useFinancial";
const { currency } = useFinancial()

const conta = ref('');
const nome = ref('');
const prazo = ref('');
const orcamento = ref(0);

interface Goal {
  conta: string
  nome: string
  prazo: Date
  orcamento: number
}

//TODO mudar funcao para o composable de financial
function calcularMontanteComposto(capital: number, juros: number, aporte: number, tempo: number) {
  //TODO fazer com que aporte seja calculado de acordo com as compras realizadas
  return capital * Math.pow(1 + juros / 12, 12 * tempo) + aporte * ((Math.pow(1 + juros / 12, 12 * tempo) - 1) / (juros / 12));
}

async function createGoal(goal: Goal) {
  const { error } = await client
    .from('objetivos')
    .insert(goal)
}

const { data: objetivos } = await useAsyncData('objetivos', async () => {
  const { data } = await client.from('objetivos').select()
  return data
})

const { data: cdi } = await useFetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.4392/dados?formato=json&dataInicial=${new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('pt-br')}&dataFinal=${new Date().toLocaleDateString('pt-br')}`)

</script>

<template>
<div class="w-full bg-base text-white">
  <select class="w-full flex flex-col" v-model="conta" name="select" id="">
    <option v-for="account in accountsStore.accounts.concat(accountsStore.compositeAccounts)" :value="account.id">{{
      account.nome }}</option>
  </select>

  <label for="nome">
    <input type="text" id="nome" v-model="nome" placeholder="digite o nome">
  </label>

  <label for="prazo">
    <input type="date" id="data" v-model="prazo" placeholder="escolha o prazo">
  </label>

  <label for="orcamento">
    <input type="number" id="orcamento" v-model.number="orcamento" placeholder="qual sera o orcamento">
  </label>
  <button @click="createGoal({ conta, nome, prazo, orcamento })">criar objetivo</button>
  <div v-for="goal in objetivos" class="max-w-[20%]">
    <Box class="p-6">

      <h1 class="card__title">{{ goal.nome }}</h1>
      <span class="text-sm text-white mb-4">Progresso</span>
      <Progress
        :progress="(accountsStore.accounts.concat(accountsStore.compositeAccounts).find(account => account.id === goal.conta).valor / goal.orcamento) * 100" />
      <p>{{ new Date(goal.prazo).toLocaleDateString('pt-br', { month: 'short', day: 'numeric', year: 'numeric' }) }}</p>
      <p>{{ currency(calcularMontanteComposto(accountsStore.accounts.concat(accountsStore.compositeAccounts).find(account => account.id === goal.conta).valor, Number(cdi[cdi.length - 1].valor) / 100, 150, (new Date(goal.prazo) - new Date()) / (1000 * 60 * 60 * 24 * 365))) }}</p>
    </Box>
  </div>
</div>
</template>

<style scoped></style>
