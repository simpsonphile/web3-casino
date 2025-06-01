import * as THREE from "three";

class SlotMachineView {
  constructor({ object3d, onReelStart, onReelStop, onSpinStop }) {
    this.object3d = object3d;
    this._onReelStart = onReelStart;
    this._onReelStop = onReelStop;
    this._onSpinStop = onSpinStop;
    this.getReels();
  }

  getReels() {
    this.reels = [];
    this.object3d.traverse((child) => {
      if (child.name.includes("slot_reel")) {
        this.reels.push({ el: child, spinTarget: 0 });
      }
    });
  }

  spin(combination) {
    if (this.isSpinning) return;
    const symbols = combination.split(",");
    const additionalRotations = 2 * Math.PI * Math.floor(Math.random() * 2) + 3;

    this.reels.forEach(({ el }, i) => {
      const finalAngle =
        additionalRotations +
        // 2 * i * Math.PI +
        (Math.PI / 10) * Number(symbols[i]);
      this.reels[i].progress = i * -0.2;
      this.reels[i].isSpinning = true;
      this.reels[i].hasStarted = false;
      this.reels[i].finalAngle = finalAngle;
      this.reels[i].startAngle = el.quaternion.angleTo(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0)
      );
    });
  }

  getSpeed(progress) {
    let speed;
    if (progress < 0) {
      speed = 0.3;
    } else if (progress < 0.3) {
      speed = THREE.MathUtils.lerp(0, 1, progress / 0.3);
    } else if (progress < 0.6) {
      speed = 1;
    } else {
      speed = THREE.MathUtils.lerp(1, 0, (progress - 0.6) / 0.4);
    }

    return Math.max(0.02, speed);
  }

  update(delta) {
    this.reels.forEach((reel) => {
      if (!reel.isSpinning) return;

      reel.progress += delta * this.getSpeed(reel.progress);

      if (reel.progress >= 1) {
        reel.isSpinning = false;
        this._onReelStop();
        return;
      }

      const { el, startAngle, finalAngle, hasStarted } = reel;

      if (!hasStarted && reel.progress >= 0) {
        reel.hasStarted = true;
        this._onReelStart();
      }

      const currentAngle = THREE.MathUtils.lerp(
        startAngle,
        finalAngle,
        Math.min(Math.max(0, reel.progress), 1)
      );
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        currentAngle
      );
      el.quaternion.copy(quaternion);
    });
  }
}
export default SlotMachineView;
