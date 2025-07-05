import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../../Server/messageTypes";

class RemoteSlots {
  constructor({ client, options }) {
    this._client = client;
    this.options = options;
  }

  async connect({ id, onJoin, onRoomFull, onNotEnoughFounds, onSpinResult }) {
    this._room = await this._client.joinOrCreate("slots", {
      ...this.options,
      id,
    });

    this.sessionId = this._room.sessionId;

    this._room.onMessage(SERVER_MESSAGES.slots.ON_SUCCESSFUL_JOIN, (data) =>
      onJoin(data)
    );

    this._room.onMessage(SERVER_MESSAGES.slots.ROOM_FULL, (data) =>
      onRoomFull(data)
    );

    this._room.onMessage(SERVER_MESSAGES.slots.NOT_ENOUGH_FOUNDS, (data) =>
      onNotEnoughFounds(data)
    );

    this._room.onMessage(SERVER_MESSAGES.slots.SPIN_RESULT, (data) =>
      onSpinResult(data)
    );
  }

  disconnect() {
    this._room.leave();
  }

  spin(bet) {
    this._room.send(CLIENT_MESSAGES.slots.SPIN, bet);
  }
}

export default RemoteSlots;
