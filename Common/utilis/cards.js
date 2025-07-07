import { cardNamesMap } from "../constants.js";

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

export const getRandomCard = () => {
  const cards = Object.values(cardNamesMap);
  return cards[Math.floor(Math.random() * cards.length)];
};

export const hasBlackjack = (cards) => {
  if (cards.length !== 2) return false;

  const ranks = cards.map((card) => card.split("_")[1]);

  const hasAce = ranks.includes("ace");
  const hasTenValueCard = ranks.some((rank) =>
    ["10", "j", "q", "k"].includes(rank)
  );

  return hasAce && hasTenValueCard;
};
