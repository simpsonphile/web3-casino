import AuthRoom from "../../rooms/AuthRoom.js";
import { CLIENT_MESSAGES, SERVER_MESSAGES } from "./BlackjackMessages.js";
import BlackjackState from "./BlackjackState.js";

import { Dispatcher } from "@colyseus/command";

import {
  BetCommand,
  DealInitialCardsCommand,
  StartGameCommand,
  UpdateStepCommand,
  HitCommand,
  StandCommand,
  DealerCommand,
  JoinCommand,
} from "./commands/index.js";

class BlackjackRoom extends AuthRoom {
  async onCreate() {
    this.dispatcher = new Dispatcher(this);
    this.setState(new BlackjackState());

    this.onMessage(CLIENT_MESSAGES.BLACKJACK_BET, (client, pendingBet) => {
      this.dispatcher.dispatch(new BetCommand(), {
        pendingBet,
        client,
      });
    });

    this.onMessage(CLIENT_MESSAGES.BLACKJACK_DOUBLE, (client) => {
      this.dispatcher.dispatch(new BetCommand(), {
        client: client,
        isDouble: true,
      });
    });

    this.onMessage(CLIENT_MESSAGES.BLACKJACK_HIT, (client) => {
      this.dispatcher.dispatch(new HitCommand(), {
        client: client,
      });
    });

    this.onMessage(CLIENT_MESSAGES.BLACKJACK_STAND, (client) => {
      this.dispatcher.dispatch(new StandCommand(), {
        client: client,
      });
    });

    this.clock.setInterval(() => {
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

      if (
        (this.state.step === "hit" && this.state.isAllHit()) ||
        this.state.step === "finish"
      ) {
        this.dispatcher.dispatch(new UpdateStepCommand(), "dealer");
        this.dispatcher.dispatch(new DealerCommand());

        this.clock.setTimeout(() => {
          this.dispatcher.dispatch(new StartGameCommand());
        }, 4000);
      }
    }, 1000);
  }

  onAuth() {
    if (this.state.order.length >= 5) return false;
    return true;
  }

  async onJoin(client, options) {
    this.dispatcher.dispatch(new JoinCommand(), { client, options });
  }

  onLeave(client) {
    this.state.removePlayer(client.sessionId);

    this.broadcast(SERVER_MESSAGES.BLACKJACK_DELETE_PLAYER, client.sessionId);
  }

  onDispose() {
    console.log("BlackjackRoom disposed.");
  }
}

export default BlackjackRoom;
