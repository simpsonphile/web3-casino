import { Schema, defineTypes } from "@colyseus/schema";

class SlotMachineState extends Schema {
  constructor() {
    super();

    this.player = null;
    this.balance = 0;
  }
}

defineTypes(SlotMachineState, {
  player: "string",
  balance: "number",
});

export default SlotMachineState;
