import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../../Server/messageTypes";

class RemoteChat {
  constructor({ client, address, onNewMessage }) {
    this._client = client;
    this.address = address;
    this._onNewMessage = onNewMessage;
  }

  async connect() {
    this._room = await this._client.joinOrCreate("chat_room", {
      address: this.address,
    });

    this._room.onMessage(SERVER_MESSAGES.chat.NEW_MESSAGE, (data) => {
      this._onNewMessage(this._room, data);
    });
  }

  disconnect() {
    this._room.leave();
  }

  sendMessage(value) {
    this._room?.send(CLIENT_MESSAGES.chat.MESSAGE, {
      value,
    });
  }
}

export default RemoteChat;
