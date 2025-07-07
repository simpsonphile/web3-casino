import { addToAddressBalance } from "../../../contracts/casino.js";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";

const payPlayer = async (room, id) => {
  const state = room.state;
  const client = room.clients.find((c) => c.sessionId === id);

  const address = state.getAddress(id);
  const bet = state.getBet(id);
  const isGuest = state.checkIfGuest(id);
  const type = state.getPlayerState(id);
  const isDouble = state.getPlayerDouble(id);

  let payout = 0;
  if (type === "win" && isDouble) payout = bet * 3;
  if (type === "win") payout = bet * 2;
  if (type === "blackjack") payout = bet * 2.5;

  if (payout <= 0) return;

  state.addToBalance(id, payout);

  if (isGuest) {
    client.send(SERVER_MESSAGES.GUEST_BALANCE_UPDATED, {
      change: payout,
    });

    return;
  }

  try {
    await addToAddressBalance(address, payout);
    client.send(SERVER_MESSAGES.BALANCE_UPDATED);
  } catch (error) {
    console.error(error);
  }
};

export default payPlayer;
