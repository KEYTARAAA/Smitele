import Ability from "./Ability";

export function getRandomAbilityIndexDay(
  arr: Array<Ability>,
  randomFactor: number
): number {
  const date: Date = new Date();
  const x =
    Math.sin(
      date.getDay() * date.getMonth() * date.getFullYear() * randomFactor
    ) * 10000;
  return Math.floor((x - Math.floor(x)) * arr.length);
}
export function getRandomAbilityIndex(arr: Array<Ability>): number {
  return Math.floor(Math.random() * arr.length);
}
