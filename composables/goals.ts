import type { RealtimeChannel } from '@supabase/supabase-js'
const client = useSupabaseClient()

interface Objetivo {
  contas: object[]
  id: string
  nome: string
  orcamento: number
  prazo: string

  totalAportes(): number

  totalContas(): number
}

class Goal implements Objetivo {

  contas
  id
  nome
  orcamento
  prazo

  constructor({ contas, id, nome, orcamento, prazo }: Objetivo) {
    console.log("contas:", contas)
    this.contas = contas;
    this.id = id;
    this.orcamento = orcamento;
    this.prazo = prazo;
    this.nome = nome;
  }
  totalAportes(): number {
    return this.contas.map(m => m.conta.aporte_padrao).reduce((a, b) => a + b, 0)
  }

  totalContas(): number {
    return this.contas.map(m => m.conta.quantia).reduce((a, b) => a + b, 0)
  }

}

export const useGoals = async () => {
  let realtimeChannel: RealtimeChannel

  realtimeChannel = client.channel('public:objetivos').on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'objetivos' },
    () => refreshObjetivos()
  )
  realtimeChannel.subscribe()

  const { data: objetivos, refresh: refreshObjetivos } = await useAsyncData('objetivos', async () => {
    const { data } = await client.from('objetivos').select("id, nome, prazo, orcamento, contas:conta_objetivo(conta(id, nome, aporte_padrao, quantia, compras(*)))")

    return data
  })

  return { objetivos, Goal }
}