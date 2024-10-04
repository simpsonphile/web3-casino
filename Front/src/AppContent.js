import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "./UI/Header";
import GameContainer from "./UI/GameContainer";
import Auth from "./UI/Auth";
import Balance from "./UI/Balance";
import Deposit from "./UI/Deposit";

const AppContent = () => {
  return (
    <div className="App">
      <Header>
        <ConnectButton />
        <Balance />
        <Deposit />
      </Header>

      <Auth>
        <GameContainer />
      </Auth>
    </div>
  );
};

export default AppContent;
