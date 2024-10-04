const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CasinoModule", (m) => {
  const value = BigInt(11000000000000000000);

  const casino = m.contract("Casino", [], { value });

  return { casino };
});
