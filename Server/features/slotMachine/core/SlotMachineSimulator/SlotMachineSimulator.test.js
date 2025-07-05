import SlotMachineSimulator from "./index.js";
import config from "./configs/classic";

const { payoutTable } = config;

const simulator = new SlotMachineSimulator(config);

test("produces a valid combo return", () => {
  const result = simulator.spin();

  expect(result).toHaveProperty("combo");
  expect(typeof result.combo).toBe("string");

  expect(result).toHaveProperty("payout");
  expect(typeof result.payout).toBe("number");
});

test("payout consistency: spin payout matches payout table from wins, 0 otherwise", () => {
  for (let i = 0; i < 1000; i++) {
    const { combo, payout } = simulator.spin();

    if (payoutTable[combo] !== undefined) {
      // Winning combo payout must match payoutTable
      expect(payout).toBe(payoutTable[combo]);
    } else {
      expect(payout).toBe(0);
    }
  }
});

test("monte carlo RTP test", () => {
  let totalPayout = 0;
  const spins = 1_000_000;

  for (let i = 0; i < spins; i++) {
    totalPayout += simulator.spin().payout;
  }

  const empiricalRTP = totalPayout / spins;

  const tolerance = 0.2;

  expect(empiricalRTP).toBeGreaterThanOrEqual(simulator.rtp - tolerance);
  expect(empiricalRTP).toBeLessThanOrEqual(simulator.rtp + tolerance);
});
