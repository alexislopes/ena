<script lang="ts" setup>
import { max, meanBy, sumBy } from 'lodash';
import { computed } from 'vue';
import { useTransactionsStore } from '~~/store/transactionsStore';
const store = useTransactionsStore();

const searchString = ref(undefined);
const expenses = ref(false);
const recieves = ref(false);

const filteredTransactions = computed(() => {
  return searchString.value ? store.lastTransactions
    .filter(f => expenses.value ? f.Valor < 0 : f)
    .filter(f => recieves.value ? f.Valor > 0 : f)
    .filter(f => Object.values(f).toString().toLowerCase().includes(searchString.value.toLowerCase())) : []
})

const mean = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(meanBy(filteredTransactions.value, (o) => o.Valor))

})

const sum = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(sumBy(filteredTransactions.value, (o) => o.Valor))
})

const maximo = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(max(filteredTransactions.value.map(m => Math.abs(m.Valor))))
})

</script>

<template>
                    <div>
                      <input type="text" v-model="searchString">
                      <span @click="recieves = !recieves">recieves</span>
                      <span @click="expenses = !expenses">expenses</span>
                    </div>
                  <div class="flex">

                    <table class="table">
                      <thead>
                        <th>
                          <tr>
          
          
                            <td>Descrição</td>
                            <td>Valor</td>
                            <td>Data</td>
                            <td>Conta</td>
                            <td>Categoria</td>
                            <td>Subcategoria</td>
                          </tr>
                        </th>
                      </thead>
                      <tbody>
                        <tr v-for="transaction in filteredTransactions">
                          <td>{{ transaction['Descrição'] }}</td>
                          <td>{{ transaction['Valor'] }}</td>
                          <td>{{ transaction['Data'] }}</td>
                          <td>{{ transaction['Conta'] }}</td>
                          <td>{{ transaction['Categoria'] }}</td>
                          <td>{{ transaction['Subcategoria'] }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div>
                      <div><p>Mean</p>
                      <p>{{ mean }}</p></div>
                      <div><p>Total</p>
                      <p>{{ sum }}</p></div>
                      <div><p>Max</p>
                      <p>{{ maximo }}</p></div>
  </div>
</div>
</template>

<style scoped>
</style>
