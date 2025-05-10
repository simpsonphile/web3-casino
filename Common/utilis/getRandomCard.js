import { cardNamesMap } from "../constants.js";

export const getRandomCard = () => {
  const cards = Object.values(cardNamesMap);
  return cards[Math.floor(Math.random() * cards.length)];
};
