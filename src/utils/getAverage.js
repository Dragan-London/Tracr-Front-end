export default function getAverage(scores) {
  const total = scores.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const average = total / scores.length;
  return Math.round(average);
}
