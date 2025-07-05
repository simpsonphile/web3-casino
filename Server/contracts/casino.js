import { formatEther, parseEther } from "ethers";
import { Casino__factory } from "../../Contracts/typechain-js/index.js";
import { getSigner } from "../utilis/blockchainProvider.js";

const getCasinoContract = () => {
  const contractAddress = process.env.CASINO_CONTRACT_ADDRESS;

  const casinoContract = Casino__factory.connect(contractAddress, getSigner());
  return casinoContract;
};

export async function addToAddressBalance(account, amount) {
  if (typeof amount !== "number") {
    return { success: false };
  }

  try {
    const tx = await getCasinoContract().addToAddressBalance(
      account,
      parseEther(amount.toString)
    );
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (err) {
    return { success: false, error: err.message || err };
  }
}

export async function getFromAddressBalance(account, amount) {
  if (typeof amount !== "number") {
    return { success: false };
  }

  try {
    const tx = await getCasinoContract().getFromAddressBalance(
      account,
      parseEther(amount.toString())
    );
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (err) {
    return { success: false, error: err.message || err };
  }
}

export async function checkAddressBalance(account) {
  try {
    const balance = await getCasinoContract().getBalanceOf(account);

    return balance;
  } catch (err) {
    return null;
  }
}

export async function checkCasinoBalance() {
  try {
    const balance = await getCasinoContract().getCasinoBalance();

    return balance;
  } catch (err) {
    return null;
  }
}

export async function getParsedAddressBalance(account) {
  try {
    const balance = await checkAddressBalance(account);

    if (balance) return Number(formatEther(balance));
    return 0;
  } catch (err) {
    return null;
  }
}
