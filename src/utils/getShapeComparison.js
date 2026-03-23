import axios from "axios";

export default async function getShapeComparison(
  timeframe,
  totalShapes,
  user_id,
) {
  const { data } = await axios(
    `https://tracr-c546.onrender.com/api/users/${user_id}/expeditions/`,
  );

  const { expeditions } = data;

  let period;
  switch (timeframe) {
    case "week":
      period = 7;
      break;
    case "month":
      period = 30;
      break;
    case "year":
      period = 365;
      break;
  }

  const comparisonPeriodStart = new Date(
    new Date() - period * 86400000 * 2,
  ).getTime();
  const comparisonPeriodEnd = new Date(
    new Date() - period * 86400000,
  ).getTime();

  const comparisonShapesCompleted = [];

  for (let expedition of expeditions) {
    new Date(expedition.timestamp).getTime() > comparisonPeriodStart &&
      new Date(expedition.timestamp).getTime() < comparisonPeriodEnd;
    {
      comparisonShapesCompleted.push(expedition);
    }
  }

  const totalShapeDifference = Math.round(
    ((totalShapes - comparisonShapesCompleted.length) /
      comparisonShapesCompleted.length) *
      100,
  );

  return totalShapeDifference;
}
