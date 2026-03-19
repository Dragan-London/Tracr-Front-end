import durationToMinutes from "./durationToMinutes.js";

const emptyData = {
  accuracy: 0,
  distance: 0,
  duration: 0,
  shapeId: 0,
  timestamp: 0,
  userId: 0,
};

export default function parseExpeditions(expeditions, timeframe) {
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

  const expeditionsClone = structuredClone(expeditions);
  expeditionsClone.forEach((expedition) => {
    expedition.duration = durationToMinutes(expedition.duration);
  });

  const baselineData = [];

  for (let i = 0; i < period; i++) {
    const clone = { ...emptyData };
    const date = new Date(new Date() - i * 86400000).toISOString();
    clone.timestamp = date;
    clone.userId = expeditions[0].userId;
    baselineData.push(clone);
  }

  let counter = 0;
  for (let j = 0; j < baselineData.length; j++) {
    if (expeditionsClone[counter] !== undefined) {
      if (
        baselineData[j].timestamp.slice(0, 10) ===
        expeditionsClone[counter].timestamp.slice(0, 10)
      ) {
        baselineData[j] = expeditionsClone[counter];
        counter++;
      }
    }
  }

  return baselineData;
}
