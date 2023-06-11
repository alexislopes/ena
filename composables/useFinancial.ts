import { onMounted, ref } from "vue";

export const useFinancial = () => {
  const currency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  }


  const cdi = ref(0)

  // const cdi = computed(async () => {
  //   const { data } = await useFetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.4392/dados?formato=json&dataInicial=${new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('pt-br')}&dataFinal=${new Date().toLocaleDateString('pt-br')}`)
  //   if (typeof data.value === 'string') {
  //     console.log("cdiiiii: ", JSON.parse(data.value).pop().valor)
  //     return Number(JSON.parse(data.value).pop().valor)
  //   }


  //   return Number(data.value.pop().valor)
  // })

  const somaParcelas = () => {
    return 0
  }

  function calcularMontanteComposto(capital: number, aporte: number, tempo: number) {
    const juros = cdi.value / 100
    console.log('juros: ', juros)
    console.log('capital: ', capital)
    console.log('aporte: ', aporte)
    console.log('tempo: ', tempo)
    const montate = capital * Math.pow(1 + juros / 12, 12 * tempo) + aporte * ((Math.pow(1 + juros / 12, 12 * tempo) - 1) / (juros / 12));

    console.log('montate: ', montate)
    return montate
  }

  onMounted(async () => {
    const { data } = await useFetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.4392/dados?formato=json&dataInicial=${new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('pt-br')}&dataFinal=${new Date().toLocaleDateString('pt-br')}`)
    console.log('onMounted: ', data.value)

    if (typeof data.value === 'string') {

      cdi.value = Number(JSON.parse(data.value).pop().valor)
    } else {

      cdi.value = Number(data.value.pop().valor)
    }

  })


  return { currency, calcularMontanteComposto, somaParcelas }
}