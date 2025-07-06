import AuthRoom from "../../rooms/AuthRoom.js";
import { CLIENT_MESSAGES } from "./SlotMachineMessages.js";
import SlotMachineState from "./SlotMachineState.js";

import { Dispatcher } from "@colyseus/command";
import { SpinCommand } from "./commands/SpinCommand.js";
import { JoinCommand } from "./commands/JoinCommand.js";

class SlotMachineRoom extends AuthRoom {
  onCreate() {
    this.dispatcher = new Dispatcher(this);
    this.setState(new SlotMachineState());

    this.onMessage(CLIENT_MESSAGES.SPIN, (client, bet) => {
      this.dispatcher.dispatch(new SpinCommand(), {
        bet,
        client,
      });
    });
  }

  onAuth() {
    if (this.state.player) return false;
    return true;
  }

  async onJoin(client, options) {
    this.dispatcher.dispatch(new JoinCommand(), { client, options });
  }

  onLeave() {
    this.state.player = null;
  }

  onDispose() {
    console.log("SlotMachineRoom disposed.");
  }
}

export default SlotMachineRoom;
