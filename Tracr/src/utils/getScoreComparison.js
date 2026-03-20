import axios from "axios";
import durationToMinutes from "./durationToMinutes.js";
import getAverageScore from "./getAverageScore.js";

export default async function getScoreComparison(
  metric,
  timeframe,
  score,
  user_id,
) {
  const { data } = await axios(
    `https://tracr-c546.onrender.com/api/users/${user_id}/expeditions/`,
  );

  const { expeditions } = data;

  const parsedExpeditions = expeditions.map((expedition) => {
    expedition.duration = durationToMinutes(expedition.duration);
    return expedition;
  });

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

  const comparisonPeriodExpeditions = [];

  for (let expedition of parsedExpeditions) {
    new Date(expedition.timestamp).getTime() > comparisonPeriodStart &&
      new Date(expedition.timestamp).getTime() < comparisonPeriodEnd;
    {
      comparisonPeriodExpeditions.push(expedition);
    }
  }

  const comparisonScore = getAverageScore(comparisonPeriodExpeditions, metric);
  console.log("score>>>", score);
  console.log("comparison >>>", comparisonScore);

  const scoreDifference = Math.round(
    ((score - comparisonScore) /
      (comparisonScore === 0 ? 1 : comparisonScore)) *
      100,
  );
  console.log("score difference >>>", scoreDifference);
  return scoreDifference;
}
