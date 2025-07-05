import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../SlotMachineMessages.js";
import { getSimulator } from "../core/SlotMachineSimulator/registry.js";
import {
  addToAddressBalance,
  getFromAddressBalance,
} from "../../../contracts/casino.js";

export class SpinCommand extends Command {
  execute({ bet, client }) {
    if (this.state.balance < bet) {
      client.send(SERVER_MESSAGES.NOT_ENOUGH_FOUNDS);
      return;
    }

    const simulator = getSimulator("classic");

    const { combo, payout } = simulator.spin();

    const totalReturn = bet * payout;
    const profit = totalReturn - bet;

    client.send(SERVER_MESSAGES.SPIN_RESULT, {
      combo,
      payout: totalReturn,
    });

    this.state.addToBalance(profit);

    if (this.state.asGuest) return;

    if (profit > 0) {
      addToAddressBalance(this.state.address, profit);
    } else if (profit < 0) {
      getFromAddressBalance(this.state.address, Math.abs(profit));
    }
  }
}
