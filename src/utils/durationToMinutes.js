export default function durationToMinutes({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
}) {
  const daysInMinutes = days * 1440;
  const hoursInMinutes = hours * 60;
  const secondsInMinutes = seconds / 60;

  return Math.round(
    daysInMinutes + hoursInMinutes + secondsInMinutes + minutes,
  );
}
