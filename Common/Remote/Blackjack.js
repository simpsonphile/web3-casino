import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../../Server/messageTypes";

class RemoteBlackjack {
  constructor({ client, address, id }) {
    this._client = client;
    this.address = address;
    this.id = id;
  }

  async connect({
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
  }) {
    this._room = await this._client.joinOrCreate(this.id, {
      address: this.address,
    });
    this.sessionId = this._room.sessionId;
    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_STATE, (data) =>
      onJoin(data)
    );
    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_NEW_PLAYER, (data) =>
      onNewPlayer(data)
    );
    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_NEW_GAME, (data) =>
      onNewGame(data)
    );
    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_STEP_CHANGE, (data) =>
      onStepChange(data)
    );
    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_TURN_CHANGE, (data) =>
      onTurnChange(data)
    );
    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_PLAYER_HAND_UPDATE, (data) =>
      onPlayerHandUpdate(data)
    );
    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_PLAYER_BET_UPDATE, (data) =>
      onPlayerBetUpdate(data)
    );
    this._room.onMessage(
      SERVER_MESSAGES.BLACKJACK_PLAYER_STATE_UPDATE,
      (data) => onPlayerStateUpdate(data)
    );
    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_DEALER_HAND_UPDATE, (data) =>
      onDealerHandUpdate(data)
    );
    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_END_GAME_RESULTS, (data) => {
      onEndGameResults(data);
    });
  }

  disconnect() {
    this._room.leave();
  }

  bet(bet) {
    this._room.send(CLIENT_MESSAGES.BLACKJACK_BET, bet);
  }

  hit() {
    console.log("remote hit");
    this._room.send(CLIENT_MESSAGES.BLACKJACK_HIT);
  }

  stand() {
    this._room.send(CLIENT_MESSAGES.BLACKJACK_STAND);
  }

  double() {
    this._room.send(CLIENT_MESSAGES.BLACKJACK_DOUBLE);
  }
}

export default RemoteBlackjack;
