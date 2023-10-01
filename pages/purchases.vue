<script lang="ts" setup>
// import { usePurchases } from '~~/composables/purchases';
import { useDateUtils } from "~~/composables/useDateUtils"
import { usePurchases } from "../composables/purchases"
import { useFinancial } from "../composables/useFinancial"

const {currency } = useFinancial()
const { formatDate, monthsBetweenDates } = useDateUtils()
const { calculaParcela, calculaAPagar } = usePurchases()

// const { purchases } = await usePurchases()

import type { RealtimeChannel } from '@supabase/supabase-js'
const client = useSupabaseClient()

let realtimeChannel: RealtimeChannel
  // Fetch collaborators and get the refresh method provided by useAsyncData
  const { data: purchases, refresh: refreshPurchases } = await useAsyncData('compras', async () => {
    const { data } = await client.from('compras').select("descricao, id, investimento, data_inicio, data_fim, taxa, conta (id, nome, quantia)")
    return data
  })
  // Once page is mounted, listen to changes on the `collaborators` table and refresh collaborators when receiving event
  onMounted(() => {
    // Real time listener for new workouts
    realtimeChannel = client.channel('public:compras').on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'compras' },
      () => refreshPurchases()
    )
    realtimeChannel.subscribe()
  })
  // Don't forget to unsubscribe when user left the page
  onUnmounted(() => {
    client.removeChannel(realtimeChannel)
  })
</script>

<template>
  <div class="bg-base w-full text-white flex gap-4 flex-wrap">
    <Box class="flex flex-col min-w-[18%] h-fit p-4" v-for="({descricao, investimento, taxa, data_inicio, data_fim, id}) in purchases">
      <!-- <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 w-fit mb-3">Rolando</span> -->
      <span class="card__title">{{ descricao }}</span>
      <div class="flex justify-center flex-col items-center">
        <span class="text-2xl font-bold">{{ currency(calculaParcela({ investimento, taxa, data_inicio, data_fim })) }}</span>
        <p class="text-sm">Parcela</p>
      </div>

      <div class="mt-4">
        <span class="font-medium">Investimento</span>
        <div class="flex justify-between bg-[#3e3e3e] p-2 rounded-md">
          <div class="flex flex-col">
            <span class="font-medium">{{ currency(investimento) }}</span>
            <span class="text-sm">Investido</span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium">{{ currency(calculaAPagar({investimento, taxa, data_inicio, data_fim})) }}</span>
            <span class="text-end text-sm">A pagar</span>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <span class="font-medium">Prazo</span>
        <div class="flex justify-between bg-[#3e3e3e] p-2 rounded-md">
          <div class="flex flex-col">
            <span class="font-medium">{{ formatDate(data_inicio) }}</span>
            <span class="text-sm">Inicio</span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium">{{ formatDate(data_fim) }}</span>
            <span class="text-end text-sm">Fim</span>
          </div>
        </div>
      </div>

    {{ monthsBetweenDates(new Date(data_inicio), new Date()) * calculaParcela({ investimento, taxa, data_inicio, data_fim }) }}
      <!-- <span class="column_item">{{ currency(investimento * Math.pow(1 + taxa / 100, monthsBetweenDates(new Date(data_inicio), new Date(data_fim))) / monthsBetweenDates(new Date(data_inicio), new Date(data_fim)) * Math.floor(monthsBetweenDates(new Date(data_inicio), new Date())) ) }}</span> -->
    </Box>
  </div>
</template>

<style scoped>

</style>
