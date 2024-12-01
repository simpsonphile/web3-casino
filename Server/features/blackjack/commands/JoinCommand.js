import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";

import User from "../../../database/models/User.js";

export class JoinCommand extends Command {
  async execute({ client, options }) {
    const { address } = options;
    const user = await User.findOne({ address });

    this.state.addPlayer(client.sessionId, user.nickname);

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
