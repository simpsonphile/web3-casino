const generateCombinations = (count, symbols) => {
  const combinations = [];

  const generateCombination = (arr, i) => {
    if (i === count) {
      combinations.push(arr.join(","));
      return;
    }

    for (const symbol of symbols) {
      arr[i] = symbol;
      generateCombination(arr, i + 1);
    }
  };

  generateCombination([], 0);

  return combinations;
};

const calculateWeights = (payouts, houseEdge) => {
  const weights = {};
  const rtk = 1 - houseEdge;

  const k = rtk / Object.values(payouts).length;

  Object.entries(payouts).forEach(([combination, payout]) => {
    weights[combination] = k / payout;
  });

  return weights;
};

const slotCombinations = ({ reelCount, symbols, houseEdge, payouts }) => {
  const allCombinations = generateCombinations(reelCount, symbols);
  const weights = calculateWeights(payouts, houseEdge);

  const allCombinationsWithWeights = {};

  const weightsSum = 1;
  const restOfWeight =
    weightsSum - Object.values(weights).reduce((p, c) => p + c, 0);
  const noPayoutCombinationsCount =
    allCombinations.length - Object.values(weights).length;
  const noPayoutWeight = restOfWeight / noPayoutCombinationsCount;

  allCombinations.forEach((combination) => {
    allCombinationsWithWeights[combination] = weights[combination]
      ? weights[combination]
      : noPayoutWeight;
  });

  return allCombinationsWithWeights;
};

const payouts = {
  "7,7,7,7,7": 500,
  "1,1,1,1,1": 400,
  "2,2,2,2,2": 200,
  "3,3,3,3,3": 300,
  "4,4,4,4,4": 400,
};
const houseEdge = 0.05;
const reelCount = 5;
const symbols = [...Array(20).keys()];

const combinations = slotCombinations({
  payouts,
  houseEdge,
  reelCount,
  symbols,
});
console.log(symbols);
const prep = (weightedDict) => {
  console.log(weightedDict);
  // const keys = Object.keys(weightedDict);
  const weights = Object.values(weightedDict);
  let cumulativeWeights = [];
  let cumulativeSum = 0;
  for (let weight of weights) {
    cumulativeSum += weight;
    cumulativeWeights.push(cumulativeSum);
  }

  console.log(cumulativeWeights);

  // const spin = () => {
  //   const randomNum = Math.random();
  //   let key;

  //   for (let i = 0; i < cumulativeWeights.length; i++) {
  //     if (randomNum < cumulativeWeights[i]) {
  //       key = keys[i];
  //       break;
  //     }
  //   }
  // };
};

prep(combinations);
