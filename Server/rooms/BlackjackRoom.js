import AuthRoom from "./AuthRoom.js";
import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../messageTypes.js";
import BlackjackState from "../states/BlackjackState.js";
import User from "../database/models/User.js";

import { Dispatcher } from "@colyseus/command";

import {
  BetCommand,
  DealInitialCardsCommand,
  StartGameCommand,
  UpdateStepCommand,
  HitCommand,
  StandCommand,
  DealerCommand,
} from "../commands/blackjack/index.js";

class BlackjackRoom extends AuthRoom {
  onCreate() {
    this.dispatcher = new Dispatcher(this);
    this.setState(new BlackjackState());

    this.onMessage(CLIENT_MESSAGES.BLACKJACK_BET, (client, pendingBet) => {
      this.dispatcher.dispatch(new BetCommand(), {
        pendingBet,
        client,
      });
    });

    this.onMessage(CLIENT_MESSAGES.BLACKJACK_HIT, (client) => {
      console.log("hit in on message");
      this.dispatcher.dispatch(new HitCommand(), {
        id: client.sessionId,
      });
    });
    this.onMessage(CLIENT_MESSAGES.BLACKJACK_DOUBLE, (client) => {
      this.dispatcher.dispatch(new HitCommand(), {
        id: client.sessionId,
        isDouble: true,
      });
    });
    this.onMessage(CLIENT_MESSAGES.BLACKJACK_STAND, (client) => {
      this.dispatcher.dispatch(new StandCommand(), {
        id: client.sessionId,
      });
    });

    setInterval(() => {
      if (this.state.step === "wait" && this.state.players.size) {
        this.dispatcher.dispatch(new StartGameCommand());
      }

      if (this.state.step !== "wait" && this.state.players.size === 0) {
        this.dispatcher.dispatch(new UpdateStepCommand(), "wait");
      }

      if (this.state.step === "bet" && this.state.isAllBet()) {
        this.dispatcher.dispatch(new UpdateStepCommand(), "hit");
        this.dispatcher.dispatch(new DealInitialCardsCommand());
      }

      if (this.state.step === "hit" && this.state.isAllHit()) {
        console.log("is all hit");

        this.dispatcher.dispatch(new UpdateStepCommand(), "dealer");
        this.dispatcher.dispatch(new DealerCommand());
        // set timer for next game
      }
    }, 1000);
  }

  async onJoin(client, options) {
    const { address } = options;
    const user = await User.findOne({ address });

    this.state.addPlayer(client.sessionId, user.nickname);

    client.send(SERVER_MESSAGES.BLACKJACK_STATE, this.state);

    this.broadcast(SERVER_MESSAGES.BLACKJACK_NEW_PLAYER, client.sessionId, {
      except: client,
    });
  }

  onLeave(client, consented) {
    this.state.removePlayer(client.sessionId);

    this.broadcast(SERVER_MESSAGES.BLACKJACK_DELETE_PLAYER, client.sessionId);
  }

  onDispose() {
    console.log("BlackjackRoom disposed.");
  }
}

export default BlackjackRoom;
