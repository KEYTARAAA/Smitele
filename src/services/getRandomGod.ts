import God from "./Gods";

export function getRandomIndexDay(arr: Array<God>): number {
  const date: Date = new Date();
  const x =
    Math.sin(date.getDay() * date.getMonth() * date.getFullYear()) * 10000;
  return Math.floor((x - Math.floor(x)) * arr.length);
}
export function getRandomIndex(arr: Array<God>): number {
  return Math.floor(Math.random() * arr.length);
}
