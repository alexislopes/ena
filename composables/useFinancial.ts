export const useFinancial = () => {
  const currency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  }


  function calcularMontanteComposto(capital: number, juros: number, aporte: number, tempo: number) {
    //TODO fazer com que aporte seja calculado de acordo com as compras realizadas
    return capital * Math.pow(1 + juros / 12, 12 * tempo) + aporte * ((Math.pow(1 + juros / 12, 12 * tempo) - 1) / (juros / 12));
  }

  return { currency, calcularMontanteComposto }
}