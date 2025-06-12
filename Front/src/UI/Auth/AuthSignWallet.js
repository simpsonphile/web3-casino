import { Button, Heading } from "@chakra-ui/react";
import Paragraph from "../Paragraph";
import { useAccount } from "wagmi";
import styles from "./index.module.scss";

const AuthSignWallet = ({ signMessage }) => {
  const { address } = useAccount();
  return (
    <div className={styles.AuthSignWallet}>
      <Heading>Verify Wallet Ownership</Heading>
      <Paragraph textAlign="center">
        To continue, please sign a message using your wallet to prove you own
        this address: <strong>{address}</strong>
        <br />
        This won’t trigger any blockchain transaction or cost gas.
      </Paragraph>
      <Button onClick={signMessage}>Sign Message to Login</Button>
    </div>
  );
};

export default AuthSignWallet;
