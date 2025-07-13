import CANNON from "cannon";
import * as THREE from "three";

CANNON.World.prototype._visualizerInit = function (scene) {
  this._visualizerScene = scene;
  this._visualizerMap = new Map();
};

CANNON.World.prototype._createDebugMesh = function (shape) {
  let geometry;

  if (shape instanceof CANNON.Sphere) {
    geometry = new THREE.SphereGeometry(shape.radius, 16, 16);
  } else if (shape instanceof CANNON.Box) {
    geometry = new THREE.BoxGeometry(
      shape.halfExtents.x * 2,
      shape.halfExtents.y * 2,
      shape.halfExtents.z * 2
    );
  } else if (shape instanceof CANNON.Plane) {
    geometry = new THREE.PlaneGeometry(10, 10);
  } else {
    return null;
  }

  return new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
  );
};

// Patch addBody to also add a visual
const originalAddBody = CANNON.World.prototype.addBody;
CANNON.World.prototype.addBody = function (body) {
  originalAddBody.call(this, body);
  if (!this._visualizerScene) return;

  const shape = body.shapes[0];
  const mesh = this._createDebugMesh(shape);
  console.log("debugmesh", mesh);
  if (!mesh) return;

  mesh.position.copy(body.position);
  mesh.quaternion.copy(body.quaternion);
  this._visualizerScene.add(mesh);
  this._visualizerMap.set(body.id, { body, mesh });
};

CANNON.World.prototype.updateDebugVisuals = function () {
  if (!this._visualizerMap) return;

  for (const { body, mesh } of this._visualizerMap.values()) {
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
  }
};

function createShapeFromMesh(mesh) {
  console.log(mesh);
  const geometry = mesh.geometry;

  geometry.computeBoundingBox();
  const box = geometry.boundingBox;

  const size = new THREE.Vector3();
  box.getSize(size);

  const scale = mesh.scale || new THREE.Vector3(1, 1, 1);
  size.multiply(scale);

  // Optional: choose shape by mesh name
  const name = mesh.name.toLowerCase();

  if (name.includes("sphere")) {
    const radius = Math.max(size.x, size.y, size.z) / 2;
    return new CANNON.Sphere(radius);
  }

  // Default to box
  return new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2));
}

CANNON.Body.prototype.addThreeShape = function (threeMesh, options = {}) {
  // Default to box collider from geometry bounding box
  const shape = createShapeFromMesh(threeMesh);

  if (!shape) {
    console.warn("Unsupported mesh geometry for shape:", threeMesh.name);
    return;
  }

  const offset = options.offset || new CANNON.Vec3(0, 0, 0);
  const orientation = options.orientation || new CANNON.Quaternion(0, 0, 0, 1);

  this.addShape(shape, offset, orientation);
};
