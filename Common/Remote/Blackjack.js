import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../../Server/messageTypes";

class RemoteBlackjack {
  constructor({ client, options }) {
    this._client = client;
    this.options = options;
  }

  async connect({
    id,
    balance,
    onJoin,
    onNewPlayer,
    onNewGame,
    onStepChange,
    onTurnChange,
    onPlayerHandUpdate,
    onPlayerBetUpdate,
    onPlayerStateUpdate,
    onDealerHandUpdate,
    onEndGameResults,
    onBetAccepted,
    onHitAccepted,
    onStandAccepted,
    onDeletePlayer,
    onBalanceUpdated,
    onGuestBalanceUpdated,
  }) {
    try {
      this._room = await this._client.joinOrCreate("blackjack", {
        ...this.options,
        balance,
        id,
      });
    } catch {
      return false;
    }

    this.sessionId = this._room.sessionId;
    this._room.onMessage(SERVER_MESSAGES.blackjack.BLACKJACK_STATE, (data) =>
      onJoin(data)
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_NEW_PLAYER,
      (data) => onNewPlayer(data)
    );
    this._room.onMessage(SERVER_MESSAGES.blackjack.BLACKJACK_NEW_GAME, (data) =>
      onNewGame(data)
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_STEP_CHANGE,
      (data) => onStepChange(data)
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_TURN_CHANGE,
      (data) => onTurnChange(data)
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_PLAYER_HAND_UPDATE,
      (data) => onPlayerHandUpdate(data)
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_PLAYER_BET_UPDATE,
      (data) => onPlayerBetUpdate(data)
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_PLAYER_STATE_UPDATE,
      (data) => onPlayerStateUpdate(data)
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_DEALER_HAND_UPDATE,
      (data) => onDealerHandUpdate(data)
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_END_GAME_RESULTS,
      (data) => {
        onEndGameResults(data);
      }
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_BET_ACCEPTED,
      (data) => {
        onBetAccepted(data);
      }
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_HIT_ACCEPTED,
      (data) => {
        onHitAccepted(data);
      }
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_STAND_ACCEPTED,
      (data) => {
        onStandAccepted(data);
      }
    );
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.BLACKJACK_DELETE_PLAYER,
      (data) => {
        onDeletePlayer(data);
      }
    );
    this._room.onMessage(SERVER_MESSAGES.blackjack.BALANCE_UPDATED, (data) => {
      onBalanceUpdated(data);
    });
    this._room.onMessage(
      SERVER_MESSAGES.blackjack.GUEST_BALANCE_UPDATED,
      (data) => {
        onGuestBalanceUpdated(data);
      }
    );

    return true;
  }

  disconnect() {
    this._room.leave();
  }

  bet(bet) {
    this._room.send(CLIENT_MESSAGES.blackjack.BLACKJACK_BET, bet);
  }

  hit() {
    this._room.send(CLIENT_MESSAGES.blackjack.BLACKJACK_HIT);
  }

  stand() {
    this._room.send(CLIENT_MESSAGES.blackjack.BLACKJACK_STAND);
  }

  double() {
    this._room.send(CLIENT_MESSAGES.blackjack.BLACKJACK_DOUBLE);
  }
}

export default RemoteBlackjack;
