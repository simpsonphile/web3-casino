export const countCardPoints = (cards) => {
  let points = 0;
  let aces = 0;

  cards.forEach((card) => {
    const [_, rank] = card.split("_");

    if (["j", "q", "k"].includes(rank)) points += 10;
    else if (rank === "ace") {
      aces++;
      points += 11;
    } else {
      points += Number(rank);
    }

    while (points > 21 && aces > 0) {
      points -= 10;
      aces--;
    }
  });
  return points;
};
