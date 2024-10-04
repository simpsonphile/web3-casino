const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PlinkoModule", (m) => {
  const casinoAddress = m.getParameter('address');
  const plinko = m.contract("Plinko", [casinoAddress]);

  return { plinko };
});
