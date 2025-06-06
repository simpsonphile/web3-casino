import BlackjackCommands from "./BlackjackCommands";
import BlackjackController from "./BlackjackController";
import RemoteBlackjack from "@Common/Remote/Blackjack";
import BlackjackInteraction from "./BlackjackInteraction";
import BlackjackView from "./BlackjackView";

class BlackjackMode {
  constructor({ game }) {
    this.game = game;

    this.blackjackViews = {};
  }

  init() {
    this.initTables();

    window.repo.add("blackjack", RemoteBlackjack);

    this.controller = new BlackjackController({
      views: this.blackjackViews,
    });

    this.blackjackInteraction = new BlackjackInteraction({
      game: this.game,
      controller: this.controller,
    });

    new BlackjackCommands(this.controller);
  }

  initTables() {
    window.scene.traverse((child) => {
      if (!child.name.includes("blackjack_table")) return;

      this.blackjackViews[child.name] = new BlackjackView({
        object3d: child,
      });
    });
  }
}

export default BlackjackMode;
