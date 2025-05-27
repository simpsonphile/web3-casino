import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

class CSSRenderer extends CSS3DRenderer {
  constructor() {
    super();
    this.setSize(window.innerWidth, window.innerHeight);
    this.domElement.style.position = "absolute";
    this.domElement.style.top = "0";
    this.domElement.style.pointerEvents = "none";
    document.body.appendChild(this.domElement);
  }
}

export default CSSRenderer;
