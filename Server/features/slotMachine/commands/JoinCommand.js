import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../SlotMachineMessages.js";
import User from "../../../database/models/User.js";
import { getParsedAddressBalance } from "../../../contracts/casino.js";

export class JoinCommand extends Command {
  async execute({ client, options }) {
    const {
      address,
      asGuest,
      balance: guestStartingBalance,
      nickname,
    } = options;
    const user = asGuest ? { nickname } : await User.findOne({ address });

    this.state.player = client.sessionId;
    this.state.address = address;

    let balance = 0;
    if (address) {
      balance = await getParsedAddressBalance(user.address);
    } else {
      balance = guestStartingBalance;
    }

    this.state.setBalance(balance);
    this.state.asGuest = !!asGuest;
  }
}
