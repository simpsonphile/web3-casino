import { cardNamesMap } from "@Common/constants";
import * as THREE from "three";

class Card extends THREE.Object3D {
  constructor({ name }) {
    if (!cardNamesMap?.[name]) throw Error(`no such card ${name}`);
    super();

    const card = window.scene.getObjectByName(name).clone();
    card.position.set(0, 0, 0);

    this.add(card);
  }
}

export default Card;
