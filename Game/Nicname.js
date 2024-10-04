import TextMesh from "./TextMesh";

class Nickname extends TextMesh {
  constructor(scene) {
    super(scene, { size: 0.1, depth: 0.1, curveSegments: 12 });
  }
}

export default Nickname;
