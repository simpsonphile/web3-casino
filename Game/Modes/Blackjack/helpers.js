import { chipColorNominalsMap } from "@Common/constants";

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

export const groupChips = (chips) => {
  const groups = {};

  chips.forEach((str) => {
    if (!groups[str]) {
      groups[str] = [];
    }
    groups[str].push(str);
  });

  return Object.values(groups);
};
