import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

import Actor from "./Actor";

class CasualMan extends Actor {
  constructor() {
    const data = window.models.casual_man;
    const model = SkeletonUtils.clone(data.scene);
    const animations = data.animations;
    super({ model, animations });
    this.rotation.y = Math.PI;
  }
}

export default CasualMan;
