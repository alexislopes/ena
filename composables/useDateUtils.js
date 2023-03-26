export const useDateutils = () => {
  function timestampToWeeklyCode(timestamp) {
    const data = new Date(timestamp);
    const diaDoMes = data.getDate();
    const diaDaSemana = data.getDay();
    const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1).getDay();
    const offset = diaDaSemana + ((diaDoMes - 1) % 7) - primeiroDia;
    return Math.floor(offset / 7) + 1;
  }

  function timestampToMonthlyCode(timestamp) {
    return `${new Date(timestamp).getMonth()}${new Date(timestamp).getFullYear()}`
  }

  function timestamToYearlyCode(timestamp) {
    return new Date(timestamp).getFullYear();
  }

}