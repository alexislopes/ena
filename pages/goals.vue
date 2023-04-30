<script lang="ts" setup>
import { useAccountsStore } from '~~/store/accountsStore';
import { useGoalsStore } from '~~/store/goalsStore';
const accountsStore = useAccountsStore();
const goalsStore = useGoalsStore();
const client = useSupabaseClient()

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
  const { data } = await client.from('objetivos').select()
  return data
})

</script>

<template>
<div class="w-full">
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
  <div v-for="goal in objetivos">{{ goal.nome }}</div>
</div>
</template>

<style scoped></style>
