import durationToMinutes from "./durationToMinutes.js";

export default function getAverageScore(expeditions, metric) {
  let metrics = [];

  if (metric === "time") {
    const durations = expeditions.map((expedition) => expedition.duration);
    const durationInMins = durations.map((duration) => {
      return durationToMinutes(duration);
    });
    metrics = durationInMins;
  } else {
    metrics = expeditions.map((expedition) => expedition[metric]);
  }
  const total = metrics.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  const average = total / expeditions.length;
  return Math.round(average);
}
