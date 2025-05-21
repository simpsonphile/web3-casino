import * as THREE from "three";

class UIRenderer {
  constructor(options = {}) {
    this.renderer = new THREE.WebGLRenderer();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
    this.camera.position.set(0, 0, 2);
    this.camera.lookAt(0, 0, 0);

    this.size = options.size || 100;
    this.margin = options.margin || 10;

    document.body.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.top = "0";
    this.renderer.domElement.style.right = "0";
  }

  add(object) {
    this.scene.add(object);
  }

  render() {
    const { renderer, camera, scene, size, margin } = this;

    renderer.clearDepth(); // Reset depth for overlay
    renderer.setScissorTest(true);
    renderer.setScissor(margin, margin, size, size);
    renderer.setViewport(margin, margin, size, size);

    renderer.render(scene, camera);
    renderer.setScissorTest(false);
  }
}

export default UIRenderer;
