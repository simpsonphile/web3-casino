import BlackjackCommands from "./BlackjackCommands";
import BlackjackController from "./BlackjackController";
import RemoteBlackjack from "@Common/Remote/Blackjack";
import BlackjackInteraction from "./BlackjackInteraction";
import BlackjackView from "./BlackjackView";

class BlackjackMode {
  constructor({ game, dispatchBlackjackUI }) {
    this.game = game;
    this.dispatchBlackjackUI = dispatchBlackjackUI;

    this.blackjackViews = {};
  }

  init() {
    this.initTables();

    window.repo.add("blackjack", RemoteBlackjack);

    this.controller = new BlackjackController({
      dispatchBlackjackUI: this.dispatchBlackjackUI,
      views: this.blackjackViews,
    });

    this.blackjackInteraction = new BlackjackInteraction({
      game: this.game,
      controller: this.controller,
    });

    new BlackjackCommands(this.controller);
  }

  initTables() {
    // traverse and init Views in Map
    window.scene.traverse((child) => {
      if (!child.name.includes("blackjack_table")) return;

      console.log(child.userData);

      this.blackjackViews[child.name] = new BlackjackView({
        object3d: child,
        seatOffset: child.userData.seat,
      });
    });

    // add this map to controller
  }
}

export default BlackjackMode;
