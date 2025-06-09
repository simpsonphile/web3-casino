import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../../Server/messageTypes";

class RemotePlayers {
  constructor({
    client,
    onNewPlayer,
    onPlayerData,
    onFirstPlayersData,
    onDeletePlayer,
    onMainPlayerData,
    options,
  }) {
    this._client = client;
    this._onPlayerData = onPlayerData;
    this._onFirstPlayersData = onFirstPlayersData;
    this._onNewPlayer = onNewPlayer;
    this._onDeletePlayer = onDeletePlayer;
    this._onMainPlayerData = onMainPlayerData;
    this.options = options;
    this.isFirstPlayersData = true;
  }

  async connect() {
    this._room = await this._client.joinOrCreate("game_room", this.options);

    this.sessionId = this._room.sessionId;

    this._room.onMessage(SERVER_MESSAGES.game.PLAYERS_DATA, (data) => {
      if (this.isFirstPlayersData) {
        this._onFirstPlayersData(this._room, data);
        this.isFirstPlayersData = false;
      } else {
        this._onPlayerData(this._room, data);
      }
    });

    this._room.onMessage(SERVER_MESSAGES.game.NEW_PLAYER, (data) => {
      this._onNewPlayer(this._room, data);
    });

    this._room.onMessage(SERVER_MESSAGES.game.DELETE_PLAYER, (data) => {
      this._onDeletePlayer(this._room, data);
    });

    this._room.onMessage(SERVER_MESSAGES.game.PLAYER_DATA, (data) => {
      this._onMainPlayerData(this._room, data);
    });
  }

  disconnect() {
    this._room.leave();
  }

  updatePosition(position) {
    this._room?.send(CLIENT_MESSAGES.game.PLAYER_MOVE, position);
  }

  updateRotation(rotation) {
    this._room?.send(CLIENT_MESSAGES.game.PLAYER_ROTATE, rotation);
  }

  updateAnimation(animation) {
    this._room?.send(CLIENT_MESSAGES.game.PLAYER_ANIMATION, animation);
  }

  updateNickname(nickname) {
    this._room?.send(CLIENT_MESSAGES.game.UPDATE_NICKNAME, nickname);
  }
}

export default RemotePlayers;
