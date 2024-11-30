import User from "../database/models/User.js";
import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../messageTypes.js";
import GameState from "../states/GameState.js";
import AuthRoom from "./AuthRoom.js";

const PLAYERS_BROADCAST_FREQ = 20;
const DATABASE_UPDATE_FREQ = 1000 * 10;

class GameRoom extends AuthRoom {
  onCreate(options) {
    this.id = options.id;

    this.setState(new GameState());

    this.onMessage(CLIENT_MESSAGES.PLAYER_MOVE, (client, position) => {
      this.state.updatePosition(client.sessionId, position);
    });

    this.onMessage(CLIENT_MESSAGES.PLAYER_ROTATE, (client, rotation) => {
      this.state.updateRotation(client.sessionId, rotation);
    });

    this.onMessage(CLIENT_MESSAGES.PLAYER_ANIMATION, (client, animation) => {
      this.state.updateAnimation(client.sessionId, animation);
    });

    this.onMessage(CLIENT_MESSAGES.UPDATE_NICKNAME, (client, nickname) => {
      this.state.updateNickname(client.sessionId, nickname);
    });

    this.broadcastInterval = setInterval(() => {
      this.broadcastPlayersData();
    }, PLAYERS_BROADCAST_FREQ);

    setInterval(() => {
      this.savePlayersInDb();
    }, DATABASE_UPDATE_FREQ);
  }

  async onJoin(client, options) {
    const { address } = options;
    const user = await User.findOne({ address });

    this.state.addPlayer(client.sessionId, {
      nickname: user.nickname,
      position: user.position,
    });

    this.broadcast(
      SERVER_MESSAGES.NEW_PLAYER,
      {
        id: client.sessionId,
        ...this.state.players[client.sessionId],
      },
      { except: client }
    );

    client.send(SERVER_MESSAGES.PLAYER_DATA, { position: user.position });
  }

  onLeave(client, consented) {
    this.state.removePlayer(client.sessionId);
    this.broadcast(SERVER_MESSAGES.DELETE_PLAYER, client.sessionId);
    console.log(`Player ${client.sessionId} left the game.`);
  }

  onDispose() {
    console.log("GameRoom disposed.");
  }

  broadcastPlayersData() {
    this.broadcast(SERVER_MESSAGES.PLAYERS_DATA, this.state.players);
  }

  async savePlayersInDb() {
    const updatePromises = Array.from(this.state.players.values()).map(
      (player) => {
        const {
          nickname,
          position: { x, y, z },
        } = player;

        return User.updateOne(
          { nickname },
          { $set: { position: { x, y, z } } }
        );
      }
    );

    await Promise.all(updatePromises);
  }
}

export default GameRoom;
