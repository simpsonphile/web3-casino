import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";

import User from "../../../database/models/User.js";
import { getParsedAddressBalance } from "../../../contracts/casino.js";

export class JoinCommand extends Command {
  async execute({ client, options }) {
    const {
      address,
      asGuest,
      nickname,
      balance: guestStartingBalance,
    } = options;
    const user = asGuest
      ? { nickname, guestStartingBalance }
      : await User.findOne({ address });

    let balance = 0;
    if (address) {
      balance = await getParsedAddressBalance(user.address);
    } else {
      balance = guestStartingBalance;
    }

    this.state.addPlayer(client.sessionId, {
      address,
      nickname: user.nickname,
      balance: balance,
      asGuest,
    });

    client.send(SERVER_MESSAGES.BLACKJACK_STATE, {
      dealerHand: this.state.dealerHand,
      currentGame: this.state.currentGame,
    });

    client.send(SERVER_MESSAGES.BLACKJACK_TURN_CHANGE, this.state.turn);

    this.room.broadcast(
      SERVER_MESSAGES.BLACKJACK_NEW_PLAYER,
      { id: client.sessionId, nickname: user.nickname },
      {
        except: client,
      }
    );
  }
}
