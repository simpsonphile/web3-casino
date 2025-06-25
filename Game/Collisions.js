import * as THREE from "three";

class Collisions {
  constructor(segmentSize = 16) {
    // Size of each segment (16x16x16)
    this.segmentSize = segmentSize;

    // Map to store segments, keyed by segment coordinates
    this.segments = new Map();
  }

  // Method to get segment coordinates based on position
  getSegmentCoordinates(position) {
    const x = Math.floor(position.x / this.segmentSize);
    const y = Math.floor(position.y / this.segmentSize);
    const z = Math.floor(position.z / this.segmentSize);
    return `${x},${y},${z}`; // Returning as a string key for the map
  }

  // Method to add a Box3 to the appropriate segment
  add(object) {
    if (!(object instanceof THREE.Object3D)) {
      console.warn("Added object is not an instance of THREE.Object3D");
      return;
    }

    const box = new THREE.Box3().setFromObject(object);
    const min = box.min;
    const max = box.max;

    const segSize = this.segmentSize;

    const minX = Math.floor(min.x / segSize);
    const maxX = Math.floor(max.x / segSize);
    const minY = Math.floor(min.y / segSize);
    const maxY = Math.floor(max.y / segSize);
    const minZ = Math.floor(min.z / segSize);
    const maxZ = Math.floor(max.z / segSize);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          const key = this.getSegmentCoordinates(
            new THREE.Vector3(x * segSize, y * segSize, z * segSize)
          );
          if (!this.segments.has(key)) {
            this.segments.set(key, []);
          }
          this.segments.get(key).push(box);
        }
      }
    }
  }

  // Method to check for collisions with the given object
  check(obj, v = new THREE.Vector3(0, 0, 0)) {
    if (!(obj?.type === "Object3D" || obj.isBox3)) {
      console.warn(
        "Object to check is not an instance of THREE.Object3D or THREE.Box3"
      );
      return false;
    }

    const objectBox = obj.isBox3 ? obj : new THREE.Box3().setFromObject(obj);
    const futureBox = objectBox.clone().translate(v);

    const center = futureBox.getCenter(new THREE.Vector3());
    const segmentKey = this.getSegmentCoordinates(center);

    const neighboringKeys = this.getNeighboringSegmentKeys(segmentKey);
    for (const key of neighboringKeys) {
      if (this.segments.has(key)) {
        const boxesInSegment = this.segments.get(key);
        for (const box of boxesInSegment) {
          if (futureBox.intersectsBox(box)) {
            return box;
          }
        }
      }
    }

    return false; // No collision detected
  }

  // Method to get neighboring segment keys
  getNeighboringSegmentKeys(segmentKey) {
    const [x, y, z] = segmentKey.split(",").map(Number);
    const neighbors = [];

    // Add all neighboring segments (3x3x3 grid)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          neighbors.push(`${x + dx},${y + dy},${z + dz}`);
        }
      }
    }

    return neighbors;
  }
}

export default Collisions;
