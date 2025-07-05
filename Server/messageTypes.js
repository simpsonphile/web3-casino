import BLACKJACK_MESSAGES from "./features/blackjack/BlackjackMessages.js";
import CHAT_MESSAGES from "./features/chat/ChatMessages.js";
import GAME_MESSAGES from "./features/game/GameMessages.js";
import SLOT_MESSAGES from "./features/slotMachine/SlotMachineMessages.js";

export const SERVER_MESSAGES = {
  blackjack: BLACKJACK_MESSAGES.SERVER_MESSAGES,
  chat: CHAT_MESSAGES.SERVER_MESSAGES,
  game: GAME_MESSAGES.SERVER_MESSAGES,
  slots: SLOT_MESSAGES.SERVER_MESSAGES,
};

export const CLIENT_MESSAGES = {
  blackjack: BLACKJACK_MESSAGES.CLIENT_MESSAGES,
  chat: CHAT_MESSAGES.CLIENT_MESSAGES,
  game: GAME_MESSAGES.CLIENT_MESSAGES,
  slots: SLOT_MESSAGES.CLIENT_MESSAGES,
};
