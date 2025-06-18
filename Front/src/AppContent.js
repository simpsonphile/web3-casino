import GameContainer from "./UI/GameContainer";
import Auth from "./UI/Auth";
import AppGatekeeper from "./AppGatekeeper";

const AppContent = () => {
  return (
    <div className="App">
      <AppGatekeeper>
        <Auth>
          <GameContainer />
        </Auth>
      </AppGatekeeper>
    </div>
  );
};

export default AppContent;
