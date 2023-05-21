import { useDateUtils } from "./useDateUtils"

const { monthsBetweenDates } = useDateUtils()

export const usePurchases = () => {

  const calculaParcela = ({ investimento, data_inicio, data_fim, taxa }) => {
    return investimento * Math.pow(1 + taxa / 100, monthsBetweenDates(new Date(data_inicio), new Date(data_fim))) / monthsBetweenDates(new Date(data_inicio), new Date(data_fim))
  }

  const calculaAPagar = ({ investimento, taxa, data_inicio, data_fim }) => {
    return investimento * Math.pow(1 + taxa / 100, monthsBetweenDates(new Date(data_inicio), new Date(data_fim)))
  }

  return { calculaParcela, calculaAPagar }
}