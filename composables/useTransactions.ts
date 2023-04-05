interface Transaction {
  Data: string
  Descricao: string
  Valor: number
  Conta: string
  Categoria: string
  Subcategoria: string
  Tags: string
}

export const useTransactions = () => {


  function incomes(transactions: Transaction[]) {
    console.log("inc: ", transactions)
    return transactions.filter(transaction => transaction.Valor > 0).map(transaction => transaction.Valor).reduce((a, b) => a + b, 0)
  }

  function revenues(transactions: Transaction[]) {
    const incomesCategories = ref(['Rendimentos', 'Dividendos'])
    return transactions.filter(transaction => transaction.Valor > 0).filter(transaction => incomesCategories.value.includes(transaction.Subcategoria)).map(transaction => transaction.Valor).reduce((a, b) => a + b, 0)
  }

  function expenses(transactions: Transaction[]) {
    console.log("exp: ", transactions)

    return transactions.filter(transaction => transaction.Valor < 0).map(transaction => transaction.Valor).reduce((a, b) => a + b, 0)
  }

  return { incomes, revenues, expenses }
}
