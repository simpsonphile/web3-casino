const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CasinoModule", (m) => {
  const casinoCoinAddress = m.getParameter("casinoCoinAddress");

  console.log(casinoCoinAddress, "siema");

  const value = BigInt(10000000000000000);

  const casino = m.contract("Casino", [casinoCoinAddress], { value });

  return { casino };
});
