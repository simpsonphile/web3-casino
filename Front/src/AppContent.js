import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "./UI/Header";
import GameContainer from "./UI/GameContainer";
import Auth from "./UI/Auth";

const AppContent = () => {
  return (
    <div className="App">
      <Header>
        <ConnectButton />
      </Header>

      <Auth>
        <GameContainer />
      </Auth>
    </div>
  );
};

export default AppContent;
