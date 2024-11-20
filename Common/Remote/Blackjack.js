import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../../Server/messageTypes";

class RemoteBlackjack {
  constructor({ client, address, id }) {
    this._client = client;
    this.address = address;
    this.id = id;
  }

  async connect({
    onNewGame,
    onStepChange,
    onTurnChange,
    onPlayerHandUpdate,
    onPlayerBetUpdate,
    onDealerHandUpdate,
  }) {
    this._room = await this._client.joinOrCreate(this.id, {
      address: this.address,
    });

    this._room.onMessage(SERVER_MESSAGES.STEP_CHANGE, (data) =>
      onStepChange(data)
    );
    this._room.onMessage(SERVER_MESSAGES.TURN_CHANGE, (data) =>
      onTurnChange(data)
    );
    this._room.onMessage(SERVER_MESSAGES.NEW_GAME, (data) => onNewGame(data));
    this._room.onMessage(SERVER_MESSAGES.PLAYER_HAND_UPDATE, (data) =>
      onPlayerHandUpdate(data)
    );
    this._room.onMessage(SERVER_MESSAGES.PLAYER_BET_UPDATE, (data) =>
      onPlayerBetUpdate(data)
    );
    this._room.onMessage(SERVER_MESSAGES.DEALER_HAND_UPDATE, (data) =>
      onDealerHandUpdate(data)
    );
  }

  disconnect() {
    this._room.leave();
  }

  bet(bet) {
    this._room.send(CLIENT_MESSAGES.BET, bet);
  }

  hit() {
    this._room.send(CLIENT_MESSAGES.HIT);
  }

  stand() {
    this._room.send(CLIENT_MESSAGES.BET);
  }

  double() {
    this._room.send(CLIENT_MESSAGES.DOUBLE);
  }
}

export default RemoteBlackjack;
