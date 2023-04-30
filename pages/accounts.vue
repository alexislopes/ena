<script setup>
import { v4 as uuidv4 } from 'uuid';
import { useAccountsStore } from "../store/accountsStore";
import { useTransactionsStore } from "../store/transactionsStore";

const store = useTransactionsStore()

const { accounts, setAccount, notSavedAccounts, setArchivedAccount, setCompositeAccount, compositeAccounts, compositeWithValues } = useAccountsStore();

const composite = ref([])
const compositeName = ref(undefined)

function save(e) {
  setAccount({
    nome: e,
    id: uuidv4(),
    valor: 0
  })
}

function archive(e) {
  setArchivedAccount(e)
}

function saveComposite() {
  setCompositeAccount({
    nome: compositeName,
    accounts: composite,
    id: uuidv4(),
  })
}

</script>

<template>
<div style="display: flex; gap: 3rem;">
  <div>
    <h1>Stored</h1>
    <div v-for="conta in accounts" :key="conta.nome">
      <input type="checkbox" :value="conta.nome" v-model="composite" />
      {{ conta.nome }}
      <input type="number" name="" :value="conta.valor" @blur="conta.valor = $event.target.value" id="">
    </div>
    <input type="text" name="" v-model="compositeName" id="">
    <button :disabled="!(composite.length && compositeName)" @click="saveComposite">Add composite</button>
  </div>
  <div>
    <h1>Not Stored</h1>
    <div v-for="nconta in notSavedAccounts">
      {{ nconta }}
      <span @click="save(nconta)">+</span>
      <span @click="archive(nconta)">-</span>
    </div>
  </div>
  <div>
    <h1>Composite</h1>
    <div v-for="conta in compositeWithValues">
      {{ conta.nome }} {{ conta.valor }}
    </div>
  </div>
</div>
</template>

<style scoped></style>
