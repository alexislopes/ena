<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })
import { useAccountsStore } from '~~/store/accountsStore';

const accountsStore = useAccountsStore();
const client = useSupabaseClient()

import { useFinancial } from "../composables/useFinancial";
const { currency, calcularMontanteComposto } = useFinancial()

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

const { data: objetivos } = await useAsyncData('objetivos', async () => {
  const { data } = await client.from('objetivos').select("id, nome, prazo, orcamento, contas:conta_objetivo(conta(id, nome, quantia))")
  return data
})
const { data: compras } = await useAsyncData('compras', async () => {
  const { data } = await client.from('compras').select("*")
  return data
})

const { data: cdi } = await useFetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.4392/dados?formato=json&dataInicial=${new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('pt-br')}&dataFinal=${new Date().toLocaleDateString('pt-br')}`)

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
          <p>{{ currency(goal.contas.map(m => m.conta.quantia).reduce((a, b) => a + b, 0)) }}</p>

          <!-- <p>{{ currency(accountsStore.accounts.concat(accountsStore.compositeAccounts).find(account => account.id === goal.conta).valor) }}</p> -->
        </div>
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <Icon name="ic:baseline-attach-money" />
            <p>Montante previsto</p>
          </div>
          <p> {{ currency(calcularMontanteComposto(goal.contas.map(m => m.conta.quantia).reduce((a, b) => a + b, 0), Number(cdi[cdi.length - 1].valor) / 100, 150, (new Date(goal.prazo) - new Date()) / (1000 * 60 * 60 * 24 * 365))) }} </p>
        </div>
      </div>
    </Box>
  </div>

  </div>
</div>
<Modal v-show="createMode">
  <TheGoalForm  v-model:orcamento="orcamento" v-model:descricao="descricao" v-model:prazo="prazo" v-model:conta="conta" @submit="createGoal({ nome: descricao, prazo, orcamento, conta })" />
</Modal>
</template>

<style scoped>
input {
  @apply text-black
}
</style>
