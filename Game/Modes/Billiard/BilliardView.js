import * as THREE from "three";
import AimingLine from "./AimingLine";

class BilliardView {
  constructor({ object3d }) {
    this.meshGroup = new THREE.Group();
    this.object3d = object3d;
    this.aimingLine = new AimingLine();
  }

  init() {
    this.meshGroup = new THREE.Group();
    window.scene.add(this.meshGroup);
  }

  getGroundY() {
    return this.object3d.position.y + 0.7; // Adjusted to match the table height
  }

  initWhiteBall(ball) {
    this.object3d.getWorldPosition(ball.position);
    ball.position.z -= 0.5;
    ball.position.y = this.getGroundY();
    this.meshGroup.add(ball);
  }

  initColorBalls(balls) {
    balls.forEach((ball, i) => {
      const row = Math.floor((Math.sqrt(8 * i + 1) - 1) / 2); // calculate row
      const rowStartIndex = (row * (row + 1)) / 2;
      const col = i - rowStartIndex;

      const spacing = 0.057; // distance between balls (diameter ~2.25")
      const offsetX = (col - row / 2) * spacing;
      const offsetZ = row * spacing;

      this.object3d.getWorldPosition(ball.position);

      ball.position.x += offsetX;
      ball.position.z += 0.6 + offsetZ;
      ball.position.y = this.getGroundY();
      ball.rotation.x = Math.random() * Math.PI * 2;
      ball.rotation.y = Math.random() * Math.PI * 2;
      ball.rotation.z = Math.random() * Math.PI * 2;

      this.meshGroup.add(ball);
    });
  }

  updateAimingLine(start, end) {
    this.aimingLine.update(start, end);
    this.meshGroup.add(this.aimingLine.getLine());
  }

  stopAimingLine() {
    this.meshGroup.remove(this.aimingLine.getLine());
  }

  clearScene() {
    window.scene.remove(this.meshGroup);
  }

  removeBall(ball) {
    window.scene.remove(ball);
  }
}

export default BilliardView;
