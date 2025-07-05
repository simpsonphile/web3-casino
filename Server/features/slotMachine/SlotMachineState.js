import { Schema, defineTypes } from "@colyseus/schema";

class SlotMachineState extends Schema {
  constructor() {
    super();

    this.player = null;
    this.balance = 0;
    this.asGuest = null;
  }

  addToBalance(val) {
    const newBalance = this.balance + val;

    if (newBalance < 0) {
      console.warn("you cant have negative balance");
      return;
    }

    this.balance = newBalance;
  }

  setBalance(val) {
    if (typeof val !== "number") this.balance = 0;
    else this.balance = val;
  }
}

defineTypes(SlotMachineState, {
  player: "string",
  address: "string",
  balance: "number",
  asGuest: "boolean",
});

export default SlotMachineState;
