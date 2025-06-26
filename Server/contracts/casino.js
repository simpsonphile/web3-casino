import { Casino__factory } from "../../Contracts/typechain-js/index.js";
import { getSigner } from "../utilis/blockchainProvider.js";

const getCasinoContract = () => {
  const contractAddress = process.env.CASINO_CONTRACT_ADDRESS;

  const casinoContract = Casino__factory.connect(contractAddress, getSigner());
  return casinoContract;
};

export async function addToAddressBalance(account, amount) {
  const tx = await getCasinoContract().addToAddressBalance(account, amount);
  await tx.wait();
  console.log(`Minted ${amount} tokens to ${account}`);
}

export async function getFromAddressBalance(account, amount) {
  const tx = await getCasinoContract().getFromAddressBalance(account, amount);
  await tx.wait();
  console.log(`Burned ${amount} tokens from ${account}`);
}

export async function checkAddressBalance(account) {
  const balance = await getCasinoContract().getBalanceOf(account);

  return balance;
}

export async function checkCasinoBalance() {
  const balance = await getCasinoContract().getCasinoBalance();

  return balance;
}
