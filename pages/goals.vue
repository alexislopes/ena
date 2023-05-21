<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })


import { useDateUtils } from '~/composables/useDateUtils';
import { useAccountsStore } from '~~/store/accountsStore';

import { useGoals } from '~/composables/goals';

const accountsStore = useAccountsStore();
const { monthsBetweenDates } = useDateUtils()
const client = useSupabaseClient()

import { useFinancial } from "../composables/useFinancial";
const { currency, calcularMontanteComposto } = useFinancial()

const { objetivos, Goal } = await useGoals()

const conta = ref('');
const descricao = ref('');
const prazo = ref('');
const orcamento = ref(0);

const createMode = ref(false)

interface Goal {
  conta: string
  descricao: string
  prazo: Date
  orcamento: number
}

async function createGoal(goal: Goal) {
  const { error } = await client
    .from('objetivos')
    .insert(goal)

  createMode.value = false;
}

const aporte = (compra: { investimento: number, taxa: number, data_inicio: string, data_fim: string }) => {
  return compra.investimento * Math.pow(1 + compra.taxa / 100, monthsBetweenDates(new Date(compra.data_inicio), new Date(compra.data_fim))) / monthsBetweenDates(new Date(compra.data_inicio), new Date(compra.data_fim))
}

// const { data: objetivos } = await useAsyncData('objetivos', async () => {
//   const { data } = await client.from('objetivos').select("id, nome, prazo, orcamento, contas:conta_objetivo(conta(id, nome, aporte_padrao, quantia))")
//   return data
// })
const { data: compras } = await useAsyncData('compras', async () => {
  let { data } = await client.from('compras').select("*")

  data?.forEach(d => {
    d.aporte = aporte(d)
  })

  return data
})



</script>

<template>
<div class="w-full bg-base text-white">
  <button @click="createMode = true">Novo objetivo</button>
  <div class="flex gap-6">

    <div v-for="goal in objetivos" class="max-w-[20%]">
      <Box class="p-6">

        <h1 class="card__title !mb-0">{{ goal.nome }}</h1>
        <h3 class="mb-4">{{ goal.nome }}</h3>
        <span class="text-sm text-white mb-4">Progresso</span>
        <Progress
          :progress="(goal.contas.map(m => m.conta.quantia).reduce((a, b) => a + b, 0) / goal.orcamento) * 100" />

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
            <p>{{ currency(new Goal(goal).totalContas()) }}</p>

            <!-- <p>{{ currency(accountsStore.accounts.concat(accountsStore.compositeAccounts).find(account => account.id === goal.conta).valor) }}</p> -->
          </div>
          <div class="flex justify-between">
            <div class="flex items-center gap-2">
              <Icon name="ic:baseline-attach-money" />
              <p>Montante previsto</p>
            </div>
            <!-- <span>{{ new Goal(goal).totalAportes() }}</span> -->

            <p> {{ currency(calcularMontanteComposto(goal.contas.map(m => m.conta.quantia).reduce((a, b) => a + b, 0), compras?.filter(f => goal.contas.map(({ conta }) => conta.id).includes(f.conta)).map(m => m.aporte).reduce((a, b) => a + b, 0) , (new Date(goal.prazo) - new Date()) / (1000 * 60 * 60 * 24 * 365))) }} </p>
          </div>
        </div>
      </Box>
    </div>

  </div>
</div>
<Modal v-show="createMode">
  <TheGoalForm v-model:orcamento="orcamento" v-model:descricao="descricao" v-model:prazo="prazo" v-model:conta="conta"
    @submit="createGoal({ nome: descricao, prazo, orcamento, conta })" />
</Modal>
</template>

<style scoped>
input {
  @apply text-black
}
</style>

