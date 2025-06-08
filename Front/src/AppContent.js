import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "./UI/Header";
import GameContainer from "./UI/GameContainer";
import Auth from "./UI/Auth";
import { Button } from "@chakra-ui/react";
import { useUserContext } from "./context/UserContext";
import { useAccount } from "wagmi";

const AppContent = () => {
  const { dispatch, asGuest } = useUserContext();
  const { isConnected } = useAccount();

  const setupGuest = () => {
    dispatch({
      type: "setGuestUser",
    });
  };

  if (asGuest) return <GameContainer />;

  return (
    <div className="App">
      <Header>
        <div>
          <ConnectButton />
          {!isConnected && (
            <>
              <p>or</p>
              <Button variant="subtle" onClick={setupGuest}>
                Play as Guest
              </Button>
            </>
          )}
        </div>
      </Header>

      <Auth>
        <GameContainer />
      </Auth>
    </div>
  );
};

export default AppContent;
