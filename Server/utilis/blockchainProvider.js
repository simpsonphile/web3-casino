import { ethers } from "ethers";

// const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_PROJECT_ID");

export const getProvider = () => {
  return new ethers.JsonRpcProvider("http://127.0.0.1:8545");
};

let signer;

export const getSigner = () => {
  if (!signer) {
    const provider = getProvider();
    const privateKey = process.env.CONTRACT_OWNER_PRIVATE_KEY;
    signer = new ethers.Wallet(privateKey, provider);
  }
  return signer;
};
