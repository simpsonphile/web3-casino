import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

import Actor from "./Actor";

class BusinessMan extends Actor {
  constructor() {
    const data = window.models.business_man;
    const model = SkeletonUtils.clone(data.scene);
    const animations = data.animations;
    super({ model, animations });
  }
}

export default BusinessMan;
