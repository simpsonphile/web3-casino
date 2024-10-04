import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

class TextMesh {
  constructor(scene, options = { size: 0.1, depth: 0.1, curveSegments: 12 }) {
    this.scene = scene; // Reference to the Three.js scene
    this.textMesh = null; // To store the created text mesh
    this.options = options;
  }

  checkIfLoaded() {
    return !!this.textMesh;
  }

  loadText(text, position, options) {
    const textGeometry = new TextGeometry(text, {
      font: window.fonts.droidSans,
      ...(options || this.options),
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: "white" }); // Material for the text
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial); // Create mesh

    // Set the position
    this.textMesh.position.copy(position);

    textGeometry.computeBoundingBox();

    if (textGeometry.boundingBox) {
      textGeometry.translate(
        -textGeometry.boundingBox.max.x / 2,
        -textGeometry.boundingBox.max.y / 2,
        0
      );
    }

    this.scene.add(this.textMesh); // Add to scene
  }

  updatePosition(position) {
    this.textMesh.position.copy(position);
  }

  updateTextRotation(rotation) {
    if (this.textMesh) {
      this.textMesh.rotation.y = rotation; // Rotate around the Z axis
    }
  }

  // Method to update the text
  updateText(newText) {
    if (this.textMesh) {
      this.scene.remove(this.textMesh); // Remove old text mesh
      this.loadText(newText, this.textMesh.position); // Load new text at the same position
    }
  }

  // Method to remove the text from the scene
  removeText() {
    if (this.textMesh) {
      this.scene.remove(this.textMesh); // Remove text mesh
      this.textMesh = null; // Clear reference
    }
  }
}

export default TextMesh;
