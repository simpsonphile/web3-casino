const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { expect } = require('chai');

function parseEth(str) {
  return ethers.parseUnits(str, 'ether');
}

describe('Plinko', function () {
  async function deployPlinko() {
    const lockedAmount = ethers.parseUnits('23', 'ether');
    const [owner, otherAccount] = await ethers.getSigners();
    const Casino = await ethers.getContractFactory('Casino');
    const casino = await Casino.deploy({ value: lockedAmount });
    const Plinko = await ethers.getContractFactory('Plinko');
    const plinko = await Plinko.deploy(casino.target);

    await casino.addSubOwner(plinko.target).then((tx) =>
      tx.wait().then(() => {
        console.log(`plinko added as subOwner to Casino`);
      }),
    );

    async function depositAsOwner(amount) {
      try {
        const tx = await casino.deposit({
          value: parseEth(amount),
        });

        await tx.wait();
        console.log('Transaction successful:');
      } catch (error) {
        console.error('Transaction failed:', error);
      }
    }

    return { plinko, casino, lockedAmount, owner, otherAccount, depositAsOwner };
  }

  describe('Deployment', function () {
    it('Should set the owner', async function () {
      const { plinko, owner } = await loadFixture(deployPlinko);

      expect(await plinko.owner()).to.equal(owner.address);
    });

    it('Should set the right mainContractAddress', async function () {
      const { plinko, casino } = await loadFixture(deployPlinko);

      expect(await plinko.mainContractAddress()).to.equal(casino.target);
    });
  });

  describe('bet', function () {
    it('should require to have enough balance to make a bet', async function () {
      const { plinko } = await loadFixture(deployPlinko);
      expect(plinko.bet(parseEth('2'))).to.be.revertedWith('You have not enough funds');
    });

    it('should require casino to have enough balance to make a bet', async function () {
      const { plinko, depositAsOwner } = await loadFixture(deployPlinko);
      await depositAsOwner('120');
      expect(plinko.bet(parseEth('120'))).to.be.revertedWith('Not enough funds in casino');
    });

    it('should take from balance, emit event with proper args, add to balance proper amount', async function () {
      const { plinko, casino, owner, depositAsOwner } = await loadFixture(deployPlinko);
      await depositAsOwner('120');

      expect(await casino.getBalance()).to.equal(parseEth('120'));
      const txBet = await plinko.bet(parseEth('2'));
      const receipt = await txBet.wait();

      await expect(txBet).to.be.not.reverted;
      await expect(txBet).to.emit(plinko, 'BetFinish');
      await expect(receipt.logs.length).to.be.greaterThan(0);
      await expect(receipt.logs[0].args.length).to.equal(4);

      const eventArgs = {
        address: receipt.logs[0].args[0],
        bet: receipt.logs[0].args[1],
        multiplier: receipt.logs[0].args[2],
        timestamp: receipt.logs[0].args[3],
      };

      await expect(receipt.logs[0].fragment.name).to.equal('BetFinish');
      await expect(eventArgs.address).to.equal(owner.address);
      await expect(eventArgs.bet).to.equal(parseEth('2'));

      const payout = Number(BigInt(2) * eventArgs.multiplier) / 10;
      const balanceAfterBet = 120 - 2 + payout;

      expect(await casino.getBalance()).to.equal(ethers.parseUnits(balanceAfterBet.toString()));
    });
  });
});
