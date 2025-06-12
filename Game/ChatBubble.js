import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import * as THREE from "three";

class ChatBubble extends CSS3DObject {
  constructor({ position = new THREE.Vector3(0, 0, 0), message }) {
    const div = document.createElement("div");
    div.className = "chat-bubble";
    div.textContent = message;
    super(div);

    this.position.copy(position);
    this.position.y += 3.5;
    this.scale.set(0.025, 0.025, 0.025);
  }
}

export default ChatBubble;
