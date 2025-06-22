import * as THREE from "three";

export const seatPositions = [
  new THREE.Vector3(-0.119, 0.1, 0.7225),
  new THREE.Vector3(0.272, 0.1, 0.459),
  new THREE.Vector3(0.4505, 0.1, 0.0145),
  new THREE.Vector3(0.272, 0.1, -0.459),
  new THREE.Vector3(-0.119, 0.1, -0.7225),
];

export const seatRotations = [
  new THREE.Euler(0, 0.47, 0),
  new THREE.Euler(0, 0.94, 0),
  new THREE.Euler(0, 1.57, 0),
  new THREE.Euler(-Math.PI, 0.94, -Math.PI),
  new THREE.Euler(-Math.PI, 0.47, -Math.PI),
];
