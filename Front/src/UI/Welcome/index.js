import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useUserContext } from "../../context/UserContext";
import Logo from "../Logo";
import styles from "./index.module.scss";
import Button from "../Button";
import Paragraph from "../Paragraph";
import { ButtonGroup } from "@chakra-ui/react";

const Welcome = ({ onGuestPlaySelection }) => {
  const { dispatch } = useUserContext();

  const setupGuest = () => {
    dispatch({
      type: "setGuestUser",
    });

    onGuestPlaySelection();
  };

  return (
    <div className={styles.Welcome}>
      <Logo />

      <Paragraph textAlign="center">
        Connect your wallet to access full features like rewards, on-chain bets,
        and saved progress — or play as a guest for a quick preview without
        commitment
      </Paragraph>

      <ButtonGroup>
        <ConnectButton />
        <p>or</p>
        <Button variant="subtle" onClick={setupGuest}>
          Play as Guest
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Welcome;
