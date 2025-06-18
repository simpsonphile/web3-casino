import * as THREE from "three";
import { gsap } from "gsap";

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

  isSpinning() {
    return this.reelSpinningCount > 0;
  }

  spin(combination) {
    if (this.isSpinning()) return;
    this.reelSpinningCount = this.reels.length;
    const symbols = combination.split(",");
    const duration = Math.floor(Math.random() * 4) + 2;

    this.reels.forEach(({ el }, i) => {
      const finalAngle =
        Math.PI * 2 * duration + (Math.PI / 10) * Number(symbols[i]);

      const startAngle = new THREE.Euler().setFromQuaternion(
        el.quaternion,
        "XYZ"
      ).x;

      const data = { angle: startAngle };

      gsap.to(data, {
        angle: finalAngle,
        duration,
        delay: i * 0.2,
        ease: "back.inOut(0.5)",
        onUpdate: () => {
          el.rotation.x = data.angle;
        },
        onStart: () => {
          this._onReelStart();
        },
        onComplete: () => {
          this.reels[i].isSpinning = false;
          this.reelSpinningCount--;
          this._onReelStop();
          if (this.reelSpinningCount === 0) {
            this._onSpinStop?.();
          }
        },
      });

      this.reels[i].isSpinning = true;
    });
  }
}
export default SlotMachineView;
