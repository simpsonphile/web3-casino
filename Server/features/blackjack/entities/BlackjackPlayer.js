import { Schema, defineTypes } from "@colyseus/schema";

class BlackjackPlayer extends Schema {
  constructor({ nickname, balance, asGuest, address }) {
    super();
    this.nickname = nickname;
    this.balance = balance;
    this.asGuest = asGuest;
    this.address = address;
  }

  addToBalance(payout) {
    if (typeof payout === "number") this.balance -= payout;
  }
}

defineTypes(BlackjackPlayer, {
  nickname: "string",
  address: "string",
  balance: "number",
  asGuest: "boolean",
});

export default BlackjackPlayer;
