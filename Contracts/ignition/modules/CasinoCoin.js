const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CasinoCoinModule", (m) => {
  const casinoCoin = m.contract("CasinoCoin", ["Casino Coin", "CHIP"], {});

  return { casinoCoin };
});
