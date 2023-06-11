<script setup>
import { computed } from "vue";
import { usePurchases } from '~/composables/purchases';
import { useFinancial } from '~/composables/useFinancial';

const { calculaParcela } = usePurchases()
const {currency} = useFinancial();

const client = useSupabaseClient()

const { data: contas } = await useAsyncData('contas', async () => {
  const { data } =  await client.from('contas').select("*, recursos ( id, nome ), compras (investimento, data_inicio, data_fim, taxa)");
  return data
})

const totalByRecurso = computed(() => {
  return [... new Set(contas.value.map(m => m.recursos.nome))].map(m => {
    return {
      recurso: m,
      total: contas.value.filter(f => f.recursos.nome === m).map(m => m.quantia).reduce((a, b) => a + b, 0)
    }
  })
})
</script>

<template>
<div class="bg-base w-full flex overflow-y-auto pb-4 justify-evenly">
  <div class="grid grid-cols-2 gap-4">

    <Box v-for="conta in contas" class="w-full h-fit p-2">
      <span class="card__title">{{ conta.nome }}</span>
      <div class="flex justify-center flex-col items-center text-white">
        <span class="text-2xl font-bold">{{ currency(conta.quantia) }}</span>
        <p class="text-sm">Total</p>
        <p class="text-sm">{{ conta.recursos.nome }}</p>
        <p class="text-sm">Aporte mensal de: {{ currency(conta.compras.map(({investimento, data_inicio, data_fim, taxa}) => { return calculaParcela({investimento, data_inicio, data_fim, taxa}) }).reduce((a, b) => a + b ,0) + conta.aporte_padrao )}}</p>
      </div>

    </Box>
  </div>
  <div class="flex gap-2 h-fit flex-col">
    <Box class="flex flex-col text-white p-2">
      <span class="card__title">Total</span>
      <span class="text-2xl font-bold">{{ currency(totalByRecurso.map(m => m.total).reduce((a, b) => a + b, 0)) }}</span>
    </Box>
    <Box v-for="recurso in totalByRecurso" class="flex flex-col text-white p-2">
      <span class="card__title">{{ recurso.recurso }}</span>
      <span class="text-2xl font-bold">{{ currency(recurso.total) }}</span>
    </Box>
  </div>
</div>
</template>

<style scoped></style>
