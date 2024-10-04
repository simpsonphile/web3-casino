import { hashMessage, recoverAddress } from "viem";

const verifySignature = async (address, signature, message) => {
  const hash = hashMessage(message);

  const recoveredAddress = await recoverAddress({ hash, signature });

  return recoveredAddress.toLowerCase() === address.toLowerCase();
};

export default verifySignature;
