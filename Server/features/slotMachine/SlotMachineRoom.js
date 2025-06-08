import AuthRoom from "./AuthRoom.js";
import { CLIENT_MESSAGES } from "../messageTypes.js";
import SlotMachineState from "../states/SlotMachineState.js";

import { Dispatcher } from "@colyseus/command";
import { SpinCommand } from "./commands/SpinCommand.js";
import User from "../../database/models/User.js";

class SlotMachineRoom extends AuthRoom {
  onCreate() {
    this.dispatcher = new Dispatcher(this);
    this.setState(new SlotMachineState());

    this.onMessage(CLIENT_MESSAGES.SPIN, (bet) => {
      this.dispatcher.dispatch(new SpinCommand(), {
        bet,
      });
    });
  }

  async onJoin(client, options) {
    if (this.state.player) {
      client.leave();
    }

    const { address, asGuest, nickname } = options;
    const user = asGuest ? { nickname } : await User.findOne({ address });

    this.state.player = client.sessionId;
    this.state.balance = user.balance;
  }

  onLeave() {
    this.state.player = null;
  }

  onDispose() {
    console.log("SlotMachineRoom disposed.");
  }
}

export default SlotMachineRoom;
