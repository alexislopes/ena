<script lang="ts" setup>
import { useAccountsStore } from '~~/store/accountsStore';
import { useGoalsStore } from '~~/store/goalsStore';
const accountsStore = useAccountsStore();
const goalsStore = useGoalsStore();

const conta = ref('');
const nome = ref('');
const data = ref('');
const total = ref('');

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

  <label for="data">
    <input type="date" id="data" v-model="data" placeholder="escolha o prazo">
  </label>

  <label for="total">
    <input type="number" id="total" v-model="total" placeholder="qual sera o total">
  </label>
  <button @click="goalsStore.createGoal({ conta, nome, data, total })">criar objetivo</button>
  <div v-for="goal in goalsStore.goals">{{ goal.nome }}</div>
</div>
</template>

<style scoped></style>
