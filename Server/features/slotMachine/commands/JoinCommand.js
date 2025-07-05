import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../SlotMachineMessages.js";
import User from "../../../database/models/User.js";
import { getParsedAddressBalance } from "../../../contracts/casino.js";

export class JoinCommand extends Command {
  async execute({ client, options }) {
    if (this.state.player) {
      client.send(SERVER_MESSAGES.ROOM_FULL);
      return;
    }

    const { address, asGuest, nickname } = options;
    const user = asGuest ? { nickname } : await User.findOne({ address });

    this.state.player = client.sessionId;
    this.state.address = address;

    let balance = 0;
    if (address) {
      balance = await getParsedAddressBalance(user.address);
    } else {
      balance = 10000;
    }

    console.log(balance);

    this.state.setBalance(balance);
    this.state.asGuest = !!asGuest;
  }
}
