const getBasePulse = (t, offset) => {
  const maxA = 0.4;
  const maxB = 0.3;
  const maxC = 0.2;
  const maxAmp = maxA + maxB + maxC;

  const value =
    Math.sin(t * 0.8 + offset) * maxA +
    Math.sin(t * 2.7 + offset * 0.3) * maxB +
    Math.sin(t * 5.1 + offset * 1.1) * maxC;

  const normValue = (value / maxAmp + 1) / 2;

  return normValue;
};

class NeonManager {
  constructor() {
    this.neons = [];
    window.scene.traverse((child) => {
      if (child.userData.isNeon) {
        if (this.checkIfEmissive(child)) this.addNeon(child);
        else
          child.traverse((subChild) => {
            if (this.checkIfEmissive(subChild)) this.addNeon(subChild);
          });
      }
    });
  }

  checkIfEmissive(el) {
    return el?.material?.emissiveIntensity > 1;
  }

  addNeon(child) {
    child.material = child.material.clone();

    this.neons.push({
      object: child,
      startingEmissiveIntensity: child.material.emissiveIntensity,
      id: child.id,
      offset: Math.random() * 100 * Math.PI,
      speed: Math.random(),
      flickerMult: Math.random() * 0.8 + 0.6,
      blinkTimer: 0,
      blinkCooldown: Math.random() * 10 + 5,
      isBlinking: false,
      blinkDuration: 0.1 + Math.random() * 0.2,
      shouldBlink: Math.random() < 0.15,
    });
  }

  update(timestamp) {
    this.neons.forEach((neon, i) => {
      const {
        object,
        startingEmissiveIntensity,
        offset,
        speed,
        flickerMult,
        isBlinking,
        blinkCooldown,
        blinkDuration,
        shouldBlink,
      } = neon;
      const startingIntensity = startingEmissiveIntensity;
      const min = startingIntensity * 0.3;
      const max = startingIntensity * 1.1;

      if (shouldBlink) {
        neon.blinkTimer += 1 / 60;

        if (!isBlinking && neon.blinkTimer > blinkCooldown) {
          neon.isBlinking = true;
          neon.blinkTimer = 0;
        }

        if (isBlinking && neon.blinkTimer > blinkDuration) {
          neon.isBlinking = false;
          neon.blinkTimer = 0;
          neon.blinkCooldown = Math.random() * 10 + 5; // reset cooldown
        }

        if (neon.isBlinking) {
          object.material.emissiveIntensity = 0;
          return;
        }
      }

      const base = getBasePulse(timestamp * speed, offset);
      const baseIntensity = min + (max - min) * base;

      const flicker =
        0.05 * Math.sin(timestamp * 40 + offset) +
        0.03 * Math.sin(timestamp * 80 + offset * 0.5) +
        0.02 * Math.sin(timestamp * 120 + offset * 2.0);

      const jitter =
        Math.random() < 0.02 ? (Math.random() - 0.5) * 0.6 * max : 0;

      object.material.emissiveIntensity =
        baseIntensity + flicker * flickerMult + jitter;
    });
  }
}

export default NeonManager;
