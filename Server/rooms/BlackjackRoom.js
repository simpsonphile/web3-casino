import AuthRoom from "./AuthRoom.js";
import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../messageTypes.js";
import BlackjackState from "../states/BlackjackState.js";
import User from "../database/models/User.js";

class BlackjackRoom extends AuthRoom {
  onCreate(options) {
    this.setState(new BlackjackState());

    this.onMessage(CLIENT_MESSAGES.BLACKJACK_MOVE, (client, message) => {
      if (client.id !== this.state.turn) return;

      // read blockchain for move

      this.state.nextTurn();
    });

    setTimeout(() => {
      if (this.state.players) {
        //
      }
    }, 1000);
  }

  async onJoin(client, options) {
    const { address } = options;
    const user = await User.findOne({ address });

    this.state.addPlayer(client.sessionId, user.nickname);

    this.broadcast(SERVER_MESSAGES.BLACKJACK_NEW_PLAYER, user.nickname, {
      except: client,
    });

    client.send(SERVER_MESSAGES.BLACKJACK_CURRENT_GAME, this.state.currentGame);
  }

  onLeave(client, consented) {
    this.state.removePlayer(client.sessionId);

    this.broadcast(SERVER_MESSAGES.BLACKJACK_DELETE_PLAYER, user.nickname);
  }

  onDispose() {
    console.log("BlackjackRoom disposed.");
  }
}

export default BlackjackRoom;
