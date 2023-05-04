import { onMounted, onUnmounted } from '@nuxtjs/composition-api'
import type { RealtimeChannel } from '@supabase/supabase-js'
const client = useSupabaseClient()

export const usePurchases = async () => {
  let realtimeChannel: RealtimeChannel
  // Fetch collaborators and get the refresh method provided by useAsyncData
  const { data: purchases, refresh: refreshPurchases } = await useAsyncData('purchases', async () => {
    const { data } = await client.from('purchases').select()
    return data
  })
  // Once page is mounted, listen to changes on the `collaborators` table and refresh collaborators when receiving event
  onMounted(() => {
    // Real time listener for new workouts
    realtimeChannel = client.channel('public:purchases').on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'purchases' },
      () => refreshPurchases()
    )
    realtimeChannel.subscribe()
  })
  // Don't forget to unsubscribe when user left the page
  onUnmounted(() => {
    client.removeChannel(realtimeChannel)
  })

  return { purchases }
}