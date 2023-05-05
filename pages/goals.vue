<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })
import { useAccountsStore } from '~~/store/accountsStore';

const accountsStore = useAccountsStore();
const client = useSupabaseClient()

import { useFinancial } from "../composables/useFinancial";
const { currency, calcularMontanteComposto } = useFinancial()

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



async function createGoal(goal: Goal) {
  const { error } = await client
    .from('objetivos')
    .insert(goal)
}

const { data: objetivos } = await useAsyncData('objetivos', async () => {
  const { data } = await client.from('objetivos').select("id, nome, conta, prazo, orcamento, contas( nome, quantia )")
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

      <h1 class="card__title !mb-0">{{ goal.nome }}</h1>
      <h3 class="mb-4">{{ goal.nome }}</h3>
      <span class="text-sm text-white mb-4">Progresso</span>
      <Progress
        :progress="(accountsStore.accounts.concat(accountsStore.compositeAccounts).find(account => account.id === goal.conta).valor / goal.orcamento) * 100" />

      <div class="flex gap-2 flex-col pt-4">
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <Icon name="material-symbols:calendar-today" />
            <p>Prazo</p>
          </div>
          <p>{{ new Date(goal.prazo).toLocaleDateString('pt-br', {
            month: 'short', day: 'numeric', year: 'numeric'
          }).split(" ").filter(f => f != 'de').join(" ") }}</p>
        </div>
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <Icon name="material-symbols:account-balance-wallet" />
            <p>Saldo atual</p>
          </div>
          <p>{{ currency(accountsStore.accounts.concat(accountsStore.compositeAccounts).find(account => account.id ===
            goal.conta).valor) }}</p>
        </div>
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <Icon name="ic:baseline-attach-money" />
            <p>Montante previsto</p>
          </div>
          <p>{{
            currency(calcularMontanteComposto(accountsStore.accounts.concat(accountsStore.compositeAccounts).find(account
              => account.id === goal.conta).valor, Number(cdi[cdi.length - 1].valor) / 100, 150, (new Date(goal.prazo) -
                new Date()) / (1000 * 60 * 60 * 24 * 365))) }}</p>
        </div>
      </div>
    </Box>
  </div>
</div>
<Backdrop>
  <TheGoalForm />
</Backdrop>
</template>

<style scoped></style>
