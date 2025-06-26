import GameRoom from "./features/game/GameRoom.js";
import ChatRoom from "./features/chat/ChatRoom.js";
import BlackjackRoom from "./features/blackjack/BlackjackRoom.js";
import { monitor } from "@colyseus/monitor";
import colyseus from "colyseus";

const createCollyseusServer = (app, server) => {
  const port = 2567;

  app.use("/colyseus", monitor());

  const { Server } = colyseus;

  const gameServer = new Server({
    server: server,
  });

  gameServer.define("game_room", GameRoom);
  gameServer.define("chat_room", ChatRoom);
  gameServer.define("blackjack", BlackjackRoom).filterBy(["id"]);

  // Start the server
  gameServer.listen(port);
};

export default createCollyseusServer;
