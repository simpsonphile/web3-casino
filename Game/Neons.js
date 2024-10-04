const easeFunc = (t) => t * t * (3 - 2 * t);

function getEmissionIntensityValue(min, max, timestamp, offset) {
  const t = ((timestamp * 100 + offset) % 100) / 100;

  const delta = Math.abs(max - min);

  return min + delta * easeFunc(t);
}

class Neons {
  constructor() {
    this.neons = [];
    this.count = 0;
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
    this.neons.push({
      startingEmissiveIntensity: child.material.emissiveIntensity,
      id: child.id,
      offset: this.count,
      speed: Math.random(),
    });
    this.count++;
  }

  update(timestamp) {
    this.neons.forEach((neon) => {
      const intensity = neon.startingEmissiveIntensity;
      const id = neon.id;
      const min = intensity * 0.2;
      const max = intensity * 2;
      const offset = neon.offset;
      const speed = neon.speed;

      const value = getEmissionIntensityValue(
        min,
        max,
        timestamp * speed,
        offset
      );
      window.scene.getObjectById(id).material.emissiveIntensity = value;
    });
  }
}

export default Neons;
