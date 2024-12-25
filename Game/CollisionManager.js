import Collisions from "./Collisions";

const defaultOptions = { showBoxes: false };

class CollisionManager {
  constructor({ showBoxes } = defaultOptions) {
    this._collisions = new Collisions();

    this.showBoxes = showBoxes;
  }

  init() {
    window.scene.traverse((child) => {
      if (child.userData.isCollision) {
        child.traverse((subChild) => {
          if (!this.showBoxes) {
            subChild.visible = false;
          }
          if (subChild.type === "Mesh") {
            this._collisions.add(subChild);
          }
        });
      }
    });
  }

  check(model, vec) {
    let detectedBox = this._collisions.check(model, vec);

    return !!detectedBox;
  }
}

export default CollisionManager;
