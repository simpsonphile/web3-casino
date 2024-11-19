import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

class Nickname extends CSS3DObject {
  constructor({ position, nickname }) {
    const div = document.createElement("div");
    div.className = "nickname";
    div.textContent = nickname;
    super(div);

    this.position.copy(position);
    this.position.y += 3;
    this.scale.set(0.025, 0.025, 0.025);
  }
}

export default Nickname;
