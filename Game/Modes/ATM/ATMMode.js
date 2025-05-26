import ATMCommands from "./ATMCommands";
import ATMController from "./ATMController";
import ATMInteraction from "./ATMInteraction";

class ATMMode {
  constructor({ game }) {
    this.game = game;
    this.controller = new ATMController();
  }

  init() {
    new ATMCommands({ controller: this.controller });

    this.ATMInteraction = new ATMInteraction(this.game);
  }
}

export default ATMMode;
