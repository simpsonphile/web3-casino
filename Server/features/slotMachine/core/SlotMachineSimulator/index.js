import { getProbabilityDistribution, createSampler } from "./utils.js";

class SlotMachineSimulator {
  constructor({
    payoutTable = {},
    nearWins = [],
    rtp = 0.95,
    nearWinsChance = 0.1,
    reelSize = 20,
    comboLength = 5,
  }) {
    if (
      !payoutTable ||
      typeof payoutTable !== "object" ||
      Object.keys(payoutTable).length === 0
    ) {
      throw new Error("Invalid payoutTable: must be a non-empty object");
    }

    if (typeof rtp !== "number" || rtp <= 0 || rtp > 1) {
      throw new Error("Invalid RTP: must be a number between 0 and 1");
    }

    if (nearWinsChance > 0 && (!nearWins || nearWins.length === 0)) {
      throw new Error("nearWinsChance > 0 but no nearWins combos provided");
    }

    if (typeof comboLength !== "number" || comboLength <= 0) {
      throw new Error("Invalid comboLength: must be a positive number");
    }

    if (typeof reelSize !== "number" || reelSize <= 0)
      throw new Error("Invalid reelSize: must be a positive number");

    this.payoutTable = payoutTable;
    this.rtp = rtp;
    this.nearWins = nearWins;
    this.nearWinsChance = nearWinsChance;
    this.reelSize = reelSize;
    this.comboLength = comboLength;

    this.probabilities = getProbabilityDistribution({ payoutTable, rtp });
    this.sampler = createSampler(this.probabilities);
  }

  getNearWinCombination() {
    return this.nearWins[Math.floor(Math.random() * this.nearWins.length)];
  }

  generateRandomLosingCombo() {
    const combo = Array.from(
      { length: this.comboLength },
      () => Math.floor(Math.random() * this.reelSize) + 1
    ).join(",");

    if (this.payoutTable[combo] || this.nearWins.includes(combo))
      return this.generateRandomLosingCombo();

    return combo;
  }

  spin() {
    const combo = this.sampler();

    if (combo !== "no_win") return { combo, payout: this.payoutTable[combo] };

    if (
      this.nearWinsChance > 0 &&
      Math.random() < this.nearWinsChance &&
      this.nearWins.length
    ) {
      return { combo: this.getNearWinCombination(), payout: 0 };
    }

    return { combo: this.generateRandomLosingCombo(), payout: 0 };
  }
}

export default SlotMachineSimulator;
