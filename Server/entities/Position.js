import { Schema, defineTypes } from "@colyseus/schema";

class Position extends Schema {
  constructor(x, y, z) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

defineTypes(Position, {
  x: "number",
  y: "number",
  z: "number",
});

export default Position;
