import TextMesh from "./TextMesh";

class Tooltip extends TextMesh {
  constructor(scene) {
    super(scene, { size: 0.3, depth: 0.1, curveSegments: 12 });
  }
}

export default Tooltip;
