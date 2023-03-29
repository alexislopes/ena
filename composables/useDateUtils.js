export const useDateUtils = () => {

  function weekOfTimestamp(timestamp) {
    return Math.ceil((new Date(timestamp).getDate() + new Date(new Date(timestamp).getFullYear(), new Date(timestamp).getMonth(), 1).getDay()) / 7)

  }

  function timestampToWeeklyCode(timestamp) {

    return `${new Date(timestamp).getMonth()}${new Date(timestamp).getFullYear()}${weekOfTimestamp(timestamp)}`;
  }

  function timestampToMonthlyCode(timestamp) {
    return `${new Date(timestamp).getMonth()}${new Date(timestamp).getFullYear()}`
  }

  function timestampToYearlyCode(timestamp) {
    return new Date(timestamp).getFullYear();
  }

  function parseDate(data) {
    const [dia, mes, ano] = data.split("/");
    return new Date([mes, dia, ano]).getTime()
  }

  return { timestampToYearlyCode, timestampToMonthlyCode, timestampToWeeklyCode, weekOfTimestamp, parseDate }
}