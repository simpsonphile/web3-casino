const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SlotsModule", (m) => {
  const casinoAddress = m.getParameter('address');
  const slots = m.contract("Slots", [casinoAddress]);

  return { slots };
});
