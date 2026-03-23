import axios from "axios";
import getAverageScore from "./getAverageScore.js";
export default async function getDifference(metric, timeframe, score) {
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
    new Date() - period * 86400000 * 3,
  ).getTime();
  const comparisonPeriodEnd = new Date(
    new Date() - period * 86400000 * 2,
  ).getTime();

  const comparisonPeriodExpeditions = [];

  for (let expedition of expeditions) {
    new Date(expedition.timestamp).getTime() > comparisonPeriodStart &&
      new Date(expedition.timestamp).getTime() < comparisonPeriodEnd;
    {
      comparisonPeriodExpeditions.push(expedition);
    }
  }

  const comparisonScore = getAverageScore(comparisonPeriodExpeditions, metric);

  const scoreDifference = Math.round(
    ((score - comparisonScore) / comparisonScore) * 100,
  );

  return scoreDifference;
}
