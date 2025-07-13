export function generateBucketColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const factor = i / (count - 1);

    const r = Math.round(255 * factor); // Red goes from 0 to 255
    const g = Math.round(255 - 235 * factor); // Green goes from 255 to 20
    const b = Math.round(255 - 108 * factor); // Blue goes from 255 to 147

    const color = `rgb(${r}, ${g}, ${b})`;
    colors.push(color);
  }
  return colors;
}

export function generateBucketSoundRates(count, minRate = 0.7, maxRate = 1.5) {
  // Returns an array of playback rates for each bucket index
  const rates = [];
  for (let i = 0; i < count; i++) {
    const factor = i / (count - 1);
    // Interpolate between minRate and maxRate
    const rate = minRate + (maxRate - minRate) * factor;
    rates.push(rate);
  }
  return rates;
}

export function pickInverseWeighted(multipliers) {
  // not working
  // Step 1: Get raw inverse weights
  const weights = multipliers.map((m) => 1 / m);
  const weightSum = weights.reduce((sum, w) => sum + w, 0);
  const proportions = weights.map((w) => w / weightSum); // sum = 1

  // Step 2: Calculate expected return of current proportions
  const expected = proportions.reduce(
    (sum, p, i) => sum + p * multipliers[i],
    0
  );

  // Step 3: Find win probability scalar to make total expected return = 0.95
  const winProbability = 0.95 / expected;

  // Step 4: Scale original proportions and normalize
  const scaled = proportions.map((p) => p * winProbability);
  const scaledSum = scaled.reduce((sum, p) => sum + p, 0);
  const probabilities = scaled.map((p) => p / scaledSum);

  // 6. Do the pick
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < multipliers.length; i++) {
    cumulative += probabilities[i];
    if (r < cumulative) return multipliers[i];
  }
  // console.warn("pickInverseWeighted fallback to last multiplier");
  return multipliers[multipliers.length - 1]; // fallback
}

const check = () => {
  const testMultipliers = [11, 3.2, 1.6, 1.2, 1.1, 1, 0.5];
  const trials = 100_000;
  let totalPayout = 0;

  for (let i = 0; i < trials; i++) {
    totalPayout += pickInverseWeighted(testMultipliers);
  }

  const averageReturn = totalPayout / trials;
  console.log("Average Return:", averageReturn.toFixed(4));
};

check();
