import { Schema, defineTypes, ArraySchema } from "@colyseus/schema";

class BlackjackGamePlayerData extends Schema {
  constructor() {
    super();
    this.cards = new ArraySchema();
    this.bet = 0;
    this.state = "hit";
    this.isDouble = false;
  }
}

defineTypes(BlackjackGamePlayerData, {
  cards: ["string"],
  bet: "number",
  state: "string",
  isDouble: "boolean",
});

export default BlackjackGamePlayerData;
