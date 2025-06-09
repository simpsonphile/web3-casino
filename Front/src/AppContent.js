import GameContainer from "./UI/GameContainer";
import Auth from "./UI/Auth";

const AppContent = () => {
  return (
    <div className="App">
      <Auth>
        <GameContainer />
      </Auth>
    </div>
  );
};

export default AppContent;
