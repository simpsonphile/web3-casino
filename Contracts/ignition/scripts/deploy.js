const hre = require('hardhat');
const CasinoModule = require('../modules/Casino.js');
const BlackjackModule = require('../modules/Blackjack.js');
const SlotsModule = require('../modules/Slots.js');
const PlinkoModule = require('../modules/Plinko.js');

async function main() {
  const { casino } = await hre.ignition.deploy(CasinoModule);
  console.log(`Casino contract deployed at: ${casino.target}`);

  const { blackjack } = await hre.ignition.deploy(BlackjackModule, {
    parameters: {
      BlackjackModule: {
        address: casino.target,
      },
    },
  });
  console.log(`Blackjack contract deployed at: ${blackjack.target}`);

  const { slots } = await hre.ignition.deploy(SlotsModule, {
    parameters: {
      SlotsModule: {
        address: casino.target,
      },
    },
  });

  console.log(`Slots contract deployed at: ${slots.target}`);

  const { plinko } = await hre.ignition.deploy(PlinkoModule, {
    parameters: {
      PlinkoModule: {
        address: casino.target,
      },
    },
  });

  console.log(`Plinko contract deployed at: ${plinko.target}`);

  const games = [blackjack, slots, plinko];

  const addSubOwners = games.map((game) =>
    casino.addSubOwner(game.target).then((tx) =>
      tx.wait().then(() => {
        console.log(`${game.target} added as subOwner to Casino`);
      }),
    ),
  );

  await Promise.all(addSubOwners);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
