export default function getDateRange(timeframe) {
  const today = new Date().toLocaleDateString();
  const todaySplit = today.split("/");
  const day = todaySplit[0];
  const month = todaySplit[1];
  const year = todaySplit[2];

  let dateRange = "";
  switch (timeframe) {
    case "week":
      return (dateRange = `${today} - ${new Date(new Date() - 7 * 86400000).toLocaleDateString()}`);
    case "month":
      if (month - 1 <= 0) {
        return (dateRange = `${today} - ${day}/12/${year - 1}`);
      } else {
        return (dateRange = `${today} - ${day}/${month - 1}/${year}`);
      }
    case "year":
      return (dateRange = `${year}`);
  }
  return dateRange;
}
