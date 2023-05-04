<script lang="ts" setup>
// import { usePurchases } from '~~/composables/purchases';
import { useDateUtils } from "~~/composables/useDateUtils"
import { useFinancial } from "../composables/useFinancial"

const {currency, calcularMontanteComposto } = useFinancial()
const { monthsBetweenDates } = useDateUtils()

// const { purchases } = await usePurchases()

import type { RealtimeChannel } from '@supabase/supabase-js'
const client = useSupabaseClient()

let realtimeChannel: RealtimeChannel
  // Fetch collaborators and get the refresh method provided by useAsyncData
  const { data: purchases, refresh: refreshPurchases } = await useAsyncData('compras', async () => {
    const { data } = await client.from('compras').select()
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
  <div class="bg-base w-full text-white">
    <Box class="flex" v-for="({descricao, investimento, taxa, data_inicio, data_fim, id}) in purchases">
      <span class="column_item">{{ descricao }}</span>
      <span class="column_item">{{ currency(investimento) }}</span>
      <span class="column_item">{{ currency(investimento * Math.pow(1 + taxa / 100, monthsBetweenDates(new Date(data_inicio), new Date(data_fim)))) }}</span>
    </Box>
  </div>
</template>

<style scoped>
.column_item {
  @apply min-w-[20vw] text-center
}
</style>
