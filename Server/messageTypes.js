import BLACKJACK_MESSAGES from "./features/blackjack/BlackjackMessages.js";
import CHAT_MESSAGES from "./features/chat/ChatMessages.js";

export const SERVER_MESSAGES = {
  blackjack: BLACKJACK_MESSAGES.SERVER_MESSAGES,
  chat: CHAT_MESSAGES.SERVER_MESSAGES,

  NEW_PLAYER: "NEW_PLAYER",
  DELETE_PLAYER: "DELETE_PLAYER",
  PLAYERS_DATA: "PLAYERS_DATA",
  PLAYER_DATA: "PLAYER_DATA",
};

export const CLIENT_MESSAGES = {
  blackjack: BLACKJACK_MESSAGES.CLIENT_MESSAGES,
  chat: CHAT_MESSAGES.CLIENT_MESSAGES,

  PLAYER_MOVE: "PLAYER_MOVE",
  PLAYER_ROTATE: "PLAYER_ROTATE",
  PLAYER_ANIMATION: "PLAYER_ANIMATION",
  UPDATE_NICKNAME: "UPDATE_NICKNAME",
};
