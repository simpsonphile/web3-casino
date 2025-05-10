import Collisions from "./Collisions";
import * as THREE from "three";

const MAX_FLOOR_SIZE = 4.5;
const MIN_STEP_SIZE = 0.01;
const ATTEMPTS = MAX_FLOOR_SIZE / MIN_STEP_SIZE;

class StairManager {
  constructor() {
    this._stairs = new Collisions();
  }

  init() {
    window.scene.traverse((child) => {
      if (child.userData.isStairs) {
        child.traverse((subChild) => {
          if (subChild.type === "Mesh") {
            this._stairs.add(subChild);
          }
        });
      }
    });
  }

  _isValidBox(box) {
    return typeof box?.max?.y === "number";
  }

  _findClosestBoxBellow(box, vec) {
    let detectedBox = false;
    const vecCopy = new THREE.Vector3().copy(vec);
    let attempt = 0;

    while (!detectedBox && attempt < ATTEMPTS) {
      vecCopy.y -= 0.01;
      detectedBox = this._stairs.check(box, vecCopy);
      attempt++;
    }

    return detectedBox;
  }

  _adjustVecToBox(model, box, vec) {
    const newVec = new THREE.Vector3().copy(vec);
    const yDiff = box.max.y - model.position.y + 0.01;
    newVec.y += yDiff;
    return newVec;
  }

  check(model, vec) {
    const box = new THREE.Box3().setFromObject(model);
    box.max.y = box.min.y + 0.3;
    let isBellow = false;
    let detectedBox = this._stairs.check(box, vec);

    if (!detectedBox) {
      isBellow = true;
      detectedBox = this._findClosestBoxBellow(box, vec);
    }

    if (this._isValidBox(detectedBox)) {
      const h = detectedBox.max.y - detectedBox.min.y;

      if (Math.abs(detectedBox.max.y - model.position.y) <= h + 0.3 + 0.01) {
        return {
          vec: this._adjustVecToBox(model, detectedBox, vec),
        };
      } else if (isBellow) {
        return {
          isDropping: true,
          vec: this._adjustVecToBox(model, detectedBox, vec),
        };
      } else {
        return { vec };
      }
    }

    return {
      vec,
    };
  }
}

export default StairManager;
