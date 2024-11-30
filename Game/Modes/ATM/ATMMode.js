import ATMCommands from "./ATMCommands";
import ATMInteraction from "./ATMInteraction";

class ATMMode {
  constructor({ game, onAtmClick, onAtmExit }) {
    this.game = game;
    this.onAtmClick = onAtmClick;
    this.onAtmExit = onAtmExit;
  }

  init() {
    new ATMCommands();

    this.ATMInteraction = new ATMInteraction(this.game);
  }
}

export default ATMMode;
