import { chipNamesMap } from "@Common/constants";
import * as THREE from "three";

class Chip extends THREE.Object3D {
  constructor({ name }) {
    if (!chipNamesMap?.[name]) throw Error(`no such Chip ${name}`);
    super();

    const chip = window.scene.getObjectByName(name).clone();
    chip.position.set(0, 0, 0);

    this.add(chip);
  }
}

export default Chip;
