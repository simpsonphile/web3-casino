import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

class PlinkoMachineScreen extends CSS3DObject {
  constructor(canvas) {
    super(canvas);

    this.scale.set(0.0012, 0.0012, 0.0012);
  }
}

export default PlinkoMachineScreen;
