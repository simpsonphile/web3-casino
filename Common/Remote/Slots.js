import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../../Server/messageTypes";

class RemoteSlots {
  constructor({ client, options }) {
    this._client = client;
    this.options = options;
  }

  async connect({
    id,
    onJoin,
    onRoomFull,
    onNotEnoughFounds,
    onSpinResult,
    balance,
  }) {
    try {
      this._room = await this._client.joinOrCreate("slots", {
        ...this.options,
        balance,
        id,
      });
    } catch {
      return false;
    }

    this.sessionId = this._room.sessionId;

    this._registerMessageHandlers({
      onJoin,
      onRoomFull,
      onNotEnoughFounds,
      onSpinResult,
    });

    return true;
  }

  _registerMessageHandlers({
    onJoin,
    onRoomFull,
    onNotEnoughFounds,
    onSpinResult,
  }) {
    const { slots } = SERVER_MESSAGES;

    this._room.onMessage(slots.ON_SUCCESSFUL_JOIN, onJoin);
    this._room.onMessage(slots.ROOM_FULL, onRoomFull);
    this._room.onMessage(slots.NOT_ENOUGH_FOUNDS, onNotEnoughFounds);
    this._room.onMessage(slots.SPIN_RESULT, onSpinResult);
  }

  disconnect() {
    this._room.leave();
  }

  spin(bet) {
    this._room.send(CLIENT_MESSAGES.slots.SPIN, bet);
  }
}

export default RemoteSlots;
