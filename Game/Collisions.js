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
      console.warn("Added object is not an instance of THREE.Box3");
      return;
    }

    const box = new THREE.Box3().setFromObject(object);

    // Calculate segment coordinates for the box's center
    const center = box.getCenter(new THREE.Vector3());
    const segmentKey = this.getSegmentCoordinates(center);

    // Initialize the segment if it doesn't exist
    if (!this.segments.has(segmentKey)) {
      this.segments.set(segmentKey, []);
    }

    // Add the box to the appropriate segment
    this.segments.get(segmentKey).push(box);
  }

  // Method to check for collisions with the given object
  check(obj, v) {
    if (!(obj instanceof THREE.Object3D)) {
      console.warn("Object to check is not an instance of THREE.Object3D");
      return false;
    }

    // Create a bounding box for the object
    const objectBox = new THREE.Box3().setFromObject(obj);

    // Calculate the future position
    // const futurePosition = objectBox.getCenter(new THREE.Vector3()).add(v);

    // Create a bounding box for the object's future position
    const futureBox = objectBox.clone().translate(v);

    // Calculate segment coordinates for the object's center
    const center = futureBox.getCenter(new THREE.Vector3());
    const segmentKey = this.getSegmentCoordinates(center);

    // Check the segment and neighboring segments for collisions
    const neighboringKeys = this.getNeighboringSegmentKeys(segmentKey);
    for (const key of neighboringKeys) {
      if (this.segments.has(key)) {
        const boxesInSegment = this.segments.get(key);
        for (const box of boxesInSegment) {
          if (objectBox.intersectsBox(box)) {
            return true; // Collision detected
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
