export function getRandomIndexDay(
  arr: Array<any>,
  randomFactor: number
): number {
  const date: Date = new Date();
  const x =
    Math.sin(
      date.getDay() * date.getMonth() * date.getFullYear() * randomFactor
    ) * 10000;
  return Math.floor((x - Math.floor(x)) * arr.length);
}
export function getRandomGodIndex(arr: Array<any>): number {
  return Math.floor(Math.random() * arr.length);
}
