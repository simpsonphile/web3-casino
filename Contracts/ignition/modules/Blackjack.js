const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BlackjackModule", (m) => {
  const casinoAddress = m.getParameter('address');
  const blackjack = m.contract("Blackjack", [casinoAddress]);

  return { blackjack };
});
