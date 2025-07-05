export const getProbabilityDistribution = ({ rtp = 0.95, payoutTable }) => {
  const result = {};
  const combinations = Object.keys(payoutTable);
  const payouts = Object.values(payoutTable);

  // Calculate weights inversely proportional to payout (or customize)
  const weights = combinations.map((combo) => 1 / payoutTable[combo]);

  const weightSum = weights.reduce((a, b) => a + b, 0);

  // Proportions for winning combos (sum to 1)
  const proportions = weights.map((w) => w / weightSum);

  // Expected return per win (weighted average payout)
  const expectedReturnPerWin = proportions.reduce(
    (sum, p, i) => sum + p * payouts[i],
    0
  );

  // Calculate winProbability to hit exact RTP
  const winProbability = rtp / expectedReturnPerWin;

  // Now assign probabilities scaled by winProbability
  combinations.forEach((combo, i) => {
    result[combo] = proportions[i] * winProbability;
  });

  // Probability of no win is the leftover
  result["no_win"] = 1 - winProbability;

  return result;
};

export const createSampler = (probabilities) => {
  // Create cumulative distribution for quick sampling
  const entries = Object.entries(probabilities);
  let cumulative = 0;
  const cumulativeProbs = entries.map(([combo, prob]) => {
    cumulative += prob;
    return [combo, cumulative];
  });

  return function sample() {
    const r = Math.random();

    let left = 0;
    let right = cumulativeProbs.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (r <= cumulativeProbs[mid][1]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return cumulativeProbs[left][0];
  };
};
