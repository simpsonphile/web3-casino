import AuthRoom from "./AuthRoom.js";
import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../messageTypes.js";
import SlotMachineState from "../states/SlotMachineState.js";

import { Dispatcher } from "@colyseus/command";
import { SpinCommand } from "./commands/SpinCommand.js";

class SlotMachineRoom extends AuthRoom {
  onCreate() {
    this.dispatcher = new Dispatcher(this);
    this.setState(new SlotMachineState());

    this.onMessage(CLIENT_MESSAGES.SPIN, (bet) => {
      this.dispatcher.dispatch(new SpinCommand(), {
        bet,
        client,
      });
    });
  }

  async onJoin(client, options) {
    if (this.state.player) {
      client.leave();
    }

    const { address } = options;
    const user = await User.findOne({ address });

    this.state.player = client.sessionId;
    this.state.balance = user.balance;
  }

  onLeave(client, consented) {
    this.state.player = null;
  }

  onDispose() {
    console.log("SlotMachineRoom disposed.");
  }
}

export default SlotMachineRoom;
