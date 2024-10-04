import { Schema, defineTypes, ArraySchema } from "@colyseus/schema";

class BlackjackGamePlayerData extends Schema {
  constructor() {
    super();
    this.cards = new ArraySchema();
    this.bet = 0;
  }
}

defineTypes(BlackjackGamePlayerData, {
  cards: ["string"],
  bet: "number",
});

export default BlackjackGamePlayerData;
