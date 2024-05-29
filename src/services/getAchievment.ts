function getAchievment(guesses: number): string {
  if (guesses < 1) {
    return "Godlike";
  } else if (guesses < 3) {
    return "Divine";
  } else if (guesses < 5) {
    return "Deicide";
  } else if (guesses < 6) {
    return "PentaKill";
  } else if (guesses < 7) {
    return "QuadraKill";
  } else if (guesses < 8) {
    return "TripleKill";
  } else if (guesses < 9) {
    return "DoubleKill";
  }

  return "Kill";
}
export default getAchievment;
