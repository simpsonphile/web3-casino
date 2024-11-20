import { chipColorNominalsMap } from "../../constants";

export const getChipsForBet = (bet) => {
  const chips = [];

  for (const [chip, value] of Object.entries(chipColorNominalsMap).sort(
    (a, b) => b[1] - a[1]
  )) {
    while (bet >= value) {
      bet -= value;
      chips.push(chip);
    }
  }

  return chips;
};
