import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../../Server/messageTypes";

class RemoteBlackjack {
  constructor({ client, address, id }) {
    this._client = client;
    this.address = address;
    this.id = id;
  }

  async connect() {
    this._room = await this._client.joinOrCreate(this.id, {
      address: this.address,
    });

    this._room.onMessage(SERVER_MESSAGES.BLACKJACK_NEW_PLAYER, (data) => {
      // this._onNewMessage(this._room, data);
    });
  }

  disconnect() {
    this._room.leave();
  }

  sendMessage(value) {
    this._room?.send(CLIENT_MESSAGES.BLACKJACK_MOVE, {
      value,
    });
  }
}

export default RemoteBlackjack;
