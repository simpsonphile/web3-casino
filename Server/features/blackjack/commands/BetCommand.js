import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";
import { getFromAddressBalance } from "../../../contracts/casino.js";
import { HitCommand } from "./HitCommand.js";

export class BetCommand extends Command {
  async chargePlayer(client, amount, isDouble) {
    const id = client.sessionId;

    const isGuest = this.state.checkIfGuest(id);
    const address = this.state.getAddress(id);

    if (isDouble) {
      this.state.doubleBet(id);
    } else {
      this.state.setBet(id, amount);
    }

    this.state.addToBalance(id, -amount);
    this.room.broadcast(
      SERVER_MESSAGES.BLACKJACK_PLAYER_BET_UPDATE,
      {
        id,
        bet: amount,
      },
      { expect: client }
    );

    client.send(SERVER_MESSAGES.BLACKJACK_BET_ACCEPTED);

    if (isGuest) {
      client.send(SERVER_MESSAGES.GUEST_BALANCE_UPDATED, {
        change: -amount,
      });

      return;
    }

    await getFromAddressBalance(address, amount);
    client.send(SERVER_MESSAGES.BALANCE_UPDATED);
  }

  async execute({ pendingBet, client, isDouble }) {
    const id = client.sessionId;
    const balance = this.state.getBalance(id);
    const bet = this.state.getBet(id);

    if (isDouble) {
      if (this.state.getPlayerCards(id).length > 2) {
        client.send(SERVER_MESSAGES.BLACKJACK_DOUBLE_BET_ERROR);
        return;
      }
    }

    if (bet && !isDouble) {
      return;
    }

    if ((isDouble && balance < bet) || (!isDouble && balance < pendingBet)) {
      return;
    }

    if (
      (isDouble,
      this.state.step === "hit" &&
        this.state.currentGame[id] &&
        bet > 0 &&
        !this.state.getPlayerDouble(id))
    ) {
      this.chargePlayer(client, bet, true);
      return new HitCommand().setPayload({ client });
    }

    if (
      this.state.step === "bet" &&
      this.state.currentGame[id] &&
      this.state.getBet(id) === 0 &&
      !this.state.getPlayerDouble(id) &&
      pendingBet > 0
    ) {
      this.chargePlayer(client, pendingBet, false);
    }
  }
}
